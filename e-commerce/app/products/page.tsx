import { ProductCard } from "@/components/ProductCard";
import {
  getProducts,
  getCategories,
  getProductsByCategory,
  Product,
} from "@/lib/api";
import { ProductsContent } from "../../components/ProductsContent";

// Props type with searchParams
type ProductsPageProps = {
  searchParams: { category?: string };
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  // Initialize category variable safely using Promise.resolve to handle searchParams correctly
  const resolvedParams = await Promise.resolve(searchParams);
  const category = resolvedParams?.category || "";

  // Server-side data fetching
  let products: Product[] = [];
  let categories: string[] = [];

  try {
    // Fetch all products or products by category if the category param is provided
    products = category
      ? await getProductsByCategory(category)
      : await getProducts();

    // Fetch categories for filtering
    categories = await getCategories();
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  return (
    <ProductsContent
      products={products}
      categories={categories}
      activeCategory={category}
    />
  );
}
