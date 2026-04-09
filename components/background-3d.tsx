"use client";

import { useEffect, useRef } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";
import gsap from "gsap";

const DynamicBackgroundScene = dynamic(
  () => import("@/components/background-scene").then((mod) => mod.BackgroundScene),
  { ssr: false }
);

export function Background3D() {
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          scale: 1.06,
          xPercent: 2,
          yPercent: -2,
          duration: 14,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          opacity: 0.78,
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div ref={imageRef} className="absolute inset-0 scale-[1.02]">
        <Image
          src="/assets/images/quantum-cloud.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-55 saturate-[1.1]"
        />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,0,128,0.14),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(96,165,250,0.18),transparent_24%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,rgba(3,5,10,0.18)_0%,rgba(3,5,10,0.72)_100%)]" />
      <div ref={overlayRef} className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.14),transparent_55%)]" />
      <div className="absolute inset-0 opacity-40">
        <DynamicBackgroundScene />
      </div>
    </div>
  );
}
