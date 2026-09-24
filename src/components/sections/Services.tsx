import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getHomeContent, getServices } from "@/lib/content";

export async function Services() {
  const [home, services] = await Promise.all([getHomeContent(), getServices()]);

  return (
    <section id="hizmetler" className="bg-paper py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{home.servicesEyebrow}</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em]">
              {home.servicesTitle}
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-[16px] leading-[1.8] text-muted">
              {home.servicesIntro}
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line sm:mt-24">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 60}>
              <div className="group grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-bone/60 sm:py-10 md:grid-cols-12 md:gap-8 md:px-4">
                <span className="text-[11px] font-medium tracking-[0.28em] text-oak md:col-span-1 md:pt-3">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-3xl leading-tight transition-transform duration-500 ease-(--ease-premium) group-hover:translate-x-2 sm:text-4xl md:col-span-4">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted md:col-span-4 md:pt-2">{service.text}</p>
                <ul className="flex flex-wrap content-start gap-2 md:col-span-3 md:justify-end md:pt-2">
                  {service.tags.map((tag) => (
                    <li key={tag} className="border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
