import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderType } from '../../types';
import { X, Trash2, Plus, Minus, ShoppingBag, UtensilsCrossed, ShoppingBag as BagIcon, Truck, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderPlaced: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onOrderPlaced }) => {
  const {
    cartItems,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    activeTableNumber,
    setActiveTableNumber
  } = useStore();

  const [orderType, setOrderType] = useState<OrderType>(activeTableNumber ? 'a_table' : 'a_emporter');
  const [tableInput, setTableInput] = useState<number>(activeTableNumber || 1);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const deliveryFee = orderType === 'livraison' ? 300 : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (orderType === 'a_table') {
      setActiveTableNumber(tableInput);
    }

    setIsSubmitting(true);

    setTimeout(() => {
      placeOrder(orderType, {
        name: customerName,
        phone: customerPhone,
        address: deliveryAddress
      });
      setIsSubmitting(false);
      onClose();
      onOrderPlaced();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-fade-in flex justify-end">
      <div 
        className="relative w-full max-w-md bg-[#121010] border-l border-amber-500/20 h-full flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-amber-50">Votre Commande</h3>
              <p className="text-xs text-stone-400 font-mono">
                {cartItems.length} article{cartItems.length > 1 ? 's' : ''} sélectionné{cartItems.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body - Items & Order Type */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Order Type Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-amber-400 block mb-2">
              Type de commande
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('a_table')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'a_table'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                    : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>À table</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('a_emporter')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'a_emporter'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                    : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <BagIcon className="w-4 h-4" />
                <span>À emporter</span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType('livraison')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'livraison'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                    : 'bg-stone-900/80 border-stone-800 text-stone-400 hover:border-stone-700'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Livraison</span>
              </button>
            </div>
          </div>

          {/* Conditional Inputs */}
          {orderType === 'a_table' && (
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-amber-300 block">Numéro de Table</span>
                <span className="text-[11px] text-stone-400">Attaché directement à votre commande</span>
              </div>
              <input
                type="number"
                min={1}
                max={20}
                value={tableInput}
                onChange={(e) => setTableInput(parseInt(e.target.value, 10) || 1)}
                className="w-16 bg-stone-900 border border-amber-500/40 rounded-xl px-3 py-1.5 text-center text-sm font-bold text-amber-400 focus:outline-none"
              />
            </div>
          )}

          {orderType === 'livraison' && (
            <div className="space-y-3 p-4 rounded-2xl bg-stone-900/80 border border-stone-800">
              <div>
                <label className="text-[11px] text-stone-400 block mb-1">Adresse de livraison (Alger & environs)</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Ex: 14 Rue Didouche Mourad, Alger"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>
          )}

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Nom / Prénom</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-[11px] text-stone-400 block mb-1">Téléphone</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0550..."
                className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-xs text-stone-200 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Item List */}
          <div className="space-y-3 pt-4 border-t border-stone-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-stone-400">Articles</span>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-stone-500 hover:text-red-400 transition-colors"
                >
                  Vider le panier
                </button>
              )}
            </div>

            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div 
                  key={item.id}
                  className="p-3 rounded-2xl bg-stone-900/60 border border-stone-800 flex items-center justify-between gap-3"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-amber-50 truncate">
                      {item.menuItem.name}
                    </h4>
                    {item.selectedExtras.length > 0 && (
                      <p className="text-[10px] text-amber-400/80 truncate">
                        +{item.selectedExtras.map(e => e.name).join(', ')}
                      </p>
                    )}
                    <span className="text-xs font-serif font-extrabold text-amber-400">
                      {item.itemTotal.toLocaleString('fr-DZ')} DA
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-stone-950 px-2 py-1 rounded-lg border border-stone-800">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1 text-stone-400 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold text-stone-200 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1 text-stone-400 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-stone-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-stone-500 text-xs">
                Votre panier est vide pour le moment.
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer - Price breakdown & Confirm button */}
        <div className="p-6 border-t border-stone-800 bg-stone-950/90 space-y-4">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-stone-400">
              <span>Sous-total</span>
              <span className="font-mono">{subtotal.toLocaleString('fr-DZ')} DA</span>
            </div>
            {orderType === 'livraison' && (
              <div className="flex justify-between text-stone-400">
                <span>Frais de livraison</span>
                <span className="font-mono">{deliveryFee.toLocaleString('fr-DZ')} DA</span>
              </div>
            )}
            <div className="flex justify-between text-base font-serif font-bold text-amber-400 pt-2 border-t border-stone-800">
              <span>Total à régler</span>
              <span>{total.toLocaleString('fr-DZ')} DA</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || isSubmitting}
            className={`w-full py-4 rounded-full font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
              cartItems.length > 0 && !isSubmitting
                ? 'bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 text-stone-950 hover:scale-[1.02]'
                : 'bg-stone-800 text-stone-600 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span>Confirmation en cours...</span>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Confirmer la Commande ({total.toLocaleString('fr-DZ')} DA)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
