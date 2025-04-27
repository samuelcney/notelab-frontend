import { AuthProvider } from "@/main/context/auth";
import { ModalProvider } from "@/main/context/modal";
import { QueryProvider } from "@/main/providers/QueryProvider";
import { SidebarProvider } from "@/main/providers/SidebarProvider";
import { ThemeProvider } from "@/main/providers/ThemeProvider";
import { ToastProvider } from "@/main/providers/ToastProvider";
import type { Metadata } from "next";
import { Saira } from "next/font/google";
import "./globals.css";

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
          <AuthProvider>
            <ThemeProvider>
              <SidebarProvider>
                <ModalProvider>{children}</ModalProvider>
              </SidebarProvider>
              <ToastProvider />
            </ThemeProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
