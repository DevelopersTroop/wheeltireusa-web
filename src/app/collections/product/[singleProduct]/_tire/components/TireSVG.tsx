"use client";

import React from "react";

// ─── Tire SVG ─────────────────────────────────────────────────────────────────
interface TireSVGProps {
  className?: string;
}

export const TireSVG = ({ className = "" }: TireSVGProps) => {
  return (
    <svg viewBox="0 0 230 230" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="115" cy="115" r="108" fill="#1a1a1a" />
      <circle cx="115" cy="115" r="108" fill="none" stroke="#2e2e2e" strokeWidth="6" strokeDasharray="6 4" />
      <circle cx="115" cy="115" r="100" fill="#222" />
      <circle cx="115" cy="115" r="100" fill="none" stroke="#111" strokeWidth="5" />
      <circle cx="115" cy="115" r="90"  fill="none" stroke="#111" strokeWidth="4" />
      <circle cx="115" cy="115" r="80"  fill="none" stroke="#111" strokeWidth="3" />
      <g opacity="0.6">
        {Array.from({ length: 24 }, (_, i) => (
          <rect key={i} x="113" y="15" width="4" height="14" rx="2" fill="#444"
            transform={`rotate(${i * 15} 115 115)`} />
        ))}
      </g>
      <circle cx="115" cy="115" r="68" fill="#2c2c2c" />
      <circle cx="115" cy="115" r="65" fill="none" stroke="#444" strokeWidth="2" />
      <g stroke="#3a3a3a" strokeWidth="8" strokeLinecap="round">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1="115" y1="50" x2="115" y2="115"
            transform={`rotate(${i * 51.43} 115 115)`} />
        ))}
      </g>
      <circle cx="115" cy="115" r="20" fill="#222" />
      <circle cx="115" cy="115" r="14" fill="#1a1a1a" />
      <circle cx="115" cy="115" r="8"  fill="#333" />
      <g stroke="#555" strokeWidth="3" strokeLinecap="round" opacity="0.5">
        {Array.from({ length: 7 }, (_, i) => (
          <line key={i} x1="115" y1="52" x2="115" y2="95"
            transform={`rotate(${i * 51.43} 115 115)`} />
        ))}
      </g>
    </svg>
  );
};

// ─── Thumbnail SVGs ───────────────────────────────────────────────────────────
interface ThumbSVGProps {
  id: number;
}

export const ThumbSVG = ({ id }: ThumbSVGProps) => {
  if (id === 0) return (
    <svg viewBox="0 0 44 44" className="w-full h-full p-1">
      <circle cx="22" cy="22" r="19" fill="#1a1a1a" />
      <circle cx="22" cy="22" r="12" fill="#2c2c2c" />
      <g stroke="#3a3a3a" strokeWidth="2.5" strokeLinecap="round">
        {Array.from({ length: 5 }, (_, i) => (
          <line key={i} x1="22" y1="10" x2="22" y2="22" transform={`rotate(${i * 72} 22 22)`} />
        ))}
      </g>
      <circle cx="22" cy="22" r="3.5" fill="#333" />
    </svg>
  );
  if (id === 1) return (
    <svg viewBox="0 0 44 44" className="w-full h-full p-1">
      <ellipse cx="22" cy="22" rx="9" ry="19" fill="#1a1a1a" />
      <ellipse cx="22" cy="22" rx="5.5" ry="12" fill="#2c2c2c" />
      <ellipse cx="22" cy="22" rx="2.5" ry="6" fill="#333" />
    </svg>
  );
  if (id === 2) return (
    <svg viewBox="0 0 44 44" className="w-full h-full p-1">
      <rect x="4"  y="4" width="36" height="36" rx="4" fill="#1a1a1a" />
      <rect x="8"  y="8" width="6"  height="28" rx="2" fill="#333" />
      <rect x="16" y="8" width="4"  height="28" rx="2" fill="#333" />
      <rect x="22" y="8" width="6"  height="28" rx="2" fill="#333" />
      <rect x="30" y="8" width="5"  height="28" rx="2" fill="#333" />
    </svg>
  );
  return (
    <svg viewBox="0 0 44 44" className="w-full h-full p-1">
      <ellipse cx="22" cy="22" rx="17" ry="13" fill="#1a1a1a" transform="rotate(-20 22 22)" />
      <ellipse cx="22" cy="22" rx="10" ry="7.5" fill="#2c2c2c" transform="rotate(-20 22 22)" />
      <circle cx="22" cy="22" r="3.5" fill="#333" />
    </svg>
  );
};
