"use client";

import Link from "next/link";

export type OperationCategoryNode = {
  attributes?: {
    Title?: string;
    Slug?: string;
    PreviewIcon?: {
      data?: {
        attributes?: { url?: string };
      } | null;
    } | null;
  };
};

type OperationsWeCaterToProps = {
  title: string;
  categories: OperationCategoryNode[];
};

function ExternalArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5h5v5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14L19 5" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14v5h-5" opacity="0" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10v9h9" opacity="0" />
    </svg>
  );
}

const STRAPI_MEDIA_BASE =
  process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/graphql\/?$/, "") ?? "";

export default function OperationsWeCaterTo({ title, categories }: OperationsWeCaterToProps) {
  if (!categories?.length) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
          {title}
        </h2>

        <div className="mt-8 overflow-x-auto pb-2">
          <ul className="flex min-w-max justify-center gap-5" role="list">
            {categories.map((c, idx) => {
              const t = c.attributes?.Title ?? "";
              const slug = c.attributes?.Slug ?? "";
              // Redirect to live website category page based on Slug
              const href = slug ? `https://www.sahilcnc.com/${slug}/` : "#";
              const rawIcon = c.attributes?.PreviewIcon?.data?.attributes?.url ?? "";
              const iconUrl = rawIcon
                ? rawIcon.startsWith("http")
                  ? rawIcon
                  : `${STRAPI_MEDIA_BASE}${rawIcon}`
                : "";

              return (
                <li key={`${slug || t || "cat"}-${idx}`} className="w-[156px] shrink-0">
                  <a
                    href={href}
                    className="group relative flex h-[156px] flex-col items-center justify-between rounded-2xl bg-linear-to-b from-orange-400 to-orange-600 px-4 py-5 text-white shadow-md transition-transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    aria-label={`${t} - Know more`}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full bg-white shadow-sm">
                      {iconUrl ? (
                        <img
                          alt={t}
                          className="h-7 w-7 object-contain"
                          height={28}
                          src={iconUrl}
                          width={28}
                        />
                      ) : null}
                    </span>

                    <span className="mt-2 text-center text-sm font-semibold leading-tight">
                      {t}
                    </span>

                    <span className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold tracking-wide text-white/95">
                      KNOW MORE
                      <ExternalArrowIcon className="h-3.5 w-3.5 text-white/90" />
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

