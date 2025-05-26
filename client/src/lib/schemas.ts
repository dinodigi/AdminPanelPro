// Model schema definitions for dynamic form and grid generation
interface ModelSchema {
  modelName: string;
  apiBase: string;
  displayName: string;
  columns: Array<{
    name: string;
    label: string;
    type: string;
  }>;
  form: Array<{
    name: string;
    type: string;
    label: string;
    required?: boolean;
    options?: string[];
  }>;
}

const schemas: Record<string, ModelSchema> = {
  users: {
    modelName: 'User',
    apiBase: '/api/users',
    displayName: 'Users',
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Name', type: 'string' },
      { name: 'email', label: 'Email', type: 'string' },
      { name: 'role', label: 'Role', type: 'string' },
      { name: 'department', label: 'Department', type: 'string' },
      { name: 'active', label: 'Active', type: 'boolean' },
      { name: 'createdAt', label: 'Created At', type: 'date' },
    ],
    form: [
      { name: 'name', type: 'text', label: 'Full Name', required: true },
      { name: 'email', type: 'email', label: 'Email Address', required: true },
      { name: 'role', type: 'select', label: 'Role', required: true, options: ['admin', 'editor', 'viewer'] },
      { name: 'phone', type: 'text', label: 'Phone Number' },
      { name: 'department', type: 'select', label: 'Department', options: ['engineering', 'marketing', 'sales', 'support', 'hr'] },
      { name: 'bio', type: 'textarea', label: 'Bio' },
      { name: 'active', type: 'checkbox', label: 'Active User' },
    ],
  },

  products: {
    modelName: 'Product',
    apiBase: '/api/products',
    displayName: 'Products',
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Name', type: 'string' },
      { name: 'sku', label: 'SKU', type: 'string' },
      { name: 'category', label: 'Category', type: 'string' },
      { name: 'price', label: 'Price', type: 'number' },
      { name: 'stock', label: 'Stock', type: 'number' },
      { name: 'active', label: 'Active', type: 'boolean' },
      { name: 'createdAt', label: 'Created At', type: 'date' },
    ],
    form: [
      { name: 'name', type: 'text', label: 'Product Name', required: true },
      { name: 'description', type: 'textarea', label: 'Description' },
      { name: 'sku', type: 'text', label: 'SKU', required: true },
      { name: 'category', type: 'select', label: 'Category', required: true, options: ['electronics', 'software', 'hardware', 'services'] },
      { name: 'price', type: 'text', label: 'Price', required: true },
      { name: 'stock', type: 'text', label: 'Stock Quantity' },
      { name: 'active', type: 'checkbox', label: 'Active Product' },
    ],
  },

  orders: {
    modelName: 'Order',
    apiBase: '/api/orders',
    displayName: 'Orders',
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'userId', label: 'User ID', type: 'number' },
      { name: 'status', label: 'Status', type: 'string' },
      { name: 'total', label: 'Total', type: 'number' },
      { name: 'orderDate', label: 'Order Date', type: 'date' },
      { name: 'shippingAddress', label: 'Shipping Address', type: 'string' },
    ],
    form: [
      { name: 'userId', type: 'text', label: 'User ID', required: true },
      { name: 'status', type: 'select', label: 'Status', required: true, options: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'] },
      { name: 'total', type: 'text', label: 'Total Amount', required: true },
      { name: 'shippingAddress', type: 'textarea', label: 'Shipping Address' },
      { name: 'notes', type: 'textarea', label: 'Order Notes' },
    ],
  },

  categories: {
    modelName: 'Category',
    apiBase: '/api/categories',
    displayName: 'Categories',
    columns: [
      { name: 'id', label: 'ID', type: 'number' },
      { name: 'name', label: 'Name', type: 'string' },
      { name: 'description', label: 'Description', type: 'string' },
      { name: 'parentId', label: 'Parent ID', type: 'number' },
      { name: 'active', label: 'Active', type: 'boolean' },
      { name: 'createdAt', label: 'Created At', type: 'date' },
    ],
    form: [
      { name: 'name', type: 'text', label: 'Category Name', required: true },
      { name: 'description', type: 'textarea', label: 'Description' },
      { name: 'parentId', type: 'text', label: 'Parent Category ID' },
      { name: 'active', type: 'checkbox', label: 'Active Category' },
    ],
  },
};

export function getModelSchema(modelName: string): ModelSchema {
  const schema = schemas[modelName];
  if (!schema) {
    throw new Error(`Schema not found for model: ${modelName}`);
  }
  return schema;
}

export function getAllSchemas(): Record<string, ModelSchema> {
  return schemas;
}

export function getModelNames(): string[] {
  return Object.keys(schemas);
}
