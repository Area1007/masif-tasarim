import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { RichText } from "@/components/ui/RichText";
import { getHomeContent } from "@/lib/content";

export async function WhyUs() {
  const { whyEyebrow, whyTitle, whyImage, whyReasons: reasons } = await getHomeContent();

  return (
    <section id="neden-biz" className="bg-paper py-24 sm:py-32 lg:py-40">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>{whyEyebrow}</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em]">
              <RichText value={whyTitle} emClassName="text-oak" />
            </h2>
          </Reveal>
          <Reveal delay={150} className="relative mt-12 hidden aspect-[4/5] overflow-hidden lg:block">
            <Image
              src={whyImage.src}
              alt={whyImage.alt}
              fill
              sizes="40vw"
              className="object-cover"
              style={{ objectPosition: whyImage.position }}
            />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-40">
          <ul className="border-t border-line">
            {reasons.map((reason, i) => (
              <Reveal as="li" key={reason.title} delay={i * 80} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-10">
                <span className="pt-2 text-[11px] font-medium tracking-[0.28em] text-oak">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-3xl leading-tight">{reason.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{reason.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
