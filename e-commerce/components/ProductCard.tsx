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
import { toast } from "sonner";
import { ProductDetailsSheet } from "./ProductDetailsSheet";

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

      // Show success toast instead of confirmation dialog
      toast.success(`${product.title} added to your cart!`, {
        description: "View your cart to checkout.",
        action: {
          label: "View Cart",
          onClick: () => router.push("/cart"),
        },
      });
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      toast.error("Failed to add product to cart", {
        description: "Please try again later.",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Card
      className="w-full max-w-sm overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 flex flex-col h-full group pt-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-72 w-full overflow-hidden bg-white ">
        <div className="absolute top-2 right-2 z-10">
          <span className="inline-flex items-center rounded-full bg-purple-900/30 px-2.5 py-0.5 text-xs font-medium text-purple-900">
            {product.category}
          </span>
        </div>
        <Image
          src={product.image}
          alt={product.title}
          fill
          className={`object-contain p-4 transition-transform duration-500 w-full h-full ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={product.id < 4} // Prioritize first 3 images for loading
        />
      </div>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="line-clamp-1 text-lg font-poppins font-semibold tracking-tight">
          {product.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 h-10 text-sm font-inter mt-1">
          {product.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-primary dark:text-primary font-poppins">
            ${product.price.toFixed(2)}
          </div>
          <div className="flex items-center gap-1 text-sm bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">
            <span className="text-accent">★</span>
            <span className="text-gray-700 dark:text-gray-300 font-inter text-xs">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto pt-3 border-t gap-2">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="border-primary/20 dark:border-primary/20 hover:bg-primary/10 dark:hover:bg-primary/10 hover:text-primary dark:hover:text-primary font-inter text-xs"
          >
            <Link href={`/products/${product.id}`}>Details</Link>
          </Button>
          <ProductDetailsSheet product={product} />
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="bg-primary hover:bg-primary/90 dark:bg-primary dark:hover:bg-primary/90 text-white dark:text-primary-foreground font-medium"
        >
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
