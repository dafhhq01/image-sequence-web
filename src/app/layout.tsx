import type { Metadata } from "next";
import { Outfit } from "next/font/google"; // Import Outfit
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Matcha | Pure Focus",
  description: "Experience the ritual of pure matcha.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased bg-matcha-50 text-matcha-900">
        {children}
      </body>
    </html>
  );
}
