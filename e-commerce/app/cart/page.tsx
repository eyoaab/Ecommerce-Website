"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/CartContext";

export default function CartPage() {
  const {
    items: cartItems,
    loading,
    error,
    updateQuantity,
    removeItem,
    totalPrice,
  } = useCart();

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <div className="text-center">
            <svg
              className="animate-spin h-10 w-10 text-blue-600 mx-auto mb-4"
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
            <p className="text-lg font-medium text-gray-700">
              Loading your cart...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="bg-red-50 p-6 rounded-lg border border-red-200 text-red-700">
          <h2 className="text-lg font-medium mb-2">Error loading cart</h2>
          <p className="mb-4">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
      <p className="text-gray-500 mb-6">
        {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your
        cart
      </p>

      {cartItems.length === 0 ? (
        <div className="bg-gray-50 p-12 rounded-lg text-center">
          <svg
            className="h-16 w-16 text-gray-400 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-lg mb-6">Your cart is empty</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="p-6 flex flex-col sm:flex-row items-start gap-4"
                  >
                    <div className="relative h-24 w-24 flex-shrink-0 bg-gray-50 rounded-md border overflow-hidden">
                      <Image
                        src={item.product.image}
                        alt={item.product.title}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.productId}`}
                        className="text-lg font-medium text-blue-600 hover:underline line-clamp-1"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1 mb-2 line-clamp-1">
                        {item.product.category}
                      </p>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center border rounded-md">
                          <button
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            onClick={() =>
                              updateQuantity(item.productId, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-medium">
                            ${item.subtotal.toFixed(2)}
                          </p>
                          <button
                            className="text-red-500 hover:text-red-700 text-sm"
                            onClick={() => removeItem(item.productId)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Button */}
              <div className="bg-gray-50 p-4 border-t">
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-4">
              <h2 className="text-xl font-bold mb-6 pb-4 border-b">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-4 border-t text-lg font-bold">
                  <span>Total</span>
                  <span>${(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 py-6 text-lg">
                Proceed to Checkout
              </Button>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p className="mb-2">Secure Checkout</p>
                <div className="flex justify-center space-x-2">
                  <span className="bg-gray-100 p-1 rounded">
                    <svg
                      className="w-8 h-5"
                      viewBox="0 0 48 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="48" height="24" rx="4" fill="#252525" />
                      <path
                        d="M17.4854 16.0417H14.0625L12.9167 12.1875L11.7708 16.0417H8.35415L6.64581 8.20834H9.42706L10.25 13.3333L11.7708 8.20834H14.0625L15.5833 13.3333L16.4062 8.20834H19.1875L17.4854 16.0417Z"
                        fill="white"
                      />
                      <path
                        d="M26.6146 13.3333C26.6146 14.9375 25.1979 16.0417 22.599 16.0417C20.0002 16.0417 18.5835 14.9375 18.5835 13.3333C18.5835 11.7292 20.0002 10.625 22.599 10.625C25.1979 10.625 26.6146 11.7292 26.6146 13.3333ZM21.3335 13.3333C21.3335 13.8542 21.7708 14.1667 22.599 14.1667C23.4271 14.1667 23.8646 13.8542 23.8646 13.3333C23.8646 12.8125 23.4271 12.5 22.599 12.5C21.7708 12.5 21.3335 12.8125 21.3335 13.3333Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="bg-gray-100 p-1 rounded">
                    <svg
                      className="w-8 h-5"
                      viewBox="0 0 48 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="48" height="24" rx="4" fill="white" />
                      <path
                        d="M17.9058 7.27924H12.1096V16.3468H17.9058V7.27924Z"
                        fill="#FF5F00"
                      />
                      <path
                        d="M12.6373 11.813C12.6373 9.88924 13.5765 8.16779 15.0077 7.27924C14.1276 6.6189 13.0616 6.24219 11.9125 6.24219C8.88962 6.24219 6.44092 8.76961 6.44092 11.813C6.44092 14.8564 8.88962 17.3839 11.9125 17.3839C13.0616 17.3839 14.1276 17.0071 15.0077 16.3468C13.5765 15.4582 12.6373 13.7368 12.6373 11.813Z"
                        fill="#EB001B"
                      />
                      <path
                        d="M29.5745 11.813C29.5745 14.8564 27.1258 17.3839 24.1029 17.3839C22.9538 17.3839 21.8878 17.0071 21.0077 16.3468C22.439 15.4582 23.3781 13.7368 23.3781 11.813C23.3781 9.88924 22.439 8.16779 21.0077 7.27924C21.8878 6.6189 22.9538 6.24219 24.1029 6.24219C27.1258 6.24219 29.5745 8.76961 29.5745 11.813Z"
                        fill="#F79E1B"
                      />
                    </svg>
                  </span>
                  <span className="bg-gray-100 p-1 rounded">
                    <svg
                      className="w-8 h-5"
                      viewBox="0 0 48 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="48" height="24" rx="4" fill="#1A1F71" />
                      <path
                        d="M18.8611 15.5691H16.6611L18.1611 8.15527H20.3611L18.8611 15.5691Z"
                        fill="white"
                      />
                      <path
                        d="M25.884 8.32088C25.4173 8.15527 24.734 7.98965 23.884 7.98965C21.7673 7.98965 20.284 9.1521 20.284 10.7365C20.284 11.9324 21.3507 12.5969 22.1673 12.9866C23.0007 13.3764 23.2507 13.6329 23.2507 13.9893C23.2507 14.5205 22.584 14.7769 21.934 14.7769C21.0507 14.7769 20.5673 14.6445 19.9173 14.3213L19.6173 14.1888L19.3007 16.0729C19.884 16.3296 20.934 16.5527 22.0173 16.5527C24.2673 16.5527 25.7173 15.4069 25.7173 13.7225C25.7173 12.763 25.1507 12.0318 23.8173 11.4674C23.0007 11.111 22.534 10.8545 22.534 10.4648C22.534 10.1084 22.934 9.71863 23.784 9.71863C24.484 9.68505 24.9673 9.85067 25.334 10.0163L25.534 10.115L25.884 8.32088Z"
                        fill="white"
                      />
                      <path
                        d="M29.6842 8.15527H28.0175C27.5008 8.15527 27.1508 8.28731 26.9508 8.81847L24.3175 15.5691H26.6342C26.6342 15.5691 26.9675 14.579 27.0342 14.3893H29.4342C29.4842 14.6457 29.6675 15.5691 29.6675 15.5691H31.7342L29.6842 8.15527ZM27.6342 12.6978C27.8008 12.2413 28.4175 10.5569 28.4175 10.5569C28.4175 10.5908 28.5842 10.1341 28.6842 9.84414L28.8342 10.4917C28.8342 10.4917 29.2175 12.3079 29.3008 12.6978H27.6342Z"
                        fill="white"
                      />
                      <path
                        d="M15.5944 8.15527L13.4111 13.0724L13.1944 11.8765C12.7778 10.4648 11.5278 8.95271 10.1278 8.28731L12.1444 15.5691H14.4944L17.9444 8.15527H15.5944Z"
                        fill="white"
                      />
                      <path
                        d="M12.0104 8.15526H8.54451L8.51117 8.32088C11.1945 9.02987 12.9278 10.3082 13.6445 11.8764L12.9945 8.8185C12.8612 8.28733 12.4945 8.18887 12.0104 8.15526Z"
                        fill="#F79410"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
