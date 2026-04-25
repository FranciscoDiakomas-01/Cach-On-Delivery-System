"use client";

import * as React from "react";
import {
  CreditCardIcon,
  SearchIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupButton,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function CommandSearch({ placeholder }: { placeholder: string }) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString());
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    router.push(`?${params.toString()}`);
    setOpen(false);
  }

  return (
    <div
      className="flex flex-col gap-4"
      onKeyUp={(e) => {
        const key = e.code;
        if (key === "Enter" && query) {
          handleSearch();
          setOpen(false);
        }
      }}
    >
      <InputGroup className="h-10 px-2" onClick={() => setOpen(true)}>
        <InputGroupInput placeholder={placeholder} readOnly />
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupButton>
          <CommandShortcut>⌘P</CommandShortcut>
        </InputGroupButton>
      </InputGroup>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command>
          <div className="flex items-center gap-2 p-2">
            <InputGroup>
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
              <InputGroupInput
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                value={query}
                placeholder={placeholder}
              />
            </InputGroup>

            <Button onClick={handleSearch}>Pesquisar</Button>
          </div>

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Atalhos">
              <CommandItem>
                <UserIcon />
                <span>Usuários</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCardIcon />
                <span>Categorias</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon />
                <span>Configurações</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
