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
      className="flex items-center justify-center text-white transition-colors border border-light-gray w-[45px] h-[23px] rounded-full cursor-pointer"
    >
      <span
        className={`w-[85%] h-[83%] ${
          currentTheme === "dark" ? "bg-[#303030]" : "bg-[#d2d2d2]"
        } flex items-center rounded-full ${
          currentTheme === "dark" ? "justify-end" : "justify-start"
        } transition-colors text-base outline-none`}
      >
        {currentTheme === "dark" ? "🌙" : "☀️"}
      </span>
    </span>
  );
}
