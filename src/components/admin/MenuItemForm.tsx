
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { MenuItem, Category } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Price must be a positive number",
  }),
  category: z.string(),
  available: z.boolean(),
  image: z.string().optional(),
  allergies: z.string().optional(),
});

interface MenuItemFormProps {
  item?: MenuItem;
  categories: Category[];
  onSubmit: (data: MenuItem) => void;
  onCancel: () => void;
}

export default function MenuItemForm({ 
  item, 
  categories, 
  onSubmit, 
  onCancel 
}: MenuItemFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: item?.name || "",
      description: item?.description || "",
      price: item ? item.price.toString() : "",
      category: item?.category || "",
      available: item?.available !== undefined ? item.available : true,
      image: item?.image || "",
      allergies: item?.allergies ? item.allergies.join(", ") : "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const formattedData: MenuItem = {
        id: item?.id || crypto.randomUUID(),
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        category: values.category,
        available: values.available,
        image: values.image || undefined,
        allergies: values.allergies ? values.allergies.split(",").map(a => a.trim()) : undefined,
      };
      
      onSubmit(formattedData);
      toast({
        title: item ? "Item updated" : "Item created",
        description: `${values.name} has been ${item ? "updated" : "added"} successfully!`,
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Item name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Item description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price ($)</FormLabel>
                <FormControl>
                  <Input placeholder="0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormDescription>
                Enter a URL for the item image
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="allergies"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Allergies</FormLabel>
              <FormControl>
                <Input placeholder="Gluten, Dairy, Nuts" {...field} />
              </FormControl>
              <FormDescription>
                Comma-separated list of allergens
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="available"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Available</FormLabel>
                <FormDescription>
                  Mark this item as available for ordering
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : (item ? "Update Item" : "Add Item")}
          </Button>
        </div>
      </form>
    </Form>
  );
}
