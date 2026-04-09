"use client";

import { useState } from "react";

import { TechLogo } from "@/components/icons";
import { skillKeys } from "@/lib/macos-data";

const TECH_COLORS: Record<string, { from: string; to: string; glow: string; text: string }> = {
  html:       { from: "#E34F26", to: "#A02B0C", glow: "rgba(227,79,38,0.55)",   text: "#fff" },
  css:        { from: "#2164AD", to: "#0D3F7A", glow: "rgba(33,100,173,0.55)",  text: "#fff" },
  javascript: { from: "#F0C227", to: "#B88A00", glow: "rgba(240,194,39,0.55)",  text: "#111" },
  gsap:       { from: "#88CE02", to: "#4C7100", glow: "rgba(136,206,2,0.55)",   text: "#fff" },
  react:      { from: "#23C8F5", to: "#0895BA", glow: "rgba(35,200,245,0.55)",  text: "#fff" },
  next:       { from: "#4a4a4a", to: "#111111", glow: "rgba(255,255,255,0.22)", text: "#fff" },
  tailwind:   { from: "#38BDF8", to: "#0268A1", glow: "rgba(56,189,248,0.55)",  text: "#fff" },
  zustand:    { from: "#FF6B6B", to: "#B91C1C", glow: "rgba(255,107,107,0.55)", text: "#fff" },
  three:      { from: "#7a7a7a", to: "#1e1e1e", glow: "rgba(255,255,255,0.22)", text: "#fff" },
  r3f:        { from: "#9C6BF0", to: "#5721B0", glow: "rgba(156,107,240,0.55)", text: "#fff" },
  typescript: { from: "#3178C6", to: "#173C88", glow: "rgba(49,120,198,0.55)",  text: "#fff" },
  git:        { from: "#F05032", to: "#A01A0A", glow: "rgba(240,80,50,0.55)",   text: "#fff" },
  figma:      { from: "#A259FF", to: "#6B21A8", glow: "rgba(162,89,255,0.55)",  text: "#fff" },
  ux:         { from: "#EC4899", to: "#9D174D", glow: "rgba(236,72,153,0.55)",  text: "#fff" },
  a11y:       { from: "#22C55E", to: "#14532D", glow: "rgba(34,197,94,0.55)",   text: "#fff" },
  api:        { from: "#0EA5E9", to: "#075985", glow: "rgba(14,165,233,0.55)",  text: "#fff" },
  node:       { from: "#6DBE4B", to: "#2D6A1A", glow: "rgba(109,190,75,0.55)",  text: "#fff" },
  sql:        { from: "#00ACC1", to: "#005B6E", glow: "rgba(0,172,193,0.55)",   text: "#fff" },
};

export function AppSkills() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="h-[70vh] overflow-auto px-6 py-6 max-lg:h-auto max-md:px-4">
      <div className="mx-auto max-w-5xl space-y-6">

        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.36em] text-white/45">Stack Technique</p>
          <h2 className="text-3xl font-semibold tracking-[-0.06em] text-white/95 sm:text-[2.1rem]">
            18 technologies maîtrisées.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-white/62">
            Du HTML à la 3D interactive, chaque carte représente une compétence concrète
            mise en œuvre dans de vrais projets. Survole pour voir le glow.
          </p>
        </div>

        <div
          className="[perspective:900px]"
          onMouseLeave={() => setHovered(null)}
        >
          <div className="grid grid-cols-3 gap-3 [transform-style:preserve-3d] sm:grid-cols-4 md:grid-cols-6">
            {skillKeys.map((skill) => {
              const colors = TECH_COLORS[skill.icon];
              const isHovered = hovered === skill.label;

              return (
                <button
                  key={skill.label}
                  type="button"
                  onMouseEnter={() => setHovered(skill.label)}
                  className="group relative aspect-square rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                  style={{
                    transform: isHovered
                      ? "translateZ(32px) translateY(-8px) scale(1.1)"
                      : "translateZ(0px) scale(1)",
                    transition: "transform 0.22s cubic-bezier(0.175,0.885,0.32,1.275)",
                    willChange: "transform",
                  }}
                >
                  <span
                    className="pointer-events-none absolute -inset-1 rounded-2xl blur-xl transition-opacity duration-200"
                    style={{
                      background: colors?.glow ?? "rgba(255,255,255,0.2)",
                      opacity: isHovered ? 1 : 0,
                    }}
                  />
                  <span
                    className="relative flex h-full w-full flex-col items-center justify-center gap-2 rounded-2xl border border-white/16"
                    style={{
                      background: colors
                        ? `linear-gradient(148deg, ${colors.from} 0%, ${colors.to} 100%)`
                        : "linear-gradient(148deg, #333, #111)",
                      boxShadow: isHovered
                        ? `0 20px 48px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.22)`
                        : "0 8px 28px rgba(0,0,0,0.55)",
                      transition: "box-shadow 0.22s ease",
                    }}
                  >
                    <span
                      className="grid h-9 w-9 place-items-center rounded-xl bg-black/25"
                      style={{ color: colors?.text ?? "#fff" }}
                    >
                      <TechLogo name={skill.icon} className="h-6 w-6" />
                    </span>
                    <span
                      className="px-1 text-center text-[10px] font-semibold uppercase tracking-[0.18em] leading-tight"
                      style={{ color: colors?.text ?? "#fff", opacity: 0.9 }}
                    >
                      {skill.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
