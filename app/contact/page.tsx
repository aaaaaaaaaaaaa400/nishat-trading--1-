"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react"
import emailjs from '@emailjs/browser';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MainHeader } from "@/components/main-header"
import { MainFooter } from "@/components/main-footer"

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  company: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
})

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState("")
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setEmailError("");

    // Prepare email template parameters
    const templateParams = {
      from_name: `${values.firstName} ${values.lastName}`,
      from_email: values.email,
      company: values.company,
      message: values.message,
      to_email: 'sale@nishat.uk',
    };

    // Send the email with EmailJS
    emailjs.send('service_q7kk6qc', 'template_x8l0s6z', templateParams, 'm4CmCVEOyvktzDMEs')
      .then((response) => {
        console.log('Email sent successfully:', response);
        setIsSubmitting(false);
        setIsSubmitted(true);
        form.reset();

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      })
      .catch((error) => {
        console.error('Email error:', error);
        setIsSubmitting(false);
        setEmailError("There was a problem sending your message. Please try again or contact us directly.");
      });
  }

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
                <div 
                  className="inline-flex px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full w-fit mb-4 shadow-md mx-auto cursor-pointer hover:bg-primary/90 transition-colors"
                  onClick={() => window.open('https://wa.me/447404449391', '_blank')}
                >
                  Get in Touch
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-xl/relaxed">
                  Reach out to our team for inquiries about our Nishat products, pricing, and wholesale opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-6" id="contactForm">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Get In Touch</h2>
                  <p className="text-muted-foreground">
                    Fill out the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                {isSubmitted && (
                  <Alert className="bg-green-50 border-green-200 mb-4">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-600">
                      Thank you for your message! It has been sent to our team at sale@nishat.uk. We will get back to you shortly.
                    </AlertDescription>
                  </Alert>
                )}

                {emailError && (
                  <Alert className="bg-red-50 border-red-200 mb-4">
                    <AlertDescription className="text-red-600">
                      {emailError} You can also email us directly at <a href="mailto:sale@nishat.uk" className="underline">sale@nishat.uk</a>
                    </AlertDescription>
                  </Alert>
                )}

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" ref={formRef}>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First name</FormLabel>
                            <FormControl>
                              <Input placeholder="John" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last name</FormLabel>
                            <FormControl>
                              <Input placeholder="Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Your company name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your requirements"
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Contact Details</h3>
                    <p className="text-sm text-muted-foreground">Get in touch with our team directly</p>
                  </div>
                </div>
                
                <Card className="border border-border/50 shadow-sm">
                  <CardContent className="p-6">
                    <div className="grid gap-6">
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Phone</h3>
                          <a href="tel:+447404449391" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            +44 7404 449391
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Email</h3>
                          <a href="mailto:sale@nishat.uk" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                            sale@nishat.uk
                          </a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">Headquarters</h3>
                          <p className="text-sm text-muted-foreground">
                            71-75 Shelton Street, Covent Garden, <br />
                            London, United Kingdom, WC2H 9JQ
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden border border-border/50 shadow-sm">
                  <div className="h-[300px] w-full relative">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2481.9631106375303!2d-0.12542542302194964!3d51.51459097173727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ccaaa0b0a7%3A0xb2c8bb9c5d676a16!2s71-75%20Shelton%20St%2C%20London%20WC2H%209JQ%2C%20UK!5e0!3m2!1sen!2sus!4v1670000000000!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="absolute inset-0"
                    ></iframe>
                  </div>
                </Card>
                
                <div className="p-6 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-1 text-sm">
                    <div className="text-muted-foreground">Monday - Friday:</div>
                    <div>9:00 AM - 6:00 PM (GMT)</div>
                    <div className="text-muted-foreground">Saturday:</div>
                    <div>10:00 AM - 2:00 PM (GMT)</div>
                    <div className="text-muted-foreground">Sunday:</div>
                    <div>Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MainFooter />
    </div>
  )
}
