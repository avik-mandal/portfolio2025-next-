// app/page.tsx
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Projects from "../components/Projects";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import About from "./about/page";
import Skills from "./skills/page";
import Services from "./services/page";

export default function Page() {
  return (
    <>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <ContactForm />
    </>
  );
}
