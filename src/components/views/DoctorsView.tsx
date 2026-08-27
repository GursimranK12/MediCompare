import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Stethoscope, 
  Search, 
  Star, 
  MapPin, 
  Calendar, 
  Bookmark, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign,
  Languages,
  GraduationCap
} from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorsViewProps {
  doctors: Doctor[];
  savedDoctorIds: string[];
  onToggleSave: (id: string) => void;
  onBookDoctor: (doctor: Doctor) => void;
  onSelectDoctor: (doctor: Doctor) => void;
}

export const DoctorsView: React.FC<DoctorsViewProps> = ({
  doctors,
  savedDoctorIds,
  onToggleSave,
  onBookDoctor,
  onSelectDoctor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'Cardiologist', 'Neurologist', 'Orthopedic Surgeon', 'Dermatologist'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'All' || doc.specialization === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6" id="doctors-directory-view">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold">
              <Stethoscope className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Verified Clinician Directory</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight mt-1">
            Doctors & Clinical Specialists
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Evaluate board certifications, clinical surgical experience, consultation fees, and real patient outcome ratings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 font-semibold text-xs border border-blue-200">
            1,200+ Clinicians Available
          </span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by doctor name, specialty, hospital..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Specialty Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {specialties.map((spec) => (
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

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredDoctors.map((doctor) => {
          const isSaved = savedDoctorIds.includes(doctor.id);

          return (
            <motion.div
              key={doctor.id}
              whileHover={{ y: -2 }}
              className="bg-white rounded-2xl border border-slate-200/80 hover:border-slate-300 p-5 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-xs"
                      />
                      <div className="absolute -bottom-1 -right-1 p-1 bg-blue-600 text-white rounded-full">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                          {doctor.name}
                        </h3>
                      </div>
                      <p className="text-xs text-blue-700 font-semibold">{doctor.specialization}</p>
                      <p className="text-[11px] text-slate-400">{doctor.title}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleSave(doctor.id)}
                    className={`p-2 rounded-xl transition-colors ${
                      isSaved ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-400 hover:text-slate-700'
                    }`}
                    title={isSaved ? 'Saved' : 'Bookmark doctor'}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {doctor.about}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-xs mb-4">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Experience</span>
                      <span className="font-bold text-slate-800">{doctor.experienceYears} Years</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Rating</span>
                      <span className="font-bold text-slate-800">★ {doctor.rating} ({doctor.reviewsCount})</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <div className="truncate">
                      <span className="text-[10px] text-slate-400 font-medium block">Affiliation</span>
                      <span className="font-semibold text-slate-800 truncate block">{doctor.hospital}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium block">Consultation Fee</span>
                      <span className="font-bold text-emerald-700 text-sm">${doctor.consultationFee}</span>
                    </div>
                  </div>
                </div>

                {/* Next availability pill */}
                <div className="flex items-center justify-between text-xs px-3 py-2 rounded-lg bg-teal-50/70 border border-teal-200/60 text-teal-900 mb-4">
                  <span className="text-[11px] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-teal-600" /> Next Opening:
                  </span>
                  <span className="font-bold">{doctor.nextSlot}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
                <button
                  onClick={() => onSelectDoctor(doctor)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors text-center"
                >
                  View Profile
                </button>

                <button
                  onClick={() => onBookDoctor(doctor)}
                  className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-all text-center flex items-center justify-center gap-1.5 active:scale-95"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
