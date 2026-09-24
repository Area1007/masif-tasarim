import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Masif Tasarım ve Uygulama — Ana sayfa" className={`group flex items-baseline gap-3 ${className}`}>
      <span className="font-display text-[28px] leading-none tracking-[-0.01em] sm:text-[32px]">Masif</span>
      <span className="hidden text-[10px] font-medium uppercase leading-tight tracking-[0.26em] opacity-70 sm:block">
        Tasarım
        <br />& Uygulama
      </span>
    </Link>
  );
}
