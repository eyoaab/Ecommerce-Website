"use client";

import { useAuth } from "@/lib/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

// Mock order data (in a real app, this would come from an API)
const mockOrders = [
  {
    id: 1,
    date: "2023-04-15",
    status: "Delivered",
    total: 125.99,
    items: [
      { id: 1, name: "Men's Cotton Jacket", quantity: 1, price: 55.99 },
      { id: 2, name: "WD 2TB External Hard Drive", quantity: 1, price: 70.0 },
    ],
  },
  {
    id: 2,
    date: "2023-04-02",
    status: "Processing",
    total: 89.85,
    items: [
      { id: 3, name: "Samsung 49-Inch Monitor", quantity: 1, price: 89.85 },
    ],
  },
  {
    id: 3,
    date: "2023-03-18",
    status: "Delivered",
    total: 109.95,
    items: [
      {
        id: 4,
        name: "John Hardy Women's Chain Bracelet",
        quantity: 1,
        price: 109.95,
      },
    ],
  },
];

export default function OrdersPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <Button asChild variant="outline">
          <Link href="/account">Back to Account</Link>
        </Button>
      </div>

      <div className="space-y-6">
        {mockOrders.map((order) => (
          <Card key={order.id}>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle>Order #{order.id}</CardTitle>
                  <CardDescription>
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-4 mt-2 md:mt-0">
                  <Badge
                    variant={
                      order.status === "Delivered" ? "success" : "default"
                    }
                  >
                    {order.status}
                  </Badge>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/account/orders/${order.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                      {order.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                            {item.name}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            ${item.price.toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <td
                          colSpan={2}
                          className="px-4 py-3 text-right font-medium text-gray-900 dark:text-gray-100"
                        >
                          Total:
                        </td>
                        <td className="px-4 py-3 font-bold text-gray-900 dark:text-gray-100">
                          ${order.total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
