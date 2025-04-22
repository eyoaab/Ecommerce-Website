import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/api";

export default async function Home() {
  // Get products and categories from the API
  const products = await getProducts();
  const categories = await getCategories();

  // Get featured products (first 3)
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=2940&auto=format&fit=crop"
            alt="Hero Banner"
            fill
            priority
            className="object-cover brightness-[0.85]"
          />
        </div>
        <div className="container mx-auto relative z-10 px-4">
          <div className="max-w-xl text-white">
            <h1 className="text-5xl font-bold mb-4">
              Discover Quality Products
            </h1>
            <p className="text-xl mb-8">
              Shop the latest trends with our curated collection of premium
              items for every need.
            </p>
            <div className="flex gap-4">
              <Button size="lg" asChild>
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/20"
              >
                View Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Button variant="ghost" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Button variant="ghost" asChild>
              <Link href="/categories">View All Categories</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                href={`/products?category=${category}`}
                key={category}
                className="group relative h-60 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                {/* Find a product in this category to use its image */}
                <div className="absolute inset-0 bg-white">
                  <Image
                    src={
                      products.find((p) => p.category === category)?.image || ""
                    }
                    alt={category}
                    fill
                    className="object-contain p-4 transition-transform group-hover:scale-105 duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-end p-6">
                  <h3 className="text-xl font-bold text-white capitalize mb-2">
                    {category}
                  </h3>
                  <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    Shop Now
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
            <p className="text-lg mb-8">
              Subscribe to our newsletter for exclusive offers and the latest
              updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 border rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <h3 className="font-bold">Quality Products</h3>
              <p className="text-sm text-gray-500">Premium selection</p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="font-bold">Fast Delivery</h3>
              <p className="text-sm text-gray-500">2-3 business days</p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <h3 className="font-bold">Secure Payments</h3>
              <p className="text-sm text-gray-500">100% secure checkout</p>
            </div>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mb-3 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <h3 className="font-bold">Easy Returns</h3>
              <p className="text-sm text-gray-500">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
