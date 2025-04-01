"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function MainHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentPath, setCurrentPath] = useState("/")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    setCurrentPath(window.location.pathname)

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-40 transition-all duration-200 ${
      isScrolled 
        ? "bg-background/95 backdrop-blur-sm border-b shadow-sm" 
        : "bg-background border-b"
    }`}>
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-12 w-12 p-1.5 flex items-center justify-center rounded-full bg-background shadow-md">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent opacity-80"></div>
              <div className="absolute inset-0 rounded-full ring-1 ring-primary/30"></div>
              <img 
                src="/logo.png" 
                alt="Nishat Trading Logo" 
                className="h-8 w-8 object-contain relative z-10"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">Nishat Trading</span>
              <span className="text-xs text-muted-foreground">Premium Products</span>
            </div>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className={`font-medium transition-colors hover:text-primary ${currentPath === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
            Home
          </Link>
          <Link href="/products" className={`font-medium transition-colors hover:text-primary ${currentPath.includes('/products') ? 'text-primary' : 'text-muted-foreground'}`}>
            Products
          </Link>
          <Link href="/about" className={`font-medium transition-colors hover:text-primary ${currentPath.includes('/about') ? 'text-primary' : 'text-muted-foreground'}`}>
            About Us
          </Link>
          <Link href="/contact" className={`font-medium transition-colors hover:text-primary ${currentPath.includes('/contact') ? 'text-primary' : 'text-muted-foreground'}`}>
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Link href="/contact#contactForm">
            <Button>Get a Quote</Button>
          </Link>
        </div>
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Nishat Trading</SheetTitle>
              <SheetDescription>
                Premium Rice & Salt Export Import
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <Link href="/" className={`font-medium py-2 text-base transition-colors hover:text-primary ${currentPath === '/' ? 'text-primary' : 'text-muted-foreground'}`}>
                Home
              </Link>
              <Link href="/products" className={`font-medium py-2 text-base transition-colors hover:text-primary ${currentPath.includes('/products') ? 'text-primary' : 'text-muted-foreground'}`}>
                Products
              </Link>
              <Link href="/about" className={`font-medium py-2 text-base transition-colors hover:text-primary ${currentPath.includes('/about') ? 'text-primary' : 'text-muted-foreground'}`}>
                About Us
              </Link>
              <Link href="/contact" className={`font-medium py-2 text-base transition-colors hover:text-primary ${currentPath.includes('/contact') ? 'text-primary' : 'text-muted-foreground'}`}>
                Contact
              </Link>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <ThemeToggle />
                <Link href="/contact#contactForm">
                  <Button>Get a Quote</Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
} 