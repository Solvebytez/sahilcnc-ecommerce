"use client";

import Image from "next/image";
import Link from "next/link";
import type { FeaturedProductNode } from "@/components/FeaturedProducts";

type ModelsWeOffersProps = {
  title?: string;
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

export default function ModelsWeOffers({
  title = "Models we offers",
  products,
}: ModelsWeOffersProps) {
  if (!products?.length) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
            {title}
          </h2>
        </div>

        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" role="list">
          {products.map((item, index) => {
            const attrs = item.attributes;
            const productTitle = attrs?.Title ?? "";
            const slug = attrs?.Slug ?? "";
            const categoryTitle = attrs?.Category?.data?.attributes?.Title ?? "";
            const thumbUrl = attrs?.Thumbnail?.data?.attributes?.url ?? "/banner.png";
            const productHref = slug ? `/shop/${slug}` : "#";

            return (
              <li key={item.id ?? index}>
                <article className="shine flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-400/25 bg-white shadow-xl transition-all">
                  <div className="p-4 pb-0">
                    <Link href={productHref} className="group relative block overflow-hidden rounded-xl border-2 border-red-600 bg-neutral-100">
                      <div className="relative aspect-4/3 w-full">
                        <Image
                          src={thumbUrl}
                          alt={productTitle || "Model"}
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
                    {/* Category name (replaces FEATURED tag) */}
                    {categoryTitle ? (
                      <span className="mb-1.5 text-xs font-bold uppercase tracking-wide text-orange-600">
                        {categoryTitle}
                      </span>
                    ) : null}

                    <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-tight text-neutral-900">
                      {productTitle}
                    </h3>

                    <div className="mt-4">
                      <Link
                        href={productHref}
                        className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95"
                        aria-label={`Buy ${productTitle}`}
                      >
                        Buy Now
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

