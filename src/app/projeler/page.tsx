import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { projectCategories, projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projeler",
  description:
    "Masif Tasarım ve Uygulama'nın konut, kafe, restoran, ofis ve mimari projelerinden seçkiler.",
  alternates: { canonical: "/projeler" },
};

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-paper pb-24 pt-36 sm:pb-32 sm:pt-44">
        <Container>
          <div className="animate-fade-up grid gap-8 pb-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>Projeler</Eyebrow>
              <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
                Tasarladık, <em className="text-oak">uyguladık.</em>
              </h1>
            </div>
            <p className="max-w-md text-[16px] leading-[1.8] text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
              Konuttan ticari mekâna, her ölçekte; fikir aşamasından teslimata kadar yürüttüğümüz projelerden bir
              seçki.
            </p>
          </div>
          <ProjectsGrid projects={projects} categories={projectCategories} />
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
