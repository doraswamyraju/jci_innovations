import React from 'react';

export default function JciLogo({ height = 48, className = '', isDark = false }) {
  const textColor = isDark ? '#ffffff' : '#151b33';
  const subtitleColor = isDark ? '#38bdf8' : '#0097d8';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }} className={className}>
      <svg
        height={height}
        viewBox="0 0 360 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ display: 'block', height: `${height}px`, width: 'auto' }}
      >
        {/* JCI Text */}
        <text
          x="10"
          y="82"
          fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          fontSize="92"
          fontWeight="900"
          letterSpacing="-2px"
          fill={textColor}
        >
          JCI
        </text>

        {/* Tirupati Innovations Text */}
        <text
          x="12"
          y="126"
          fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          fontSize="30"
          fontWeight="800"
          letterSpacing="-0.5px"
          fill={subtitleColor}
        >
          Tirupati Innovations
        </text>

        {/* Official JCI Shield Emblem */}
        <g transform="translate(210, 10)">
          {/* Outer Shield Left Blue Arc */}
          <path
            d="M20 10 C 50 2, 75 8, 85 18 C 85 55, 65 95, 20 120 C 15 116, 12 110, 16 102 C 50 82, 64 52, 64 24 C 52 18, 32 16, 20 10 Z"
            fill="#0097d8"
          />
          {/* Outer Shield Right Teal/Mint Arc */}
          <path
            d="M85 18 C 96 28, 98 62, 70 100 C 62 110, 52 118, 42 124 C 47 118, 54 110, 60 102 C 82 72, 80 40, 72 26 C 76 22, 80 20, 85 18 Z"
            fill="#48c0b7"
          />
          {/* Inner Navy Shield Base */}
          <path
            d="M26 22 C 48 16, 68 20, 74 28 C 74 58, 58 88, 26 106 C 22 76, 22 45, 26 22 Z"
            fill={textColor}
          />
          {/* Inner Triangle / V in White */}
          <path
            d="M34 32 C 46 28, 58 30, 64 36 C 62 56, 50 78, 34 90 C 32 68, 32 48, 34 32 Z"
            fill="#ffffff"
          />
          {/* Inverted Navy Center Diamond / Triangle */}
          <path
            d="M40 40 C 48 38, 54 40, 58 44 C 56 58, 48 72, 40 80 Z"
            fill={textColor}
          />
          {/* TM Symbol */}
          <text
            x="96"
            y="118"
            fontFamily="sans-serif"
            fontSize="14"
            fontWeight="700"
            fill={textColor}
          >
            TM
          </text>
        </g>
      </svg>
    </div>
  );
}
