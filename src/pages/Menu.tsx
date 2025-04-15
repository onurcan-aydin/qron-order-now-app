
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { MenuItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/layout/Layout";
import MenuCard from "@/components/menu/MenuCard";
import { categories, menuItems } from "@/data/mock-data";
import { Search } from "lucide-react";

export default function Menu() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(menuItems);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const tableNumber = searchParams.get("table") || "Unknown";

  useEffect(() => {
    let filtered = menuItems;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(item => item.category === activeCategory);
    }
    
    setFilteredItems(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {tableNumber !== "Unknown" && (
          <div className="mb-6 p-4 bg-qron-secondary/20 rounded-lg text-center">
            <p className="text-lg">
              {t('table_number')}: <span className="font-bold">{tableNumber}</span>
            </p>
          </div>
        )}
        
        <h1 className="text-3xl font-bold mb-8 text-center">{t('menu')}</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder={`${t('search')}...`}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              onClick={() => setSearchQuery("")}
            >
              &times;
            </Button>
          )}
        </div>
        
        {/* Categories Tabs */}
        <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
          <TabsList className="flex justify-start overflow-x-auto pb-2 mb-2">
            <TabsTrigger value="all">
              {t('all')}
            </TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {t(category.name.toLowerCase().replace(" ", "_"))}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            {searchQuery && filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500">No items found matching "{searchQuery}"</p>
                <Button 
                  variant="link" 
                  onClick={() => setSearchQuery("")}
                  className="mt-2"
                >
                  Clear search
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </TabsContent>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map(item => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
}
