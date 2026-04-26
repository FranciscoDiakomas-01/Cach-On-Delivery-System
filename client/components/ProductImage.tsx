"use client";

import { useState } from "react";
import { Package } from "lucide-react";

type Props = {
  src?: string | null;
  alt: string;
};

export default function ProductImage({ src, alt }: Props) {
  const [error, setError] = useState(false);

  const hasImage = src && !error;

  return (
    <div className="w-full border h-55 bg-muted rounded-md overflow-hidden flex items-center justify-center">
      {hasImage ? (
        <img
          src={src}
          alt={alt}
          className=" w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <Package className="w-10 h-10 opacity-50" />
          <span className="text-xs">Imagem indisponível</span>
        </div>
      )}
    </div>
  );
}
