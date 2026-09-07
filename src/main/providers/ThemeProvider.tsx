"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";

/**
 * `next-themes` já cuida de:
 *  - persistir a escolha em localStorage ("theme")
 *  - aplicar `data-theme` em <html> antes da hidratação (via um <script> inline)
 *
 * O provider precisa renderizar no servidor para esse <script> anti-FOUC ser
 * emitido no HTML. Se ele for adiado para o cliente (ex.: `if (!mounted) return
 * null`), o React avisa "Encountered a script tag while rendering React
 * component" — o script nunca chega a rodar. Por isso NÃO há gate de `mounted`
 * aqui. O `<html>` em `layout.tsx` tem `suppressHydrationWarning`, exigido pelo
 * next-themes.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="light"
      enableSystem={false}
    >
      {children}
    </NextThemesProvider>
  );
}
