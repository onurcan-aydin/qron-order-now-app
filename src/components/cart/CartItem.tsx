
import { OrderItem } from "@/types";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: OrderItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { t } = useLanguage();

  const handleIncrease = () => {
    updateQuantity(item.menuItemId, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.menuItemId, item.quantity - 1);
    } else {
      removeFromCart(item.menuItemId);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.menuItemId);
  };

  return (
    <div className="flex items-center justify-between py-4 border-b">
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} × {item.quantity}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center border rounded-md">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none rounded-l-md"
            onClick={handleDecrease}
          >
            <Minus size={16} />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-none rounded-r-md"
            onClick={handleIncrease}
          >
            <Plus size={16} />
          </Button>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleRemove}
        >
          <Trash2 size={16} />
        </Button>
      </div>
      <div className="ml-4 min-w-20 text-right">
        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>
  );
}
