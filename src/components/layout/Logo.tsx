import Image from "next/image";
import Link from "next/link";
import type { LogoImage } from "@/content/types";

const HOME_LABEL = "Masif Tasarım ve Uygulama — Ana sayfa";

/** Yazı tabanlı logo; rengi header'dan (currentColor) alır. Logo yüklenmemişse kullanılır. */
function Wordmark() {
  return (
    <>
      <span className="font-display text-[28px] leading-none tracking-[-0.01em] sm:text-[32px]">Masif</span>
      <span className="hidden text-[10px] font-medium uppercase leading-tight tracking-[0.26em] opacity-70 sm:block">
        Tasarım
        <br />& Uygulama
      </span>
    </>
  );
}

type LogoProps = {
  className?: string;
  /** Koyu/fotoğraflı zeminde kullanılacak açık renkli logo (Sanity) */
  logoLight?: LogoImage;
  /** Açık zeminde kullanılacak koyu renkli logo (Sanity) */
  logoDark?: LogoImage;
  /** Header şu an koyu/fotoğraflı zeminin üzerinde mi? */
  onDark?: boolean;
};

export function Logo({ className = "", logoLight, logoDark, onDark = false }: LogoProps) {
  // Hiç logo yüklenmemiş: önceki yazı logosu, birebir aynı yapıda
  if (!logoLight && !logoDark) {
    return (
      <Link href="/" aria-label={HOME_LABEL} className={`group flex items-baseline gap-3 ${className}`}>
        <Wordmark />
      </Link>
    );
  }

  // İki varyant aynı hücrede üst üste durur; header rengi değişirken yumuşakça geçiş yapar.
  // Bir varyant yüklenmemişse o zeminde yazı logosu gösterilir (her iki zeminde okunaklı kalır).
  const variants = [
    { key: "light", logo: logoLight, active: onDark },
    { key: "dark", logo: logoDark, active: !onDark },
  ];
  const activeLogo = onDark ? logoLight : logoDark;

  return (
    <Link
      href="/"
      aria-label={activeLogo ? undefined : HOME_LABEL}
      className={`grid items-center ${className}`}
    >
      {variants.map(({ key, logo, active }) => (
        <span
          key={key}
          aria-hidden={!active}
          className={`col-start-1 row-start-1 flex items-center transition-opacity duration-500 ease-(--ease-premium) ${
            active ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          {logo ? (
            // Oran korunur: yükseklik sabit, genişlik otomatik; kutuya sığmayan geniş logolar küçülür (contain)
            <Image
              src={logo.src}
              alt={active ? logo.alt || HOME_LABEL : ""}
              width={logo.width}
              height={logo.height}
              sizes="200px"
              loading="eager"
              className="h-8 w-auto max-w-36 object-contain object-left sm:h-10 sm:max-w-50"
            />
          ) : (
            <span className="flex items-baseline gap-3">
              <Wordmark />
            </span>
          )}
        </span>
      ))}
    </Link>
  );
}
