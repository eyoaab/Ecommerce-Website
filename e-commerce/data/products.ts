export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Premium Leather Wallet",
    description:
      "Handcrafted premium leather wallet with multiple card slots and RFID protection.",
    price: 49.99,
    imageUrl:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "accessories",
  },
  {
    id: "2",
    name: "Wireless Bluetooth Headphones",
    description:
      "High-quality noise cancelling wireless headphones with 30 hours of battery life.",
    price: 129.99,
    imageUrl:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "electronics",
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description:
      "Eco-friendly, soft organic cotton t-shirt available in multiple colors.",
    price: 24.99,
    imageUrl:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "clothing",
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    description:
      "Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 34.99,
    imageUrl:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "home",
  },
  {
    id: "5",
    name: "Smart Fitness Tracker",
    description:
      "Water-resistant fitness tracker with heart rate monitoring and sleep tracking features.",
    price: 89.99,
    imageUrl:
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd6b0?q=80&w=2952&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "electronics",
  },
  {
    id: "6",
    name: "Handmade Ceramic Mug",
    description:
      "Unique handmade ceramic mug, perfect for your morning coffee or tea.",
    price: 19.99,
    imageUrl:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "home",
  },
];
