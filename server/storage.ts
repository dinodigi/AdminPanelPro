import { 
  users, products, orders, categories,
  type User, type InsertUser,
  type Product, type InsertProduct,
  type Order, type InsertOrder,
  type Category, type InsertCategory
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUsers(): Promise<User[]>;
  getUser(id: number): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;

  // Product operations
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Order operations
  getOrders(): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrder(id: number, order: Partial<InsertOrder>): Promise<Order | undefined>;
  deleteOrder(id: number): Promise<boolean>;

  // Category operations
  getCategories(): Promise<Category[]>;
  getCategory(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: number, category: Partial<InsertCategory>): Promise<Category | undefined>;
  deleteCategory(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private categories: Map<number, Category>;
  private currentUserIds: number;
  private currentProductIds: number;
  private currentOrderIds: number;
  private currentCategoryIds: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.categories = new Map();
    this.currentUserIds = 1;
    this.currentProductIds = 1;
    this.currentOrderIds = 1;
    this.currentCategoryIds = 1;

    // Initialize with some sample data for demo purposes
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample users
    const sampleUsers: User[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        phone: "+1 (555) 123-4567",
        department: "Engineering",
        bio: "Lead developer and system architect",
        active: true,
        createdAt: new Date("2024-01-15"),
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "Editor",
        phone: "+1 (555) 234-5678",
        department: "Marketing",
        bio: "Content manager and editor",
        active: true,
        createdAt: new Date("2024-01-12"),
      },
    ];

    // Sample products
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "Premium Widget",
        description: "High-quality widget for professional use",
        price: "99.99",
        category: "Electronics",
        sku: "PWG-001",
        stock: 150,
        active: true,
        createdAt: new Date("2024-01-10"),
      },
      {
        id: 2,
        name: "Standard Widget",
        description: "Affordable widget for everyday use",
        price: "29.99",
        category: "Electronics",
        sku: "SWG-001",
        stock: 300,
        active: true,
        createdAt: new Date("2024-01-08"),
      },
    ];

    // Sample categories
    const sampleCategories: Category[] = [
      {
        id: 1,
        name: "Electronics",
        description: "Electronic devices and components",
        parentId: null,
        active: true,
        createdAt: new Date("2024-01-01"),
      },
      {
        id: 2,
        name: "Software",
        description: "Software products and licenses",
        parentId: null,
        active: true,
        createdAt: new Date("2024-01-01"),
      },
    ];

    // Sample orders
    const sampleOrders: Order[] = [
      {
        id: 1,
        userId: 1,
        status: "completed",
        total: "99.99",
        orderDate: new Date("2024-01-14"),
        shippingAddress: "123 Main St, City, State 12345",
        notes: "Standard delivery",
      },
      {
        id: 2,
        userId: 2,
        status: "pending",
        total: "29.99",
        orderDate: new Date("2024-01-13"),
        shippingAddress: "456 Oak Ave, City, State 67890",
        notes: "Express delivery requested",
      },
    ];

    sampleUsers.forEach(user => this.users.set(user.id, user));
    sampleProducts.forEach(product => this.products.set(product.id, product));
    sampleCategories.forEach(category => this.categories.set(category.id, category));
    sampleOrders.forEach(order => this.orders.set(order.id, order));

    this.currentUserIds = 3;
    this.currentProductIds = 3;
    this.currentCategoryIds = 3;
    this.currentOrderIds = 3;
  }

  // User operations
  async getUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserIds++;
    const user: User = {
      ...insertUser,
      id,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;

    const updatedUser: User = { ...existingUser, ...userData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductIds++;
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, productData: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;

    const updatedProduct: Product = { ...existingProduct, ...productData };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Order operations
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderIds++;
    const order: Order = {
      ...insertOrder,
      id,
      orderDate: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async updateOrder(id: number, orderData: Partial<InsertOrder>): Promise<Order | undefined> {
    const existingOrder = this.orders.get(id);
    if (!existingOrder) return undefined;

    const updatedOrder: Order = { ...existingOrder, ...orderData };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  async deleteOrder(id: number): Promise<boolean> {
    return this.orders.delete(id);
  }

  // Category operations
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryIds++;
    const category: Category = {
      ...insertCategory,
      id,
      createdAt: new Date(),
    };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: number, categoryData: Partial<InsertCategory>): Promise<Category | undefined> {
    const existingCategory = this.categories.get(id);
    if (!existingCategory) return undefined;

    const updatedCategory: Category = { ...existingCategory, ...categoryData };
    this.categories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteCategory(id: number): Promise<boolean> {
    return this.categories.delete(id);
  }
}

export const storage = new MemStorage();
