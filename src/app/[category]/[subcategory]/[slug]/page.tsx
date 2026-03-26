import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { strapiMediaUrl, strapiRequest } from "@/lib/api";
import { PRODUCT_DETAIL_QUERY, type ProductDetailResponse } from "@/graphql/product-detail";
import ProductDetailsClient, { type ProductDetailUIModel } from "./product-details-client";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subcategory: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await strapiRequest<ProductDetailResponse>(PRODUCT_DETAIL_QUERY, {
    product: slug,
    subCategory: null,
  });
  const p = data?.product?.data?.[0]?.attributes;
  if (!p) return { title: "Product not found" };
  const title = p.seo?.metaTitle ?? p.Title ?? "Product";
  const description = p.seo?.metaDescription ?? undefined;
  return { title, description };
}

export default async function ThreeLevelProductPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string; slug: string }>;
}) {
  const { category, subcategory, slug } = await params;

  const data = await strapiRequest<ProductDetailResponse>(PRODUCT_DETAIL_QUERY, {
    product: slug,
    subCategory: subcategory,
  });
  const entity = data?.product?.data?.[0];
  const p = entity?.attributes;
  if (!p) notFound();

  const sub = p.Category?.data?.attributes;
  const parent = sub?.Category?.data?.attributes;
  const canonicalCategory = parent?.Slug ?? "";
  const canonicalSub = sub?.Slug ?? "";

  if (!canonicalCategory || !canonicalSub) notFound();

  // Redirect if URL doesn't match Strapi slugs.
  if (canonicalCategory !== category || canonicalSub !== subcategory) {
    redirect(`/${canonicalCategory}/${canonicalSub}/${slug}/`);
  }

  const images =
    (p.Images?.data ?? [])
      .filter((i): i is NonNullable<typeof i> => Boolean(i?.attributes?.url))
      .map((i) => strapiMediaUrl(i!.attributes!.url!)) ?? [];
  const thumbUrlRaw = p.Thumbnail?.data?.attributes?.url ?? null;

  const brochureUrlRaw = p.Brochure?.data?.attributes?.url ?? null;
  const brochureUrl = brochureUrlRaw ? strapiMediaUrl(brochureUrlRaw) : null;
  const brochureName = p.Brochure?.data?.attributes?.name ?? "Brochure";
  const dataSheetList = Array.isArray(p.DataSheet)
    ? p.DataSheet
    : p.DataSheet
      ? [p.DataSheet]
      : [];
  const datasheets =
    dataSheetList
      .filter((d): d is NonNullable<typeof d> => Boolean(d?.pdfFile?.data?.attributes?.url))
      .map((d) => ({
        title: d!.title ?? "Datasheet",
        url: strapiMediaUrl(d!.pdfFile!.data!.attributes!.url!),
      })) ?? [];

  const accessoriesRaw = (p.ComponentsAndAccessories ?? []).filter(
    (a): a is NonNullable<typeof a> => Boolean(a?.Heading)
  );

  const componentsAndAccessories: ProductDetailUIModel["componentsAndAccessories"] = accessoriesRaw.map((block) => ({
    heading: block!.Heading ?? "Accessories",
    groups: (block!.Content ?? [])
      .filter((c): c is NonNullable<typeof c> => Boolean(c?.Title))
      .map((c) => ({
        title: (c!.Title ?? "").trim(),
        items: (c!.List ?? [])
          .filter((i): i is NonNullable<typeof i> => Boolean(i?.Name))
          .map((i) => (i!.Name ?? "").trim())
          .filter(Boolean),
      }))
      .filter((g) => Boolean(g.title || g.items.length)),
  }));

  const specsRaw =
    (p.Specifications ?? []).filter((s): s is NonNullable<typeof s> => Boolean(s?.TableHeading)) ?? [];

  const specificationsTable: ProductDetailUIModel["specificationsTable"] = specsRaw.length
    ? {
        columns: specsRaw.map((col) => ({
          heading: col!.TableHeading ?? "",
          values: (col!.TableData ?? [])
            .filter((x): x is NonNullable<typeof x> => Boolean(x?.Name))
            .map((x) => x!.Name ?? ""),
        })),
      }
    : null;

  const similar = (data.similarProducts?.data ?? []).filter((n): n is NonNullable<typeof n> =>
    Boolean(n?.attributes?.Slug)
  );

  const model: ProductDetailUIModel = {
    title: p.Title ?? slug,
    productSlug: p.Slug ?? slug,
    category: { title: parent?.Title ?? canonicalCategory, slug: canonicalCategory },
    subCategory: { title: sub?.Title ?? canonicalSub, slug: canonicalSub },
    description: p.Description ?? "",
    images: images.length
      ? images
      : (() => {
          const t = p.Thumbnail?.data?.attributes?.url;
          return t ? [strapiMediaUrl(t)] : [];
        })(),
    youtubePlaylist: p.youtubePlaylist ?? null,
    brochure: brochureUrl ? { url: brochureUrl, name: brochureName || "Brochure" } : null,
    datasheets,
    specificationsTable,
    componentsAndAccessories,
    similarProducts: similar.map((sp) => {
      const spAttrs = sp.attributes;
      const spSlug = spAttrs?.Slug ?? "";
      const spSub = spAttrs?.Category?.data?.attributes?.Slug ?? "";
      const spCat = spAttrs?.Category?.data?.attributes?.Category?.data?.attributes?.Slug ?? "";
      const imgRaw = spAttrs?.Thumbnail?.data?.attributes?.url ?? null;
      return {
        title: spAttrs?.Title ?? spSlug,
        slug: spSlug,
        thumbUrl: imgRaw ? strapiMediaUrl(imgRaw) : null,
        categorySlug: spCat,
        subCategorySlug: spSub,
        description: spAttrs?.Description ?? null,
      };
    }).filter((x) => Boolean(x.slug && x.categorySlug && x.subCategorySlug)),
  };

  return <ProductDetailsClient model={model} />;
}

