import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Check, 
  Phone, 
  Bookmark, 
  GitCompare, 
  Filter,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Hospital } from '../../types';

interface HospitalsViewProps {
  hospitals: Hospital[];
  savedHospitalIds: string[];
  onToggleSave: (id: string) => void;
  onOpenFullComparison: () => void;
  onSelectHospital: (hospital: Hospital) => void;
}

export const HospitalsView: React.FC<HospitalsViewProps> = ({
  hospitals,
  savedHospitalIds,
  onToggleSave,
  onOpenFullComparison,
  onSelectHospital,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedCost, setSelectedCost] = useState('All');
  const [compareIds, setCompareIds] = useState<string[]>(['hosp-1', 'hosp-2']);

  const allSpecialties = ['All', 'Cardiology', 'Neurology', 'Oncology', 'Orthopedics', 'Pediatrics'];

  const filteredHospitals = hospitals.filter((h) => {
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSpecialty =
      selectedSpecialty === 'All' || h.specialties.includes(selectedSpecialty);

    const matchesCost = selectedCost === 'All' || h.costScore === selectedCost;

    return matchesSearch && matchesSpecialty && matchesCost;
  });

  const toggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(compareIds.filter((item) => item !== id));
    } else {
      if (compareIds.length >= 3) {
        alert('You can compare up to 3 hospitals simultaneously.');
        return;
      }
      setCompareIds([...compareIds, id]);
    }
  };

  return (
    <div className="space-y-6" id="hospitals-directory-view">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Clinical Facility Directory</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight mt-1">
            Hospitals & Specialized Medical Centers
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compare verified ICU capacities, clinical accreditations, emergency triage wait times, and department specializations.
          </p>
        </div>

        {compareIds.length > 0 && (
          <button
            onClick={onOpenFullComparison}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
          >
            <GitCompare className="w-4 h-4" />
            <span>Compare Selected ({compareIds.length})</span>
          </button>
        )}
      </div>

      {/* Filter & Search Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by facility name, city, specialty..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Specialty Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {allSpecialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedSpecialty === spec
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredHospitals.map((hospital) => {
          const isSaved = savedHospitalIds.includes(hospital.id);
          const isComparing = compareIds.includes(hospital.id);

          return (
            <motion.div
              key={hospital.id}
              whileHover={{ y: -2 }}
              className={`bg-white rounded-2xl border transition-all p-5 flex flex-col justify-between shadow-2xs ${
                isComparing ? 'border-teal-500 ring-2 ring-teal-500/20' : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                <div className="relative rounded-xl overflow-hidden h-44 mb-4">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/85 backdrop-blur-xs text-white text-xs font-bold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                    <span>{hospital.accreditation}</span>
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      onClick={() => onToggleSave(hospital.id)}
                      className={`p-2 rounded-lg backdrop-blur-md transition-colors ${
                        isSaved ? 'bg-amber-500 text-white' : 'bg-white/80 hover:bg-white text-slate-700'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save hospital'}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-extrabold flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span>{hospital.rating}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">({hospital.reviewsCount})</span>
                  </div>
                </div>

                {/* Title & Info */}
                <div className="space-y-1 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>{hospital.address}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                    {hospital.name}
                  </h3>
                </div>

                {/* Clinical Attributes Grid */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs mb-4">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Triage Wait</span>
                    <span className="font-extrabold text-teal-800">{hospital.avgWaitTime}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Departments</span>
                    <span className="font-bold text-slate-800">{hospital.departmentsCount} Units</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">ICU Beds</span>
                    <span className="font-bold text-slate-800">{hospital.icuBeds} Beds</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {hospital.specialties.map((spec) => (
                    <span
                      key={spec}
                      className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200/50"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => toggleCompare(hospital.id)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-semibold border flex items-center justify-center gap-1.5 transition-all ${
                    isComparing
                      ? 'bg-teal-600 text-white border-teal-600 shadow-2xs'
                      : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <GitCompare className="w-3.5 h-3.5" />
                  <span>{isComparing ? 'Comparing Active' : 'Add to Compare'}</span>
                </button>

                <button
                  onClick={() => onSelectHospital(hospital)}
                  className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
