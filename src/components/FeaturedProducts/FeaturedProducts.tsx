"use client";

import Image from "next/image";
import Link from "next/link";

/** Strapi product node: { id, attributes: { Title, Slug, Tag, Thumbnail, Category } } */
export type FeaturedProductNode = {
  id?: string;
  attributes?: {
    Title?: string;
    Slug?: string;
    Tag?: string | null;
    Thumbnail?: {
      data?: { attributes?: { url?: string } };
    } | null;
    Category?: {
      data?: {
        attributes?: {
          Title?: string;
          Slug?: string;
          Category?: {
            data?: { attributes?: { Title?: string; Slug?: string } } | null;
          } | null;
        };
      };
    } | null;
  };
};

type FeaturedProductsProps = {
  title?: string;
  viewAllHref?: string;
  products: FeaturedProductNode[];
};

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function ArrowUpRightIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7h-10M17 7v10" />
    </svg>
  );
}

export default function FeaturedProducts({
  title = "Products we Manufacture",
  viewAllHref = "/shop",
  products,
}: FeaturedProductsProps) {
  if (!products?.length) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header: title + VIEW ALL */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            {title}
          </h2>
          <Link
            href={viewAllHref}
            className="inline-flex items-center rounded border-2 border-red-600 bg-white px-5 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          >
            VIEW ALL
          </Link>
        </div>

        {/* Product grid: 4 columns */}
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {products.map((item, index) => {
            const attrs = item.attributes;
            const productTitle = attrs?.Title ?? "";
            const slug = attrs?.Slug ?? "";
            const tag = attrs?.Tag;
            const category = attrs?.Category?.data?.attributes;
            const categoryTitle = category?.Title ?? "";
            const categorySlug = category?.Slug ?? "";
            const thumb = attrs?.Thumbnail;
            const url = thumb?.data?.attributes?.url;
            const imgSrc = url ?? "/banner.png";
            const productHref = slug ? `/shop/${slug}` : "#";
            const categoryHref = categorySlug ? `/shop/${categorySlug}` : null;

            return (
              <li key={item.id ?? index}>
                <article className="shine font-product-card flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-400/25 bg-white shadow-xl transition-all">
                  {/* Inner gap: padding between card edge and image */}
                  <div className="p-4 pb-0">
                    <Link href={productHref} className="group relative block overflow-hidden rounded-xl border-2 border-red-600 bg-neutral-100">
                      <div className="relative aspect-4/3 w-full">
                      <Image
                        src={imgSrc}
                        alt={productTitle || "Product"}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm group-hover:bg-white">
                        <EyeIcon className="h-4 w-4" />
                      </span>
                    </div>
                    </Link>
                  </div>

                  <div className="flex flex-1 flex-col p-4 pt-3">
                    {/* FEATURED label on every card – caps, orange */}
                    <span className="mb-1.5 text-xs font-bold uppercase tracking-wide text-orange-600">
                      {tag ?? "FEATURED"}
                    </span>

                    {/* Category name and arrow on the same row */}
                    <div className="flex flex-1 items-center justify-between gap-3">
                      {categoryTitle && (
                        <h3 className="min-w-0 flex-1 text-base font-bold leading-tight text-neutral-900 uppercase">
                          {categoryHref ? (
                            <Link href={categoryHref} className="hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                              {categoryTitle}
                            </Link>
                          ) : (
                            <Link href={productHref} className="hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                              {categoryTitle}
                            </Link>
                          )}
                        </h3>
                      )}
                      <Link
                        href={productHref}
                        className="shrink-0 text-orange-600 transition-colors hover:text-red-600"
                        aria-label={`View ${categoryTitle || productTitle}`}
                      >
                        <ArrowUpRightIcon className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
