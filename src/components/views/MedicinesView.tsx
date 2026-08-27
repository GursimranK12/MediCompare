import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Pill, 
  Search, 
  Sparkles, 
  Bookmark, 
  TrendingDown, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Calculator,
  DollarSign
} from 'lucide-react';
import { Medicine } from '../../types';

interface MedicinesViewProps {
  medicines: Medicine[];
  savedMedicineIds: string[];
  onToggleSave: (id: string) => void;
  onSelectMedicine: (medicine: Medicine) => void;
}

export const MedicinesView: React.FC<MedicinesViewProps> = ({
  medicines,
  savedMedicineIds,
  onToggleSave,
  onSelectMedicine,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [calcQuantity, setCalcQuantity] = useState<number>(30);

  const categories = ['All', 'Cardiovascular', 'Antibiotics', 'Endocrinology', 'Gastroenterology'];

  const filteredMedicines = medicines.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.uses.some((u) => u.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || m.category.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6" id="medicines-directory-view">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-bold">
              <Pill className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Generic Bioequivalent Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight mt-1">
            Medicines & Pharmaceutical Alternatives
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Discover verified generic pharmaceutical formulations with identical therapeutic response and up to 80% cost savings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 font-semibold text-xs border border-emerald-200">
            Average Savings: ~74%
          </span>
        </div>
      </div>

      {/* Savings Calculator Widget */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 max-w-lg">
          <div className="flex items-center gap-2 text-emerald-300 text-xs font-bold uppercase">
            <Calculator className="w-4 h-4" />
            <span>Interactive Bioequivalent Cost Savings Calculator</span>
          </div>
          <h2 className="text-lg font-bold font-['Outfit',sans-serif]">
            Calculate Your Annual Prescription Savings
          </h2>
          <p className="text-xs text-emerald-100/80">
            Compare brand pricing against clinically verified generic compositions. Adjust your monthly tablet intake below:
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-md border border-white/15">
          <div>
            <label className="block text-[10px] uppercase font-bold text-emerald-200 mb-1">
              Monthly Tablets / Units
            </label>
            <input
              type="number"
              min={10}
              max={180}
              step={10}
              value={calcQuantity}
              onChange={(e) => setCalcQuantity(Number(e.target.value) || 30)}
              className="w-24 p-2 rounded-lg bg-white text-slate-900 font-bold text-sm focus:outline-none"
            />
          </div>

          <div className="border-l border-white/20 pl-4">
            <span className="text-[10px] uppercase font-bold text-emerald-200 block">Est. Annual Savings</span>
            <div className="text-xl font-extrabold text-emerald-300">
              ${((calcQuantity / 30) * 360).toFixed(0)} / yr
            </div>
          </div>
        </div>
      </div>

      {/* Search & Categories */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search brand, generic compound, or condition..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Medicines Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredMedicines.map((med) => {
          const isSaved = savedMedicineIds.includes(med.id);

          return (
            <motion.div
              key={med.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700">
                      <Pill className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                        {med.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
                        {med.name}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleSave(med.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      isSaved ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </div>

                <div className="space-y-1 mb-4 text-xs">
                  <p className="text-slate-600">
                    Active Formulation: <strong className="text-slate-800">{med.composition}</strong>
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    Manufactured by: {med.manufacturer} · {med.prescriptionRequired ? 'Rx Required' : 'Over The Counter (OTC)'}
                  </p>
                </div>

                {/* Price & Savings Pill */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 mb-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Brand Price</span>
                    <span className="text-sm font-extrabold text-slate-900">${med.price.toFixed(2)}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-700 uppercase block">Generic Savings</span>
                    <span className="text-sm font-extrabold text-emerald-700">Save {med.genericSavingsPercent}%</span>
                  </div>
                </div>

                {/* Generic Bioequivalent Alternatives */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Verified Generic Bioequivalents:
                  </span>
                  {med.alternatives.map((alt, idx) => (
                    <div
                      key={idx}
                      className="p-2 rounded-lg bg-emerald-50/40 border border-emerald-100 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{alt.name}</span>
                        <span className="text-[10px] text-slate-500 ml-1.5">by {alt.manufacturer}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-emerald-800">${alt.price.toFixed(2)}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-emerald-100 text-emerald-800 font-bold rounded">
                          {alt.savings}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => onSelectMedicine(med)}
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors text-center"
                >
                  View Full Drug Monograph
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
