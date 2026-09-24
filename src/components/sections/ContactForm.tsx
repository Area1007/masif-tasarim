"use client";

import { useState, type FormEvent } from "react";
import { ArrowIcon } from "@/components/ui/primitives";
import { whatsappLink } from "@/lib/site";

const projectTypes = ["Konut", "Kafe / Restoran", "Ofis / Ticari", "Mimari proje", "Diğer"];

const fieldClass =
  "w-full border-0 border-b border-paper/25 bg-transparent px-0 py-3 text-[15px] text-paper placeholder:text-paper/40 focus:border-oak focus:outline-none focus:ring-0";

/**
 * Teklif formu. Henüz bir e-posta/sunucu entegrasyonu olmadığı için form,
 * doldurulan bilgileri WhatsApp mesajı olarak hazırlar.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      "Merhaba, web siteniz üzerinden teklif almak istiyorum.",
      `Ad Soyad: ${data.get("name")}`,
      `Telefon: ${data.get("phone")}`,
      `Proje türü: ${data.get("type")}`,
      data.get("message") ? `Not: ${data.get("message")}` : "",
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8 sm:grid-cols-2">
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em] text-paper/50">Ad Soyad</span>
        <input name="name" required autoComplete="name" className={fieldClass} placeholder="Adınız ve soyadınız" />
      </label>
      <label className="block">
        <span className="text-[11px] uppercase tracking-[0.24em] text-paper/50">Telefon</span>
        <input
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          inputMode="tel"
          className={fieldClass}
          placeholder="05xx xxx xx xx"
        />
      </label>
      <label className="block sm:col-span-2">
        <span className="text-[11px] uppercase tracking-[0.24em] text-paper/50">Proje türü</span>
        <select name="type" required defaultValue="" className={`${fieldClass} appearance-none [&>option]:text-ink`}>
          <option value="" disabled>
            Seçiniz
          </option>
          {projectTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="text-[11px] uppercase tracking-[0.24em] text-paper/50">Projeniz hakkında</span>
        <textarea
          name="message"
          rows={4}
          className={`${fieldClass} resize-none`}
          placeholder="Mekân, metrekare, konum ve beklentileriniz..."
        />
      </label>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-paper/50" aria-live="polite">
          {sent
            ? "Mesajınız WhatsApp'ta hazırlandı. Göndermeyi tamamlamayı unutmayın."
            : "Formu gönderdiğinizde bilgileriniz WhatsApp mesajı olarak hazırlanır."}
        </p>
        <button
          type="submit"
          className="group inline-flex shrink-0 items-center justify-center gap-4 bg-paper px-8 py-4 text-[13px] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:bg-oak hover:text-paper"
        >
          Teklif İste
          <ArrowIcon className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
