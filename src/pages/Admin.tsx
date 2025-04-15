
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import MenuItemForm from "@/components/admin/MenuItemForm";
import OrderCard from "@/components/admin/OrderCard";
import QRCodeGenerator from "@/components/admin/QRCodeGenerator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MenuItem, OrderStatus } from "@/types";
import { menuItems, categories, orders, restaurant } from "@/data/mock-data";
import { PlusCircle } from "lucide-react";

export default function Admin() {
  const [localMenuItems, setLocalMenuItems] = useState<MenuItem[]>(menuItems);
  const [localOrders, setLocalOrders] = useState(orders);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | undefined>(undefined);

  const handleAddMenuItem = (newItem: MenuItem) => {
    setLocalMenuItems(prev => [...prev, newItem]);
    setDialogOpen(false);
  };

  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setLocalMenuItems(prev => 
      prev.map(item => item.id === updatedItem.id ? updatedItem : item)
    );
    setDialogOpen(false);
    setEditingItem(undefined);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setLocalMenuItems(prev => prev.filter(item => item.id !== itemId));
    }
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setLocalOrders(prev => 
      prev.map(order => order.id === orderId ? { ...order, status } : order)
    );
  };

  const handleEditMenuItem = (item: MenuItem) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingItem(undefined);
  };

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-qron-primary hover:bg-qron-primary/90">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Menu Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
              </DialogHeader>
              <MenuItemForm 
                item={editingItem}
                categories={categories}
                onSubmit={editingItem ? handleUpdateMenuItem : handleAddMenuItem}
                onCancel={handleCloseDialog}
              />
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="w-full grid grid-cols-3 mb-8">
            <TabsTrigger value="menu">Menu Management</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="qr-codes">QR Codes</TabsTrigger>
          </TabsList>

          <TabsContent value="menu">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {localMenuItems.map(item => (
                <div key={item.id} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {item.image && (
                    <div className="relative h-48">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                      {!item.available && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white py-1 px-2 rounded text-xs">
                          Out of Stock
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
                    <p className="font-medium">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center mt-4 justify-between">
                      <span className="text-sm text-gray-500">
                        {categories.find(c => c.id === item.category)?.name}
                      </span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditMenuItem(item)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDeleteMenuItem(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {localOrders.length > 0 ? (
                localOrders.map(order => (
                  <OrderCard 
                    key={order.id} 
                    order={order} 
                    updateOrderStatus={updateOrderStatus}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-lg text-gray-500">No orders yet</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="qr-codes">
            <QRCodeGenerator restaurantId={restaurant.id} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
