// Types
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  id: number;
  userId: number;
  date: string;
  products: CartItem[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthUser {
  id: number;
  email: string;
  username: string;
  name: {
    firstname: string;
    lastname: string;
  };
}

const API_URL = "https://fakestoreapi.com";

// Products API
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      // Add next.js specific cache options for server components
      next: { revalidate: 3600 }, // Revalidate every hour
      cache: "force-cache",
    });

    if (!response.ok) throw new Error("Failed to fetch products");
    return response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return empty array instead of throwing to prevent page crash
  }
};

export const getProduct = async (id: number): Promise<Product | null> => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!response.ok) throw new Error(`Failed to fetch product with id: ${id}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  try {
    const response = await fetch(`${API_URL}/products/category/${category}`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!response.ok)
      throw new Error(`Failed to fetch products in category: ${category}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching products in category ${category}:`, error);
    return [];
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_URL}/products/categories`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

// Cart API
export const getCarts = async (): Promise<Cart[]> => {
  try {
    const response = await fetch(`${API_URL}/carts`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!response.ok) throw new Error("Failed to fetch carts");
    return response.json();
  } catch (error) {
    console.error("Error fetching carts:", error);
    return [];
  }
};

export const getUserCart = async (userId: number): Promise<Cart | null> => {
  try {
    const response = await fetch(`${API_URL}/carts/user/${userId}`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!response.ok)
      throw new Error(`Failed to fetch cart for user: ${userId}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching cart for user ${userId}:`, error);
    return null;
  }
};

export const addToCart = async (
  cart: Omit<Cart, "id">
): Promise<Cart | null> => {
  try {
    const response = await fetch(`${API_URL}/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
      // No cache for mutations
    });

    if (!response.ok) throw new Error("Failed to add to cart");
    return response.json();
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
};

export const updateCart = async (
  cartId: number,
  cart: Cart
): Promise<Cart | null> => {
  try {
    const response = await fetch(`${API_URL}/carts/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
      // No cache for mutations
    });

    if (!response.ok) throw new Error("Failed to update cart");
    return response.json();
  } catch (error) {
    console.error(`Error updating cart ${cartId}:`, error);
    return null;
  }
};

export const deleteCart = async (cartId: number): Promise<{} | null> => {
  try {
    const response = await fetch(`${API_URL}/carts/${cartId}`, {
      method: "DELETE",
      // No cache for mutations
    });

    if (!response.ok) throw new Error("Failed to delete cart");
    return response.json();
  } catch (error) {
    console.error(`Error deleting cart ${cartId}:`, error);
    return null;
  }
};

// User API
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!response.ok) throw new Error("Failed to fetch users");
    return response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getUser = async (id: number): Promise<User | null> => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      next: { revalidate: 3600 },
      cache: "force-cache",
    });

    if (!response.ok) throw new Error(`Failed to fetch user with id: ${id}`);
    return response.json();
  } catch (error) {
    console.error(`Error fetching user ${id}:`, error);
    return null;
  }
};

// Auth API
export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      // No cache for auth
    });

    if (!response.ok) throw new Error("Authentication failed");
    return response.json();
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};

// Getting user by token isn't directly supported by FakeStoreAPI
// This is a helper function to simulate getting user info with a token
export const getUserByToken = async (
  token: string
): Promise<AuthUser | null> => {
  try {
    // In a real app, we would send the token to the server to validate
    // and get the current user information

    // For FakeStoreAPI, we'll simulate this by getting all users
    // and picking the first one (since there's no real token validation)

    // Check if token exists
    if (!token) return null;

    const users = await getUsers();
    if (users && users.length > 0) {
      const user = users[0]; // Just get first user for demo purposes

      // Return a simplified user object
      return {
        id: user.id,
        email: user.email,
        username: user.username,
        name: {
          firstname: user.name.firstname,
          lastname: user.name.lastname,
        },
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching user by token:", error);
    return null;
  }
};

// Helper function to get stored user data from localStorage
export const getCurrentUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;

  try {
    const userString = localStorage.getItem("user");
    if (!userString) return null;

    return JSON.parse(userString);
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

// User update utility functions (for local storage only in this example)
export const updateUser = (user: User): User => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
  return user;
};

export const deleteUserAccount = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  }
};
