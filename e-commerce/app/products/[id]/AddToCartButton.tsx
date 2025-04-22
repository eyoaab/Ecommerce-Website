"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();
  const { addItem } = useCart();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    try {
      // Add the product to cart using our CartContext
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
    <Button
      className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 transition-colors duration-300 relative overflow-hidden"
      size="lg"
      onClick={handleAddToCart}
      disabled={isAddingToCart}
    >
      {isAddingToCart ? (
        <span className="flex items-center">
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Adding to Cart...
        </span>
      ) : (
        <span className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
          Add to Cart
        </span>
      )}
    </Button>
  );
}
