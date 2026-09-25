import { timingSafeEqual } from "node:crypto";
import { decodeSignatureHeader, encodeSignatureHeader, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidatePath } from "next/cache";
import { revalidateTargetsFor } from "@/lib/revalidation";

/**
 * Sanity webhook'u: içerik yayınlandığında ilgili sayfaları hemen yeniler.
 *
 * Güvenlik:
 *   - İstek, Sanity'nin `sanity-webhook-signature` başlığındaki HMAC-SHA256 imzasıyla
 *     ve SANITY_REVALIDATE_SECRET ile doğrulanır. İmza gövdenin tamamını kapsar ve
 *     sabit zamanlı karşılaştırılır.
 *   - İmza zaman damgası 5 dakikadan eskiyse istek reddedilir (tekrar gönderim koruması).
 *   - Secret tanımlı değilse endpoint hiçbir isteği kabul etmez.
 *
 * Sanity webhook ayarı: POST, projection `{_type, "slug": slug.current}`.
 */

const MAX_SIGNATURE_AGE_MS = 5 * 60 * 1000;

/** Beklenen imzayı üretip gelen imzayla sabit zamanlı karşılaştırır. */
async function verifySignature(body: string, signature: string, secret: string) {
  const { timestamp } = decodeSignatureHeader(signature);
  const expected = Buffer.from(await encodeSignatureHeader(body, timestamp, secret));
  const received = Buffer.from(signature.trim());
  return { timestamp, valid: expected.length === received.length && timingSafeEqual(expected, received) };
}

const json = (status: number, body: Record<string, unknown>) => Response.json(body, { status });

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    console.error("[revalidate] SANITY_REVALIDATE_SECRET tanımlı değil; istek reddedildi.");
    return json(500, { message: "Revalidation is not configured" });
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const body = await request.text();
  if (!signature || !body) {
    return json(401, { message: "Missing signature" });
  }

  let valid = false;
  let timestamp = 0;
  try {
    ({ valid, timestamp } = await verifySignature(body, signature, secret));
  } catch {
    // Biçimi bozuk imza başlığı
    valid = false;
  }
  if (!valid) {
    return json(401, { message: "Invalid signature" });
  }
  if (Math.abs(Date.now() - timestamp) > MAX_SIGNATURE_AGE_MS) {
    return json(401, { message: "Signature expired" });
  }

  let documentType: string | undefined;
  try {
    const payload = JSON.parse(body) as { _type?: unknown };
    documentType = typeof payload._type === "string" ? payload._type : undefined;
  } catch {
    return json(400, { message: "Invalid JSON body" });
  }

  const targets = revalidateTargetsFor(documentType);
  for (const { path, type } of targets) {
    revalidatePath(path, type);
  }

  return json(200, {
    revalidated: true,
    type: documentType ?? null,
    paths: targets.map((t) => (t.type ? `${t.path} (${t.type})` : t.path)),
    now: Date.now(),
  });
}
