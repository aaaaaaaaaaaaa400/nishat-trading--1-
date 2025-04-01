"use client";

import Image from "next/image";
import Link from "next/link";
import { MainHeader } from "@/components/main-header";
import { MainFooter } from "@/components/main-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Award, CheckCircle, Globe, LifeBuoy, ShieldCheck, Truck } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-muted">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-primary/20 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-full bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
            <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
            <div className="absolute -bottom-[40%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-3xl animate-pulse-slower" />
          </div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-[700px] animate-in fade-in slide-in-from-left-4 duration-700">
                    <span className="text-shimmer">Premium Quality</span> Products for Global Markets
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-left-4 duration-700 delay-200">
                    Al Razak Trading specializes in providing high-quality rice, salt, and jewelry to customers worldwide with exceptional service and competitive pricing.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
                  <Link href="/products">
                    <Button size="lg" className="px-8 w-full sm:w-auto group relative overflow-hidden">
                      <span className="relative z-10 flex items-center transition-transform duration-300 group-hover:translate-x-1">
                        Explore Products
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-primary/90 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300" />
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="px-8 w-full sm:w-auto group hover:border-primary/50 transition-all duration-300">
                      <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">Contact Us</span>
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-4 pt-4 animate-in fade-in slide-in-from-left-4 duration-700 delay-400">
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="inline-block h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center hover:scale-110 transition-transform">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div className="inline-block h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center hover:scale-110 transition-transform">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="inline-block h-8 w-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center hover:scale-110 transition-transform">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Trusted by businesses</span> in over 30 countries
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-square animate-in fade-in slide-in-from-right-4 duration-700">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent blur-2xl animate-pulse-slow" />
                  <div className="relative h-full w-full rounded-lg overflow-hidden shadow-2xl border border-primary/20 transition-all duration-500 hover:shadow-primary/20 hover:scale-[1.02]">
                    <Image
                      src="https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=2070&auto=format&fit=crop"
                      alt="Premium rice products from Al Razak Trading"
                      fill
                      priority
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/10 border border-primary/30 backdrop-blur-md rounded-lg shadow-xl flex items-center justify-center p-4 animate-float">
                    <div className="font-bold text-xl text-shimmer">Al Razak</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" className="w-full">
              <path
                fill="currentColor"
                fillOpacity="1"
                d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,69.3C1120,64,1280,32,1360,16L1440,0L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"
              ></path>
            </svg>
          </div>
        </section>

        {/* Products Preview Section */}
        <section className="w-full py-12 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-in fade-in-up">
              <div className="space-y-2 max-w-[700px]">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-2 animate-shimmer">
                  Our Product Range
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-in fade-in slide-in-from-bottom-2">
                  Premium Quality Exports
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-3 delay-150">
                  Explore our carefully curated selection of world-class products that meet the highest quality standards.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Rice Category Card */}
              <Card className="group overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg transform-gpu hover:-translate-y-1 animate-in fade-in-up delay-100">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1586201375761-83865001e8ac?q=80&w=2070&auto=format&fit=crop"
                    alt="Premium Rice Varieties"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
                </div>
                <CardContent className="p-6 space-y-4 group-hover:bg-muted/20 transition-colors duration-300">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">Premium Rice</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-3 transition-opacity duration-300 group-hover:opacity-90">
                      High-quality rice varieties including Basmati, Sella, Steam, and White Rice, sourced from the finest farms.
                    </p>
                  </div>
                  <Link href="/products" className="inline-flex items-center text-primary font-medium group-hover:underline transition-all duration-300">
                    <span className="relative">
                      Explore Rice Products
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
              
              {/* Salt Category Card */}
              <Card className="group overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg transform-gpu hover:-translate-y-1 animate-in fade-in-up delay-200">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1517262300305-ac8ac23bc72e?q=80&w=2070&auto=format&fit=crop"
                    alt="Premium Himalayan Salt"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
                </div>
                <CardContent className="p-6 space-y-4 group-hover:bg-muted/20 transition-colors duration-300">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">Himalayan Salt</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-3 transition-opacity duration-300 group-hover:opacity-90">
                      Mineral-rich pink salt from the Himalayan mountains, known for its purity and unique mineral content.
                    </p>
                  </div>
                  <Link href="/products" className="inline-flex items-center text-primary font-medium group-hover:underline transition-all duration-300">
                    <span className="relative">
                      Explore Salt Products
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
              
              {/* Jewelry Category Card */}
              <Card className="group overflow-hidden border-primary/20 hover:border-primary transition-all duration-300 hover:shadow-lg transform-gpu hover:-translate-y-1 animate-in fade-in-up delay-300">
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1573408301851-47cedcca5b36?q=80&w=2069&auto=format&fit=crop"
                    alt="Premium Gold Jewelry"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
                </div>
                <CardContent className="p-6 space-y-4 group-hover:bg-muted/20 transition-colors duration-300">
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">Gold & Jewelry</h3>
                    <p className="text-muted-foreground mt-2 line-clamp-3 transition-opacity duration-300 group-hover:opacity-90">
                      Exquisite gold jewelry and precious stones for wholesale buyers, crafted with precision and attention to detail.
                    </p>
                  </div>
                  <Link href="/products" className="inline-flex items-center text-primary font-medium group-hover:underline transition-all duration-300">
                    <span className="relative">
                      Explore Jewelry Collection
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </span>
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 animate-in fade-in-up">
              <div className="space-y-2 max-w-[700px]">
                <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary mb-2 animate-shimmer">
                  Why Choose Us
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl animate-in fade-in slide-in-from-bottom-2">
                  Global Excellence in Trading
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl animate-in fade-in slide-in-from-bottom-3 delay-150">
                  Discover the advantages of partnering with Al Razak Trading for your wholesale needs.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-background p-6 rounded-lg border border-border shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 transform-gpu hover:-translate-y-1 animate-in fade-in-up delay-100">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Distribution</h3>
                <p className="text-muted-foreground">
                  Established export network delivering products to over 30 countries with reliable logistics partners.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border border-border shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 transform-gpu hover:-translate-y-1 animate-in fade-in-up delay-150">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
                <p className="text-muted-foreground">
                  Rigorous quality control processes ensuring every product meets international standards.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border border-border shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 transform-gpu hover:-translate-y-1 animate-in fade-in-up delay-200">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Reliable Shipping</h3>
                <p className="text-muted-foreground">
                  Timely delivery with comprehensive tracking and logistics support for all shipments.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border border-border shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 transform-gpu hover:-translate-y-1 animate-in fade-in-up delay-250">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Premium Selection</h3>
                <p className="text-muted-foreground">
                  Sourcing only the finest products from trusted suppliers with decades of experience.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border border-border shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 transform-gpu hover:-translate-y-1 animate-in fade-in-up delay-300">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Certified Products</h3>
                <p className="text-muted-foreground">
                  All products come with necessary certifications and documentation for international trade.
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg border border-border shadow-sm flex flex-col items-center text-center hover:shadow-md hover:border-primary/30 hover:bg-primary/5 transition-all duration-300 transform-gpu hover:-translate-y-1 animate-in fade-in-up delay-350">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <LifeBuoy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
                <p className="text-muted-foreground">
                  Responsive customer service team available to assist with inquiries and orders 24/7.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 bg-primary/5 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-primary/5" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-primary/10 via-transparent to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary/20 blur-2xl animate-pulse-slow" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-primary/20 blur-2xl animate-pulse-slower" />
          </div>
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-in fade-in-up">
                Ready to Place a Wholesale Order?
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl max-w-[700px] mx-auto animate-in fade-in-up delay-150">
                Contact our sales team to discuss your requirements, get pricing information, and arrange international shipping.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in-up delay-300">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto group relative overflow-hidden">
                    <span className="relative z-10 flex items-center transition-transform duration-300 group-hover:translate-x-1">
                      Contact Us Now
                    </span>
                    <span className="absolute inset-0 bg-primary/90 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-300" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto shadow-sm hover:shadow hover:border-primary/50 transition-all duration-300">
                    <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">Browse Products</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slower {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0% { opacity: 0.8; }
          50% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        @keyframes text-shimmer {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .text-shimmer {
          background-image: linear-gradient(
            45deg,
            var(--primary) 25%,
            var(--primary-foreground) 50%,
            var(--primary) 75%
          );
          background-size: 200% auto;
          color: var(--primary);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: text-shimmer 4s linear infinite;
        }
      `}</style>
    </div>
  );
}
