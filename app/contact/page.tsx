"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "@/components/SectionHeading";

/* =========================
   CONFIG
========================= */

const EMAIL = "avikmandal2022@gmail.com";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE || "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE || "";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY || "";

/* =========================
   TYPES
========================= */

type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  honey: string;
};

type Toast = {
  id: number;
  type: "success" | "error";
  title: string;
  message?: string;
};

/* =========================
   COMPONENT
========================= */

export default function ContactForm() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const mountedAt = useRef<number>(Date.now());
  const toastId = useRef(0);

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    honey: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [sending, setSending] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  /* =========================
     TOAST HANDLER
  ========================= */

  const pushToast = (toast: Omit<Toast, "id">, ttl = 4500) => {
    const id = ++toastId.current;
    setToasts((t) => [{ id, ...toast }, ...t]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, ttl);
  };

  /* =========================
     VALIDATION
  ========================= */

  const validate = () => {
    const e: Partial<FormData> = {};

    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";

    if (!form.subject.trim()) e.subject = "Subject is required";
    if (!form.message.trim()) e.message = "Message is required";

    // Honeypot
    if (form.honey.trim()) e.honey = "Bot detected";

    // Time-based bot check (< 3s submit)
    if (Date.now() - mountedAt.current < 3000)
      e.honey = "Suspicious activity";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* =========================
     HANDLERS
  ========================= */

  const onChange =
    (key: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      setErrors((err) => ({ ...err, [key]: undefined }));
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !formRef.current) return;

    setSending(true);

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY
      );

      pushToast({
        type: "success",
        title: "Message sent",
        message: "Thanks! I’ll get back to you shortly.",
      });

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        honey: "",
      });
    } catch (err) {
      console.error(err);

      const fallback = `Name: ${form.name}
Email: ${form.email}
Subject: ${form.subject}

${form.message}`;

      try {
        await navigator.clipboard.writeText(fallback);
        pushToast({
          type: "error",
          title: "Email service unavailable",
          message: "Message copied to clipboard. Paste & send via email.",
        });
      } catch {
        pushToast({
          type: "error",
          title: "Sending failed",
          message: `Please email directly at ${EMAIL}`,
        });
      }
    } finally {
      setSending(false);
    }
  };

  /* =========================
     RENDER
  ========================= */

  return (
    <section
      id="contact"
      aria-label="Contact section"
      className="relative py-24 px-6"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <SectionHeading
            title="Let's"
            highlight="Connect"
            subtitle="Have a project or idea? Drop me a message."
            titleSize="md"
            highlightColor="gradient-cyan"
          />
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={onSubmit}
          noValidate
          className="p-6 md:p-10 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm"
        >
          {/* Honeypot */}
          <input
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            value={form.honey}
            onChange={onChange("honey")}
          />

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <Input
              id="name"
              label="Name"
              value={form.name}
              error={errors.name}
              onChange={onChange("name")}
            />
            <Input
              id="email"
              label="Email"
              type="email"
              value={form.email}
              error={errors.email}
              onChange={onChange("email")}
            />
          </div>

          <Input
            id="subject"
            label="Subject"
            value={form.subject}
            error={errors.subject}
            onChange={onChange("subject")}
          />

          <Textarea
            id="message"
            label="Message"
            rows={6}
            value={form.message}
            error={errors.message}
            onChange={onChange("message")}
          />

          <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
            <button
              type="submit"
              disabled={sending}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
                sending
                  ? "bg-white/10 text-gray-300 cursor-wait"
                  : "bg-gradient-to-r from-cyan-500 to-blue-500 text-black hover:from-cyan-400 hover:to-blue-400"
              }`}
              aria-disabled={sending}
            >
              {sending ? "Sending..." : "Send Message"}
              <ArrowRight className="w-4 h-4" />
            </button>

            <span className="text-sm text-gray-400">
              Or email me at{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-cyan-400 hover:underline"
              >
                {EMAIL}
              </a>
            </span>
          </div>
        </form>
      </div>

      {/* Toasts */}
      <div className="fixed right-4 bottom-6 z-[9999] flex flex-col gap-3">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`min-w-[260px] max-w-sm p-4 rounded-xl border shadow-lg backdrop-blur-sm ${
              t.type === "success"
                ? "bg-emerald-600/95 border-emerald-700 text-black"
                : "bg-rose-600/95 border-rose-700 text-white"
            }`}
          >
            <div className="flex gap-3">
              {t.type === "success" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <div className="flex-1">
                <div className="font-semibold">{t.title}</div>
                {t.message && (
                  <p className="text-xs mt-1 opacity-90">{t.message}</p>
                )}
              </div>
              <button
                onClick={() =>
                  setToasts((x) => x.filter((i) => i.id !== t.id))
                }
                aria-label="Close notification"
                className="opacity-80 hover:opacity-100"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================
   REUSABLE INPUTS
========================= */

function Input({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
}: any) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        aria-invalid={!!error}
        className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
          error ? "border-rose-500" : "border-white/10"
        } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30`}
      />
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

function Textarea({ id, label, value, onChange, error, rows }: any) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={label}
        aria-invalid={!!error}
        className={`w-full px-4 py-3 rounded-lg bg-black/50 border ${
          error ? "border-rose-500" : "border-white/10"
        } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 resize-none`}
      />
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
    </div>
  );
}
