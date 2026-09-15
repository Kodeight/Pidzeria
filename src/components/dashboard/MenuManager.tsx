import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MenuItem, PizzaCategory } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, X } from 'lucide-react';

export const MenuManager: React.FC = () => {
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem, toggleMenuItemAvailability } = useStore();
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PizzaCategory>('algeriennes');
  const [price, setPrice] = useState(1500);
  const [image, setImage] = useState('');
  const [ingredientsStr, setIngredientsStr] = useState('');

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    setCategory('algeriennes');
    setPrice(1500);
    setImage('https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop');
    setIngredientsStr('Sauce tomate, Mozzarella, Olives, Huile d\'olive');
    setIsAddingNew(true);
  };

  const handleOpenEdit = (item: MenuItem) => {
    setEditingItem(item);
    setName(item.name);
    setDescription(item.description);
    setCategory(item.category);
    setPrice(item.price);
    setImage(item.image);
    setIngredientsStr(item.ingredients.join(', '));
    setIsAddingNew(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const ings = ingredientsStr.split(',').map(s => s.trim()).filter(Boolean);

    if (editingItem) {
      updateMenuItem({
        ...editingItem,
        name,
        description,
        category,
        price,
        image,
        ingredients: ings
      });
    } else {
      addMenuItem({
        name,
        description,
        category,
        price,
        image,
        ingredients: ings,
        isAvailable: true
      });
    }

    setIsAddingNew(false);
    setEditingItem(null);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-[#fbf7ee]">Gestion de la Carte & Prix DA</h1>
          <p className="text-xs text-[#8a988c] font-mono mt-1">
            Mettez à jour les prix en dinars algériens, l'indisponibilité des ingrédients ou ajoutez de nouvelles pizzas.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-2xl bg-[#547734] hover:bg-[#628b3d] text-[#fbf7ee] font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#547734]/25"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Ajouter une création</span>
        </button>
      </div>

      {/* Menu Table List */}
      <div className="p-6 rounded-3xl bg-[#0c120e] border border-[#243326] overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#243326] text-[#8a988c] font-mono uppercase tracking-wider">
              <th className="pb-4">Produit</th>
              <th className="pb-4">Catégorie</th>
              <th className="pb-4">Prix DZD</th>
              <th className="pb-4">Disponibilité</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#243326]/60">
            {menuItems.map(item => (
              <tr key={item.id} className="hover:bg-[#121813]/40 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                    <div>
                      <h4 className="font-bold text-[#f2e5ce] text-sm">{item.name}</h4>
                      <p className="text-[11px] text-[#8a988c] line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                </td>

                <td className="py-4">
                  <span className="px-3 py-1 rounded-full bg-[#121813] border border-[#243326] text-[#9bc774] text-[11px] font-mono capitalize">
                    {item.category}
                  </span>
                </td>

                <td className="py-4 font-serif font-extrabold text-[#9bc774] text-sm">
                  {item.price.toLocaleString('fr-DZ')} DA
                </td>

                <td className="py-4">
                  <button
                    onClick={() => toggleMenuItemAvailability(item.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                      item.isAvailable
                        ? 'bg-[#547734]/20 text-[#9bc774] border border-[#547734]/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}
                  >
                    {item.isAvailable ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{item.isAvailable ? 'En Stock' : 'Rupture'}</span>
                  </button>
                </td>

                <td className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-2 rounded-xl bg-[#121813] text-[#8a988c] hover:text-[#9bc774] border border-[#243326] cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="p-2 rounded-xl bg-[#121813] text-[#8a988c] hover:text-red-400 border border-[#243326] cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#0c120e] border border-[#547734]/30 rounded-3xl p-6 md:p-8 max-w-xl w-full space-y-6 relative shadow-2xl">
            <button
              onClick={() => setIsAddingNew(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#121813] text-[#8a988c] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-serif font-bold text-[#fbf7ee]">
              {editingItem ? 'Modifier le Produit' : 'Nouveau Produit au Menu'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8a988c] block mb-1">Nom du produit</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#121813] border border-[#243326] rounded-xl px-3 py-2 text-xs text-[#f2e5ce] focus:outline-none focus:border-[#547734]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8a988c] block mb-1">Description gourmande</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-[#121813] border border-[#243326] rounded-xl px-3 py-2 text-xs text-[#f2e5ce] focus:outline-none focus:border-[#547734]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-[#8a988c] block mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PizzaCategory)}
                    className="w-full bg-[#121813] border border-[#243326] rounded-xl px-3 py-2 text-xs text-[#f2e5ce] focus:outline-none focus:border-[#547734]"
                  >
                    <option value="italiennes">Pizzas Italiennes</option>
                    <option value="algeriennes">Pizzas Algériennes</option>
                    <option value="carrees">Pizzas Carrées</option>
                    <option value="americaines">Pizzas Américaines</option>
                    <option value="accompagnements">Accompagnements</option>
                    <option value="boissons">Boissons</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-[#8a988c] block mb-1">Prix en DA</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-[#121813] border border-[#243326] rounded-xl px-3 py-2 text-xs text-[#9bc774] font-bold focus:outline-none focus:border-[#547734]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#8a988c] block mb-1">URL de l'image (HTTPS)</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#121813] border border-[#243326] rounded-xl px-3 py-2 text-xs text-[#f2e5ce] focus:outline-none focus:border-[#547734]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8a988c] block mb-1">Ingrédients (séparés par une virgule)</label>
                <input
                  type="text"
                  value={ingredientsStr}
                  onChange={(e) => setIngredientsStr(e.target.value)}
                  className="w-full bg-[#121813] border border-[#243326] rounded-xl px-3 py-2 text-xs text-[#f2e5ce] focus:outline-none focus:border-[#547734]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#547734] hover:bg-[#628b3d] text-[#fbf7ee] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Enregistrer la création
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
