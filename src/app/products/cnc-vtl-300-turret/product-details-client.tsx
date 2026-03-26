"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Cog,
  Download,
  Factory,
  Globe,
  Heart,
  Link2,
  Mail,
  MapPin,
  Phone,
  Play,
  Share2,
  ShoppingCart,
  ZoomIn,
  Video,
  Wrench,
} from "lucide-react";
import type { StaticProduct } from "@/lib/static-products";

type Spec = { label: string; value: string };

const specifications: Record<string, Spec[]> = {
  capacity: [
    { label: "Model", value: "CNC VTL-300" },
    { label: "Max Swing of Job Diameter", value: "650 mm" },
    { label: "Max Chuck Diameter", value: "300 mm" },
    { label: "Max Turning Diameter", value: "600 mm" },
    { label: "Max Turning Length", value: "750 mm" },
  ],
  spindle: [
    { label: "Spindle Nose", value: "A2-8" },
    { label: "Hole Through Spindle", value: "77 mm" },
    { label: "Spindle Speed", value: "2500 rpm" },
    { label: "Spindle Motor Power", value: "18.5/15 kW" },
  ],
  axes: [
    { label: "X-Axis Stroke", value: "350 mm" },
    { label: "Z-Axis Stroke", value: "750 mm" },
    { label: "X-Axis Rapid", value: "20 m/min" },
    { label: "Z-Axis Rapid", value: "20 m/min" },
    { label: "X-Axis Guideways", value: "LM Guideways" },
    { label: "Z-Axis Guideways", value: "LM Guideways" },
  ],
  tooling: [
    { label: "Turret Type (Pragati Make)", value: "BTP 100" },
    { label: "No of Stations", value: "8" },
    { label: "Max Boring Bar Dia", value: "40 mm" },
    { label: "OD Turning Tool Size", value: "25x25 mm" },
  ],
  systems: [
    { label: "Coolant Tank Capacity", value: "250 L" },
    { label: "Hydraulic Pump Capacity", value: "16 lpm" },
    { label: "Hydraulic Power Pack Capacity", value: "45 L" },
    { label: "Controller", value: "Siemens 828D/Fanuc 0i TF" },
  ],
  machine: [
    { label: "Dimensions", value: "2x1.8x2 m" },
    { label: "Weight", value: "8000 kg" },
  ],
};

const accessories = {
  standard: [
    "Graded CI Casting (FG 260)",
    "Hydraulic Chuck: 300 mm",
    "Servo Drive for Main Motor",
    "Centralized Lubrication System on All Sliding Ways",
    "Control Station with Interlocked Electrical Control Panel",
    "Coolant Tank",
    "A Set of Service Tools",
    "All Electricals Siemens/ABB",
    "Turret: 8 Station- Make Pragati",
    "CNC Control: 2 Axis +1 Axis",
    "CNC Controller: Siemens 828D/ Fanuc 0i TF Latest",
  ],
  special: [
    "Milling Attachment",
    "Grinding Attachment",
    "Coolant System",
    "Live Tooling",
    "Step Down Transformer & Voltage Stabilizer",
    "Tool Probe",
    "Touch Probe",
  ],
};

const applications = {
  industries: [
    "Aerospace",
    "Automotive",
    "Oil & Gas",
    "Heavy Equipment Manufacturing",
    "Power Generation",
    "Defense",
    "Railway",
    "Shipbuilding",
    "General Machinery",
    "Tool & Die",
  ],
  components: [
    "Large Bearings",
    "Gear Blanks",
    "Flanges",
    "Valve Bodies",
    "Hydraulic Cylinder Bodies",
    "Pump Housings",
    "Pulleys",
    "Connecting Rods",
    "Axle Housings",
    "Couplings",
  ],
};

const relatedProducts = [
  { name: "CNC VTL 600 Turret", image: "/banner.png", specs: "600mm Chuck, 22kW" },
  { name: "CNC VTL 500 Turret", image: "/img.png", specs: "500mm Chuck, 18.5kW" },
  { name: "CNC VTL 400 Turret", image: "/logo-header.png", specs: "400mm Chuck, 15kW" },
];

const quickLinks = [
  { name: "About Us", href: "https://www.sahilcnc.com/about/" },
  { name: "Sales & Service Support", href: "https://www.sahilcnc.com/" },
  { name: "Contact Us", href: "https://www.sahilcnc.com/contact/" },
  { name: "Privacy Policy", href: "https://www.sahilcnc.com/privacy-policy/" },
  { name: "Terms & Conditions", href: "https://www.sahilcnc.com/terms-conditions/" },
];

