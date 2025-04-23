"use client";

import { useAuth } from "@/lib/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState, useEffect } from "react";

// Mock order data (in a real app, this would come from an API)
const mockOrders = [
  {
    id: 1,
    date: "2023-04-15",
    status: "Delivered",
    total: 125.99,
    shipping: 5.99,
    subtotal: 120.0,
    address: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      zipcode: "10001",
      country: "USA",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "4242",
      cardBrand: "Visa",
    },
    items: [
      {
        id: 1,
        name: "Men's Cotton Jacket",
        quantity: 1,
        price: 55.99,
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      },
      {
        id: 2,
        name: "WD 2TB External Hard Drive",
        quantity: 1,
        price: 70.0,
        image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
      },
    ],
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2023-04-18",
  },
  {
    id: 2,
    date: "2023-04-02",
    status: "Processing",
    total: 89.85,
    shipping: 4.99,
    subtotal: 84.86,
    address: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      zipcode: "10001",
      country: "USA",
    },
    payment: {
      method: "PayPal",
      email: "j***@example.com",
    },
    items: [
      {
        id: 3,
        name: "Samsung 49-Inch Monitor",
        quantity: 1,
        price: 89.85,
        image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
      },
    ],
    trackingNumber: "",
    estimatedDelivery: "2023-04-10",
  },
  {
    id: 3,
    date: "2023-03-18",
    status: "Delivered",
    total: 109.95,
    shipping: 0,
    subtotal: 109.95,
    address: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      zipcode: "10001",
      country: "USA",
    },
    payment: {
      method: "Credit Card",
      cardLast4: "1234",
      cardBrand: "Mastercard",
    },
    items: [
      {
        id: 4,
        name: "John Hardy Women's Chain Bracelet",
        quantity: 1,
        price: 109.95,
        image:
          "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
      },
    ],
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2023-03-22",
  },
];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to get order details
    const orderId = Number(params.id);
    const foundOrder = mockOrders.find((o) => o.id === orderId);

    if (foundOrder) {
      setOrder(foundOrder);
      setLoading(false);
    } else {
      // Order not found, redirect back to orders page
      router.push("/account/orders");
    }
  }, [params.id, router]);

  if (loading || !order) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-xl">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <p className="text-muted-foreground">
            Placed on {new Date(order.date).toLocaleDateString()}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/account/orders">Back to Orders</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <div className="flex items-center mt-2">
                <Badge
                  variant={order.status === "Delivered" ? "success" : "default"}
                >
                  {order.status}
                </Badge>
                {order.trackingNumber && (
                  <p className="ml-4 text-sm text-muted-foreground">
                    Tracking:{" "}
                    <span className="font-medium">{order.trackingNumber}</span>
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {order.items.map((item: any) => (
                        <tr key={item.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-md object-cover"
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                  {item.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ${(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-3 text-right text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Subtotal
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          ${order.subtotal.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-3 text-right text-sm font-medium text-gray-900 dark:text-gray-100"
                        >
                          Shipping
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                          ${order.shipping.toFixed(2)}
                        </td>
                      </tr>
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-3 text-right text-sm font-bold text-gray-900 dark:text-gray-100"
                        >
                          Total
                        </td>
                        <td className="px-6 py-3 whitespace-nowrap text-sm font-bold text-gray-900 dark:text-gray-100">
                          ${order.total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Address</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p className="font-medium">{order.address.name}</p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.zipcode}
                </p>
                <p>{order.address.country}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p>Method: {order.payment.method}</p>
                {order.payment.cardLast4 ? (
                  <p>
                    {order.payment.cardBrand} ending in{" "}
                    {order.payment.cardLast4}
                  </p>
                ) : (
                  <p>{order.payment.email}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium">{order.status}</p>
                </div>
                {order.estimatedDelivery && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Estimated Delivery
                    </p>
                    <p className="font-medium">
                      {new Date(order.estimatedDelivery).toLocaleDateString()}
                    </p>
                  </div>
                )}
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Tracking Number
                    </p>
                    <p className="font-medium">{order.trackingNumber}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
