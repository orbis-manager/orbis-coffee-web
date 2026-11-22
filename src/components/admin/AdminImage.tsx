import Image from "next/image";

function canOptimize(src: string) {
  if (src.startsWith("/")) return true;
  try {
    const url = new URL(src);
    return url.protocol === "https:" && url.hostname === "lh3.googleusercontent.com";
  } catch {
    return false;
  }
}

export default function AdminImage({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  if (canOptimize(src)) {
    return <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
  );
}
