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
  const response = await fetch(`${API_URL}/products`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
};

export const getProduct = async (id: number): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch product with id: ${id}`);
  return response.json();
};

export const getProductsByCategory = async (
  category: string
): Promise<Product[]> => {
  const response = await fetch(`${API_URL}/products/category/${category}`);
  if (!response.ok)
    throw new Error(`Failed to fetch products in category: ${category}`);
  return response.json();
};

export const getCategories = async (): Promise<string[]> => {
  const response = await fetch(`${API_URL}/products/categories`);
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
};

// Cart API
export const getCarts = async (): Promise<Cart[]> => {
  const response = await fetch(`${API_URL}/carts`);
  if (!response.ok) throw new Error("Failed to fetch carts");
  return response.json();
};

export const getUserCart = async (userId: number): Promise<Cart> => {
  const response = await fetch(`${API_URL}/carts/user/${userId}`);
  if (!response.ok) throw new Error(`Failed to fetch cart for user: ${userId}`);
  return response.json();
};

export const addToCart = async (cart: Omit<Cart, "id">): Promise<Cart> => {
  const response = await fetch(`${API_URL}/carts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  if (!response.ok) throw new Error("Failed to add to cart");
  return response.json();
};

export const updateCart = async (cartId: number, cart: Cart): Promise<Cart> => {
  const response = await fetch(`${API_URL}/carts/${cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });
  if (!response.ok) throw new Error("Failed to update cart");
  return response.json();
};

export const deleteCart = async (cartId: number): Promise<{}> => {
  const response = await fetch(`${API_URL}/carts/${cartId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete cart");
  return response.json();
};

// User API
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) throw new Error("Failed to fetch users");
  return response.json();
};

export const getUser = async (id: number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch user with id: ${id}`);
  return response.json();
};

// Auth API
export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) throw new Error("Authentication failed");
  return response.json();
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
