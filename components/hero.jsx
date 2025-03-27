"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="pt-40 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80 z-[-1]"></div>
      
      {/* Gradient circles */}
      <div className="absolute top-20 left-[10%] w-[400px] h-[400px] rounded-full bg-primary/20 filter blur-[80px] z-[-1]"></div>
      <div className="absolute bottom-10 right-[5%] w-[300px] h-[300px] rounded-full bg-indigo-600/10 filter blur-[80px] z-[-1]"></div>
      <div className="absolute top-60 right-[20%] w-[350px] h-[350px] rounded-full bg-purple-500/10 filter blur-[80px] z-[-1]"></div>
      
      <div className="container mx-auto text-center relative z-0">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Finances <br /> with VVS Vault
        </h1>
        <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
          An AI-powered financial management platform that helps you track,
          analyze, and optimize your spending with real-time insights.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button size="lg" className="px-8 bg-primary hover:bg-primary/90 rounded-lg">
              Get Started
            </Button>
          </Link>
          <Link href="">
            <Button size="lg" variant="outline" className="px-8 gradient-border rounded-lg">
              Watch Demo
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-12">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.png"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-xl shadow-2xl border-border border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
