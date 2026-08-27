import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Stethoscope, 
  Pill, 
  Calendar, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { NavigationTab } from '../types';

interface HealthHubProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenBooking: () => void;
}

type HubOptionKey = 'hospitals' | 'doctors' | 'medicines' | 'appointments';

interface HubOptionDetail {
  key: HubOptionKey;
  tab: NavigationTab;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  stat: string;
  statLabel: string;
  colorClass: string;
  bgLight: string;
  borderClass: string;
  iconBg: string;
  highlights: string[];
}

const HUB_OPTIONS: Record<HubOptionKey, HubOptionDetail> = {
  hospitals: {
    key: 'hospitals',
    tab: 'hospitals',
    title: 'Hospitals & Trauma Centers',
    subtitle: 'Facility & Clinical Department Comparison',
    description: 'Compare ICU capacity, emergency response wait times, surgical robotics, and JCI/NABH gold accreditations side-by-side.',
    icon: Building2,
    badge: '250+ Facilities',
    stat: '24/7',
    statLabel: 'Emergency & Trauma Care',
    colorClass: 'text-teal-700',
    bgLight: 'bg-teal-50',
    borderClass: 'border-teal-300',
    iconBg: 'bg-teal-600 text-white',
    highlights: ['NABH Tier-1 Verified', 'Real-time Bed Availability', 'Clinical Specialty Matrix'],
  },
  doctors: {
    key: 'doctors',
    tab: 'doctors',
    title: 'Verified Specialists & Doctors',
    subtitle: 'Doctor Experience, Fees & Patient Ratings',
    description: 'Filter over 1,200 board-certified physicians, cardiologists, and surgeons based on clinical cases, years of practice, and consultation fees.',
    icon: Stethoscope,
    badge: '1,200+ Clinicians',
    stat: '4.9★',
    statLabel: 'Avg. Patient Satisfaction',
    colorClass: 'text-blue-700',
    bgLight: 'bg-blue-50',
    borderClass: 'border-blue-300',
    iconBg: 'bg-blue-600 text-white',
    highlights: ['Board-Certified Specialists', 'Transparent Fee Structure', 'Telehealth & In-Clinic Slots'],
  },
  medicines: {
    key: 'medicines',
    tab: 'medicines',
    title: 'Medicine Alternatives & Generics',
    subtitle: 'Generic Bioequivalent Savings Engine',
    description: 'Search prescription drugs, discover identical generic formulations with FDA-approved compositions, and save up to 80% on drug costs.',
    icon: Pill,
    badge: '850+ Formulations',
    stat: '75%',
    statLabel: 'Avg. Generic Cost Savings',
    colorClass: 'text-emerald-700',
    bgLight: 'bg-emerald-50',
    borderClass: 'border-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    highlights: ['Bioequivalent Formulations', 'Composition Breakdown', 'Price & Manufacturer Index'],
  },
  appointments: {
    key: 'appointments',
    tab: 'appointments',
    title: 'Instant Appointment Booking',
    subtitle: 'Seamless Consultations & Reminders',
    description: 'Book hospital and clinic consultations with instant confirmation, digital pre-consultation notes, and automated SMS/email alerts.',
    icon: Calendar,
    badge: 'Instant Confirm',
    stat: '99.8%',
    statLabel: 'On-Time Consultation Rate',
    colorClass: 'text-purple-700',
    bgLight: 'bg-purple-50',
    borderClass: 'border-purple-300',
    iconBg: 'bg-purple-600 text-white',
    highlights: ['Priority Time Slots', 'In-Person & Telehealth', 'Zero Booking Convenience Fee'],
  },
};

