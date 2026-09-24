import { Hero } from "@/components/sections/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Gallery } from "@/components/sections/Gallery";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { getGalleryImages, getHomeContent } from "@/lib/content";

export default async function HomePage() {
  const [home, galleryImages] = await Promise.all([getHomeContent(), getGalleryImages()]);

  return (
    <>
      <Hero />
      <BrandIntro />
      <About />
      <Services />
      <FeaturedProjects />
      <Gallery
        images={galleryImages}
        eyebrow={home.galleryEyebrow}
        title={home.galleryTitle}
        text={home.galleryText}
      />
      <Process />
      <WhyUs />
      <ContactCTA />
    </>
  );
}
