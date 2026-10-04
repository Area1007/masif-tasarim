import { Hero } from "@/components/sections/Hero";
import { BrandIntro } from "@/components/sections/BrandIntro";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Gallery } from "@/components/sections/Gallery";
import { Process } from "@/components/sections/Process";
import { WhyUs } from "@/components/sections/WhyUs";
import { ContactCTA } from "@/components/sections/ContactCTA";
import type { Metadata } from "next";
import { getGalleryImages, getHomeContent, getSiteSettings } from "@/lib/content";
import { getDefaultShareImages, openGraphFor } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const [settings, images] = await Promise.all([getSiteSettings(), getDefaultShareImages()]);
  return {
    title: { absolute: settings.seoTitle },
    description: settings.seoDescription,
    alternates: { canonical: "/" },
    openGraph: openGraphFor(settings, {
      url: "/",
      title: settings.seoTitle,
      description: settings.seoDescription,
      images,
    }),
  };
}

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
