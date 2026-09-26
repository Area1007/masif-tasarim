import Image from "next/image";
import Link from "next/link";
import wordmark from "@/assets/brand/masif-logo-yazi.png";

/**
 * Header'daki marka logosu (MASİF + TASARIM VE UYGULAMA yazı logosu).
 *
 * Görsel, orijinal LOGO_YAZITAM.png'nin şeffaf kenarları kırpılmış ve harflerden uzaktaki
 * soluk sis pikselleri temizlenmiş web kopyasıdır; harfler birebir aynıdır.
 * Logo açık renkli olduğu için hero/fotoğraf üzerinde olduğu gibi gösterilir; açık zeminli
 * header'da okunabilmesi için yalnızca rengi koyulaştırılır (brightness filtresi — şekil ve
 * oran değişmez), header'ın renk geçişiyle aynı sürede.
 */
export function Logo({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src={wordmark}
        alt="Masif Tasarım ve Uygulama — Ana sayfa"
        loading="eager"
        sizes="(min-width: 640px) 150px, 122px"
        className={`h-[26px] w-auto object-contain object-left transition-[filter] duration-500 ease-(--ease-premium) sm:h-8 ${
          onDark ? "" : "brightness-30"
        }`}
      />
    </Link>
  );
}
