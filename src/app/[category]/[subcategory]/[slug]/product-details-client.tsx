"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Cog,
  Download,
  Factory,
  Play,
  ShoppingCart,
  Wrench,
  ZoomIn,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCardGrid from "@/components/ProductCardGrid/ProductCardGrid";
import { useCartStore } from "@/store/cart";

export type ProductDetailUIModel = {
  title: string;
  productSlug: string;
  category: { title: string; slug: string };
  subCategory: { title: string; slug: string };
  description: string;
  images: string[];
  youtubePlaylist?: string | null;
  brochure?: { url: string; name: string } | null;
  datasheets: Array<{ title: string; url: string }>;
  specificationsTable:
    | {
        columns: Array<{
          heading: string;
          values: string[];
        }>;
      }
    | null;
  componentsAndAccessories: Array<{
    heading: string;
    groups: Array<{
      title: string;
      items: string[];
    }>;
  }>;
  similarProducts: Array<{
    title: string;
    slug: string;
    thumbUrl: string | null;
    categorySlug: string;
    subCategorySlug: string;
    description?: string | null;
  }>;
};

function cleanCell(value: string) {
  return value
    .replace(/&nbsp;?/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function isSectionRow(label: string, otherCells: string[]) {
  const l = label.trim();
  if (!l) return false;
  const othersEmpty = otherCells.every((c) => !c.trim());
  const looksLikeHeader = l.length <= 40 && l === l.toUpperCase();
  return othersEmpty && looksLikeHeader;
}

export default function ProductDetailsClient({ model }: { model: ProductDetailUIModel }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const productImages = model.images.length ? model.images : ["/banner.png"];
  const router = useRouter();
  const hasItem = useCartStore((s) => s.hasItem(model.productSlug));
  const addItem = useCartStore((s) => s.addItem);

  const nextImage = () => setSelectedImage((i) => (i + 1) % productImages.length);
  const prevImage = () => setSelectedImage((i) => (i - 1 + productImages.length) % productImages.length);

  const blocks = model.componentsAndAccessories ?? [];
  const accessoriesBlock = blocks.find((b) => b.heading.toLowerCase().includes("accessor"));
  const applicationBlock = blocks.find(
    (b) => b.heading.toLowerCase().includes("application") || b.heading.toLowerCase().includes("component")
  );

  const standardItems =
    accessoriesBlock?.groups.find((g) => g.title.toLowerCase().includes("standard"))?.items ?? [];
  const specialItems =
    accessoriesBlock?.groups.find((g) => g.title.toLowerCase().includes("special"))?.items ?? [];

  const hasAccessories = Boolean(standardItems.length || specialItems.length || applicationBlock?.groups?.length);

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${model.category.slug}/`} className="hover:text-primary transition-colors">
                {model.category.title}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/${model.category.slug}/${model.subCategory.slug}/`}
                className="hover:text-primary transition-colors"
              >
                {model.subCategory.title}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium">{model.title}</li>
          </ol>
        </nav>

        {/* Product hero */}
        <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted group">
              <Image
                src={productImages[selectedImage]}
                alt={model.title}
                fill
                className="object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                priority
              />
              <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <ZoomIn className="h-5 w-5 text-foreground" />
              </div>
              {productImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-card"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium">
                    {selectedImage + 1} / {productImages.length}
                  </div>
                </>
              )}
            </div>

            {productImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {productImages.map((image, index) => (
                  <button
                    key={image}
                    onClick={() => setSelectedImage(index)}
                    className={cn(
                      "relative aspect-square w-20 sm:w-24 overflow-hidden rounded-xl transition-all shrink-0 bg-muted",
                      selectedImage === index
                        ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                        : "opacity-60 hover:opacity-100"
                    )}
                    aria-label={`Select image ${index + 1}`}
                  >
                    <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                In Stock
              </Badge>
              <Badge variant="outline">Made in India</Badge>
              <Badge variant="outline">ISO 9001:2015</Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight text-balance">
              {model.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">{model.subCategory.title}</p>

            <p className="mt-6 text-muted-foreground leading-relaxed">{model.description}</p>

            {model.youtubePlaylist ? (
              <a
                href={model.youtubePlaylist}
                target="_blank"
                rel="noreferrer"
                className="mt-8 flex items-center gap-3 text-sm font-medium text-primary hover:underline"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Play className="h-4 w-4 text-primary fill-current" />
                </div>
                Watch Product Video
              </a>
            ) : null}

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="flex-1 gap-2"
                onClick={() => {
                  if (hasItem) {
                    router.push("/checkout");
                    return;
                  }
                  const href = `/${model.category.slug}/${model.subCategory.slug}/${model.productSlug}/`;
                  addItem({
                    productSlug: model.productSlug,
                    title: model.title,
                    href,
                    imageUrl: model.images?.[0] ?? null,
                  });
                }}
              >
                <ShoppingCart className="h-4 w-4" />
                {hasItem ? "Proceed to Checkout" : "Add to Cart"}
              </Button>

              <Button size="lg" variant="outline" className="gap-2 border-2 border-primary text-primary hover:bg-primary/5">
                Request Quote
              </Button>

              {model.brochure?.url ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 border-2 border-primary text-primary hover:bg-primary/5"
                >
                  <a href={model.brochure.url} target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4" />
                    {model.brochure.name || "Download PDF"}
                  </a>
                </Button>
              ) : model.datasheets[0]?.url ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="gap-2 border-2 border-primary text-primary hover:bg-primary/5"
                >
                  <a href={model.datasheets[0].url} target="_blank" rel="noreferrer">
                    <Download className="h-4 w-4" />
                    Download PDF
                  </a>
                </Button>
              ) : null}
            </div>

            {/* Wishlist/Share removed */}
          </div>
        </div>

        {/* Tabs */}
        <section className="mb-16">
          <Tabs defaultValue="specifications" className="w-full">
            <TabsList className="w-full justify-center h-auto flex-wrap gap-2 bg-transparent p-0 mb-8">
              <TabsTrigger
                value="specifications"
                className={cn(
                  "px-7 py-3 rounded-full border-2 font-semibold tracking-wide text-base",
                  "bg-background text-primary border-primary shadow-sm",
                  "hover:border-primary/60 hover:bg-muted/40",
                  "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary",
                  "data-[state=active]:shadow-md data-[state=active]:shadow-primary/20",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Specifications
              </TabsTrigger>
              {hasAccessories && (
                <TabsTrigger
                  value="accessories"
                  className={cn(
                    "px-7 py-3 rounded-full border-2 font-semibold tracking-wide text-base",
                    "bg-background text-primary border-primary shadow-sm",
                    "hover:border-primary/60 hover:bg-muted/40",
                    "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary",
                    "data-[state=active]:shadow-md data-[state=active]:shadow-primary/20",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  Accessories
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="specifications" className="mt-0">
              {model.specificationsTable?.columns?.length ? (
                <Card className="border-border overflow-hidden">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <span className="text-primary">
                        <Cog className="h-5 w-5" />
                      </span>
                      Specifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="overflow-x-auto rounded-xl border border-border">
                      <table className="w-full text-base border-separate border-spacing-0">
                        <thead>
                          <tr className="bg-muted/60">
                            {model.specificationsTable.columns.map((c) => (
                              <th
                                key={c.heading}
                                className={cn(
                                  "text-left font-semibold text-foreground px-4 py-3.5 whitespace-nowrap",
                                  "border-b border-border",
                                  "first:sticky first:left-0 first:z-20 first:bg-muted/60"
                                )}
                              >
                                {cleanCell(c.heading)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({
                            length: Math.max(...model.specificationsTable.columns.map((c) => c.values.length), 0),
                          }).map((_, rowIndex) => {
                            const row = model.specificationsTable!.columns.map((c) =>
                              cleanCell(c.values[rowIndex] ?? "")
                            );
                            const [label, ...rest] = row;
                            const section = isSectionRow(label, rest);
                            if (section) {
                              return (
                                <tr key={`section-${rowIndex}`} className="bg-primary/5">
                                  <td
                                    colSpan={row.length}
                                    className="px-4 py-3 font-semibold text-foreground tracking-wide border-b border-border"
                                  >
                                    {label}
                                  </td>
                                </tr>
                              );
                            }

                            return (
                              <tr
                                key={rowIndex}
                                className={cn(
                                  "transition-colors hover:bg-muted/40",
                                  rowIndex % 2 === 0 ? "bg-background" : "bg-muted/20"
                                )}
                              >
                                {row.map((cell, colIndex) => (
                                  <td
                                    key={colIndex}
                                    className={cn(
                                      "px-4 py-3.5 align-top border-b border-border",
                                      colIndex === 0
                                        ? "text-muted-foreground sticky left-0 z-10 bg-inherit"
                                        : "font-medium text-foreground"
                                    )}
                                  >
                                    {cell || (colIndex === 0 ? "-" : "")}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-border">
                  <CardContent className="p-6 text-sm text-muted-foreground">No specifications available.</CardContent>
                </Card>
              )}
            </TabsContent>

            {hasAccessories && (
              <TabsContent value="accessories" className="mt-0">
                <div className="grid gap-6">
                  {(standardItems.length || specialItems.length) && (
                    <div className="grid gap-6 md:grid-cols-2">
                      <Card className="border-border">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Badge className="bg-primary text-primary-foreground">Standard</Badge>
                            Included with Machine
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="grid gap-3">
                            {standardItems.map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                  <Check className="h-3 w-3 text-primary" />
                                </div>
                                <span className="text-sm text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="border-border">
                        <CardHeader className="pb-4">
                          <CardTitle className="flex items-center gap-2 text-lg">
                            <Badge variant="outline">Special</Badge>
                            Optional Add-ons
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="grid gap-3">
                            {specialItems.map((item, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted">
                                  <Check className="h-3 w-3 text-muted-foreground" />
                                </div>
                                <span className="text-sm text-muted-foreground">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  )}

                  {applicationBlock?.groups?.length ? (
                    <Card className="border-border">
                      <CardHeader className="pb-4">
                        <CardTitle className="text-lg">{applicationBlock.heading}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                          {applicationBlock.groups.map((g) => (
                            <div key={g.title} className="rounded-lg border border-border overflow-hidden">
                              <div className="px-4 py-3 font-semibold text-foreground bg-muted/40">{g.title}</div>
                              <div className="p-4">
                                <ul className="grid gap-3">
                                  {g.items.map((item, idx) => (
                                    <li key={idx} className="flex items-start gap-3">
                                      <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                        <Check className="h-3 w-3 text-primary" />
                                      </div>
                                      <span className="text-sm text-muted-foreground">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : null}
                </div>
              </TabsContent>
            )}

          </Tabs>
        </section>

        {/* Related products */}
        {model.similarProducts.length ? (
          <ProductCardGrid
            className="mb-16"
            title="Related Products"
            subtitle="Explore other machines in this series"
            mode="slider"
            items={model.similarProducts.slice(0, 8).map((p) => {
              const href = `/${p.categorySlug}/${p.subCategorySlug}/${p.slug}/`;
              return {
                id: p.slug,
                title: p.title,
                href,
                imageUrl: p.thumbUrl,
                label: model.subCategory?.title ?? null,
                ctaLabel: "Buy Now",
              };
            })}
          />
        ) : null}
      </main>
    </div>
  );
}

