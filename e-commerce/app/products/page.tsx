import { ProductCard } from "@/components/ProductCard";
import { getProducts, getCategories, getProductsByCategory } from "@/lib/api";
import { Suspense } from "react";

// Props type with searchParams
type ProductsPageProps = {
  searchParams: { category?: string };
};

// Handle searchParams properly
export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // Initialize category variable safely
  const category = searchParams?.category || "";

  // Fetch all products or products by category if the category param is provided
  const products = category
    ? await getProductsByCategory(category)
    : await getProducts();

  // Fetch categories for filtering
  const categories = await getCategories();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>

      <div className="mb-8 flex flex-wrap gap-2 pb-2">
        <a
          href="/products"
          className={`px-4 py-2 rounded-full border transition-colors ${
            !category ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          All
        </a>
        {categories.map((categoryName) => (
          <a
            key={categoryName}
            href={`/products?category=${categoryName}`}
            className={`px-4 py-2 rounded-full border transition-colors ${
              category === categoryName
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </a>
        ))}
      </div>

      <Suspense fallback={<div>Loading products...</div>}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
