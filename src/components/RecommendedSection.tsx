import React from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Building2, 
  Stethoscope, 
  Pill, 
  Star, 
  ArrowRight, 
  Bookmark, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { Hospital, Doctor, Medicine, NavigationTab } from '../types';

interface RecommendedSectionProps {
  hospital: Hospital;
  doctor: Doctor;
  medicine: Medicine;
  onSelectHospital: (hospital: Hospital) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectMedicine: (medicine: Medicine) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  hospital,
  doctor,
  medicine,
  onSelectHospital,
  onSelectDoctor,
  onSelectMedicine,
  onNavigate,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs" id="recommended-healthcare-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Clinical Recommendation Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight mt-1">
            Recommended for You
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Curated top-performing healthcare options tailored to quality benchmarks and high patient satisfaction.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            Based on Quality & Patient Outcomes
          </span>
        </div>
      </div>

      {/* 3 Horizontal Scrollable Recommendation Cards on Mobile/Tablet */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 overflow-x-auto pb-2">
        {/* 1. Recommended Hospital */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-white to-teal-50/20 border border-slate-200/80 hover:border-teal-300 shadow-2xs hover:shadow-xs transition-all"
          id="recommended-card-hospital"
        >
          <div>
            <div className="relative mb-3 overflow-hidden rounded-xl h-36">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-teal-800 font-bold text-[10px] uppercase tracking-wider border border-teal-200/50 flex items-center gap-1">
                <Building2 className="w-3 h-3" /> Top Facility
              </div>
              <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-xs text-white font-bold text-xs flex items-center gap-1">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>{hospital.rating}</span>
                <span className="text-[10px] text-slate-300">({hospital.reviewsCount})</span>
              </div>
            </div>

            <div className="space-y-1 mb-3">
              <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wide">
                {hospital.city} · {hospital.accreditation}
              </span>
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif] leading-snug">
                {hospital.name}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                Specialized in {hospital.specialties.slice(0, 3).join(', ')} with {hospital.departmentsCount} medical departments and 24/7 emergency care.
              </p>
            </div>

            {/* Quick Badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                Wait: {hospital.avgWaitTime}
              </span>
              <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-medium">
                {hospital.icuBeds} ICU Beds
              </span>
            </div>
          </div>

          <button
            onClick={() => onSelectHospital(hospital)}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white font-semibold text-xs transition-colors shadow-2xs"
          >
            <span>Explore Hospital Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* 2. Recommended Doctor */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-white to-blue-50/20 border border-slate-200/80 hover:border-blue-300 shadow-2xs hover:shadow-xs transition-all"
          id="recommended-card-doctor"
        >
          <div>
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs"
                />
                <div className="absolute -bottom-1 -right-1 p-1 bg-blue-600 rounded-full text-white">
                  <Stethoscope className="w-3 h-3" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 font-bold text-[10px] uppercase">
                    Top Specialist
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{doctor.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif] mt-0.5">
                  {doctor.name}
                </h3>
                <p className="text-xs text-blue-700 font-semibold">{doctor.specialization}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-xs text-slate-500 line-clamp-2">
                {doctor.about}
              </p>

              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Experience:</span>
                  <span className="font-bold text-slate-800">{doctor.experienceYears} Years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consultation Fee:</span>
                  <span className="font-bold text-slate-900">${doctor.consultationFee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Next Slot:</span>
                  <span className="font-semibold text-emerald-700">{doctor.nextSlot}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onSelectDoctor(doctor)}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs transition-colors shadow-2xs"
          >
            <span>View Doctor Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* 3. Recommended Medicine / Bioequivalent */}
        <motion.div
          whileHover={{ y: -3 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col justify-between p-5 rounded-2xl bg-gradient-to-b from-white to-emerald-50/20 border border-slate-200/80 hover:border-emerald-300 shadow-2xs hover:shadow-xs transition-all"
          id="recommended-card-medicine"
        >
          <div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                <Pill className="w-6 h-6" />
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                Save {medicine.genericSavingsPercent}%
              </span>
            </div>

            <div className="space-y-1 mb-3">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wide">
                {medicine.category}
              </span>
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                {medicine.name}
              </h3>
              <p className="text-xs text-slate-500">
                Generic Composition: <strong className="text-slate-700">{medicine.genericName}</strong>
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200/60 mb-4 text-xs">
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-slate-500">Brand Price:</span>
                <span className="line-through text-slate-400 font-medium">${medicine.price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-emerald-900 font-bold">Generic Equivalent:</span>
                <span className="text-sm font-extrabold text-emerald-700">
                  ${medicine.alternatives[0]?.price.toFixed(2)} / pack
                </span>
              </div>
              <p className="text-[10px] text-emerald-800 mt-1">
                Identical therapeutic response with verified bio-equivalence.
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectMedicine(medicine)}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-semibold text-xs transition-colors shadow-2xs"
          >
            <span>Compare Generic Alternatives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
