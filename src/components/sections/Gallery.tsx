"use client";

import Image from "next/image";
import { useState } from "react";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";

type GalleryItem = { src: string; alt: string; position?: string; project: string; slug: string };

type GalleryProps = { images: GalleryItem[]; eyebrow: string; title: string; text: string };

export function Gallery({ images, eyebrow, title, text }: GalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="galeri" className="bg-ink py-24 text-paper sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em]">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <p className="text-[15px] leading-relaxed text-paper/60">
              {text}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 columns-1 gap-4 sm:mt-20 sm:columns-2 lg:columns-3 lg:gap-6">
          {images.map((img, i) => (
            <Reveal key={`${img.src}-${i}`} delay={(i % 3) * 100} className="mb-4 break-inside-avoid lg:mb-6">
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block w-full overflow-hidden bg-ink-soft text-left"
                aria-label={`${img.project} — ${img.alt} görselini büyüt`}
              >
                <div className={`relative w-full ${i % 3 === 1 ? "aspect-[3/4]" : i % 3 === 2 ? "aspect-square" : "aspect-[4/3]"}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-(--ease-premium) group-hover:scale-[1.05]"
                    style={{ objectPosition: img.position }}
                  />
                </div>
                <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink/80 to-transparent p-5 text-xs uppercase tracking-[0.2em] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.project}
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <Lightbox
        images={images.map((img) => ({ src: img.src, alt: img.alt, caption: `${img.project} — ${img.alt}` }))}
        index={active}
        onChange={setActive}
      />
    </section>
  );
}
