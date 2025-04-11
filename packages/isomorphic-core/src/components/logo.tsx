import Image from "next/image";
import { siteConfig } from "../../../../src/config/site.config";

interface IconProps {
  iconOnly?: boolean;
  className?: string;
}

export default function Logo({ iconOnly = false, className, ...props }: IconProps) {
  // return <Image src="/logo-ozip.png" alt={siteConfig.title} className={className} />;
  return <Image src={siteConfig.logo} alt={siteConfig.title} className={className} />;
}
