import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { TableInfo } from '../../types';
import { Grid2X2, QrCode, Users, Utensils, CheckCircle, Clock, ExternalLink, X } from 'lucide-react';

export const TableMap: React.FC = () => {
  const { tables, updateTableStatus, orders } = useStore();
  const [selectedTableForQR, setSelectedTableForQR] = useState<TableInfo | null>(null);

  const getStatusBadge = (status: TableInfo['status']) => {
    switch (status) {
      case 'libre':
        return <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold">Libre</span>;
      case 'en_commande':
        return <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold animate-pulse">En commande</span>;
      case 'occupee':
        return <span className="px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold">Occupée</span>;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-amber-50">Plan de Salle & QR Codes Tables</h1>
          <p className="text-xs text-stone-400 font-mono mt-1">
            Gérez la disponibilité des tables en direct et génerer les QR codes de commande autonome.
          </p>
        </div>
      </div>

      {/* Table Map Floor Plan Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {tables.map(table => {
          const currentOrder = orders.find(o => o.id === table.currentOrderId);

          return (
            <div
              key={table.id}
              className={`p-5 rounded-3xl border transition-all flex flex-col justify-between space-y-4 shadow-xl ${
                table.status === 'libre'
                  ? 'bg-stone-900/80 border-stone-800 hover:border-emerald-500/40'
                  : table.status === 'en_commande'
                  ? 'bg-amber-950/30 border-amber-500/40'
                  : 'bg-red-950/20 border-red-500/30'
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <span className="text-lg font-serif font-black text-amber-400">
                  T-{table.number}
                </span>
                {getStatusBadge(table.status)}
              </div>

              {/* Seats count */}
              <div className="text-xs text-stone-400 flex items-center gap-1.5 font-mono">
                <Users className="w-3.5 h-3.5 text-stone-500" />
                <span>{table.seats} places</span>
              </div>

              {currentOrder && (
                <div className="p-2 rounded-xl bg-stone-950 text-[10px] text-amber-300 font-mono">
                  Order {currentOrder.orderNumber} • {currentOrder.total} DA
                </div>
              )}

              {/* Status Action Buttons */}
              <div className="pt-2 border-t border-stone-800/80 space-y-1.5">
                <div className="grid grid-cols-3 gap-1">
                  <button
                    onClick={() => updateTableStatus(table.id, 'libre')}
                    className={`py-1 rounded-lg text-[9px] font-bold ${
                      table.status === 'libre' ? 'bg-emerald-500 text-black' : 'bg-stone-950 text-stone-400 hover:text-white'
                    }`}
                  >
                    Libre
                  </button>
                  <button
                    onClick={() => updateTableStatus(table.id, 'en_commande')}
                    className={`py-1 rounded-lg text-[9px] font-bold ${
                      table.status === 'en_commande' ? 'bg-amber-500 text-black' : 'bg-stone-950 text-stone-400 hover:text-white'
                    }`}
                  >
                    Cmd
                  </button>
                  <button
                    onClick={() => updateTableStatus(table.id, 'occupee')}
                    className={`py-1 rounded-lg text-[9px] font-bold ${
                      table.status === 'occupee' ? 'bg-red-500 text-white' : 'bg-stone-950 text-stone-400 hover:text-white'
                    }`}
                  >
                    Occ
                  </button>
                </div>

                <button
                  onClick={() => setSelectedTableForQR(table)}
                  className="w-full py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/20 text-[10px] font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <QrCode className="w-3 h-3" />
                  <span>Générer QR</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Table QR Modal Generator */}
      {selectedTableForQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#121010] border border-amber-500/30 rounded-3xl p-8 max-w-md w-full text-center space-y-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedTableForQR(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">QR Code Table Autonome</span>
              <h2 className="text-3xl font-serif font-black text-amber-50 mt-1">
                Table #{selectedTableForQR.number}
              </h2>
            </div>

            {/* Simulated High Quality SVG QR Code */}
            <div className="bg-white p-6 rounded-3xl inline-block shadow-2xl border-4 border-amber-500">
              <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="100" height="100" fill="white"/>
                {/* QR Code matrix pattern */}
                <path fill="#0d0b0b" d="M10,10 h25 v25 h-25 z M15,15 h15 v15 h-15 z M20,20 h5 v5 h-5 z"/>
                <path fill="#0d0b0b" d="M65,10 h25 v25 h-25 z M70,15 h15 v15 h-15 z M75,20 h5 v5 h-5 z"/>
                <path fill="#0d0b0b" d="M10,65 h25 v25 h-25 z M15,70 h15 v15 h-15 z M20,75 h5 v5 h-5 z"/>
                <rect x="40" y="10" width="10" height="10" fill="#0d0b0b"/>
                <rect x="40" y="25" width="15" height="10" fill="#0d0b0b"/>
                <rect x="65" y="45" width="25" height="10" fill="#0d0b0b"/>
                <rect x="10" y="45" width="20" height="10" fill="#0d0b0b"/>
                <rect x="40" y="65" width="10" height="25" fill="#0d0b0b"/>
                <rect x="55" y="65" width="35" height="10" fill="#0d0b0b"/>
                <rect x="75" y="80" width="15" height="10" fill="#0d0b0b"/>
              </svg>
            </div>

            <div className="p-3 rounded-2xl bg-stone-900 border border-stone-800 text-xs font-mono text-stone-300 break-all">
              {window.location.origin}/menu?table={selectedTableForQR.number}
            </div>

            <a
              href={`/menu?table=${selectedTableForQR.number}`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 rounded-full bg-amber-500 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg"
            >
              <span>Tester le lien client (Table {selectedTableForQR.number})</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
