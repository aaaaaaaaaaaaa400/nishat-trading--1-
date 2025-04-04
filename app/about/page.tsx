"use client";

import { useEffect, useState } from "react";
import Link from "next/link"
import Image from "next/image"
import { Award, Users, Globe, TrendingUp, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"
import { HeroImage } from "@/lib/hero"

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);

  const milestones = [
    {
      year: "2005",
      title: "Company Founded",
      description: "Nishat General Trading was established in London as a small trading company focused on premium agricultural products.",
    },
    {
      year: "2008",
      title: "First International Office",
      description: "Opened our first international office in Pakistan to strengthen sourcing capabilities for Al Razak rice varieties.",
    },
    {
      year: "2012",
      title: "Expansion to Asia",
      description: "Established presence in multiple Asian countries to expand our rice sourcing network.",
    },
    {
      year: "2015",
      title: "Product Diversification",
      description: "Added Al Razak Pink Salt to our product portfolio from the Himalayan mountains of Pakistan.",
    },
    {
      year: "2018",
      title: "Gold & Jewelry Business",
      description: "Expanded into gold and jewelry wholesale business to diversify our premium product offerings.",
    },
    {
      year: "2022",
      title: "Sustainable Practices Initiative",
      description: "Launched company-wide sustainability program focusing on responsible sourcing and ethical trade practices.",
    },
  ]

  useEffect(() => {
    // Fetch hero images from API
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/hero?active=true&page=about");
        
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
            title: "About Us",
            description: "Learn more about Nishat Trading",
            imagePath: "/herosection.png",
            isActive: true,
            order: 1,
            page: "about"
          }]);
        }
      } catch (error) {
        console.error("Error fetching hero images:", error);
        // Fallback to default image on error
        setHeroImages([{
          id: "default",
          title: "About Us",
          description: "Learn more about Nishat Trading",
          imagePath: "/herosection.png",
          isActive: true,
          order: 1,
          page: "about"
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
                src={image.imagePath.startsWith("http") || image.imagePath.startsWith("/") 
                    ? image.imagePath 
                    : `/${image.imagePath}`}
                alt={image.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  About Us
                </h1>
                <p className="text-xl md:text-2xl text-white max-w-3xl">
                  Learn more about Nishat Trading
                </p>
              </div>
            </div>
          ))}
        </section>
        
        {/* About Content */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-12">
                <TabsTrigger value="story">Our Story</TabsTrigger>
                <TabsTrigger value="mission">Mission & Values</TabsTrigger>
                <TabsTrigger value="policy">Our Policy</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-[550px] aspect-square">
                      <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
                        <Image
                          src="/ourstory.png"
                          width={550}
                          height={550}
                          alt="Company headquarters"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-primary rounded-full"></div>
                      <div className="absolute -top-5 -right-5 w-16 h-16 bg-primary/30 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Journey</h2>
                      <p className="text-muted-foreground">
                        Nishat General Trading Import Export Ltd was established in London in 2005 with a vision to become a
                        leading player in the global premium agricultural trade. What started as a small trading company has grown
                        into a respected name in the international market for Al Razak rice varieties, premium salts, and fine gold jewelry.
                      </p>
                      <p className="text-muted-foreground">
                        Our journey began with a simple mission: to connect quality producers with businesses worldwide,
                        ensuring fair trade practices and maintaining the highest quality standards. Today, we operate
                        across multiple continents, serving clients ranging from small businesses to large-scale
                        distributors.
                      </p>
                      <p className="text-muted-foreground">
                        With our headquarters in London and operational offices in key producing regions, we have built a
                        robust network that allows us to source the finest Al Razak rice varieties, premium Al Razak Pink Salt, and
                        exquisite gold jewelry for our wholesale clients worldwide.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tighter">Our Milestones</h3>
                  <div className="relative border-l border-primary/20 pl-8 ml-4">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="mb-10 relative">
                        <div className="absolute -left-[41px] flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                          {milestone.year.substring(2)}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-lg font-semibold">
                            {milestone.year} - {milestone.title}
                          </h4>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mission" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Mission</h2>
                      <p className="text-muted-foreground">
                        At Nishat General Trading, our mission is to bridge the gap between premium agricultural
                        producers and global markets, ensuring that businesses worldwide have access to the highest
                        quality Al Razak rice varieties, Al Razak Pink Salt, and fine gold jewelry while supporting sustainable practices and fair trade.
                      </p>
                      <h3 className="text-2xl font-bold mt-6">Our Vision</h3>
                      <p className="text-muted-foreground">
                        To be the most trusted global partner in premium agricultural and jewelry trade, recognized for our
                        commitment to quality, sustainability, and exceptional service.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-[550px] aspect-square">
                      <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
                        <Image
                          src="/bags.jpg"
                          width={550}
                          height={550}
                          alt="Company mission"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="absolute -top-5 -left-5 w-20 h-20 bg-primary/30 rounded-full"></div>
                      <div className="absolute -bottom-5 -right-5 w-16 h-16 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <Award className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Quality Excellence</h3>
                      <p className="text-muted-foreground">
                        We are committed to providing the highest quality products that meet international standards and
                        exceed customer expectations.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <Users className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Trust & Reliability</h3>
                      <p className="text-muted-foreground">
                        Building long-term relationships based on trust, transparency, and consistent delivery of our
                        promises.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                        <Leaf className="h-10 w-10 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">Sustainable Practices</h3>
                      <p className="text-muted-foreground">
                        Promoting environmentally responsible farming and trading practices throughout our supply chain.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="policy" className="space-y-8">
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Policies</h2>
                  <p className="text-muted-foreground max-w-[800px] mx-auto">
                    At Nishat Trading, we are committed to upholding the highest standards of business practices, quality control, and ethical responsibility.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center mb-10">
                  <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-[550px] aspect-square">
                      <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
                        <Image
                          src="/quality.jpg"
                          width={550}
                          height={550}
                          alt="Quality assurance"
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="absolute -bottom-5 -left-5 w-20 h-20 bg-primary rounded-full"></div>
                      <div className="absolute -top-5 -right-5 w-16 h-16 bg-primary/30 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold">Quality Assurance</h3>
                      <p className="text-muted-foreground">
                        Every product we offer undergoes rigorous quality control checks at multiple stages. From sourcing to delivery, we maintain stringent standards to ensure our customers receive only the finest products. Our Al Razak rice varieties, Pink Salt, and jewelry items are carefully inspected to meet international quality benchmarks.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <Card className="bg-background shadow-md">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-bold border-b pb-2">Ethical Sourcing</h3>
                      <p className="text-muted-foreground">
                        We partner with farmers and suppliers who adhere to fair labor practices and ethical standards. Our sourcing team regularly visits production sites to ensure compliance with our ethical guidelines and to maintain transparency throughout our supply chain.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background shadow-md">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-bold border-b pb-2">Environmental Responsibility</h3>
                      <p className="text-muted-foreground">
                        Sustainability is at the core of our operations. We actively promote eco-friendly agricultural practices, minimize waste in our packaging, and continuously work to reduce our carbon footprint through optimized logistics and sustainable operations.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background shadow-md">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-bold border-b pb-2">Customer Commitment</h3>
                      <p className="text-muted-foreground">
                        We believe in building lasting relationships with our customers through transparency, reliability, and exceptional service. Our flexible approach allows us to accommodate specific requirements, and we maintain open communication throughout the business relationship.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-background shadow-md">
                    <CardContent className="p-6 space-y-4">
                      <h3 className="text-xl font-bold border-b pb-2">Compliance & Standards</h3>
                      <p className="text-muted-foreground">
                        We strictly adhere to international trade regulations, food safety standards, and quality certifications relevant to our product lines. Our documentation and processes are designed to ensure smooth customs clearance and regulatory compliance in all markets we serve.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex justify-center">
              <Card className="max-w-2xl w-full bg-primary/5 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-2xl font-bold text-center">Our Headquarters</h3>
                    <p className="text-muted-foreground text-center text-lg">
                      71-75 Shelton Street, Covent Garden<br />
                      London, United Kingdom<br />
                      WC2H 9JQ
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Partner With Us</h2>
                <p className="text-muted-foreground text-lg">
                  Join the many businesses worldwide that trust Nishat General Trading for their premium product needs.
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

