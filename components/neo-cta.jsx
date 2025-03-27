"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NeoCta = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="neo-blob bg-purple-600/20 w-[600px] h-[600px] top-[-200px] right-[-200px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="neo-gradient-border neo-box-glow-strong rounded-2xl overflow-hidden">
          <div className="relative px-6 py-16 sm:px-12 lg:px-20 bg-card/40 backdrop-blur-sm">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-purple-600/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl"></div>
            
            {/* Content */}
            <div className="relative">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-4xl font-bold tracking-tight mb-6">
                  Ready to revolutionize your
                  <span className="neo-gradient-text block mt-2">financial management?</span>
                </h2>
                <p className="text-lg text-gray-500 dark:text-gray-400 mb-10">
                  Join thousands of users who are already managing their finances smarter with VVS Vault. 
                  Start with our free plan and upgrade as you grow.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link href="/dashboard">
                    <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-md neo-box-glow w-full sm:w-auto neo-shine">
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/pricing">
                    <Button variant="outline" className="px-8 py-6 text-lg rounded-md border-2 border-primary/20 hover:bg-primary/5 w-full sm:w-auto">
                      View Pricing
                    </Button>
                  </Link>
                </div>
                
                <div className="mt-8 text-center text-sm text-gray-500">
                  No credit card required. Free plan available forever.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeoCta; 