import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export function renderCell(value: unknown) {
  
  if (typeof value === "boolean") {
    return (
      <Badge variant={value ? "default" : "destructive"} className="rounded-sm">
        {value ? "Ativo" : "Inativo"}
      </Badge>
    );
  }

  if (typeof value === "string") {
    const isImage = value.startsWith("http");

    if (isImage) {
      return (
        <img
          src={value}
          alt="image"
          width={35}
          height={35}
          className="rounded-sm "
        />
      );
    }

    return value;
  }

  return String(value ?? "-");
}
