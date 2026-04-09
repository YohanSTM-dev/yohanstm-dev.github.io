"use client";

import { useMemo, useRef, useState } from "react";

import { DockAppIcon } from "@/components/icons";
import { dockApps } from "@/lib/macos-data";
import { cn } from "@/lib/utils";
import { useWindowStore } from "@/stores/use-window-store";

export function Dock() {
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pointerX, setPointerX] = useState<number | null>(null);
  const windows = useWindowStore((state) => state.windows);
  const openWindow = useWindowStore((state) => state.openWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);

  const scales = useMemo(() => {
    return dockApps.reduce<Record<string, number>>((accumulator, app) => {
      const node = buttonRefs.current[app.id];
      if (!node || pointerX === null) {
        accumulator[app.id] = 1;
        return accumulator;
      }

      const rect = node.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const distance = Math.abs(pointerX - centerX);
      const influence = Math.max(0, 1 - distance / 140);
      accumulator[app.id] = 1 + influence * 0.78;
      return accumulator;
    }, {});
  }, [pointerX]);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-5 z-50 hidden justify-center px-6 lg:flex">
      <div
        onMouseMove={(event) => setPointerX(event.clientX)}
        onMouseLeave={() => setPointerX(null)}
        className="glass-panel pointer-events-auto flex items-end gap-3 rounded-[1.8rem] px-4 py-3 shadow-dock"
      >
        {dockApps.map((app) => {
          const scale = scales[app.id] ?? 1;
          const lift = (scale - 1) * 18;
          const isOpen = windows[app.id].isOpen;

          return (
            <button
              key={app.id}
              ref={(node) => {
                buttonRefs.current[app.id] = node;
              }}
              type="button"
              onClick={() => {
                if (windows[app.id].isOpen && !windows[app.id].isMinimized) {
                  focusWindow(app.id);
                  return;
                }

                openWindow(app.id);
              }}
              className="group relative flex w-[4.35rem] flex-col items-center"
              style={{
                transform: `translateY(${-lift}px)`
              }}
            >
              <span
                className="dock-icon-shell"
                style={{
                  transform: `scale(${scale})`
                }}
              >
                <DockAppIcon name={app.icon} className="h-16 w-16" />
              </span>

              <span className="pointer-events-none absolute -top-10 rounded-lg bg-black/80 px-2 py-1 text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                {app.label}
              </span>

              <span
                className={cn(
                  "mt-2 h-1.5 w-8 rounded-full bg-[linear-gradient(90deg,#ff4d6d_0%,#f59e0b_25%,#facc15_45%,#22c55e_65%,#38bdf8_82%,#a855f7_100%)] transition-opacity",
                  isOpen ? "opacity-100" : "opacity-0"
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
