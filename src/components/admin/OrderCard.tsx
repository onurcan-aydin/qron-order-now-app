
import { useState } from "react";
import { Order, OrderStatus, PaymentStatus } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp } from "lucide-react";

interface OrderCardProps {
  order: Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

export default function OrderCard({ order, updateOrderStatus }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState<OrderStatus>(order.status);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleStatusChange = (newStatus: string) => {
    const typedStatus = newStatus as OrderStatus;
    setStatus(typedStatus);
    updateOrderStatus(order.id, typedStatus);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.PENDING:
        return "bg-yellow-500 text-white";
      case OrderStatus.CONFIRMED:
        return "bg-blue-500 text-white";
      case OrderStatus.PREPARING:
        return "bg-indigo-500 text-white";
      case OrderStatus.READY:
        return "bg-green-500 text-white";
      case OrderStatus.DELIVERED:
        return "bg-emerald-500 text-white";
      case OrderStatus.COMPLETED:
        return "bg-slate-500 text-white";
      case OrderStatus.CANCELLED:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return "bg-green-500 text-white";
      case PaymentStatus.PENDING:
        return "bg-yellow-500 text-white";
      case PaymentStatus.FAILED:
        return "bg-red-500 text-white";
      case PaymentStatus.REFUNDED:
        return "bg-purple-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">Order #{order.id}</CardTitle>
            <CardDescription>
              Table {order.tableNumber} · {formatDistanceToNow(order.createdAt, { addSuffix: true })}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge className={getStatusColor(status)}>
              {status}
            </Badge>
            <Badge className={getPaymentStatusColor(order.paymentStatus)}>
              {order.paymentStatus}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex justify-between">
          <p className="font-medium">{order.items.length} items</p>
          <p className="font-bold">${order.total.toFixed(2)}</p>
        </div>
        {expanded && (
          <div className="mt-4 space-y-3">
            <div className="border-t pt-3">
              <h4 className="font-medium mb-2">Order Items</h4>
              <ul className="space-y-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}× {item.name}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
            {order.specialInstructions && (
              <div className="border-t pt-3">
                <h4 className="font-medium mb-1">Special Instructions</h4>
                <p className="text-sm text-muted-foreground">{order.specialInstructions}</p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="ghost" size="sm" onClick={toggleExpand}>
          {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          {expanded ? "Show Less" : "Show Details"}
        </Button>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {Object.values(OrderStatus).map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  );
}
