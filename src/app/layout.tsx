import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";

import { ToastProvider } from "@/components/Providers/ToastProvider";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "@/components/Providers/QueryProvider";
import { SidebarProvider } from "@/components/Providers/SidebarProvider";
import { ModalProvider } from "@/main/context/modal";

const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Notelab.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={`${saira.variable} antialiased`}>
        <QueryProvider>
          <ThemeProvider>
            <SidebarProvider>
              <ModalProvider>{children}</ModalProvider>
            </SidebarProvider>
            <ToastProvider />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
