"use client";
import logo from "@/assets/images/logo.png";
import {
  ArrowLeftToLine,
  Bell,
  ChevronDown,
  CloudSync,
  Heart,
  LogOut,
  Sun,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
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
import { CommandSearch } from "./CommandSearch";

export default function Header() {
  return (
    <header className="h-16 z-4 bg-white border-b border-gray-200 w-full fixed top-0 left-0 pr-5 flex  items-center gap-5 border-dashed ">
      <div className="border-r relative lg:w-68 px-3 h-full flex  items-center gap-2 border-dashed  ">
        <Image src={logo} alt="logo" className="h-7 w-7" />
        <h1 className=" text-2xl  tracking-tight text-balance">Sellify</h1>
        <ArrowLeftToLine className="absolute right-2" size={19} />
      </div>
      <div className="flex-1 flex justify-between py-2 h-full">
        <div className="flex flex-col">
          <h1 className="tracking-tight font-medium text-lg text-balance">
            Gerenciar produtos
          </h1>
          <p className="opacity-40 flex text-xs items-center gap-1">
            <CloudSync size={13} />
            crie, liste, edite e remova !
          </p>
        </div>
        <div className="flex items-center gap-4">
          <CommandSearch placeholder="Busque por qualquer coisa" />
          <Button size={"icon"} variant={"outline"}>
            <Bell />
          </Button>
          <Button size={"icon"} variant={"outline"}>
            <Sun />
          </Button>
          <Button variant={"outline"} className="font-normal">
            <Heart />
            Favoritos
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className=" flex items-center gap-1">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
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
  );
}
