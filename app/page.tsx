import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronRight, TrendingUp, Award, CheckCircle, Shield } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
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
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full w-fit mb-4 shadow-md">
                  Premium Quality Import Export
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Premium Rice, Salt & <span className="text-primary">Gold Jewelry</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Nishat General Trading Import Export Ltd - Your trusted partner for high-quality Al Razak rice varieties, premium salts, and fine gold jewelry wholesale from around the world.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/products">
                    <Button size="lg" className="gap-1">
                      Explore Products
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[550px] aspect-square">
                  <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1507099985932-87a4520ed1d5?q=80&w=2069&auto=format&fit=crop"
                      width={550}
                      height={550}
                      alt="Rice business"
                      className="object-cover h-full w-full"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-primary rounded-full"></div>
                  <div className="absolute -top-5 -right-5 w-16 h-16 bg-primary/30 rounded-full"></div>
                </div>
              </div>
            </div>
            
            {/* Feature highlight boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: <TrendingUp className="h-5 w-5 text-primary" />,
                  title: "Quality Assurance",
                  description: "All our products meet stringent quality standards and certifications."
                },
                {
                  icon: <Award className="h-5 w-5 text-primary" />,
                  title: "Global Sourcing",
                  description: "Sourced from the finest producers across multiple countries."
                },
                {
                  icon: <Shield className="h-5 w-5 text-primary" />,
                  title: "Reliable Delivery",
                  description: "Efficient logistics for timely delivery to your business."
                }
              ].map((feature, index) => (
                <Card key={index} className="backdrop-blur-sm bg-background/70 border border-border/50">
                  <CardContent className="p-6 flex gap-4">
                    <div className="rounded-full p-2 bg-muted flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex px-3 py-1 text-sm rounded-full bg-muted">Our Products</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Premium Products</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a wide range of high-quality rice varieties, premium salts, and fine gold and jewelry for wholesale.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  title: "Al Razak Basmati Rice",
                  description: "Premium long-grain aromatic basmati rice with a distinct flavor and aroma.",
                  image: "https://images.unsplash.com/photo-1550617931-e17a7b70dce2?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Al Razak Sella Rice",
                  description: "Parboiled rice that maintains its nutritional value and has a better shelf life.",
                  image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Al Razak Steam Rice",
                  description: "Perfectly steamed rice with excellent texture and moisture retention.",
                  image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=2025&auto=format&fit=crop",
                },
                {
                  title: "Al Razak White Rice",
                  description: "Clean, polished white rice with versatile cooking applications.",
                  image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=2064&auto=format&fit=crop",
                },
                {
                  title: "Al Razak Pink Salt",
                  description: "Premium mineral-rich pink salt from the Himalayan mountains.",
                  image: "https://images.unsplash.com/photo-1517262300305-ac8ac23bc72e?q=80&w=2070&auto=format&fit=crop",
                },
                {
                  title: "Gold & Jewelry Wholesale",
                  description: "Fine gold jewelry pieces and precious stones for wholesale buyers.",
                  image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070&auto=format&fit=crop",
                },
              ].map((product, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg border bg-background transition-all hover:shadow-md">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors duration-200">{product.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                    <Link href="/products" className="mt-4 inline-flex items-center text-sm font-medium text-primary">
                      Learn more
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-12">
              <Link href="/products">
                <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 text-foreground">
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-flex px-3 py-1 text-sm rounded-full bg-background">About Us</div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Nishat General Trading <span className="text-primary">Import Export Ltd</span>
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    With years of experience in global trade, we have established ourselves as a reliable partner
                    for businesses worldwide. Our exclusive Al Razak rice brand and premium gold jewelry wholesale
                    have earned us the trust of clients across multiple continents.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {[
                    { label: "Years of Experience", value: "15+" },
                    { label: "Countries Served", value: "30+" },
                    { label: "Satisfied Clients", value: "500+" },
                    { label: "Product Varieties", value: "25+" }
                  ].map((stat, index) => (
                    <div key={index} className="bg-background/50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col gap-2 min-[400px]:flex-row mt-4">
                  <Link href="/about">
                    <Button size="lg">Learn More About Us</Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[550px] aspect-square">
                  <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src="https://images.unsplash.com/photo-1542744173-05336fcc7ad4?q=80&w=2070&auto=format&fit=crop"
                      width={550}
                      height={550}
                      alt="Global trade business"
                      className="object-cover h-full w-full"
                    />
                  </div>
                  <div className="absolute -top-5 -left-5 w-20 h-20 bg-primary/30 rounded-full"></div>
                  <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-3xl mx-auto">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose Us</h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We pride ourselves on delivering excellence in every aspect of our business.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {[
                {
                  title: "Premium Al Razak Rice",
                  description: "Our exclusive Al Razak rice brand offers superior quality in every grain, carefully sourced and processed.",
                  icon: <CheckCircle className="h-8 w-8 text-primary" />
                },
                {
                  title: "Gold & Jewelry Expertise",
                  description: "We provide fine quality gold and jewelry pieces for wholesale buyers with authentication and certification.",
                  icon: <Award className="h-8 w-8 text-primary" />
                },
                {
                  title: "Reliable Supply Chain",
                  description: "Our robust supply chain ensures timely delivery of products, even during challenging times.",
                  icon: <Shield className="h-8 w-8 text-primary" />
                },
                {
                  title: "Competitive Pricing",
                  description: "We offer competitive pricing without compromising on quality, providing excellent value.",
                  icon: <TrendingUp className="h-8 w-8 text-primary" />
                },
                {
                  title: "Global Reach",
                  description: "With an extensive network across continents, we can meet diverse market requirements.",
                  icon: <Award className="h-8 w-8 text-primary" />
                },
                {
                  title: "Customer Support",
                  description: "Our dedicated customer service team is always ready to assist with inquiries and needs.",
                  icon: <CheckCircle className="h-8 w-8 text-primary" />
                }
              ].map((feature, index) => (
                <div key={index} className="bg-muted rounded-xl p-6 text-center hover:shadow-md transition-all">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-muted mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Partner With Us?</h2>
                <p className="text-muted-foreground text-lg">
                  Contact us today to discuss how we can meet your business needs with our premium products.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <Link href="/contact">
                  <Button size="lg" className="min-w-[150px]">
                    Contact Us
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="min-w-[150px]">
                    View Products
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

