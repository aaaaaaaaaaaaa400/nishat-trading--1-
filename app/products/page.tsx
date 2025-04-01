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

export default function ProductsPage() {
  const productCategories = [
    {
      id: "rice",
      name: "Al Razak Rice",
      products: [
        {
          id: "basmati",
          name: "Al Razak Basmati Rice",
          description: "Premium long-grain aromatic basmati rice with a distinct flavor and aroma.",
          image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2065&auto=format&fit=crop",
          origin: "Pakistan",
          packaging: "25kg, 50kg bags",
        },
        {
          id: "sella",
          name: "Al Razak Sella Rice",
          description: "Parboiled rice that maintains its nutritional value and has a better shelf life.",
          image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?q=80&w=2070&auto=format&fit=crop",
          origin: "Pakistan",
          packaging: "25kg, 50kg bags",
        },
        {
          id: "steam",
          name: "Al Razak Steam Rice",
          description: "Perfectly steamed rice with excellent texture and moisture retention.",
          image: "https://images.unsplash.com/photo-1567927755466-2e6b0e81c9a6?q=80&w=1974&auto=format&fit=crop",
          origin: "Pakistan",
          packaging: "25kg, 50kg bags",
        },
        {
          id: "white",
          name: "Al Razak White Rice",
          description: "Clean, polished white rice with versatile cooking applications.",
          image: "https://images.unsplash.com/photo-1571751239016-43a5122ea413?q=80&w=1974&auto=format&fit=crop",
          origin: "Pakistan",
          packaging: "25kg, 50kg, 100kg bags",
        },
      ],
    },
    {
      id: "salt",
      name: "Premium Salt",
      products: [
        {
          id: "pink-salt",
          name: "Al Razak Pink Salt",
          description:
            "Premium mineral-rich pink salt from the Himalayan mountains with trace minerals and a distinctive color.",
          image: "https://images.unsplash.com/photo-1660650737271-7c292a646922?q=80&w=2070&auto=format&fit=crop",
          origin: "Pakistan",
          packaging: "1kg, 5kg, 25kg bags",
        },
      ],
    },
    {
      id: "gold",
      name: "Gold & Jewelry",
      products: [
        {
          id: "gold-jewelry",
          name: "Gold Jewelry Wholesale",
          description: "Fine gold jewelry pieces and precious stones for wholesale buyers.",
          image: "https://images.unsplash.com/photo-1573408301851-47cedcca5b36?q=80&w=2069&auto=format&fit=crop",
          origin: "Various",
          packaging: "Custom packaging available",
        },
        {
          id: "gold-ornaments",
          name: "Gold Ornaments",
          description: "Exquisite gold ornaments crafted with precision and attention to detail.",
          image: "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop",
          origin: "Various",
          packaging: "Custom packaging available",
        },
        {
          id: "precious-stones",
          name: "Precious Stones",
          description: "High-quality precious stones and gems for jewelry manufacturing.",
          image: "https://images.unsplash.com/photo-1511797663913-0fa4736d0d9f?q=80&w=2069&auto=format&fit=crop",
          origin: "Various",
          packaging: "Secure packaging with certification",
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1">
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
            <Tabs defaultValue="rice" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                {productCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {productCategories.map((category) => (
                <TabsContent key={category.id} value={category.id} className="pt-4">
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {category.products.map((product) => (
                      <Card key={product.id} className="overflow-hidden border border-border/50 transition-all hover:shadow-md">
                        <div className="relative aspect-square w-full">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform hover:scale-105"
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="space-y-3">
                            <h3 className="font-bold text-xl">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                            <div className="pt-3 space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Origin:</span>
                                <span>{product.origin}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="font-medium">Packaging:</span>
                                <span>{product.packaging}</span>
                              </div>
                            </div>
                            <div className="pt-4">
                              <Link href="/contact">
                                <Button className="w-full">
                                  Get a Quote
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
            
            <div className="mt-20 text-center">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">Interested in Our Products?</h2>
                <p className="text-muted-foreground mb-8">
                  Contact us today to discuss your wholesale requirements, pricing, and shipping options.
                </p>
                <Link href="/contact">
                  <Button size="lg">
                    Contact Our Sales Team
                  </Button>
                </Link>
              </div>
            </div>
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
