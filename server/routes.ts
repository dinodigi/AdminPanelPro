import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  insertProductSchema, 
  insertOrderSchema, 
  insertCategorySchema 
} from "@shared/schema";

// Entity configuration for dynamic CRUD generation
const entities = [
  {
    name: "users",
    displayName: "Users",
    schema: insertUserSchema,
    methods: {
      getAll: storage.getUsers.bind(storage),
      getOne: storage.getUser.bind(storage),
      create: storage.createUser.bind(storage),
      update: storage.updateUser.bind(storage),
      delete: storage.deleteUser.bind(storage),
    }
  },
  {
    name: "products",
    displayName: "Products", 
    schema: insertProductSchema,
    methods: {
      getAll: storage.getProducts.bind(storage),
      getOne: storage.getProduct.bind(storage),
      create: storage.createProduct.bind(storage),
      update: storage.updateProduct.bind(storage),
      delete: storage.deleteProduct.bind(storage),
    }
  },
  {
    name: "orders",
    displayName: "Orders",
    schema: insertOrderSchema,
    methods: {
      getAll: storage.getOrders.bind(storage),
      getOne: storage.getOrder.bind(storage),
      create: storage.createOrder.bind(storage),
      update: storage.updateOrder.bind(storage),
      delete: storage.deleteOrder.bind(storage),
    }
  },
  {
    name: "categories",
    displayName: "Categories",
    schema: insertCategorySchema,
    methods: {
      getAll: storage.getCategories.bind(storage),
      getOne: storage.getCategory.bind(storage),
      create: storage.createCategory.bind(storage),
      update: storage.updateCategory.bind(storage),
      delete: storage.deleteCategory.bind(storage),
    }
  }
];

export async function registerRoutes(app: Express): Promise<Server> {
  // Get available models
  app.get("/api/models", async (req, res) => {
    try {
      const models = await Promise.all(
        entities.map(async (entity) => ({
          name: entity.name,
          displayName: entity.displayName,
          count: (await entity.methods.getAll()).length,
        }))
      );
      res.json(models);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch models" });
    }
  });

  // Dynamic CRUD route generation - loop through all entities
  entities.forEach((entity) => {
    const entityName = entity.name;
    const capitalizedName = entity.displayName.slice(0, -1); // Remove 's' from plural
    
    // GET all records
    app.get(`/api/${entityName}`, async (req, res) => {
      try {
        const records = await entity.methods.getAll();
        res.json(records);
      } catch (error) {
        res.status(500).json({ message: `Failed to fetch ${entityName}` });
      }
    });

    // GET single record by ID
    app.get(`/api/${entityName}/:id`, async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const record = await entity.methods.getOne(id);
        if (!record) {
          return res.status(404).json({ message: `${capitalizedName} not found` });
        }
        res.json(record);
      } catch (error) {
        res.status(500).json({ message: `Failed to fetch ${entityName.slice(0, -1)}` });
      }
    });

    // POST create new record
    app.post(`/api/${entityName}`, async (req, res) => {
      try {
        const data = entity.schema.parse(req.body);
        const record = await entity.methods.create(data);
        res.status(201).json(record);
      } catch (error: any) {
        res.status(400).json({ message: error.message || `Failed to create ${entityName.slice(0, -1)}` });
      }
    });

    // PUT update existing record
    app.put(`/api/${entityName}/:id`, async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const data = entity.schema.partial().parse(req.body);
        const record = await entity.methods.update(id, data);
        if (!record) {
          return res.status(404).json({ message: `${capitalizedName} not found` });
        }
        res.json(record);
      } catch (error: any) {
        res.status(400).json({ message: error.message || `Failed to update ${entityName.slice(0, -1)}` });
      }
    });

    // DELETE record
    app.delete(`/api/${entityName}/:id`, async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const deleted = await entity.methods.delete(id);
        if (!deleted) {
          return res.status(404).json({ message: `${capitalizedName} not found` });
        }
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: `Failed to delete ${entityName.slice(0, -1)}` });
      }
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
