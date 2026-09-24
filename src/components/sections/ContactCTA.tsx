import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getHomeContent, getSiteSettings } from "@/lib/content";
import { telHref, whatsappLink } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export async function ContactCTA() {
  const [home, settings] = await Promise.all([getHomeContent(), getSiteSettings()]);

  return (
    <section id="iletisim" className="border-b border-paper/10 bg-ink-soft py-24 text-paper sm:py-32 lg:py-40">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{home.contactEyebrow}</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] tracking-[-0.015em]">
              {home.contactTitle}
            </h2>
            <p className="mt-8 max-w-md text-[16px] leading-[1.8] text-paper/65">
              {home.contactText}
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 space-y-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.24em] text-paper/45">Telefon</p>
              <div className="mt-2 space-y-1">
                {settings.phones.map((p) => (
                  <a key={p} href={telHref(p)} className="block font-display text-3xl transition-colors hover:text-oak">
                    {p}
                  </a>
                ))}
              </div>
            </div>
            {settings.email && (
              <div>
                <p className="text-[11px] uppercase tracking-[0.24em] text-paper/45">E-posta</p>
                <a href={`mailto:${settings.email}`} className="mt-2 block text-lg hover:text-oak">
                  {settings.email}
                </a>
              </div>
            )}
            <a
              href={whatsappLink(settings.whatsapp, "Merhaba, projem hakkında bilgi almak istiyorum.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-paper/30 px-5 py-3 text-[12px] uppercase tracking-[0.16em] transition-colors duration-500 hover:border-paper hover:bg-paper hover:text-ink"
            >
              WhatsApp ile yazın
            </a>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-6 lg:col-start-7 lg:pt-4">
          <ContactForm whatsapp={settings.whatsapp} />
        </Reveal>
      </Container>
    </section>
  );
}
