"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { LogoImage } from "@/content/types";
import { navItems, telHref } from "@/lib/site";
import { Logo } from "./Logo";

type HeaderProps = {
  phones: string[];
  logoLight?: LogoImage;
  logoDark?: LogoImage;
};

export function Header({ phones, logoLight, logoDark }: HeaderProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Ana sayfa ve proje detaylarında header, tam ekran görselin üzerinde şeffaf başlar.
  const overHero = pathname === "/" || /^\/projeler\/[^/]+$/.test(pathname);
  const solid = scrolled || !overHero || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sayfa değişince mobil menüyü kapat
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,padding] duration-500 ease-(--ease-premium) ${
        solid
          ? "border-b border-line/70 bg-paper/90 py-4 text-ink backdrop-blur-md"
          : "border-b border-transparent py-6 text-paper"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo logoLight={logoLight} logoDark={logoDark} onDark={!solid} />

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group relative text-[13px] font-medium uppercase tracking-[0.16em]"
                >
                  {item.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-(--ease-premium) group-hover:origin-left group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-6">
          {phones[0] && (
            <a href={telHref(phones[0])} className="hidden text-[13px] font-medium tracking-[0.08em] xl:block">
              {phones[0]}
            </a>
          )}
          <Link
            href="/#iletisim"
            className={`hidden border px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 sm:inline-block ${
              solid ? "border-ink hover:bg-ink hover:text-paper" : "border-paper/70 hover:bg-paper hover:text-ink"
            }`}
          >
            Teklif Alın
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
            className="relative -mr-2 flex size-10 items-center justify-center lg:hidden"
          >
            <span
              className={`absolute h-px w-6 bg-current transition-transform duration-500 ease-(--ease-premium) ${open ? "rotate-45" : "-translate-y-[4px]"}`}
            />
            <span
              className={`absolute h-px w-6 bg-current transition-transform duration-500 ease-(--ease-premium) ${open ? "-rotate-45" : "translate-y-[4px]"}`}
            />
          </button>
        </div>
      </div>

    </header>
      {/* Mobil menü */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 bg-paper pt-20 text-ink transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobil menü" className="flex h-full flex-col justify-between px-5 pb-10 pt-6 sm:px-8">
          <ul className="space-y-1">
            {navItems.map((item, i) => (
              <li
                key={item.href}
                className={`transition-all duration-700 ease-(--ease-premium) ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
              >
                <Link href={item.href} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-display text-4xl">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-2 text-sm text-muted">
            {phones.map((p) => (
              <a key={p} href={telHref(p)} className="block text-lg text-ink">
                {p}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
