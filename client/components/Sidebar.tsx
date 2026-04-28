"use client";

import { usePathname } from "next/navigation";
import {
  BarChart3,
  Box,
  Clock,
  DollarSign,
  Heart,
  LayoutGrid,
  Map,
  MapPin,
  MessageCircle,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Sparkle,
  Star,
  Tags,
  Truck,
  User,
  User2,
  Users,
} from "lucide-react";
import { CommandSearch } from "./CommandSearch";
import { Button } from "./ui/button";
import UserRole from "@/types/UserRole";
import { INaLink } from "@/types/NavLink";
import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { HomeIcon, MansIcon, TagIcons } from "@/components/icons";

type Props = {
  entity: UserRole;
};

const menuMap: Record<UserRole, INaLink[]> = {
  ADMIN: [
    { icon: <HomeIcon size={20} />, title: "Dashboard", to: "/dashboard" },
    { icon: <MansIcon size={20} />, title: "Usuários", to: "/dashboard/users" },
    {
      icon: <Package size={20} />,
      title: "Produtos",
      to: "/dashboard/products",
    },
    {
      icon: <TagIcons size={20} />,
      title: "Categorias",
      to: "/dashboard/category",
    },
    {
      icon: <Box size={20} />,
      title: "Coupun",
      to: "/dashboard/coupuns",
    },
    {
      icon: <ShoppingCart size={20} />,
      title: "Pedidos",
      to: "/dashboard/orders",
    },
    { icon: <Star size={20} />, title: "Avaliações", to: "/dashboard/reviews" },
    {
      icon: <Settings size={20} />,
      title: "Configurações",
      to: "/dashboard/settings",
    },
  ],
  CUSTOMER: [
    { icon: <LayoutGrid size={20} />, title: "Início", to: "/" },

    { icon: <Search size={20} />, title: "Explorar Produtos", to: "/shop" },

    { icon: <Heart size={20} />, title: "Favoritos", to: "/wishlist" },

    { icon: <ShoppingCart size={20} />, title: "Carrinho", to: "/cart" },

    { icon: <Package size={20} />, title: "Meus Pedidos", to: "/orders" },

    { icon: <MapPin size={20} />, title: "Endereços", to: "/addresses" },

    { icon: <MessageCircle size={20} />, title: "Suporte", to: "/support" },

    { icon: <User2 size={20} />, title: "Perfil", to: "/profile" },
  ],
  DELIVERY: [
    { icon: <LayoutGrid size={20} />, title: "Painel", to: "/delivery" },

    {
      icon: <Truck size={20} />,
      title: "Entregas atribuídas",
      to: "/delivery/tasks",
    },

    { icon: <Map size={20} />, title: "Mapa de rotas", to: "/delivery/map" },

    {
      icon: <Package size={20} />,
      title: "Histórico de entregas",
      to: "/delivery/history",
    },

    {
      icon: <DollarSign size={20} />,
      title: "Pagamentos COD",
      to: "/delivery/cash",
    },

    {
      icon: <Clock size={20} />,
      title: "Disponibilidade",
      to: "/delivery/availability",
    },

    { icon: <User size={20} />, title: "Perfil", to: "/delivery/profile" },
  ],
};

export default function Sidebar({ entity }: Props) {
  const items = menuMap[entity];
  const pathname = usePathname();
  const isActive = (to: string) => {
    if (to === "/dashboard") {
      return pathname === "/dashboard";
    }

    return pathname.startsWith(to);
  };
  return (
    <aside className="w-68 bg-white dark:bg-zinc-950  border-r border-dashed  fixed bottom-0 h-full pt-19  flex flex-col pb-4 gap-4">
      <div className="px-3">
        <CommandSearch placeholder="Buscar" />
      </div>
      <nav className="flex flex-col gap-2  px-3">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.to}
            className={clsx(
              "p-2 stroke-white dark:stroke-black py-3 transition-all rounded-sm text-sm flex items-center gap-2 hover:bg-gray-100 dark:hover:text-black hover:opacity-100",
              {
                "bg-linear-to-r via-black/80 dark:via-white/80 text-white from-black/90 dark:from-white/90 dark:text-black to-green-500/60":
                  isActive(item.to),

                "opacity-70": !isActive(item.to),
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
          <Button
            className="bg-linear-to-r via-black/80 dark:via-white/80 text-white from-black/90 dark:from-white/90 dark:text-black to-green-500/60"
            size={"lg"}
          >
            <Sparkle />
            Ver relatórios
          </Button>
        </span>
      </div>
    </aside>
  );
}
