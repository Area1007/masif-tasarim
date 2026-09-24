import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectCardProps = {
  project: Project;
  aspect?: string;
  sizes?: string;
};

export function ProjectCard({ project, aspect = "aspect-[4/5]", sizes = "(min-width: 1024px) 50vw, 100vw" }: ProjectCardProps) {
  return (
    <Link href={`/projeler/${project.slug}`} className="group block">
      <div className={`relative overflow-hidden bg-stone ${aspect}`}>
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-[1.4s] ease-(--ease-premium) group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-ink/0 transition-colors duration-700 group-hover:bg-ink/10" />
      </div>
      <div className="mt-5 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-display text-2xl leading-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-1.5 text-[13px] text-muted">
            {project.category} · {project.location}
          </p>
        </div>
        <span className="pt-2 text-[12px] tracking-[0.12em] text-muted">{project.year}</span>
      </div>
    </Link>
  );
}
