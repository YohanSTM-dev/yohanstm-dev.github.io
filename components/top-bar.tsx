"use client";

import { useEffect, useMemo, useState } from "react";

import { AppleIcon, BatteryIcon, WifiIcon } from "@/components/icons";

export function TopBar() {
  const formatter = useMemo(
    () =>
      new Intl.DateTimeFormat("fr-FR", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit"
      }),
    []
  );
  const [timeLabel, setTimeLabel] = useState(() => formatter.format(new Date()));

  useEffect(() => {
    let intervalId: number | undefined;
    const update = () => setTimeLabel(formatter.format(new Date()));
    update();

    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();
    const timeout = window.setTimeout(() => {
      update();
      intervalId = window.setInterval(update, 60_000);
    }, msUntilNextMinute);

    return () => {
      window.clearTimeout(timeout);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [formatter]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 h-7 px-0">
      <div className="pointer-events-auto flex h-full items-center justify-between bg-black/82 px-4 text-[13px] text-white/90 shadow-[0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <div className="flex items-center gap-0.5">
          <button type="button" className="flex items-center rounded-md px-2 py-0.5 transition hover:bg-white/12 active:bg-white/18">
            <AppleIcon className="h-[15px] w-[15px] text-white" />
          </button>
          <button type="button" className="rounded-md px-2.5 py-0.5 font-semibold transition hover:bg-white/12 active:bg-white/18">
            Yohan Saint-Marc
          </button>
          <button type="button" className="rounded-md px-2.5 py-0.5 text-white/75 transition hover:bg-white/12 hover:text-white active:bg-white/18">
            Fichier
          </button>
          <button type="button" className="rounded-md px-2.5 py-0.5 text-white/75 transition hover:bg-white/12 hover:text-white active:bg-white/18">
            Édition
          </button>
          <button type="button" className="rounded-md px-2.5 py-0.5 text-white/75 transition hover:bg-white/12 hover:text-white active:bg-white/18">
            Présentation
          </button>
          <button type="button" className="rounded-md px-2.5 py-0.5 text-white/75 transition hover:bg-white/12 hover:text-white active:bg-white/18">
            Fenêtre
          </button>
        </div>

        <div className="flex items-center gap-3 text-white/80">
          <WifiIcon className="h-3.5 w-auto opacity-90" />
          <BatteryIcon className="h-3 w-auto opacity-90" />
          <span className="text-white/55">100%</span>
          <time className="tabular-nums">{timeLabel}</time>
        </div>
      </div>
    </header>
  );
}
