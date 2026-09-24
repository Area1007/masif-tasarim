import Link from "next/link";
import { navItems, telHref, whatsappLink } from "@/lib/site";
import { getServices, getSiteSettings } from "@/lib/content";
import { Container } from "@/components/ui/primitives";
import { RichText } from "@/components/ui/RichText";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  pinterest: "Pinterest",
  behance: "Behance",
  x: "X",
  tiktok: "TikTok",
};

const linkClass = "text-paper/80 transition-colors hover:text-oak";

export async function Footer() {
  const [settings, services] = await Promise.all([getSiteSettings(), getServices()]);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <Container className="pt-20 pb-10 lg:pt-28">
        <div className="grid gap-14 border-b border-paper/15 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <p className="font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
              <RichText value={settings.footerStatement} emClassName="text-oak" />
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-6">
            <div>
              <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-paper/50">Menü</h2>
              <ul className="space-y-3 text-sm">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-paper/50">İletişim</h2>
              <ul className="space-y-3 text-sm">
                {settings.phones.map((p) => (
                  <li key={p}>
                    <a href={telHref(p)} className={linkClass}>
                      {p}
                    </a>
                  </li>
                ))}
                {settings.email && (
                  <li>
                    <a href={`mailto:${settings.email}`} className={linkClass}>
                      {settings.email}
                    </a>
                  </li>
                )}
                {settings.whatsapp && (
                  <li>
                    <a href={whatsappLink(settings.whatsapp)} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      WhatsApp
                    </a>
                  </li>
                )}
                {settings.socialLinks.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {socialLabels[s.platform] ?? s.platform}
                    </a>
                  </li>
                ))}
                {settings.address && (
                  <li className="whitespace-pre-line text-paper/60">
                    {settings.mapUrl ? (
                      <a href={settings.mapUrl} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-oak">
                        {settings.address}
                      </a>
                    ) : (
                      settings.address
                    )}
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h2 className="mb-5 text-[11px] font-medium uppercase tracking-[0.28em] text-paper/50">Hizmetler</h2>
              <ul className="space-y-3 text-sm text-paper/80">
                {services
                  .filter((s) => s.showInFooter)
                  .map((s) => (
                    <li key={s.title}>{s.shortTitle ?? s.title}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.name}. Tüm hakları saklıdır.
          </p>
          <p className="uppercase tracking-[0.2em]">{settings.tagline}</p>
        </div>
      </Container>
    </footer>
  );
}
