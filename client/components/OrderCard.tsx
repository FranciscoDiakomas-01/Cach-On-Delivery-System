import Order from "@/types/Order";
import { OrderStatus } from "@/types/OrderStatus";

import {
  MoreHorizontal,
  Eye,
  Truck,
  CheckCircle,
  XCircle,
  Package,
  PiggyBank,
  RefreshCw,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Card } from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

function getStatusBadge(status: OrderStatus) {
  const config = {
    PENDING: "bg-yellow-500/10 text-yellow-500",
    PROCESSING: "bg-blue-500/10 text-blue-500",
    DELIVERED: "bg-green-500/10 text-green-500",
    CANCELLED: "bg-red-500/10 text-red-500",
    REFUNDED: "bg-purple-500/10 text-purple-500",
    EXPIRED: "bg-gray-500/10 text-gray-500",
  };

  return (
    <Badge variant="outline" className={`rounded-sm ${config[status]}`}>
      {status}
    </Badge>
  );
}

export default function OrderCard({ order }: { order: Order }) {
  const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
    PENDING: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    PROCESSING: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
    DELIVERED: [OrderStatus.REFUNDED],
    CANCELLED: [OrderStatus.REFUNDED],

    REFUNDED: [],
    EXPIRED: [],
  };
  const statusActions = {
    PENDING: [
      { status: OrderStatus.PROCESSING, label: "Processar", icon: CheckCircle },
      { status: OrderStatus.CANCELLED, label: "Cancelar", icon: XCircle },
    ],

    PROCESSING: [
      { status: OrderStatus.DELIVERED, label: "Finalizar", icon: Package },
      { status: OrderStatus.CANCELLED, label: "Cancelar", icon: XCircle },
    ],

    DELIVERED: [
      { status: OrderStatus.REFUNDED, label: "Reembolsar", icon: RefreshCw },
    ],

    CANCELLED: [],
    REFUNDED: [],
    EXPIRED: [],
  };
  const canChangeTo = (current: OrderStatus, target: OrderStatus) => {
    return allowedTransitions[current]?.includes(target);
  };
  const actions = statusActions[order.status] ?? [];
  return (
    <Card key={order.id} className="p-4 flex flex-col gap-3">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <span className="font-semibold">#{order.id}</span>
        {getStatusBadge(order.status)}
      </div>

      {/* CUSTOMER */}
      <div className="text-sm">
        <p className="font-medium">
          {order.customer.firstName} {order.customer.lastName}
        </p>
        <p className="text-muted-foreground">{order.customer.email}</p>
      </div>

      {/* PRICE */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Subtotal: {order.subtotal} kz
        </span>
        <span className="font-bold text-lg">{order.total} kz</span>
      </div>

      {/* ADDRESS */}
      <div className="text-xs text-muted-foreground">
        {order.address.city}, {order.address.street}
      </div>

      {/* META */}
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{order.cart.items.length} itens</span>
        <span>{new Date(order.createdAt).toLocaleDateString("pt-PT")}</span>
      </div>

      {/* ACTIONS */}
      <div className="flex justify-between items-center pt-2">
        <Badge variant="outline">{order.paymentMethod}</Badge>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="w-4 h-4 mr-2" />
              Detalhes
            </DropdownMenuItem>

            {actions.map((action) => {
              const Icon = action.icon;
              const disabled = !canChangeTo(order.status, action.status);

              return (
                <DropdownMenuItem
                  key={action.status}
                  disabled={disabled}
                  onSelect={(e) => {
                    if (disabled) {
                      e.preventDefault();
                      return;
                    }

                    console.log("mudar status para:", action.status);
                  }}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {action.label}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
}
