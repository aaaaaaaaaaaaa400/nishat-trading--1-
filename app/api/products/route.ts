import { NextRequest, NextResponse } from "next/server";
import {
  getAllProducts,
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllCategories
} from "@/lib/products";

// GET - Get all products
export async function GET() {
  try {
    const products = getAllProducts();
    const categories = getAllCategories();
    
    return NextResponse.json({ products, categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// POST - Create a new product
export async function POST(request: NextRequest) {
  try {
    // Check authentication using request cookies
    const adminAuthCookie = request.cookies.get("admin-auth");
    
    if (!adminAuthCookie || adminAuthCookie.value !== "true") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse the request body
    const productData = await request.json();
    
    // Validate required fields
    if (!productData.name || !productData.categoryId) {
      return NextResponse.json(
        { error: "Name and category are required" },
        { status: 400 }
      );
    }

    // Add the product
    const newProduct = addProduct(productData);
    
    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating product:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create product" },
      { status: 500 }
    );
  }
}
