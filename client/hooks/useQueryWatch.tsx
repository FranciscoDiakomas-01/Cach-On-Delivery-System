"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useQueryWatch(key?: string) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getValue = () => {
    if (!key) return Object.fromEntries(searchParams.entries());
    return searchParams.get(key);
  };

  const [query, setQuery] = useState(getValue());

  useEffect(() => {
    setQuery(getValue());
  }, [searchParams]);

  // opcional: atualizar query
  const setQueryParam = (newKey: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) {
      params.delete(newKey);
    } else {
      params.set(newKey, value);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    query,
    setQueryParam,
  };
}
