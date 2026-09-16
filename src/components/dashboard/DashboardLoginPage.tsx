import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldAlert, Loader2 } from 'lucide-react';
import { FadeUp } from '../motion/MotionSystem';

interface DashboardLoginPageProps {
  onLoginSuccess: () => void;
  onReturnToStorefront: () => void;
}

export const DashboardLoginPage: React.FC<DashboardLoginPageProps> = ({
  onLoginSuccess,
  onReturnToStorefront,
}) => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const trimmedUser = username.trim();
    if (!trimmedUser || !password) {
      setErrorMessage('Veuillez renseigner votre identifiant et votre mot de passe.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await login(trimmedUser, password);
      if (result.success) {
        onLoginSuccess();
      } else {
        const errorText = typeof result.error === 'string'
          ? result.error
          : typeof (result.error as any)?.message === 'string'
          ? (result.error as any).message
          : 'Identifiant ou mot de passe incorrect.';
        setErrorMessage(errorText);
      }
    } catch {
      setErrorMessage('Une erreur est survenue lors de la connexion.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#f7f2e7] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#dfd0ba] selection:text-black">
      {/* Background subtle luxury lighting glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#dfd0ba]/5 rounded-full blur-[140px]" />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#dfd0ba 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Top bar with back to storefront */}
      <header className="relative z-10 p-6 sm:p-8 flex items-center justify-between max-w-6xl mx-auto w-full">
        <button
          onClick={onReturnToStorefront}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#100e0c] hover:bg-[#1c1814] text-[#cbb89d] hover:text-[#f7f2e7] border border-[#2a241f] text-xs font-semibold tracking-wider transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au site client</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141210] border border-[#2a241e] text-[11px] font-mono text-[#8c7e6c] uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfd0ba] animate-pulse" />
          <span>Système POS / KDS</span>
        </div>
      </header>

      {/* Center login card */}
      <main className="relative z-10 max-w-md w-full mx-auto px-5 py-8">
        <FadeUp distance={25} duration={0.8}>
          <div className="rounded-3xl bg-[#0a0807] border border-[#26211c] p-7 sm:p-10 shadow-2xl shadow-black/90">
            
            {/* Official PIDZERIA brand logo */}
            <div className="flex flex-col items-center text-center mb-8">
              <Logo size="lg" className="mb-5" />
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161310] border border-[#2c2620] text-[#dfd0ba] text-xs font-mono font-bold uppercase tracking-widest mb-2">
                <Lock className="w-3 h-3 text-[#dfd0ba]" />
                <span>Administration</span>
              </div>

              <p className="text-xs text-[#a69684] max-w-xs font-light leading-relaxed">
                Accès sécurisé réservé à la gestion des commandes, cuisine et paramètres restaurant.
              </p>
            </div>

            {/* Error banner */}
            {errorMessage && (
              <div className="mb-6 p-3.5 rounded-2xl bg-[#230f0c] border border-[#4d1a14] text-[#f7a494] text-xs flex items-center gap-3 animate-fadeIn">
                <ShieldAlert className="w-4 h-4 shrink-0 text-[#f7a494]" />
                <span className="leading-snug">{errorMessage}</span>
              </div>
            )}

            {/* Login form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Username field */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="admin-username" 
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[#cbb89d]"
                >
                  Identifiant
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8c7e6c]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Votre identifiant"
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 pl-10 pr-4 rounded-xl bg-[#12100e] border border-[#2a241f] focus:border-[#dfd0ba] focus:bg-[#181512] text-[#f7f2e7] placeholder-[#5c5246] text-sm font-medium transition-all focus:outline-none disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-1.5">
                <label 
                  htmlFor="admin-password" 
                  className="block text-xs font-mono font-bold uppercase tracking-wider text-[#cbb89d]"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8c7e6c]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="admin-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    required
                    disabled={isSubmitting}
                    className="w-full h-12 pl-10 pr-11 rounded-xl bg-[#12100e] border border-[#2a241f] focus:border-[#dfd0ba] focus:bg-[#181512] text-[#f7f2e7] placeholder-[#5c5246] text-sm font-medium transition-all focus:outline-none disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#8c7e6c] hover:text-[#dfd0ba] transition-colors cursor-pointer"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl shadow-black/80 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Connexion en cours...</span>
                    </>
                  ) : (
                    <span>Se connecter</span>
                  )}
                </button>
              </div>

            </form>

            <div className="mt-6 pt-6 border-t border-[#1f1a16] text-center">
              <span className="text-[11px] font-mono text-[#6e6355]">
                Accès restreint aux employés autorisés PIDZERIA
              </span>
            </div>

          </div>
        </FadeUp>
      </main>

      {/* Footer copyright */}
      <footer className="relative z-10 p-6 text-center">
        <p className="text-[11px] font-mono text-[#5c5246]">
          PIDZERIA ALGER • Système de Gestion POS & KDS v2.4
        </p>
      </footer>
    </div>
  );
};
