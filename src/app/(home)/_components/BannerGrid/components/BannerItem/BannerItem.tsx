import Link from "next/link";
import { PromoBanner } from "../../types/BannerGrid";

function BannerItem({ banner }: { banner: PromoBanner }) {
  if (!banner) return null;

  return (
    <Link href={banner.href}>
      <img
        className="img"
        src={banner.src}
        alt={banner.alt}
        loading="lazy"
        decoding="async"
      />
    </Link>
  );
}

export default BannerItem;
