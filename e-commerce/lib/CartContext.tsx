"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product, CartItem, addToCart, getUserCart } from "@/lib/api";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface CartItemWithProduct extends CartItem {
  product: Product;
  subtotal: number;
}

interface CartContextType {
  items: CartItemWithProduct[];
  loading: boolean;
  error: string | null;
  addItem: (product: Product, quantity: number) => Promise<void>;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, user } = useAuth();
  const [items, setItems] = useState<CartItemWithProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Calculate derived values
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.subtotal, 0);

  // Load cart data from localStorage or API when component mounts
  useEffect(() => {
    const loadCart = async () => {
      setInitialLoading(true);
      try {
        if (isAuthenticated && user) {
          // If authenticated, try to get the user's cart from the API
          const cartData = await getUserCart(user.id);

          // In a real app, we would fetch product details for each item
          // For demo purposes, we'll use the existing cart data

          // If we got cart data, parse it
          if (cartData && cartData.products) {
            // Get cart from localStorage if available for product details
            const storedCartString = localStorage.getItem("cart");
            const storedCart = storedCartString
              ? JSON.parse(storedCartString)
              : [];

            // Merge API cart with stored cart that has product details
            const mergedCart = cartData.products.map((item) => {
              const storedItem = storedCart.find(
                (stored: CartItemWithProduct) =>
                  stored.productId === item.productId
              );
              return (
                storedItem || {
                  ...item,
                  product: { id: item.productId } as Product, // Placeholder - would fetch product in real app
                  subtotal: 0,
                }
              );
            });

            setItems(mergedCart);
          }
        } else {
          // If not authenticated, load from localStorage
          const storedCartString = localStorage.getItem("cart");
          if (storedCartString) {
            setItems(JSON.parse(storedCartString));
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load cart");
        toast.error("Failed to load cart", {
          description: "There was a problem loading your cart items.",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    loadCart();
  }, [isAuthenticated, user]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  // Add an item to the cart
  const addItem = async (product: Product, quantity: number) => {
    setLoading(true);
    setError(null);

    try {
      // Check if item already exists in cart
      const existingItemIndex = items.findIndex(
        (item) => item.productId === product.id
      );

      if (existingItemIndex >= 0) {
        // If item exists, update quantity
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += quantity;
        updatedItems[existingItemIndex].subtotal =
          updatedItems[existingItemIndex].quantity * product.price;
        setItems(updatedItems);
      } else {
        // Otherwise, add new item
        const newItem: CartItemWithProduct = {
          productId: product.id,
          quantity,
          product,
          subtotal: product.price * quantity,
        };
        setItems([...items, newItem]);
      }

      // If authenticated, sync with API
      // Note: In a real app, we would send the updated cart to the API
      if (isAuthenticated && user) {
        // This is a dummy API call, as FakeStoreAPI doesn't actually update the server
        await addToCart({
          userId: user.id,
          date: new Date().toISOString(),
          products: [...items, { productId: product.id, quantity }],
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to add item to cart";
      setError(errorMessage);
      toast.error("Failed to add item", {
        description: errorMessage,
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove an item from the cart
  const removeItem = (productId: number) => {
    try {
      const itemToRemove = items.find((item) => item.productId === productId);
      setItems(items.filter((item) => item.productId !== productId));

      if (itemToRemove) {
        toast.success("Item removed", {
          description: `${itemToRemove.product.title} has been removed from your cart.`,
        });
      }
    } catch (err) {
      toast.error("Failed to remove item", {
        description: "There was a problem removing this item from your cart.",
      });
    }
  };

  // Update item quantity
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) return;

    try {
      const updatedItems = items.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity,
            subtotal: item.product.price * quantity,
          };
        }
        return item;
      });

      setItems(updatedItems);
    } catch (err) {
      toast.error("Failed to update quantity", {
        description: "There was a problem updating the item quantity.",
      });
    }
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared", {
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        loading: loading || initialLoading,
        error,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
