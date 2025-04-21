"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ReactNode, useEffect, useState } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (resolvedTheme) {
      document.documentElement.setAttribute("data-theme", resolvedTheme);
      localStorage.setItem("theme", resolvedTheme);
    }
  }, [resolvedTheme]);

  if (!mounted) return null;

  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="light">
      {children}
    </NextThemesProvider>
  );
}
