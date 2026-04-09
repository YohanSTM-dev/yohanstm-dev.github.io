"use client";

import { useState } from "react";

import { FinderCategoryIcon, FolderIcon, GithubIcon } from "@/components/icons";
import {
  finderCategories,
  finderProjects,
  type FinderCategoryId
} from "@/lib/macos-data";

export function AppFinder() {
  const [activeCategory, setActiveCategory] = useState<FinderCategoryId>("web");
  const projects = finderProjects[activeCategory];

  return (
    <div className="grid h-[72vh] grid-cols-[16rem_minmax(0,1fr)] overflow-hidden max-lg:h-auto max-lg:grid-cols-1">
      <aside className="border-r border-white/10 bg-[#0a0b0e] px-4 py-5">
        <p className="mb-2 px-2 text-[11px] uppercase tracking-[0.3em] text-white/40">Favoris</p>
        <ul className="space-y-1">
          {finderCategories.map((category) => {
            const active = category.id === activeCategory;

            return (
              <li key={category.id}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={[
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition",
                    active
                      ? "bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
                      : "text-white/60 hover:bg-white/7 hover:text-white"
                  ].join(" ")}
                >
                  <FinderCategoryIcon name={category.icon} className="h-4 w-4" />
                  {category.label}
                </button>
              </li>
            );
          })}
        </ul>

        <p className="mb-2 mt-6 px-2 text-[11px] uppercase tracking-[0.3em] text-white/40">Emplacements</p>
        <a
          href="https://github.com/yohanstm-dev"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/8 hover:text-white"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
      </aside>

          <div className="flex min-w-0 flex-col bg-[#08090c]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 max-md:flex-col max-md:items-start max-md:gap-1">
          <p className="text-sm text-white/70">Portfolio / {finderCategories.find((item) => item.id === activeCategory)?.label}</p>
          <p className="text-xs uppercase tracking-[0.2em] text-white/35">
            {projects.length} élément{projects.length > 1 ? "s" : ""}
          </p>
        </div>

        <div className="grid min-w-0 flex-1 grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 overflow-y-auto p-5">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.href}
              target={project.href.startsWith("#") ? "_self" : "_blank"}
              rel="noreferrer"
              className="rounded-[1.6rem] border border-white/12 bg-[#0e1015] p-5 shadow-[0_8px_28px_rgba(0,0,0,0.36)] transition hover:-translate-y-1 hover:border-white/22 hover:bg-[#12151d] hover:shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            >
              <span className="mb-3 inline-flex rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/55">
                {project.year}
              </span>
              <FolderIcon from={project.accentFrom} to={project.accentTo} className="mb-4 h-16 w-20" />
              <h3 className="text-lg font-semibold tracking-[-0.03em] text-white/95">{project.name}</h3>
              <p className="mt-2 text-sm leading-6 text-white/65">{project.summary}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
