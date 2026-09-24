import Image from "next/image";
import { Container, Eyebrow, TextLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { getAboutContent } from "@/lib/content";

export async function About() {
  const about = await getAboutContent();
  const main = about.mainImage;
  const detail = about.detailImage;

  return (
    <section id="hakkimizda" className="bg-bone py-24 sm:py-32 lg:py-40">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-6">
          <Reveal className="relative aspect-[4/5] w-full overflow-hidden sm:w-4/5">
            <Image src={main.src} alt={main.alt} fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" style={{ objectPosition: main.position }} />
          </Reveal>
          <Reveal
            delay={200}
            className="absolute -bottom-10 right-0 aspect-square w-1/2 overflow-hidden border-[10px] border-bone sm:w-2/5"
          >
            <Image src={detail.src} alt={detail.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" style={{ objectPosition: detail.position }} />
          </Reveal>
        </div>

        <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <Reveal>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em]">
              {about.title}
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 space-y-5 text-[16px] leading-[1.8] text-muted">
            {about.paragraphs.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </Reveal>
          <Reveal delay={200} className="mt-10">
            <TextLink href="/projeler">{about.linkLabel}</TextLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
