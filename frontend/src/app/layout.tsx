import type { Metadata } from "next";
import {
  Playfair_Display,
  Plus_Jakarta_Sans,
  Space_Grotesk,
  Cormorant_Garamond,
  Inter,
  Caveat,
} from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { AuthProvider } from "@/context/AuthContext";
import BrandedPreloader from "@/components/shared/BrandedPreloader";
import PageTransition from "@/components/shared/PageTransition";
import CartDrawer from "@/components/shared/CartDrawer";
import CustomizationModal from "@/components/shared/CustomizationModal";
import ConceptSwitcher from "@/components/shared/ConceptSwitcher";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Peachy Plate — Packaged Food & D2C Brand Ecosystem",
  description:
    "Explore 4 fully-realized packaged food brand sample designs: Maison Reserve Haute Cacao, Super Crunch Co. 90s Bodega, Pop Flavor Lab CPG, and Terra Pure Farmstead Provisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} ${spaceGrotesk.variable} ${cormorant.variable} ${caveat.variable} ${inter.variable}`}
    >
      <body className="min-h-screen bg-[#FFFDF9] text-[#121212] antialiased selection:bg-rose-200 selection:text-rose-900">
        <ToastProvider>
          <CartProvider>
            <WishlistProvider>
              <AuthProvider>
                <BrandedPreloader />
                <main className="min-h-screen">
                  <PageTransition>{children}</PageTransition>
                </main>
                <CartDrawer />
                <CustomizationModal />
                <ConceptSwitcher />
              </AuthProvider>
            </WishlistProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
