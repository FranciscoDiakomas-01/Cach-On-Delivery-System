"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Paymethod } from "@/types/Paymethod";
import { Badge } from "./ui/badge";
import moneyBag from "@/assets/images/money-bag.png";
const methods = [
  {
    id: Paymethod.CASH,
    title: "Dinheiro em mão",
    desc: "Paga quando receberes a encomenda",
    badge: "Seguro",
    image: moneyBag.src,
  },
  {
    id: Paymethod.EXPRESS,
    title: "Multicaixa Express",
    desc: "Checkout instantâneo e seguro",
    badge: "Recomendado",
    image:
      "https://noticiasangola.free.nf/wp-content/uploads/2025/04/GPONew.png",
  },
  {
    id: Paymethod.REFERENCE,
    title: "Referência Multicaixa",
    desc: "Usa referência para pagamento",
    badge: "Popular",
    image:
      "https://noticiasangola.free.nf/wp-content/uploads/2025/04/REFNew.png",
  },
  {
    id: Paymethod.TRANSFER,
    title: "Transferência Bancária",
    desc: "Transferência direta para o banco",
    badge: "Manual",
    image:
      "https://noticiasangola.free.nf/wp-content/uploads/2025/04/REFNew.png",
  },
];

interface Props {
  value: Paymethod;
  onChange: (v: Paymethod) => void;
}

export function PaymentMethodSelector({ value, onChange }: Props) {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="grid gap-3 lg:grid-cols-2"
    >
      {methods.map((m) => (
        <Label key={m.id} className="block cursor-pointer">
          <RadioGroupItem value={m.id} id={m.id} className="peer sr-only" />

          <Card
            className={cn(
              "relative p-5 rounded-md border transition-all duration-200",
              "hover:shadow-lg hover:-translate-y-[2px]",

              // estado normal (não selecionado)
              "opacity-60 scale-[0.98]",

              // quando selecionado
              "peer-data-[state=checked]:opacity-100",
              "peer-data-[state=checked]:scale-100",
              "peer-data-[state=checked]:border-green-500",
              "peer-data-[state=checked]:bg-primary/5",
            )}
          >
            {/* badge */}
            <div className="absolute top-3 right-3">
              <Badge
                variant={"outline"}
                className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground"
              >
                {m.badge}
              </Badge>
            </div>

            <div className="flex gap-4 items-center">
              <img
                src={m.image}
                alt={m.title}
                className="w-12 h-12 object-contain"
              />

              <div className="flex flex-col">
                <span className="font-semibold">{m.title}</span>
                <span className="text-sm text-muted-foreground">{m.desc}</span>
              </div>
            </div>
          </Card>
        </Label>
      ))}
    </RadioGroup>
  );
}
