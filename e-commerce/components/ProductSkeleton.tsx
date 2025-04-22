"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <Card className="w-full max-w-sm overflow-hidden border border-gray-200 flex flex-col h-full">
      <div className="relative h-60 w-full bg-gray-100 animate-pulse">
        <div className="absolute top-2 right-2 z-10">
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      </div>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-4/5 mb-2" />
        <Skeleton className="h-10 w-full" />
      </CardHeader>
      <CardContent className="pb-2 pt-0">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-5 w-24 rounded-md" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto pt-2 border-t">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-28" />
      </CardFooter>
    </Card>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto py-10">
      {/* Breadcrumb */}
      <nav className="flex mb-6">
        <Skeleton className="h-5 w-60" />
      </nav>

      <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-lg shadow-sm">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 animate-pulse" />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <Skeleton className="h-6 w-24 mb-3" />
          <Skeleton className="h-10 w-5/6 mb-4" />

          <div className="mb-4 flex items-center gap-4">
            <Skeleton className="h-8 w-32 rounded-full" />
            <Skeleton className="h-5 w-24" />
          </div>

          <Skeleton className="h-10 w-32 mb-6" />

          <div className="mb-6">
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row mb-6">
            <Skeleton className="h-12 w-full sm:w-1/2" />
            <Skeleton className="h-12 w-full sm:w-1/2" />
          </div>

          <Skeleton className="h-px w-full mb-4" />
          <div className="flex gap-4">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-16">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="block">
                <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 animate-pulse mb-2" />
                <Skeleton className="h-5 w-4/5 mb-1" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
