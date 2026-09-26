const image = `{ asset, alt, hotspot, crop }`;
// Logo: oranı korumak için görselin gerçek boyutları ve biçimi de alınır
const logo = `{ alt, "asset": asset->{ _id, extension, "width": metadata.dimensions.width, "height": metadata.dimensions.height } }`;

const projectFields = `
  title,
  "slug": slug.current,
  previousSlugs,
  category,
  location,
  year,
  area,
  services,
  summary,
  description,
  featured,
  cover ${image},
  gallery[] ${image}
`;

export const projectsQuery = `*[_type == "project" && defined(slug.current)] | order(orderRank asc) { ${projectFields} }`;

export const servicesQuery = `*[_type == "service"] | order(orderRank asc) { title, text, tags, showInFooter, shortTitle }`;

export const settingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  name, tagline, footerStatement, phones, whatsapp, email, address, mapUrl,
  socialLinks[] { platform, url }, seoTitle, seoDescription, seoKeywords, ogImage ${image},
  logoLight ${logo}, logoDark ${logo}
}`;

export const homeQuery = `*[_type == "homePage" && _id == "homePage"][0] {
  ...,
  "heroProjectSlug": heroProject->slug.current,
  heroImage ${image},
  whyImage ${image}
}`;

export const aboutQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0] {
  eyebrow, title, paragraphs, linkLabel, mainImage ${image}, detailImage ${image}
}`;

export const projectsPageQuery = `*[_type == "projectsPage" && _id == "projectsPage"][0] {
  eyebrow, title, intro, seoDescription
}`;
