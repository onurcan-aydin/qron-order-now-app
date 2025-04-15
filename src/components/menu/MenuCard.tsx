
import { MenuItem } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MinusCircle, PlusCircle } from "lucide-react";

interface MenuCardProps {
  item: MenuItem;
}

export default function MenuCard({ item }: MenuCardProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(item, quantity);
    setQuantity(1);
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
      {item.image && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
          {!item.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg py-2 px-4">Out of Stock</Badge>
            </div>
          )}
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{item.name}</CardTitle>
        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
        {item.allergies && item.allergies.length > 0 && (
          <div className="mt-2">
            <p className="text-xs text-muted-foreground mb-1">{t('allergies')}:</p>
            <div className="flex flex-wrap gap-1">
              {item.allergies.map(allergy => (
                <Badge key={allergy} variant="outline" className="text-xs">
                  {allergy}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        {item.available ? (
          <div className="w-full">
            <div className="flex justify-between items-center mb-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={decreaseQuantity}
                className="h-8 w-8"
              >
                <MinusCircle size={16} />
              </Button>
              <span className="font-medium">{quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={increaseQuantity}
                className="h-8 w-8"
              >
                <PlusCircle size={16} />
              </Button>
            </div>
            <Button 
              className="w-full bg-qron-primary hover:bg-qron-primary/90"
              onClick={handleAdd}
            >
              {t('addToCart')}
            </Button>
          </div>
        ) : (
          <Button disabled className="w-full">
            Out of Stock
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
