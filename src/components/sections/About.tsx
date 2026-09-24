import Image from "next/image";
import { Container, Eyebrow, TextLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

const aboutImages = {
  main: {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
    alt: "Mimari çizimler ve proje çalışması",
  },
  detail: {
    src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80",
    alt: "Ahşap ve doğal malzeme detayı",
  },
};

export function About() {
  return (
    <section id="hakkimizda" className="bg-bone py-24 sm:py-32 lg:py-40">
      <Container className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="relative lg:col-span-6">
          <Reveal className="relative aspect-[4/5] w-full overflow-hidden sm:w-4/5">
            <Image src={aboutImages.main.src} alt={aboutImages.main.alt} fill sizes="(min-width: 1024px) 40vw, 80vw" className="object-cover" />
          </Reveal>
          <Reveal
            delay={200}
            className="absolute -bottom-10 right-0 aspect-square w-1/2 overflow-hidden border-[10px] border-bone sm:w-2/5"
          >
            <Image src={aboutImages.detail.src} alt={aboutImages.detail.alt} fill sizes="(min-width: 1024px) 20vw, 50vw" className="object-cover" />
          </Reveal>
        </div>

        <div className="mt-8 lg:col-span-5 lg:col-start-8 lg:mt-0">
          <Reveal>
            <Eyebrow>Hakkımızda</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em]">
              Fikriniz mekâna dönüşsün.
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 space-y-5 text-[16px] leading-[1.8] text-muted">
            <p>
              Masif Tasarım ve Uygulama; konut, kafe, restoran ve ticari mekânlar için konsept tasarım, 3D
              görselleştirme, teknik proje ve uygulama hizmetlerini tek çatı altında sunan bir tasarım stüdyosudur.
            </p>
            <p>
              Her projeye mekânı kullanacak insanları dinleyerek başlarız. Ortaya çıkan tasarımı gerçekçi
              görsellerle birlikte netleştirir, ardından malzeme seçiminden üretime kadar sürecin tamamını kendi
              ekibimizle hayata geçiririz. Böylece çizimde gördüğünüz, teslim aldığınız mekânla birebir örtüşür.
            </p>
          </Reveal>
          <Reveal delay={200} className="mt-10">
            <TextLink href="/projeler">Projelerimizi inceleyin</TextLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
