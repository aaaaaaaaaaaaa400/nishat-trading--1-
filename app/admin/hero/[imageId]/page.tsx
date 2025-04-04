"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import FileUpload from "@/components/ui/file-upload";
import { HeroImage, HeroPage } from "@/lib/hero";

export default function EditHeroImagePage() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const imageId = typeof params.imageId === 'string' ? params.imageId : '';
  
  const [formData, setFormData] = useState<HeroImage>({
    id: "",
    title: "",
    description: "",
    imagePath: "",
    isActive: true,
    order: 1,
    page: "home"
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      if (!imageId) return;
      
      setLoading(true);
      try {
        const response = await fetch(`/api/hero/${imageId}`);
        if (!response.ok) {
          throw new Error("Hero image not found");
        }
        
        const data = await response.json();
        
        // If the image doesn't have a page property, default to home
        if (!data.page) {
          data.page = "home";
        }
        
        setFormData(data);
      } catch (err) {
        console.error("Error fetching hero image:", err);
        setError("Failed to load hero image. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImage();
  }, [imageId]);

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

      const response = await fetch(`/api/hero/${imageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update hero image");
      }

      toast({
        title: "Success",
        description: "Hero image updated successfully!",
      });

      router.push("/admin/hero");
    } catch (err: any) {
      console.error("Error updating hero image:", err);
      setError(err.message || "Failed to update hero image");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" disabled>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Skeleton className="h-9 w-64" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-1/4" />
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/hero">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Edit Hero Image</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hero Image Information</CardTitle>
          <CardDescription>
            Edit hero image details. Required fields are marked with an asterisk (*).
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
                Updating...
              </>
            ) : (
              "Update Hero Image"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 