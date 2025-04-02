import { NextRequest, NextResponse } from "next/server";
import {
  getAllCategories,
  addCategory,
  deleteCategory
} from "@/lib/products";

// GET - Get all categories
export async function GET() {
  try {
    const categories = getAllCategories();
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST - Create a new category
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
    const data = await request.json();
    
    // Validate required fields
    if (!data.name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    // Add the category
    const newCategory = addCategory(data.name);
    
    return NextResponse.json(
      { message: "Category added successfully", category: newCategory },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create category" },
      { status: 500 }
    );
  }
} 