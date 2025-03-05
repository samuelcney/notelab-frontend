import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";

import { ToastProvider } from "@/components/Providers/ToastProvider";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/components/Providers/QueryProvider";
import { SidebarProvider } from "@/components/Providers/SidebarProvider";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "NoteLab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        suppressHydrationWarning
        className={`${saira.variable} antialiased`}
      >
        <QueryProvider>
          <ThemeProvider>
            <ToastProvider />
            <SidebarProvider>{children}</SidebarProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
