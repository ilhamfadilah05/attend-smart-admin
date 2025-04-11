"use client";

import Link from "next/link";
import HamburgerButton from "@/layouts/hamburger-button";
import Sidebar from "@/layouts/hydrogen/sidebar";
import Logo from "@components/logo";
import HeaderMenuRight from "@/layouts/header-menu-right";
import StickyHeader from "@/layouts/sticky-header";
import { Title } from "rizzui";
import WaveShape from "@components/shape/wave";

export default function Header() {
  return (
    <StickyHeader className="z-[990] 2xl:py-5 3xl:px-8  4xl:px-10">
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={<Sidebar className="static w-full 2xl:w-full" />}
        />
        <Link
          href={"/"}
          aria-label="Site Logo"
          className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
        >
          <Logo iconOnly={true} />
        </Link>

        <Title
          as="h6"
          className="hidden sm:block font-bold text-white bg-gradient-to-r from-primary to-blue-600 px-6 py-3 rounded-md shadow-lg tracking-wide uppercase"
        >
          Attend Smart Admin
        </Title>
      </div>

      <HeaderMenuRight />
    </StickyHeader>
  );
}
