import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, TableInfo, Order, OrderItem, OrderStatus, OrderType, Reservation } from '../types';
import { INITIAL_MENU_ITEMS, INITIAL_TABLES, INITIAL_ORDERS } from '../data/mockData';

interface StoreContextType {
  menuItems: MenuItem[];
  tables: TableInfo[];
  orders: Order[];
  cartItems: OrderItem[];
  activeTableNumber: number | null;
  activeOrder: Order | null;
  reservations: Reservation[];
  soundEnabled: boolean;
  
  // Actions
  setActiveTableNumber: (num: number | null) => void;
  addToCart: (item: MenuItem, quantity: number, extras: { id: string; name: string; price: number }[], instructions?: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  
  placeOrder: (type: OrderType, customerInfo?: { name?: string; phone?: string; address?: string }) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  setActiveOrderById: (orderId: string | null) => void;
  
  // Table actions
  updateTableStatus: (tableId: number, status: TableInfo['status'], currentOrderId?: string) => void;
  
  // Menu Manager actions
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  toggleMenuItemAvailability: (id: string) => void;
  
  // Reservation
  addReservation: (res: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => void;
  
  // Sound
  setSoundEnabled: (enabled: boolean) => void;
  playNotificationSound: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('pidzeria_menu');
    if (!saved) return INITIAL_MENU_ITEMS;
    try {
      const items: MenuItem[] = JSON.parse(saved);
      return items.map(item => {
        if (item.id === 'drk-1' && (item.name.includes('Sélecto') || item.name.includes('Selecto'))) {
          return {
            ...item,
            name: 'Coca-Cola Canette 33cl',
            description: 'Canette de Coca-Cola fraîche et pétillante 33cl.',
            ingredients: ['Coca-Cola 33cl glacé'],
          };
        }
        if (item.id === 'drk-3' && item.name.includes('Hamoud')) {
          return {
            ...item,
            name: 'Schweppes Agrum’ 33cl',
            description: 'Boisson pétillante et rafraîchissante aux saveurs d’agrumes.',
            ingredients: ['Schweppes 33cl glacé'],
          };
        }
        return item;
      });
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  const [tables, setTables] = useState<TableInfo[]>(() => {
    const saved = localStorage.getItem('pidzeria_tables');
    return saved ? JSON.parse(saved) : INITIAL_TABLES;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('pidzeria_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cartItems, setCartItems] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('pidzeria_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTableNumber, setActiveTableNumber] = useState<number | null>(null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Check URL query parameters for table QR code e.g. /menu?table=12
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');
    if (tableParam) {
      const num = parseInt(tableParam, 10);
      if (!isNaN(num)) {
        setActiveTableNumber(num);
      }
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('pidzeria_menu', JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem('pidzeria_tables', JSON.stringify(tables));
  }, [tables]);

  useEffect(() => {
    localStorage.setItem('pidzeria_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('pidzeria_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Audio synthesis helper for order chime
  const playNotificationSound = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc1.type = 'sine';
      osc2.type = 'triangle';
      
      osc1.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc1.frequency.setValueAtTime(659.25, ctx.currentTime + 0.15); // E5
      osc1.frequency.setValueAtTime(783.99, ctx.currentTime + 0.3); // G5
      
      osc2.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3); // C6
      
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
      
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc1.stop(ctx.currentTime + 0.7);
      osc2.stop(ctx.currentTime + 0.7);
    } catch {
      // Ignore audio autoplay restrictions
    }
  };

  const addToCart = (
    item: MenuItem,
    quantity: number,
    extras: { id: string; name: string; price: number }[],
    instructions?: string
  ) => {
    const extrasTotal = extras.reduce((sum, e) => sum + e.price, 0);
    const itemTotal = (item.price + extrasTotal) * quantity;

    const newItem: OrderItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity,
      selectedExtras: extras,
      instructions,
      itemTotal
    };

    setCartItems(prev => [...prev, newItem]);
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        const extrasTotal = item.selectedExtras.reduce((sum, e) => sum + e.price, 0);
        return {
          ...item,
          quantity: newQty,
          itemTotal: (item.menuItem.price + extrasTotal) * newQty
        };
      }
      return item;
    }).filter(Boolean) as OrderItem[]);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const placeOrder = (
    type: OrderType,
    customerInfo?: { name?: string; phone?: string; address?: string }
  ): Order => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
    const deliveryFee = type === 'livraison' ? 300 : 0;
    const total = subtotal + deliveryFee;
    
    const num = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `#${num}`,
      tableNumber: type === 'a_table' ? (activeTableNumber || 1) : undefined,
      type,
      customerName: customerInfo?.name || (type === 'a_table' ? `Table ${activeTableNumber || 1}` : 'Client'),
      customerPhone: customerInfo?.phone || '',
      deliveryAddress: customerInfo?.address || '',
      items: [...cartItems],
      subtotal,
      deliveryFee,
      total,
      status: 'recue',
      createdAt: new Date().toISOString(),
      estimatedMinutes: 20
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();

    if (type === 'a_table' && activeTableNumber) {
      updateTableStatus(activeTableNumber, 'en_commande', newOrder.id);
    }

    playNotificationSound();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(ord => {
      if (ord.id === orderId) {
        const updated = { ...ord, status };
        if (activeOrder && activeOrder.id === orderId) {
          setActiveOrder(updated);
        }
        return updated;
      }
      return ord;
    }));

    playNotificationSound();
  };

  const setActiveOrderById = (orderId: string | null) => {
    if (!orderId) {
      setActiveOrder(null);
      return;
    }
    const found = orders.find(o => o.id === orderId);
    if (found) {
      setActiveOrder(found);
    }
  };

  const updateTableStatus = (tableId: number, status: TableInfo['status'], currentOrderId?: string) => {
    setTables(prev => prev.map(t => {
      if (t.number === tableId || t.id === tableId) {
        return { ...t, status, currentOrderId: currentOrderId || t.currentOrderId };
      }
      return t;
    }));
  };

  const addMenuItem = (itemData: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...itemData,
      id: `custom-${Date.now()}`
    };
    setMenuItems(prev => [newItem, ...prev]);
  };

  const updateMenuItem = (item: MenuItem) => {
    setMenuItems(prev => prev.map(i => i.id === item.id ? item : i));
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(i => i.id !== id));
  };

  const toggleMenuItemAvailability = (id: string) => {
    setMenuItems(prev => prev.map(i => i.id === id ? { ...i, isAvailable: !i.isAvailable } : i));
  };

  const addReservation = (res: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => {
    const newRes: Reservation = {
      ...res,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'en_attente'
    };
    setReservations(prev => [newRes, ...prev]);
  };

  return (
    <StoreContext.Provider value={{
      menuItems,
      tables,
      orders,
      cartItems,
      activeTableNumber,
      activeOrder,
      reservations,
      soundEnabled,
      setActiveTableNumber,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      placeOrder,
      updateOrderStatus,
      setActiveOrderById,
      updateTableStatus,
      addMenuItem,
      updateMenuItem,
      deleteMenuItem,
      toggleMenuItemAvailability,
      addReservation,
      setSoundEnabled,
      playNotificationSound
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
