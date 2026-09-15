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
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md animate-fade-in flex justify-end">
      <div 
        className="relative w-full max-w-md bg-[#0e0c0b] border-l border-[#26221d] h-full flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#26221d] flex items-center justify-between bg-[#0a0807]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#1c1814] border border-[#2e2823] text-[#dfd0ba]">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-[#f7f2e7]">Votre Commande</h3>
              <p className="text-xs text-[#8c7e6c] font-mono">
                {cartItems.length} article{cartItems.length > 1 ? 's' : ''} sélectionné{cartItems.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#161412] hover:bg-[#221e1a] text-[#8c7e6c] hover:text-white transition-colors cursor-pointer border border-[#2a241f]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body - Items & Order Type */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Order Type Selector */}
          <div>
            <label className="text-xs font-mono uppercase tracking-widest text-[#dfd0ba] block mb-2">
              Type de commande
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('a_table')}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  orderType === 'a_table'
                    ? 'bg-[#dfd0ba] text-[#0a0a0a] border-[#dfd0ba]'
                    : 'bg-[#141210] border-[#2a241f] text-[#8c7e6c] hover:border-[#3d3730]'
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
                    ? 'bg-[#dfd0ba] text-[#0a0a0a] border-[#dfd0ba]'
                    : 'bg-[#141210] border-[#2a241f] text-[#8c7e6c] hover:border-[#3d3730]'
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
                    ? 'bg-[#dfd0ba] text-[#0a0a0a] border-[#dfd0ba]'
                    : 'bg-[#141210] border-[#2a241f] text-[#8c7e6c] hover:border-[#3d3730]'
                }`}
              >
                <Truck className="w-4 h-4" />
                <span>Livraison</span>
              </button>
            </div>
          </div>

          {/* Conditional Inputs */}
          {orderType === 'a_table' && (
            <div className="p-4 rounded-2xl bg-[#141210] border border-[#2a241f] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#dfd0ba] block">Numéro de Table</span>
                <span className="text-[11px] text-[#8c7e6c]">Transmis directement à la cuisine</span>
              </div>
              <input
                type="number"
                min={1}
                max={20}
                value={tableInput}
                onChange={(e) => setTableInput(parseInt(e.target.value, 10) || 1)}
                className="w-16 bg-[#0a0807] border border-[#dfd0ba]/40 rounded-xl px-3 py-1.5 text-center text-sm font-bold text-[#dfd0ba] focus:outline-none"
              />
            </div>
          )}

          {orderType === 'livraison' && (
            <div className="space-y-3 p-4 rounded-2xl bg-[#141210] border border-[#2a241f]">
              <div>
                <label className="text-[11px] text-[#8c7e6c] block mb-1">Adresse de livraison (Alger & environs)</label>
                <input
                  type="text"
                  required
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Ex: 14 Rue Didouche Mourad, Alger"
                  className="w-full bg-[#0a0807] border border-[#26221d] rounded-xl px-3 py-2 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]/60"
                />
              </div>
            </div>
          )}

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-[11px] text-[#8c7e6c] block mb-1">Nom / Prénom</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Votre nom"
                className="w-full bg-[#141210] border border-[#2a241f] rounded-xl px-3 py-2 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]/60"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8c7e6c] block mb-1">Téléphone</label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="0550..."
                className="w-full bg-[#141210] border border-[#2a241f] rounded-xl px-3 py-2 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]/60"
              />
            </div>
          </div>

          {/* Item List */}
          <div className="space-y-3 pt-4 border-t border-[#26221d]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c]">Articles</span>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-[#8c7e6c] hover:text-red-400 transition-colors cursor-pointer"
                >
                  Vider le panier
                </button>
              )}
            </div>

            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div 
                  key={item.id}
                  className="p-3 rounded-2xl bg-[#141210]/70 border border-[#26221d] flex items-center justify-between gap-3"
                >
                  <img
                    src={item.menuItem.image}
                    alt={item.menuItem.name}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#f7f2e7] truncate">
                      {item.menuItem.name}
                    </h4>
                    {item.selectedExtras.length > 0 && (
                      <p className="text-[10px] text-[#dfd0ba] truncate">
                        +{item.selectedExtras.map(e => e.name).join(', ')}
                      </p>
                    )}
                    <span className="text-xs font-serif font-bold text-[#dfd0ba]">
                      {item.itemTotal.toLocaleString('fr-DZ')} DA
                    </span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-1.5 bg-[#0a0807] px-2 py-1 rounded-lg border border-[#26221d]">
                    <button
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="p-1 text-[#8c7e6c] hover:text-white cursor-pointer"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-mono font-bold text-[#f7f2e7] w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="p-1 text-[#8c7e6c] hover:text-white cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1.5 text-[#5a5247] hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-[#6a5e51] text-xs">
                Votre panier est vide pour le moment.
              </div>
            )}
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-[#26221d] bg-[#0a0807] space-y-4">
          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-[#8c7e6c]">
              <span>Sous-total</span>
              <span className="font-mono">{subtotal.toLocaleString('fr-DZ')} DA</span>
            </div>
            {orderType === 'livraison' && (
              <div className="flex justify-between text-[#8c7e6c]">
                <span>Frais de livraison</span>
                <span className="font-mono">{deliveryFee.toLocaleString('fr-DZ')} DA</span>
              </div>
            )}
            <div className="flex justify-between text-base font-serif font-bold text-[#dfd0ba] pt-2 border-t border-[#26221d]">
              <span>Total à régler</span>
              <span>{total.toLocaleString('fr-DZ')} DA</span>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || isSubmitting}
            className={`w-full py-4 rounded-full font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
              cartItems.length > 0 && !isSubmitting
                ? 'bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] shadow-black/80 hover:scale-[1.02]'
                : 'bg-[#181614] text-[#554d44] cursor-not-allowed border border-[#26221d]'
            }`}
          >
            {isSubmitting ? (
              <span>Transmission de la commande...</span>
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
