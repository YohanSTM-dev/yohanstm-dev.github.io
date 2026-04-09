"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

import { experiences } from "@/lib/macos-data";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function AppCV() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const scroller = scrollerRef.current;
    if (!root || !scroller) {
      return;
    }

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card", root);
      const stats = gsap.utils.toArray<HTMLElement>(".cv-stat", root);
      const beacons = gsap.utils.toArray<HTMLElement>(".cv-beacon", root);
      const progressPath = root.querySelector<SVGPathElement>("#timeline-progress-path");
      const hero = root.querySelector<HTMLElement>(".cv-hero");
      const scanBar = root.querySelector<HTMLElement>(".cv-scan-bar");

      if (hero) {
        gsap.fromTo(
          hero,
          { autoAlpha: 0, y: 28, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.72, ease: "power3.out" }
        );
      }

      if (scanBar) {
        gsap.fromTo(
          scanBar,
          { xPercent: -120 },
          { xPercent: 220, duration: 4.2, ease: "none", repeat: -1 }
        );
      }

      if (beacons.length) {
        gsap.to(beacons, {
          scale: 1.18,
          opacity: 0.35,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          stagger: 0.1,
          ease: "sine.inOut"
        });
      }

      if (stats.length) {
        gsap.fromTo(
          stats,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.52,
            stagger: 0.08,
            delay: 0.2,
            ease: "power2.out"
          }
        );
      }

      if (progressPath) {
        const length = progressPath.getTotalLength();
        progressPath.style.strokeDasharray = `${length}`;
        progressPath.style.strokeDashoffset = `${length}`;

        gsap.to(progressPath, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            scroller,
            start: "top top+=120",
            end: "bottom bottom-=80",
            scrub: 0.35
          }
        });
      }

      cards.forEach((card, index) => {
        const fromX = index % 2 === 0 ? -36 : 36;

        gsap.fromTo(
          card,
          {
            autoAlpha: 0,
            y: 52,
            x: fromX,
            rotateX: 9,
            rotateY: index % 2 === 0 ? 5 : -5,
            scale: 0.96,
            transformOrigin: "50% 100%"
          },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.84,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              scroller,
              start: "top 82%",
              end: "top 56%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="h-[70vh] overflow-hidden max-lg:h-auto">
      <div ref={scrollerRef} className="h-full overflow-y-auto px-6 py-6 max-md:px-4">
        <div className="cv-hero relative mx-auto mb-8 max-w-4xl overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-[linear-gradient(145deg,rgba(7,13,28,0.88)_0%,rgba(10,24,44,0.78)_46%,rgba(8,40,58,0.66)_100%)] px-6 py-6 shadow-[0_30px_60px_rgba(3,7,18,0.62)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(34,211,238,0.07)_0%,transparent_34%,rgba(34,211,238,0.08)_68%,transparent_100%)]" />
          <div className="cv-scan-bar pointer-events-none absolute -left-1/4 top-0 h-full w-[34%] bg-[linear-gradient(90deg,transparent_0%,rgba(34,211,238,0.22)_48%,transparent_100%)] blur-[1px]" />
          <div className="pointer-events-none absolute -right-16 -top-14 h-44 w-44 rounded-full bg-cyan-300/18 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 left-12 h-52 w-52 rounded-full bg-emerald-300/16 blur-3xl" />

          <div className="relative z-10 space-y-4">
            <p className="text-[11px] uppercase tracking-[0.36em] text-cyan-100/80">Neural Profile Layer</p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.06em] text-white sm:text-[2.15rem]">
              Design produit futuriste, interfaces 3D lisibles et exécution front de précision.
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-white/72">
              Parcours structuré comme une architecture système: signaux visuels clairs, rythme
              maîtrisé et expérience orientée performance perçue.
            </p>

            <div className="grid gap-3 pt-2 sm:grid-cols-3">
              <div className="cv-stat rounded-2xl border border-cyan-100/20 bg-slate-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_24px_rgba(0,0,0,0.24)]">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/58">Experience</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-cyan-50">+4 ans</p>
              </div>
              <div className="cv-stat rounded-2xl border border-cyan-100/20 bg-slate-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_24px_rgba(0,0,0,0.24)]">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/58">Engine</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-cyan-50">Next / GSAP / R3F</p>
              </div>
              <div className="cv-stat rounded-2xl border border-cyan-100/20 bg-slate-950/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_12px_24px_rgba(0,0,0,0.24)]">
                <p className="text-xs uppercase tracking-[0.22em] text-cyan-100/58">Signal UX</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-cyan-50">99.9% lisible</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-5xl pb-8">
          <div className="pointer-events-none absolute bottom-6 left-[18px] top-4 w-10 md:left-1/2 md:-translate-x-1/2">
            <svg className="h-full w-full" viewBox="0 0 80 1300" preserveAspectRatio="none">
              <defs>
                <linearGradient id="timeline-accent-gradient" x1="40" y1="0" x2="40" y2="1300">
                  <stop stopColor="#7dd3fc" />
                  <stop offset="0.5" stopColor="#38bdf8" />
                  <stop offset="0.85" stopColor="#22d3ee" />
                  <stop offset="1" stopColor="#86efac" />
                </linearGradient>
              </defs>
              <path
                d="M40 24L40 1270"
                fill="none"
                stroke="rgba(148,163,184,0.25)"
                strokeLinecap="round"
                strokeWidth="4"
              />
              <path
                id="timeline-progress-path"
                d="M40 24L40 1270"
                fill="none"
                stroke="url(#timeline-accent-gradient)"
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
          </div>

          <div className="space-y-7 md:space-y-10">
            {experiences.map((experience, index) => {
              const alignRight = index % 2 !== 0;

              return (
                <article
                  key={experience.title}
                  className={[
                    "timeline-card relative w-full pl-12 md:pl-0 md:w-[48%]",
                    alignRight
                      ? "md:ml-auto md:pl-12"
                      : "md:pr-12"
                  ].join(" ")}
                >
                  <span
                    className={cn(
                      "cv-beacon absolute left-3 top-10 h-[13px] w-[13px] rounded-full border border-cyan-100/75 bg-[linear-gradient(180deg,#7dd3fc_0%,#38bdf8_58%,#86efac_100%)] shadow-[0_0_0_7px_rgba(125,211,252,0.16)] md:top-1/2 md:-translate-y-1/2",
                      alignRight ? "md:left-[-0.35rem]" : "md:left-auto md:right-[-0.35rem]"
                    )}
                  />

                  <div className="group relative overflow-hidden rounded-[1.5rem] border border-cyan-100/18 bg-[linear-gradient(145deg,rgba(8,18,36,0.9)_0%,rgba(12,29,53,0.78)_52%,rgba(11,36,44,0.72)_100%)] shadow-[0_26px_46px_rgba(1,8,21,0.62)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-100/40 hover:shadow-[0_30px_64px_rgba(2,16,36,0.72)]">
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(34,211,238,0.08)_0%,transparent_40%,rgba(16,185,129,0.08)_100%)]" />
                    <div className="pointer-events-none absolute -left-14 -top-16 h-32 w-32 rounded-full bg-cyan-200/18 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-16 right-4 h-36 w-36 rounded-full bg-emerald-300/18 blur-2xl" />

                    <div className="relative h-40 w-full overflow-hidden border-b border-cyan-100/20">
                      <Image
                        src={experience.image}
                        alt={experience.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 42vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.05)_0%,rgba(2,6,23,0.74)_100%)]" />
                    </div>
                    <div className="relative space-y-3 px-5 py-5">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-cyan-100/76">
                        {experience.period}
                      </p>
                      <h3 className="text-xl font-semibold tracking-[-0.045em] text-cyan-50">
                        {experience.title}
                      </h3>
                      <p className="text-sm leading-7 text-slate-100/78">{experience.description}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
