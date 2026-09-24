import { Container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

const pillars = [
  { title: "Tasarım", text: "Mekânın ihtiyaçlarını analiz ederek işlevsel ve özgün çözümler üretiriz." },
  { title: "Görselleştirme", text: "Gerçekçi 3D görsellerle mekânınızı uygulamadan önce deneyimlersiniz." },
  { title: "Uygulama", text: "Malzeme seçiminden üretime, montajdan teslimata her adımı yönetiriz." },
];

export function BrandIntro() {
  return (
    <section id="marka" className="bg-paper py-24 sm:py-32 lg:py-44">
      <Container>
        <Reveal>
          <p className="font-display text-[clamp(2rem,4.6vw,4.25rem)] leading-[1.12] tracking-[-0.015em] text-ink">
            <span className="text-oak">Masif</span>; sağlam, dürüst ve özünden ödün vermeyen. Tasarladığımız her mekânda
            bu karakteri arıyoruz —{" "}
            <em className="text-muted">fikirden ilk çizgiye, ilk çizgiden son detaya kadar.</em>
          </p>
        </Reveal>

        <div className="mt-20 grid gap-px bg-line sm:mt-28 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 120} className="bg-paper py-8 md:px-8 md:py-4 md:first:pl-0">
              <span className="text-[11px] font-medium tracking-[0.28em] text-oak">0{i + 1}</span>
              <h3 className="mt-4 font-display text-3xl">{pillar.title}</h3>
              <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted">{pillar.text}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
