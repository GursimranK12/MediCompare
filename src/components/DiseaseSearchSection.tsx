import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Activity, 
  Building2, 
  Stethoscope, 
  Pill, 
  Sparkles, 
  ArrowRight, 
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Disease, NavigationTab } from '../types';

interface DiseaseSearchSectionProps {
  diseases: Disease[];
  onSelectDisease: (disease: Disease) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const DiseaseSearchSection: React.FC<DiseaseSearchSectionProps> = ({
  diseases,
  onSelectDisease,
  onNavigate,
}) => {
  const [diseaseQuery, setDiseaseQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const matched = diseaseQuery.trim()
    ? diseases.filter(
        (d) =>
          d.name.toLowerCase().includes(diseaseQuery.toLowerCase()) ||
          d.commonSymptoms.some((s) => s.toLowerCase().includes(diseaseQuery.toLowerCase())) ||
          d.category.toLowerCase().includes(diseaseQuery.toLowerCase())
      )
    : [];

  const commonConditions = [
    { label: 'Hypertension', id: 'dis-1' },
    { label: 'Type 2 Diabetes', id: 'dis-2' },
    { label: 'Migraine', id: 'dis-3' },
    { label: 'Osteoarthritis', id: 'dis-4' },
    { label: 'Asthma & Allergy', id: 'dis-5' },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden" id="disease-search-section">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Title */}
      <div className="max-w-2xl mb-6 relative z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-2">
          <Activity className="w-3.5 h-3.5" /> Condition & Specialist Mapping
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-['Outfit',sans-serif]">
          What are you looking for today?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Explore by health condition to instantly discover recommended clinical specialists, treatment pathways, and certified hospital departments.
        </p>
      </div>

      {/* Large Quick Action 4-Grid Buttons */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 relative z-10">
        <button
          onClick={() => onNavigate('hospitals')}
          className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-xs text-left transition-all group active:scale-98"
        >
          <Building2 className="w-5 h-5 text-teal-300 mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-bold text-xs sm:text-sm text-white">Find a Hospital</p>
          <p className="text-[11px] text-teal-200/70 mt-0.5">Top-rated facilities</p>
        </button>

        <button
          onClick={() => onNavigate('doctors')}
          className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-xs text-left transition-all group active:scale-98"
        >
          <Stethoscope className="w-5 h-5 text-blue-300 mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-bold text-xs sm:text-sm text-white">Find a Doctor</p>
          <p className="text-[11px] text-blue-200/70 mt-0.5">Specialists by rating</p>
        </button>

        <button
          onClick={() => onNavigate('medicines')}
          className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-xs text-left transition-all group active:scale-98"
        >
          <Pill className="w-5 h-5 text-emerald-300 mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-bold text-xs sm:text-sm text-white">Compare Medicines</p>
          <p className="text-[11px] text-emerald-200/70 mt-0.5">Generic equivalents</p>
        </button>

        <button
          onClick={() => onNavigate('diseases')}
          className="p-4 rounded-xl bg-teal-500/25 hover:bg-teal-500/35 border border-teal-400/40 backdrop-blur-xs text-left transition-all group active:scale-98"
        >
          <Activity className="w-5 h-5 text-amber-300 mb-2 group-hover:scale-110 transition-transform" />
          <p className="font-bold text-xs sm:text-sm text-white">Explore by Disease</p>
          <p className="text-[11px] text-amber-200/70 mt-0.5">Symptom & specialist index</p>
        </button>
      </div>

      {/* Disease Search Field with Smooth Focus Glow */}
      <div className="relative z-10 max-w-2xl">
        <div
          className={`flex items-center w-full px-4 py-3 rounded-xl transition-all duration-300 ${
            isFocused
              ? 'bg-white text-slate-900 ring-4 ring-teal-400/40 shadow-xl'
              : 'bg-white/10 text-white border border-white/20 hover:bg-white/15'
          }`}
        >
          <Search className={`w-5 h-5 mr-3 flex-shrink-0 ${isFocused ? 'text-teal-600' : 'text-teal-300'}`} />
          <input
            type="text"
            value={diseaseQuery}
            onChange={(e) => setDiseaseQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="Search by disease or health condition (e.g. Hypertension, Migraine, Diabetes)…"
            className={`w-full text-xs sm:text-sm bg-transparent focus:outline-none placeholder:text-slate-400 ${
              isFocused ? 'text-slate-900' : 'text-white'
            }`}
            id="disease-search-input-field"
          />
        </div>

        {/* Quick Suggested Condition Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-3 text-xs">
          <span className="text-slate-400 text-[11px] font-medium">Common Conditions:</span>
          {commonConditions.map((cond) => (
            <button
              key={cond.id}
              onClick={() => {
                const found = diseases.find((d) => d.id === cond.id);
                if (found) onSelectDisease(found);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-teal-500/30 hover:border-teal-400 border border-white/10 text-teal-200 text-xs font-semibold transition-all"
            >
              {cond.label}
            </button>
          ))}
        </div>

        {/* Live Disease Matches Overlay */}
        <AnimatePresence>
          {diseaseQuery.trim().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute left-0 right-0 top-full mt-2 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-40 max-h-72 overflow-y-auto"
            >
              {matched.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No matching health condition found for "{diseaseQuery}".
                </div>
              ) : (
                <div className="p-2 divide-y divide-slate-100">
                  {matched.map((dis) => (
                    <div
                      key={dis.id}
                      onClick={() => {
                        onSelectDisease(dis);
                        setDiseaseQuery('');
                      }}
                      className="p-3 hover:bg-teal-50/60 rounded-xl cursor-pointer transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-teal-700">
                            {dis.name}
                          </p>
                          <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded font-semibold">
                            {dis.severity}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Symptoms: {dis.commonSymptoms.slice(0, 3).join(', ')} · Specialists: {dis.suggestedSpecialists.join(', ')}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
