import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getProduct, getProductsByCategory } from "@/lib/api";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const productId = parseInt(params.id);
    const product = await getProduct(productId);

    // Get related products from the same category (limited to 4)
    const relatedProducts = await getProductsByCategory(product.category);
    const filteredRelatedProducts = relatedProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 4);

    return (
      <div className="container mx-auto py-10">
        {/* Breadcrumb */}
        <nav className="flex mb-6 text-sm">
          <ol className="flex items-center space-x-1">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">/</span>
              <Link
                href="/products"
                className="text-gray-500 hover:text-gray-700"
              >
                Products
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">/</span>
              <Link
                href={`/products?category=${product.category}`}
                className="text-gray-500 hover:text-gray-700"
              >
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </Link>
            </li>
            <li className="flex items-center">
              <span className="mx-1">/</span>
              <span className="text-gray-900 font-medium">{product.title}</span>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col md:flex-row gap-10 bg-white p-6 rounded-lg shadow-sm">
          {/* Product Image */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 border">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-6"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2">
            <div className="mb-3 inline-block rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 capitalize">
              {product.category}
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-900">
              {product.title}
            </h1>

            <div className="mb-4 flex items-center gap-4">
              <div className="flex items-center bg-amber-50 px-3 py-1 rounded-full">
                <span className="mr-1 text-amber-500">★</span>
                <span className="font-medium">{product.rating.rate}</span>
                <span className="text-gray-500 ml-1">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <span className="text-sm text-gray-500">
                SKU: PROD-{product.id}
              </span>
            </div>

            <div className="mb-6 text-4xl font-bold text-blue-700">
              ${product.price.toFixed(2)}
            </div>

            <div className="mb-6 prose prose-blue">
              <h3 className="text-lg font-medium mb-2">Product Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row mb-6">
              <AddToCartButton product={product} />
              <Button className="w-full sm:w-auto" variant="outline" size="lg">
                Buy Now
              </Button>
            </div>

            <div className="border-t pt-4">
              <div className="flex gap-4">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm">Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  <span className="text-sm">Secure Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {filteredRelatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {filteredRelatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group block"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-50 mb-2">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium line-clamp-1 group-hover:text-blue-600">
                    {relatedProduct.title}
                  </h3>
                  <p className="text-blue-700 font-bold">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    notFound();
  }
}
