
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Layout from "@/components/layout/Layout";
import CartItem from "@/components/cart/CartItem";
import { ShoppingCart, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, total, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [tableNumber, setTableNumber] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  
  const handleCheckout = () => {
    // In a real app, we would save the order and redirect to the checkout page
    // For the MVP, we'll just simulate this
    if (!tableNumber) {
      alert("Please enter a table number");
      return;
    }
    
    // Create an order object (would be saved to a backend in a real app)
    const order = {
      items,
      tableNumber,
      specialInstructions,
      total
    };
    
    // For demo purposes, just log the order
    console.log("Order placed:", order);
    
    // Clear the cart and redirect to a thank you page
    clearCart();
    navigate("/checkout-success");
  };
  
  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-md mx-auto py-12 px-4">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={32} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{t('empty_cart')}</h1>
            <p className="text-gray-500 mb-6">Your cart is empty. Add some delicious items!</p>
            <Button 
              onClick={() => navigate('/menu')}
              className="bg-qron-primary hover:bg-qron-primary/90"
            >
              Browse Menu
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">{t('cart')}</h1>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg border p-6">
              <h2 className="text-lg font-medium mb-4">Order Items</h2>
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={item.menuItemId} item={item} />
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-lg border p-6 mt-6">
              <h2 className="text-lg font-medium mb-4">Order Details</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="table-number" className="block text-sm font-medium mb-1">
                    {t('table_number')}*
                  </label>
                  <Input
                    id="table-number"
                    placeholder="Enter your table number"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="special-instructions" className="block text-sm font-medium mb-1">
                    {t('special_instructions')} (optional)
                  </label>
                  <Textarea
                    id="special-instructions"
                    placeholder="Any special requests for your order?"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg border p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${(total * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>{t('total')}</span>
                  <span>${(total * 1.1).toFixed(2)}</span>
                </div>
              </div>
              <Button 
                className="w-full mt-6 bg-qron-primary hover:bg-qron-primary/90"
                onClick={handleCheckout}
                disabled={!tableNumber}
              >
                {t('proceed_to_checkout')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                className="w-full mt-3"
                onClick={() => navigate('/menu')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
