import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import AgeVerification from "./components/AgeVerification";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Treehouse Marketplace",
  description: "Your trusted source for quality THC-A products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <AgeVerification />
          {children}
        </Providers>
      </body>
    </html>
  );
}
