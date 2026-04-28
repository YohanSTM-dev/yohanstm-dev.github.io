"use client";

import { useRef, useCallback } from "react";
import gsap from "gsap";

const playspeed = 1;

const keyframes = [
  /* 0 */ 0.00,
  /* 1 */ 0.20,
  /* 2 */ 0.27,
  /* 3 */ 0.35,
  /* 4 */ 0.55,
  /* 5 */ 2.00,
];

const timespan = (start: number, end: number) => ({
  delay: keyframes[start] * (1 / playspeed),
  duration: (keyframes[end] - keyframes[start]) * (1 / playspeed),
});

export function AnimatedFinderDockIcon({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const folderFrontRef = useRef<SVGSVGElement>(null);

  const handleClick = useCallback(() => {
    const wrap = wrapRef.current;
    const folderFront = folderFrontRef.current;
    if (!wrap || !folderFront) return;

    const page = document.createElement("div");
    page.className = "fi-page-2";
    wrap.insertBefore(page, folderFront);

    /* Page — chute */
    gsap.fromTo(
      page,
      { "--ratio-page-2-offset": 1, "--ratio-page-2-height": 1 },
      {
        "--ratio-page-2-offset": 0,
        ...timespan(0, 3),
        onComplete: () => { page.remove(); },
      }
    );

    /* Page — apparition */
    gsap.fromTo(
      page,
      { "--opacity-page-2": 0 },
      { "--opacity-page-2": 1, ...timespan(0, 1) }
    );

    /* Page — hauteur */
    gsap.to(page, { "--ratio-page-2-height": 0.5, ...timespan(2, 3) });

    /* Pages — scale */
    gsap.fromTo(wrap, { "--scale-pages": 1 }, { "--scale-pages": 0.8, ...timespan(3, 4) });
    gsap.to(wrap, { "--scale-pages": 1, ease: "elastic", ...timespan(4, 5) });

    /* Dossier — scale */
    gsap.fromTo(wrap, { "--scale-folder": 1 }, { "--scale-folder": 1.12, ...timespan(3, 4) });
    gsap.to(wrap, { "--scale-folder": 1, ease: "elastic", ...timespan(4, 5) });
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`finder-icon-wrap${className ? ` ${className}` : ""}`}
      onClick={handleClick}
    >
      {/* Dos du dossier */}
      <svg className="fi-folder-back" viewBox="0 0 48 48">
        <path
          d="
            M  3.50  7.50
            C  3.50  5.29   5.28  3.50   7.49  3.50
            C 13.17  3.50  23.18  3.50  26.00  3.50
            C 30.00  3.50  28.00  6.00  32.00  6.00
            C 34.21  6.00  37.87  6.00  40.71  6.00
            C 42.93  6.00  44.73  7.82  44.71 10.04
            L 44.54 25.04
            C 44.52 27.24  42.74 29.00  40.54 29.00
            H  7.50
            C  5.29 29.00   3.50 27.21   3.50 25.00
            V  7.50
            Z
          "
          fill="#32AF75"
        />
      </svg>

      {/* Feuille de fond (permanente) */}
      <div className="fi-page-1" />

      {/* Feuille avant (permanente) */}
      <div className="fi-page-2" />

      {/* Face avant du dossier */}
      <svg ref={folderFrontRef} className="fi-folder-front" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="fi-folder-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#47DB99" stopOpacity={1} />
            <stop offset="100%" stopColor="#2EA16D" stopOpacity={1} />
          </linearGradient>
        </defs>
        <path
          d="
            M  2.36 24.31
            C  2.17 23.09   3.11 22.00   4.34 22.00
            H 40.90
            C 41.80 22.00  42.33 23.00  41.83 23.75
            L 41.40 24.40
            C 41.16 24.76  41.16 25.24  41.40 25.60
            V 25.60
            C 41.73 26.10  42.40 26.23  42.90 25.90
            L 43.50 25.50
            V 25.50
            C 44.75 24.88  46.17 25.93  45.94 27.31
            L 43.57 41.17
            C 43.24 43.09  41.57 44.50  39.63 44.50
            H  8.93
            C  6.95 44.50   5.28 43.06   4.97 41.11
            L  2.36 24.31
            Z
          "
          fill="url(#fi-folder-gradient)"
        />
      </svg>
    </div>
  );
}
