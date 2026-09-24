"use client";

import Image from "next/image";
import { useCallback, useEffect } from "react";

export type LightboxImage = { src: string; alt: string; caption?: string };

type LightboxProps = {
  images: LightboxImage[];
  index: number | null;
  onChange: (index: number | null) => void;
};

export function Lightbox({ images, index, onChange }: LightboxProps) {
  const open = index !== null;
  const close = useCallback(() => onChange(null), [onChange]);
  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onChange((index + dir + images.length) % images.length);
    },
    [index, images.length, onChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  if (!open) return null;
  const image = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Görsel görüntüleyici"
      className="fixed inset-0 z-[70] flex flex-col bg-ink/95 text-paper backdrop-blur-sm"
      onClick={close}
    >
      <div className="flex items-center justify-between px-5 py-5 text-xs uppercase tracking-[0.2em] sm:px-8">
        <span className="text-paper/60">
          {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
        </span>
        <button type="button" onClick={close} className="p-2 hover:text-oak" aria-label="Kapat">
          Kapat ✕
        </button>
      </div>

      <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
        <Image key={image.src} src={image.src} alt={image.alt} fill sizes="100vw" className="animate-fade-up object-contain px-4 sm:px-20" />
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Önceki görsel"
          className="absolute left-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center text-2xl text-paper/70 hover:text-paper sm:left-6"
        >
          ←
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Sonraki görsel"
          className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center text-2xl text-paper/70 hover:text-paper sm:right-6"
        >
          →
        </button>
      </div>

      <p className="px-5 py-6 text-center text-sm text-paper/70">{image.caption ?? image.alt}</p>
    </div>
  );
}
