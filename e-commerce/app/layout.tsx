import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import BackToTop from "@/components/BackToTop";
import { AuthProvider } from "@/lib/AuthContext";
import { CartProvider } from "@/lib/CartContext";
import CartButton from "@/components/CartButton";
import UserAccountNav from "@/components/UserAccountNav";
import { Toaster } from "sonner";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { ThemeProvider } from "@/providers/theme-provider";
import MobileNavigation from "./components/MobileNavigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "E-Commerce Store",
  description: "A modern e-commerce store built with Next.js and Shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur-sm">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
                  <div className="flex items-center gap-6">
                    <Link href="/" className="text-xl font-bold">
                      E-Commerce
                    </Link>
                    <nav className="hidden md:flex gap-6">
                      <Link
                        href="/"
                        className="text-sm font-medium hover:underline underline-offset-4"
                      >
                        Home
                      </Link>
                      <Link
                        href="/products"
                        className="text-sm font-medium hover:underline underline-offset-4"
                      >
                        Products
                      </Link>
                      <Link
                        href="/categories"
                        className="text-sm font-medium hover:underline underline-offset-4"
                      >
                        Categories
                      </Link>
                      <Link
                        href="/about"
                        className="text-sm font-medium hover:underline underline-offset-4"
                      >
                        About
                      </Link>
                    </nav>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <MobileNavigation />
                    <ModeToggle />
                    <Link href="/cart">
                      <Button variant="ghost" size="icon" className="relative">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="size-5"
                        >
                          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                          <path d="M3 6h18" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                        </svg>
                        <CartButton />
                      </Button>
                    </Link>
                    <UserAccountNav />
                  </div>
                </div>
              </header>
              <main>{children}</main>
              <footer className="border-t py-8 mt-12">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="font-bold text-lg mb-4">About Us</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        We offer high-quality products at competitive prices,
                        with exceptional customer service.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-4">Categories</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/products?category=electronics"
                            className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary"
                          >
                            Electronics
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products?category=jewelery"
                            className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary"
                          >
                            Jewelry
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products?category=men's clothing"
                            className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary"
                          >
                            Men's Clothing
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products?category=women's clothing"
                            className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary"
                          >
                            Women's Clothing
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                      <ul className="space-y-2">
                        <li>
                          <Link
                            href="/products"
                            className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary"
                          >
                            All Products
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/categories"
                            className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary"
                          >
                            Categories
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/cart"
                            className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary"
                          >
                            Cart
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/auth/login"
                            className="text-gray-600 dark:text-gray-400 text-sm hover:text-primary"
                          >
                            Login
                          </Link>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-4">Contact</h3>
                      <address className="not-italic text-gray-600 dark:text-gray-400 text-sm">
                        <p>123 E-Commerce St.</p>
                        <p>New York, NY 10001</p>
                        <p className="mt-2">Email: contact@ecommerce.com</p>
                        <p>Phone: (123) 456-7890</p>
                      </address>
                    </div>
                  </div>
                  <div className="border-t mt-8 pt-6 text-center text-gray-500 text-sm">
                    <p>
                      © {new Date().getFullYear()} E-Commerce Store. All rights
                      reserved.
                    </p>
                  </div>
                </div>
              </footer>
              <Toaster position="top-right" />
              <BackToTop />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
