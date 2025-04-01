import Link from "next/link"
import Image from "next/image"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
          image: "/basmati.png",
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
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
            <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-primary/20 to-transparent rounded-full"></div>
            <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-primary/20 to-transparent rounded-full"></div>
          </div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Products</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed">
                  Discover our exclusive Al Razak rice varieties, premium Al Razak Pink Salt, and fine gold jewelry for wholesale.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
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
                        <div className={`relative aspect-square w-full ${
                          category.id === "rice" 
                            ? "bg-gradient-to-br from-orange-300 via-amber-200 to-orange-300" 
                            : category.id === "salt"
                            ? "bg-gradient-to-br from-pink-300 via-rose-200 to-pink-300"
                            : "bg-gradient-to-br from-amber-300 via-yellow-200 to-amber-300"
                        }`}>
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-contain p-4 transition-transform hover:scale-105"
                            style={{ objectFit: "contain" }}
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
  )
}

