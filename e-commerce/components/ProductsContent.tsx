"use client";

import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/lib/api";
import { ProductSkeleton } from "@/components/ProductSkeleton";
import Link from "next/link";

interface ProductsContentProps {
  products: Product[];
  categories: string[];
  activeCategory: string;
}

export function ProductsContent({
  products: initialProducts,
  categories,
  activeCategory,
}: ProductsContentProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>

      <div className="mb-8 flex flex-wrap gap-2 pb-2">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-full border transition-colors ${
            !activeCategory ? "bg-primary text-white" : "hover:bg-gray-100"
          }`}
        >
          All
        </Link>
        {categories.map((categoryName) => (
          <Link
            key={categoryName}
            href={`/products?category=${categoryName}`}
            className={`px-4 py-2 rounded-full border transition-colors ${
              activeCategory === categoryName
                ? "bg-primary text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array(6)
              .fill(0)
              .map((_, index) => <ProductSkeleton key={index} />)
          : initialProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </div>
  );
}
