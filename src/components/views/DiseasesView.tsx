import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  Search, 
  Stethoscope, 
  Building2, 
  ShieldAlert, 
  CheckCircle2, 
  ArrowRight,
  HeartPulse,
  Info
} from 'lucide-react';
import { Disease, NavigationTab } from '../../types';

interface DiseasesViewProps {
  diseases: Disease[];
  onNavigate: (tab: NavigationTab) => void;
  onSelectDisease: (disease: Disease) => void;
}

export const DiseasesView: React.FC<DiseasesViewProps> = ({
  diseases,
  onNavigate,
  onSelectDisease,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(diseases[0]);

  const filteredDiseases = diseases.filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.commonSymptoms.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6" id="diseases-view">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
              <Activity className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Clinical Condition Encyclopedia</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight mt-1">
            Diseases, Symptoms & Care Pathways
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Identify common clinical symptoms, recommended medical specialties, accredited hospital departments, and verified treatment guidelines.
          </p>
        </div>
      </div>

      {/* Main Grid: Disease List & Deep Dive Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Disease List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search diseases or symptoms (e.g., headache, asthma)..."
              className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-2xs"
            />
          </div>

          <div className="space-y-2 max-h-[70vh] overflow-y-auto">
            {filteredDiseases.map((dis) => {
              const isSelected = selectedDisease?.id === dis.id;

              return (
                <div
                  key={dis.id}
                  onClick={() => setSelectedDisease(dis)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                      : 'bg-white border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
                      {dis.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200 font-semibold">
                      {dis.severity}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 font-['Outfit',sans-serif]">
                    {dis.name}
                  </h3>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {dis.commonSymptoms.slice(0, 3).map((sym, i) => (
                      <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {sym}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Dive Disease Inspector */}
        <div className="lg:col-span-7">
          {selectedDisease ? (
            <motion.div
              key={selectedDisease.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-6"
            >
              {/* Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-xs uppercase">
                    {selectedDisease.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Severity: <strong>{selectedDisease.severity}</strong>
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                  {selectedDisease.name}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {selectedDisease.overview}
                </p>
              </div>

              {/* Symptoms Matrix */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Recognized Clinical Symptoms
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDisease.commonSymptoms.map((sym, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs text-slate-800">
                      <HeartPulse className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      <span>{sym}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Suggested Specialists */}
              <div>
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Recommended Specialist Disciplines
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDisease.suggestedSpecialists.map((spec, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 border border-blue-200 text-xs font-semibold"
                    >
                      <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Primary Treatment & Prevention */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200/60 space-y-2 text-xs">
                  <h4 className="font-bold text-teal-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    <span>Primary Treatments</span>
                  </h4>
                  <ul className="space-y-1 text-slate-700">
                    {selectedDisease.primaryTreatments.map((t, i) => (
                      <li key={i}>• {t}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 space-y-2 text-xs">
                  <h4 className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-amber-600" />
                    <span>Preventive Protocols</span>
                  </h4>
                  <ul className="space-y-1 text-slate-700">
                    {selectedDisease.preventiveTips.map((p, i) => (
                      <li key={i}>• {p}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('doctors')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Find Specialists for {selectedDisease.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={() => onNavigate('hospitals')}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-xs border border-teal-200 transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  <span>View Accredited Hospital Centers</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              Select a health condition from the left directory to inspect clinical guidelines.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
