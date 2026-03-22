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
};

export default function NavLink({ href, label, hasDropdown }: NavLinkProps) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-1 rounded px-2 py-2 text-sm font-medium text-neutral-800 transition-colors hover:text-orange-500"
    >
      {label}
      {hasDropdown && (
        <ChevronDown className="ml-0.5 shrink-0 text-neutral-600 group-hover:text-orange-500" />
      )}
    </Link>
  );
}
