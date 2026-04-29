"use client";
import { productsMock } from "@/mocks/productsMock";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <span className="grid gap-4 md:grid-cols-4 pt-5 w-full">
      {productsMock.map((item) => (
        <ProductCard product={item} key={item.id} />
      ))}
    </span>
  );
}
