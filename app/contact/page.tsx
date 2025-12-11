// components/ContactForm.tsx
"use client";
import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import emailjs from "@emailjs/browser";

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  honey: string;
};

type Toast = { id: number; type: "success" | "error"; title: string; message?: string };

const EMAIL = "avikmandal2022@gmail.com";

// These env vars should be set in your .env (or replace with strings)
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE ?? "your_service_id";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE ?? "your_template_id";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY ?? "your_public_key";

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", subject: "", message: "", honey: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSending, setIsSending] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  const pushToast = (t: Omit<Toast, "id">, ttl = 4500) => {
    const id = ++toastId.current;
    const newToast: Toast = { id, ...t };
    setToasts((s) => [newToast, ...s]);
    setTimeout(() => setToasts((s) => s.filter((x) => x.id !== id)), ttl);
  };

  const validate = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) e.name = "Please enter your name.";
    if (!formData.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Please enter a valid email.";
    if (!formData.subject.trim()) e.subject = "Please add a subject.";
    if (!formData.message.trim()) e.message = "Please write a message.";
    if (formData.honey.trim()) e.honey = "Bot detected.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((f) => ({ ...f, [k]: e.target.value }));
    setErrors((prev) => ({ ...prev, [k]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (!formRef.current) return;

    setIsSending(true);

    try {
      // Attempt EmailJS send
      const res = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      // res.status usually 200 on success
      pushToast({ type: "success", title: "Message sent", message: "Thanks — I got your message!" });
      setFormData({ name: "", email: "", subject: "", message: "", honey: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      // fallback: copy to clipboard & mailto as UX fallback
      const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
      try {
        await navigator.clipboard.writeText(body);
        pushToast({
          type: "error",
          title: "Could not send via EmailJS",
          message: "Message copied to clipboard. Paste into your email client to send.",
        });
      } catch {
        pushToast({
          type: "error",
          title: "Sending failed",
          message: "Please email directly to " + EMAIL,
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2">
            Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Connect</span>
          </h2>
          <p className="text-gray-400">Have a project in mind? Let's talk!</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm" noValidate>
          {/* honeypot */}
          <label className="sr-only" htmlFor="website">Leave blank</label>
          <input id="website" name="website" value={formData.honey} onChange={(e)=>setFormData(f=>({...f,honey:e.target.value}))} autoComplete="off" tabIndex={-1} className="hidden" />

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="name" className="sr-only">Your name</label>
              <input id="name" name="name" type="text" placeholder="Your name" value={formData.name} onChange={handleChange("name")}
                className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${errors.name ? "border-rose-500" : "border-white/10"} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30`}
                aria-invalid={!!errors.name} aria-describedby={errors.name ? "err-name" : undefined}
              />
              {errors.name && <p id="err-name" className="mt-1 text-xs text-rose-400">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Your email</label>
              <input id="email" name="email" type="email" placeholder="Your email" value={formData.email} onChange={handleChange("email")}
                className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${errors.email ? "border-rose-500" : "border-white/10"} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30`}
                aria-invalid={!!errors.email} aria-describedby={errors.email ? "err-email" : undefined}
              />
              {errors.email && <p id="err-email" className="mt-1 text-xs text-rose-400">{errors.email}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="subject" className="sr-only">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="Subject" value={formData.subject} onChange={handleChange("subject")}
              className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${errors.subject ? "border-rose-500" : "border-white/10"} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30`}
              aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "err-subject" : undefined}
            />
            {errors.subject && <p id="err-subject" className="mt-1 text-xs text-rose-400">{errors.subject}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="sr-only">Message</label>
            <textarea id="message" name="message" rows={6} placeholder="Your message" value={formData.message} onChange={handleChange("message")}
              className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${errors.message ? "border-rose-500" : "border-white/10"} text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none`}
              aria-invalid={!!errors.message} aria-describedby={errors.message ? "err-message" : undefined}
            />
            {errors.message && <p id="err-message" className="mt-1 text-xs text-rose-400">{errors.message}</p>}
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <button type="submit" disabled={isSending}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${isSending ? "bg-white/6 text-gray-300 cursor-wait" : "bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:from-cyan-400 hover:to-blue-400"}`}
              aria-disabled={isSending}
            >
              {isSending ? "Sending..." : <>Send Message <ArrowRight className="w-4 h-4" /></>}
            </button>

            <div className="text-sm text-gray-400">
              Or email me at <a className="text-cyan-400" href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </div>
          </div>
        </form>
      </div>

      {/* Toast stack */}
      <div className="fixed right-4 bottom-6 z-[9999] flex flex-col gap-3">
        {toasts.map((t) => (
          <div key={t.id} className={`min-w-[260px] max-w-sm rounded-lg p-3 shadow-lg border ${t.type === "success" ? "bg-emerald-600/95 border-emerald-700 text-black" : "bg-rose-600/95 border-rose-700 text-white"} transform transition-all duration-200`}>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="font-semibold">{t.title}</div>
                {t.message && <div className="text-xs mt-1 opacity-90">{t.message}</div>}
              </div>
              <button onClick={() => setToasts((s) => s.filter((x) => x.id !== t.id))} aria-label="Close toast" className="opacity-80 hover:opacity-100">✕</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
