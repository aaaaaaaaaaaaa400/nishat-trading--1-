"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, Plus, RefreshCw, FolderTree } from "lucide-react";
import { Product, Category } from "@/lib/products";

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
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
      setCategories(data.categories);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getProductCountByCategory = () => {
    const categoryCounts: Record<string, number> = {};
    
    products.forEach(product => {
      if (categoryCounts[product.categoryId]) {
        categoryCounts[product.categoryId]++;
      } else {
        categoryCounts[product.categoryId] = 1;
      }
    });
    
    return categoryCounts;
  };

  const categoryCounts = getProductCountByCategory();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button onClick={fetchData} variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Link href="/admin/products/new">
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
        
        {Object.entries(categoryCounts).map(([categoryId, count]) => (
          <Card key={categoryId}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium capitalize">{categoryId.replace('-', ' ')} Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{count}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>Manage your product categories</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="py-10 text-center text-muted-foreground">
                <p>{error}</p>
                <Button variant="outline" size="sm" onClick={fetchData} className="mt-2">
                  Try Again
                </Button>
              </div>
            ) : categories.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                <p>No categories found.</p>
                <Link href="/admin/categories/new">
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Category
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {categories.slice(0, 5).map((category) => (
                  <div key={category.id} className="flex items-center justify-between rounded-md border p-3">
                    <div className="flex items-center gap-2">
                      <FolderTree className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{category.products.length} products</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/admin/categories" className="w-full">
              <Button variant="outline" className="w-full">
                <FolderTree className="mr-2 h-4 w-4" />
                Manage Categories
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>View and edit your product listings</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="py-10 text-center text-muted-foreground">
                <p>{error}</p>
                <Button variant="outline" size="sm" onClick={fetchData} className="mt-2">
                  Try Again
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                <p>No products found.</p>
                <Link href="/admin/products/new">
                  <Button variant="outline" size="sm" className="mt-2">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Your First Product
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.slice(0, 8).map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col justify-between rounded-lg border p-4 h-full"
                  >
                    <div>
                      <div className="relative aspect-square w-full mb-3 bg-muted/30 rounded-md overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain p-2"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {product.description || "No description available"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Link href={`/admin/products/${product.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Link href="/admin/products" className="w-full">
              <Button variant="outline" className="w-full">
                View All Products
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
