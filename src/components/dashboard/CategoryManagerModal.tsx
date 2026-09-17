import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Plus, Edit2, Trash2, Check, X, Tag, AlertCircle, CheckCircle } from 'lucide-react';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory?: (categoryId: string) => void;
}

const EMOJI_PRESETS = ['🍕', '🇩🇿', '🇮🇹', '🇺🇸', '🍟', '🥤', '🍰', '🥖', '🧀', '🥗', '🥩', '🌮', '🍔', '☕'];

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory
}) => {
  const { categories, addCategory, updateCategory, deleteCategory, menuItems } = useStore();

  // New Category State
  const [newName, setNewName] = useState('');
  const [newIcon, setNewIcon] = useState('🍕');

  // Editing Category State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editIcon, setEditIcon] = useState('');

  // Notifications
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  if (!isOpen) return null;

  const showFeedback = (type: 'success' | 'error', text: string) => {
    setFeedbackMsg({ type, text });
    setTimeout(() => setFeedbackMsg(null), 3500);
  };

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      showFeedback('error', 'Le nom de la catégorie est obligatoire.');
      return;
    }

    // Check duplicate name
    if (categories.some(c => c.name.toLowerCase() === newName.trim().toLowerCase())) {
      showFeedback('error', 'Une catégorie avec ce nom existe déjà.');
      return;
    }

    const created = addCategory({
      name: newName.trim(),
      icon: newIcon.trim() || '🍕'
    });

    setNewName('');
    setNewIcon('🍕');
    showFeedback('success', `Catégorie "${created.name}" créée avec succès.`);

    if (onSelectCategory) {
      onSelectCategory(created.id);
    }
  };

  const handleStartEdit = (catId: string, currentName: string, currentIcon?: string) => {
    setEditingId(catId);
    setEditName(currentName);
    setEditIcon(currentIcon || '🍕');
    setConfirmDeleteId(null);
  };

  const handleSaveEdit = (catId: string) => {
    if (!editName.trim()) {
      showFeedback('error', 'Le nom de la catégorie ne peut pas être vide.');
      return;
    }

    updateCategory(catId, {
      name: editName.trim(),
      icon: editIcon.trim() || '🍕'
    });

    setEditingId(null);
    showFeedback('success', 'Catégorie modifiée avec succès.');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditIcon('');
  };

  const handleDelete = (catId: string) => {
    if (categories.length <= 1) {
      showFeedback('error', 'Vous devez conserver au moins une catégorie dans le menu.');
      return;
    }

    const itemsCount = menuItems.filter(i => i.category === catId).length;
    deleteCategory(catId);
    setConfirmDeleteId(null);

    if (itemsCount > 0) {
      showFeedback('success', `Catégorie supprimée. ${itemsCount} produit(s) ont été automatiquement réassignés.`);
    } else {
      showFeedback('success', 'Catégorie supprimée avec succès.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-[#0e0c0a] border border-[#3d352d] rounded-3xl p-6 md:p-8 max-w-2xl w-full space-y-6 relative shadow-2xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#161311] text-[#8c7e6c] hover:text-[#f7f2e7] border border-[#2a241f] cursor-pointer transition-colors"
          title="Fermer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#dfd0ba]/10 border border-[#dfd0ba]/20 flex items-center justify-center text-[#dfd0ba]">
              <Tag className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#f7f2e7]">
              Gestion des Catégories
            </h2>
          </div>
          <p className="text-xs text-[#8c7e6c] font-mono">
            Modifiez le libellé de vos sections, ajoutez de nouvelles catégories ou personnalisez leurs icônes.
          </p>
        </div>

        {/* Feedback Alert */}
        {feedbackMsg && (
          <div
            className={`p-3.5 rounded-xl text-xs font-mono flex items-center gap-2.5 transition-all ${
              feedbackMsg.type === 'success'
                ? 'bg-[#142214] border border-[#2d4d24] text-[#a8e092]'
                : 'bg-[#2b1614] border border-[#4d2522] text-[#e09292]'
            }`}
          >
            {feedbackMsg.type === 'success' ? (
              <CheckCircle className="w-4 h-4 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* Add New Category Form */}
        <div className="p-4 rounded-2xl bg-[#141210] border border-[#221e1a] space-y-3 shrink-0">
          <span className="text-xs font-mono uppercase tracking-wider text-[#dfd0ba] font-bold block">
            + Ajouter une nouvelle catégorie
          </span>
          <form onSubmit={handleCreateCategory} className="space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              {/* Icon / Emoji Input */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                  placeholder="🍕"
                  maxLength={4}
                  className="w-14 text-center bg-[#1c1815] border border-[#2e2720] rounded-xl px-2 py-2.5 text-base focus:outline-none focus:border-[#dfd0ba]"
                  title="Icône ou Emoji"
                />
                {/* Quick Emoji selection */}
                <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] py-1">
                  {EMOJI_PRESETS.slice(0, 5).map(emoji => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setNewIcon(emoji)}
                      className={`w-7 h-7 rounded-lg text-sm flex items-center justify-center cursor-pointer transition-colors ${
                        newIcon === emoji ? 'bg-[#dfd0ba]/20 border border-[#dfd0ba]' : 'hover:bg-[#25201b]'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <input
                type="text"
                required
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Nom (ex: Pains & Calzones, Entrées Chaudes...)"
                className="flex-1 bg-[#1c1815] border border-[#2e2720] rounded-xl px-3.5 py-2.5 text-xs text-[#f7f2e7] placeholder-[#665c52] focus:outline-none focus:border-[#dfd0ba]"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95 shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Ajouter</span>
              </button>
            </div>
          </form>
        </div>

        {/* Existing Categories List */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-mono text-[#8c7e6c] px-1">
            <span>Catégories actives ({categories.length})</span>
            <span>Produits associés</span>
          </div>

          <div className="space-y-2">
            {categories.map((cat) => {
              const count = menuItems.filter((i) => i.category === cat.id).length;
              const isEditing = editingId === cat.id;
              const isConfirmingDelete = confirmDeleteId === cat.id;

              return (
                <div
                  key={cat.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isEditing
                      ? 'bg-[#181412] border-[#dfd0ba]/50 shadow-lg'
                      : 'bg-[#141210] border-[#221e1a] hover:border-[#2e2822]'
                  }`}
                >
                  {isEditing ? (
                    // Inline Edit Form
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          value={editIcon}
                          onChange={(e) => setEditIcon(e.target.value)}
                          maxLength={4}
                          className="w-12 text-center bg-[#1c1815] border border-[#dfd0ba]/40 rounded-xl px-2 py-2 text-base focus:outline-none text-[#f7f2e7]"
                          title="Icône / Emoji"
                        />
                        <input
                          type="text"
                          required
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="flex-1 bg-[#1c1815] border border-[#dfd0ba]/40 rounded-xl px-3 py-2 text-xs text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]"
                        />
                      </div>

                      <div className="flex items-center gap-2 justify-end">
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(cat.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Enregistrer</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-3 py-1.5 rounded-xl bg-[#221e1a] hover:bg-[#2e2822] text-[#8c7e6c] hover:text-[#f7f2e7] text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Annuler</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Standard Row
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-9 h-9 rounded-xl bg-[#1c1815] border border-[#2a241f] flex items-center justify-center text-lg shrink-0">
                          {cat.icon || '🍕'}
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-[#f7f2e7] text-sm truncate">
                              {cat.name}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#1f1a16] text-[#8c7e6c]">
                              ID: {cat.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#1b1814] text-[#dfd0ba] border border-[#2b241e]">
                          {count} {count > 1 ? 'produits' : 'produit'}
                        </span>

                        {isConfirmingDelete ? (
                          <div className="flex items-center gap-1.5 animate-fade-in">
                            <span className="text-[11px] font-mono text-red-400 mr-1 hidden sm:inline">
                              Confirmer ?
                            </span>
                            <button
                              type="button"
                              onClick={() => handleDelete(cat.id)}
                              className="px-2.5 py-1 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-200 text-xs font-bold cursor-pointer"
                            >
                              Oui, supprimer
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-2 py-1 rounded-lg bg-[#221e1a] text-[#8c7e6c] hover:text-[#f7f2e7] text-xs cursor-pointer"
                            >
                              Non
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleStartEdit(cat.id, cat.name, cat.icon)}
                              title="Modifier cette catégorie"
                              className="p-1.5 rounded-lg bg-[#1a1714] text-[#8c7e6c] hover:text-[#dfd0ba] border border-[#2a241f] hover:border-[#dfd0ba]/40 cursor-pointer transition-colors"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              disabled={categories.length <= 1}
                              onClick={() => setConfirmDeleteId(cat.id)}
                              title={
                                categories.length <= 1
                                  ? 'Impossible de supprimer la seule catégorie'
                                  : 'Supprimer cette catégorie'
                              }
                              className={`p-1.5 rounded-lg border transition-colors ${
                                categories.length <= 1
                                  ? 'opacity-30 cursor-not-allowed bg-[#1a1714] text-[#8c7e6c] border-[#2a241f]'
                                  : 'bg-[#1a1714] text-[#8c7e6c] hover:text-red-400 border-[#2a241f] hover:border-red-900/40 cursor-pointer'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#221e1a] text-xs text-[#8c7e6c]">
          <span>Toutes les modifications sont synchronisées avec la carte client en temps réel.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#1b1814] hover:bg-[#25201a] text-[#dfd0ba] border border-[#2e2720] font-bold text-xs uppercase tracking-wider cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
