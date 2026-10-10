import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { AnnouncementBar } from "@/components/navigation/AnnouncementBar";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

const serifFont = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sansFont = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://eternal6.vercel.app"),
  title: "Eternal 6 - Timeless Elegance | Premium Hijabs & Hand Art Boutique | Chittagong",
  description:
    "Discover Eternal 6: Chittagong's premier luxury hijab & mehendi hand-art boutique. Handcrafted stone-work hijabs, breathable Zafran block prints, bridal embroidery, and organic mehendi styling across Bangladesh.",
  keywords: [
    "Eternal 6",
    "Eternal 6 - Timeless Elegance",
    "Hijab shop in Chittagong",
    "Premium hijabs in Chattogram",
    "Mehendi artist in Chittagong",
    "Bridal mehendi in Chattogram",
    "Hijab and hand art Bangladesh",
    "Zafran fabric hijab",
    "Muna Jori stone work",
    "The Pearl Edit",
  ],
  authors: [{ name: "Eternal 6 - Timeless Elegance" }],
  openGraph: {
    title: "Eternal 6 - Timeless Elegance | Luxury Hijabs & Hand Art",
    description:
      "Handcrafted stone work, breathable Zafran fabrics, signature pearl edits, and bridal mehendi artistry based in Chattogram, Bangladesh.",
    url: "https://www.facebook.com/eternalsix6",
    siteName: "Eternal 6 - Timeless Elegance",
    images: [
      {
        url: "/images/logo/eternal6-logo.png",
        width: 808,
        height: 808,
        alt: "Eternal 6 - Timeless Elegance Official Emblem",
      },
    ],
    locale: "en_BD",
    type: "website",
  },
  icons: {
    icon: "/images/logo/eternal6-logo.png",
    apple: "/images/logo/eternal6-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${serifFont.variable} ${sansFont.variable} h-full antialiased`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('eternal6_theme');
                if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.classList.add('light');
                  document.documentElement.setAttribute('data-theme', 'light');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#FFF9F2] text-[#342722] dark:bg-[#120E0C] dark:text-[#FAF5EE] transition-colors duration-300 selection:bg-[#D6B878]/30 selection:text-[#342722] dark:selection:text-white">
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <AnnouncementBar />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <FloatingWhatsApp />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
