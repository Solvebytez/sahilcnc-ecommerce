"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export type ProductCardGridItem = {
  id?: string;
  title: string;
  href: string;
  imageUrl?: string | null;
  label?: string | null;
  ctaLabel?: string | null;
};

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
    </svg>
  );
}

type ProductCardGridProps = {
  title?: string;
  subtitle?: string;
  items: ProductCardGridItem[];
  mode?: "grid" | "slider";
  columns?: 2 | 3 | 4;
  /** Used when an item does not provide its own ctaLabel */
  defaultCtaLabel?: string;
  /** Used when an item does not provide imageUrl */
  fallbackImageUrl?: string;
  className?: string;
};

export default function ProductCardGrid({
  title,
  subtitle,
  items,
  mode = "grid",
  columns = 4,
  defaultCtaLabel = "Buy Now",
  fallbackImageUrl = "/banner.png",
  className = "",
}: ProductCardGridProps) {
  if (!items?.length) return null;

  const scrollerRef = useRef<HTMLUListElement | null>(null);
  const gridCols = useMemo(() => {
    return columns === 2
      ? "grid-cols-1 sm:grid-cols-2"
      : columns === 3
        ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  }, [columns]);

  const scrollByOne = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstChild = el.querySelector<HTMLElement>("[data-card]");
    const cardW = firstChild?.getBoundingClientRect().width ?? 0;
    const gap = 16; // matches gap-4-ish; snap works even if slightly off
    const delta = (cardW + gap) * dir;
    el.scrollBy({ left: delta, behavior: "smooth" });
  };

  const renderCard = (item: ProductCardGridItem, key: string | number) => {
    const imgSrc = item.imageUrl ?? fallbackImageUrl;
    const cta = item.ctaLabel ?? defaultCtaLabel;
    return (
      <li
        key={key}
        data-card
        className={mode === "slider" ? "snap-start shrink-0 w-[min(92vw,22rem)]" : undefined}
      >
        <article className="shine font-product-card flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-400/25 bg-white shadow-xl transition-all">
          <div className="p-4 pb-0">
            <Link
              href={item.href}
              className="group relative block overflow-hidden rounded-xl border-2 border-red-600 bg-neutral-100"
            >
              <div className="relative aspect-4/3 w-full">
                <Image
                  src={imgSrc}
                  alt={item.title || "Model"}
                  fill
                  className="object-cover object-center"
                  sizes={mode === "slider" ? "(max-width: 768px) 92vw, 22rem" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"}
                />
                <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-700 shadow-sm group-hover:bg-white">
                  <EyeIcon className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>

          <div className="flex flex-1 flex-col p-4 pt-3">
            {item.label ? (
              <span className="mb-1.5 text-xs font-bold uppercase tracking-wide text-orange-600">
                {item.label}
              </span>
            ) : null}

            <h3 className="line-clamp-2 min-h-12 text-base font-bold leading-tight text-neutral-900 uppercase">
              {item.title}
            </h3>

            <div className="mt-4">
              <Link
                href={item.href}
                className="inline-flex w-full items-center justify-center rounded-lg bg-linear-to-r from-orange-500 to-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95 uppercase"
                aria-label={`${cta} ${item.title}`}
              >
                {cta}
              </Link>
            </div>
          </div>
        </article>
      </li>
    );
  };

  return (
    <section className={className}>
      {(title || subtitle) && mode === "slider" ? (
        <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
          <div>
            {title ? <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2> : null}
            {subtitle ? <p className="mt-1 text-muted-foreground">{subtitle}</p> : null}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByOne(-1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm hover:bg-muted"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollByOne(1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm hover:bg-muted"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        </div>
      ) : (title || subtitle) ? (
        <div className="mb-8">
          {title ? <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h2> : null}
          {subtitle ? <p className="mt-1 text-muted-foreground">{subtitle}</p> : null}
        </div>
      ) : null}

      {mode === "slider" ? (
        <ul
          ref={scrollerRef}
          className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          role="list"
        >
          {items.map((item, index) => renderCard(item, item.id ?? item.href ?? index))}
        </ul>
      ) : (
        <ul className={`grid ${gridCols} gap-6`} role="list">
          {items.map((item, index) => renderCard(item, item.id ?? item.href ?? index))}
        </ul>
      )}
    </section>
  );
}

