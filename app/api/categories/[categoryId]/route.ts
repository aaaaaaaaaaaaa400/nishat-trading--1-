import { NextRequest, NextResponse } from "next/server";
import { deleteCategory, getCategory } from "@/lib/products";

// GET - Get a specific category
export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const category = getCategory(params.categoryId);
    
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a category
export async function DELETE(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    // Check authentication using request cookies
    const adminAuthCookie = request.cookies.get("admin-auth");
    
    if (!adminAuthCookie || adminAuthCookie.value !== "true") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    const category = getCategory(params.categoryId);
    
    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    
    // Check if the category has products
    if (category.products.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with products. Move or delete the products first." },
        { status: 400 }
      );
    }
    
    deleteCategory(params.categoryId);
    
    return NextResponse.json(
      { message: "Category deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete category" },
      { status: 500 }
    );
  }
} 