import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export function AppleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 20" fill="none" {...props}>
      <path
        d="M15.16 14.27c-.36.84-.74 1.61-1.23 2.31-.64.95-1.16 1.6-1.57 1.95-.63.58-1.3.88-2.03.89-.51 0-1.14-.14-1.86-.45-.72-.3-1.39-.45-1.99-.45-.63 0-1.31.15-2.06.45-.75.3-1.35.45-1.8.46-.7.03-1.39-.28-2.03-.9-.45-.39-1-.99-1.63-2.03C.48 15.31.03 14.14.03 12.86c0-1.13.24-2.18.73-3.13.38-.73.91-1.33 1.57-1.76.65-.43 1.35-.65 2.1-.65.55 0 1.27.16 2.14.47.88.32 1.44.48 1.67.48.2 0 .82-.18 1.85-.54 1-.34 1.83-.48 2.51-.42.91.08 1.68.34 2.3.76.35.25.7.58 1.03 1.01-.84.52-1.42 1.22-1.71 2.12-.29.87-.26 1.72.09 2.52.35.8.88 1.4 1.6 1.86ZM11.23.72c0 .7-.13 1.37-.39 1.99-.28.69-.7 1.26-1.24 1.68-.51.41-1.08.66-1.7.68-.03-.63.07-1.17.2-1.74.13-.64.4-1.24.8-1.78.38-.52.86-.92 1.42-1.23.56-.3 1.08-.43 1.54-.39-.34.49-.53.75-.63.79Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WifiIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 18 13" fill="none" {...props}>
      <circle cx="9" cy="11.4" r="1.3" fill="currentColor" />
      <path d="M5.7 8.45a4.68 4.68 0 0 1 6.6 0" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.85 5.6a8.72 8.72 0 0 1 12.3 0" stroke="currentColor" strokeWidth="1.4" opacity=".72" />
      <path d="M.7 2.7a11.9 11.9 0 0 1 16.6 0" stroke="currentColor" strokeWidth="1.4" opacity=".38" />
    </svg>
  );
}

