"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import { HeroPage } from "@/lib/hero";
import FileUpload from "@/components/ui/file-upload";

export default function NewHeroImagePage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imagePath: "",
    isActive: true,
    order: 99,
    page: "home" as HeroPage
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, isActive: checked });
  };

  const handlePageChange = (value: string) => {
    setFormData({ ...formData, page: value as HeroPage });
  };

  const handleFileUpload = (filePath: string) => {
    setFormData({ ...formData, imagePath: filePath });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.imagePath) {
        throw new Error("Image is required");
      }

      const response = await fetch("/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create hero image");
      }

      toast({
        title: "Success",
        description: "Hero image created successfully!",
      });

      router.push("/admin/hero");
    } catch (err: any) {
      console.error("Error creating hero image:", err);
      setError(err.message || "Failed to create hero image");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/hero">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add New Hero Image</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Image Information</CardTitle>
          <CardDescription>
            Add a new image to your website hero sections. Required fields are marked with an asterisk (*).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form id="hero-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter a title for this image (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter a description to display with this image"
                rows={3}
              />
            </div>

            <FileUpload 
              onFileUpload={handleFileUpload}
              currentImage={formData.imagePath}
              label="Hero Image *"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="page">
                  Page <span className="text-destructive">*</span>
                </Label>
                <Select 
                  value={formData.page} 
                  onValueChange={handlePageChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home">Home Page</SelectItem>
                    <SelectItem value="about">About Page</SelectItem>
                    <SelectItem value="products">Products Page</SelectItem>
                    <SelectItem value="contact">Contact Page</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Select which page this hero image will appear on
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="order">Display Order</Label>
                <Input
                  id="order"
                  name="order"
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={handleInputChange}
                  placeholder="Display order (lower numbers appear first)"
                />
                <p className="text-xs text-muted-foreground">
                  Lower numbers will appear first in the sequence
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="isActive">Active (visible on website)</Label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/hero">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button 
            type="submit" 
            form="hero-form" 
            disabled={submitting || !formData.title || !formData.imagePath}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Hero Image"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 