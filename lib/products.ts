import fs from 'fs';
import path from 'path';

// Define the product type
export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  image: string;
  origin: string;
  packaging: string;
}

// Define the category type
export interface Category {
  id: string;
  name: string;
  products: Product[];
}

// Path to our JSON file that will store the products
const dataFilePath = path.join(process.cwd(), 'data', 'products.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Initialize with current products if file doesn't exist
const initializeProductsFile = () => {
  ensureDataDirectory();
  
  if (!fs.existsSync(dataFilePath)) {
    // Initial data based on current products
    const initialData: Category[] = [
      {
        id: "rice",
        name: "Al Razak Rice",
        products: [
          {
            id: "basmati",
            categoryId: "rice",
            name: "Al Razak Basmati Rice",
            description: "Premium long-grain aromatic basmati rice with a distinct flavor and aroma.",
            image: "/basmati.png",
            origin: "Pakistan",
            packaging: "25kg, 50kg bags",
          },
          {
            id: "sella",
            categoryId: "rice",
            name: "Al Razak Sella Rice",
            description: "Parboiled rice that maintains its nutritional value and has a better shelf life.",
            image: "/sellarice.png",
            origin: "Pakistan",
            packaging: "25kg, 50kg bags",
          },
          {
            id: "steam",
            categoryId: "rice",
            name: "Al Razak Steam Rice",
            description: "Perfectly steamed rice with excellent texture and moisture retention.",
            image: "/steamrice.png",
            origin: "Pakistan",
            packaging: "25kg, 50kg bags",
          },
          {
            id: "white",
            categoryId: "rice",
            name: "Al Razak White Rice",
            description: "Clean, polished white rice with versatile cooking applications.",
            image: "/whiterice.png",
            origin: "Pakistan",
            packaging: "25kg, 50kg, 100kg bags",
          },
        ],
      },
      {
        id: "salt",
        name: "Premium Salt",
        products: [
          {
            id: "pink-salt",
            categoryId: "salt",
            name: "Al Razak Pink Salt",
            description:
              "Premium mineral-rich pink salt from the Himalayan mountains with trace minerals and a distinctive color.",
            image: "https://images.unsplash.com/photo-1660650737271-7c292a646922?q=80&w=2070&auto=format&fit=crop",
            origin: "Pakistan",
            packaging: "1kg, 5kg, 25kg bags",
          },
        ],
      },
      {
        id: "gold",
        name: "Gold & Jewelry",
        products: [
          {
            id: "gold-jewelry",
            categoryId: "gold",
            name: "Gold Jewelry Wholesale",
            description: "Fine gold jewelry pieces and precious stones for wholesale buyers.",
            image: "https://images.unsplash.com/photo-1573408301851-47cedcca5b36?q=80&w=2069&auto=format&fit=crop",
            origin: "Various",
            packaging: "Custom packaging available",
          },
          {
            id: "gold-ornaments",
            categoryId: "gold",
            name: "Gold Ornaments",
            description: "Exquisite gold ornaments crafted with precision and attention to detail.",
            image: "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?q=80&w=2070&auto=format&fit=crop",
            origin: "Various",
            packaging: "Custom packaging available",
          },
          {
            id: "precious-stones",
            categoryId: "gold",
            name: "Precious Stones",
            description: "High-quality precious stones and gems for jewelry manufacturing.",
            image: "https://images.unsplash.com/photo-1511797663913-0fa4736d0d9f?q=80&w=2069&auto=format&fit=crop",
            origin: "Various",
            packaging: "Secure packaging with certification",
          },
        ],
      },
    ];
    
    fs.writeFileSync(dataFilePath, JSON.stringify(initialData, null, 2));
  }
};

// Get all categories with products
export const getAllCategories = (): Category[] => {
  initializeProductsFile();
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(data);
};

// Get a specific category
export const getCategory = (categoryId: string): Category | undefined => {
  const categories = getAllCategories();
  return categories.find(category => category.id === categoryId);
};

// Get all products
export const getAllProducts = (): Product[] => {
  const categories = getAllCategories();
  return categories.flatMap(category => category.products);
};

// Get a specific product
export const getProduct = (productId: string): Product | undefined => {
  const products = getAllProducts();
  return products.find(product => product.id === productId);
};

// Add a new product
export const addProduct = (newProduct: Omit<Product, 'id'>): Product => {
  const categories = getAllCategories();
  const categoryIndex = categories.findIndex(cat => cat.id === newProduct.categoryId);
  
  if (categoryIndex === -1) {
    throw new Error(`Category with ID ${newProduct.categoryId} not found`);
  }
  
  // Generate a simple ID based on the name
  const id = newProduct.name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  const product: Product = {
    ...newProduct,
    id,
  };
  
  categories[categoryIndex].products.push(product);
  fs.writeFileSync(dataFilePath, JSON.stringify(categories, null, 2));
  
  return product;
};

// Update a product
export const updateProduct = (productId: string, updatedProduct: Partial<Omit<Product, 'id'>>): Product => {
  const categories = getAllCategories();
  let found = false;
  
  for (let i = 0; i < categories.length; i++) {
    const productIndex = categories[i].products.findIndex(p => p.id === productId);
    
    if (productIndex !== -1) {
      categories[i].products[productIndex] = {
        ...categories[i].products[productIndex],
        ...updatedProduct,
      };
      found = true;
      break;
    }
  }
  
  if (!found) {
    throw new Error(`Product with ID ${productId} not found`);
  }
  
  fs.writeFileSync(dataFilePath, JSON.stringify(categories, null, 2));
  return getProduct(productId) as Product;
};

// Delete a product
export const deleteProduct = (productId: string): void => {
  const categories = getAllCategories();
  let found = false;
  
  for (let i = 0; i < categories.length; i++) {
    const initialLength = categories[i].products.length;
    categories[i].products = categories[i].products.filter(p => p.id !== productId);
    
    if (categories[i].products.length < initialLength) {
      found = true;
      break;
    }
  }
  
  if (!found) {
    throw new Error(`Product with ID ${productId} not found`);
  }
  
  fs.writeFileSync(dataFilePath, JSON.stringify(categories, null, 2));
};

// Add a new category
export const addCategory = (name: string): Category => {
  const categories = getAllCategories();
  
  // Generate a simple ID based on the name
  const id = name.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  
  // Check if category already exists
  if (categories.some(cat => cat.id === id)) {
    throw new Error(`Category with ID ${id} already exists`);
  }
  
  const newCategory: Category = {
    id,
    name,
    products: [],
  };
  
  categories.push(newCategory);
  fs.writeFileSync(dataFilePath, JSON.stringify(categories, null, 2));
  
  return newCategory;
};

// Delete a category
export const deleteCategory = (categoryId: string): void => {
  const categories = getAllCategories();
  const filteredCategories = categories.filter(cat => cat.id !== categoryId);
  
  if (filteredCategories.length === categories.length) {
    throw new Error(`Category with ID ${categoryId} not found`);
  }
  
  fs.writeFileSync(dataFilePath, JSON.stringify(filteredCategories, null, 2));
};

// Initialize the file when this module is imported
initializeProductsFile();
