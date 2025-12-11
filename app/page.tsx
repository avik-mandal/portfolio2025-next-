// app/page.tsx
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import About from "./about/page";
import Skills from "./skills/page";
import Services from "./services/page";
import Projects from "./projects/page";
import { Contact } from "lucide-react";
import ContactForm from "./contact/page";

export default function Page() {
  return (
    <>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <ContactForm/>
        <Footer />
    </>
  );
}
