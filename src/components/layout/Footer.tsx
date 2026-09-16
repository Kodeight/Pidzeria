import React from 'react';
import { Logo } from '../brand/Logo';
import { MapPin, Phone, Clock, Instagram, Facebook, Globe, Heart } from 'lucide-react';

interface FooterProps {
  onNavigateToSection: (sectionId: string) => void;
  onNavigateToMenu?: () => void;
  onNavigateToDashboard?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToSection, onNavigateToMenu, onNavigateToDashboard }) => {
  return (
    <footer id="contact" className="bg-[#050505] text-[#8c7e6c] border-t border-[#1c1916] pt-16 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <Logo size="lg" />
          <p className="text-xs text-[#a69684] leading-relaxed font-sans">
            L’excellence de la pizza artisanale à Alger. Cuisson au feu de bois, fermentation naturelle lente et produits nobles d'exception.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="text-xl">🇩🇿</span>
            <span className="text-xs font-mono text-[#dfd0ba] font-bold uppercase tracking-wider">
              Alger Centre • Algérie
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#dfd0ba] font-bold mb-4">
            Navigation
          </h4>
          <ul className="space-y-2.5 text-xs">
            <li>
              <button onClick={() => onNavigateToSection('hero')} className="hover:text-[#f7f2e7] transition-colors cursor-pointer">
                Accueil
              </button>
            </li>
            <li>
              <button 
                onClick={() => {
                  if (onNavigateToMenu) onNavigateToMenu();
                  else onNavigateToSection('menu');
                }} 
                className="hover:text-[#f7f2e7] transition-colors cursor-pointer text-[#dfd0ba] font-semibold"
              >
                La Carte Complète
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection('histoire')} className="hover:text-[#f7f2e7] transition-colors cursor-pointer">
                Notre Histoire
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection('avis')} className="hover:text-[#f7f2e7] transition-colors cursor-pointer">
                Avis Clients
              </button>
            </li>
            <li>
              <button onClick={() => onNavigateToSection('reservation')} className="hover:text-[#f7f2e7] transition-colors cursor-pointer">
                Réserver une table
              </button>
            </li>
            {onNavigateToDashboard && (
              <li className="pt-1.5 border-t border-[#1c1916]">
                <button 
                  onClick={onNavigateToDashboard}
                  className="hover:text-[#dfd0ba] text-[#6e6355] hover:underline transition-colors cursor-pointer text-[11px] font-mono flex items-center gap-1.5"
                >
                  <span>→ Espace Restaurant (Dashboard)</span>
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Location & Hours */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#dfd0ba] font-bold mb-4">
            Restaurant & Horaires
          </h4>
          <ul className="space-y-3 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#cbb89d] shrink-0 mt-0.5" />
              <span>14 Rue Didouche Mourad, Alger Centre, Algérie</span>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-[#cbb89d] shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-[#f7f2e7]">Ouvert 7j/7</span>
                <span className="text-[#8c7e6c]">11h30 – 23h30 (Service continu)</span>
              </div>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#cbb89d] shrink-0" />
              <span className="font-mono text-[#dfd0ba]">+213 (0)21 65 43 21</span>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#dfd0ba] font-bold mb-4">
            Suivez-nous
          </h4>
          <p className="text-xs text-[#8c7e6c] mb-4">
            Rejoignez la communauté PIDZERIA pour découvrir nos nouvelles créations et coulisses.
          </p>
          <div className="flex items-center gap-3">
            <a href="#instagram" className="p-2.5 rounded-full bg-[#12100e] hover:bg-[#dfd0ba] hover:text-[#0a0a0a] text-[#cbb89d] transition-all border border-[#2a241f]">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#facebook" className="p-2.5 rounded-full bg-[#12100e] hover:bg-[#dfd0ba] hover:text-[#0a0a0a] text-[#cbb89d] transition-all border border-[#2a241f]">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#website" className="p-2.5 rounded-full bg-[#12100e] hover:bg-[#dfd0ba] hover:text-[#0a0a0a] text-[#cbb89d] transition-all border border-[#2a241f]">
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-[#161412] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5a5247]">
        <p>© {new Date().getFullYear()} PIDZERIA — Tous droits réservés.</p>
        <p className="flex items-center gap-1.5">
          <span>Pizzeria artisanale à Alger</span>
          <span className="text-[#c93a2b]">♥</span>
        </p>
      </div>
    </footer>
  );
};
