import fs from 'fs';
import path from 'path';

// Define the HeroImage type
export interface HeroImage {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  isActive: boolean;
  order: number;
}

// Path to our JSON file that will store the hero images
const dataFilePath = path.join(process.cwd(), 'data', 'hero-images.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Initialize with sample hero images if file doesn't exist
const initializeHeroImagesFile = () => {
  ensureDataDirectory();
  
  if (!fs.existsSync(dataFilePath)) {
    // Initial sample data
    const initialData: HeroImage[] = [
      {
        id: "main-hero",
        title: "Nishat Trading",
        description: "Quality products from Pakistan to the world",
        imagePath: "/herosection.png",
        isActive: true,
        order: 1
      }
    ];
    
    fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
  }
};

// Get all hero images
export const getAllHeroImages = (): HeroImage[] => {
  initializeHeroImagesFile();
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Get active hero images (sorted by order)
export const getActiveHeroImages = (): HeroImage[] => {
  const images = getAllHeroImages();
  return images
    .filter(image => image.isActive)
    .sort((a, b) => a.order - b.order);
};

// Get a specific hero image
export const getHeroImage = (imageId: string): HeroImage | undefined => {
  const images = getAllHeroImages();
  return images.find(image => image.id === imageId);
};

// Add a new hero image
export const addHeroImage = (imageData: Omit<HeroImage, 'id'>): HeroImage => {
  const images = getAllHeroImages();
  
  // Generate a simple ID based on the title
  const id = imageData.title.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') + 
    '-' + Date.now().toString().slice(-6);
  
  const newImage: HeroImage = {
    ...imageData,
    id
  };
  
  images.push(newImage);
  fs.writeFileSync(dataFilePath, JSON.stringify(images, null, 2));
  
  return newImage;
};

// Update a hero image
export const updateHeroImage = (imageId: string, updatedData: Partial<Omit<HeroImage, 'id'>>): HeroImage => {
  const images = getAllHeroImages();
  const imageIndex = images.findIndex(image => image.id === imageId);
  
  if (imageIndex === -1) {
    throw new Error(`Hero image with ID ${imageId} not found`);
  }
  
  images[imageIndex] = {
    ...images[imageIndex],
    ...updatedData
  };
  
  fs.writeFileSync(dataFilePath, JSON.stringify(images, null, 2));
  return images[imageIndex];
};

// Delete a hero image
export const deleteHeroImage = (imageId: string): void => {
  const images = getAllHeroImages();
  const newImages = images.filter(image => image.id !== imageId);
  
  if (newImages.length === images.length) {
    throw new Error(`Hero image with ID ${imageId} not found`);
  }
  
  fs.writeFileSync(dataFilePath, JSON.stringify(newImages, null, 2));
};

// Initialize the file when this module is imported
initializeHeroImagesFile(); 