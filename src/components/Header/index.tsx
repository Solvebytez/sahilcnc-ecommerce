"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M18 6L6 18M6 6l12 12" />
        </>
      ) : (
        <>
          <path d="M3 12h18M3 6h18M3 18h18" />
        </>
      )}
    </svg>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, closeMenu]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="h-1.5 w-full bg-neutral-700 sm:h-2" role="presentation" />

      <div className="flex items-center justify-between gap-2 border-b border-neutral-200 bg-white px-3 py-2.5 sm:gap-4 sm:px-4 sm:py-3 md:px-6 md:py-4 lg:gap-6">
        <div className="min-w-0 shrink-0">
          <Logo />
        </div>

        <nav
          className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
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

        <div className="flex shrink-0 items-center gap-2 sm:gap-3 md:gap-4">
          <Link
            href="/cart"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-50 sm:h-auto sm:w-auto sm:p-2.5"
            aria-label="View cart"
          >
            <CartIcon className="h-5 w-5" />
          </Link>

          <div className="hidden lg:block">
            <PhoneButton variant="full" />
          </div>
          <div className="lg:hidden">
            <PhoneButton variant="icon" />
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-neutral-200 text-neutral-800 transition-colors hover:bg-neutral-50 lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <div
        id="mobile-nav"
        className={`fixed inset-0 z-60 lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!menuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[min(100%,20rem)] max-w-full flex-col bg-white shadow-xl transition-transform duration-200 ease-out sm:w-[min(100%,22rem)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <span className="text-sm font-semibold text-neutral-800">Menu</span>
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <MenuIcon open />
            </button>
          </div>
          <nav className="flex flex-1 flex-col overflow-y-auto py-2" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                hasDropdown={item.hasDropdown}
                variant="drawer"
                onNavigate={closeMenu}
              />
            ))}
          </nav>
          <div className="border-t border-neutral-200 p-4">
            <PhoneButton variant="full" className="w-full justify-center" />
          </div>
        </div>
      </div>
    </header>
  );
}
