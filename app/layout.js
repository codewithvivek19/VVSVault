import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VVS Vault",
  description: "One stop Finance Tracking Platforn",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-black py-12">
            <div className="container mx-auto px-4 text-center text-white">
              <p>Made with 💗 by Vivek & Vishwam & Sufiyan</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
