"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-[#D6B878]/30 bg-transparent flex items-center justify-center opacity-0 ${className}`}
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch to ${isDark ? "Day / Pearl Light" : "Evening / Noir Dark"} Mode`}
      title={`Switch to ${isDark ? "Day Light Mode" : "Evening Dark Mode"}`}
      className={`group relative flex items-center justify-center transition-all duration-300 rounded-full ${
        showLabel
          ? "px-3.5 py-2 gap-2 text-xs font-semibold"
          : "w-9 h-9"
      } ${
        isDark
          ? "bg-[#251D18] hover:bg-[#342722] text-[#D6B878] border border-[#D6B878]/40 shadow-[0_0_12px_rgba(214,184,120,0.15)]"
          : "bg-[#FFF9F2] hover:bg-white text-[#8C6E33] border border-[#D6B878]/40 shadow-sm"
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Moon className="w-4 h-4 text-[#D6B878] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
        ) : (
          <Sun className="w-4 h-4 text-[#B89A58] transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />
        )}
      </div>

      {showLabel && (
        <span className="capitalize text-xs tracking-wider">
          {isDark ? "Evening Noir" : "Daylight Pearl"}
        </span>
      )}
    </button>
  );
}

export default ThemeToggle;
