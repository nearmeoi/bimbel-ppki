import React from 'react';

/**
 * Neo-Brutalist Sticker Pack
 * 8 geometric decorative sticker placeholders:
 * 1. star
 * 2. lightning
 * 3. check
 * 4. medal
 * 5. graduation
 * 6. pencil
 * 7. squiggle (arrow)
 * 8. sparkle
 *
 * Style: 2px solid black stroke, hard drop-shadow 2px 2px 0 #000, customizable colors & rotation.
 */

export function StickerStar({
  size = 40,
  color = '#F9FF33',
  className = '',
  rotate = -6,
  style = {},
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      className={`inline-flex items-center justify-center filter drop-shadow-[2px_2px_0_#000] transition-transform hover:scale-110 ${className}`}
      title="Sticker: Bintang"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="50,5 64,36 98,36 71,57 82,90 50,70 18,90 29,57 2,36 36,36"
          fill={color}
          stroke="#000000"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <circle cx="50" cy="50" r="6" fill="#000000" />
      </svg>
    </div>
  );
}

export function StickerLightning({
  size = 40,
  color = '#F9FF33',
  className = '',
  rotate = 12,
  style = {},
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      className={`inline-flex items-center justify-center filter drop-shadow-[2px_2px_0_#000] transition-transform hover:scale-110 ${className}`}
      title="Sticker: Petir"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="56,6 18,54 48,54 38,94 82,42 52,42"
          fill={color}
          stroke="#000000"
          strokeWidth="6"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function StickerCheck({
  size = 40,
  color = '#4ADE80',
  className = '',
  rotate = -4,
  style = {},
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      className={`inline-flex items-center justify-center filter drop-shadow-[2px_2px_0_#000] transition-transform hover:scale-110 ${className}`}
      title="Sticker: Checklist"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="42"
          fill={color}
          stroke="#000000"
          strokeWidth="6"
        />
        <path
          d="M30 52 L44 66 L72 34"
          stroke="#000000"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function StickerMedal({
  size = 40,
  color = '#FACC15',
  className = '',
  rotate = 6,
  style = {},
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      className={`inline-flex items-center justify-center filter drop-shadow-[2px_2px_0_#000] transition-transform hover:scale-110 ${className}`}
      title="Sticker: Medali"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ribbons */}
        <path d="M38 52 L26 90 L46 80 L52 90 L46 54" fill="#F472B6" stroke="#000000" strokeWidth="5" strokeLinejoin="round" />
        <path d="M62 52 L74 90 L54 80 L48 90 L54 54" fill="#2239E5" stroke="#000000" strokeWidth="5" strokeLinejoin="round" />
        {/* Coin */}
        <circle cx="50" cy="40" r="32" fill={color} stroke="#000000" strokeWidth="6" />
        <circle cx="50" cy="40" r="22" fill="none" stroke="#000000" strokeWidth="3" strokeDasharray="3 3" />
        <text x="50" y="47" textAnchor="middle" fontSize="22" fontWeight="900" fill="#000">#1</text>
      </svg>
    </div>
  );
}

export function StickerGraduation({
  size = 40,
  color = '#2239E5',
  className = '',
  rotate = -8,
  style = {},
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      className={`inline-flex items-center justify-center filter drop-shadow-[2px_2px_0_#000] transition-transform hover:scale-110 ${className}`}
      title="Sticker: Toga Kelulusan"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="50,16 92,36 50,56 8,36" fill={color} stroke="#000000" strokeWidth="6" strokeLinejoin="round" />
        <path d="M28 47 V70 C28 78 72 78 72 70 V47" fill={color} stroke="#000000" strokeWidth="6" strokeLinejoin="round" />
        <path d="M80 38 V66" stroke="#F9FF33" strokeWidth="4" strokeLinecap="round" />
        <circle cx="80" cy="70" r="4" fill="#F9FF33" stroke="#000" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function StickerPencil({
  size = 40,
  color = '#F9FF33',
  className = '',
  rotate = 25,
  style = {},
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      className={`inline-flex items-center justify-center filter drop-shadow-[2px_2px_0_#000] transition-transform hover:scale-110 ${className}`}
      title="Sticker: Pensil Latihan"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="20,80 14,86 14,94 22,94 28,88" fill="#111" stroke="#000" strokeWidth="4" />
        <polygon points="28,88 20,80 62,38 70,46" fill={color} stroke="#000" strokeWidth="5" strokeLinejoin="round" />
        <polygon points="70,46 62,38 76,24 84,32" fill="#F472B6" stroke="#000" strokeWidth="5" strokeLinejoin="round" />
        <line x1="38" y1="70" x2="46" y2="78" stroke="#000" strokeWidth="3" />
      </svg>
    </div>
  );
}

export function StickerSquiggle({
  size = 44,
  color = '#000000',
  className = '',
  rotate = 0,
  style = {},
}) {
  return (
    <div
      style={{
        width: size,
        height: size * 0.7,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}
      title="Sticker: Panah Squiggle"
    >
      <svg
        viewBox="0 0 120 70"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 10 40 Q 30 10 55 40 T 95 35"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M 80 18 L 102 34 L 84 52"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function StickerSparkle({
  size = 36,
  color = '#F472B6',
  className = '',
  rotate = 15,
  style = {},
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
      className={`inline-flex items-center justify-center filter drop-shadow-[2px_2px_0_#000] transition-transform hover:scale-110 ${className}`}
      title="Sticker: Kilau"
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M50 0 C50 32 68 50 100 50 C68 50 50 68 50 100 C50 68 32 50 0 50 C32 50 50 32 50 0 Z"
          fill={color}
          stroke="#000000"
          strokeWidth="5"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/**
 * Universal Sticker component helper
 */
export default function Sticker({
  name = 'star',
  size = 40,
  color,
  rotate,
  className = '',
  style = {},
}) {
  const stickers = {
    star: StickerStar,
    lightning: StickerLightning,
    check: StickerCheck,
    medal: StickerMedal,
    graduation: StickerGraduation,
    pencil: StickerPencil,
    squiggle: StickerSquiggle,
    sparkle: StickerSparkle,
  };

  const Component = stickers[name] || StickerStar;
  return <Component size={size} color={color} rotate={rotate} className={className} style={style} />;
}
