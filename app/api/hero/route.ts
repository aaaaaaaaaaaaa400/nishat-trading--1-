import { NextRequest, NextResponse } from "next/server";
import {
  getAllHeroImages,
  getActiveHeroImages,
  addHeroImage
} from "@/lib/hero";

// GET - Get all hero images or just active ones
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get('active') === 'true';
    
    const heroImages = activeOnly ? getActiveHeroImages() : getAllHeroImages();
    
    return NextResponse.json({ heroImages }, { status: 200 });
  } catch (error) {
    console.error("Error fetching hero images:", error);
    return NextResponse.json(
      { error: "Failed to fetch hero images" },
      { status: 500 }
    );
  }
}

// POST - Create a new hero image
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
    const imageData = await request.json();
    
    // Validate required fields
    if (!imageData.title || !imageData.imagePath) {
      return NextResponse.json(
        { error: "Title and image path are required" },
        { status: 400 }
      );
    }

    // Add the hero image
    const newImage = addHeroImage({
      title: imageData.title,
      description: imageData.description || "",
      imagePath: imageData.imagePath,
      isActive: imageData.isActive !== undefined ? imageData.isActive : true,
      order: imageData.order !== undefined ? imageData.order : 99
    });
    
    return NextResponse.json(
      { message: "Hero image added successfully", heroImage: newImage },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating hero image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create hero image" },
      { status: 500 }
    );
  }
} 