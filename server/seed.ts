import { db } from "./db";
import { users, products, orders, categories } from "@shared/schema";

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingUsers = await db.select().from(users);
    if (existingUsers.length > 0) {
      console.log("Database already seeded, skipping...");
      return;
    }

    console.log("Seeding database with initial data...");

    // Seed categories first
    const categoryData = [
      {
        name: "Electronics",
        description: "Electronic devices and components",
        parentId: null,
        active: true,
      },
      {
        name: "Software",
        description: "Software products and licenses",
        parentId: null,
        active: true,
      },
    ];

    const insertedCategories = await db.insert(categories).values(categoryData).returning();

    // Seed users
    const userData = [
      {
        name: "John Doe",
        email: "john@example.com",
        role: "admin",
        phone: "+1 (555) 123-4567",
        department: "engineering",
        bio: "Lead developer and system architect",
        active: true,
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        role: "editor",
        phone: "+1 (555) 234-5678",
        department: "marketing",
        bio: "Content manager and editor",
        active: true,
      },
    ];

    const insertedUsers = await db.insert(users).values(userData).returning();

    // Seed products
    const productData = [
      {
        name: "Premium Widget",
        description: "High-quality widget for professional use",
        price: "99.99",
        category: "electronics",
        sku: "PWG-001",
        stock: 150,
        active: true,
      },
      {
        name: "Standard Widget",
        description: "Affordable widget for everyday use",
        price: "29.99",
        category: "electronics",
        sku: "SWG-001",
        stock: 300,
        active: true,
      },
    ];

    const insertedProducts = await db.insert(products).values(productData).returning();

    // Seed orders
    const orderData = [
      {
        userId: insertedUsers[0].id,
        status: "completed",
        total: "99.99",
        shippingAddress: "123 Main St, City, State 12345",
        notes: "Standard delivery",
      },
      {
        userId: insertedUsers[1].id,
        status: "pending",
        total: "29.99",
        shippingAddress: "456 Oak Ave, City, State 67890",
        notes: "Express delivery requested",
      },
    ];

    await db.insert(orders).values(orderData);

    console.log("Database seeded successfully!");
    console.log(`- ${insertedCategories.length} categories created`);
    console.log(`- ${insertedUsers.length} users created`);
    console.log(`- ${insertedProducts.length} products created`);
    console.log(`- ${orderData.length} orders created`);

  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}