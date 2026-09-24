import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";

const services = [
  {
    title: "Mimari Tasarım",
    text: "Arazi ve ihtiyaç analizinden başlayarak konut ve ticari yapılar için bağlamına uyumlu, işlevsel ve estetik mimari çözümler geliştiriyoruz.",
    tags: ["Konsept", "Avan proje", "Uygulama projesi"],
  },
  {
    title: "İç Mimari Tasarım",
    text: "Konut, kafe, restoran ve ofis gibi mekânlarda akışı, ışığı ve malzemeyi birlikte ele alan bütüncül iç mekân kurguları tasarlıyoruz.",
    tags: ["Mekân planlama", "Malzeme seçimi", "Özel mobilya"],
  },
  {
    title: "3D Görselleştirme",
    text: "Fotogerçekçi görsellerle tasarımı uygulama öncesinde görmenizi, kararlarınızı güvenle vermenizi sağlıyoruz.",
    tags: ["Fotogerçekçi render", "Malzeme alternatifleri", "Işık senaryoları"],
  },
  {
    title: "Teknik Proje",
    text: "Tasarımın sahaya eksiksiz aktarılması için ölçülü çizimler, detay paftaları ve üretim dokümanları hazırlıyoruz.",
    tags: ["Detay çizimleri", "Aydınlatma planı", "Metraj"],
  },
  {
    title: "Uygulama & Anahtar Teslim",
    text: "Üretim, montaj ve saha koordinasyonunu kendi ekibimizle yöneterek projeyi zamanında ve tasarlandığı gibi teslim ediyoruz.",
    tags: ["Saha yönetimi", "Üretim", "Teslimat"],
  },
];

export function Services() {
  return (
    <section id="hizmetler" className="bg-paper py-24 sm:py-32 lg:py-40">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Hizmetlerimiz</Eyebrow>
            <h2 className="mt-8 font-display text-[clamp(2.25rem,4vw,3.75rem)] leading-[1.05] tracking-[-0.015em]">
              Tasarımdan uygulamaya, tek bir ekip.
            </h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:col-start-8 lg:self-end">
            <p className="text-[16px] leading-[1.8] text-muted">
              Tasarım ve uygulamanın aynı ekip tarafından yürütülmesi, fikir ile sonuç arasındaki mesafeyi kısaltır.
              Süreç boyunca tek muhatapla çalışır, her kararın arkasındaki nedeni bilirsiniz.
            </p>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line sm:mt-24">
          {services.map((service, i) => (
            <Reveal as="li" key={service.title} delay={i * 60}>
              <div className="group grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-bone/60 sm:py-10 md:grid-cols-12 md:gap-8 md:px-4">
                <span className="text-[11px] font-medium tracking-[0.28em] text-oak md:col-span-1 md:pt-3">
                  0{i + 1}
                </span>
                <h3 className="font-display text-3xl leading-tight transition-transform duration-500 ease-(--ease-premium) group-hover:translate-x-2 sm:text-4xl md:col-span-4">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted md:col-span-4 md:pt-2">{service.text}</p>
                <ul className="flex flex-wrap content-start gap-2 md:col-span-3 md:justify-end md:pt-2">
                  {service.tags.map((tag) => (
                    <li key={tag} className="border border-line px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] text-muted">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
