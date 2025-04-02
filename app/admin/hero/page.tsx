"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowLeft, ArrowDown, ArrowUp, Loader2, Plus, Trash, Pencil, Eye } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { HeroImage } from "@/lib/hero";

// A map of page types to display names
const pageNames: Record<string, string> = {
  home: "Home",
  about: "About",
  products: "Products",
  contact: "Contact"
};

// A map of page types to badge colors
const pageBadgeColors: Record<string, string> = {
  home: "bg-blue-500",
  about: "bg-green-500",
  products: "bg-amber-500",
  contact: "bg-purple-500"
};

export default function HeroImagesPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchHeroImages = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/hero");
      if (!response.ok) {
        throw new Error("Failed to fetch hero images");
      }
      
      const data = await response.json();
      setHeroImages(data.heroImages);
    } catch (err) {
      console.error("Error fetching hero images:", err);
      setError("Failed to load hero images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHeroImages();
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(`/api/hero/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete hero image");
      }

      toast({
        title: "Success",
        description: "Hero image deleted successfully!",
      });
      
      fetchHeroImages();
    } catch (err: any) {
      console.error("Error deleting hero image:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to delete hero image",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const toggleActive = async (imageId: string, currentStatus: boolean) => {
    setUpdating(imageId);
    try {
      const response = await fetch(`/api/hero/${imageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update hero image");
      }

      toast({
        title: "Success",
        description: `Hero image ${!currentStatus ? "activated" : "deactivated"} successfully!`,
      });
      
      fetchHeroImages();
    } catch (err: any) {
      console.error("Error updating hero image:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to update hero image",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const updateOrder = async (imageId: string, newOrder: number) => {
    if (newOrder < 1) return;
    
    setUpdating(imageId);
    try {
      const response = await fetch(`/api/hero/${imageId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order: newOrder }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update hero image order");
      }

      toast({
        title: "Success",
        description: "Hero image order updated successfully!",
      });
      
      fetchHeroImages();
    } catch (err: any) {
      console.error("Error updating hero image order:", err);
      toast({
        title: "Error",
        description: err.message || "Failed to update hero image order",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };
  
  const moveUp = (index: number, page: string) => {
    if (index === 0) return;
    const currentImage = heroImages[index];
    const aboveImage = heroImages.filter(img => img.page === page)[index - 1];
    
    if (currentImage && aboveImage) {
      updateOrder(currentImage.id, aboveImage.order - 1);
    }
  };
  
  const moveDown = (index: number, page: string) => {
    const pageImages = heroImages.filter(img => img.page === page);
    if (index === pageImages.length - 1) return;
    
    const currentImage = pageImages[index];
    const belowImage = pageImages[index + 1];
    
    if (currentImage && belowImage) {
      updateOrder(currentImage.id, belowImage.order + 1);
    }
  };

  // Group images by page for better organization
  const groupedImages = heroImages.reduce((acc, image) => {
    const page = image.page || 'home'; // Default to home if page is missing
    if (!acc[page]) {
      acc[page] = [];
    }
    acc[page].push(image);
    return acc;
  }, {} as Record<string, HeroImage[]>);

  // Sort images by order within each page group
  Object.keys(groupedImages).forEach(page => {
    groupedImages[page].sort((a, b) => a.order - b.order);
  });

  // Order of pages to display
  const pageOrder = ['home', 'about', 'products', 'contact'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/admin/dashboard">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Hero Section Images</h1>
        </div>
        <Link href="/admin/hero/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Hero Image
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Hero Section Images</CardTitle>
          <CardDescription>
            Add, edit, and organize the images that appear in the hero sections across your website.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {loading ? (
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : heroImages.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No hero images found.</p>
              <Link href="/admin/hero/new">
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Hero Image
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              {pageOrder.map(pageKey => {
                const pageImages = groupedImages[pageKey] || [];
                if (pageImages.length === 0) return null;
                
                return (
                  <div key={pageKey} className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge className={`${pageBadgeColors[pageKey]} text-white`}>
                        {pageNames[pageKey]} Page
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ({pageImages.length} {pageImages.length === 1 ? 'image' : 'images'})
                      </span>
                    </div>
                    
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Image</TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="w-[100px] text-center">Active</TableHead>
                          <TableHead className="w-[100px] text-center">Order</TableHead>
                          <TableHead className="w-[150px] text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pageImages.map((image, index) => (
                          <TableRow key={image.id}>
                            <TableCell>
                              <div className="relative h-16 w-24 bg-muted rounded overflow-hidden">
                                <Image
                                  src={image.imagePath}
                                  alt={image.title}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{image.title}</TableCell>
                            <TableCell className="max-w-[200px] truncate">{image.description}</TableCell>
                            <TableCell className="text-center">
                              <Switch
                                checked={image.isActive}
                                disabled={updating === image.id}
                                onCheckedChange={() => toggleActive(image.id, image.isActive)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center justify-center gap-2">
                                <span className="w-6 text-center">{image.order}</span>
                                <div className="flex flex-col">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={index === 0 || updating !== null}
                                    onClick={() => moveUp(index, pageKey)}
                                    className="h-6 w-6"
                                  >
                                    <ArrowUp className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={index === pageImages.length - 1 || updating !== null}
                                    onClick={() => moveDown(index, pageKey)}
                                    className="h-6 w-6"
                                  >
                                    <ArrowDown className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                >
                                  <Link href={`/admin/hero/${image.id}`}>
                                    <Pencil className="h-4 w-4" />
                                  </Link>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => setDeleteId(image.id)}
                                >
                                  <Trash className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the hero image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 