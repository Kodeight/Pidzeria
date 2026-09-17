import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { MenuItem, PizzaCategory } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, X, Copy, Tag, Search, RotateCcw, Filter } from 'lucide-react';
import { CategoryManagerModal } from './CategoryManagerModal';

/**
 * Returns a short, clean summary suitable for dashboard administration rows.
 * Keeps full description intact in state, only formatting the preview.
 */
function getShortDashboardDescription(desc: string, maxLen = 95): string {
  if (!desc) return '';
  const trimmed = desc.trim();
  const periodIndex = trimmed.indexOf('.');
  if (periodIndex > 20 && periodIndex <= maxLen) {
    return trimmed.slice(0, periodIndex + 1);
  }
  if (trimmed.length <= maxLen) {
    return trimmed;
  }
  return trimmed.slice(0, maxLen).trim() + '...';
}

export const MenuManager: React.FC = () => {
  const {
    menuItems,
    categories,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    duplicateMenuItem,
    toggleMenuItemAvailability
  } = useStore();

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isManagingCategories, setIsManagingCategories] = useState(false);
  const [duplicateSuccessMsg, setDuplicateSuccessMsg] = useState<string | null>(null);

  // Filter & Search states
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<PizzaCategory>('algeriennes');
  const [price, setPrice] = useState(1500);
  const [image, setImage] = useState('');
  const [ingredientsStr, setIngredientsStr] = useState('');

  // Helper getters for dynamic categories
  const getCategoryObj = (catId: string) => categories.find(c => c.id === catId);
  const getCategoryLabel = (catId: string) => getCategoryObj(catId)?.name || catId;
  const getCategoryIcon = (catId: string) => getCategoryObj(catId)?.icon || '🍕';

  // Filtered menu items
  const filteredMenuItems = menuItems.filter(item => {
    const matchesCategory = selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;
    const matchesSearch = !searchQuery.trim() ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setName('');
    setDescription('');
    const defaultCat = (selectedCategoryFilter !== 'all' ? selectedCategoryFilter : categories[0]?.id || 'algeriennes') as PizzaCategory;
    setCategory(defaultCat);
    setPrice(1500);
    setImage('https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop');
    setIngredientsStr('Sauce tomate, Mozzarella, Olives, Huile d\'olive');
    setIsAddingNew(true);
  };

  const handleResetFilters = () => {
    setSelectedCategoryFilter('all');
    setSearchQuery('');
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

  const handleDuplicate = (item: MenuItem) => {
    const duplicated = duplicateMenuItem(item);
    setDuplicateSuccessMsg(`Produit "${item.name}" dupliqué avec succès.`);
    setTimeout(() => {
      setDuplicateSuccessMsg(null);
    }, 4000);
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
      {/* Top Header Bar with Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7f2e7]">Gestion de la Carte & Prix DA</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1a1714] border border-[#2a241f] text-[#dfd0ba] text-xs font-mono">
              {menuItems.length} produits
            </span>
          </div>
          <p className="text-xs text-[#8c7e6c] font-mono mt-1">
            Filtrez vos créations par catégorie, mettez à jour les prix en dinars algériens ou gérez la liste de vos sections.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0 lg:ml-auto justify-end">
          {/* Category Management Button */}
          <button
            type="button"
            onClick={() => setIsManagingCategories(true)}
            className="px-4 py-2.5 rounded-full bg-[#161311] hover:bg-[#1f1a16] text-[#dfd0ba] border border-[#2a241f] hover:border-[#dfd0ba]/50 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 shrink-0 whitespace-nowrap"
            title="Gérer, ajouter ou modifier les catégories"
          >
            <Tag className="w-4 h-4 text-[#dfd0ba]" />
            <span>Gérer les catégories</span>
            <span className="w-5 h-5 rounded-full bg-[#25201b] border border-[#382f25] text-[10px] font-mono flex items-center justify-center text-[#dfd0ba]">
              {categories.length}
            </span>
          </button>

          {/* Add Product Button */}
          <button
            type="button"
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 shrink-0 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 stroke-[3] text-[#0a0a0a]" />
            <span>Ajouter une création</span>
          </button>
        </div>
      </div>

      {/* Duplicate / Feedback Notification */}
      {duplicateSuccessMsg && (
        <div className="p-4 rounded-2xl bg-[#142214] border border-[#2d4d24] text-[#a8e092] text-xs font-mono flex items-center justify-between shadow-xl animate-fade-in">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-4 h-4 text-[#a8e092] shrink-0" />
            <span>{duplicateSuccessMsg}</span>
          </div>
          <button
            onClick={() => setDuplicateSuccessMsg(null)}
            className="text-[#a8e092]/70 hover:text-[#a8e092] cursor-pointer p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* CATEGORY FILTER & SEARCH BAR */}
      <div className="p-4 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] shadow-xl space-y-3.5">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#8c7e6c] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une création, ingrédient..."
              className="w-full bg-[#161311] border border-[#2a241f] rounded-2xl pl-10 pr-9 py-2.5 text-xs text-[#f7f2e7] placeholder-[#6b6053] focus:outline-none focus:border-[#dfd0ba] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8c7e6c] hover:text-[#dfd0ba] p-1 cursor-pointer"
                title="Effacer la recherche"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Active status & reset */}
          <div className="flex items-center justify-between md:justify-end gap-3 text-xs font-mono text-[#8c7e6c]">
            <span>
              {filteredMenuItems.length} / {menuItems.length} produit{menuItems.length > 1 ? 's' : ''}
            </span>
            {(selectedCategoryFilter !== 'all' || searchQuery.trim() !== '') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1c1815] text-[#dfd0ba] hover:bg-[#25201b] border border-[#2e2720] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Réinitialiser</span>
              </button>
            )}
          </div>
        </div>

        {/* Category Chips Scrollbar (matching main scrollbar style) */}
        <div className="pt-2 border-t border-[#221e1a]/60">
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 pt-0.5 custom-scrollbar">
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#8c7e6c] shrink-0 mr-1 hidden sm:flex">
              <Filter className="w-3.5 h-3.5 text-[#dfd0ba]" />
              <span>Filtre:</span>
            </div>

            {/* "Toutes" Chip */}
            <button
              type="button"
              onClick={() => setSelectedCategoryFilter('all')}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                selectedCategoryFilter === 'all'
                  ? 'bg-[#dfd0ba] text-[#0a0a0a] font-bold shadow-md'
                  : 'bg-[#141210] hover:bg-[#1a1714] text-[#8c7e6c] hover:text-[#f7f2e7] border border-[#221e1a]'
              }`}
            >
              <span>Toutes les catégories</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  selectedCategoryFilter === 'all'
                    ? 'bg-[#0a0a0a]/20 text-[#0a0a0a]'
                    : 'bg-[#1c1815] text-[#8c7e6c]'
                }`}
              >
                {menuItems.length}
              </span>
            </button>

            {/* Dynamic Categories Chips */}
            {categories.map((cat) => {
              const count = menuItems.filter((i) => i.category === cat.id).length;
              const isSelected = selectedCategoryFilter === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#dfd0ba] text-[#0a0a0a] font-bold shadow-md'
                      : 'bg-[#141210] hover:bg-[#1a1714] text-[#8c7e6c] hover:text-[#f7f2e7] border border-[#221e1a]'
                  }`}
                >
                  <span>{cat.icon || '🍕'}</span>
                  <span>{cat.name}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected
                        ? 'bg-[#0a0a0a]/20 text-[#0a0a0a]'
                        : 'bg-[#1c1815] text-[#8c7e6c]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}

            {/* Quick Button to Add/Manage categories right in the filter bar */}
            <button
              type="button"
              onClick={() => setIsManagingCategories(true)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono text-[#8c7e6c] hover:text-[#dfd0ba] hover:bg-[#161311] border border-dashed border-[#2a241f] hover:border-[#dfd0ba]/40 transition-colors cursor-pointer shrink-0 ml-1"
              title="Ajouter ou modifier des catégories"
            >
              <Plus className="w-3 h-3" />
              <span>Gérer les catégories</span>
            </button>
          </div>
        </div>
      </div>

      {/* EMPTY FILTER STATE */}
      {filteredMenuItems.length === 0 && (
        <div className="p-12 text-center rounded-3xl bg-[#0e0c0a] border border-[#221e1a] shadow-xl space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#1a1613] border border-[#2e261f] flex items-center justify-center text-[#dfd0ba] mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#f7f2e7]">Aucun produit trouvé</h3>
            <p className="text-xs text-[#8c7e6c] font-mono max-w-md mx-auto">
              Aucune création ne correspond à la catégorie sélectionnée ou à votre recherche.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-[#1c1815] text-[#dfd0ba] hover:bg-[#25201b] border border-[#2e2720] text-xs font-mono cursor-pointer transition-colors"
            >
              Voir tous les produits
            </button>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="px-4 py-2 rounded-xl bg-[#dfd0ba] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
            >
              Créer dans cette catégorie
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP TABLE VIEW: Fixed column widths, locked alignment, consistent row height */}
      {filteredMenuItems.length > 0 && (
        <div className="hidden md:block p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] shadow-xl overflow-x-auto custom-scrollbar">
          <table className="w-full text-left table-fixed border-collapse min-w-[720px]">
            <colgroup>
              {/* 1. Image + Product info: flexible but constrained */}
              <col className="w-[42%]" />
              {/* 2. Category: locked badge width */}
              <col className="w-[18%]" />
              {/* 3. Price: dedicated numeric column */}
              <col className="w-[13%]" />
              {/* 4. Stock: dedicated toggle column */}
              <col className="w-[14%]" />
              {/* 5. Actions: locked right buttons */}
              <col className="w-[13%]" />
            </colgroup>
            <thead>
              <tr className="border-b border-[#221e1a] text-[#8c7e6c] font-mono text-xs uppercase tracking-wider">
                <th className="pb-4 pr-3">Produit</th>
                <th className="pb-4 px-3 text-center">Catégorie</th>
                <th className="pb-4 px-3 text-right">Prix DZD</th>
                <th className="pb-4 px-3 text-center">Disponibilité</th>
                <th className="pb-4 pl-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#221e1a]/60">
              {filteredMenuItems.map(item => (
                <tr key={item.id} className="hover:bg-[#141210] transition-colors h-[76px]">
                  {/* 1. PRODUCT: IMAGE + (NAME & CONSTRAINED SHORT DESCRIPTION) */}
                  <td className="py-3.5 pr-3 align-middle">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#26211c]"
                        loading="lazy"
                      />
                      <div className="min-w-0 flex-1 overflow-hidden">
                        <h4 className="font-bold text-[#f7f2e7] text-sm truncate leading-snug" title={item.name}>
                          {item.name}
                        </h4>
                        <p
                          className="text-xs text-[#8c7e6c] truncate leading-normal mt-0.5"
                          title={item.description}
                        >
                          {getShortDashboardDescription(item.description)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* 2. CATEGORY: LOCKED BADGE (Dynamic with icon and label) */}
                  <td className="py-3.5 px-3 align-middle text-center">
                    <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-[#161311] border border-[#2a241f] text-[#dfd0ba] text-xs font-mono whitespace-nowrap h-7 min-w-[125px]">
                      <span>{getCategoryIcon(item.category)}</span>
                      <span className="truncate max-w-[115px]">{getCategoryLabel(item.category)}</span>
                    </span>
                  </td>

                  {/* 3. PRICE: DEDICATED COLUMN */}
                  <td className="py-3.5 px-3 align-middle text-right">
                    <span className="font-serif font-extrabold text-[#dfd0ba] text-sm whitespace-nowrap">
                      {item.price.toLocaleString('fr-DZ')} DA
                    </span>
                  </td>

                  {/* 4. STOCK: TOGGLE BUTTON */}
                  <td className="py-3.5 px-3 align-middle text-center">
                    <button
                      type="button"
                      onClick={() => toggleMenuItemAvailability(item.id)}
                      className={`inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap h-7 min-w-[105px] cursor-pointer transition-all ${
                        item.isAvailable
                          ? 'bg-[#182014] text-[#9bc774] border border-[#2f3d26] hover:border-[#9bc774]/50'
                          : 'bg-[#241310] text-[#df8b80] border border-[#42201b] hover:border-[#df8b80]/50'
                      }`}
                    >
                      {item.isAvailable ? <CheckCircle className="w-3.5 h-3.5 shrink-0" /> : <XCircle className="w-3.5 h-3.5 shrink-0" />}
                      <span>{item.isAvailable ? 'En Stock' : 'Rupture'}</span>
                    </button>
                  </td>

                  {/* 5. ACTIONS: LOCKED ON RIGHT */}
                  <td className="py-3.5 pl-3 align-middle text-right">
                    <div className="inline-flex items-center justify-end gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleDuplicate(item)}
                        title="Dupliquer ce produit"
                        className="p-2 rounded-xl bg-[#161311] text-[#8c7e6c] hover:text-[#dfd0ba] hover:bg-[#1f1a16] border border-[#2a241f] hover:border-[#dfd0ba]/40 cursor-pointer transition-all flex items-center justify-center group"
                      >
                        <Copy className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        title="Modifier ce produit"
                        className="p-2 rounded-xl bg-[#161311] text-[#8c7e6c] hover:text-[#dfd0ba] hover:bg-[#1f1a16] border border-[#2a241f] hover:border-[#dfd0ba]/40 cursor-pointer transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteMenuItem(item.id)}
                        title="Supprimer ce produit"
                        className="p-2 rounded-xl bg-[#161311] text-[#8c7e6c] hover:text-red-400 hover:bg-[#201211] border border-[#2a241f] hover:border-red-500/40 cursor-pointer transition-colors"
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
      )}

      {/* MOBILE / TABLET COMPACT VIEW (< md): Restructured cards prevent horizontal squeezing */}
      {filteredMenuItems.length > 0 && (
        <div className="md:hidden space-y-3">
          {filteredMenuItems.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-[#0e0c0a] border border-[#221e1a] space-y-3 shadow-lg"
            >
              {/* Top row: Image + Name + Price */}
              <div className="flex items-start gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 border border-[#26211c]"
                  loading="lazy"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="font-bold text-[#f7f2e7] text-sm truncate">{item.name}</h4>
                    <span className="font-serif font-extrabold text-[#dfd0ba] text-sm whitespace-nowrap shrink-0">
                      {item.price.toLocaleString('fr-DZ')} DA
                    </span>
                  </div>
                  <p className="text-xs text-[#8c7e6c] line-clamp-2 leading-relaxed mt-0.5" title={item.description}>
                    {getShortDashboardDescription(item.description)}
                  </p>
                </div>
              </div>

              {/* Bottom info & actions row */}
              <div className="flex items-center justify-between pt-2.5 border-t border-[#221e1a]/60 gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center justify-center gap-1 px-2.5 py-0.5 rounded-full bg-[#161311] border border-[#2a241f] text-[#dfd0ba] text-[11px] font-mono whitespace-nowrap">
                    <span>{getCategoryIcon(item.category)}</span>
                    <span className="truncate max-w-[120px]">{getCategoryLabel(item.category)}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleMenuItemAvailability(item.id)}
                    className={`inline-flex items-center justify-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all ${
                      item.isAvailable
                        ? 'bg-[#182014] text-[#9bc774] border border-[#2f3d26]'
                        : 'bg-[#241310] text-[#df8b80] border border-[#42201b]'
                    }`}
                  >
                    {item.isAvailable ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    <span>{item.isAvailable ? 'En Stock' : 'Rupture'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDuplicate(item)}
                    title="Dupliquer ce produit"
                    className="p-1.5 rounded-lg bg-[#161311] text-[#8c7e6c] hover:text-[#dfd0ba] border border-[#2a241f] cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleOpenEdit(item)}
                    title="Modifier ce produit"
                    className="p-1.5 rounded-lg bg-[#161311] text-[#8c7e6c] hover:text-[#dfd0ba] border border-[#2a241f] cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => deleteMenuItem(item.id)}
                    title="Supprimer ce produit"
                    className="p-1.5 rounded-lg bg-[#161311] text-[#8c7e6c] hover:text-red-400 border border-[#2a241f] cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal (Full Description available and editable) */}
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
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono text-[#8c7e6c]">Description complète</label>
                  <span className="text-[11px] text-[#8c7e6c]/70 font-mono">Conserve les détails pour la commande</span>
                </div>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-[#161311] border border-[#2a241f] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba] leading-relaxed resize-y"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono text-[#8c7e6c]">Catégorie</label>
                    <button
                      type="button"
                      onClick={() => setIsManagingCategories(true)}
                      className="text-[10px] text-[#dfd0ba] hover:underline flex items-center gap-1 cursor-pointer font-mono"
                    >
                      <Tag className="w-2.5 h-2.5" />
                      <span>Gérer</span>
                    </button>
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as PizzaCategory)}
                    className="w-full bg-[#161311] border border-[#2a241f] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon ? `${cat.icon} ` : ''}{cat.name}
                      </option>
                    ))}
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

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-lg active:scale-95"
                >
                  {editingItem ? 'Enregistrer les modifications' : 'Enregistrer la création'}
                </button>
                {editingItem && (
                  <button
                    type="button"
                    onClick={() => {
                      const ings = ingredientsStr.split(',').map(s => s.trim()).filter(Boolean);
                      addMenuItem({
                        name: `${name} (Copie)`,
                        description,
                        category,
                        price,
                        image,
                        ingredients: ings,
                        isAvailable: true,
                      });
                      setIsAddingNew(false);
                      setEditingItem(null);
                      setDuplicateSuccessMsg(`Création "${name}" dupliquée avec succès !`);
                      setTimeout(() => setDuplicateSuccessMsg(null), 4000);
                    }}
                    className="px-5 py-3.5 rounded-full bg-[#181512] hover:bg-[#25201b] text-[#dfd0ba] border border-[#3d3328] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2"
                    title="Enregistrer comme nouveau produit dupliqué"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Dupliquer</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Category Manager Modal */}
      <CategoryManagerModal
        isOpen={isManagingCategories}
        onClose={() => setIsManagingCategories(false)}
        onSelectCategory={(newCatId) => {
          setCategory(newCatId as PizzaCategory);
        }}
      />
    </div>
  );
};

