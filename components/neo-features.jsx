"use client";

import React, { useEffect } from "react";
import { 
  CreditCard, 
  BarChart3, 
  Zap, 
  Lock, 
  LineChart, 
  RefreshCw, 
  Clock, 
  Tablet 
} from "lucide-react";

const NeoFeatures = () => {
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
      <div className="neo-blob bg-blue-600/20 w-[700px] h-[700px] bottom-[-200px] right-[-300px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="animate-on-scroll text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            <span className="neo-gradient-text">Unleashing Cutting-Edge</span><br />
            Financial Intelligence
          </h2>
          <p className="max-w-3xl mx-auto text-gray-500 dark:text-gray-400 text-lg">
            Our AI-powered algorithms streamline performance, making financial analysis remarkably 
            efficient and accessible to everyone.
          </p>
        </div>

        {/* Features tag list */}
        <div className="flex flex-wrap justify-center gap-3 mb-20 animate-on-scroll">
          {[
            "Real-time Analysis", 
            "Smart Categorization", 
            "High Compatibility", 
            "Instant Insights", 
            "Multi-currency Support", 
            "ML-powered Recommendations"
          ].map((feature, i) => (
            <div 
              key={i}
              className="px-4 py-2 rounded-full bg-card/50 border border-primary/20 text-sm font-medium backdrop-blur-sm"
            >
              {feature}
            </div>
          ))}
        </div>

        {/* Multi-account feature */}
        <div className="mb-32 animate-on-scroll">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight leading-tight">
              Thousands of accounts.<br />
              <span className="neo-gradient-text-blue">Zero overhead.</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
              Use the VVS Vault API to effortlessly connect multiple accounts. Scale to hundreds of financial sources 
              without complexity. Rest easy knowing our system keeps your costs low.
            </p>
          </div>

          {/* Feature illustration */}
          <div className="neo-gradient-border neo-box-glow-strong rounded-xl overflow-hidden bg-card/30 backdrop-blur-sm max-w-4xl mx-auto">
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold mb-4">Connect Once, Access Everything</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Connect your banking, investment, credit card and loan accounts to VVS Vault and get a complete picture of your finances in one place.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <CheckIcon className="h-3 w-3 text-green-500" />
                      </div>
                      <p className="text-sm">Automatic synchronization across all devices</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <CheckIcon className="h-3 w-3 text-green-500" />
                      </div>
                      <p className="text-sm">Secure read-only connections to financial institutions</p>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <CheckIcon className="h-3 w-3 text-green-500" />
                      </div>
                      <p className="text-sm">Support for over 10,000 financial institutions</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="p-4 bg-gray-900 rounded-lg neo-box-glow">
                    <pre className="text-xs text-gray-300">
                      <code>
{`// Connect multiple accounts easily
const apiKey = "vvs_vault_api_key";
const vault = new VVSVault(apiKey);

// Connect to bank accounts
await vault.connect({
  institutions: [
    { id: "hdfc_bank", accounts: ["savings", "credit"] },
    { id: "icici_bank", accounts: ["checking"] },
    { id: "sbi", accounts: ["fd", "savings"] }
  ]
});

// Get aggregated insights across all accounts
const insights = await vault.getInsights();
console.log(insights.totalBalance); // ₹450,000
console.log(insights.topSpendingCategories);`}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature grid */}
        <div className="animate-on-scroll">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">
              <span className="neo-gradient-text">Modern features.</span><br />
              For your financial life.
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="h-6 w-6 text-primary" />}
              title="Real-time Analytics"
              description="Get instant analysis of your spending patterns, income trends, and financial health with our AI-powered dashboard."
            />
            
            <FeatureCard
              icon={<CreditCard className="h-6 w-6 text-primary" />}
              title="Multi-Account Support"
              description="Connect all your accounts in one place for a complete view of your finances, with automatic synchronization."
            />
            
            <FeatureCard
              icon={<LineChart className="h-6 w-6 text-primary" />}
              title="Predictive Budgeting"
              description="Our AI analyzes your spending history to create smart budgets that adapt to your financial habits."
            />
            
            <FeatureCard
              icon={<Lock className="h-6 w-6 text-primary" />}
              title="Bank-Level Security"
              description="Your data is protected with 256-bit encryption, multi-factor authentication, and regular security audits."
            />
            
            <FeatureCard
              icon={<Zap className="h-6 w-6 text-primary" />}
              title="Automated Categorization"
              description="Transactions are automatically categorized with AI precision, saving you hours of manual work."
            />
            
            <FeatureCard
              icon={<Tablet className="h-6 w-6 text-primary" />}
              title="Cross-Platform Access"
              description="Access your financial data anytime, anywhere with our web and mobile applications."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-card/30 backdrop-blur-sm p-8 rounded-lg neo-gradient-border neo-box-glow transition-all duration-300 hover:translate-y-[-4px]">
    <div className="flex items-center mb-4">
      <div className="p-2 bg-primary/10 rounded-lg">
        {icon}
      </div>
    </div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-500 dark:text-gray-400">{description}</p>
  </div>
);

const CheckIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
  </svg>
);

export default NeoFeatures; 