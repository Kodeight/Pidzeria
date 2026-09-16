import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Calendar, Users, Clock, CheckCircle2, Phone, User } from 'lucide-react';
import { FadeUp, ScaleReveal } from '../motion/MotionSystem';
import { FloatingIngredient } from '../cinematic/FloatingIngredient';

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
    <section id="reservation" data-section="reservation" className="scroll-mt-24 py-24 sm:py-32 px-5 sm:px-8 md:px-12 max-w-5xl mx-auto w-full relative overflow-hidden">
      {/* FLOATING INGREDIENTS AROUND RESERVATION */}
      <div className="absolute top-8 -left-6 md:left-4 pointer-events-none z-0">
        <FloatingIngredient
          ingredient="tomato"
          size={110}
          parallaxSpeed={-60}
          rotationSpeed={-25}
          opacity={0.8}
          hideOnMobile
        />
      </div>

      <div className="absolute -bottom-8 -right-4 md:right-8 pointer-events-none z-0">
        <FloatingIngredient
          ingredient="pepperoni"
          size={100}
          parallaxSpeed={60}
          rotationSpeed={30}
          opacity={0.75}
          hideOnMobile
        />
      </div>

      <ScaleReveal initialScale={0.96} duration={0.9} distance={30} className="relative z-10">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#2a241f] shadow-2xl relative overflow-hidden bg-[#0c0a09]/95">
          
          {/* Header Sequential Stagger */}
          <div className="text-center max-w-xl mx-auto mb-10 space-y-3">
            <FadeUp distance={18} delay={0.0} duration={0.65}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161311] border border-[#2d2823] text-[#dfd0ba] text-xs font-mono uppercase tracking-widest">
                <Calendar className="w-3.5 h-3.5 text-[#cbb89d]" />
                <span>Table & Service</span>
              </div>
            </FadeUp>

            <FadeUp distance={18} delay={0.1} duration={0.65}>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#f7f2e7]">
                Réserver une table chez PIDZERIA
              </h2>
            </FadeUp>

            <FadeUp distance={18} delay={0.18} duration={0.65}>
              <p className="text-[#a69684] text-sm">
                Réservez votre table pour savourer une expérience culinaire raffinée et chaleureuse entre proches à Alger.
              </p>
            </FadeUp>
          </div>

          {isSuccess ? (
            <FadeUp distance={20} className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1c1814] border border-[#dfd0ba]/40 text-[#dfd0ba] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-[#f7f2e7]">
                Demande de réservation enregistrée !
              </h3>
              <p className="text-[#cbb89d] text-sm max-w-md mx-auto">
                Merci {name}. Notre équipe vous contactera pour confirmer votre table pour {guests} personne{guests > 1 ? 's' : ''} le {date} à {time}.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="px-6 py-2.5 rounded-full bg-[#dfd0ba] text-[#0a0a0a] font-bold text-xs cursor-pointer hover:bg-[#f3eadc] transition-colors"
              >
                Faire une autre réservation
              </button>
            </FadeUp>
          ) : (
            <FadeUp distance={20} delay={0.25} duration={0.7} className="w-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c] mb-2 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#cbb89d]" />
                      <span>Nom</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom complet"
                      className="w-full bg-[#12100e] border border-[#2a241f] rounded-2xl px-4 py-3 text-sm text-[#f7f2e7] placeholder:text-[#6a5e51] focus:outline-none focus:border-[#dfd0ba]/60"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c] mb-2 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-[#cbb89d]" />
                      <span>Téléphone</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0550..."
                      className="w-full bg-[#12100e] border border-[#2a241f] rounded-2xl px-4 py-3 text-sm text-[#f7f2e7] placeholder:text-[#6a5e51] focus:outline-none focus:border-[#dfd0ba]/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c] mb-2 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#cbb89d]" />
                      <span>Date</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-[#12100e] border border-[#2a241f] rounded-2xl px-4 py-3 text-sm text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]/60"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c] mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#cbb89d]" />
                      <span>Heure</span>
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-[#12100e] border border-[#2a241f] rounded-2xl px-4 py-3 text-sm text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]/60"
                    >
                      <option value="12:00">12:00 - Déjeuner</option>
                      <option value="13:00">13:00 - Déjeuner</option>
                      <option value="19:30">19:30 - Dîner</option>
                      <option value="20:30">20:30 - Dîner</option>
                      <option value="21:30">21:30 - Dîner</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c] mb-2 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#cbb89d]" />
                      <span>Personnes</span>
                    </label>
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-[#12100e] border border-[#2a241f] rounded-2xl px-4 py-3 text-sm text-[#f7f2e7] focus:outline-none focus:border-[#dfd0ba]/60"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'personne' : 'personnes'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c] mb-2 block">
                    Remarques ou demandes particulières (Optionnel)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Occasion spéciale, préférence de placement..."
                    className="w-full bg-[#12100e] border border-[#2a241f] rounded-2xl px-4 py-3 text-sm text-[#f7f2e7] placeholder:text-[#6a5e51] focus:outline-none focus:border-[#dfd0ba]/60"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl shadow-black/80 cursor-pointer hover:scale-[1.01]"
                >
                  Confirmer la demande de réservation
                </button>
              </form>
            </FadeUp>
          )}

        </div>
      </ScaleReveal>
    </section>
  );
};
