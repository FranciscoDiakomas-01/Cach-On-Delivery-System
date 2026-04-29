"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import CartItem from "@/types/CartItem";
import { productsMock } from "@/mocks/productsMock";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { ShopCartIcon } from "./icons";

export function CartSheet() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: "1",
      product: productsMock[0],
      cart: {} as any,
      cartId: crypto.randomUUID(),
      productId: productsMock[0].id,
      quantity: 1,
    },
    {
      id: "2",
      product: productsMock[1],
      cart: {} as any,
      cartId: crypto.randomUUID(),
      productId: productsMock[1].id,
      quantity: 1,
    },
  ]);
  const totalItems = cart.length;
  const totalValue = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const updateQuantity = (id: string, value: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (value < 1) return item;
        if (value > item.product.available) return item;

        return { ...item, quantity: value };
      }),
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );
  const hasItems = totalItems > 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="relative group  p-0 rounded-md flex items-center justify-center"
        >
          <ShoppingCart size={18} className="opacity-80" />

          {/* Badge */}
          {hasItems && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center">
              <span className="absolute inline-flex h-4 w-4 rounded-full bg-emerald-500 opacity-30 animate-ping" />
              <span className="relative flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white font-medium">
                {totalItems}
              </span>
            </span>
          )}

          {/* Valor só aparece no hover do botão */}
          <span
            className="
      absolute -bottom-9 left-1/2 -translate-x-1/2
      whitespace-nowrap rounded-full bg-background border
      px-2 py-1 text-[11px] shadow-sm text-muted-foreground
      opacity-0 translate-y-1
      group-hover:opacity-100 group-hover:translate-y-0
      transition-all duration-200
    "
          >
            {totalValue.toLocaleString()} Kz
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="item-center dark:bg-white/4 bg-gray-100 border-b justify-center flex h-15">
          <SheetTitle>Seu Carrinho</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 h-120 px-3">
          <div className="space-y-4">
            {cart.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Seu carrinho está vazio
              </p>
            )}

            {cart.map((item) => (
              <div
                key={item.id}
                className="grid lg:grid-cols-2 gap-4 p-2 rounded-md border bg-background "
              >
                {/* Imagem */}

                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className="h-full r rounded-md dark:bg-white/10 bg-gray-100 w-full"
                />

                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium">{item.product.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    {item.product.title.toLocaleString()} Kz
                  </p>
                  <div className="flex items-center gap-2 ">
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </Button>

                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="w-16 text-center"
                    />

                    <Button
                      size="icon"
                      variant="outline"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 ">
                    <Badge
                      variant={"outline"}
                      className="text-xs text-muted-foreground rounded-md "
                    >
                      Stock: {item.product.available}
                    </Badge>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <Separator className="my-4" />

        {/* Resumo */}
        <div className="space-y-2 px-3">
          <div className="flex justify-between opacity-50 text-xs">
            <span>Valor a se pagar</span>
            <span>{subtotal.toLocaleString()} Kz</span>
          </div>

          <div className="flex justify-between scroll-m-20 text-2xl font-semibold tracking-tight">
            <span>Total</span>
            <span>{subtotal.toLocaleString()} Kz</span>
          </div>

          <SheetClose asChild className="w-full">
            <Button size={"lg"} className="mt-4 w-full mb-3">
              <Link href={"/shop/checkout"} className="flex gap-2 item-center">
                <ShopCartIcon />
                Finalizar Compra
              </Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