export const HealthHub: React.FC<HealthHubProps> = ({ onNavigate, onOpenBooking }) => {
  const [activeHubKey, setActiveHubKey] = useState<HubOptionKey>('hospitals');

  const currentDetail = HUB_OPTIONS[activeHubKey];
  const CurrentIcon = currentDetail.icon;

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs relative overflow-hidden" id="signature-health-hub">
      {/* Subtle background decoration */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-teal-50/70 pointer-events-none blur-2xl" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-blue-50/70 pointer-events-none blur-2xl" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-teal-100 text-teal-700 text-xs">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800">Signature Interactive Element</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight font-['Outfit',sans-serif] mt-1">
            MediCompare Health Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Interactive decision wheel — Hover over or select any pillar to inspect core healthcare capabilities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            4 Core Pillars Active
          </span>
        </div>
      </div>

      {/* Interactive Hub Grid / Radial Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left/Center: Interactive Circular Healthcare Wheel */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Outer Orbit Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-200 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-teal-100 bg-slate-50/50" />

            {/* Central Core Element */}
            <div className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-slate-900 via-teal-950 to-slate-800 text-white shadow-xl flex flex-col items-center justify-center text-center p-2 border-4 border-white">
              <motion.div
                key={activeHubKey}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center"
              >
                <CurrentIcon className="w-6 h-6 sm:w-7 sm:h-7 text-teal-400 mb-1" />
                <span className="text-[10px] font-bold tracking-tight uppercase text-teal-200">MediCompare</span>
                <span className="text-[9px] text-slate-300 font-medium">Core Hub</span>
              </motion.div>
            </div>

            {/* Quadrant 1: Hospitals (Top) */}
            <button
              onMouseEnter={() => setActiveHubKey('hospitals')}
              onClick={() => {
                setActiveHubKey('hospitals');
                onNavigate('hospitals');
              }}
              id="hub-quadrant-hospitals"
              className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 group flex items-center gap-2 p-2.5 rounded-2xl transition-all duration-200 z-30 shadow-md ${
                activeHubKey === 'hospitals'
                  ? 'bg-teal-600 text-white ring-4 ring-teal-100 scale-110'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-teal-400 hover:scale-105'
              }`}
            >
              <Building2 className="w-5 h-5" />
              <span className="text-xs font-bold pr-1">Hospitals</span>
            </button>

            {/* Quadrant 2: Doctors (Right) */}
            <button
              onMouseEnter={() => setActiveHubKey('doctors')}
              onClick={() => {
                setActiveHubKey('doctors');
                onNavigate('doctors');
              }}
              id="hub-quadrant-doctors"
              className={`absolute right-0 top-1/2 translate-x-2 -translate-y-1/2 group flex items-center gap-2 p-2.5 rounded-2xl transition-all duration-200 z-30 shadow-md ${
                activeHubKey === 'doctors'
                  ? 'bg-blue-600 text-white ring-4 ring-blue-100 scale-110'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:scale-105'
              }`}
            >
              <Stethoscope className="w-5 h-5" />
              <span className="text-xs font-bold pr-1">Doctors</span>
            </button>

            {/* Quadrant 3: Medicines (Bottom) */}
            <button
              onMouseEnter={() => setActiveHubKey('medicines')}
              onClick={() => {
                setActiveHubKey('medicines');
                onNavigate('medicines');
              }}
              id="hub-quadrant-medicines"
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 group flex items-center gap-2 p-2.5 rounded-2xl transition-all duration-200 z-30 shadow-md ${
                activeHubKey === 'medicines'
                  ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 scale-110'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-emerald-400 hover:scale-105'
              }`}
            >
              <Pill className="w-5 h-5" />
              <span className="text-xs font-bold pr-1">Medicines</span>
            </button>

            {/* Quadrant 4: Appointments (Left) */}
            <button
              onMouseEnter={() => setActiveHubKey('appointments')}
              onClick={() => {
                setActiveHubKey('appointments');
                onNavigate('appointments');
              }}
              id="hub-quadrant-appointments"
              className={`absolute left-0 top-1/2 -translate-x-2 -translate-y-1/2 group flex items-center gap-2 p-2.5 rounded-2xl transition-all duration-200 z-30 shadow-md ${
                activeHubKey === 'appointments'
                  ? 'bg-purple-600 text-white ring-4 ring-purple-100 scale-110'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-purple-400 hover:scale-105'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-bold pr-1">Appointments</span>
            </button>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-400 font-medium">
            <span>Hover or click any node to explore</span>
          </div>
        </div>

        {/* Right: Dynamic Interactive Pillar Inspector Panel */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentDetail.key}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
              className={`p-6 rounded-2xl border ${currentDetail.borderClass} ${currentDetail.bgLight} transition-colors`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${currentDetail.iconBg} shadow-sm`}>
                    <CurrentIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                      {currentDetail.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">{currentDetail.subtitle}</p>
                  </div>
                </div>

                <span className="px-3 py-1 text-xs font-bold rounded-full bg-white text-slate-800 border border-slate-200 shadow-2xs">
                  {currentDetail.badge}
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed mt-2 mb-4">
                {currentDetail.description}
              </p>

              {/* Highlights & Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Key Metric
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-extrabold text-slate-900">{currentDetail.stat}</span>
                    <span className="text-xs text-slate-600 font-medium">{currentDetail.statLabel}</span>
                  </div>
                </div>

                <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Standard Standards
                  </span>
                  {currentDetail.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
                      <span className="truncate">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => onNavigate(currentDetail.tab)}
                  id={`hub-explore-${currentDetail.key}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all hover:gap-3 active:scale-95"
                >
                  <span>Explore {currentDetail.title.split(' ')[0]}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {currentDetail.key === 'appointments' && (
                  <button
                    onClick={onOpenBooking}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-purple-700 font-semibold text-xs sm:text-sm border border-purple-200 shadow-2xs transition-colors"
                  >
                    Quick Booking Wizard
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
