export default function SchemaPerson() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Avik Mandal",
    url: "https://avikmandal.vercel.app",
    image: "https://avikmandal.vercel.app/avatar.png",
    email: "mailto:avikmandal.901@gmail.com",
    telephone: "+91-8926194726",
    jobTitle: "Frontend Web Developer",
    worksFor: {
      "@type": "Organization",
      name: "Maity Innovations Private Limited",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Dr. B. C. Roy Engineering College, Durgapur",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kharagpur",
      addressRegion: "West Bengal",
      addressCountry: "India",
    },
    sameAs: [
      "https://github.com/avik-mandal",
      "https://www.linkedin.com/in/avik-mandal",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "PostgreSQL",
      "Docker",
      "Web Development",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
