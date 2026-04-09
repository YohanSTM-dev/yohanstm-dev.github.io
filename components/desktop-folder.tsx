"use client";

import { useWindowStore } from "@/stores/use-window-store";

export function DesktopFolder() {
  const openWindow = useWindowStore((state) => state.openWindow);

  return (
    <button
      type="button"
      onClick={() => openWindow("finder")}
      className="pointer-events-auto absolute right-8 top-16 flex w-24 flex-col items-center gap-2 rounded-2xl p-2 text-center transition hover:bg-white/10"
    >
      <svg className="h-16 w-20" viewBox="0 0 80 64" fill="none" aria-hidden="true">
        <path d="M5 16.5A7.5 7.5 0 0 1 12.5 9h17.4c2.1 0 4.1.88 5.52 2.43L40 16h27.5A7.5 7.5 0 0 1 75 23.5v23A8.5 8.5 0 0 1 66.5 55h-53A8.5 8.5 0 0 1 5 46.5v-30Z" fill="url(#desktop-folder-body)" />
        <path d="M5 21.2A7.2 7.2 0 0 1 12.2 14h23.7c1.93 0 3.78.76 5.15 2.13l1.76 1.77H66.7A8.3 8.3 0 0 1 75 26.2V47a8 8 0 0 1-8 8H13a8 8 0 0 1-8-8V21.2Z" fill="url(#desktop-folder-front)" />
        <path d="M11 21h58" stroke="rgba(255,255,255,.42)" strokeLinecap="round" />
        <defs>
          <linearGradient id="desktop-folder-body" x1="8" y1="11" x2="74" y2="53">
            <stop stopColor="#72B6FF" />
            <stop offset="1" stopColor="#3E79F5" />
          </linearGradient>
          <linearGradient id="desktop-folder-front" x1="9" y1="16" x2="72" y2="57">
            <stop stopColor="#9FD6FF" />
            <stop offset="1" stopColor="#5B8CFF" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-[11px] font-medium text-white/95 shadow-black/50 [text-shadow:0_2px_8px_var(--tw-shadow-color)]">
        Projects
      </span>
    </button>
  );
}
