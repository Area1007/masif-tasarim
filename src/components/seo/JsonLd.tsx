/**
 * Yapılandırılmış veri (schema.org JSON-LD). İçerik Sanity'den geldiği için "<" kaçışlanır:
 * metinde "</script>" geçse bile etiket kapanmaz.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
