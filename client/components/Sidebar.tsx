"use client";

import {
  Box,
  LayoutGrid,
  LogOut,
  Package,
  Send,
  Shirt,
  ShoppingCart,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { CommandSearch } from "./CommandSearch";
import { Button } from "./ui/button";
import UserRole from "@/types/UserRole";
import { INaLink } from "@/types/NavLink";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  entity: UserRole;
};

const menuMap: Record<UserRole, INaLink[]> = {
  ADMIN: [
    {
      icon: <LayoutGrid size={20} />,
      title: "Inicial",
      to: "/dashboard",
    },
    {
      icon: <SlidersHorizontal size={20} />,
      title: "Marcas",
      to: "/dashboard",
    },
    {
      icon: <Package size={20} />,
      title: "Categorias",
      to: "/dashboard",
    },
    {
      icon: <Shirt size={20} />,
      title: "Produtos",
      to: "/dashboard",
    },
    {
      icon: <ShoppingCart size={20} />,
      title: "Pedidos",
      to: "/dashboard",
    },
    {
      icon: <Users size={20} />,
      title: "Usuários",
      to: "/dashboard",
    },
    {
      icon: <Send size={20} />,
      title: "Reviews",
      to: "/dashboard",
    },
  ],
  CUSTOMER: [],
  DELIVERY: [],
};

export default function Sidebar({ entity }: Props) {
  const items = menuMap[entity];
  const [selected, setSelected] = useState(0);
  return (
    <aside className="w-68 bg-white border-r border-dashed  fixed bottom-0 h-full pt-19 border-gray-200 flex flex-col pb-4 gap-4">
      <div className="px-3">
        <CommandSearch placeholder="Buscar" />
      </div>
      <nav className="flex flex-col gap-2  px-3">
        {items.map((item, index) => (
          <Link
            key={item.title}
            href={item.to}
            onClick={() => {
              setSelected(index);
            }}
            className={clsx(
              "p-2 py-3 transition-all  rounded-sm  text-sm flex items-center gap-2 hover:bg-gray-100 hover:opacity-100",
              {
                "bg-linear-to-r via-black/80 text-white from-black/90 to-indigo-500/60":
                  selected === index,
                "opacity-70": selected !== index,
              },
            )}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t border-dashed ">
        <span className="p-3 mt-3  flex flex-col gap-2  place-self-center w-[94%] justify-between">
          <h1 className="font-semibold text-lg">Visão Geral Sellify</h1>
          <p className="text-sm opacity-70 text-pretty">
            Acompanhe o desempenho da sua loja, incluindo pedidos, entregas e
            receita ao longo do tempo.
          </p>
          <Button size={"lg"}>Ver relatórios</Button>
        </span>
      </div>
    </aside>
  );
}
