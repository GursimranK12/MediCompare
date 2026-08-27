import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Stethoscope, 
  CheckCircle2, 
  QrCode,
  FileCheck,
  Building2,
  Navigation
} from 'lucide-react';
import { Appointment } from '../../types';

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  onReschedule: () => void;
}

export const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onReschedule,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden relative"
        id="appointment-details-modal"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                Consultation Pass & Details
              </h3>
              <p className="text-xs text-slate-500">Digital Appointment Confirmation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Status & Reference Header */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/70 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold text-teal-700 tracking-wider">
                Booking Reference
              </span>
              <p className="text-base font-mono font-extrabold text-slate-900">{appointment.bookingRef}</p>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{appointment.status}</span>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-slate-200">
            <img
              src={appointment.doctorImage}
              alt={appointment.doctorName}
              className="w-14 h-14 rounded-2xl object-cover"
            />
            <div>
              <h4 className="font-bold text-slate-900 text-sm font-['Outfit',sans-serif]">
                {appointment.doctorName}
              </h4>
              <p className="text-xs text-teal-700 font-semibold">{appointment.doctorSpecialty}</p>
              <p className="text-xs text-slate-500 mt-0.5">{appointment.hospitalName}</p>
            </div>
          </div>

          {/* Appointment Schedule & Location */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-1">
                Date & Time
              </span>
              <div className="font-bold text-slate-900">{appointment.date}</div>
              <div className="text-slate-600">{appointment.time}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-1">
                Location & Room
              </span>
              <div className="font-bold text-slate-900">{appointment.type}</div>
              <div className="text-slate-600">{appointment.roomNumber || 'West Clinic Wing'}</div>
            </div>
          </div>

          {/* Preparation Instructions */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs space-y-1">
            <span className="font-bold text-amber-900 block">Pre-Consultation Checklist:</span>
            <p className="text-amber-800 leading-relaxed">
              • Please arrive 10 minutes prior for blood pressure and vitals triage.<br />
              • Bring existing cardiovascular prescriptions, past ECG reports, and insurance card.<br />
              • Contact desk at +1 (555) 789-0010 in case of emergency delays.
            </p>
          </div>

          {/* Notes */}
          {appointment.patientNotes && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <span className="text-slate-400 font-semibold block text-[10px] uppercase mb-0.5">
                Patient Clinical Notes:
              </span>
              <p className="text-slate-700">{appointment.patientNotes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onReschedule();
            }}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Reschedule Appointment
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
          >
            Close Pass
          </button>
        </div>
      </motion.div>
    </div>
  );
};
