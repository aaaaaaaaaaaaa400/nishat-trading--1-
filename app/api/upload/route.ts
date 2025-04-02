import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const adminAuthCookie = request.cookies.get("admin-auth");
    
    if (!adminAuthCookie || adminAuthCookie.value !== "true") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // Check if the file is an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Get file extension
    const fileExtension = file.name.split(".").pop()?.toLowerCase() || "";
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "webp"];
    
    if (!allowedExtensions.includes(fileExtension)) {
      return NextResponse.json(
        { error: "Only jpg, jpeg, png, gif, and webp files are allowed" },
        { status: 400 }
      );
    }

    // Create a unique filename
    const fileName = `${uuidv4()}.${fileExtension}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    
    // Create the uploads directory if it doesn't exist
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error("Error creating upload directory:", error);
    }

    // Save the file
    const filePath = join(uploadDir, fileName);
    const fileBuffer = await file.arrayBuffer();
    await writeFile(filePath, Buffer.from(fileBuffer));

    // Return the path to the file (relative to the public directory)
    const publicPath = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      filePath: publicPath 
    });
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
} 