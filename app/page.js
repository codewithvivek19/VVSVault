import React from "react";
import NeoHero from "@/components/neo-hero";
import NeoFeatures from "@/components/neo-features";
import NeoTestimonials from "@/components/neo-testimonials";
import NeoCta from "@/components/neo-cta";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <NeoHero />
      
      {/* Features Section */}
      <NeoFeatures />
      
      {/* Testimonials Section */}
      <NeoTestimonials />
      
      {/* CTA Section */}
      <NeoCta />
    </div>
  );
}
