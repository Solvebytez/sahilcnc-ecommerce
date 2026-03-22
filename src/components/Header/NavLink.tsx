import Link from "next/link";

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type NavLinkProps = {
  href: string;
  label: string;
  hasDropdown?: boolean;
  /** Drawer: full-width touch targets for mobile menu */
  variant?: "desktop" | "drawer";
  onNavigate?: () => void;
};

export default function NavLink({
  href,
  label,
  hasDropdown,
  variant = "desktop",
  onNavigate,
}: NavLinkProps) {
  const desktop =
    "group flex items-center gap-1 rounded px-2 py-2 text-xs font-medium text-neutral-800 transition-colors hover:text-orange-500 sm:text-sm lg:px-2.5 xl:text-sm";
  const drawer =
    "group flex w-full items-center justify-between gap-2 border-b border-neutral-100 px-4 py-4 text-base font-medium text-neutral-800 transition-colors hover:bg-neutral-50 hover:text-orange-500 active:bg-neutral-100";

  return (
    <Link
      href={href}
      className={variant === "drawer" ? drawer : desktop}
      onClick={onNavigate}
    >
      {label}
      {hasDropdown && (
        <ChevronDown className="ml-0.5 shrink-0 text-neutral-600 group-hover:text-orange-500" />
      )}
    </Link>
  );
}
