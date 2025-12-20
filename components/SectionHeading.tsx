import React from "react";

interface SectionHeadingProps {
  title: string;
  highlight: string;
  subtitle?: string;
  headingLevel?: "h1" | "h2";
  highlightColor?: "cyan" | "purple" | "pink" | "gradient-cyan" | "gradient-pink" | "gradient-orange";
  titleSize?: "sm" | "md" | "lg";
  subtitleSize?: "sm" | "base" | "lg";
}

export default function SectionHeading({
  title,
  highlight,
  subtitle,
  headingLevel = "h2",
  highlightColor = "cyan",
  titleSize = "lg",
  subtitleSize = "lg",
}: SectionHeadingProps) {
  const HeadingTag = headingLevel;

  const sizeClasses = {
    sm: "text-3xl md:text-4xl",
    md: "text-3xl md:text-4xl",
    lg: "text-4xl md:text-6xl",
  };

  const subtitleClasses = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
  };

  // Color mapping for highlight
  const colorClasses: Record<string, string> = {
    cyan: "text-cyan-400",
    purple: "text-purple-400",
    pink: "text-pink-400",
    "gradient-cyan": "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent",
    "gradient-pink": "bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent",
    "gradient-orange": "bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent",
  };

  return (
    <div className="text-center space-y-4">
      <HeadingTag className={`${sizeClasses[titleSize]} font-extrabold text-white`}>
        {title}{" "}
        <span className={colorClasses[highlightColor]}>
          {highlight}
        </span>
      </HeadingTag>
      {subtitle && (
        <p className={`text-gray-400 max-w-2xl mx-auto ${subtitleClasses[subtitleSize]}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
