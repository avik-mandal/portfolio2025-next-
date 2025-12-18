// app/page.tsx
import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "./about/page";
import Skills from "./skills/page";
import Services from "./services/page";
import Projects from "./projects/page";
import { Contact } from "lucide-react";
import ContactForm from "./contact/page";
import ResumePage from "./resume/page";

export default function Page() {
  return (
    <>
        <Hero />
        <Header/>
        <About />
        <Skills />
        <Projects />
        <Services />
        <ResumePage/>
        <ContactForm/>
    </>
  );
}