export function BatteryIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 25 12" fill="none" {...props}>
      <rect x=".7" y=".7" width="20.9" height="10.6" rx="3.3" stroke="currentColor" strokeWidth="1.2" />
      <rect x="2.3" y="2.25" width="14.8" height="7.5" rx="1.8" fill="currentColor" />
      <path d="M23.1 4.2v3.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function FinderIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect width="64" height="64" rx="18" fill="url(#finder-icon-gradient)" />
      <path d="M17 18h13.9l3.7 4H46a4 4 0 0 1 4 4v18a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4V22a4 4 0 0 1 4-4Z" fill="#E8F6FF" />
      <path d="M32 18v30" stroke="#1C63EA" strokeWidth="2.2" />
      <path d="M20.5 32.3c1.89 1.57 4.02 2.35 6.4 2.35 2.33 0 4.38-.78 6.15-2.35" stroke="#1C63EA" strokeWidth="2.2" />
      <path d="M34.7 32.3c1.75 1.57 3.82 2.35 6.22 2.35s4.54-.78 6.58-2.35" stroke="#1847B5" strokeWidth="2.2" />
      <circle cx="25.6" cy="25.7" r="1.45" fill="#1C63EA" />
      <circle cx="39.1" cy="25.7" r="1.45" fill="#1847B5" />
      <defs>
        <linearGradient id="finder-icon-gradient" x1="4" y1="4" x2="58" y2="58">
          <stop stopColor="#8EDFFF" />
          <stop offset="1" stopColor="#2A73FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function CvIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect width="64" height="64" rx="18" fill="url(#cv-icon-bg)" />
      {/* Document base */}
      <rect x="18" y="13" width="28" height="38" rx="3.5" fill="white" fillOpacity="0.18" stroke="white" strokeOpacity="0.5" strokeWidth="1.2" />
      {/* Photo placeholder */}
      <circle cx="32" cy="25" r="6.5" fill="white" fillOpacity="0.9" />
      {/* Name line */}
      <rect x="24" y="34" width="16" height="2.2" rx="1.1" fill="white" fillOpacity="0.88" />
      {/* Detail lines */}
      <rect x="22" y="39" width="20" height="1.6" rx="0.8" fill="white" fillOpacity="0.55" />
      <rect x="24" y="42.5" width="16" height="1.6" rx="0.8" fill="white" fillOpacity="0.4" />
      <defs>
        <linearGradient id="cv-icon-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5856D6" />
          <stop offset="1" stopColor="#2C2C6E" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function SkillsIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect width="64" height="64" rx="18" fill="url(#skills-icon-bg)" />
      {/* Colored tech mini-cards */}
      <rect x="12" y="12" width="18" height="18" rx="4" fill="#E34F26" />
      <rect x="34" y="12" width="18" height="18" rx="4" fill="#3178C6" />
      <rect x="12" y="34" width="18" height="18" rx="4" fill="#F0C227" />
      <rect x="34" y="34" width="18" height="18" rx="4" fill="#23C8F5" />
      {/* White gloss overlay */}
      <rect x="12" y="12" width="40" height="40" rx="4" fill="white" fillOpacity="0.06" />
      <defs>
        <linearGradient id="skills-icon-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1a1a1e" />
          <stop offset="1" stopColor="#0a0a0d" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ContactIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <rect width="64" height="64" rx="18" fill="url(#contact-icon-bg)" />
      {/* Envelope body */}
      <rect x="11" y="18" width="42" height="29" rx="5.5" fill="white" />
      {/* Envelope flap shadow */}
      <path d="M11 23.5 32 38.5l21-15" fill="none" stroke="#1565C0" strokeWidth="0.8" strokeOpacity="0.3" />
      {/* Blue flap */}
      <path d="M11 18.5l21 14.8 21-14.8V20a5.5 5.5 0 0 0-5.5-5.5H16.5A5.5 5.5 0 0 0 11 20v-1.5Z" fill="url(#mail-flap)" />
      <defs>
        <linearGradient id="contact-icon-bg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#1E88E5" />
          <stop offset="1" stopColor="#0D47A1" />
        </linearGradient>
        <linearGradient id="mail-flap" x1="11" y1="14.5" x2="53" y2="33.3" gradientUnits="userSpaceOnUse">
          <stop stopColor="#42A5F5" />
          <stop offset="1" stopColor="#1565C0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FolderIcon({
  from = "#8EDFFF",
  to = "#2A73FF",
  ...props
}: IconProps & { from?: string; to?: string }) {
  return (
    <svg viewBox="0 0 96 72" fill="none" {...props}>
      <path
        d="M10 18.8A8.8 8.8 0 0 1 18.8 10h21.3c2.3 0 4.5.94 6.12 2.6l4.23 4.2H76a10 10 0 0 1 10 10V50A10 10 0 0 1 76 60H20A10 10 0 0 1 10 50V18.8Z"
        fill={from}
      />
      <path
        d="M10 25a8.3 8.3 0 0 1 8.3-8.3H46l4.8 4.9H76a10 10 0 0 1 10 10v18.1A10.3 10.3 0 0 1 75.7 60H20.3A10.3 10.3 0 0 1 10 49.7V25Z"
        fill={to}
      />
      <path d="M18 26h60" stroke="rgba(255,255,255,.44)" strokeLinecap="round" strokeWidth="1.2" />
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 2C6.48 2 2 6.48 2 12.02c0 4.42 2.87 8.18 6.84 9.5.5.1.68-.22.68-.48v-1.69c-2.78.61-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.39 9.39 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10.02 10.02 0 0 0 22 12.02C22 6.48 17.52 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.23 0H1.77A1.77 1.77 0 0 0 0 1.77v20.46C0 23.2.8 24 1.77 24h20.46c.97 0 1.77-.8 1.77-1.77V1.77C24 .8 23.2 0 22.23 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function DockAppIcon({
  name,
  className
}: {
  name: "finder" | "cv" | "skills" | "contact" | "settings";
  className?: string;
}) {
  const props = { className };

  switch (name) {
    case "finder":
      return <FinderIcon {...props} />;
    case "cv":
      return <CvIcon {...props} />;
    case "skills":
      return <SkillsIcon {...props} />;
    case "contact":
      return <ContactIcon {...props} />;
    case "settings":
      return (
        <svg viewBox="0 0 64 64" fill="none" {...props}>
          <rect width="64" height="64" rx="14" fill="url(#sg)" />
          <defs>
            <linearGradient id="sg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6e6e73" />
              <stop offset="1" stopColor="#3a3a3c" />
            </linearGradient>
          </defs>
          <path
            d="M32 20a2.5 2.5 0 0 1 2.38 1.74l.74 2.3a9.94 9.94 0 0 1 2.32 1.35l2.36-.63a2.5 2.5 0 0 1 2.85 1.15l.01.02 1.5 2.6a2.5 2.5 0 0 1-.46 3.06l-1.77 1.62c.06.58.07.94.07 1.29s-.01.71-.07 1.29l1.77 1.62a2.5 2.5 0 0 1 .46 3.06l-1.51 2.62a2.5 2.5 0 0 1-2.85 1.15l-2.36-.63a9.94 9.94 0 0 1-2.32 1.35l-.74 2.3A2.5 2.5 0 0 1 32 46h-3a2.5 2.5 0 0 1-2.38-1.74l-.74-2.3a9.94 9.94 0 0 1-2.32-1.35l-2.36.63a2.5 2.5 0 0 1-2.85-1.15l-1.51-2.62a2.5 2.5 0 0 1 .46-3.06l1.77-1.62A10.1 10.1 0 0 1 19 31.5c0-.35.01-.71.07-1.29l-1.77-1.62a2.5 2.5 0 0 1-.46-3.06l1.5-2.6.01-.02a2.5 2.5 0 0 1 2.85-1.15l2.36.63A9.94 9.94 0 0 1 25.88 21l.74-2.3A2.5 2.5 0 0 1 29 18.5l.5-.5h2.5Z"
            fill="rgba(255,255,255,0.15)"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.5"
          />
          <circle cx="30.5" cy="31.5" r="5" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
        </svg>
      );
    default:
      return null;
  }
}

export function FinderCategoryIcon({
  name,
  className
}: {
  name: "globe" | "grid" | "clock";
  className?: string;
}) {
  switch (name) {
    case "globe":
      return (
        <BaseIcon viewBox="0 0 16 16" className={className}>
          <circle cx="8" cy="8" r="6" strokeWidth="1.4" />
          <path d="M2 8h12M8 2c-1.55 1.95-2.33 3.95-2.33 6S6.45 12.05 8 14" strokeWidth="1.4" />
        </BaseIcon>
      );
    case "grid":
      return (
        <BaseIcon viewBox="0 0 16 16" className={className}>
          <rect x="2" y="2" width="5" height="5" rx="1" strokeWidth="1.4" />
          <rect x="9" y="2" width="5" height="5" rx="1" strokeWidth="1.4" />
          <rect x="2" y="9" width="5" height="5" rx="1" strokeWidth="1.4" />
          <rect x="9" y="9" width="5" height="5" rx="1" strokeWidth="1.4" />
        </BaseIcon>
      );
    case "clock":
      return (
        <BaseIcon viewBox="0 0 16 16" className={className}>
          <circle cx="8" cy="8" r="6" strokeWidth="1.4" />
          <path d="M8 4.5V8l2.5 2.5" strokeWidth="1.4" />
        </BaseIcon>
      );
    default:
      return null;
  }
}

export function TechLogo({
  name,
  className
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case "html":
      return (
        <BaseIcon className={className}>
          <path d="M6 3h12l-1.2 15L12 21l-4.8-3L6 3Z" strokeWidth="1.8" />
          <path d="M9 7h6M9.4 11h5.2M9.8 15h4.4" strokeWidth="1.8" />
        </BaseIcon>
      );
    case "css":
      return (
        <BaseIcon className={className}>
          <path d="M6 3h12l-1.3 15L12 21l-4.7-3L6 3Z" strokeWidth="1.8" />
          <path d="M9 7h6l-.3 3.2H9.6M10 15h3.8l-.2 2" strokeWidth="1.8" />
        </BaseIcon>
      );
    case "javascript":
      return (
        <BaseIcon className={className}>
          <rect x="4" y="4" width="16" height="16" rx="4" strokeWidth="1.8" />
          <path d="M9 9v6.5c0 1.4-.7 2.1-2 2.5M13 15.3c.5.9 1.4 1.5 2.7 1.5 1.1 0 1.9-.5 1.9-1.4 0-1-.7-1.3-2.1-1.9l-.6-.3c-1.8-.7-2.9-1.6-2.9-3.6 0-1.8 1.4-3.1 3.5-3.1 1.5 0 2.7.5 3.4 1.9" strokeWidth="1.6" />
        </BaseIcon>
      );
    case "gsap":
      return (
        <BaseIcon className={className}>
          <path d="M5 14c2-4.5 5.6-6.7 10.7-6.7 3.7 0 6.8 1.3 8.3 3.8" strokeWidth="1.8" />
          <path d="M6.5 18c2.2-1.5 4.8-2.2 7.5-2.2 3.8 0 6.6 1.1 8.5 3.2" strokeWidth="1.8" />
          <circle cx="7" cy="7" r="1.7" fill="currentColor" stroke="none" />
        </BaseIcon>
      );
    case "react":
      return (
        <BaseIcon className={className}>
          <ellipse cx="12" cy="12" rx="7.5" ry="2.9" strokeWidth="1.5" />
          <ellipse cx="12" cy="12" rx="7.5" ry="2.9" strokeWidth="1.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="7.5" ry="2.9" strokeWidth="1.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
        </BaseIcon>
      );
    case "next":
      return (
        <BaseIcon className={className}>
          <circle cx="12" cy="12" r="8.2" strokeWidth="1.8" />
          <path d="M9 8v8M15.2 16 9 8m6.2 0v8" strokeWidth="1.8" />
        </BaseIcon>
      );
    case "tailwind":
      return (
        <BaseIcon className={className}>
          <path d="M7 10.2c1-1.7 2.1-2.4 3.4-2.4 2 0 2.3 1.5 3.6 1.5 1 0 1.8-.5 2.6-1.7-1 1.7-2.1 2.4-3.4 2.4-2 0-2.3-1.5-3.6-1.5-1 0-1.8.5-2.6 1.7ZM7 15.2c1-1.7 2.1-2.4 3.4-2.4 2 0 2.3 1.5 3.6 1.5 1 0 1.8-.5 2.6-1.7-1 1.7-2.1 2.4-3.4 2.4-2 0-2.3-1.5-3.6-1.5-1 0-1.8.5-2.6 1.7Z" strokeWidth="1.8" />
        </BaseIcon>
      );
    case "zustand":
      return (
        <BaseIcon className={className}>
          <path d="M5 15c2.8-3.8 5.7-5.8 8.7-5.8 2 0 3.8.8 5.3 2.2-2.7 3.8-5.6 5.8-8.7 5.8-2 0-3.8-.8-5.3-2.2Z" strokeWidth="1.8" />
          <path d="M7.5 15.3c.8-.6 1.7-.9 2.7-.9 1.3 0 2.5.5 3.5 1.4" strokeWidth="1.6" />
        </BaseIcon>
      );
    case "three":
      return (
        <BaseIcon className={className}>
          <path d="m12 4 6.2 10.8H5.8L12 4ZM15.6 10h4V20h-4" strokeWidth="1.8" />
        </BaseIcon>
      );
    case "r3f":
      return (
        <BaseIcon className={className}>
          <path d="M12 4 6 7.5v9L12 20l6-3.5v-9L12 4Z" strokeWidth="1.8" />
          <path d="M12 4v7l6-3.5M12 11 6 7.5M12 11v9" strokeWidth="1.6" />
        </BaseIcon>
      );
    case "typescript":
      return (
        <BaseIcon className={className}>
          <rect x="4" y="4" width="16" height="16" rx="3.5" strokeWidth="1.8" />
          <path d="M8 9h8M12 9v8M15 11.5c.4-.9 1.1-1.3 2-1.3 1.1 0 1.8.6 1.8 1.5 0 1-.8 1.3-1.7 1.7l-.5.2c-1 .4-1.8.9-1.8 1.9 0 .8.7 1.5 1.9 1.5.8 0 1.5-.3 2-.9" strokeWidth="1.6" />
        </BaseIcon>
      );
    case "git":
      return (
        <BaseIcon className={className}>
          <path d="M8 6v11a2 2 0 0 0 2 2h5M8 11h7a3 3 0 0 0 3-3V6" strokeWidth="1.8" />
          <circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="8" cy="11" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
          <circle cx="18" cy="19" r="1.5" fill="currentColor" stroke="none" />
        </BaseIcon>
      );
    case "figma":
      return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
          <rect x="7" y="3" width="6" height="6" rx="3" fill="currentColor" />
          <rect x="7" y="9" width="6" height="6" rx="3" fill="currentColor" opacity=".85" />
          <rect x="7" y="15" width="6" height="6" rx="3" fill="currentColor" opacity=".7" />
          <rect x="13" y="3" width="6" height="6" rx="3" fill="currentColor" opacity=".55" />
          <circle cx="16" cy="12" r="3" fill="currentColor" opacity=".8" />
        </svg>
      );
    case "ux":
      return (
        <BaseIcon className={className}>
          <path d="M6 7h8l4 4v8h-8l-4-4V7Z" strokeWidth="1.8" />
          <path d="m11 9 4 4M8 15l3-3" strokeWidth="1.8" />
          <circle cx="9" cy="9" r="1.3" fill="currentColor" stroke="none" />
        </BaseIcon>
      );
    case "a11y":
      return (
        <BaseIcon className={className}>
          <circle cx="12" cy="5.5" r="2.2" fill="currentColor" stroke="none" />
          <path d="M5 9.5h14M12 7.8V20M7.8 20l4.2-5.8 4.2 5.8M9.2 9.5 12 14l2.8-4.5" strokeWidth="1.8" />
        </BaseIcon>
      );
    case "api":
      return (
        <BaseIcon className={className}>
          <rect x="5" y="7" width="14" height="10" rx="2.5" strokeWidth="1.8" />
          <path d="M9 12h6M12 9l3 3-3 3" strokeWidth="1.8" />
        </BaseIcon>
      );
    case "node":
      return (
        <BaseIcon className={className}>
          <path d="M12 4 18 7.5v9L12 20l-6-3.5v-9L12 4Z" strokeWidth="1.8" />
          <path d="M9.3 9.1v5.8M14.7 9.1v5.8M9.3 9.1l5.4 5.8M14.7 9.1l-5.4 5.8" strokeWidth="1.5" />
        </BaseIcon>
      );
    case "sql":
      return (
        <BaseIcon className={className}>
          <ellipse cx="12" cy="7.5" rx="5.5" ry="2.5" strokeWidth="1.8" />
          <path d="M6.5 7.5v9c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-9M6.5 11.5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5" strokeWidth="1.8" />
        </BaseIcon>
      );
    default:
      return (
        <BaseIcon className={className}>
          <circle cx="12" cy="12" r="7" strokeWidth="1.8" />
        </BaseIcon>
      );
  }
}
