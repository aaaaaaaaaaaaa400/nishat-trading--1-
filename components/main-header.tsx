"use client"

import Link from "next/link"
import { Package } from "lucide-react"
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

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
          <Link href="/" className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tight">Nishat Trading</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="font-medium text-muted-foreground transition-colors hover:text-primary">
            Products
          </Link>
          <Link href="/about" className="font-medium text-muted-foreground transition-colors hover:text-primary">
            About Us
          </Link>
          <Link href="/contact" className="font-medium text-muted-foreground transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button>Get a Quote</Button>
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
              <Link href="/" className="font-medium py-2 text-base transition-colors hover:text-primary">
                Home
              </Link>
              <Link href="/products" className="font-medium py-2 text-base text-muted-foreground transition-colors hover:text-primary">
                Products
              </Link>
              <Link href="/about" className="font-medium py-2 text-base text-muted-foreground transition-colors hover:text-primary">
                About Us
              </Link>
              <Link href="/contact" className="font-medium py-2 text-base text-muted-foreground transition-colors hover:text-primary">
                Contact
              </Link>
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <ThemeToggle />
                <Button>Get a Quote</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
} 