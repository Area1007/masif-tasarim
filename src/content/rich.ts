import type { RichText, RichSpan } from "./types";

/**
 * Basit işaretlemeyi Sanity Portable Text biçimine çevirir.
 *   *kelime*  → italik vurgu (em)
 *   ~kelime~  → ahşap rengi (accent)
 *   \n        → satır sonu
 * Yedek içerikte ve Sanity'ye aktarımda kullanılır.
 */
export function rich(source: string, key = "b"): RichText {
  const children: RichSpan[] = [];
  const pattern = /(\*[^*]+\*|~[^~]+~)/g;
  let last = 0;
  let i = 0;

  const push = (text: string, marks: string[] = []) => {
    if (text) children.push({ _type: "span", _key: `${key}s${i++}`, text, marks });
  };

  for (const match of source.matchAll(pattern)) {
    push(source.slice(last, match.index));
    const token = match[0];
    push(token.slice(1, -1), [token.startsWith("*") ? "em" : "accent"]);
    last = (match.index ?? 0) + token.length;
  }
  push(source.slice(last));

  return [{ _type: "block", _key: key, style: "normal", markDefs: [], children }];
}

/** Zengin metni düz metne çevirir (meta etiketleri vb. için) */
export function plainText(value: RichText | undefined): string {
  return (value ?? []).map((b) => b.children.map((c) => c.text).join("")).join(" ").replace(/\s+/g, " ").trim();
}
