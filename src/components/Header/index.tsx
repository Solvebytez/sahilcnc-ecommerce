import Link from "next/link";
import Logo from "./Logo";
import NavLink from "./NavLink";
import PhoneButton from "./PhoneButton";

const NAV_ITEMS: { href: string; label: string; hasDropdown?: boolean }[] = [
  { href: "/", label: "HOME" },
  { href: "/shop", label: "SHOP" },
  { href: "/product", label: "PRODUCT" },
  { href: "/contact", label: "CONTACT US" },
  { href: "/about", label: "ABOUT US" },
];

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top bar */}
      <div className="h-2 w-full bg-neutral-700" role="presentation" />

      {/* Main header */}
      <div className="flex items-center justify-between gap-6 border-b border-neutral-200 bg-white px-6 py-4">
        {/* Logo */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* Navigation */}
        <nav
          className="flex flex-1 items-center justify-center gap-1"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              href={item.href}
              label={item.label}
              hasDropdown={item.hasDropdown}
            />
          ))}
        </nav>

        {/* Right: Cart + Phone */}
        <div className="flex shrink-0 items-center gap-4">
          <Link
            href="/cart"
            className="flex items-center justify-center rounded-lg border border-neutral-300 bg-white p-2.5 text-neutral-800 transition-colors hover:bg-neutral-50"
            aria-label="View cart"
          >
            <CartIcon className="h-5 w-5" />
          </Link>
          <PhoneButton />
        </div>
      </div>
    </header>
  );
}
