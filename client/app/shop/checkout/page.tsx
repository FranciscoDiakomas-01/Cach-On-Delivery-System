"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  ShoppingBag,
  CreditCard,
  Lock,
  Shield,
  User,
  MapPinMinus,
  Receipt,
} from "lucide-react";

import { Phone, Globe, MapPin, Home, Hash, Mail, FileText } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Textarea } from "@/components/ui/textarea";
import { Paymethod } from "@/types/Paymethod";
import { PaymentMethodSelector } from "@/components/PaymentMethodSelector";
import { ShopCartIcon } from "@/components/icons";

interface CartItem {
  id: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
}

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "",
    city: "",
    address: "",
    zipCode: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(false);
  const [method, setMethod] = useState<Paymethod>(Paymethod.CASH);
  const cartItems: CartItem[] = [
    {
      id: "1",
      name: "Top Coat Amon",
      size: "M",
      color: "Black",
      quantity: 1,
      price: 1320.0,
    },
    {
      id: "2",
      name: "Dress Bastet",
      size: "S",
      color: "Black",
      quantity: 1,
      price: 910.0,
    },
    {
      id: "3",
      name: "Robe Ninti",
      size: "M",
      color: "Black",
      quantity: 1,
      price: 1530.0,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = appliedPromo ? subtotal * 0.1 : 0;
  const total = subtotal - discount;
  const applyPromoCode = () => {
    if (promoCode === "LINOGE10") {
      setAppliedPromo(true);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className=" py-12">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
          Finalizar pedido
        </h1>

        <p className="scroll-m-20 opacity-70 tracking-tight mt-3 lg:max-w-md  text-sm mb-5">
          Revê os dados do teu pedido e do endereço de entrega antes de
          confirmares. Depois da confirmação, o pedido será processado
          automaticamente.
        </p>
        <div className="flex gap-5">
          <div className=" flex-1 flex flex-col gap-5">
            <Card className="p-3 gap-3 border rounded-none shadow-none">
              <span className="flex gap-2 items-center">
                <MapPinMinus />
                <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight text-balance">
                  Endereço
                </h1>
              </span>

              <p className="scroll-m-20 opacity-70 text-sm tracking-tight w-[40%]">
                Preenche os dados do endereço de entrega com atenção.
              </p>

              <div className="grid grid-cols-2 gap-5 mt-4">
                <div className="flex flex-col gap-3">
                  <Label>Nome do destinatário</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="Nome completo" />
                    <InputGroupAddon>
                      <User />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                <div className="flex flex-col gap-3">
                  <Label>Telefone</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="Número de telefone" />
                    <InputGroupAddon>
                      <Phone />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* País */}
                <div className="flex flex-col gap-3">
                  <Label>País</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="País" />
                    <InputGroupAddon>
                      <Globe />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* Província / Estado */}
                <div className="flex flex-col gap-3">
                  <Label>Província / Estado</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="Província ou estado" />
                    <InputGroupAddon>
                      <MapPin />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* Cidade */}
                <div className="flex flex-col gap-3">
                  <Label>Cidade</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="Cidade" />
                    <InputGroupAddon>
                      <MapPin />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* Distrito */}
                <div className="flex flex-col gap-3">
                  <Label>Distrito</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="Distrito (opcional)" />
                    <InputGroupAddon>
                      <MapPin />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* Rua */}
                <div className="flex flex-col gap-3">
                  <Label>Rua</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="Nome da rua" />
                    <InputGroupAddon>
                      <Home />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* Número da casa */}
                <div className="flex flex-col gap-3">
                  <Label>Número da casa</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="Número" />
                    <InputGroupAddon>
                      <Hash />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* Código Postal */}
                <div className="flex flex-col gap-3">
                  <Label>Código Postal</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="ZIP / Código postal" />
                    <InputGroupAddon>
                      <Mail />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {/* Referência */}
                <div className="flex flex-col gap-3">
                  <Label>Ponto de referência</Label>
                  <InputGroup>
                    <InputGroupInput placeholder="Ex: perto da escola, mercado..." />
                    <InputGroupAddon>
                      <FileText />
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                <div className="flex flex-col gap-3 ">
                  <Label>Instruções de entrega</Label>
                  <Textarea
                    className="resize-none"
                    placeholder="Ex: deixar com o porteiro, ligar antes de entregar..."
                  />
                </div>
              </div>

              <Separator className="my-4" />
              <h3 className="text-lg font-medium flex items-center gap-2"></h3>
              <span className="flex gap-2 items-center">
                <CreditCard />
                <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight text-balance">
                  Método de pagamento
                </h1>
              </span>

              <p className="scroll-m-20 opacity-70 text-sm tracking-tight w-[40%]">
                Selecione um método de pagamento
              </p>
              <PaymentMethodSelector
                onChange={(e) => {
                  setMethod(e);
                }}
                value={method}
              />
            </Card>
          </div>

          <div className="mr-3">
            <Card className="p-6 border rounded-none shadow-none sticky top-20 ">
              <div className="flex items-center gap-2">
                <ShopCartIcon />
                <h3 className="text-lg font-medium">Carrinho</h3>
              </div>

              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className=" text-xs">
                        Size: {item.size} | Color: {item.color} | Quantity:{" "}
                        {item.quantity}
                      </p>
                    </div>
                    <span className="font-medium">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="my-2" />
              <div className="space-y-2 mb-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promocode"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="rounded-none flex-1"
                  />
                  <Button
                    onClick={applyPromoCode}
                    variant="outline"
                    className="rounded-none"
                  >
                    Apply
                  </Button>
                </div>
                {appliedPromo && (
                  <p className="text-green-600 text-xs">
                    ✓ Coupon válido (10% desconto)
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
              <Button size={"lg"}>
                {" "}
                <ShopCartIcon /> Finalizar
              </Button>
              <div className="text-center flex justify-center flex-col items-center opacity-40 p-4 space-y-2">
                <p className="text-xs  flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  Secure payment processing
                </p>
                <p className="text-xs  flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Buyer protection guaranteed
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
