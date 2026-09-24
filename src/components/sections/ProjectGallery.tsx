"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/primitives";
import { Lightbox } from "@/components/ui/Lightbox";
import { Reveal } from "@/components/ui/Reveal";
import type { ProjectImage } from "@/lib/projects";

/** Proje detay sayfasındaki editoryal görsel akışı: bir tam genişlik, iki yan yana... */
export function ProjectGallery({ images, title }: { images: ProjectImage[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section aria-label={`${title} görselleri`} className="bg-paper pb-24 sm:pb-32">
      <Container className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {images.map((img, i) => {
          const wide = i % 3 === 0;
          return (
            <Reveal key={img.src} className={wide ? "sm:col-span-2" : ""} delay={wide ? 0 : (i % 3) * 100}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${img.alt} görselini büyüt`}
                className={`group relative block w-full overflow-hidden bg-stone ${wide ? "aspect-[16/9]" : "aspect-[4/5]"}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={wide ? "100vw" : "(min-width: 640px) 50vw, 100vw"}
                  className="object-cover transition-transform duration-[1.4s] ease-(--ease-premium) group-hover:scale-[1.03]"
                />
              </button>
            </Reveal>
          );
        })}
      </Container>
      <Lightbox images={images} index={active} onChange={setActive} />
    </section>
  );
}
