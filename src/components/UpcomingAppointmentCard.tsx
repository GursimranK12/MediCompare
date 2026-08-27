import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Stethoscope, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw,
  FileText
} from 'lucide-react';
import { Appointment } from '../types';

interface UpcomingAppointmentCardProps {
  appointment: Appointment;
  onViewDetails: () => void;
  onReschedule: () => void;
}

export const UpcomingAppointmentCard: React.FC<UpcomingAppointmentCardProps> = ({
  appointment,
  onViewDetails,
  onReschedule,
}) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs relative overflow-hidden" id="upcoming-appointment-section">
      {/* Background soft glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-teal-50/50 rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-100 text-teal-700">
            <Calendar className="w-4 h-4" />
          </div>
          <h2 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
            Upcoming Appointment
          </h2>
        </div>

        {/* Status Badge with Animated Pulse Indicator */}
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/80 text-xs font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{appointment.status}</span>
        </div>
      </div>

      {/* Doctor & Clinic Details */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
        <div className="relative flex-shrink-0">
          <img
            src={appointment.doctorImage}
            alt={appointment.doctorName}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-xs"
          />
          <div className="absolute -bottom-1 -right-1 p-1 bg-teal-600 rounded-full text-white">
            <Stethoscope className="w-3 h-3" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-slate-900 text-base font-['Outfit',sans-serif] truncate">
            {appointment.doctorName}
          </h3>
          <p className="text-xs text-teal-700 font-semibold">{appointment.doctorSpecialty}</p>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{appointment.hospitalName} {appointment.roomNumber && `· ${appointment.roomNumber}`}</span>
          </div>
        </div>
      </div>

      {/* Time & Booking Reference Box */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 mb-5 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-teal-600" />
          <div>
            <span className="font-bold text-slate-900">{appointment.date}</span>
            <span className="text-slate-500 font-medium ml-1">· {appointment.time}</span>
          </div>
        </div>

        <div className="text-[11px] text-slate-500">
          Ref: <span className="font-mono font-semibold text-slate-700">{appointment.bookingRef}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={onViewDetails}
          id="btn-appointment-view-details"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors shadow-2xs active:scale-95"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>

        <button
          onClick={onReschedule}
          id="btn-appointment-reschedule"
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold text-xs transition-colors active:scale-95 border border-slate-200"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reschedule</span>
        </button>
      </div>
    </section>
  );
};
