import type { Metadata } from "next";
import { inter, lexendDeca } from "@/app/fonts";
import cn from "@utils/class-names";
import NextProgress from "@components/next-progress";
import { ThemeProvider, JotaiProvider } from "@/app/shared/theme-provider";
import GlobalDrawer from "@/app/shared/drawer-views/container";
import GlobalModal from "@/app/shared/modal-views/container";

import "./globals.css";
import { metaObject } from "@/config/site.config";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  ...metaObject(),
};

export default async function RootLayout({ children }: { children: React.ReactNode }): Promise<JSX.Element> {
  return (
    <html
      lang="en"
      dir="ltr"
      // 💡 Prevent next-themes hydration warning
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, "font-inter")}
      >
        <ThemeProvider>
          <NextProgress />
          <Toaster />
          <JotaiProvider>
            {children}
            <GlobalDrawer />
            <GlobalModal />
          </JotaiProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
