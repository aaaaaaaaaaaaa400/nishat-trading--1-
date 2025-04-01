import Link from "next/link"
import Image from "next/image"
import { Package2, Award, Users, Globe, TrendingUp, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function AboutPage() {
  const milestones = [
    {
      year: "2005",
      title: "Company Founded",
      description: "Nishat General Trading was established in Dubai as a small trading company.",
    },
    {
      year: "2008",
      title: "First International Office",
      description: "Opened our first international office in Mumbai, India to strengthen sourcing capabilities.",
    },
    {
      year: "2012",
      title: "Expansion to Southeast Asia",
      description: "Established presence in Thailand to tap into the premium rice market.",
    },
    {
      year: "2015",
      title: "Product Diversification",
      description: "Added premium salts to our product portfolio, including Himalayan Pink Salt.",
    },
    {
      year: "2018",
      title: "European Market Entry",
      description: "Expanded distribution network to European markets.",
    },
    {
      year: "2022",
      title: "Sustainable Practices Initiative",
      description: "Launched company-wide sustainability program focusing on responsible sourcing.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b sticky top-0 z-40 bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Package2 className="h-6 w-6" />
              <span className="text-xl font-bold">Nishat Trading</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/products" className="font-medium text-muted-foreground transition-colors hover:text-primary">
              Products
            </Link>
            <Link href="/about" className="font-medium transition-colors hover:text-primary">
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Nishat General Trading</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Your trusted partner in global rice and premium salt trade since 2005.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="story" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="story">Our Story</TabsTrigger>
                <TabsTrigger value="mission">Mission & Values</TabsTrigger>
                <TabsTrigger value="team">Our Team</TabsTrigger>
                <TabsTrigger value="global">Global Presence</TabsTrigger>
              </TabsList>

              <TabsContent value="story" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                  <div className="flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=550&width=550"
                      width={550}
                      height={550}
                      alt="Company headquarters"
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Journey</h2>
                      <p className="text-muted-foreground">
                        Nishat General Trading Import Export Ltd was established in 2005 with a vision to become a
                        leading player in the global rice trade. What started as a small trading company has now grown
                        into a respected name in the international market for premium agricultural products.
                      </p>
                      <p className="text-muted-foreground">
                        Our journey began with a simple mission: to connect quality producers with businesses worldwide,
                        ensuring fair trade practices and maintaining the highest quality standards. Today, we operate
                        across multiple continents, serving clients ranging from small businesses to large-scale
                        distributors.
                      </p>
                      <p className="text-muted-foreground">
                        With our headquarters in Dubai and operational offices in key producing regions, we have built a
                        robust network that allows us to source the finest rice varieties and premium salts and deliver
                        them efficiently to our global clientele.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tighter">Our Milestones</h3>
                  <div className="relative border-l border-muted pl-8 ml-4">
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
                        quality rice and salt products while supporting sustainable farming practices and fair trade.
                      </p>
                      <h3 className="text-2xl font-bold mt-6">Our Vision</h3>
                      <p className="text-muted-foreground">
                        To be the most trusted global partner in premium agricultural trade, recognized for our
                        commitment to quality, sustainability, and exceptional service.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=550&width=550"
                      width={550}
                      height={550}
                      alt="Company mission"
                      className="rounded-lg object-cover"
                    />
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

              <TabsContent value="team" className="space-y-8">
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Leadership Team</h2>
                  <p className="text-muted-foreground max-w-[800px] mx-auto">
                    Our experienced team brings decades of combined expertise in international trade, agriculture, and
                    business development.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {[
                    {
                      name: "Ahmed Khan",
                      position: "Chief Executive Officer",
                      bio: "With over 20 years of experience in international trade, Ahmed has led Nishat Trading since its founding in 2005.",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    {
                      name: "Sarah Johnson",
                      position: "Chief Operations Officer",
                      bio: "Sarah oversees all operational aspects of our business, ensuring efficient processes and timely delivery.",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    {
                      name: "Raj Patel",
                      position: "Head of Global Sourcing",
                      bio: "Raj manages our relationships with producers worldwide, ensuring we source only the highest quality products.",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    {
                      name: "Maria Rodriguez",
                      position: "Director of Sales",
                      bio: "Maria leads our global sales team, developing strategic partnerships with clients across all markets.",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    {
                      name: "Li Wei",
                      position: "Chief Financial Officer",
                      bio: "Li manages our financial operations, ensuring sustainable growth and sound fiscal management.",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                    {
                      name: "James Thompson",
                      position: "Sustainability Director",
                      bio: "James leads our sustainability initiatives, working to minimize our environmental impact across operations.",
                      image: "/placeholder.svg?height=300&width=300",
                    },
                  ].map((member, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="aspect-square relative">
                        <Image
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-sm text-primary font-medium">{member.position}</p>
                        <p className="mt-2 text-muted-foreground">{member.bio}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="global" className="space-y-8">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
                  <div className="flex flex-col justify-center space-y-4">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Global Presence</h2>
                      <p className="text-muted-foreground">
                        With strategic offices and partnerships across key markets, we have established a strong global
                        presence that enables us to serve clients efficiently worldwide.
                      </p>

                      <div className="mt-6 space-y-4">
                        <h3 className="text-xl font-bold">Our Global Network</h3>
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="middle-east">
                            <AccordionTrigger>Middle East & Africa</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>Dubai, UAE (Headquarters)</li>
                                <li>Riyadh, Saudi Arabia</li>
                                <li>Cairo, Egypt</li>
                                <li>Nairobi, Kenya</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="asia">
                            <AccordionTrigger>Asia</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>Mumbai, India</li>
                                <li>Bangkok, Thailand</li>
                                <li>Karachi, Pakistan</li>
                                <li>Ho Chi Minh City, Vietnam</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="europe">
                            <AccordionTrigger>Europe</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>London, United Kingdom</li>
                                <li>Rotterdam, Netherlands</li>
                                <li>Hamburg, Germany</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="americas">
                            <AccordionTrigger>Americas</AccordionTrigger>
                            <AccordionContent>
                              <ul className="list-disc pl-6 space-y-2">
                                <li>New York, USA</li>
                                <li>Toronto, Canada</li>
                                <li>São Paulo, Brazil</li>
                              </ul>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=550&width=550"
                      width={550}
                      height={550}
                      alt="Global map showing company presence"
                      className="rounded-lg object-cover"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl font-bold tracking-tighter">Key Markets</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Middle East</h4>
                        <p className="text-sm text-muted-foreground">UAE, Saudi Arabia, Qatar, Kuwait</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Europe</h4>
                        <p className="text-sm text-muted-foreground">UK, Germany, France, Netherlands</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">North America</h4>
                        <p className="text-sm text-muted-foreground">USA, Canada</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Asia</h4>
                        <p className="text-sm text-muted-foreground">India, Thailand, Vietnam, Japan</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Africa</h4>
                        <p className="text-sm text-muted-foreground">Egypt, Kenya, South Africa</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-lg border p-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <TrendingUp className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Emerging Markets</h4>
                        <p className="text-sm text-muted-foreground">Brazil, Mexico, Indonesia</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Network</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Interested in partnering with Nishat General Trading? We're always looking to expand our network of
                  suppliers and distributors.
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
              <Package2 className="h-6 w-6" />
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
            <Link
              href="/products"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Products
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
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

