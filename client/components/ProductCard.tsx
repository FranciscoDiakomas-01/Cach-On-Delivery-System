"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  MoreHorizontal,
  Edit,
  Trash,
  Package,
  Star,
  Tag,
  Store,
  Box,
  ShoppingCartIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import { Product } from "@/types/Product";
import ProductImage from "./ProductImage";
import { ShopCartIcon } from "./icons";
import { useState } from "react";

type Props = {
  product: Product;
  mode?: "dashboard" | "store";
};

export default function ProductCard({ product  ,mode }: Props) {

  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);

    setTimeout(() => setAnimate(false), 600);
  };
  return (
    <Card className="p-2 flex flex-col gap-3 hover:shadow-sm rounded-md transition w-full">
      <ProductImage alt={product.title} src={product.imageUrl} />

      <div className="flex flex-col gap-1">
        <h2 className="font-semibold">{product.title}</h2>
        <p className="text-xs text-muted-foreground">{product.description}</p>
      </div>

      {/* BRAND + CATEGORY */}
      <div className="flex flex-wrap gap-2 text-xs">
        <Badge variant="outline" className="gap-1">
          <Store className="w-3 h-3" />
          {product.brand?.title}
        </Badge>

        <Badge variant="outline" className="gap-1">
          <Tag className="w-3 h-3" />
          {product.category?.title}
        </Badge>  <Badge variant="outline" className="gap-1">
          <ShopCartIcon className="w-3 h-3" />
          {product.available} unidade(s)
        </Badge>
      </div>

      {/* PRICE */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg">{product.price} kz</span>

          {product.compareAtPrice && (
            <span className="line-through text-muted-foreground text-sm">
              {product.compareAtPrice} kz
            </span>
          )}
        </div>

        {product.isFeatured && (
          <Badge className="gap-1">
            <Star className="w-3 h-3" />
            Destaque
          </Badge>
        )}
      </div>
      {/* STOCK INTELLIGENCE */}

      {
        mode === "dashboard" &&  <div className="grid grid-cols-3 gap-3 border rounded-md py-2">
        <div className="flex flex-col gap-1 border-r text-center pr-3">
          <span className="text-xs">Stock</span>
          <span className=" text-muted-foreground">{product.available}</span>
        </div>

        <div className="flex flex-col gap-1 border-r text-center pr-3">
          <span className="text-xs">Reservado</span>
          <span className=" text-muted-foreground">{product.reserved}</span>
        </div>
        <div className="hidden flex-col gap-1 md:flex text-center">
          <span className="text-xs">Vendas</span>
          <span className=" text-muted-foreground ">{product.sellCount}</span>
        </div>
      </div>
      }
     

      {/* STATUS + ACTIONS */}
      <div className="flex items-center justify-between pt-2">
        <Badge variant={product.isActive ? "default" : "outline"}>
          {product.isActive ? "Ativo" : "Inativo"}
        </Badge>

       <div className="flex items-center justify-between pt-2">

  {mode === "dashboard" ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="w-4 h-4 mr-2" />
          Editar
        </DropdownMenuItem>

        <DropdownMenuItem className="text-red-500">
          <Trash className="w-4 h-4 mr-2" />
          Remover
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    null
  )}
</div>

      </div>
        <Button
      onClick={handleClick}
      className="gap-2 rounded-md mt-2"
      variant="outline"
      size="lg"
    >
      <ShoppingCartIcon
  className={`transition-all duration-700 ${
    animate ? "-translate-x-3 -translate-y-1 scale-125 opacity-70" : ""
  }`}
      />
      Adicionar
    </Button>

    </Card>
  );
}
