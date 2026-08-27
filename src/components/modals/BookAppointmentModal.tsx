import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Calendar, 
  Clock, 
  Stethoscope, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  CreditCard,
  FileText,
  User,
  ShieldCheck
} from 'lucide-react';
import { Doctor, Hospital, Appointment } from '../../types';

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
  hospitals: Hospital[];
  selectedDoctor?: Doctor | null;
  onConfirmBooking: (appointment: Appointment) => void;
}

export const BookAppointmentModal: React.FC<BookAppointmentModalProps> = ({
  isOpen,
  onClose,
  doctors,
  hospitals,
  selectedDoctor,
  onConfirmBooking,
}) => {
  const [doctorId, setDoctorId] = useState<string>(selectedDoctor?.id || doctors[0]?.id || 'doc-1');
  const [appointmentDate, setAppointmentDate] = useState<string>('2026-08-28');
  const [appointmentTime, setAppointmentTime] = useState<string>('10:30 AM');
  const [consultationType, setConsultationType] = useState<'In-Person' | 'Video Consultation'>('In-Person');
  const [patientNotes, setPatientNotes] = useState<string>('');
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    if (selectedDoctor?.id) {
      setDoctorId(selectedDoctor.id);
    }
    if (isOpen) {
      setStep(1);
    }
  }, [selectedDoctor, isOpen]);

  if (!isOpen) return null;

  const currentDoctor = doctors.find((d) => d.id === doctorId) || selectedDoctor || doctors[0];
  const doctorHospital = hospitals.find((h) => h.id === currentDoctor?.hospitalId) || hospitals[0];

  const availableSlots = [
    '09:00 AM', '09:45 AM', '10:30 AM', '11:15 AM',
    '02:00 PM', '03:15 PM', '04:00 PM', '05:30 PM'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDoctor) return;

    const newAppointment: Appointment = {
      id: `apt-${Date.now()}`,
      doctorName: currentDoctor.name,
      doctorSpecialty: currentDoctor.specialization,
      doctorImage: currentDoctor.image,
      hospitalName: currentDoctor.hospital || doctorHospital?.name || 'Medical Center',
      date: new Date(appointmentDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: appointmentTime,
      status: 'Confirmed',
      type: consultationType,
      roomNumber: 'Tower B, Suite 305',
      bookingRef: `MED-${Math.floor(1000 + Math.random() * 9000)}-BOOK`,
      patientNotes: patientNotes || 'Routine consultation and clinical review.',
    };

    onConfirmBooking(newAppointment);
    setStep(2); // Confirmation screen
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden relative"
        id="book-appointment-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                {step === 1 ? 'Book Healthcare Consultation' : 'Appointment Confirmed'}
              </h3>
              <p className="text-xs text-slate-500">Verified doctor schedule & instant slot booking</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Step 1: Select Doctor */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Physician / Specialist
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {doctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setDoctorId(doc.id)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-all ${
                      doc.id === doctorId
                        ? 'border-teal-500 bg-teal-50/60 ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img src={doc.image} alt={doc.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-xs text-slate-900 truncate">{doc.name}</p>
                      <p className="text-[11px] text-teal-700 font-medium truncate">{doc.specialization}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">${doc.consultationFee} Fee</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Consultation Format
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType('In-Person')}
                  className={`p-3 rounded-xl border text-left font-semibold text-xs transition-all ${
                    consultationType === 'In-Person'
                      ? 'border-teal-600 bg-teal-50/70 text-teal-900 ring-2 ring-teal-500/20'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-teal-600 mb-1" />
                  <p className="font-bold">In-Person Clinic Visit</p>
                  <p className="text-[10px] text-slate-500 font-normal">{doctorHospital.name}</p>
                </button>

                <button
                  type="button"
                  onClick={() => setConsultationType('Video Consultation')}
                  className={`p-3 rounded-xl border text-left font-semibold text-xs transition-all ${
                    consultationType === 'Video Consultation'
                      ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-2 ring-blue-500/20'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Stethoscope className="w-4 h-4 text-blue-600 mb-1" />
                  <p className="font-bold">HD Video Consultation</p>
                  <p className="text-[10px] text-slate-500 font-normal">Encrypted Telehealth Room</p>
                </button>
              </div>
            </div>

            {/* Date & Time Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={appointmentDate}
                  min="2026-08-27"
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Time Slot
                </label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Chief Health Concern / Symptoms
              </label>
              <textarea
                rows={2}
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
                placeholder="Briefly describe your symptoms or reason for follow-up (e.g. ECG review, headache management)..."
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs placeholder:text-slate-400 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>

            {/* Price & Summary Pill */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-500">Total Consultation Fee:</span>
                <span className="text-sm font-bold text-slate-900 ml-1.5">${currentDoctor.consultationFee}</span>
              </div>
              <span className="text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded border border-teal-200/60">
                Zero MediCompare Platform Fee
              </span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Reserve Slot</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
                Appointment Successfully Booked!
              </h4>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Your consultation request with <strong>{currentDoctor.name}</strong> for {appointmentDate} at {appointmentTime} has been confirmed.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-left max-w-sm mx-auto space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-bold text-slate-800">{currentDoctor.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Specialty:</span>
                <span className="font-semibold text-teal-700">{currentDoctor.specialization}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Hospital:</span>
                <span className="text-slate-800">{doctorHospital.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Type:</span>
                <span className="font-medium text-slate-800">{consultationType}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
