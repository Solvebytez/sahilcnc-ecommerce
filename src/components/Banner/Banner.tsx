"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export type BannerSlide = {
  src: string;
  alt: string;
  headline: string;
  subheadline: string;
};

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    src: "/banner.png",
    alt: "Sahil CNC - Precision Engineering",
    headline: "Engineering Precision & Crafting the Future",
    subheadline:
      "Discover the Legacy of Innovation with Sahil CNC - Pioneers in Turning, Milling, Boring, and Turn Mill Operations",
  },
  {
    src: "/banner.png",
    alt: "Sahil CNC - Innovation in Manufacturing",
    headline: "Precision CNC & 5 Axis Solutions",
    subheadline:
      "We deliver high-performance, custom machines for efficiency and reliability for Aerospace, Agriculture, Railways and other industries.",
  },
  {
    src: "/banner.png",
    alt: "Sahil CNC - Crafting the Future",
    headline: "Turn Mill, Boring & Milling Excellence",
    subheadline:
      "From concept to production - trusted by industries worldwide for quality machinery and dedicated support.",
  },
];

type BannerProps = {
  slides?: BannerSlide[] | null;
  cta?: { Name?: string; URL?: string } | null;
};

export default function Banner({ slides: slidesProp, cta }: BannerProps) {
  const slides = slidesProp?.length ? slidesProp : DEFAULT_SLIDES;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative aspect-5/4 w-full min-h-[min(72vw,320px)] sm:aspect-video sm:min-h-[340px] md:aspect-21/9 md:min-h-[400px] lg:min-h-[440px] xl:min-h-[480px] 2xl:min-h-[520px]">
        {/* Banner image: fixed (no slide). Only caption slides. */}
        {slides.map((slide, index) => {
          const isVideo = /\.(mp4|webm|mov|ogg)(\?|$)/i.test(slide.src);
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === activeIndex ? "z-0 opacity-100" : "z-0 opacity-0"
              }`}
            >
              {isVideo ? (
                <video
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover object-center"
                  aria-label={slide.alt}
                />
              ) : (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  sizes="100vw"
                />
              )}
            </div>
          );
        })}

        {/* Dark overlay */}
        <div
          className="absolute inset-0 z-10 bg-black/50"
          aria-hidden
        />

        {/* Only the active caption is in the DOM – no track, no next slide, no bleed */}
        <div className="absolute inset-0 z-20 flex items-center pb-14 pt-4 sm:pb-16 md:pb-0 md:pt-0">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-10">
            <div
              key={activeIndex}
              className="animate-caption-slide-in flex max-w-2xl flex-col items-stretch gap-3 text-left text-white sm:items-start sm:gap-4 md:gap-5"
            >
              <h1 className="text-balance text-xl font-bold leading-tight sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.5rem] xl:leading-tight">
                {slides[activeIndex].headline}
              </h1>
              <p className="text-pretty text-sm leading-relaxed text-white/95 sm:text-base md:text-lg lg:max-w-xl xl:max-w-2xl">
                {slides[activeIndex].subheadline}
              </p>
              <Link
                href={cta?.URL ?? "/shop"}
                className="inline-flex w-full max-w-xs items-center justify-center rounded-lg bg-linear-to-r from-red-700 via-red-500 to-orange-500 px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition-opacity hover:opacity-95 sm:w-auto sm:px-6 sm:text-sm md:max-w-none"
              >
                {cta?.Name ?? "Explore More"}
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators: bottom row on phones; right rail on tablet+ */}
        <div
          className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-row gap-2.5 sm:bottom-6 md:bottom-auto md:left-auto md:right-5 md:top-1/2 md:flex md:-translate-y-1/2 md:translate-x-0 md:flex-col md:gap-3 lg:right-7 xl:right-10"
          role="tablist"
          aria-label="Banner slides"
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              onClick={() => setActiveIndex(index)}
              className={`rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-white/50 ${
                index === activeIndex
                  ? "h-3 w-3 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                  : "h-2.5 w-2.5 bg-white/50 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
