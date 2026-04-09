"use client";

import { useState } from "react";

import { useWindowStore } from "@/stores/use-window-store";
import type { Theme, WindowStore } from "@/stores/use-window-store";

type SettingsSection = "wallpaper" | "appearance" | "dock" | "about";

const WALLPAPERS: Array<{ id: string; label: string; gradient: string }> = [
  { id: "dark-space",    label: "Cosmos",      gradient: "linear-gradient(135deg,#050607 0%,#0d1117 40%,#090b10 100%)" },
  { id: "aurora",        label: "Aurore",       gradient: "linear-gradient(135deg,#0a0b0e 0%,#0d2b45 40%,#12002a 100%)" },
  { id: "graphite",      label: "Graphite",     gradient: "linear-gradient(135deg,#1a1d24 0%,#0b0c0f 100%)" },
  { id: "midnight-blue", label: "Minuit",       gradient: "linear-gradient(135deg,#05080d 0%,#0d1f3c 50%,#050a12 100%)" },
  { id: "forest",        label: "Forêt",        gradient: "linear-gradient(135deg,#050f06 0%,#0a1f0d 50%,#040a05 100%)" },
  { id: "crimson",       label: "Pourpre",      gradient: "linear-gradient(135deg,#0f0508 0%,#1f0a10 50%,#0a0304 100%)" }
];

const ACCENT_COLORS: Array<{ id: string; bg: string; label: string }> = [
  { id: "blue",   bg: "#0A7AFF", label: "Bleu"   },
  { id: "purple", bg: "#A855F7", label: "Violet" },
  { id: "pink",   bg: "#EC4899", label: "Rose"   },
  { id: "green",  bg: "#22C55E", label: "Vert"   },
  { id: "orange", bg: "#F97316", label: "Orange" },
  { id: "red",    bg: "#EF4444", label: "Rouge"  },
  { id: "gray",   bg: "#6B7280", label: "Graphite" }
];

export function AppSettings() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("appearance");
  const [activeWallpaper, setActiveWallpaper] = useState("dark-space");
  const [activeAccent, setActiveAccent] = useState("blue");
  const theme = useWindowStore((s: WindowStore) => s.theme);
  const setTheme = useWindowStore((s: WindowStore) => s.setTheme);

  const sections: Array<{ id: SettingsSection; label: string; icon: string }> = [
    { id: "wallpaper",  label: "Fond d'écran", icon: "🌄" },
    { id: "appearance", label: "Apparence",    icon: "🎨" },
    { id: "dock",       label: "Dock",         icon: "⬛" },
    { id: "about",      label: "À propos",     icon: "ℹ️" }
  ];

  return (
    <div className="grid h-auto grid-cols-[14rem_minmax(0,1fr)] overflow-hidden max-sm:grid-cols-1">
      {/* Sidebar */}
      <aside className="border-r border-white/10 bg-[#0a0b0e] px-3 py-4">
        <ul className="space-y-0.5">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActiveSection(s.id)}
                className={[
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                  activeSection === s.id
                    ? "bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                    : "text-white/55 hover:bg-white/7 hover:text-white"
                ].join(" ")}
              >
                <span className="text-base leading-none">{s.icon}</span>
                {s.label}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content */}
      <div className="bg-[#08090c] p-6 overflow-y-auto min-h-[380px]">
        {activeSection === "appearance" && (
          <AppearanceSection theme={theme} setTheme={setTheme} activeAccent={activeAccent} setAccent={setActiveAccent} />
        )}
        {activeSection === "wallpaper" && (
          <WallpaperSection wallpapers={WALLPAPERS} active={activeWallpaper} setActive={setActiveWallpaper} />
        )}
        {activeSection === "dock" && <DockSection />}
        {activeSection === "about" && <AboutSection />}
      </div>
    </div>
  );
}

