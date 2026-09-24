"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { Project, ProjectCategory } from "@/lib/projects";

type Filter = ProjectCategory | "Tümü";

export function ProjectsGrid({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState<Filter>("Tümü");
  const visible = filter === "Tümü" ? projects : projects.filter((p) => p.category === filter);
  const filters: Filter[] = ["Tümü", ...categories.filter((c) => projects.some((p) => p.category === c))];

  return (
    <>
      <div role="group" aria-label="Kategoriye göre filtrele" className="flex flex-wrap gap-2 border-b border-line pb-8">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`border px-4 py-2 text-[12px] uppercase tracking-[0.14em] transition-colors duration-300 ${
              filter === f ? "border-ink bg-ink text-paper" : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project) => (
          <div key={project.slug} className="animate-fade-up">
            <ProjectCard project={project} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
          </div>
        ))}
      </div>
    </>
  );
}
