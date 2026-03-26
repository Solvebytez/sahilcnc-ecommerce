export type StaticProduct = {
  slug: string;
  name: string;
  subtitle: string;
  price: string;
  description: string;
  features: string[];
  images: string[];
};

// Minimal static catalog for now. We'll replace with Strapi later.
export const STATIC_PRODUCTS: Record<string, StaticProduct> = {
  "cnc-vtl-300-turret": {
    slug: "cnc-vtl-300-turret",
    name: "CNC VTL 300 Turret",
    subtitle: "Vertical Turning Lathe",
    price: "Contact for Quote",
    description:
      "Discover precision with Sahil Machines' Surat CNC VTL 300. This CNC Vertical Turning Lathe (Turret Type) boasts a 650mm turning diameter and 750mm turning length. It's equipped with an 18.5/15kW spindle motor and LM guideways for accurate movement. The Pragati Make BTP 100 turret has 8 stations for flexible tooling. Controlled by a Siemens 828D/Fanuc 0i TF, this compact machine (2x1.8x2M) ensures top performance.",
    features: [
      "650mm Max Turning Diameter",
      "750mm Max Turning Length",
      "Siemens 828D/Fanuc 0i TF Controller",
      "8-Station Turret",
      "LM Guideways",
      "18.5/15kW Spindle Motor",
    ],
    images: ["/banner.png", "/img.png", "/logo-header.png"],
  },
  "cnc-dm-80": {
    slug: "cnc-dm-80",
    name: "CNC DM 80",
    subtitle: "CNC Double Column Milling",
    price: "Contact for Quote",
    description:
      "Static placeholder for CNC DM 80. Next step: fetch from Strapi and render real specs, images, and brochure links.",
    features: ["FANUC/Siemens controller options", "Heavy-duty double column design", "High rigidity structure"],
    images: ["/banner.png", "/img.png", "/logo-header.png"],
  },
};

export function getStaticProduct(slug: string): StaticProduct | null {
  return STATIC_PRODUCTS[slug] ?? null;
}

export function getStaticOrPlaceholderProduct(slug: string | undefined | null): StaticProduct {
  const safeSlug = (slug ?? "").trim();
  const existing = safeSlug ? getStaticProduct(safeSlug) : null;
  if (existing) return existing;
  const nameSource = safeSlug || "product";
  const name = nameSource
    .split("-")
    .map((p) => (p ? p[0]!.toUpperCase() + p.slice(1) : p))
    .join(" ");
  return {
    slug: safeSlug || "product",
    name,
    subtitle: "Product Details (Static Placeholder)",
    price: "Contact for Quote",
    description:
      "This is a static placeholder product page so links work during development. Next step: load real product data from Strapi by slug.",
    features: ["Static route working", "Ready for Strapi integration", "SEO metadata included"],
    images: ["/banner.png", "/img.png", "/logo-header.png"],
  };
}

