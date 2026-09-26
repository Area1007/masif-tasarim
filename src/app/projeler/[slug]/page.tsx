import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArrowIcon, Button, Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { getAdjacentProject, getProject, getProjectByPreviousSlug, getProjects, getSiteSettings } from "@/lib/content";
import { decodeSlugParam, normalizeSlug } from "@/lib/slug";

// Sanity'ye sonradan eklenen projeler de yeniden deploy gerekmeden yayınlanır.
export const dynamicParams = true;

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

/** URL'deki slug'ı çözer; Next.js parametreleri kodlanmış verebilir (ör. "mese-evi%20"). */
async function resolveSlug(params: PageProps<"/projeler/[slug]">["params"]) {
  return decodeSlugParam((await params).slug);
}

export async function generateMetadata({ params }: PageProps<"/projeler/[slug]">): Promise<Metadata> {
  const slug = await resolveSlug(params);
  const [project, settings] = await Promise.all([getProject(slug), getSiteSettings()]);
  if (!project) return {};

  return {
    title: `${project.title} — ${project.category}`,
    description: project.summary,
    alternates: { canonical: `/projeler/${project.slug}` },
    openGraph: {
      title: `${project.title} | ${settings.name}`,
      description: project.summary,
      images: [{ url: project.cover.src, alt: project.cover.alt }],
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/projeler/[slug]">) {
  const slug = await resolveSlug(params);
  const project = await getProject(slug);
  if (!project) {
    // 1) Hatalı yazılmış adres (ör. sonunda boşluk, büyük harf) → projenin doğru adresi
    // 2) Projenin eski adresi (adres bilerek değiştirildiyse) → güncel adres
    // Her ikisi de kalıcı yönlendirme (308); eşleşme yoksa 404.
    const canonical = normalizeSlug(slug);
    if (canonical && canonical !== slug && (await getProject(canonical))) {
      permanentRedirect(`/projeler/${canonical}`);
    }
    const moved = canonical ? await getProjectByPreviousSlug(canonical) : undefined;
    if (moved) permanentRedirect(`/projeler/${moved.slug}`);
    notFound();
  }

  const next = await getAdjacentProject(project.slug);
  const facts = [
    { label: "Kategori", value: project.category },
    { label: "Konum", value: project.location },
    { label: "Yıl", value: project.year },
    { label: "Alan", value: project.area },
  ];

  return (
    <article>
      {/* Kapak */}
      <header className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink text-paper">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          preload
          sizes="100vw"
          quality={85}
          className="animate-hero-zoom -z-10 object-cover"
          style={{ objectPosition: project.cover.position }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/40 via-transparent to-ink/75" />
        <Container className="animate-fade-up pb-12 pt-40 sm:pb-16">
          <nav aria-label="Sayfa konumu" className="mb-8 text-[11px] uppercase tracking-[0.24em] text-paper/70">
            <Link href="/projeler" className="hover:text-paper">
              Projeler
            </Link>
            <span className="mx-3">/</span>
            <span className="text-paper">{project.title}</span>
          </nav>
          <h1 className="font-display text-[clamp(3rem,9vw,8rem)] leading-[0.92] tracking-[-0.02em]">{project.title}</h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-paper/80">{project.summary}</p>
        </Container>
      </header>

      {/* Künye ve açıklama */}
      <section className="bg-paper py-20 sm:py-28 lg:py-36">
        <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <dl className="border-t border-line">
              {facts.map((f) => (
                <div key={f.label} className="flex justify-between gap-6 border-b border-line py-4 text-[14px]">
                  <dt className="uppercase tracking-[0.16em] text-muted">{f.label}</dt>
                  <dd className="text-right">{f.value}</dd>
                </div>
              ))}
              <div className="border-b border-line py-4 text-[14px]">
                <dt className="uppercase tracking-[0.16em] text-muted">Hizmetler</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span key={s} className="border border-line px-3 py-1 text-[12px]">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <Eyebrow>Proje Hakkında</Eyebrow>
            <div className="mt-8 space-y-6">
              {project.description.map((paragraph, i) => (
                <p
                  key={i}
                  className={
                    i === 0
                      ? "font-display text-[clamp(1.6rem,2.6vw,2.4rem)] leading-[1.3]"
                      : "text-[16px] leading-[1.85] text-muted"
                  }
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Görseller */}
      <ProjectGallery images={project.gallery} title={project.title} />

      {/* Sonraki proje */}
      <section className="bg-bone">
        <Container className="py-20 sm:py-28">
          <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
            <Link href={`/projeler/${next.slug}`} className="group block">
              <p className="text-[11px] uppercase tracking-[0.28em] text-muted">Sonraki proje</p>
              <p className="mt-4 flex items-center gap-6 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-none">
                {next.title}
                <ArrowIcon className="size-10 transition-transform duration-500 group-hover:translate-x-3 sm:size-14" />
              </p>
            </Link>
            <Button href="/#iletisim">Benzer bir proje için teklif alın</Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
