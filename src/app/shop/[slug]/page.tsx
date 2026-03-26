import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import { strapiRequest } from "@/lib/api";
import { PRODUCT_DETAIL_QUERY, type ProductDetailResponse } from "@/graphql/product-detail";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `${slug} | Sahil Machines`,
  };
}

export default async function ShopProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Lookup product to compute canonical URL.
  const data = await strapiRequest<ProductDetailResponse>(PRODUCT_DETAIL_QUERY, {
    product: slug,
    subCategory: null,
  });
  const entity = data?.product?.data?.[0];
  const attrs = entity?.attributes;
  const sub = attrs?.Category?.data?.attributes;
  const parent = sub?.Category?.data?.attributes;
  const productSlug = slug;
  const subSlug = sub?.Slug ?? "";
  const catSlug = parent?.Slug ?? "";

  if (!attrs || !subSlug || !catSlug) notFound();

  redirect(`/${catSlug}/${subSlug}/${productSlug}/`);
}

