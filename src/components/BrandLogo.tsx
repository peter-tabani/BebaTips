import Image from "next/image";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  className = "h-9 w-9",
  priority = false,
}: BrandLogoProps) {
  return (
    <span
      className={`relative block shrink-0 overflow-hidden rounded-lg bg-brand-dark ${className}`}
    >
      <Image
        src="/images/bebatips-logo.png"
        alt="BebaTips logo"
        fill
        priority={priority}
        sizes="64px"
        className="scale-[1.55] object-cover"
      />
    </span>
  );
}
