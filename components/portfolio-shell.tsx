"use client";

import { AppCV } from "@/components/apps/app-cv";
import { AppContact } from "@/components/apps/app-contact";
import { AppFinder } from "@/components/apps/app-finder";
import { AppSettings } from "@/components/apps/app-settings";
import { AppSkills } from "@/components/apps/app-skills";
import { Background3D } from "@/components/background-3d";
import { Dock } from "@/components/dock";
import { MacWindow } from "@/components/mac-window";
import { TopBar } from "@/components/top-bar";

export function PortfolioShell() {
  return (
    <main className="relative h-screen w-screen overflow-hidden"
      style={{ background: "var(--desk-bg)" }}
    >
      <Background3D />
      <TopBar />

      {/* Desktop area — windows are absolutely positioned inside here */}
      <div className="absolute inset-0 top-7 overflow-hidden">
        <MacWindow
          id="finder"
          defaultWidth="min(78vw, 68rem)"
          contentHeight="70vh"
        >
          <AppFinder />
        </MacWindow>

        <MacWindow
          id="cv"
          defaultWidth="min(42vw, 38rem)"
          contentHeight="70vh"
        >
          <AppCV />
        </MacWindow>

        <MacWindow
          id="skills"
          defaultWidth="min(44vw, 40rem)"
          contentHeight="70vh"
        >
          <AppSkills />
        </MacWindow>

        <MacWindow
          id="contact"
          defaultWidth="min(40vw, 36rem)"
        >
          <AppContact />
        </MacWindow>

        <MacWindow
          id="settings"
          defaultWidth="min(38vw, 32rem)"
        >
          <AppSettings />
        </MacWindow>
      </div>

      <Dock />
    </main>
  );
}


export function PortfolioShell() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-graphite-950 text-white">
      <Background3D />
      <TopBar />

      <div className="pointer-events-none absolute inset-x-0 top-14 z-10 flex justify-between px-8 max-lg:top-12 max-lg:px-4">
        <section className="max-w-2xl rounded-[2rem] border border-white/16 bg-black/85 px-7 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)] backdrop-blur-md">
          <p className="text-xs uppercase tracking-[0.32em] text-white/45">Portfolio One-Page</p>
          <h1 className="mt-3 max-w-xl text-5xl font-semibold tracking-[-0.08em] text-white/95 max-md:text-4xl">
            Bureau MacOS, motion et précision UI.
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/68">
            Architecture React moderne avec Next.js, Tailwind, GSAP, React Three Fiber et Zustand,
            pensée pour simuler un vrai desktop Apple en one-page.
          </p>
        </section>

        <DesktopFolder />
      </div>

      <div className="relative min-h-screen pt-12 pb-32 max-lg:pb-8">
        <MacWindow
          id="finder"
          className="left-[10%] top-20 w-[min(80vw,72rem)] max-lg:static max-lg:mx-4 max-lg:mt-[12rem] max-lg:w-auto"
          contentClassName="h-[72vh] max-lg:h-auto"
        >
          <AppFinder />
        </MacWindow>

        <MacWindow
          id="cv"
          className="left-8 top-24 w-[min(44vw,40rem)] max-lg:static max-lg:mx-4 max-lg:mt-4 max-lg:w-auto"
          contentClassName="h-[70vh] max-lg:h-auto"
        >
          <AppCV />
        </MacWindow>

        <MacWindow
          id="skills"
          className="right-8 top-28 w-[min(46vw,42rem)] max-lg:static max-lg:mx-4 max-lg:mt-4 max-lg:w-auto"
          contentClassName="h-[70vh] max-lg:h-auto"
        >
          <AppSkills />
        </MacWindow>

        <MacWindow
          id="contact"
          className="bottom-32 right-12 w-[min(40vw,36rem)] max-lg:static max-lg:mx-4 max-lg:mt-4 max-lg:w-auto"
          contentClassName="h-[70vh] max-lg:h-auto"
        >
          <AppContact />
        </MacWindow>
      </div>

      <Dock />
    </main>
  );
}
