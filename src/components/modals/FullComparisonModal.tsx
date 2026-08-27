import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Building2, 
  Stethoscope, 
  Pill, 
  Star, 
  Check, 
  Minus, 
  ShieldCheck, 
  Download, 
  Share2,
  Sparkles
} from 'lucide-react';
import { Hospital, Doctor, Medicine } from '../../types';

interface FullComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospitals: Hospital[];
  doctors: Doctor[];
  medicines: Medicine[];
  initialCategory?: 'hospitals' | 'doctors' | 'medicines';
}

export const FullComparisonModal: React.FC<FullComparisonModalProps> = ({
  isOpen,
  onClose,
  hospitals,
  doctors,
  medicines,
  initialCategory = 'hospitals',
}) => {
  const [activeTab, setActiveTab] = useState<'hospitals' | 'doctors' | 'medicines'>(initialCategory);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden"
        id="full-comparison-modal"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50 gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 font-['Outfit',sans-serif]">
                Multi-Entity Decision Comparison Matrix
              </h3>
              <p className="text-xs text-slate-500">
                Transparent clinical audits, pricing benchmarks, and service capability comparison
              </p>
            </div>
          </div>

          {/* Tab Switcher & Close */}
          <div className="flex items-center gap-3">
            <div className="flex items-center p-1 bg-slate-200/80 rounded-xl">
              <button
                onClick={() => setActiveTab('hospitals')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'hospitals' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Hospitals
              </button>
              <button
                onClick={() => setActiveTab('doctors')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'doctors' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Doctors
              </button>
              <button
                onClick={() => setActiveTab('medicines')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'medicines' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Medicines
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Matrix Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {activeTab === 'hospitals' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">
                      Facility Attribute
                    </th>
                    {hospitals.slice(0, 3).map((h) => (
                      <th key={h.id} className="p-3 text-left w-1/4">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <img src={h.image} alt={h.name} className="w-full h-24 rounded-lg object-cover mb-2" />
                          <h4 className="font-bold text-sm text-slate-900 leading-tight truncate">{h.name}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs font-bold text-teal-700">★ {h.rating}</span>
                            <span className="text-[10px] text-slate-400">{h.city}</span>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Accreditation Tier</td>
                    {hospitals.slice(0, 3).map((h) => (
                      <td key={h.id} className="p-3 text-slate-800 font-medium">{h.accreditation}</td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">Avg. Emergency Triage Wait</td>
                    {hospitals.slice(0, 3).map((h) => (
                      <td key={h.id} className="p-3 font-bold text-teal-800">{h.avgWaitTime}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Clinical Departments</td>
                    {hospitals.slice(0, 3).map((h) => (
                      <td key={h.id} className="p-3 text-slate-800 font-semibold">{h.departmentsCount} Departments</td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">ICU & Critical Care Beds</td>
                    {hospitals.slice(0, 3).map((h) => (
                      <td key={h.id} className="p-3 text-slate-800 font-semibold">{h.icuBeds} Beds</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Key Specialty Focus</td>
                    {hospitals.slice(0, 3).map((h) => (
                      <td key={h.id} className="p-3 text-slate-600">
                        {h.specialties.join(', ')}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">24/7 Emergency & Trauma</td>
                    {hospitals.slice(0, 3).map((h) => (
                      <td key={h.id} className="p-3">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                          <Check className="w-3.5 h-3.5" /> Active
                        </span>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Cost Benchmark Index</td>
                    {hospitals.slice(0, 3).map((h) => (
                      <td key={h.id} className="p-3 font-semibold text-slate-800">{h.costScore}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'doctors' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">
                      Specialist Metric
                    </th>
                    {doctors.slice(0, 3).map((d) => (
                      <th key={d.id} className="p-3 text-left w-1/4">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <img src={d.image} alt={d.name} className="w-14 h-14 rounded-full object-cover mb-2" />
                          <h4 className="font-bold text-sm text-slate-900 leading-tight">{d.name}</h4>
                          <p className="text-xs text-blue-700 font-semibold">{d.specialization}</p>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Clinical Experience</td>
                    {doctors.slice(0, 3).map((d) => (
                      <td key={d.id} className="p-3 font-bold text-slate-800">{d.experienceYears} Years Practice</td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">Patient Satisfaction Rating</td>
                    {doctors.slice(0, 3).map((d) => (
                      <td key={d.id} className="p-3 font-bold text-amber-700">★ {d.rating} ({d.reviewsCount} reviews)</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Consultation Fee</td>
                    {doctors.slice(0, 3).map((d) => (
                      <td key={d.id} className="p-3 font-extrabold text-slate-900 text-sm">${d.consultationFee}</td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">Affiliated Hospital</td>
                    {doctors.slice(0, 3).map((d) => (
                      <td key={d.id} className="p-3 text-slate-700">{d.hospital}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Education & Medical Board</td>
                    {doctors.slice(0, 3).map((d) => (
                      <td key={d.id} className="p-3 text-slate-600">{d.education}</td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">Next Slot Availability</td>
                    {doctors.slice(0, 3).map((d) => (
                      <td key={d.id} className="p-3 font-semibold text-teal-700">{d.availability}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'medicines' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/4">
                      Pharmaceutical Metric
                    </th>
                    {medicines.slice(0, 3).map((m) => (
                      <th key={m.id} className="p-3 text-left w-1/4">
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                          <div className="p-2 w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2">
                            <Pill className="w-4 h-4" />
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 leading-tight">{m.name}</h4>
                          <span className="text-[10px] text-emerald-700 font-semibold">Save {m.genericSavingsPercent}% with generics</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Generic Active Compound</td>
                    {medicines.slice(0, 3).map((m) => (
                      <td key={m.id} className="p-3 font-bold text-slate-800">{m.genericName}</td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">Brand Retail Price</td>
                    {medicines.slice(0, 3).map((m) => (
                      <td key={m.id} className="p-3 font-extrabold text-slate-900">${m.price.toFixed(2)}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Top Bioequivalent Alternative</td>
                    {medicines.slice(0, 3).map((m) => (
                      <td key={m.id} className="p-3">
                        <span className="font-bold text-emerald-800">{m.alternatives[0]?.name}</span>
                        <span className="block text-[11px] text-slate-500">${m.alternatives[0]?.price.toFixed(2)} ({m.alternatives[0]?.savings})</span>
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-slate-50/50">
                    <td className="p-3 font-semibold text-slate-700">Manufacturer & Compliance</td>
                    {medicines.slice(0, 3).map((m) => (
                      <td key={m.id} className="p-3 text-slate-700">{m.manufacturer}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="p-3 font-semibold text-slate-700">Clinical Indications</td>
                    {medicines.slice(0, 3).map((m) => (
                      <td key={m.id} className="p-3 text-slate-600">{m.uses.join(', ')}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Standardized comparison scores calculated via MediCompare Clinical Index.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('Comparison report saved as PDF.')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF Report</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800"
            >
              Done
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
