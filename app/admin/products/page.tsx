"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Edit, Plus, Trash2, RefreshCw, Filter } from "lucide-react";
import { Product, Category } from "@/lib/products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.products);
      setFilteredProducts(data.products);
      setCategories(data.categories);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.categoryId === selectedCategory));
    }
  }, [selectedCategory, products]);

  const handleDeleteProduct = async () => {
    if (!productToDelete) return;

    try {
      const response = await fetch(`/api/products/${productToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts(products.filter((product) => product.id !== productToDelete));
      setFilteredProducts(filteredProducts.filter((product) => product.id !== productToDelete));
      
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      });
    } catch (err) {
      console.error("Error deleting product:", err);
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProductToDelete(null);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category?.name || categoryId;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <div className="flex items-center gap-2">
          <Button onClick={fetchProducts} variant="outline" size="sm" className="flex-nowrap whitespace-nowrap">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/admin/products/new">
            <Button size="sm" className="flex-nowrap whitespace-nowrap">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle>Product Management</CardTitle>
              <CardDescription>
                Manage your product catalog with options to add, edit, and delete products.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="bg-destructive/10 p-4 rounded-md text-destructive">
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center p-8 text-muted-foreground">
              <p>No products found. Click the "Add Product" button to create one.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden border transition-all hover:shadow-md flex flex-col h-full">
                  <div className="relative aspect-square w-full bg-gradient-to-br from-muted/80 to-muted">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain p-4 transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <div className="space-y-2">
                      <h3 className="font-medium text-base md:text-lg line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                      <div className="pt-2 space-y-1">
                        <div className="text-sm flex items-center justify-between">
                          <span className="font-medium">Category:</span>
                          <span className="capitalize">{getCategoryName(product.categoryId)}</span>
                        </div>
                        <div className="text-sm flex items-center justify-between">
                          <span className="font-medium">Origin:</span>
                          <span>{product.origin}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <div className="p-4 pt-0 border-t mt-auto">
                    <div className="flex items-center justify-between">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-destructive border-destructive/30 hover:bg-destructive/10"
                            onClick={() => setProductToDelete(product.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete the product 
                              &quot;{product.name}&quot; from your database.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setProductToDelete(null)}>
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteProduct} className="bg-destructive text-destructive-foreground">
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </Card>
              ))}
              {/* Add empty placeholders to maintain grid alignment */}
              {filteredProducts.length % 4 !== 0 && filteredProducts.length > 4 && (
                Array.from({ length: 4 - (filteredProducts.length % 4) }).map((_, index) => (
                  <div key={`placeholder-${index}`} className="hidden lg:block" />
                ))
              )}
              {filteredProducts.length % 3 !== 0 && filteredProducts.length > 3 && (
                Array.from({ length: 3 - (filteredProducts.length % 3) }).map((_, index) => (
                  <div key={`md-placeholder-${index}`} className="hidden md:block lg:hidden" />
                ))
              )}
              {filteredProducts.length % 2 !== 0 && filteredProducts.length > 2 && (
                <div key="sm-placeholder" className="hidden sm:block md:hidden" />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
