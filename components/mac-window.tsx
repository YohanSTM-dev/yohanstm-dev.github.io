"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { WindowId } from "@/lib/macos-data";
import { macWindows } from "@/lib/macos-data";
import { useWindowStore } from "@/stores/use-window-store";

type MacWindowProps = {
  id: WindowId;
  defaultWidth?: string;
  contentHeight?: string;
  children: ReactNode;
};

export function MacWindow({
  id,
  defaultWidth = "min(80vw, 60rem)",
  contentHeight,
  children
}: MacWindowProps) {
  const windowState = useWindowStore((s) => s.windows[id]);
  const highestZ = useWindowStore((s) => s.highestZ);
  const closeWindow = useWindowStore((s) => s.closeWindow);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const minimizeWindow = useWindowStore((s) => s.minimizeWindow);
  const moveWindow = useWindowStore((s) => s.moveWindow);

  const [localPos, setLocalPos] = useState({ x: windowState.x, y: windowState.y });
  const [isExiting, setIsExiting] = useState(false);
  const [showIcons, setShowIcons] = useState(false);

  const dragRef = useRef({
    active: false,
    startMouseX: 0,
    startMouseY: 0,
    startPosX: 0,
    startPosY: 0
  });
  const rafRef = useRef<number | null>(null);
  const lastOpenKey = useRef(`${windowState.isOpen}-${windowState.isMinimized}`);

  // Re-sync position when window is re-opened / restored
  useEffect(() => {
    const key = `${windowState.isOpen}-${windowState.isMinimized}`;
    if (key !== lastOpenKey.current) {
      lastOpenKey.current = key;
      if (windowState.isOpen && !windowState.isMinimized) {
        setLocalPos({ x: windowState.x, y: windowState.y });
      }
    }
  });

  const handleHeaderMouseDown = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if ((e.target as HTMLElement).closest("button")) return;
      e.preventDefault();
      focusWindow(id);
      dragRef.current = {
        active: true,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startPosX: localPos.x,
        startPosY: localPos.y
      };
    },
    [id, localPos.x, localPos.y, focusWindow]
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const dx = e.clientX - dragRef.current.startMouseX;
        const dy = e.clientY - dragRef.current.startMouseY;
        setLocalPos({
          x: Math.max(0, dragRef.current.startPosX + dx),
          y: Math.max(28, dragRef.current.startPosY + dy)
        });
      });
    };

    const onUp = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      const dx = e.clientX - dragRef.current.startMouseX;
      const dy = e.clientY - dragRef.current.startMouseY;
      const finalX = Math.max(0, dragRef.current.startPosX + dx);
      const finalY = Math.max(28, dragRef.current.startPosY + dy);
      setLocalPos({ x: finalX, y: finalY });
      moveWindow(id, finalX, finalY);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [id, moveWindow]);

  if (!windowState.isOpen && !isExiting) return null;

  const isVisible = windowState.isOpen && !windowState.isMinimized && !isExiting;
  const isFocused = windowState.zIndex === highestZ;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExiting(true);
    setTimeout(() => {
      closeWindow(id);
      setIsExiting(false);
    }, 260);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExiting(true);
    setTimeout(() => {
      minimizeWindow(id);
      setIsExiting(false);
    }, 260);
  };

  return (
    <section
      onMouseDown={() => focusWindow(id)}
      className={cn(
        "absolute transition-[opacity,transform] duration-300 will-change-transform",
        isVisible ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
      )}
      style={{
        left: localPos.x,
        top: localPos.y,
        zIndex: windowState.zIndex,
        width: defaultWidth
      }}
    >
      <div
        className={cn(
          "animate-window-in overflow-hidden rounded-[1.35rem] border shadow-mac-window transition-[border-color] duration-300",
          isFocused
            ? "border-white/30 bg-[#0a0b0e] ring-1 ring-white/6"
            : "border-white/12 bg-[#080910]"
        )}
      >
        <header
          className={cn(
            "flex h-11 cursor-grab select-none items-center justify-between border-b px-4 transition-colors duration-300",
            "active:cursor-grabbing",
            isFocused
              ? "border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)]"
              : "border-white/8 bg-transparent"
          )}
          onMouseDown={handleHeaderMouseDown}
        >
          <div
            className="flex items-center gap-[7px]"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
          >
            <button
              type="button"
              aria-label={`Fermer ${windowState.title}`}
              onClick={handleClose}
              className="traffic-light relative grid place-items-center bg-[#ff5f57] active:brightness-90"
            >
              <span
                className={cn(
                  "absolute text-[7px] font-black text-[#7d1d18] transition-opacity duration-100",
                  showIcons ? "opacity-100" : "opacity-0"
                )}
              >
                ✕
              </span>
            </button>
            <button
              type="button"
              aria-label={`Réduire ${windowState.title}`}
              onClick={handleMinimize}
              className="traffic-light relative grid place-items-center bg-[#febc2e] active:brightness-90"
            >
              <span
                className={cn(
                  "absolute text-[7px] font-black text-[#7d5a00] transition-opacity duration-100",
                  showIcons ? "opacity-100" : "opacity-0"
                )}
              >
                −
              </span>
            </button>
            <button
              type="button"
              aria-label={`Premier plan ${windowState.title}`}
              onClick={(e) => {
                e.stopPropagation();
                focusWindow(id);
              }}
              className="traffic-light relative grid place-items-center bg-[#28c840] active:brightness-90"
            >
              <span
                className={cn(
                  "absolute text-[7px] font-black text-[#0d5418] transition-opacity duration-100",
                  showIcons ? "opacity-100" : "opacity-0"
                )}
              >
                +
              </span>
            </button>
          </div>

          <div className="text-center">
            <p
              className={cn(
                "text-sm font-semibold",
                isFocused ? "text-white/95" : "text-white/88"
              )}
            >
              {windowState.title}
            </p>
            <p
              className={cn(
                "text-[10px] uppercase tracking-[0.25em]",
                isFocused ? "text-white/55" : "text-white/45"
              )}
            >
              {macWindows[id].subtitle}
            </p>
          </div>

          <div className="w-16" />
        </header>

        <div
          className="relative bg-[#08090c]"
          style={contentHeight ? { height: contentHeight } : undefined}
        >
          {children}
        </div>
      </div>
    </section>
  );
}


