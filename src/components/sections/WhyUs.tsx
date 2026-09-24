import Image from "next/image";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

const reasons = [
  {
    title: "Tek muhatap, bütüncül süreç",
    text: "Tasarım, proje ve uygulama aynı ekipte. Aradaki kopukluklar ve sorumluluk boşlukları ortadan kalkar.",
  },
  {
    title: "Uygulamadan önce görün",
    text: "Gerçekçi 3D görselleştirmelerle sürprizlere yer bırakmaz, kararlarınızı güvenle verirsiniz.",
  },
  {
    title: "Malzeme ve detay hassasiyeti",
    text: "Doğal ve dayanıklı malzemeleri özenli işçilikle bir araya getirir, her birleşimi ölçüyle çözeriz.",
  },
  {
    title: "Şeffaf bütçe, net takvim",
    text: "İş kalemleri ve süreler baştan belirlenir; süreç boyunca her aşamadan düzenli olarak haberdar olursunuz.",
  },
];

export function WhyUs() {
  return (
    <section id="neden-biz" className="bg-paper py-24 sm:py-32 lg:py-40">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <Eyebrow>Neden Masif?</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em]">
              Çizimde gördüğünüz, <em className="text-oak">teslim aldığınız</em> mekândır.
            </h2>
          </Reveal>
          <Reveal delay={150} className="relative mt-12 hidden aspect-[4/5] overflow-hidden lg:block">
            <Image
              src="https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80"
              alt="Doğal ışık alan sade iç mekân"
              fill
              sizes="40vw"
              className="object-cover"
            />
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 lg:pt-40">
          <ul className="border-t border-line">
            {reasons.map((reason, i) => (
              <Reveal as="li" key={reason.title} delay={i * 80} className="grid grid-cols-[3rem_1fr] gap-4 border-b border-line py-10">
                <span className="pt-2 text-[11px] font-medium tracking-[0.28em] text-oak">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl leading-tight">{reason.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{reason.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
