import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { ToastProvider } from "@/components/Toast/ToastProvider";
import { SidebarProvider } from "@/context/SidebarContext";

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
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
