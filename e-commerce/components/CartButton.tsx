"use client";

import { useCart } from "@/lib/CartContext";

export default function CartButton() {
  const { totalItems } = useCart();

  return totalItems > 0 ? (
    <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
      {totalItems > 99 ? "99+" : totalItems}
    </span>
  ) : null;
}
