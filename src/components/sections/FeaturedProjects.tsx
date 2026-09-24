import { Container, Eyebrow, TextLink } from "@/components/ui/primitives";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { getFeaturedProjects } from "@/lib/projects";

export function FeaturedProjects() {
  const featured = getFeaturedProjects().slice(0, 4);

  return (
    <section id="projeler" className="bg-paper pb-24 sm:pb-32 lg:pb-40">
      <Container>
        <div className="flex flex-col gap-8 border-t border-line pt-24 sm:flex-row sm:items-end sm:justify-between sm:pt-32">
          <Reveal>
            <Eyebrow>Öne Çıkan Projeler</Eyebrow>
            <h2 className="mt-8 max-w-2xl font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em]">
              Her mekânın kendine ait bir hikâyesi var.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <TextLink href="/projeler">Tüm projeler</TextLink>
          </Reveal>
        </div>

        {/* Asimetrik, editoryal yerleşim */}
        <div className="mt-16 grid gap-x-10 gap-y-16 sm:mt-20 md:grid-cols-12 md:gap-y-24">
          {featured.map((project, i) => {
            const layout = [
              "md:col-span-7",
              "md:col-span-5 md:mt-40",
              "md:col-span-5",
              "md:col-span-7 md:-mt-24",
            ][i % 4];
            const aspect = i % 3 === 0 ? "aspect-[4/3]" : "aspect-[4/5]";
            return (
              <Reveal key={project.slug} className={layout} delay={(i % 2) * 120}>
                <ProjectCard project={project} aspect={aspect} sizes="(min-width: 768px) 58vw, 100vw" />
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
