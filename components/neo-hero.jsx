"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Code, Zap, Database, CheckCircle, ShieldCheck, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import dynamic from 'next/dynamic';

// Dynamically import CustomSpline to avoid SSR issues
const CustomSpline = dynamic(() => import('./custom-spline'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
});

const NeoHero = () => {
  const codeBlockRef = useRef(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  
  // Data for trusted logos
  const trustedLogos = [
    { name: "HDFC Bank", src: "https://1000logos.net/wp-content/uploads/2021/06/HDFC-Bank-logo.png" },
    { name: "Kotak Bank", src: "https://1000logos.net/wp-content/uploads/2021/12/Kotak-Mahindra-Bank-Logo.png" },
    { name: "State Bank of India", src: "https://1000logos.net/wp-content/uploads/2018/03/SBI-Logo.png" },
    { name: "PayTM", src: "https://1000logos.net/wp-content/uploads/2021/03/Paytm-logo.png" },
    { name: "Axis Bank", src: "https://1000logos.net/wp-content/uploads/2021/05/Axis-Bank-logo.png" },
  ];

  // Floating text data for the AI globe
  const floatingFeatures = [
    { text: "RELIABLE", position: "top-[10%] left-[5%]" },
    { text: "SCALABILITY", position: "top-[15%] right-[8%]" },
    { text: "HIGH COMPATIBILITY", position: "top-[40%] left-[3%]" },
    { text: "BLAZINGLY FAST SEARCH", position: "top-[35%] right-[2%]" },
    { text: "REAL-TIME ANALYSIS", position: "bottom-[25%] left-[5%]" },
    { text: "BANK-LEVEL SECURITY", position: "bottom-[15%] right-[5%]" },
  ];

  // Function to handle when Spline has loaded
  const onSplineLoad = () => {
    setSplineLoaded(true);
  };

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
    <div className="relative overflow-hidden pt-24 md:pt-28 lg:pt-32 pb-16 lg:pb-32">
      {/* Background blobs/gradients */}
      <div className="neo-blob bg-purple-600/30 w-[800px] h-[800px] top-[-400px] right-[-300px]"></div>
      <div className="neo-blob bg-indigo-600/20 w-[600px] h-[600px] top-[20%] left-[-200px]"></div>
      <div className="neo-blob bg-blue-400/20 w-[500px] h-[500px] bottom-[-200px] right-[10%]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center lg:gap-8">
          <div className="w-full lg:w-1/2 text-center lg:text-left animate-on-scroll">
            <p className="text-base font-semibold text-primary mb-3">FINANCIAL MANAGEMENT REIMAGINED</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 neo-gradient-text">
              Serverless Finance<br />Built for Everyone
            </h1>
            <p className="mt-6 max-w-2xl mx-auto lg:mx-0 text-xl text-gray-500 dark:text-gray-400">
              VVS Vault delivers lightning-fast financial insights with modern technology.
              No complexity, just simplicity.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/dashboard">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-md neo-box-glow">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="px-8 py-6 text-lg rounded-md border-2 border-primary/20 hover:bg-primary/5">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Spline 3D Model with Floating Text */}
          <div className="w-full lg:w-1/2 mt-20 lg:mt-0 animate-on-scroll">
            <div className="relative w-full aspect-square max-w-md mx-auto transform scale-125 lg:translate-x-4">
              {/* Background glow effect for better blending */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 via-indigo-500/20 to-blue-400/30 filter blur-3xl opacity-80 scale-150"></div>
              
              {/* Additional background shimmer */}
              <div className="absolute inset-0 bg-shimmer mix-blend-lighten opacity-60"></div>
              
              {/* Gradient animated border */}
              <div className="absolute inset-0 neo-video-gradient-border"></div>
              
              {/* Spline 3D model - direct without container */}
              <CustomSpline
                scene="https://prod.spline.design/zO7ivC99pdAiGZbU/scene.splinecode"
                onLoad={onSplineLoad}
                className="w-full h-full absolute inset-0 z-10"
                style={{ pointerEvents: 'auto' }}
              />
              
              {/* Floating text elements around the 3D model */}
              {floatingFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`absolute ${feature.position} whitespace-nowrap text-xs md:text-sm font-bold text-white/90 tracking-wider z-20 transform transition-all duration-1000 hover:text-white hover:scale-110 text-float`}
                  style={{
                    textShadow: '0 0 10px rgba(99, 102, 241, 0.8), 0 0 20px rgba(99, 102, 241, 0.4)',
                    animationDelay: `${index * 0.5}s`,
                    backdropFilter: 'blur(2px)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    background: 'rgba(99, 102, 241, 0.15)'
                  }}
                >
                  {feature.text}
                </div>
              ))}
              
              {/* Additional radial elements and particles */}
              <div className="absolute inset-0 pointer-events-none z-15">
                {/* Center pulse dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full centre-pulse shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                
                {/* Connecting lines (these will be static but give the impression of connectivity) */}
                <svg className="absolute inset-0 w-full h-full mix-blend-lighten" xmlns="http://www.w3.org/2000/svg">
                  <line x1="50%" y1="50%" x2="5%" y2="10%" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="0.5" className="network-pulse" />
                  <line x1="50%" y1="50%" x2="95%" y2="15%" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="0.5" className="network-pulse" style={{animationDelay: '0.5s'}} />
                  <line x1="50%" y1="50%" x2="3%" y2="40%" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="0.5" className="network-pulse" style={{animationDelay: '1s'}} />
                  <line x1="50%" y1="50%" x2="97%" y2="35%" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="0.5" className="network-pulse" style={{animationDelay: '1.5s'}} />
                  <line x1="50%" y1="50%" x2="5%" y2="75%" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="0.5" className="network-pulse" style={{animationDelay: '2s'}} />
                  <line x1="50%" y1="50%" x2="95%" y2="85%" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="0.5" className="network-pulse" style={{animationDelay: '2.5s'}} />
                </svg>
              </div>
              
              {/* Background ambient glow */}
              <div className="absolute inset-0 bg-gradient-radial from-indigo-500/5 to-transparent opacity-70 mix-blend-screen"></div>
            </div>
          </div>
        </div>

        {/* Provisioning time section */}
        <div className="mt-24 animate-on-scroll">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold tracking-tight">
              Instant Financial <span className="neo-gradient-text-purple">Insights</span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              No waiting. No complexity.
            </p>
          </div>
          
          <div className="relative neo-gradient-border neo-box-glow mx-auto max-w-3xl overflow-hidden rounded-lg bg-card/30 backdrop-blur-sm">
            <div className="px-6 py-10 sm:px-10">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
                <div className="ml-4">
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    Analyzed in <span className="text-primary font-bold">300ms</span>
                  </p>
                  <p className="text-base text-gray-500 dark:text-gray-400">
                    Get actionable insights about your finances almost instantly
                  </p>
                </div>
              </div>
              
              <div className="mt-8 overflow-hidden">
                <div ref={codeBlockRef} className="neo-code-block">
                  <pre className="overflow-x-auto text-sm">
                    <code>
                      <span className="text-blue-400">const</span> <span className="text-green-400">vvs</span> <span className="text-blue-400">=</span> <span className="text-yellow-400">createFinancialAccount</span>&#40;<span className="text-purple-400">&apos;user@example.com&apos;</span>&#41;;<br/><br/>
                      <span className="text-green-400">vvs</span>.<span className="text-yellow-400">connect</span>&#40;&#41;.<span className="text-yellow-400">then</span>&#40;<span className="text-orange-400">account</span> <span className="text-blue-400">={">"}</span> &#123;<br/>
                      {'  '}<span className="text-red-400">{'// Get real-time financial insights'}</span><br/>
                      {'  '}<span className="text-blue-400">const</span> <span className="text-green-400">insights</span> <span className="text-blue-400">=</span> <span className="text-blue-400">await</span> <span className="text-orange-400">account</span>.<span className="text-yellow-400">getInsights</span>&#40;&#41;;<br/>
                      {'  '}<span className="text-blue-400">const</span> <span className="text-green-400">recommendations</span> <span className="text-blue-400">=</span> <span className="text-blue-400">await</span> <span className="text-orange-400">account</span>.<span className="text-yellow-400">getRecommendations</span>&#40;&#41;;<br/>
                      &#125;&#41;;
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Integrations/stack section */}
        <div className="mt-32 animate-on-scroll">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Works with <span className="neo-gradient-text-blue">your accounts</span>
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Integrate with all major banks and financial institutions within minutes and unlock a simpler financial management workflow.
            </p>
          </div>
          
          <div className="relative py-10">
            {/* Light gradient behind logos */}
            <div className="absolute inset-0 bg-gradient-radial from-indigo-500/5 via-transparent to-transparent opacity-70"></div>
            
            <div className="grid grid-cols-3 md:grid-cols-5 gap-8 justify-items-center items-center mx-auto max-w-4xl">
              {trustedLogos.map((logo, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-center grayscale hover:grayscale-0 opacity-80 hover:opacity-100 transition-all duration-300 transform hover:scale-110"
                >
                  <img 
                    src={logo.src} 
                    alt={logo.name} 
                    className="h-10 md:h-12 w-auto object-contain"
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/200x80/6366f1/ffffff?text=${encodeURIComponent(logo.name)}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Features section */}
        <div className="mt-32 animate-on-scroll">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="neo-gradient-text">Better finance.</span><br />
              For modern life.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-lg neo-gradient-border neo-box-glow">
              <div className="flex items-center mb-4">
                <Zap className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Boost your savings</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                AI-powered insights help identify saving opportunities that scale automatically with your spending.
              </p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-lg neo-gradient-border neo-box-glow">
              <div className="flex items-center mb-4">
                <Database className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">Instant categorization</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Your transactions are automatically categorized with AI precision for easier tracking and analysis.
              </p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm p-8 rounded-lg neo-gradient-border neo-box-glow">
              <div className="flex items-center mb-4">
                <Code className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">API-first design</h3>
              </div>
              <p className="text-gray-500 dark:text-gray-400">
                Connect your financial data to any platform or service with our secure and flexible API.
              </p>
            </div>
          </div>
        </div>
        
        {/* Trusted by section */}
        <div className="mt-32 text-center animate-on-scroll">
          <h2 className="text-3xl font-bold mb-16">
            Trusted by thousands of users across India
          </h2>
          
          <div className="grid md:grid-cols-3 gap-x-12 gap-y-16">
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-2 neo-gradient-text-purple">4.9/5</div>
              <p className="text-gray-500">User Rating</p>
              <div className="flex mt-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-2 neo-gradient-text-blue">₹2B+</div>
              <p className="text-gray-500">Transactions Tracked</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="text-5xl font-bold mb-2 neo-gradient-text">99.9%</div>
              <p className="text-gray-500">Uptime</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeoHero; 