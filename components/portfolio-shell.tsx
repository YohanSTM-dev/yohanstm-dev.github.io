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
