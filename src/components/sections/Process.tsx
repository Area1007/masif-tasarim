import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

const steps = [
  { title: "Tanışma & Keşif", text: "İhtiyaçlarınızı, beklentilerinizi ve bütçenizi dinler; mekânı yerinde inceler, ölçümleri alırız." },
  { title: "Konsept Tasarım", text: "Mekânın kimliğini belirleyen plan şemaları, malzeme paleti ve atmosfer önerileri hazırlarız." },
  { title: "3D Görselleştirme", text: "Tasarımı fotogerçekçi görsellerle sunar, birlikte son haline getiririz." },
  { title: "Teknik Proje", text: "Uygulama çizimleri, detaylar ve metrajla sahaya hazır eksiksiz bir proje dosyası oluştururuz." },
  { title: "Uygulama & Teslim", text: "Üretim ve montajı kendi ekibimizle yönetir, mekânı kullanıma hazır şekilde teslim ederiz." },
];

export function Process() {
  return (
    <section id="surec" className="bg-bone py-24 sm:py-32 lg:py-40">
      <Container>
        <Reveal>
          <Eyebrow>Çalışma Sürecimiz</Eyebrow>
          <h2 className="mt-8 max-w-3xl font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em]">
            İlk görüşmeden anahtar teslimine, şeffaf ve planlı bir süreç.
          </h2>
        </Reveal>

        <ol className="mt-16 grid gap-px bg-line sm:mt-24 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 100} className="bg-bone py-8 sm:pr-8 lg:px-6 lg:py-2 lg:first:pl-0">
              <span className="font-display text-5xl text-oak/80">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-[15px] font-semibold uppercase tracking-[0.12em]">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
