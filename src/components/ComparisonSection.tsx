import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Stethoscope, 
  Pill, 
  GitCompare, 
  ArrowRight, 
  Layers, 
  Sparkles,
  Check
} from 'lucide-react';
import { NavigationTab } from '../types';

interface ComparisonSectionProps {
  onCompareCategory: (category: 'hospitals' | 'doctors' | 'medicines') => void;
  onNavigateTab: (tab: NavigationTab) => void;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({
  onCompareCategory,
  onNavigateTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'hospitals' | 'doctors' | 'medicines'>('hospitals');

  const comparisonCategories = [
    {
      id: 'hospitals' as const,
      title: 'Hospitals Comparison',
      icon: Building2,
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50',
      borderAccent: 'hover:border-teal-400',
      activeBorder: 'border-teal-500 ring-2 ring-teal-500/20 bg-teal-50/20',
      description: 'Evaluate healthcare institutions based on emergency response, bed availability, and specialty accreditations.',
      attributes: [
        { label: 'Facilities', detail: 'ICU, 24/7 Blood Bank, Trauma Center' },
        { label: 'Departments', detail: 'Cardiology, Oncology, Neuro, Ortho' },
        { label: 'Ratings', detail: '4.8★ Patient & NABH Gold Audits' },
        { label: 'Services', detail: 'Telehealth, Robotic Surgery, Cashless' },
      ],
      tagline: 'Compare 2+ Hospitals Side-by-Side',
      buttonBg: 'bg-teal-600 hover:bg-teal-700 text-white',
    },
    {
      id: 'doctors' as const,
      title: 'Doctors Comparison',
      icon: Stethoscope,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      borderAccent: 'hover:border-blue-400',
      activeBorder: 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/20',
      description: 'Compare physicians by board certification, surgical case volume, consultation fee, and next slot availability.',
      attributes: [
        { label: 'Specialization', detail: 'Cardiology, Neuro, Ortho, Derm' },
        { label: 'Experience', detail: '10 to 20+ Years of Clinical Practice' },
        { label: 'Hospital', detail: 'Affiliated Tier-1 Centers' },
        { label: 'Availability', detail: 'Same-day & Priority Weekend Slots' },
      ],
      tagline: 'Evaluate Doctor Credentials & Fees',
      buttonBg: 'bg-blue-600 hover:bg-blue-700 text-white',
    },
    {
      id: 'medicines' as const,
      title: 'Medicines Comparison',
      icon: Pill,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      borderAccent: 'hover:border-emerald-400',
      activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/20',
      description: 'Inspect active chemical compositions, brand markups, and discover bioequivalent generic substitutes that reduce costs.',
      attributes: [
        { label: 'Composition', detail: 'Exact Active Chemical Formulation' },
        { label: 'Manufacturer', detail: 'US-FDA & WHO-GMP Certified Labs' },
        { label: 'Price Index', detail: 'Brand vs Generic Price Breakdown' },
        { label: 'Alternatives', detail: 'Up to 80% Cost Savings Bio-equivalents' },
      ],
      tagline: 'Find Bioequivalent Drug Savings',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    },
  ];

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs" id="healthcare-comparison-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
              <GitCompare className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Decision Support Matrix</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight mt-1">
            Compare Healthcare Options
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Select a domain to inspect transparent clinical parameters, cost structures, and quality ratings.
          </p>
        </div>

        {/* Category switcher pills */}
        <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 self-start sm:self-auto">
          {comparisonCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 ${
                selectedCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {cat.id.charAt(0).toUpperCase() + cat.id.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Distinct Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {comparisonCategories.map((category) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.id;

          return (
            <motion.div
              key={category.id}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`relative flex flex-col justify-between p-5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? `${category.activeBorder} shadow-sm`
                  : `bg-white border-slate-200/80 ${category.borderAccent} hover:shadow-xs`
              }`}
              id={`comparison-card-${category.id}`}
            >
              {/* Animated Selected Indicator Pill */}
              {isSelected && (
                <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-wide uppercase shadow-sm flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-teal-400" /> Active Comparator
                </div>
              )}

              <div>
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl ${category.iconBg} ${category.iconColor}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                      {category.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-medium">{category.tagline}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Important Comparison Attributes */}
                <div className="space-y-2 mb-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Key Evaluation Attributes:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {category.attributes.map((attr, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-slate-50 border border-slate-200/60"
                      >
                        <span className="text-[11px] font-bold text-slate-800 block truncate">
                          {attr.label}
                        </span>
                        <span className="text-[10px] text-slate-500 leading-tight block truncate mt-0.5" title={attr.detail}>
                          {attr.detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCompareCategory(category.id);
                }}
                className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl font-semibold text-xs transition-all shadow-xs active:scale-98 ${category.buttonBg}`}
                id={`btn-compare-${category.id}`}
              >
                <span>Compare Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
