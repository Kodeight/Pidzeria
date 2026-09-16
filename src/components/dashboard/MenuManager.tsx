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
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7f2e7]">Gestion de la Carte & Prix DA</h1>
          <p className="text-xs text-[#8c7e6c] font-mono mt-1">
            Mettez à jour les prix en dinars algériens, l'indisponibilité des ingrédients ou ajoutez de nouvelles pizzas.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[3] text-[#0a0a0a]" />
          <span>Ajouter une création</span>
        </button>
      </div>

      {/* Menu Table List */}
      <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#221e1a] text-[#8c7e6c] font-mono uppercase tracking-wider">
              <th className="pb-4">Produit</th>
              <th className="pb-4">Catégorie</th>
              <th className="pb-4">Prix DZD</th>
              <th className="pb-4">Disponibilité</th>
              <th className="pb-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#221e1a]/60">
            {menuItems.map(item => (
              <tr key={item.id} className="hover:bg-[#141210] transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#26211c]" />
                    <div>
                      <h4 className="font-bold text-[#f7f2e7] text-sm">{item.name}</h4>
                      <p className="text-[11px] text-[#8c7e6c] line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                </td>

                <td className="py-4">
                  <span className="px-3 py-1 rounded-full bg-[#161311] border border-[#2a241f] text-[#dfd0ba] text-[11px] font-mono capitalize">
                    {item.category}
                  </span>
                </td>

                <td className="py-4 font-serif font-extrabold text-[#dfd0ba] text-sm">
                  {item.price.toLocaleString('fr-DZ')} DA
                </td>

                <td className="py-4">
                  <button
                    onClick={() => toggleMenuItemAvailability(item.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                      item.isAvailable
                        ? 'bg-[#182014] text-[#9bc774] border border-[#2f3d26]'
                        : 'bg-[#241310] text-[#df8b80] border border-[#42201b]'
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
                      className="p-2 rounded-xl bg-[#161311] text-[#8c7e6c] hover:text-[#dfd0ba] border border-[#2a241f] cursor-pointer transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="p-2 rounded-xl bg-[#161311] text-[#8c7e6c] hover:text-red-400 border border-[#2a241f] cursor-pointer transition-colors"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0e0c0a] border border-[#3d352d] rounded-3xl p-6 md:p-8 max-w-xl w-full space-y-6 relative shadow-2xl">
            <button
              onClick={() => setIsAddingNew(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#161311] text-[#8c7e6c] hover:text-[#f7f2e7] border border-[#2a241f] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-serif font-bold text-[#f7f2e7]">
              {editingItem ? 'Modifier le Produit' : 'Nouveau Produit au Menu'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-[#8c7e6c] block mb-1">Nom du produit</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#161311] border border-[#2a241f] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8c7e6c] block mb-1">Description gourmande</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-[#161311] border border-[#2a241f] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-mono text-[#8c7e6c] block mb-1">Catégorie</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PizzaCategory)}
                    className="w-full bg-[#161311] border border-[#2a241f] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]"
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
                  <label className="text-xs font-mono text-[#8c7e6c] block mb-1">Prix en DA</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value, 10) || 0)}
                    className="w-full bg-[#161311] border border-[#2a241f] rounded-xl px-3.5 py-2.5 text-xs text-[#dfd0ba] font-bold font-mono focus:outline-none focus:border-[#dfd0ba]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-[#8c7e6c] block mb-1">URL de l'image (HTTPS)</label>
                <input
                  type="url"
                  required
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-[#161311] border border-[#2a241f] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[#8c7e6c] block mb-1">Ingrédients (séparés par une virgule)</label>
                <input
                  type="text"
                  value={ingredientsStr}
                  onChange={(e) => setIngredientsStr(e.target.value)}
                  className="w-full bg-[#161311] border border-[#2a241f] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg active:scale-95"
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

