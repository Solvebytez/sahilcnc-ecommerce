import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center no-underline" aria-label="Sahil Machines - Home">
      <Image
        src="/logo-header.png"
        alt="Sahil Machines - Precision Engineering Since 1965"
        width={220}
        height={56}
        className="h-14 w-auto object-contain"
        priority
      />
    </Link>
  );
}
