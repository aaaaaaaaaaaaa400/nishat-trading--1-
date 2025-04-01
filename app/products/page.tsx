import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductsPage() {
  const riceCategories = [
    {
      id: "premium",
      name: "Premium Rice",
      products: [
        {
          id: "basmati",
          name: "Basmati Rice",
          description: "Premium long-grain aromatic rice with a distinct flavor and aroma.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "India & Pakistan",
          packaging: "25kg, 50kg bags",
        },
        {
          id: "jasmine",
          name: "Jasmine Rice",
          description: "Fragrant, long-grain rice with a subtle floral aroma and soft texture.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "Thailand",
          packaging: "25kg, 50kg bags",
        },
        {
          id: "sushi",
          name: "Sushi Rice",
          description: "Short-grain rice with high starch content, perfect for sushi and Asian cuisine.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "Japan",
          packaging: "25kg bags",
        },
      ],
    },
    {
      id: "standard",
      name: "Standard Rice",
      products: [
        {
          id: "long-grain",
          name: "Long Grain White Rice",
          description: "Versatile long-grain rice suitable for a wide range of dishes.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "Various",
          packaging: "25kg, 50kg, 100kg bags",
        },
        {
          id: "parboiled",
          name: "Parboiled Rice",
          description: "Partially boiled rice in the husk, offering better nutritional value.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "Various",
          packaging: "25kg, 50kg bags",
        },
        {
          id: "broken",
          name: "Broken Rice",
          description: "Fractured rice grains, ideal for industrial use and animal feed.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "Various",
          packaging: "50kg, 100kg bags",
        },
      ],
    },
    {
      id: "specialty",
      name: "Specialty Rice",
      products: [
        {
          id: "brown",
          name: "Brown Rice",
          description: "Whole grain rice with the bran layer intact, offering more nutrients.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "Various",
          packaging: "25kg bags",
        },
        {
          id: "black",
          name: "Black Rice",
          description: "Exotic rice variety with a deep black color and nutty flavor.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "China & Thailand",
          packaging: "10kg, 25kg bags",
        },
        {
          id: "red",
          name: "Red Rice",
          description: "Distinctive red rice with a unique flavor and high nutritional value.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "Bhutan & Himalayan Region",
          packaging: "10kg, 25kg bags",
        },
      ],
    },
    {
      id: "salt",
      name: "Premium Salt",
      products: [
        {
          id: "pink-salt",
          name: "Himalayan Pink Salt",
          description:
            "Premium mineral-rich pink salt from the Himalayan mountains with trace minerals and a distinctive color.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "Pakistan",
          packaging: "1kg, 5kg, 25kg bags",
        },
        {
          id: "sea-salt",
          name: "Natural Sea Salt",
          description: "Pure sea salt harvested from pristine ocean waters, perfect for culinary applications.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "Various",
          packaging: "1kg, 5kg, 25kg bags",
        },
        {
          id: "black-salt",
          name: "Kala Namak (Black Salt)",
          description: "Distinctive sulfurous salt used in South Asian cuisine with unique flavor properties.",
          image: "/placeholder.svg?height=300&width=300",
          origin: "India",
          packaging: "1kg, 5kg bags",
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-40 bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
                <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" />
                <line x1="12" x2="12" y1="22" y2="13" />
                <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5" />
              </svg>
              <span className="text-xl font-bold">Nishat Trading</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="font-medium transition-colors hover:text-primary">
              Products
            </Link>
            <Link href="/about" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              About Us
            </Link>
            <Link href="/contact" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Contact
            </Link>
          </nav>
          <div className="hidden md:block">
            <Button>Get a Quote</Button>
          </div>
          <button className="flex items-center justify-center rounded-md p-2 md:hidden">
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Products</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our extensive range of high-quality rice varieties and premium salts sourced from around the
                  world.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="premium" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                {riceCategories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id}>
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
              {riceCategories.map((category) => (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {category.products.map((product) => (
                      <Card key={product.id} className="overflow-hidden">
                        <div className="aspect-square relative">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="space-y-2">
                            <h3 className="font-bold text-xl">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">{product.description}</p>
                            <div className="pt-2">
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
                                <Button variant="outline" className="w-full">
                                  Request Quote
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
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Custom Orders</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't see what you're looking for? We can source specific products to meet your requirements.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/contact">
                  <Button size="lg">Contact Our Team</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-background">
        <div className="container flex flex-col gap-6 py-8 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M20.91 8.84 8.56 2.23a1.93 1.93 0 0 0-1.81 0L3.1 4.13a2.12 2.12 0 0 0-.05 3.69l12.22 6.93a2 2 0 0 0 1.94 0L21 12.51a2.12 2.12 0 0 0-.09-3.67Z" />
                <path d="m3.09 8.84 12.35-6.61a1.93 1.93 0 0 1 1.81 0l3.65 1.9a2.12 2.12 0 0 1 .1 3.69L8.73 14.75a2 2 0 0 1-1.94 0L3 12.51a2.12 2.12 0 0 1 .09-3.67Z" />
                <line x1="12" x2="12" y1="22" y2="13" />
                <path d="M20 13.5v3.37a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13.5" />
              </svg>
              <span className="text-lg font-bold">Nishat General Trading Import Export Ltd</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your trusted partner for premium rice import and export solutions.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:flex-row md:gap-4">
            <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Products
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Nishat General Trading Import Export Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

