"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PenBox, LayoutDashboard, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Only show theme toggle when mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <header className="fixed top-0 w-full glass-effect z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Image
              src={"/logo.png"}
              alt="VVS Vault Logo"
              width={300}
              height={100}
              className="h-12 w-auto object-contain"
            />
          </Link>
          <div className="flex items-center space-x-4"></div>
        </nav>
      </header>
    );
  }

  return (
    <header className="fixed top-0 w-full glass-effect z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src={"/logo.png"}
            alt="VVS Vault Logo"
            width={300}
            height={100}
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Navigation Links - Different for signed in/out users */}
        <div className="hidden md:flex items-center space-x-8">
          <SignedOut>
            <a href="#features" className="text-foreground hover:text-primary transition-colors">
              Features
            </a>
            <a
              href="#testimonials"
              className="text-foreground hover:text-primary transition-colors"
            >
              Testimonials
            </a>
          </SignedOut>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-yellow-300" />
            ) : (
              <Moon size={18} />
            )}
          </Button>
          
          <SignedIn>
            <Link
              href="/dashboard"
              className="hover:text-primary transition-colors flex items-center gap-2"
            >
              <Button variant="outline" className="gradient-border">
                <LayoutDashboard size={18} />
                <span className="hidden md:inline ml-2">Dashboard</span>
              </Button>
            </Link>
            <a href="/transaction/create">
              <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                <PenBox size={18} />
                <span className="hidden md:inline ml-2">Add Transaction</span>
              </Button>
            </a>
          </SignedIn>
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <Button variant="outline" className="gradient-border">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
