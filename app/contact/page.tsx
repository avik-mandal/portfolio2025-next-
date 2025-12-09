// components/ContactForm.tsx
"use client";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailto = `mailto:avikmandal2022@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
    window.location.href = mailto;
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Connect</span></h2>
          <p className="text-gray-400 text-lg">Have a project in mind? Let's talk!</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" placeholder="Your Name" value={formData.name} onChange={(e)=>setFormData(fd=>({...fd,name:e.target.value}))} className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none transition-all text-white" />
              <input type="email" placeholder="Your Email" value={formData.email} onChange={(e)=>setFormData(fd=>({...fd,email:e.target.value}))} className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none transition-all text-white" />
            </div>

            <input type="text" placeholder="Subject" value={formData.subject} onChange={(e)=>setFormData(fd=>({...fd,subject:e.target.value}))} className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none transition-all text-white" />

            <textarea rows={6} placeholder="Your Message" value={formData.message} onChange={(e)=>setFormData(fd=>({...fd,message:e.target.value}))} className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-cyan-500/50 outline-none transition-all resize-none text-white"></textarea>

            <button type="submit" className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition-all font-semibold flex items-center justify-center gap-2">
              Send Message <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 text-center">
            <p className="text-gray-400 mb-4">Or email me directly at</p>
            <a href="mailto:avikmandal2022@gmail.com" className="text-cyan-400 hover:text-cyan-300">avikmandal2022@gmail.com</a>
          </div>
        </form>
      </div>
    </section>
  );
}
