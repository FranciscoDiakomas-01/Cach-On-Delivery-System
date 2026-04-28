'use client'
import { useState } from 'react';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import {
  ArrowLeftToLine,
  Bell,
  ChevronDown,
  CloudSync,
  Filter,
  Heart,
  Settings,
  ShoppingCart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CommandSearch } from "@/components/CommandSearch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ShopCartIcon } from '@/components/icons';
import { categoriesMock } from '@/mocks/categoriesMock';
import brands from '@/mocks/brands';
import Brand from '@/types/Brand';

import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { productsMock } from '@/mocks/productsMock';
import ProductCard from '@/components/ProductCard';
import { CartSheet } from '@/components/CartSheet';


export default function ShopPage() {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState([0, 1000]);

  const toggle = (list: string[], value: string, setter: any) => {
    if (list.includes(value)) {
      setter(list.filter((item) => item !== value));
    } else {
      setter([...list, value]);
    }
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPrice([0, 1000]);
  };

  const { setTheme } = useTheme();
  return <main className="bg-gray-100 dark:bg-zinc-950 ">
    <header className="h-16 z-4 bg-white dark:bg-zinc-950  border-b w-full fixed top-0 left-0 pr-5 flex  items-center gap-5 border-dashed ">
      <div className="border-r relative lg:w-75 px-3 h-full flex  items-center gap-2 border-dashed  ">
        <Image src={logo} alt="logo" className="h-8 w-8 dark:invert" />
        <h1 className=" text-2xl  tracking-tight text-balance">Sellify</h1>
      </div>
      <div className="flex-1 flex justify-between items-center py-2 h-full">
        <CommandSearch placeholder="Pesquisar produtos..." />
        <div className="flex items-center gap-4">

          <Button size={"icon"} variant={"outline"}>
            <Bell />
          </Button>
          <Button variant={"outline"} className="font-normal">
            <Heart />
            Favoritos
          </Button>
          <CartSheet/>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun /> Claro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon /> Escuro
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Settings /> Sistema
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className=" flex items-center gap-1">
                <Avatar>
                  <AvatarImage src="" />
                  <AvatarFallback>FD</AvatarFallback>
                </Avatar>
                <ChevronDown size={18} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 mr-3" align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>GitHub</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuItem disabled>API</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
    <aside className="w-75  bg-white dark:bg-zinc-950  border-r border-dashed  fixed bottom-0 h-full pt-19  flex flex-col pb-4 gap-4">
      <span className='px-3'>

        <CommandSearch placeholder="Pesquisar produtos..." />
      </span>

      <Accordion type="multiple" defaultValue={["categories", "brands", "price"]}>

        <AccordionItem value="categories" className='border-dashed px-3'>
          <AccordionTrigger>Categorias</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-2">
            {categoriesMock.map((cat: any) => (
              <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={selectedCategories.includes(cat.id)}
                  onCheckedChange={() =>
                    toggle(selectedCategories, cat.id, setSelectedCategories)
                  }
                />
                <span>{cat.title}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="brands" className='border-dashed px-3'>
          <AccordionTrigger>Marcas</AccordionTrigger>
          <AccordionContent className="grid grid-cols-2 gap-2">
            {brands.map((brand: any) => (
              <label
                key={brand.id}
                className="flex items-center gap-2 border rounded-md p-2 cursor-pointer hover:bg-muted transition border-dashed"
              >
                <Checkbox
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={() =>
                    toggle(selectedBrands, brand.id, setSelectedBrands)
                  }
                />
                <Image
                  src={brand.logo || ""}
                  alt={brand.title}
                  width={20}
                  height={20}
                  className="w-6 h-6 dark:invert"
                />
                <span className="text-sm">{brand.title}</span>
              </label>
            ))}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className='border-dashed px-3'>
          <AccordionTrigger>Preço</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col gap-3 py-2">
              <Slider
                value={price}
                onValueChange={setPrice}
                min={0}
                max={5000}
                step={50}
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{price[0]} kz</span>
                <span>{price[1]} kz</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

      </Accordion>

      <div className="mt-auto px-3 flex flex-col gap-2">
        <Button className="w-full"> <Filter /> Aplicar filtros</Button>
        <Button variant="outline" onClick={resetFilters}>
          Limpar filtros
        </Button>
      </div>
    </aside>
    <section className=" flex w-[83.5%]  mb-10 place-self-end pt-15  min-h-screen">
    <span className='grid gap-4 md:grid-cols-4 pt-5 w-full'>

          {
            productsMock.map((item )=>(
              <ProductCard product={item} key={item.id}/>
            ))
          }
    </span>
    </section>

  </main>;
}