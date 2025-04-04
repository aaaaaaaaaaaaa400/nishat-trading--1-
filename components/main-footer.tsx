import Link from "next/link"
import { Package, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react"

export function MainFooter() {
  return (
    <footer className="bg-muted py-12 border-t">
      <div className="container grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Package className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold tracking-tight">Nishat Trading</span>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Your trusted partner for premium rice, salt products, and fine gold jewelry wholesale. Serving businesses worldwide with quality and excellence.
          </p>
          <div className="flex space-x-3">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="text-sm text-muted-foreground hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Products</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/products#rice" className="text-sm text-muted-foreground hover:text-primary">
                Nishat Rice
              </Link>
            </li>
            <li>
              <Link href="/products#basmati" className="text-sm text-muted-foreground hover:text-primary">
                Nishat Basmati Rice
              </Link>
            </li>
            <li>
              <Link href="/products#sella" className="text-sm text-muted-foreground hover:text-primary">
                Nishat Sella Rice
              </Link>
            </li>
            <li>
              <Link href="/products#salt" className="text-sm text-muted-foreground hover:text-primary">
                Nishat Pink Salt
              </Link>
            </li>
            <li>
              <Link href="/products#gold" className="text-sm text-muted-foreground hover:text-primary">
                Gold & Jewelry
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
              <span className="text-sm text-muted-foreground">71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <Link href="tel:+447404449391" className="text-sm text-muted-foreground hover:text-primary">
                +44 7404 449391
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <Link href="mailto:sale@nishat.uk" className="text-sm text-muted-foreground hover:text-primary">
                sale@nishat.uk
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 pt-8 border-t">
        <p className="text-sm text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Nishat General Trading Import Export Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  )
}