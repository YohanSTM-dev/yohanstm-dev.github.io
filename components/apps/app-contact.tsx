"use client";

import { ChangeEvent, FormEvent, useState } from "react";

import { GithubIcon, LinkedInIcon } from "@/components/icons";
import { socialLinks } from "@/lib/macos-data";

type ContactForm = {
  name: string;
  email: string;
  message: string;
};

const initialForm: ContactForm = {
  name: "",
  email: "",
  message: ""
};

export function AppContact() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [feedback, setFeedback] = useState("Prêt à échanger sur un projet ambitieux.");

  const handleChange =
    (field: keyof ContactForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({
        ...current,
        [field]: event.target.value
      }));
    };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setFeedback("Merci de compléter les trois champs avant l’envoi.");
      return;
    }

    setFeedback("Votre client mail va s’ouvrir avec le message prérempli.");
    const subject = encodeURIComponent(`Portfolio MacOS - ${form.name}`);
    const body = encodeURIComponent(
      `Nom : ${form.name}\nEmail : ${form.email}\n\nMessage :\n${form.message}`
    );
    window.location.href = `mailto:yohan.saint-marc@hotmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="grid h-[70vh] grid-cols-[1.1fr_1fr] gap-4 p-5 max-lg:h-auto max-lg:grid-cols-1">
      <article className="rounded-[1.7rem] border border-white/10 bg-white/10 p-6">
        <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Disponibilité</p>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-white/95">
          Ouvert aux missions, à l’alternance et aux collaborations orientées produit.
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
          Je privilégie les projets où l’interface, la sensation de qualité et la lisibilité sont
          traitées comme de vraies priorités de produit.
        </p>

        <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-emerald-400/10 px-4 py-2 text-sm text-white/90">
          <span className="h-2.5 w-2.5 animate-status-pulse rounded-full bg-emerald-300" />
          Open to work
        </div>
      </article>

      <article className="row-span-2 rounded-[1.7rem] border border-white/12 bg-[#0d0f14] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.4)] max-lg:row-auto">
        <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Message</p>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <label className="block text-xs uppercase tracking-[0.2em] text-white/45">
            Nom
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="Votre nom"
              className="mt-2 w-full rounded-2xl border border-white/16 bg-[#13161f] px-4 py-3 text-sm text-white placeholder:text-white/28 outline-none transition focus:border-cyan-200/50 focus:bg-[#161924]"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.2em] text-white/45">
            Email
            <input
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="votre@email.com"
              className="mt-2 w-full rounded-2xl border border-white/16 bg-[#13161f] px-4 py-3 text-sm text-white placeholder:text-white/28 outline-none transition focus:border-cyan-200/50 focus:bg-[#161924]"
            />
          </label>
          <label className="block text-xs uppercase tracking-[0.2em] text-white/45">
            Message
            <textarea
              rows={6}
              value={form.message}
              onChange={handleChange("message")}
              placeholder="Décrivez votre besoin..."
              className="mt-2 w-full rounded-2xl border border-white/16 bg-[#13161f] px-4 py-3 text-sm text-white placeholder:text-white/28 outline-none transition focus:border-cyan-200/50 focus:bg-[#161924]"
            />
          </label>
          <button
            type="submit"
          className="inline-flex min-h-11 items-center justify-center rounded-2xl bg-[linear-gradient(90deg,#22d3ee_0%,#818cf8_50%,#38bdf8_100%)] px-6 text-sm font-semibold text-white shadow-[0_6px_24px_rgba(34,211,238,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(34,211,238,0.35)]"
          >
            Préparer le message
          </button>
          <p className="min-h-5 text-sm text-white/65">{feedback}</p>
        </form>
      </article>

      <article className="rounded-[1.7rem] border border-white/12 bg-[#0d0f14] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.4)]">
        <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">Réseaux</p>
        <div className="mt-4 flex items-center gap-3">
          {socialLinks.map((social) => {
            const Icon = social.id === "github" ? GithubIcon : LinkedInIcon;

            return (
              <a
                key={social.id}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/14 bg-[#13161f] text-white/80 transition hover:-translate-y-1 hover:border-white/28 hover:bg-[#1a1d28] hover:text-white"
                aria-label={social.label}
              >
                <Icon className="h-5 w-5" />
                <span className="pointer-events-none absolute -top-10 rounded-lg bg-black/85 px-2 py-1 text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>

        <p className="mt-6 text-sm leading-7 text-white/65">
          Ou directement par email à{" "}
          <a className="font-semibold text-white/95" href="mailto:yohan.saint-marc@hotmail.com">
            yohan.saint-marc@hotmail.com
          </a>
        </p>
      </article>
    </div>
  );
}