function AppearanceSection({
  theme,
  setTheme,
  activeAccent,
  setAccent
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  activeAccent: string;
  setAccent: (id: string) => void;
}) {
  return (
    <div className="space-y-7">
      <div>
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/45">Mode d'affichage</p>
        <div className="grid grid-cols-2 gap-3">
          {(["dark", "light"] as Theme[]).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setTheme(mode)}
              className={[
                "group relative overflow-hidden rounded-xl border p-1 transition",
                theme === mode
                  ? "border-[#0A7AFF] ring-2 ring-[#0A7AFF]/35"
                  : "border-white/12 hover:border-white/25"
              ].join(" ")}
            >
              {/* Preview thumbnail */}
              <div
                className="h-20 rounded-lg overflow-hidden flex flex-col"
                style={{
                  background: mode === "dark"
                    ? "linear-gradient(170deg,#050607 0%,#0d1117 100%)"
                    : "linear-gradient(170deg,#e8eaf0 0%,#f0f2f8 100%)"
                }}
              >
                {/* Mini TopBar */}
                <div
                  className="h-3 flex items-center px-2 gap-1"
                  style={{ background: mode === "dark" ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)" }}
                >
                  {["#ff5f57","#febc2e","#28c840"].map((c) => (
                    <span key={c} className="h-1.5 w-1.5 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                {/* Mini window */}
                <div className="m-1 flex-1 rounded-md" style={{
                  background: mode === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"
                }} />
              </div>
              <p className={[
                "mt-1.5 pb-0.5 text-center text-xs font-medium",
                theme === mode ? "text-[#0A7AFF]" : "text-white/55"
              ].join(" ")}>
                {mode === "dark" ? "Sombre" : "Clair"}
              </p>
              {theme === mode && (
                <span className="absolute right-2 top-2 grid h-4 w-4 place-items-center rounded-full bg-[#0A7AFF] text-[9px] text-white font-bold">
                  ✓
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/45">Couleur d'accentuation</p>
        <div className="flex flex-wrap gap-2.5">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.id}
              type="button"
              title={color.label}
              onClick={() => setAccent(color.id)}
              className={[
                "relative h-7 w-7 rounded-full transition-transform hover:scale-110",
                activeAccent === color.id ? "ring-2 ring-white/80 ring-offset-1 ring-offset-black/50 scale-110" : ""
              ].join(" ")}
              style={{ background: color.bg }}
            >
              {activeAccent === color.id && (
                <span className="absolute inset-0 grid place-items-center text-[10px] font-black text-white/90">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function WallpaperSection({
  wallpapers,
  active,
  setActive
}: {
  wallpapers: typeof WALLPAPERS;
  active: string;
  setActive: (id: string) => void;
}) {
  return (
    <div>
      <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-white/45">Fond d'écran</p>
      <div className="grid grid-cols-3 gap-3">
        {wallpapers.map((wp) => (
          <button
            key={wp.id}
            type="button"
            onClick={() => setActive(wp.id)}
            className={[
              "group relative overflow-hidden rounded-xl border transition",
              active === wp.id
                ? "border-[#0A7AFF] ring-2 ring-[#0A7AFF]/35"
                : "border-white/12 hover:border-white/25"
            ].join(" ")}
          >
            <div className="h-16 w-full" style={{ background: wp.gradient }} />
            {active === wp.id && (
              <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-[#0A7AFF] text-[9px] text-white font-bold">
                ✓
              </span>
            )}
            <p className="py-1 text-center text-[11px] text-white/50">{wp.label}</p>
          </button>
        ))}
      </div>
      <p className="mt-4 text-xs text-white/35">
        Les fonds d'écran dynamiques seront disponibles dans une prochaine version.
      </p>
    </div>
  );
}

function DockSection() {
  const [magnify, setMagnify] = useState(true);
  return (
    <div className="space-y-5">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Dock</p>
      <label className="flex cursor-pointer items-center justify-between rounded-xl bg-white/5 px-4 py-3">
        <div>
          <p className="text-sm text-white/90">Effet de loupe</p>
          <p className="text-xs text-white/45">Agrandi les icônes au survol</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={magnify}
          onClick={() => setMagnify((v: boolean) => !v)}
          className={[
            "relative h-6 w-11 rounded-full transition-colors duration-200",
            magnify ? "bg-[#0A7AFF]" : "bg-white/20"
          ].join(" ")}
        >
          <span
            className={[
              "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
              magnify ? "translate-x-5.5 translate-x-[22px]" : "translate-x-0.5"
            ].join(" ")}
          />
        </button>
      </label>
      <label className="flex cursor-pointer items-center justify-between rounded-xl bg-white/5 px-4 py-3 opacity-50">
        <div>
          <p className="text-sm text-white/90">Position</p>
          <p className="text-xs text-white/45">Placement du Dock</p>
        </div>
        <span className="rounded-lg bg-white/10 px-2 py-1 text-xs text-white/60">Bas</span>
      </label>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="space-y-4">
      <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">À propos</p>
      <div className="rounded-xl bg-white/5 p-4 space-y-3">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#7dd3fc] to-[#a855f7] flex items-center justify-center text-2xl font-bold text-white shadow-lg">
            Y
          </div>
          <div>
            <p className="text-base font-semibold text-white/95">Yohan Saint-Marc</p>
            <p className="text-xs text-white/50">Développeur Front-End</p>
          </div>
        </div>
        <div className="border-t border-white/10 pt-3 space-y-2">
          {[
            ["Stack",    "React · Next.js · TypeScript"],
            ["3D",       "Three.js · R3F · GSAP"],
            ["UI/UX",    "Tailwind · Figma · Motion"],
            ["Version",  "Portfolio v2.0 – 2025"]
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs">
              <span className="text-white/40">{k}</span>
              <span className="text-white/75 font-medium">{v}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2">
        {[
          { label: "GitHub", href: "https://github.com/yohanstm-dev" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/yohan-saint-marc" }
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex-1 rounded-lg bg-white/8 py-2 text-center text-xs text-white/65 transition hover:bg-white/14 hover:text-white"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
