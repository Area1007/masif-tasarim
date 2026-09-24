import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { RichText } from "@/components/ui/RichText";
import { getProjects, getProjectsPageContent } from "@/lib/content";
import { projectCategories } from "@/lib/projects";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProjectsPageContent();
  return {
    title: "Projeler",
    description: page.seoDescription,
    alternates: { canonical: "/projeler" },
  };
}

export default async function ProjectsPage() {
  const [page, projects] = await Promise.all([getProjectsPageContent(), getProjects()]);

  return (
    <>
      <section className="bg-paper pb-24 pt-36 sm:pb-32 sm:pt-44">
        <Container>
          <div className="animate-fade-up grid gap-8 pb-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>{page.eyebrow}</Eyebrow>
              <h1 className="mt-8 font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[-0.02em]">
                <RichText value={page.title} emClassName="text-oak" />
              </h1>
            </div>
            <p className="max-w-md text-[16px] leading-[1.8] text-muted lg:col-span-4 lg:col-start-9 lg:self-end">
              {page.intro}
            </p>
          </div>
          <ProjectsGrid projects={projects} categories={projectCategories} />
        </Container>
      </section>
      <ContactCTA />
    </>
  );
}
