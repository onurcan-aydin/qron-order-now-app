
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  available: boolean;
  allergies?: string[];
}

export interface Category {
  id: string;
  name: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: OrderStatus;
  tableNumber: string;
  createdAt: Date;
  total: number;
  paymentStatus: PaymentStatus;
  customerName?: string;
  specialInstructions?: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
}

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  DELIVERED = 'delivered',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export enum Language {
  ENGLISH = 'en',
  GERMAN = 'de',
  TURKISH = 'tr'
}

export interface Feedback {
  id: string;
  orderId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo?: string;
  address: string;
  phone: string;
  email: string;
  menu: MenuItem[];
  categories: Category[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  restaurantId: string;
}

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff'
}
