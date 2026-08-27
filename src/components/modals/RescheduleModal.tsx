import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar, Clock, CheckCircle2, RotateCcw } from 'lucide-react';
import { Appointment } from '../../types';

interface RescheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment;
  onConfirmReschedule: (newDate: string, newTime: string) => void;
}

export const RescheduleModal: React.FC<RescheduleModalProps> = ({
  isOpen,
  onClose,
  appointment,
  onConfirmReschedule,
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-08-29');
  const [selectedTime, setSelectedTime] = useState('02:00 PM');

  if (!isOpen) return null;

  const slots = ['09:00 AM', '10:30 AM', '11:15 AM', '02:00 PM', '03:45 PM', '05:00 PM'];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
    onConfirmReschedule(formatted, selectedTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden relative"
        id="reschedule-modal"
      >
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-100 text-teal-800">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif]">
                Reschedule Appointment
              </h3>
              <p className="text-xs text-slate-500">{appointment.doctorName} · {appointment.hospitalName}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 space-y-0.5">
            <p className="text-slate-400 uppercase font-bold text-[10px]">Current Schedule:</p>
            <p className="font-bold text-slate-800">{appointment.date} at {appointment.time}</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select New Date
            </label>
            <input
              type="date"
              value={selectedDate}
              min="2026-08-28"
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select New Time Slot
            </label>
            <div className="grid grid-cols-3 gap-2">
              {slots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  onClick={() => setSelectedTime(slot)}
                  className={`py-2 px-2.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedTime === slot
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Reschedule</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
