import Link from "next/link"
import Image from "next/image"
import { Award, Users, Globe, TrendingUp, Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"

export default function AboutPage() {
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
                <div className="inline-flex px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full w-fit mb-4 shadow-md mx-auto">
                  Established 2005
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Nishat General Trading</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed">
                  Your trusted partner in global agricultural products and gold jewelry wholesale since 2005.
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
                    <div className="relative w-full max-w-[550px] aspect-square">
                      <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
                        <Image
                          src="https://images.unsplash.com/photo-1563906267088-b029e7101114?q=80&w=2070&auto=format&fit=crop"
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
                          src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop"
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

              <TabsContent value="team" className="space-y-8">
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Meet Our Leadership Team</h2>
                  <p className="text-muted-foreground max-w-[800px] mx-auto">
                    Our experienced team brings decades of combined expertise in international trade, agriculture, jewelry, and
                    business development.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  {[
                    {
                      name: "Ahmed Khan",
                      position: "Chief Executive Officer",
                      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop",
                      bio:
                        "With over 20 years of experience in international trade, Ahmed leads our global strategy and operations.",
                    },
                    {
                      name: "Sarah Johnson",
                      position: "Chief Operations Officer",
                      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop",
                      bio:
                        "Sarah oversees our day-to-day operations, ensuring efficiency and excellence across all departments.",
                    },
                    {
                      name: "Rajiv Patel",
                      position: "Head of Sourcing",
                      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
                      bio:
                        "Rajiv leads our sourcing team, building relationships with producers to ensure the highest quality products.",
                    },
                  ].map((member, index) => (
                    <Card key={index}>
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <div className="relative h-32 w-32 rounded-full overflow-hidden">
                            <Image
                              src={member.image}
                              alt={member.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-sm text-primary font-medium">{member.position}</p>
                            <p className="text-muted-foreground mt-2">{member.bio}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="global" className="space-y-8">
                <div className="space-y-4 text-center">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Our Global Presence</h2>
                  <p className="text-muted-foreground max-w-[800px] mx-auto">
                    With operations spanning across multiple continents, we serve clients in over 30 countries worldwide.
                  </p>
                </div>

                <div className="relative overflow-hidden rounded-xl">
                  <Image
                    src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5b1?q=80&w=2833&auto=format&fit=crop"
                    alt="World map"
                    width={1200}
                    height={600}
                    className="w-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col space-y-3">
                        <h3 className="text-xl font-bold">Headquarters</h3>
                        <p className="text-muted-foreground">
                          71-75 Shelton Street, Covent Garden, London, United Kingdom, WC2H 9JQ
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col space-y-3">
                        <h3 className="text-xl font-bold">Sourcing Offices</h3>
                        <p className="text-muted-foreground">
                          Pakistan (Rice & Salt) • Thailand (Rice) • India (Rice & Jewelry)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col space-y-3">
                        <h3 className="text-xl font-bold">Distribution Network</h3>
                        <p className="text-muted-foreground">
                          Europe • Middle East • North America • Asia • Africa
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
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

