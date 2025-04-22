"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/lib/api";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    try {
      // Add the product to cart using CartContext
      await addItem(product, 1);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Show success message or redirect to cart
      const goToCart = window.confirm(
        `${product.title} added to your cart! View cart now?`
      );

      if (goToCart) {
        router.push("/cart");
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Card
      className="w-full max-w-sm overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-60 w-full overflow-hidden bg-white">
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {product.category}
          </span>
        </div>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`object-contain p-4 transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1 text-lg">{product.title}</CardTitle>
        <CardDescription className="line-clamp-2 h-10 text-sm">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-700">
            ${product.price.toFixed(2)}
          </div>
          <div className="flex items-center gap-1 text-sm bg-amber-50 px-2 py-0.5 rounded">
            <span className="text-amber-500">★</span>
            <span className="text-gray-700">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto pt-2 border-t">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          <Link href={`/products/${product.id}`}>View Details</Link>
        </Button>
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
