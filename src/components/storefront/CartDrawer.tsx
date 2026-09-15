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
        className="relative w-full max-w-md bg-[#0c120e] border-l border-[#243326] h-full flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#243326] flex items-center justify-between bg-[#080d09]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#547734]/15 text-[#9bc774]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#fbf7ee]">Votre Commande</h3>
              <p className="text-xs text-[#8a988c] font-mono">
                {cartItems.length} article{cartItems.length > 1 ? 's' : ''} sélectionné{cartItems.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#121813] hover:bg-[#1a231b] text-[#8a988c] hover:text-white transition-colors cursor-pointer border border-[#243326]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body - Items & Order Type */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Order Type Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-[#9bc774] block mb-2">
              Type de commande
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('a_table')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'a_table'
                    ? 'bg-[#547734]/20 border-[#547734] text-[#d4e4c2]'
                    : 'bg-[#121813]/80 border-[#243326] text-[#8a988c] hover:border-[#384e3a]'
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
                    ? 'bg-[#547734]/20 border-[#547734] text-[#d4e4c2]'
                    : 'bg-[#121813]/80 border-[#243326] text-[#8a988c] hover:border-[#384e3a]'
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
                    ? 'bg-[#547734]/20 border-[#547734] text-[#d4e4c2]'
                    : 'bg-[#121813]/80 border-[#243326] text-[#8a988c] hover:border-[#384e3a]'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Livraison</span>
              </button>
            </div>
          </div>

          {/* Conditional Inputs */}
          {orderType === 'a_table' && (
            <div className="p-4 rounded-2xl bg-[#547734]/10 border border-[#547734]/20 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#d4e4c2] block">Numéro de Table</span>
                <span className="text-[11px] text-[#8a988c]">Attaché directement à votre commande</span>
              </div>
              <input
                type="number"
                min={1}
                max={20}
                value={tableInput}
                onChange={(e) => setTableInput(parseInt(e.target.value, 10) || 1)}
                className="w-16 bg-[#0c120e] border border-[#547734]/40 rounded-xl px-3 py-1.5 text-center text-sm font-bold text-[#9bc774] focus:outline-none"
              />
            </div>
          )}

          {orderType === 'livraison' && (
            <div className="space-y-3 p-4 rounded-2xl bg-[#121813]/80 border border-[#243326]">
              <div>
                <label className="text-[11px] text-[#8a988c] block mb-1">Adresse de livraison (Alger & environs)</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Ex: 14 Rue Didouche Mourad, Alger"
                  className="w-full bg-[#0c120e] border border-[#243326] rounded-xl px-3 py-2 text-xs text-[#f2e5ce] focus:outline-none focus:border-[#547734]"
                />
              </div>
            </div>
          )}

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#8a988c] block mb-1">Nom / Prénom</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-[#121813] border border-[#243326] rounded-xl px-3 py-2 text-xs text-[#f2e5ce] focus:outline-none focus:border-[#547734]"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8a988c] block mb-1">Téléphone</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0550..."
                className="w-full bg-[#121813] border border-[#243326] rounded-xl px-3 py-2 text-xs text-[#f2e5ce] focus:outline-none focus:border-[#547734]"
              />
            </div>
          </div>

          {/* Item List */}
          <div className="space-y-3 pt-4 border-t border-[#243326]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8a988c]">Articles</span>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-[#8a988c] hover:text-red-400 transition-colors"
                >
                  Vider le panier
                </button>
              )}
            </div>

            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div 
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#121813]/60 border border-[#243326] flex items-center justify-between gap-3"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#fbf7ee] truncate">
                      {item.menuItem.name}
                    </h4>
                    {item.selectedExtras.length > 0 && (
                      <p className="text-[10px] text-[#9bc774] truncate">
                        +{item.selectedExtras.map(e => e.name).join(', ')}
                      </p>
                    )}
                    <span className="text-xs font-serif font-extrabold text-[#9bc774]">
                      {item.itemTotal.toLocaleString('fr-DZ')} DA
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-[#090e0a] px-2 py-1 rounded-lg border border-[#243326]">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1 text-[#8a988c] hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold text-[#f2e5ce] w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1 text-[#8a988c] hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-[#556357] hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-[#556357] text-xs">
                Votre panier est vide pour le moment.
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer - Price breakdown & Confirm button */}
        <div className="p-6 border-t border-[#243326] bg-[#090e0a] space-y-4">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-[#8a988c]">
              <span>Sous-total</span>
              <span className="font-mono">{subtotal.toLocaleString('fr-DZ')} DA</span>
            </div>
            {orderType === 'livraison' && (
              <div className="flex justify-between text-[#8a988c]">
                <span>Frais de livraison</span>
                <span className="font-mono">{deliveryFee.toLocaleString('fr-DZ')} DA</span>
              </div>
            )}
            <div className="flex justify-between text-base font-serif font-bold text-[#9bc774] pt-2 border-t border-[#243326]">
              <span>Total à régler</span>
              <span>{total.toLocaleString('fr-DZ')} DA</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || isSubmitting}
            className={`w-full py-4 rounded-full font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
              cartItems.length > 0 && !isSubmitting
                ? 'bg-[#547734] hover:bg-[#628b3d] text-[#fbf7ee] shadow-[#547734]/25 hover:scale-[1.02]'
                : 'bg-[#18211a] text-[#556357] cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <span>Confirmation en cours...</span>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirmer la Commande ({total.toLocaleString('fr-DZ')} DA)</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
