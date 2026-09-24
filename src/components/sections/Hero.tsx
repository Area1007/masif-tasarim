import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/primitives";
import { projects } from "@/lib/projects";

const heroProject = projects.find((p) => p.slug === "mese-evi") ?? projects[0];

export function Hero() {
  return (
    <section aria-label="Giriş" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 -z-10">
        <Image
          src={heroProject.cover.src}
          alt={heroProject.cover.alt}
          fill
          preload
          sizes="100vw"
          quality={85}
          className="animate-hero-zoom object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/20 to-ink/75" />
      </div>

      <Container className="flex flex-1 flex-col justify-end pb-10 pt-32 sm:pb-14">
        <p
          className="animate-fade-up mb-6 text-[11px] font-medium uppercase tracking-[0.32em] text-paper/80"
          style={{ animationDelay: "200ms" }}
        >
          Mimari Tasarım · İç Mimarlık · Uygulama
        </p>
        <h1
          className="animate-fade-up max-w-5xl font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.02em]"
          style={{ animationDelay: "350ms" }}
        >
          Hayalinizdeki mekânı tasarlıyor, <em className="text-bone/90">detaylarıyla</em> hayata geçiriyoruz.
        </h1>

        <div
          className="animate-fade-up mt-12 flex flex-col gap-8 border-t border-paper/25 pt-8 sm:mt-16 sm:flex-row sm:items-end sm:justify-between"
          style={{ animationDelay: "600ms" }}
        >
          <p className="max-w-md text-[15px] leading-relaxed text-paper/80">
            Konut, kafe, restoran ve ticari mekânlar için fikir aşamasından anahtar teslimine uzanan bütüncül bir
            tasarım ve uygulama stüdyosu.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href={`/projeler/${heroProject.slug}`}
              className="group text-right text-xs uppercase tracking-[0.2em] text-paper/70 transition-colors hover:text-paper"
            >
              <span className="block text-paper/50">Öne çıkan proje</span>
              <span className="mt-1 block text-paper">
                {heroProject.title} — {heroProject.location}
              </span>
            </Link>
            <Link
              href="#marka"
              aria-label="Aşağı kaydır"
              className="hidden size-14 shrink-0 items-center justify-center rounded-full border border-paper/40 transition-colors duration-500 hover:bg-paper hover:text-ink sm:flex"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="size-5" aria-hidden>
                <path d="M12 4v15M6 13l6 6 6-6" />
              </svg>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
