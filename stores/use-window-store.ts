import { create } from "zustand";

import type { WindowId } from "@/lib/macos-data";
import { macWindows } from "@/lib/macos-data";

export type Theme = "dark" | "light";

export type MacWindowState = {
  id: WindowId;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
  x: number;
  y: number;
};

export type WindowStore = {
  windows: Record<WindowId, MacWindowState>;
  highestZ: number;
  theme: Theme;
  openWindow: (id: WindowId) => void;
  closeWindow: (id: WindowId) => void;
  focusWindow: (id: WindowId) => void;
  minimizeWindow: (id: WindowId) => void;
  moveWindow: (id: WindowId, x: number, y: number) => void;
  setTheme: (theme: Theme) => void;
};

const INITIAL_POSITIONS: Record<WindowId, { x: number; y: number }> = {
  finder:   { x: 120, y: 56  },
  cv:       { x: 44,  y: 90  },
  skills:   { x: 700, y: 90  },
  contact:  { x: 640, y: 110 },
  settings: { x: 380, y: 120 }
};

const createInitialWindows = (): Record<WindowId, MacWindowState> => ({
  cv: {
    id: "cv",
    title: macWindows.cv.title,
    isOpen: true,
    isMinimized: false,
    zIndex: 30,
    ...INITIAL_POSITIONS.cv
  },
  skills: {
    id: "skills",
    title: macWindows.skills.title,
    isOpen: true,
    isMinimized: false,
    zIndex: 40,
    ...INITIAL_POSITIONS.skills
  },
  finder: {
    id: "finder",
    title: macWindows.finder.title,
    isOpen: true,
    isMinimized: false,
    zIndex: 50,
    ...INITIAL_POSITIONS.finder
  },
  contact: {
    id: "contact",
    title: macWindows.contact.title,
    isOpen: true,
    isMinimized: false,
    zIndex: 20,
    ...INITIAL_POSITIONS.contact
  },
  settings: {
    id: "settings",
    title: macWindows.settings.title,
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
    ...INITIAL_POSITIONS.settings
  }
});

export const useWindowStore = create<WindowStore>((set) => ({
  windows: createInitialWindows(),
  highestZ: 50,
  theme: "dark",

  openWindow: (id) =>
    set((state) => {
      const nextZ = state.highestZ + 1;
      return {
        highestZ: nextZ,
        windows: {
          ...state.windows,
          [id]: {
            ...state.windows[id],
            isOpen: true,
            isMinimized: false,
            zIndex: nextZ
          }
        }
      };
    }),

  closeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: false,
          isMinimized: false
        }
      }
    })),

  focusWindow: (id) =>
    set((state) => {
      const target = state.windows[id];
      if (!target.isOpen || target.isMinimized) return state;
      const nextZ = state.highestZ + 1;
      return {
        highestZ: nextZ,
        windows: {
          ...state.windows,
          [id]: { ...target, zIndex: nextZ }
        }
      };
    }),

  minimizeWindow: (id) =>
    set((state) => {
      const target = state.windows[id];
      if (!target.isOpen) return state;
      return {
        windows: {
          ...state.windows,
          [id]: { ...target, isMinimized: true }
        }
      };
    }),

  moveWindow: (id, x, y) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: { ...state.windows[id], x, y }
      }
    })),

  setTheme: (theme) => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.theme = theme;
    }
    set({ theme });
  }
}));
