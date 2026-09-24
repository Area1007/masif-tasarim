import Link from "next/link";
import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.28em] text-oak ${className}`}>
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

export function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className={className} aria-hidden>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "dark" | "light" | "outline";
  className?: string;
  external?: boolean;
};

const variants = {
  dark: "bg-ink text-paper hover:bg-walnut",
  light: "bg-paper text-ink hover:bg-bone",
  outline: "border border-current text-current hover:bg-ink hover:text-paper hover:border-ink",
};

export function Button({ href, children, variant = "dark", className = "", external }: ButtonProps) {
  const classes = `group inline-flex items-center gap-4 px-7 py-4 text-[13px] font-medium uppercase tracking-[0.16em] transition-colors duration-500 ${variants[variant]} ${className}`;
  const content = (
    <>
      {children}
      <ArrowIcon className="size-4 transition-transform duration-500 ease-(--ease-premium) group-hover:translate-x-1" />
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}

export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.16em] ${className}`}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-current transition-transform duration-500 ease-(--ease-premium) group-hover:scale-x-0" />
      </span>
      <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
    </Link>
  );
}
