import { MenuItem, TableInfo, Testimonial, Order } from '../types';

export const INITIAL_MENU_ITEMS: MenuItem[] = [
  // PIZZAS ITALIENNES
  {
    id: 'it-1',
    name: 'Margherita San Marzano',
    description: 'Sauce tomate italienne San Marzano, mozzarella fior di latte, basilic frais de jardin et huile d\'olive extra vierge.',
    category: 'italiennes',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Sauce tomate San Marzano', 'Mozzarella Fior di Latte', 'Basilic frais', 'Huile d\'olive extra vierge'],
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
    options: {
      extras: [
        { id: 'ext-mozza', name: 'Extra Mozzarella di Bufala', price: 300 },
        { id: 'ext-roquette', name: 'Roquette fraiche', price: 150 },
        { id: 'ext-huile-piment', name: 'Huile pimentée maison', price: 50 },
      ]
    }
  },
  {
    id: 'it-2',
    name: 'Diavola Calabrese',
    description: 'Sauce tomate, mozzarella melted, spianata piccante italienne, piments secs grillés et olives noires confites.',
    category: 'italiennes',
    price: 1650,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Sauce tomate', 'Mozzarella', 'Salami picquant Spianata', 'Piments secs', 'Olives noires'],
    isAvailable: true,
    isPopular: true,
    isSpicy: true,
  },
  {
    id: 'it-3',
    name: 'Quattro Formaggi Cremosa',
    description: 'Base crème fraîche, Mozzarella, Gorgonzola D.O.P., Fontina artisanale, Parmesan reggiano affiné 24 mois.',
    category: 'italiennes',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Crème fraîche', 'Mozzarella', 'Gorgonzola DOP', 'Fontina', 'Parmigiano Reggiano'],
    isAvailable: true,
    isVegetarian: true,
  },
  {
    id: 'it-4',
    name: 'Capricciosa Gourmet',
    description: 'Sauce tomate, mozzarella, jambon d\'aloyau de bœuf fumé, champignons de paris frais, cœurs d\'artichauts et olives.',
    category: 'italiennes',
    price: 1750,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Sauce tomate', 'Mozzarella', 'Bœuf fumé', 'Champignons frais', 'Artichauts', 'Olives'],
    isAvailable: true,
  },
  {
    id: 'it-5',
    name: 'Marinara Tradizionale',
    description: 'Recette historique napolitaine : double sauce tomate San Marzano, ail frais émincé, origan sauvage et huile d\'olive.',
    category: 'italiennes',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Sauce tomate San Marzano', 'Ail frais', 'Origan de montagne', 'Huile d\'olive extra vierge'],
    isAvailable: true,
    isVegetarian: true,
  },

  // PIZZAS AMÉRICAINES
  {
    id: 'am-1',
    name: 'Pepperoni Overload',
    description: 'Pâte américaine moelleuse, double dose de pepperoni pur bœuf croustillant, mozzarella filante et sauce tomate épicée.',
    category: 'americaines',
    price: 1700,
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Sauce tomate fumée', 'Mozzarella abondante', 'Pepperoni pur bœuf', 'Herbes aromatiques'],
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'am-2',
    name: 'BBQ Chicken Ranch',
    description: 'Sauce barbecue fumée au bois de hickory, poulet mariné grillé, oignons rouges caramélisés, bacon de dinde et coulis ranch.',
    category: 'americaines',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Sauce BBQ Hickory', 'Poulet grillé', 'Oignons rouges', 'Sauce Ranch maison', 'Mozzarella'],
    isAvailable: true,
  },
  {
    id: 'am-3',
    name: 'Meat Lovers Supreme',
    description: 'Pour les vrais carno-amateurs : viande hachée assaisonnée, pepperoni, saucisse italienne de dinde, bœuf fumé et oignons.',
    category: 'americaines',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Viande hachée', 'Pepperoni bœuf', 'Saucisse de dinde', 'Jambon bœuf fumé', 'Mozzarella'],
    isAvailable: true,
    isPopular: true,
  },

  // PIZZAS ALGÉRIENNES (Spécialités Nationales)
  {
    id: 'dz-1',
    name: 'La Merguez Artisanale',
    description: 'Pâte dorée croustillante, sauce tomate parfumée au ras el hanout doux, merguez artisanales d\'Alger grillées, poivrons verts et sauce pimentée harsa.',
    category: 'algeriennes',
    price: 1600,
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Sauce tomate épicée', 'Merguez artisanales fraîches', 'Poivrons grillés', 'Harissa berbère douce', 'Mozzarella', 'Olives noires'],
    isAvailable: true,
    isPopular: true,
    isSpicy: true,
  },
  {
    id: 'dz-2',
    name: 'Poulet Épices d\'Alger',
    description: 'Morceaux de blanc de poulet mariné aux épices maghrébines, sauce à la crème d\'ail tadjine, poivrons tricolores et coriandre fraîche.',
    category: 'algeriennes',
    price: 1700,
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Poulet mariné épices d\'Alger', 'Crème d\'ail maison', 'Poivrons grillés', 'Coriandre fraîche', 'Mozzarella'],
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'dz-3',
    name: 'Viande Hachée Tadjine',
    description: 'Viande hachée fraîche persillée assaisonnée au cumin et coriandre, oignons caramélisés à l\'huile d\'olive, mozzarella et œuf mollet.',
    category: 'algeriennes',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Viande hachée persillée', 'Oignons caramélisés', 'Œuf frais au centre', 'Sauce tomate maison', 'Mozzarella'],
    isAvailable: true,
  },
  {
    id: 'dz-4',
    name: 'Spéciale PIDZERIA Algéroise',
    description: 'La création signature ! Duo de merguez artisanales & poulet grillé, sauce fromagère crémeuse, piments dorés, olives et touche d\'origan d\'Atlas.',
    category: 'algeriennes',
    price: 1950,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Merguez artisanale', 'Poulet grillé', 'Sauce fromagère PIDZERIA', 'Piments de Mascara', 'Mozzarella'],
    isAvailable: true,
    isPopular: true,
  },

  // PIZZAS CARRÉES (Authentique Pizza Carrée Algérienne)
  {
    id: 'sq-1',
    name: 'Carrée Traditionnelle Sauce Rouge',
    description: 'L\'authentique pizza carrée d\'Alger : pâte épaisse, croustillante en bas et moelleuse au cœur, sauce tomate épicée mijotée 4h, huile d\'olive, persil et olive noire.',
    category: 'carrees',
    price: 850,
    image: 'https://images.unsplash.com/photo-1571066811602-716837d681de?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Sauce tomate à l\'ail mijotée', 'Olives noires d\'Azzefoun', 'Persil frais', 'Huile d\'olive kabyle'],
    isAvailable: true,
    isPopular: true,
    isVegetarian: true,
  },
  {
    id: 'sq-2',
    name: 'Carrée Poulet Fromage Supreme',
    description: 'Pizza carrée généreuse recouverte d\'une sauce crémeusefromagère, poulet mariné effiloché et fromage fondu doré au four.',
    category: 'carrees',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Poulet mariné effiloché', 'Sauce blanche fromagère', 'Fromage fondu gruyère', 'Persil'],
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'sq-3',
    name: 'Carrée Royale Merguez & Viande',
    description: 'Format rectangle familial carré : portion généreuse garnie de merguez tranchées, viande hachée, poivrons sautés et double fromage.',
    category: 'carrees',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Merguez artisanale', 'Viande hachée', 'Poivrons', 'Double fromage fondu', 'Olives noires'],
    isAvailable: true,
  },

  // ACCOMPAGNEMENTS
  {
    id: 'acc-1',
    name: 'Bâtonnets de Mozzarella Panés',
    description: '6 pièces dorées et croustillantes, cœur de mozzarella fondante filante, servies avec sauce marinara piquante.',
    category: 'accompagnements',
    price: 650,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Mozzarella', 'Panure croustillante', 'Sauce marinara maison'],
    isAvailable: true,
    isVegetarian: true,
  },
  {
    id: 'acc-2',
    name: 'Wings de Poulet Épicés',
    description: '8 ailes de poulet fermier marinées aux épices piquantes et dorées au four, servies avec sauce Algérienne ou Ranch.',
    category: 'accompagnements',
    price: 850,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Ailes de poulet fermier', 'Épices maison', 'Sauce au choix'],
    isAvailable: true,
    isSpicy: true,
  },
  {
    id: 'acc-3',
    name: 'Frites Maison aux Épices Cumin-Paprika',
    description: 'Portion généreuse de frites de pommes de terre locales coupées à la main, croustillantes à souhait.',
    category: 'accompagnements',
    price: 400,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Pommes de terre fraîches', 'Assaisonnement cumin-paprika'],
    isAvailable: true,
    isVegetarian: true,
  },

  // BOISSONS
  {
    id: 'drk-1',
    name: 'Sélecto Canette 33cl',
    description: 'La boisson emblématique algérienne au goût unique de caramel d\'Afrique du Nord.',
    category: 'boissons',
    price: 150,
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Sélecto 33cl glacé'],
    isAvailable: true,
  },
  {
    id: 'drk-2',
    name: 'Jus d\'Orange Pressé Frais 50cl',
    description: 'Pressé à la minute à partir d\'oranges douces de Mitidja.',
    category: 'boissons',
    price: 350,
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop',
    ingredients: ['100% Oranges naturelles de Mitidja'],
    isAvailable: true,
  },
  {
    id: 'drk-3',
    name: 'Hamoud Boualem Blanche 33cl',
    description: 'Citronnade gazeuse légendaire algérienne rafraîchissante.',
    category: 'boissons',
    price: 150,
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Hamoud Blanche 33cl'],
    isAvailable: true,
  },

  // DESSERTS
  {
    id: 'des-1',
    name: 'Tiramisu Artisanal au Café & Cacao',
    description: 'Préparé sur place chaque matin : biscuits cuillères imbibés d\'espresso, crème mascarpone aérienne et cacao amer.',
    category: 'desserts',
    price: 650,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Mascarpone', 'Café espresso', 'Biscuits', 'Cacao en poudre'],
    isAvailable: true,
    isPopular: true,
  },
  {
    id: 'des-2',
    name: 'Pizza Calzone au Nutella & Banane',
    description: 'Pâte à pizza chaude saupoudrée de sucre glace, garnie généreusement de Nutella fondant et rondelles de bananes.',
    category: 'desserts',
    price: 850,
    image: 'https://images.unsplash.com/photo-1584365685547-9a5fb6f3a70c?q=80&w=800&auto=format&fit=crop',
    ingredients: ['Nutella', 'Bananes fraîches', 'Pâte à pizza cuite au four', 'Sucre glace'],
    isAvailable: true,
  }
];

