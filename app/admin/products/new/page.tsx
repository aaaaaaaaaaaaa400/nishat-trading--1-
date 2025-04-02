"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Category } from "@/lib/products";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import FileUpload from "@/components/ui/file-upload";

export default function NewProductPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    description: "",
    image: "",
    origin: "",
    packaging: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setCategories(data.categories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (filePath: string) => {
    setFormData((prev) => ({ ...prev, image: filePath }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      // Validate required fields
      if (!formData.name || !formData.categoryId) {
        throw new Error("Name and category are required fields");
      }

      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create product");
      }

      toast({
        title: "Success",
        description: "Product created successfully!",
      });

      router.push("/admin/products");
    } catch (err: any) {
      console.error("Error creating product:", err);
      setError(err.message || "Failed to create product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/admin/products">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Information</CardTitle>
          <CardDescription>
            Add a new product to your catalog. Required fields are marked with an asterisk (*).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <form id="product-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Product name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="categoryId">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select
                  disabled={loading}
                  value={formData.categoryId}
                  onValueChange={(value) => handleSelectChange("categoryId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Product description"
                rows={4}
              />
            </div>

            <FileUpload 
              onFileUpload={handleFileUpload}
              currentImage={formData.image} 
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input
                  id="origin"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="Country of origin"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="packaging">Packaging</Label>
                <Input
                  id="packaging"
                  name="packaging"
                  value={formData.packaging}
                  onChange={handleChange}
                  placeholder="e.g., 25kg, 50kg bags"
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/admin/products">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button 
            type="submit" 
            form="product-form" 
            disabled={submitting || !formData.name || !formData.categoryId}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Product"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
