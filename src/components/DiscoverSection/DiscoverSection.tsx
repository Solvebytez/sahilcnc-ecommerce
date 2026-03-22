"use client";

import Image from "next/image";
import Link from "next/link";

type DiscoverSectionProps = {
  title: string;
  highlightedText: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  backgroundImageUrl?: string | null;
};

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-orange-500/40 bg-black/70 px-6 py-6 text-center shadow-lg backdrop-blur-sm">
      <div className="text-3xl font-extrabold tracking-tight text-orange-500">{value}</div>
      <div className="mt-1 text-sm font-medium text-white/85">{label}</div>
    </div>
  );
}

export default function DiscoverSection({
  title,
  highlightedText,
  description,
  ctaLabel = "ABOUT US",
  ctaHref = "/about",
  backgroundImageUrl,
}: DiscoverSectionProps) {
  return (
    <section className="relative overflow-hidden bg-neutral-950 py-12 sm:py-16">
      {/* Background image */}
      {backgroundImageUrl ? (
        <Image
          src={backgroundImageUrl}
          alt=""
          fill
          className="object-cover object-center opacity-70"
          sizes="100vw"
          priority={false}
        />
      ) : null}

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/10 bg-black/30 px-6 py-10 text-center shadow-2xl backdrop-blur-sm sm:px-10">
          <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
            {title}{" "}
            <span className="text-orange-500">{highlightedText}</span>
          </h2>

          <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed text-white/85 sm:text-base">
            {description}
          </p>

          <div className="mt-6">
            <Link
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-lg bg-orange-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black"
            >
              {ctaLabel}
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <StatCard value="60+" label="Years of Legacy" />
            <StatCard value="20+" label="Countries Served" />
            <StatCard value="5000+" label="Machine Installations" />
          </div>
        </div>
      </div>
    </section>
  );
}

