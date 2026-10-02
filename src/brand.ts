import logoSource from "./assets/shoresh-logo.svg?raw";

// Both logo treatments and the loader use this one repository-owned source.
const markSource = `${logoSource.slice(0, logoSource.indexOf('  <g class="brand-wordmark"'))}</svg>`
  .replace('viewBox="35 6 295 342"', 'viewBox="48 7 246 249"');

export const brand = {
  name: "Shoresh",
  tagline: "A well-caffeinated shtibl.",
  logo: {
    source: logoSource,
    markSource,
    file: "src/assets/shoresh-logo.svg",
    favicon: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markSource)}`,
  },
  images: {
    hero: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=2200&q=85",
    storefront: "https://static.wixstatic.com/media/e4201b_7d106dc284764bef8793139c936e1a16~mv2.jpg/v1/crop/x_394,y_309,w_1378,h_1959/fill/w_776,h_1102,al_c,q_85,enc_webp/IMG_5676_edited_edited.webp",
  },
} as const;