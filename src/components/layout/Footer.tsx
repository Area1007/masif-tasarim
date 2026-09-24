import Link from "next/link";
import { navItems, siteConfig, whatsappLink } from "@/lib/site";
import { Container } from "@/components/ui/primitives";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <Container className="pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 border-b border-paper/15 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              Mekânlar daha
              <br />
              <em className="text-oak">fazlasını</em> anlatır.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-paper/50">Menü</h2>
              <ul className="space-y-3 text-sm">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-paper/80 transition-colors hover:text-oak">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-paper/50">İletişim</h2>
              <ul className="space-y-3 text-sm">
                {siteConfig.phones.map((p) => (
                  <li key={p.href}>
                    <a href={p.href} className="text-paper/80 transition-colors hover:text-oak">
                      {p.label}
                    </a>
                  </li>
                ))}
                {siteConfig.email && (
                  <li>
                    <a href={`mailto:${siteConfig.email}`} className="text-paper/80 transition-colors hover:text-oak">
                      {siteConfig.email}
                    </a>
                  </li>
                )}
                <li>
                  <a
                    href={whatsappLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-paper/80 transition-colors hover:text-oak"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-paper/50">Hizmetler</h2>
              <ul className="space-y-3 text-sm text-paper/80">
                <li>Mimari Tasarım</li>
                <li>İç Mimarlık</li>
                <li>3D Görselleştirme</li>
                <li>Uygulama</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tüm hakları saklıdır.
          </p>
          <p className="uppercase tracking-[0.2em]">{siteConfig.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
