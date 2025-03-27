"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const NeoTestimonials = () => {
  const testimonials = [
    {
      company: "InvestSmart",
      logo: "/logos/company1.png",
      quote: "VVS Vault allows us to analyze financial data much faster than we've ever been used to",
      author: "Rajesh Sharma",
      title: "CEO and co-founder of InvestSmart",
    },
    {
      company: "FinancePro",
      logo: "/logos/company2.png",
      quote: "VVS Vault's serverless philosophy is perfectly aligned with our vision: no infrastructure to manage, no financial tools to maintain",
      author: "Ananya Patel",
      title: "Co-founder at FinancePro",
    },
    {
      company: "WealthTracker",
      logo: "/logos/company3.png",
      quote: "The killer feature that convinced us to use VVS Vault was AI categorization: it keeps our analysis velocity high",
      author: "Vikram Singh",
      title: "Co-founder and CTO, WealthTracker",
    },
    {
      company: "MoneyMinder",
      logo: "/logos/company4.png",
      quote: "We've been able to automate virtually all financial tasks via the VVS Vault API, saving us a tremendous amount of time and effort",
      author: "Priya Desai",
      title: "Senior Financial Advisor at MoneyMinder",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100");
            entry.target.classList.remove("translate-y-4", "opacity-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      el.classList.add("translate-y-4", "opacity-0", "transition-all", "duration-700");
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background blobs */}
      <div className="neo-blob bg-purple-600/20 w-[600px] h-[600px] top-[20%] left-[-300px]"></div>
      <div className="neo-blob bg-blue-600/15 w-[500px] h-[500px] top-[10%] right-[-200px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center animate-on-scroll mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Industry leaders<br/>
            <span className="neo-gradient-text">trust VVS Vault</span>
          </h2>
          <div className="mt-6">
            <Link href="/testimonials">
              <Button variant="link" className="text-primary hover:text-primary/80 group">
                Dive into success stories
                <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 animate-on-scroll">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="neo-gradient-border neo-box-glow bg-card/30 backdrop-blur-sm rounded-lg p-8 transition-all duration-300 hover:translate-y-[-4px]"
            >
              <div className="flex items-center h-8 mb-6">
                <img
                  src={testimonial.logo}
                  alt={testimonial.company}
                  className="h-full object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/200x50/6366f1/ffffff?text=${testimonial.company}`;
                  }}
                />
              </div>
              
              <blockquote className="mt-4">
                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </blockquote>
              
              <div className="mt-6 flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    {testimonial.author.charAt(0)}
                  </div>
                </div>
                <div className="ml-4">
                  <div className="text-base font-medium text-gray-900 dark:text-white">{testimonial.author}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{testimonial.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center animate-on-scroll">
          <div className="p-10 bg-card/30 backdrop-blur-sm neo-gradient-border neo-box-glow rounded-lg max-w-3xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="text-7xl mb-4 neo-gradient-text-purple font-extrabold tracking-tight">
                100%
              </div>
              <p className="text-xl mb-2 font-semibold">Focused on Security</p>
              <p className="text-gray-500 max-w-xl">
                VVS Vault employs bank-grade security measures to ensure your financial data remains safe and private at all times.
              </p>
              
              <div className="mt-8 grid grid-cols-3 gap-x-8 gap-y-2 text-sm">
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>SOC2 Certified</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>ISO 27001</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>Data Encrypted</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>CCPA Compliant</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <span>MFA Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeoTestimonials; 