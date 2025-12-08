// src/app/contact/page.tsx
"use client";


export default function ContactPage() {
  return (
    <>

      <main className="min-h-screen bg-black text-white pt-24">
        <section className="max-w-[800px] mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-4">Contact</h2>
          <p className="text-white/70 mb-6">Want to work together? Send a message or email me directly.</p>

          <form
            action="mailto:avikmandal2022@gmail.com"
            method="post"
            encType="text/plain"
            className="grid gap-3"
          >
            <input name="name" placeholder="Your name" className="rounded-md p-3 bg-white/3 border border-white/6" />
            <input name="email" placeholder="Your email" className="rounded-md p-3 bg-white/3 border border-white/6" />
            <textarea name="message" placeholder="Message" rows={6} className="rounded-md p-3 bg-white/3 border border-white/6" />
            <button type="submit" className="mt-2 px-6 py-3 rounded-md bg-gradient-to-r from-sky-600 to-cyan-400 text-white font-semibold">
              Send
            </button>
          </form>

          <div className="mt-8 text-sm text-white/60">
            Or email directly: <a className="text-sky-400" href="mailto:avikmandal2022@gmail.com">avikmandal2022@gmail.com</a>
          </div>
        </section>
      </main>

    </>
  );
}
