"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown, RefreshCw } from "lucide-react";
import { Product, Category } from "@/lib/products";
import { HeroImage } from "@/lib/hero";

export default function ProductsPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [visibleProductCounts, setVisibleProductCounts] = useState<Record<string, number>>({
    all: 4
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products");
        
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        
        const data = await response.json();
        setProducts(data.products);
        setCategories(data.categories);
        
        // Initialize visible counts for all categories
        const initialCounts: Record<string, number> = { all: 4 };
        data.categories.forEach((category: Category) => {
          initialCounts[category.id] = 4;
        });
        setVisibleProductCounts(initialCounts);
        
        // Set the first category as active if categories exist
        if (data.categories && data.categories.length > 0) {
          setActiveTab(data.categories[0].id);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Fetch hero images from API
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/hero?active=true&page=products");
        
        if (!response.ok) {
          throw new Error("Failed to fetch hero images");
        }
        
        const data = await response.json();
        
        if (data.heroImages && data.heroImages.length > 0) {
          // Sort by order just to be safe
          const sortedImages = data.heroImages.sort((a: HeroImage, b: HeroImage) => a.order - b.order);
          setHeroImages(sortedImages);
        } else {
          // Fallback to default image if no images found
          setHeroImages([{
            id: "default",
            title: "Our Products",
            description: "Quality products from Pakistan to the world",
            imagePath: "/herosection.png",
            isActive: true,
            order: 1,
            page: "products"
          }]);
        }
      } catch (error) {
        console.error("Error fetching hero images:", error);
        // Fallback to default image on error
        setHeroImages([{
          id: "default",
          title: "Our Products",
          description: "Quality products from Pakistan to the world",
          imagePath: "/herosection.png",
          isActive: true,
          order: 1,
          page: "products"
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Filter products by the selected category
  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(product => product.categoryId === activeTab);

  // Group products by category for display
  const productsByCategory = categories.reduce<Record<string, Product[]>>((acc, category) => {
    acc[category.id] = products.filter(product => product.categoryId === category.id);
    return acc;
  }, {});

  // Handle "See More" button click
  const handleSeeMore = (categoryId: string) => {
    setVisibleProductCounts(prev => ({
      ...prev,
      [categoryId]: filteredProducts.length // Show all products
    }));
  };

  // Get visible products for a category
  const getVisibleProducts = (categoryId: string, allProducts: Product[]) => {
    const visibleCount = visibleProductCounts[categoryId] || 4;
    return allProducts.slice(0, visibleCount);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
          {heroImages.length > 0 && heroImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image.imagePath.startsWith("http") ? image.imagePath : `/${image.imagePath}`}
                alt={image.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  {image.title}
                </h1>
                <p className="text-xl md:text-2xl text-white max-w-3xl">
                  {image.description}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="w-full py-8 md:py-12 lg:py-16 bg-muted relative overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Premium Products
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Discover our range of high-quality products sourced from the best suppliers around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-12 lg:py-16">
          <div className="container px-4 md:px-6">
            {loading ? (
              <div className="flex items-center justify-center p-12">
                <RefreshCw className="h-12 w-12 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="max-w-[700px] mx-auto text-center bg-destructive/10 p-6 rounded-md text-destructive">
                <p>{error}</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Try Again
                </Button>
              </div>
            ) : (
              <>
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="flex justify-center mb-8 overflow-x-auto pb-2 scrollbar-hide">
                    <TabsList className="grid grid-flow-col auto-cols-max gap-2">
                      <TabsTrigger value="all" className="px-4 py-2 whitespace-nowrap">All Products</TabsTrigger>
                      {categories.map((category) => (
                        <TabsTrigger key={category.id} value={category.id} className="px-4 py-2 whitespace-nowrap">
                          {category.name}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                  
                  <TabsContent value="all" className="space-y-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                      {getVisibleProducts('all', products).map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                      {/* Add empty placeholders to maintain grid alignment */}
                      {getVisibleProducts('all', products).length % 4 !== 0 && getVisibleProducts('all', products).length > 0 && getVisibleProducts('all', products).length < 4 && (
                        Array.from({ length: 4 - (getVisibleProducts('all', products).length % 4) }).map((_, index) => (
                          <div key={`placeholder-${index}`} className="hidden lg:block" />
                        ))
                      )}
                    </div>
                    {/* See More button - only show if there are more products to display */}
                    {products.length > visibleProductCounts.all && (
                      <div className="flex justify-center mt-8">
                        <Button 
                          onClick={() => handleSeeMore('all')} 
                          variant="outline"
                          className="gap-2"
                        >
                          See More <ChevronDown className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  {categories.map((category) => (
                    <TabsContent key={category.id} value={category.id} className="space-y-8">
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-fr">
                        {getVisibleProducts(category.id, productsByCategory[category.id] || []).map((product) => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                        {/* Add empty placeholders to maintain grid alignment */}
                        {getVisibleProducts(category.id, productsByCategory[category.id] || []).length % 4 !== 0 && 
                         getVisibleProducts(category.id, productsByCategory[category.id] || []).length > 0 && 
                         getVisibleProducts(category.id, productsByCategory[category.id] || []).length < 4 && (
                          Array.from({ length: 4 - (getVisibleProducts(category.id, productsByCategory[category.id] || []).length % 4) }).map((_, index) => (
                            <div key={`placeholder-${index}`} className="hidden lg:block" />
                          ))
                        )}
                      </div>
                      {/* See More button - only show if there are more products to display */}
                      {(productsByCategory[category.id]?.length || 0) > (visibleProductCounts[category.id] || 4) && (
                        <div className="flex justify-center mt-8">
                          <Button 
                            onClick={() => handleSeeMore(category.id)} 
                            variant="outline"
                            className="gap-2"
                          >
                            See More <ChevronDown className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>
              </>
            )}
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden border h-full flex flex-col transition-all hover:shadow-md">
      <div className="relative aspect-square w-full bg-muted/40 overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <CardContent className="p-4 md:p-6 flex-grow flex flex-col">
        <div className="space-y-1 flex-grow">
          <h3 className="font-bold text-base md:text-lg line-clamp-2">{product.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">{product.description}</p>
        </div>
        {product.origin && (
          <div className="mt-4 pt-4 border-t text-sm">
            <p className="flex justify-between items-center py-1">
              <span className="font-medium">Origin:</span> 
              <span>{product.origin}</span>
            </p>
            {product.packaging && (
              <p className="flex justify-between items-center py-1">
                <span className="font-medium">Packaging:</span> 
                <span className="text-right">{product.packaging}</span>
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
