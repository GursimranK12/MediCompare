import React from 'react';
import { motion } from 'motion/react';
import { 
  Bookmark, 
  Building2, 
  Stethoscope, 
  Pill, 
  Trash2, 
  ArrowRight, 
  Star, 
  MapPin, 
  Calendar,
  GitCompare
} from 'lucide-react';
import { Hospital, Doctor, Medicine, NavigationTab } from '../../types';

interface SavedItemsViewProps {
  savedHospitals: Hospital[];
  savedDoctors: Doctor[];
  savedMedicines: Medicine[];
  onRemoveHospital: (id: string) => void;
  onRemoveDoctor: (id: string) => void;
  onRemoveMedicine: (id: string) => void;
  onNavigate: (tab: NavigationTab) => void;
  onOpenFullComparison: () => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export const SavedItemsView: React.FC<SavedItemsViewProps> = ({
  savedHospitals,
  savedDoctors,
  savedMedicines,
  onRemoveHospital,
  onRemoveDoctor,
  onRemoveMedicine,
  onNavigate,
  onOpenFullComparison,
  onBookDoctor,
}) => {
  const totalSaved = savedHospitals.length + savedDoctors.length + savedMedicines.length;

  return (
    <div className="space-y-6" id="saved-items-view">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
              <Bookmark className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Personalized Health Vault</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight mt-1">
            Saved Hospitals, Doctors & Medicines
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Quickly access your bookmarked healthcare providers, favorite clinics, and monitored drug alternatives.
          </p>
        </div>

        {totalSaved > 1 && (
          <button
            onClick={onOpenFullComparison}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs transition-colors"
          >
            <GitCompare className="w-4 h-4" />
            <span>Compare Saved Facilities</span>
          </button>
        )}
      </div>

      {totalSaved === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <Bookmark className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-800 font-['Outfit',sans-serif]">No Saved Healthcare Items</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-5">
            Bookmark hospitals, doctors, and pharmaceutical formulations to compare them easily later.
          </p>
          <button
            onClick={() => onNavigate('hospitals')}
            className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Explore Hospitals & Doctors
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Saved Hospitals */}
          {savedHospitals.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-['Outfit',sans-serif]">
                <Building2 className="w-4 h-4 text-teal-600" />
                <span>Saved Hospitals ({savedHospitals.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedHospitals.map((hosp) => (
                  <div
                    key={hosp.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img src={hosp.image} alt={hosp.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 truncate">{hosp.name}</h4>
                        <p className="text-xs text-teal-700 font-semibold">{hosp.city} · ★ {hosp.rating}</p>
                        <p className="text-[11px] text-slate-400 truncate">{hosp.accreditation}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => onRemoveHospital(hosp.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                        title="Remove bookmark"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Doctors */}
          {savedDoctors.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-['Outfit',sans-serif]">
                <Stethoscope className="w-4 h-4 text-blue-600" />
                <span>Saved Doctors ({savedDoctors.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <img src={doc.image} alt={doc.name} className="w-14 h-14 rounded-full object-cover" />
                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 truncate">{doc.name}</h4>
                        <p className="text-xs text-blue-700 font-semibold">{doc.specialization} · ${doc.consultationFee}</p>
                        <p className="text-[11px] text-slate-400 truncate">{doc.hospital}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => onBookDoctor(doc)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-colors"
                      >
                        Book
                      </button>
                      <button
                        onClick={() => onRemoveDoctor(doc.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Saved Medicines */}
          {savedMedicines.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 font-['Outfit',sans-serif]">
                <Pill className="w-4 h-4 text-emerald-600" />
                <span>Saved Medicines & Bioequivalents ({savedMedicines.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedMedicines.map((med) => (
                  <div
                    key={med.id}
                    className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <h4 className="font-bold text-sm text-slate-900 truncate">{med.name}</h4>
                      <p className="text-xs text-emerald-700 font-semibold">Generic: {med.genericName}</p>
                      <p className="text-[11px] text-slate-400">Save ~{med.genericSavingsPercent}% with alternatives</p>
                    </div>

                    <button
                      onClick={() => onRemoveMedicine(med.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
