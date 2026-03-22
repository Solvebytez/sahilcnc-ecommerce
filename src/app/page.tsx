import Banner from "@/components/Banner";
import type { BannerSlide } from "@/components/Banner";
import FeaturedProducts from "@/components/FeaturedProducts";
import type { FeaturedProductNode } from "@/components/FeaturedProducts";
import OperationsWeCaterTo from "@/components/OperationsWeCaterTo";
import type { OperationCategoryNode } from "@/components/OperationsWeCaterTo";
import DiscoverSection from "@/components/DiscoverSection";
import ModelsWeOffers from "@/components/ModelsWeOffers";
import { strapiRequest, strapiMediaUrl } from "@/lib/api";
import type { HomePageResponse } from "@/graphql/homepage";
import { HOME_PAGE_QUERY } from "@/graphql/homepage";
import { MODELS_WE_OFFERS_QUERY, type ModelsWeOffersResponse } from "@/graphql/models";

function mapBannerToSlides(home: HomePageResponse["homePage"] | null | undefined): BannerSlide[] | null {
  const banner = home?.data?.attributes?.Banner;
  if (!banner?.Title && !banner?.Description) return null;
  const url = banner.Background?.data?.attributes?.url;
  const src = url ? strapiMediaUrl(url) : "/banner.png";
  return [
    {
      src,
      alt: banner.Title ?? "Banner",
      headline: banner.Title ?? "",
      subheadline: banner.Description ?? "",
    },
  ];
}

function uniqueByCategory(
  list: FeaturedProductNode[]
): FeaturedProductNode[] {
  const seen = new Set<string>();
  return list.filter((p) => {
    const cat = p.attributes?.Category?.data?.attributes;
    const key = cat?.Slug ?? cat?.Title ?? "";
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export async function generateMetadata() {
  try {
    const data = await strapiRequest<HomePageResponse>(HOME_PAGE_QUERY);
    const seo = data?.homePage?.data?.attributes?.seo;
    if (seo?.metaTitle || seo?.metaDescription) {
      return {
        title: seo.metaTitle ?? "Sahil Machines",
        description: seo.metaDescription ?? undefined,
      };
    }
  } catch {
    // fallback to default
  }
  return {
    title: "Sahil Machines - Precision Engineering Since 1965",
    description: "Leading CNC Machine Manufacturers & Suppliers in India | Sahil Machines",
  };
}

export default async function Home() {
  let homeData: HomePageResponse | null = null;
  let modelsData: ModelsWeOffersResponse | null = null;
  try {
    homeData = await strapiRequest<HomePageResponse>(HOME_PAGE_QUERY);
    console.log("[Strapi API] Home page response:", JSON.stringify(homeData, null, 2));
  } catch (err) {
    console.error("[Strapi API] Error:", err);
  }
  try {
    modelsData = await strapiRequest<ModelsWeOffersResponse>(MODELS_WE_OFFERS_QUERY);
    console.log("[Strapi API] Models response:", JSON.stringify(modelsData, null, 2));
  } catch (err) {
    console.error("[Strapi API] Models error:", err);
  }

  const attributes = homeData?.homePage?.data?.attributes;
  const seo = attributes?.seo;
  const bannerSlides = mapBannerToSlides(homeData?.homePage);
  const bannerCta = attributes?.Banner?.ActionButton;
  const rawProducts = (attributes?.Banner?.products?.data ?? []) as FeaturedProductNode[];
  const featuredProducts = rawProducts.map((p) => {
    const attrs = p.attributes;
    const url = attrs?.Thumbnail?.data?.attributes?.url;
    if (!url || url.startsWith("http") || !attrs) return p;
    return {
      ...p,
      attributes: {
        ...attrs,
        Thumbnail: {
          data: { attributes: { url: strapiMediaUrl(url) } },
        },
      },
    };
  });
  const operationTitle = attributes?.CategorySection?.Title ?? "Operations we cater to";
  const operationCategories = (attributes?.CategorySection?.Categories?.data ?? []) as OperationCategoryNode[];
  const discover = attributes?.Discover;
  const modelNodes = modelsData?.products?.data ?? [];
  const modelsProducts = modelNodes
    .filter((n): n is NonNullable<typeof n> => Boolean(n))
    .map((node, index) => {
      const attrs = node.attributes;
      const title = attrs?.Title ?? "";
      const slug = attrs?.Slug ?? "";
      const thumbUrlRaw = attrs?.Thumbnail?.data?.attributes?.url;
      const thumbUrl = thumbUrlRaw ? strapiMediaUrl(thumbUrlRaw) : "/banner.png";

      const catAttrs = attrs?.Category?.data?.attributes;

      return {
        id: node.id ?? slug ?? title ?? String(index),
        attributes: {
          Title: title,
          Slug: slug,
          Tag: "FEATURED",
          Thumbnail: {
            data: { attributes: { url: thumbUrl } },
          },
          Category: {
            data: {
              attributes: {
                Title: catAttrs?.Title ?? "",
                Slug: catAttrs?.Slug ?? "",
              },
            },
          },
        },
      } satisfies FeaturedProductNode;
    });
  const modelsWeOffersProducts = modelsProducts.length ? modelsProducts : featuredProducts;
  const modelsWeOffersUniqueProducts = uniqueByCategory(modelsWeOffersProducts);

  return (
    <div className="min-h-screen bg-white">
      <Banner slides={bannerSlides ?? undefined} cta={bannerCta} />

      <FeaturedProducts
        title="Products we Manufacture"
        viewAllHref="/shop"
        products={featuredProducts}
      />

      <OperationsWeCaterTo title={operationTitle} categories={operationCategories} />

      {discover?.Title && (
        <DiscoverSection
          title={discover.Title}
          highlightedText={discover.HighlightedText ?? ""}
          description={discover.ContentBlock2?.Description ?? ""}
          ctaLabel="ABOUT US"
          ctaHref="https://www.sahilcnc.com/about/"
          backgroundImageUrl="/img.png"
        />
      )}

      <ModelsWeOffers title="Models we offers" products={modelsWeOffersUniqueProducts} />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {seo && (
          <section className="mb-8 rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-sm">
            <h2 className="mb-2 font-semibold text-neutral-800">Home page data (from Strapi)</h2>
            <p><strong>Title:</strong> {seo.metaTitle}</p>
            <p><strong>Description:</strong> {seo.metaDescription}</p>
          </section>
        )}
        {/* TODO: CategorySection, Discover, WorkpieceByIndustriesSection, FAQSection, Clients, FooterContent */}
      </main>
    </div>
  );
}
