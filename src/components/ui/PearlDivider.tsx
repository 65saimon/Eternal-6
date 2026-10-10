import React from "react";

interface PearlDividerProps {
  className?: string;
  count?: number;
}

export function PearlDivider({ className = "", count = 3 }: PearlDividerProps) {
  return (
    <div className={`pearl-divider my-8 ${className}`}>
      <div className="flex items-center gap-1.5">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full bg-gradient-to-br from-white via-[#FFF9F2] to-[#E7D8C5] shadow-[0_1px_3px_rgba(52,39,34,0.15)] border border-[#D6B878]/40 ${
              i === Math.floor(count / 2) ? "w-2.5 h-2.5" : "w-1.5 h-1.5 opacity-80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
