import React from 'react';
import { Logo } from '../brand/Logo';
import { MapPin, Phone, Clock, Instagram, Facebook, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection }) => {
  return (
    <footer id="contact" className="bg-[#050505] text-stone-400 border-t border-stone-800/80 pt-16 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Logo size="lg" />
          <p className="text-xs text-stone-400 leading-relaxed font-sans">
            L’excellence de la pizza artisanale à Alger. Pizzas au feu de bois, pâte au levain naturel et produits d'exception.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xl">🇩🇿</span>
            <span className="text-xs font-mono text-amber-300 font-bold uppercase tracking-wider">
              Fier d'être Algérien & Authentique
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => onNavigateToSection('hero')} className="hover:text-amber-300 transition-colors cursor-pointer">
                Accueil
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection('menu')} className="hover:text-amber-300 transition-colors cursor-pointer">
                Menu & Spécialités
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection('histoire')} className="hover:text-amber-300 transition-colors cursor-pointer">
                Notre Histoire
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection('avis')} className="hover:text-amber-300 transition-colors cursor-pointer">
                Avis Clients
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection('reservation')} className="hover:text-amber-300 transition-colors cursor-pointer">
                Réserver une table
              </button>
            </li>
          </ul>
        </div>

        {/* Location & Hours */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-4">
            Restaurant & Horaires
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>12 Boulevard Mohamed V, Alger Centre, Algérie</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-stone-200">Ouvert 7j/7</span>
                <span className="text-stone-400">11h30 – 23h30 (Service continu)</span>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="font-mono text-amber-200">+213 (0)21 65 43 21</span>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-4">
            Suivez-nous
          </h4>
          <p className="text-xs text-stone-400 mb-4">
            Rejoignez la communauté PIDZERIA sur les réseaux sociaux pour découvrir nos coulisses.
          </p>
          <div className="flex items-center gap-3">
            <a href="#instagram" className="p-2.5 rounded-full bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-all border border-stone-800">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#facebook" className="p-2.5 rounded-full bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-all border border-stone-800">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#website" className="p-2.5 rounded-full bg-stone-900 hover:bg-amber-500 hover:text-stone-950 text-stone-300 transition-all border border-stone-800">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <p>© {new Date().getFullYear()} PIDZERIA — Tous droits réservés.</p>
        <p className="flex items-center gap-1">
          <span>Créé avec passion à Alger</span>
          <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" />
        </p>
      </div>
    </footer>
  );
};
