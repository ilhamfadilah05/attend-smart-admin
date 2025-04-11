"use client";
import HydrogenLayout from "@/layouts/hydrogen/layout";
import { useIsMounted } from "@/hooks/use-is-mounted";
import HeliumLayout from "@/layouts/helium/helium-layout";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useIsMounted();
  if (!isMounted) return null;

  // const [accessToken, setaccessToken] = useLocalStorage("accessToken", "");

  return <HydrogenLayout>{children}</HydrogenLayout>;
}
