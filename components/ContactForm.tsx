'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // For frontend-only build, we won't send to server. Just simulate success.
    await new Promise(r => setTimeout(r, 700));
    setSent(true);
    (e.currentTarget as HTMLFormElement).reset();
    setLoading(false);
  }

  return (
    <section id="contact" className="py-12">
      <h2 className="text-2xl font-bold">Contact</h2>
      <form onSubmit={handleSubmit} className="mt-6 grid gap-3 max-w-xl">
        <input name="name" required placeholder="Your name" className="p-2 border rounded" />
        <input name="email" required type="email" placeholder="Email" className="p-2 border rounded" />
        <textarea name="message" required placeholder="Message" className="p-2 border rounded h-32" />
        <div>
          <button type="submit" className="px-4 py-2 rounded bg-sky-500 text-white" disabled={loading}>
            {loading ? 'Sending...' : 'Send message'}
          </button>
          {sent && <span className="ml-3 text-green-600">Message recorded locally — thank you!</span>}
          {error && <div className="mt-2 text-red-600">{error}</div>}
        </div>
      </form>
    </section>
  );
}
