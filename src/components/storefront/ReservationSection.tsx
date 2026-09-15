import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Calendar, Users, Clock, CheckCircle2, Phone, User, Sparkles } from 'lucide-react';
import { FadeUp, ScaleReveal } from '../motion/MotionSystem';

export const ReservationSection: React.FC = () => {
  const { addReservation } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [notes, setNotes] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    addReservation({
      name,
      phone,
      date,
      time,
      guests,
      notes
    });

    setIsSuccess(true);
  };

  return (
    <section id="reservation" className="py-28 px-6 md:px-12 max-w-5xl mx-auto w-full">
      <ScaleReveal initialScale={0.96} duration={0.9} distance={30}>
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/20 shadow-2xl relative overflow-hidden">
          
          <div className="text-center max-w-xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-widest mb-3">
              <Calendar className="w-3.5 h-3.5" />
              <span>Espace Table</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-50 mb-3">
              Réserver une Table chez PIDZERIA
            </h2>
            <p className="text-stone-300 text-sm">
              Réservez en ligne à l'avance pour garantir une expérience culinaire inoubliable avec vos proches.
            </p>
          </div>

          {isSuccess ? (
            <FadeUp distance={20} className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-amber-50">
                Réservation Demande Enregistrée !
              </h3>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                Merci {name}. Notre équipe va confirmer votre table pour {guests} personne{guests > 1 ? 's' : ''} le {date} à {time} par SMS.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 rounded-full bg-amber-500 text-stone-950 font-bold text-xs cursor-pointer hover:bg-amber-400 transition-colors"
              >
                Faire une autre réservation
              </button>
            </FadeUp>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nom complet</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Sofiane Benali"
                    className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Téléphone</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ex: 0550 12 34 56"
                    className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Date</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Heure</span>
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-500"
                  >
                    <option value="12:00">12:00 - Déjeuner</option>
                    <option value="13:30">13:30 - Déjeuner</option>
                    <option value="19:00">19:00 - Dîner</option>
                    <option value="20:00">20:00 - Dîner</option>
                    <option value="21:30">21:30 - Dîner</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    <span>Nombre de personnes</span>
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value, 10) || 1)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-sm text-stone-200 focus:outline-none focus:border-amber-500 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-2">
                  Demandes particulières (Optionnel)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Chaise haute pour enfant, anniversaire, table au calme..."
                  rows={2}
                  className="w-full bg-stone-900 border border-stone-800 rounded-2xl p-4 text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 text-stone-950 font-extrabold text-sm tracking-wide shadow-xl hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Réserver une table maintenant</span>
              </button>
            </form>
          )}

        </div>
      </ScaleReveal>
    </section>
  );
};
