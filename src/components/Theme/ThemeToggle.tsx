"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = resolvedTheme || "light";

  return (
    <span
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className={`flex items-center justify-center text-white transition-colors border border-light-gray w-[64px] h-[30px] rounded-full cursor-pointer bg-background`}
    >
      <span
        className={`w-full h-full flex items-center rounded-full justify-between ${
          currentTheme === "dark" ? "flex-row" : "flex-row-reverse"
        } transition-colors p-1`}
      >
        <span
          className={`bg-foreground size-[22px] rounded-full ${
            currentTheme === "dark" ? "bg-foreground" : "bg-black"
          }`}
        />
        {currentTheme === "dark" ? "🌙" : "☀️"}
      </span>
    </span>
  );
}
