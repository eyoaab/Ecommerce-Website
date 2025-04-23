"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Product } from "@/lib/api";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductDetailsSheetProps {
  product: Product;
}

export function ProductDetailsSheet({ product }: ProductDetailsSheetProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);

    try {
      await addItem(product, quantity);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      toast.success(`${product.title} added to your cart!`, {
        description: `Added ${quantity} ${
          quantity === 1 ? "item" : "items"
        } to cart.`,
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
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-primary/20 hover:bg-primary/10 hover:text-primary dark:border-primary/20 dark:hover:bg-primary/10 dark:hover:text-primary font-inter text-xs w-full sm:w-auto"
        >
          Quick View
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="overflow-y-auto w-full sm:max-w-md md:max-w-lg"
      >
        <SheetHeader className="space-y-1 pb-2">
          <SheetTitle className="text-lg sm:text-xl font-poppins font-bold tracking-tight line-clamp-2">
            {product.title}
          </SheetTitle>
          <SheetDescription className="text-xs sm:text-sm text-muted-foreground font-inter">
            Category: <span className="capitalize">{product.category}</span>
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="relative aspect-square w-full max-w-xs mx-auto mb-6 bg-white rounded-lg overflow-hidden border border-muted">
            <Image
              src={
                imageError
                  ? "https://placehold.co/400x400?text=Product+Image"
                  : product.image
              }
              alt={product.title}
              fill
              className="object-contain p-4 hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 90vw, (max-width: 768px) 50vw, 400px"
              priority
              onError={() => setImageError(true)}
            />
          </div>

          <div className="flex justify-between items-center mb-4">
            <div className="text-xl sm:text-2xl font-bold text-primary dark:text-primary font-poppins">
              ${product.price.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded text-sm">
              <span className="text-amber-500">★</span>
              <span className="text-gray-700 dark:text-gray-300 font-inter text-xs">
                {product.rating.rate} ({product.rating.count})
              </span>
            </div>
          </div>

          <div className="mb-6 space-y-2">
            <h3 className="text-sm font-poppins font-medium">Description</h3>
            <p className="text-xs sm:text-sm text-muted-foreground font-inter leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-poppins font-medium mb-2">Quantity</h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="h-8 w-8 border-primary/20 hover:bg-primary/10 dark:border-primary/20 dark:hover:bg-primary/10 font-medium"
              >
                -
              </Button>
              <span className="w-8 text-center font-inter font-medium">
                {quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="h-8 w-8 border-primary/20 hover:bg-primary/10 dark:border-primary/20 dark:hover:bg-primary/10 font-medium"
              >
                +
              </Button>
            </div>
          </div>
        </div>
        <SheetFooter className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2 border-t">
          <SheetClose asChild>
            <Button
              variant="outline"
              className="w-full sm:w-auto border-primary/20 hover:bg-primary/10 hover:text-primary dark:border-primary/20 dark:hover:bg-primary/10 dark:hover:text-primary font-inter"
            >
              Close
            </Button>
          </SheetClose>
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground dark:bg-primary dark:hover:bg-primary/90 dark:text-primary-foreground font-poppins font-medium"
          >
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