const footerProducts = [
  "Conventional Vertical Turning Lathe",
  "CNC Vertical Turning Lathe",
  "CNC Gantry Milling Machine",
  "CNC Floor Boring Machine",
  "CNC Horizontal Boring Machine",
  "5-Axis Gantry Milling Machine",
];

function clsx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700">
      {children}
    </span>
  );
}

function PrimaryChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
      {children}
    </span>
  );
}

function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-900/20 disabled:opacity-60 disabled:pointer-events-none";
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  } as const;
  const variants = {
    primary: "bg-neutral-900 text-white hover:bg-neutral-800",
    outline: "border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50",
    ghost: "bg-transparent text-neutral-900 hover:bg-neutral-100",
  } as const;
  return (
    <button className={clsx(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

function SpecCard({
  title,
  icon,
  specs,
}: {
  title: string;
  icon: React.ReactNode;
  specs: Spec[];
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white">
      <div className="border-b border-neutral-100 px-5 py-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <span className="text-neutral-900">{icon}</span>
          {title}
        </h3>
      </div>
      <div className="px-5 py-3">
        <dl className="divide-y divide-neutral-100">
          {specs.map((spec, index) => (
            <div key={index} className="flex justify-between gap-4 py-2.5 text-sm">
              <dt className="text-neutral-500">{spec.label}</dt>
              <dd className="text-right font-medium text-neutral-900">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "rounded-full border-2 px-5 py-2 text-sm font-medium transition-colors",
        active
          ? "border-neutral-900 bg-neutral-900 text-white"
          : "border-orange-500 bg-white text-orange-500 hover:bg-orange-50"
      )}
    >
      {children}
    </button>
  );
}

export default function ProductDetailsClient({
  product,
}: {
  product: StaticProduct;
}) {
  const productImages = product.images.length ? product.images : ["/banner.png", "/img.png", "/logo-header.png"];
  const [selectedImage, setSelectedImage] = useState(0);
  const [tab, setTab] = useState<"specifications" | "accessories" | "applications">("specifications");

  const nextImage = () => setSelectedImage((i) => (i + 1) % productImages.length);
  const prevImage = () => setSelectedImage((i) => (i - 1 + productImages.length) % productImages.length);

  const specCards = useMemo(
    () => [
      { title: "Capacity", icon: <Cog className="h-5 w-5" />, specs: specifications.capacity },
      { title: "Spindle", icon: <Cog className="h-5 w-5" />, specs: specifications.spindle },
      { title: "Axes", icon: <Cog className="h-5 w-5" />, specs: specifications.axes },
      { title: "Tooling", icon: <Wrench className="h-5 w-5" />, specs: specifications.tooling },
      { title: "Systems", icon: <Cog className="h-5 w-5" />, specs: specifications.systems },
      { title: "Machine Size", icon: <Factory className="h-5 w-5" />, specs: specifications.machine },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-2 text-neutral-500">
            <li>
              <a href="/" className="hover:text-neutral-900">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="/shop" className="hover:text-neutral-900">
                Products
              </a>
            </li>
            <li>/</li>
            <li className="text-neutral-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product hero */}
        <div className="mb-16 grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="group relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
              <Image
                src={productImages[selectedImage]}
                alt="Product image"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                <ZoomIn className="h-5 w-5 text-neutral-900" />
              </div>
              <button
                type="button"
                onClick={prevImage}
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextImage}
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium">
                {selectedImage + 1} / {productImages.length}
              </div>
            </div>

            <div className="flex gap-3">
              {productImages.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={clsx(
                    "relative aspect-square w-20 overflow-hidden rounded-xl transition-all sm:w-24",
                    selectedImage === index
                      ? "ring-2 ring-neutral-900 ring-offset-2 ring-offset-white"
                      : "opacity-70 hover:opacity-100"
                  )}
                  aria-label={`Select image ${index + 1}`}
                >
                  <Image src={image} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <PrimaryChip>In Stock</PrimaryChip>
              <Chip>Made in India</Chip>
              <Chip>ISO 9001:2015</Chip>
            </div>

            <h1 className="text-balance text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-neutral-500">{product.subtitle}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-xl font-semibold text-neutral-900">{product.price}</span>
            </div>

            <p className="mt-6 leading-relaxed text-neutral-600">{product.description}</p>

            <div className="mt-8">
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-neutral-500">Key Features</h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {product.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900/10">
                      <Check className="h-3.5 w-3.5 text-neutral-900" />
                    </div>
                    <span className="text-sm text-neutral-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button type="button" className="mt-8 flex items-center gap-3 text-sm font-medium text-neutral-900">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900/10">
                <Play className="h-4 w-4 fill-current text-neutral-900" />
              </div>
              <span className="hover:underline">Watch Product Video</span>
            </button>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="flex-1 gap-2">
                <ShoppingCart className="h-4 w-4" />
                Request Quote
              </Button>
              <Button size="lg" variant="outline" className="gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50">
                <Download className="h-4 w-4" />
                Brochure
              </Button>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <button type="button" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900">
                <Heart className="h-4 w-4" />
                Save to Wishlist
              </button>
              <button type="button" className="flex items-center gap-2 text-sm text-neutral-500 hover:text-neutral-900">
                <Share2 className="h-4 w-4" />
                Share
              </button>
            </div>

            <div className="mt-8 border-t border-neutral-200 pt-8">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-neutral-900">60+</p>
                  <p className="text-xs text-neutral-500">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">500+</p>
                  <p className="text-xs text-neutral-500">Machines Sold</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-neutral-900">50+</p>
                  <p className="text-xs text-neutral-500">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <section className="mb-16">
          <div className="mb-8 flex w-full flex-wrap gap-2">
            <TabButton active={tab === "specifications"} onClick={() => setTab("specifications")}>
              Specifications
            </TabButton>
            <TabButton active={tab === "accessories"} onClick={() => setTab("accessories")}>
              Accessories
            </TabButton>
            <TabButton active={tab === "applications"} onClick={() => setTab("applications")}>
              Applications
            </TabButton>
          </div>

          {tab === "specifications" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {specCards.map((c) => (
                <SpecCard key={c.title} title={c.title} icon={c.icon} specs={c.specs} />
              ))}
            </div>
          )}

          {tab === "accessories" && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-100 px-5 py-4">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                    <span className="inline-flex rounded-full bg-neutral-900 px-3 py-1 text-xs font-semibold text-white">
                      Standard
                    </span>
                    Included with Machine
                  </h3>
                </div>
                <div className="px-5 py-5">
                  <ul className="grid gap-3">
                    {accessories.standard.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-900/10">
                          <Check className="h-3 w-3 text-neutral-900" />
                        </div>
                        <span className="text-sm text-neutral-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-100 px-5 py-4">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                    <span className="inline-flex rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-900">
                      Special
                    </span>
                    Optional Add-ons
                  </h3>
                </div>
                <div className="px-5 py-5">
                  <ul className="grid gap-3">
                    {accessories.special.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-100">
                          <Check className="h-3 w-3 text-neutral-500" />
                        </div>
                        <span className="text-sm text-neutral-600">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === "applications" && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-100 px-5 py-4">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                    <Factory className="h-5 w-5 text-neutral-900" />
                    Industries
                  </h3>
                </div>
                <div className="px-5 py-5">
                  <div className="flex flex-wrap gap-2">
                    {applications.industries.map((industry) => (
                      <span
                        key={industry}
                        className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium text-neutral-700"
                      >
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-neutral-200 bg-white">
                <div className="border-b border-neutral-100 px-5 py-4">
                  <h3 className="flex items-center gap-2 text-base font-semibold text-neutral-900">
                    <Cog className="h-5 w-5 text-neutral-900" />
                    Components
                  </h3>
                </div>
                <div className="px-5 py-5">
                  <div className="flex flex-wrap gap-2">
                    {applications.components.map((component) => (
                      <span
                        key={component}
                        className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700"
                      >
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Related */}
        <section className="mb-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900">Related Products</h2>
              <p className="mt-1 text-neutral-500">Explore other machines in this series</p>
            </div>
            <Button variant="ghost" className="gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((rp) => (
              <div
                key={rp.name}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-colors hover:border-neutral-900/30"
              >
                <div className="relative aspect-4/3 overflow-hidden bg-neutral-100">
                  <Image
                    src={rp.image}
                    alt={rp.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 backdrop-blur transition-opacity hover:bg-white group-hover:opacity-100"
                    aria-label="Save"
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-neutral-900 group-hover:text-neutral-900">{rp.name}</h3>
                  <p className="mt-1 text-sm text-neutral-500">{rp.specs}</p>
                  <Button variant="outline" size="sm" className="mt-4 w-full">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer intentionally removed for this product details page.
          Global Footer already renders via RootLayout. */}
    </div>
  );
}

