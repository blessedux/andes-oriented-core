import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BackgroundPathsBackdrop } from "@/components/ui/background-paths";
import "./globals.css";

export const metadata: Metadata = {
  title: "AndesOriCore Wiki",
  description: "Technical knowledge base for AndesOriCore platform",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="relative min-h-screen overflow-x-hidden bg-white dark:bg-neutral-950">
        <BackgroundPathsBackdrop />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
