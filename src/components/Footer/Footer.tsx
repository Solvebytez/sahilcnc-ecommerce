import Image from "next/image";
import Link from "next/link";

const QUICK_LINKS: { label: string; href: string }[] = [
  { label: "Blog", href: "https://www.sahilcnc.com/blog/" },
  { label: "About us", href: "https://www.sahilcnc.com/about/" },
  { label: "Sales & Service Support", href: "https://www.sahilcnc.com/sales-service-support/" },
  { label: "Services", href: "https://www.sahilcnc.com/services/" },
  { label: "Contact Us", href: "https://www.sahilcnc.com/contact-us/" },
  { label: "CNC Training", href: "https://www.sahilcnc.com/cnc-training/" },
  { label: "Annual Maintenance Contract", href: "https://www.sahilcnc.com/annual-maintenance-contract/" },
  { label: "Privacy policy", href: "https://www.sahilcnc.com/privacy-policy/" },
  { label: "Terms & Conditions", href: "https://www.sahilcnc.com/terms-conditions/" },
];

const PRODUCTS_COL_A: { label: string; href: string }[] = [
  { label: "Conventional Vertical Turning Lathe", href: "https://www.sahilcnc.com/turning-machines/vtl/" },
  { label: "CNC Vertical Turning Lathe", href: "https://www.sahilcnc.com/turning-machines/cnc-vtl/" },
  { label: "CNC Gantry Milling Machine", href: "https://www.sahilcnc.com/milling-machines/cnc-gantry-milling-machine/" },
  { label: "CNC Floor Boring Machine", href: "https://www.sahilcnc.com/boring-machines/cnc-fb/" },
  { label: "CNC Vertical Turn Mill Machine", href: "https://www.sahilcnc.com/turn-mill-machines/cnc-vtm/" },
  { label: "5-Axis Double Column Milling Machine", href: "https://www.sahilcnc.com/milling-machines/double-column-milling/" },
  { label: "Cast Iron Floor Plates", href: "https://www.sahilcnc.com/ci-castings/ci-floor-plates/" },
  { label: "CNC Vertical Turning Lathe (Turret)", href: "https://www.sahilcnc.com/turning-machines/cnc-turret-lathe/" },
  { label: "CNC Double Column Milling Machine", href: "https://www.sahilcnc.com/milling-machines/cnc-double-column/" },
];

const PRODUCTS_COL_B: { label: string; href: string }[] = [
  { label: "CNC Horizontal Boring Machine", href: "https://www.sahilcnc.com/boring-machines/cnc-hbm/" },
  { label: "CNC Vertical Turn Mill (Turret)", href: "https://www.sahilcnc.com/turn-mill-machines/cnc-vtm-turret/" },
  { label: "CNC Slant Bed Turn Mill", href: "https://www.sahilcnc.com/turn-mill-machines/cnc-slant-bed-turn-mill/" },
  { label: "5-Axis Gantry Milling Machine", href: "https://www.sahilcnc.com/milling-machines/gantry-milling-machine/" },
];

function SocialIconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function SocialIconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function SocialIconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function SocialIconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="mt-auto w-full">
      {/* Top / bottom gradient accents */}
      <div className="h-1 w-full bg-linear-to-r from-orange-500 to-red-700" aria-hidden />

      <div className="bg-[#FFE9E3]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Row 1: logo image + social */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="inline-block shrink-0" aria-label="Sahil Machines - Home">
              <Image
                src="/logo-header.png"
                alt="SURAJ Sahil Machines — Precision Engineering Since 1965"
                width={280}
                height={72}
                className="h-auto w-[min(100%,280px)] object-contain object-left"
              />
            </Link>
            <div className="flex flex-wrap items-center gap-3 sm:justify-end">
              {[
                { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: SocialIconLinkedIn },
                { href: "https://www.facebook.com/", label: "Facebook", Icon: SocialIconFacebook },
                { href: "https://www.instagram.com/", label: "Instagram", Icon: SocialIconInstagram },
                { href: "https://www.youtube.com/", label: "YouTube", Icon: SocialIconYouTube },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded border border-neutral-200 bg-white text-neutral-800 shadow-sm transition-colors hover:border-orange-400 hover:text-orange-600"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <hr className="my-8 border-neutral-800/80" />

          {/* Row 2: columns */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-2">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-neutral-900">Quick link</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                {QUICK_LINKS.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-red-600">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-neutral-900">Products</h3>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <ul className="space-y-2 text-sm text-neutral-700">
                  {PRODUCTS_COL_A.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-red-600">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {PRODUCTS_COL_B.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} target="_blank" rel="noreferrer" className="hover:text-red-600">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:col-span-3">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-neutral-900">Get Apps On</h3>
              <div className="flex flex-col gap-3">
                <a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:border-orange-400"
                >
                  <svg className="h-8 w-8 shrink-0" viewBox="0 0 24 24" aria-hidden>
                    <path fill="#EA4335" d="M3.6 1.2c-.2 0-.4.1-.5.3-.2.2-.3.5-.3.8v19.4c0 .3.1.6.3.8.2.2.5.3.8.3.2 0 .4 0 .6-.1l10.5-6.1-10.5-6.1c-.2-.1-.4-.2-.6-.2z" />
                    <path fill="#FBBC04" d="M14.4 8.1L3.9 2l10.5 6.1z" />
                    <path fill="#34A853" d="M3.9 22l10.5-6.1-4.7-2.7-5.8 3.4z" />
                    <path fill="#4285F4" d="M19.1 10.5c0-.4-.2-.7-.5-.9l-4.2-2.4-5.8 3.4 5.8 3.4 4.2-2.4c.3-.2.5-.5.5-.9z" />
                  </svg>
                  Google Play
                </a>
                <a
                  href="https://apps.apple.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-colors hover:border-orange-400"
                >
                  <svg className="h-8 w-8 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  App Store
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-linear-to-r from-orange-600 to-red-800 py-4 text-center text-sm text-white">
        © Copyright 2025. Sahil Alloys &amp; Machine Tools
      </div>
    </footer>
  );
}