export const INITIAL_TABLES: TableInfo[] = [
  { id: 1, number: 1, seats: 2, status: 'libre' },
  { id: 2, number: 2, seats: 4, status: 'occupee', currentOrderId: 'ORD-1041' },
  { id: 3, number: 3, seats: 4, status: 'en_commande' },
  { id: 4, number: 4, seats: 6, status: 'libre' },
  { id: 5, number: 5, seats: 2, status: 'libre' },
  { id: 6, number: 6, seats: 8, status: 'occupee', currentOrderId: 'ORD-1039' },
  { id: 7, number: 7, seats: 4, status: 'libre' },
  { id: 8, number: 8, seats: 4, status: 'libre' },
  { id: 9, number: 9, seats: 6, status: 'en_commande' },
  { id: 10, number: 10, seats: 2, status: 'libre' },
  { id: 11, number: 11, seats: 4, status: 'libre' },
  { id: 12, number: 12, seats: 4, status: 'libre' },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Karim Bennani',
    location: 'Hydra, Alger',
    rating: 5,
    review: 'Sans doute la meilleure pâte à pizza d\'Alger ! La Merguez artisanale a le goût authentique du terroir marié à une cuisson italienne parfaite.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    favoritePizza: 'La Merguez Artisanale'
  },
  {
    id: 't2',
    name: 'Yasmine Hamdi',
    location: 'Sidi Yahia, Alger',
    rating: 5,
    review: 'L\'expérience de commande à table par QR code est fluide et ultra rapide. La pizza carrée poulet fromage est notre rituel du vendredi en famille !',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop',
    favoritePizza: 'Carrée Poulet Fromage Supreme'
  },
  {
    id: 't3',
    name: 'Mehdi Zerrouki',
    location: 'Bab El Oued, Alger',
    rating: 5,
    review: 'Ambiance incroyable, les ingrédients sont d\'une fraîcheur remarquable et le tiramisu maison conclut parfaitement le repas. Bravisimo PIDZERIA !',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    favoritePizza: 'Margherita San Marzano'
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1042',
    orderNumber: '#1042',
    tableNumber: 12,
    type: 'a_table',
    customerName: 'Amina Triki',
    customerPhone: '0550 12 34 56',
    items: [
      {
        id: 'item-1',
        menuItem: INITIAL_MENU_ITEMS[0],
        quantity: 1,
        selectedExtras: [{ id: 'ext-mozza', name: 'Extra Mozzarella di Bufala', price: 300 }],
        itemTotal: 1500
      },
      {
        id: 'item-2',
        menuItem: INITIAL_MENU_ITEMS[5],
        quantity: 2,
        selectedExtras: [],
        itemTotal: 3200
      },
      {
        id: 'item-3',
        menuItem: INITIAL_MENU_ITEMS[12],
        quantity: 2,
        selectedExtras: [],
        itemTotal: 300
      }
    ],
    subtotal: 5000,
    deliveryFee: 0,
    total: 5000,
    status: 'en_preparation',
    createdAt: new Date(Date.now() - 8 * 60 * 1000).toISOString(),
    estimatedMinutes: 12,
    notes: 'Pâte bien cuite SVP'
  },
  {
    id: 'ord-1041',
    orderNumber: '#1041',
    tableNumber: 2,
    type: 'a_table',
    customerName: 'Sofiane M.',
    customerPhone: '0661 88 99 00',
    items: [
      {
        id: 'item-4',
        menuItem: INITIAL_MENU_ITEMS[2],
        quantity: 1,
        selectedExtras: [],
        itemTotal: 1850
      }
    ],
    subtotal: 1850,
    deliveryFee: 0,
    total: 1850,
    status: 'prete',
    createdAt: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
    estimatedMinutes: 0
  },
  {
    id: 'ord-1040',
    orderNumber: '#1040',
    type: 'livraison',
    customerName: 'Yassine K.',
    customerPhone: '0770 44 55 66',
    deliveryAddress: '14 Rue Didouche Mourad, Alger Centre',
    items: [
      {
        id: 'item-5',
        menuItem: INITIAL_MENU_ITEMS[8],
        quantity: 2,
        selectedExtras: [],
        itemTotal: 3800
      }
    ],
    subtotal: 3800,
    deliveryFee: 300,
    total: 4100,
    status: 'acceptee',
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    estimatedMinutes: 20
  }
];
