
import { Category, MenuItem, Order, OrderStatus, PaymentStatus } from '@/types';

export const categories: Category[] = [
  { id: '1', name: 'Starters' },
  { id: '2', name: 'Main Courses' },
  { id: '3', name: 'Sides' },
  { id: '4', name: 'Desserts' },
  { id: '5', name: 'Drinks' },
];

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes, basil, and garlic',
    price: 7.99,
    category: '1',
    available: true,
    allergies: ['Gluten'],
    image: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and basil drizzled with balsamic glaze',
    price: 9.99,
    category: '1',
    available: true,
    allergies: ['Dairy'],
    image: 'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Grilled Salmon',
    description: 'Perfectly grilled salmon with lemon butter sauce, served with seasonal vegetables',
    price: 22.99,
    category: '2',
    available: true,
    allergies: ['Fish'],
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'Beef Burger',
    description: 'Juicy beef patty with cheese, lettuce, tomato, and special sauce on a brioche bun',
    price: 16.99,
    category: '2',
    available: true,
    allergies: ['Gluten', 'Dairy'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '5',
    name: 'Vegetable Pasta',
    description: 'Fettuccine pasta with mixed vegetables in a creamy sauce',
    price: 15.99,
    category: '2',
    available: true,
    allergies: ['Gluten', 'Dairy'],
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '6',
    name: 'French Fries',
    description: 'Crispy golden french fries served with ketchup',
    price: 4.99,
    category: '3',
    available: true,
    image: 'https://images.unsplash.com/photo-1630384060421-82e23fca9d2d?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '7',
    name: 'Chocolate Cake',
    description: 'Decadent chocolate cake with creamy ganache',
    price: 8.99,
    category: '4',
    available: true,
    allergies: ['Gluten', 'Dairy', 'Eggs'],
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '8',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    price: 7.99,
    category: '4',
    available: true,
    allergies: ['Gluten', 'Dairy', 'Eggs'],
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '9',
    name: 'Cola',
    description: 'Refreshing cola served with ice',
    price: 2.99,
    category: '5',
    available: true,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: '10',
    name: 'Iced Tea',
    description: 'Freshly brewed iced tea with lemon',
    price: 2.99,
    category: '5',
    available: true,
    image: 'https://images.unsplash.com/photo-1556679343-c1c1c5b2aca6?q=80&w=500&auto=format&fit=crop'
  }
];

export const orders: Order[] = [
  {
    id: '1',
    items: [
      {
        menuItemId: '4',
        name: 'Beef Burger',
        price: 16.99,
        quantity: 2
      },
      {
        menuItemId: '6',
        name: 'French Fries',
        price: 4.99,
        quantity: 2
      },
      {
        menuItemId: '9',
        name: 'Cola',
        price: 2.99,
        quantity: 2
      }
    ],
    status: OrderStatus.CONFIRMED,
    tableNumber: '5',
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    total: 49.94,
    paymentStatus: PaymentStatus.PAID
  },
  {
    id: '2',
    items: [
      {
        menuItemId: '3',
        name: 'Grilled Salmon',
        price: 22.99,
        quantity: 1
      },
      {
        menuItemId: '10',
        name: 'Iced Tea',
        price: 2.99,
        quantity: 1
      }
    ],
    status: OrderStatus.PREPARING,
    tableNumber: '8',
    createdAt: new Date(Date.now() - 1000 * 60 * 10), // 10 minutes ago
    total: 25.98,
    paymentStatus: PaymentStatus.PAID
  },
  {
    id: '3',
    items: [
      {
        menuItemId: '5',
        name: 'Vegetable Pasta',
        price: 15.99,
        quantity: 1
      },
      {
        menuItemId: '2',
        name: 'Caprese Salad',
        price: 9.99,
        quantity: 1
      },
      {
        menuItemId: '8',
        name: 'Tiramisu',
        price: 7.99,
        quantity: 1
      }
    ],
    status: OrderStatus.PENDING,
    tableNumber: '3',
    createdAt: new Date(),
    total: 33.97,
    paymentStatus: PaymentStatus.PENDING
  }
];

export const restaurant = {
  id: '1',
  name: 'Bistro Delight',
  description: 'A cozy restaurant offering delicious meals in a welcoming atmosphere.',
  logo: 'https://placehold.co/400x200/FF6B35/FFFFFF.png?text=Bistro+Delight',
  address: '123 Main St, Cityville',
  phone: '+1 (555) 123-4567',
  email: 'info@bistrodelight.com',
  menu: menuItems,
  categories: categories
};
