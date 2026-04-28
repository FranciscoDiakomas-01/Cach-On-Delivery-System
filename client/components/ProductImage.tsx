"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  src?: string;
  alt: string;
};

export default function ProductImage({ src, alt }: Props) {
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);

  const hasImage = src && !error;

  return (
    <div className="group relative w-full h-56 border rounded-md overflow-hidden bg-muted w-full">
      {hasImage ? (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            onError={() => setError(true)}
            className="object-cover transition-transform duration-300 group-hover:scale-110 w-full"
          />

          {/* ❤️ Wishlist */}
         
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <Package className="w-10 h-10 opacity-50" />
          <span className="text-xs">Imagem indisponível</span>
        </div>
      )}
       <Button
            size="icon"
            variant="secondary"
            onClick={() => setLiked(!liked)}
            className="absolute top-2 right-2 z-2 rounded-full backdrop-blur bg-white/70 hover:bg-white border dark:bg-black/15"
          >
            <Heart
              className={`w-4 h-4 transition ${
                liked ? "fill-red-500 text-red-500" : ""
              }`}
            />
          </Button>
    </div>
  );
}