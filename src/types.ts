export type PizzaCategory = 
  | 'italiennes'
  | 'americaines'
  | 'algeriennes'
  | 'carrees'
  | 'accompagnements'
  | 'boissons'
  | 'desserts';

export type MenuCategory = PizzaCategory;

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: PizzaCategory;
  price: number; // In DZD / DA
  image: string;
  ingredients: string[];
  isAvailable: boolean;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  options?: {
    sizes?: { name: string; priceAdd: number }[];
    crusts?: { name: string; priceAdd: number }[];
    extras?: { id: string; name: string; price: number }[];
  };
}

export type OrderType = 'a_table' | 'a_emporter' | 'livraison';

export type OrderStatus = 'recue' | 'acceptee' | 'en_preparation' | 'prete' | 'servie' | 'annulee';

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: string;
  selectedCrust?: string;
  selectedExtras: { id: string; name: string; price: number }[];
  instructions?: string;
  itemTotal: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  tableNumber?: number;
  type: OrderType;
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedMinutes?: number;
  notes?: string;
}

export interface TableInfo {
  id: number;
  number: number;
  seats: number;
  status: 'libre' | 'en_commande' | 'occupee';
  currentOrderId?: string;
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  status: 'en_attente' | 'confirmee' | 'annulee';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
  favoritePizza: string;
}
