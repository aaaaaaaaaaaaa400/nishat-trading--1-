import { NextRequest, NextResponse } from "next/server";
import {
  getHeroImage,
  updateHeroImage,
  deleteHeroImage
} from "@/lib/hero";

// GET - Get a specific hero image
export async function GET(
  request: NextRequest,
  { params }: { params: { imageId: string } }
) {
  try {
    const heroImage = getHeroImage(params.imageId);
    
    if (!heroImage) {
      return NextResponse.json(
        { error: "Hero image not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(heroImage, { status: 200 });
  } catch (error) {
    console.error("Error fetching hero image:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero image" },
      { status: 500 }
    );
  }
}

// PATCH - Update a hero image
export async function PATCH(
  request: NextRequest,
  { params }: { params: { imageId: string } }
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
    
    // Parse the request body
    const updateData = await request.json();
    
    try {
      const updatedImage = updateHeroImage(params.imageId, updateData);
      
      return NextResponse.json({
        message: "Hero image updated successfully",
        heroImage: updatedImage
      });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("Error updating hero image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update hero image" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a hero image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { imageId: string } }
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
    
    try {
      deleteHeroImage(params.imageId);
      
      return NextResponse.json({
        message: "Hero image deleted successfully"
      });
    } catch (error: any) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
  } catch (error: any) {
    console.error("Error deleting hero image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete hero image" },
      { status: 500 }
    );
  }
} 