import { cn } from "@/lib/utils";
import type { WindowId } from "@/lib/macos-data";
import { macWindows } from "@/lib/macos-data";
import { useWindowStore } from "@/stores/use-window-store";

type MacWindowProps = {
  id: WindowId;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
};

export function MacWindow({
  id,
  className,
  contentClassName,
  children
}: MacWindowProps) {
  const windowState = useWindowStore((state) => state.windows[id]);
  const highestZ = useWindowStore((state) => state.highestZ);
  const closeWindow = useWindowStore((state) => state.closeWindow);
  const focusWindow = useWindowStore((state) => state.focusWindow);
  const minimizeWindow = useWindowStore((state) => state.minimizeWindow);

  const [isExiting, setIsExiting] = useState(false);

  const isVisible = windowState.isOpen && !windowState.isMinimized && !isExiting;

  if (!windowState.isOpen && !isExiting) {
    return null;
  }

  const handleClose = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExiting(true);
    setTimeout(() => {
      closeWindow(id);
      setIsExiting(false);
    }, 260);
  };

  const handleMinimize = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExiting(true);
    setTimeout(() => {
      minimizeWindow(id);
      setIsExiting(false);
    }, 260);
  };

  const isFocused = windowState.zIndex === highestZ;
  const [showIcons, setShowIcons] = useState(false);

  return (
    <section
      onMouseDown={() => focusWindow(id)}
      className={cn(
        "absolute transition-all duration-300",
        className,
        isVisible ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
      )}
      style={{ zIndex: windowState.zIndex }}
    >
      <div
        className={cn(
          "animate-window-in overflow-hidden rounded-[1.35rem] border shadow-mac-window transition-all duration-300",
          isFocused
            ? "border-white/30 bg-[#0a0b0e] ring-1 ring-white/6"
            : "border-white/12 bg-[#080910]"
        )}
      >
        <header
          className={cn(
            "flex h-11 items-center justify-between border-b px-4 transition-colors duration-300",
            isFocused
              ? "border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.02)_100%)]"
              : "border-white/8 bg-transparent"
          )}
        >
          <div
            className="flex items-center gap-[7px]"
            onMouseEnter={() => setShowIcons(true)}
            onMouseLeave={() => setShowIcons(false)}
          >
            <button
              type="button"
              aria-label={`Fermer ${windowState.title}`}
              onClick={handleClose}
              className="traffic-light relative grid place-items-center bg-[#ff5f57] active:brightness-90"
            >
              <span className={cn("absolute text-[7px] font-black text-[#7d1d18] transition-opacity duration-100", showIcons ? "opacity-100" : "opacity-0")}>
                ✕
              </span>
            </button>
            <button
              type="button"
              aria-label={`Réduire ${windowState.title}`}
              onClick={handleMinimize}
              className="traffic-light relative grid place-items-center bg-[#febc2e] active:brightness-90"
            >
              <span className={cn("absolute text-[7px] font-black text-[#7d5a00] transition-opacity duration-100", showIcons ? "opacity-100" : "opacity-0")}>
                −
              </span>
            </button>
            <button
              type="button"
              aria-label={`Mettre au premier plan ${windowState.title}`}
              onClick={(event) => {
                event.stopPropagation();
                focusWindow(id);
              }}
              className="traffic-light relative grid place-items-center bg-[#28c840] active:brightness-90"
            >
              <span className={cn("absolute text-[7px] font-black text-[#0d5418] transition-opacity duration-100", showIcons ? "opacity-100" : "opacity-0")}>
                +
              </span>
            </button>
          </div>

          <div className="text-center">
            <p className={cn("text-sm font-semibold", isFocused ? "text-white/95" : "text-white/88")}>
              {windowState.title}
            </p>
            <p
              className={cn(
                "text-[10px] uppercase tracking-[0.25em]",
                isFocused ? "text-white/55" : "text-white/45"
              )}
            >
              {macWindows[id].subtitle}
            </p>
          </div>

          <div className="w-16" />
        </header>

        <div className={cn("relative bg-[#08090c]", contentClassName)}>{children}</div>
      </div>
    </section>
  );
}
