import { getCategories, getProducts, Product } from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

async function getCategoryImages() {
  // Fetch all products to get images for each category
  const products = await getProducts();

  // Create a map of category -> product image
  const categoryImages: Record<string, Product> = {};

  // Find a representative product for each category
  products.forEach((product) => {
    // Only set if we don't already have an image for this category
    // or if the current product has a higher rating
    if (
      !categoryImages[product.category] ||
      product.rating.rate > categoryImages[product.category].rating.rate
    ) {
      categoryImages[product.category] = product;
    }
  });

  return categoryImages;
}

export default async function CategoriesPage() {
  // Fetch all available categories
  const categories = await getCategories();

  // Get a featured product image for each category
  const categoryImages = await getCategoryImages();

  // Category descriptions (static for demo)
  const categoryDescriptions: Record<string, string> = {
    electronics:
      "Discover cutting-edge gadgets and devices designed to enhance your life.",
    jewelery:
      "Explore stunning accessories crafted with precision and elegance.",
    "men's clothing":
      "Find premium menswear with timeless style and exceptional quality.",
    "women's clothing": "Browse stylish apparel designed for the modern woman.",
  };

  // Category icons (static for demo)
  const categoryIcons: Record<string, React.ReactNode> = {
    electronics: (
      <svg
        className="h-12 w-12 text-blue-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    jewelery: (
      <svg
        className="h-12 w-12 text-purple-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
    "men's clothing": (
      <svg
        className="h-12 w-12 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    "women's clothing": (
      <svg
        className="h-12 w-12 text-pink-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  };

  return (
    <div className="container mx-auto py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our diverse range of product categories, each offering
          high-quality items selected for our discerning customers.
        </p>
      </div>

      {/* Featured Categories with Icons */}
      <div className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const formattedCategory =
              category.charAt(0).toUpperCase() + category.slice(1);

            return (
              <Link
                key={`icon-${category}`}
                href={`/products?category=${category}`}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 text-center flex flex-col items-center hover:border-blue-200 border border-transparent"
              >
                <div className="bg-gray-50 rounded-full p-4 mb-4">
                  {categoryIcons[category]}
                </div>
                <h3 className="font-bold mb-2">{formattedCategory}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {categoryDescriptions[category]?.split(".")[0]}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((category) => {
          const featuredProduct = categoryImages[category];
          const formattedCategory =
            category.charAt(0).toUpperCase() + category.slice(1);

          return (
            <Link
              key={category}
              href={`/products?category=${category}`}
              className="group block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-2/5 relative aspect-square bg-gray-50">
                  {featuredProduct && (
                    <Image
                      src={featuredProduct.image}
                      alt={category}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="p-6 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium mb-3">
                      {formattedCategory}
                    </span>
                    <p className="text-gray-600 mb-4">
                      {categoryDescriptions[category] ||
                        `Explore our collection of ${category} products.`}
                    </p>
                  </div>

                  <div className="mt-2 flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                    <span>Browse products</span>
                    <svg
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </div>

                  {featuredProduct && (
                    <div className="mt-4 text-sm text-gray-500">
                      <span className="flex items-center">
                        <svg
                          className="w-4 h-4 text-yellow-500 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {featuredProduct.rating.rate} •{" "}
                        {featuredProduct.rating.count} reviews
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">
          Can't find what you're looking for?
        </h2>
        <p className="mb-6 max-w-xl mx-auto">
          Browse our complete collection of products or contact our customer
          service team for assistance.
        </p>
        <Link
          href="/products"
          className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}
