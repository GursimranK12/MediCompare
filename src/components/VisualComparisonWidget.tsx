import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  GitCompare, 
  ArrowRight, 
  Star, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock,
  DollarSign
} from 'lucide-react';
import { Hospital } from '../types';

interface VisualComparisonWidgetProps {
  hospitals: Hospital[];
  onOpenFullComparison: () => void;
}

export const VisualComparisonWidget: React.FC<VisualComparisonWidgetProps> = ({
  hospitals,
  onOpenFullComparison,
}) => {
  const [selectedAId, setSelectedAId] = useState<string>(hospitals[0]?.id || 'hosp-1');
  const [selectedBId, setSelectedBId] = useState<string>(hospitals[1]?.id || 'hosp-2');

  const hospA = hospitals.find((h) => h.id === selectedAId) || hospitals[0];
  const hospB = hospitals.find((h) => h.id === selectedBId) || hospitals[1];

  const features = [
    {
      name: 'Clinical Quality Rating',
      valA: `★ ${hospA.rating}`,
      valB: `★ ${hospB.rating}`,
      winner: hospA.rating >= hospB.rating ? 'A' : 'B',
      subtext: 'Patient review audits & clinical outcomes',
    },
    {
      name: 'Specialized Departments',
      valA: `${hospA.departmentsCount} Units`,
      valB: `${hospB.departmentsCount} Units`,
      winner: hospA.departmentsCount >= hospB.departmentsCount ? 'A' : 'B',
      subtext: 'Cardiology, Oncology, Neuro, Orthopedics',
    },
    {
      name: 'Advanced Medical Facilities',
      valA: `${hospA.facilitiesCount} Modern Suites`,
      valB: `${hospB.facilitiesCount} Modern Suites`,
      winner: hospA.facilitiesCount >= hospB.facilitiesCount ? 'A' : 'B',
      subtext: 'Robotic Surgery, 3T MRI, Cath Labs',
    },
    {
      name: 'Verified Patient Reviews',
      valA: `${(hospA.reviewsCount / 1000).toFixed(1)}K Verified`,
      valB: `${(hospB.reviewsCount / 1000).toFixed(1)}K Verified`,
      winner: hospA.reviewsCount >= hospB.reviewsCount ? 'A' : 'B',
      subtext: 'Discharge feedback and follow-up ratings',
    },
    {
      name: 'Emergency Response Wait',
      valA: hospA.avgWaitTime,
      valB: hospB.avgWaitTime,
      winner: parseInt(hospA.avgWaitTime) <= parseInt(hospB.avgWaitTime) ? 'A' : 'B',
      subtext: 'Average triage-to-physician response time',
    },
    {
      name: 'ICU Bed Capacity',
      valA: `${hospA.icuBeds} Beds`,
      valB: `${hospB.icuBeds} Beds`,
      winner: hospA.icuBeds >= hospB.icuBeds ? 'A' : 'B',
      subtext: 'Critical care and ventilator-ready beds',
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs" id="visual-comparison-widget">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Interactive Clinical Benchmark</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight mt-1">
            Visual Hospital Comparison Matrix
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time side-by-side metric comparison to guide informed healthcare facility selection.
          </p>
        </div>

        <button
          onClick={onOpenFullComparison}
          id="btn-view-full-comparison-matrix"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-xs transition-all active:scale-95 self-start sm:self-auto"
        >
          <span>View Full Comparison</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/60">
        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Primary Facility (Hospital A)
          </label>
          <select
            value={selectedAId}
            onChange={(e) => setSelectedAId(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg bg-white border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {hospitals.map((h) => (
              <option key={h.id} value={h.id} disabled={h.id === selectedBId}>
                {h.name} ({h.city})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
            Benchmark Facility (Hospital B)
          </label>
          <select
            value={selectedBId}
            onChange={(e) => setSelectedBId(e.target.value)}
            className="w-full py-2 px-3 text-xs sm:text-sm font-semibold rounded-lg bg-white border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            {hospitals.map((h) => (
              <option key={h.id} value={h.id} disabled={h.id === selectedAId}>
                {h.name} ({h.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200/80">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs">
              <th className="py-3.5 px-4 font-bold text-slate-700 w-2/5">Feature / Metric</th>
              <th className="py-3.5 px-4 font-bold text-teal-800 bg-teal-50/40 w-3/10 border-l border-r border-slate-200">
                <div className="flex items-center gap-2">
                  <img src={hospA.image} alt={hospA.name} className="w-6 h-6 rounded-md object-cover" />
                  <span className="truncate">{hospA.name}</span>
                </div>
              </th>
              <th className="py-3.5 px-4 font-bold text-blue-800 bg-blue-50/40 w-3/10">
                <div className="flex items-center gap-2">
                  <img src={hospB.image} alt={hospB.name} className="w-6 h-6 rounded-md object-cover" />
                  <span className="truncate">{hospB.name}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
            {features.map((feature, idx) => (
              <motion.tr
                key={feature.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className="hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-3 px-4">
                  <div className="font-semibold text-slate-800">{feature.name}</div>
                  <div className="text-[10px] text-slate-400 font-medium">{feature.subtext}</div>
                </td>

                {/* Val A */}
                <td className={`py-3 px-4 border-l border-r border-slate-100 ${
                  feature.winner === 'A' ? 'bg-teal-50/30 font-bold text-teal-900' : 'text-slate-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>{feature.valA}</span>
                    {feature.winner === 'A' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">
                        Lead
                      </span>
                    )}
                  </div>
                </td>

                {/* Val B */}
                <td className={`py-3 px-4 ${
                  feature.winner === 'B' ? 'bg-blue-50/30 font-bold text-blue-900' : 'text-slate-600'
                }`}>
                  <div className="flex items-center justify-between">
                    <span>{feature.valB}</span>
                    {feature.winner === 'B' && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">
                        Lead
                      </span>
                    )}
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer accreditation summary */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Accreditation: <strong>{hospA.accreditation}</strong> vs <strong>{hospB.accreditation}</strong></span>
        </div>
        <span className="text-[11px] text-slate-400">Data refreshed daily from health department registries</span>
      </div>
    </section>
  );
};
