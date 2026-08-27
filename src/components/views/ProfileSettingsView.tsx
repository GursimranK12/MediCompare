import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Settings, 
  ShieldCheck, 
  Bell, 
  Phone, 
  Mail, 
  Heart, 
  Key, 
  Save, 
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { UserProfile } from '../../types';

interface ProfileSettingsViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  user,
  onUpdateUser,
}) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [bloodGroup, setBloodGroup] = useState(user.bloodGroup);
  const [emergencyContact, setEmergencyContact] = useState(user.emergencyContact);
  const [emailNotif, setEmailNotif] = useState(user.notificationPreferences.email);
  const [smsNotif, setSmsNotif] = useState(user.notificationPreferences.sms);
  const [apptReminders, setApptReminders] = useState(user.notificationPreferences.appointmentReminders);
  const [priceDrops, setPriceDrops] = useState(user.notificationPreferences.priceDrops);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      email,
      phone,
      bloodGroup,
      emergencyContact,
      notificationPreferences: {
        email: emailNotif,
        sms: smsNotif,
        appointmentReminders: apptReminders,
        priceDrops: priceDrops,
      },
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6" id="profile-settings-view">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-teal-100 text-teal-800 text-xs font-bold">
              <User className="w-3.5 h-3.5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Account & Health Passport</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif] tracking-tight mt-1">
            User Profile & Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your personal healthcare records, emergency contact details, and platform notification channels.
          </p>
        </div>

        {savedSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Profile successfully updated!</span>
          </motion.div>
        )}
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Health ID Card */}
        <div className="lg:col-span-4 space-y-5">
          {/* Virtual Health Pass */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-teal-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-teal-200">MediPass Health ID</span>
              </div>
              <span className="px-2 py-0.5 bg-teal-500/30 text-teal-300 font-mono text-[10px] font-bold rounded">
                MED-2026-981
              </span>
            </div>

            <div className="flex items-center gap-3.5 mb-5">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-white/30 shadow-xs"
              />
              <div>
                <h3 className="font-bold text-base font-['Outfit',sans-serif]">{name}</h3>
                <p className="text-xs text-teal-200">{email}</p>
                <span className="inline-block mt-1 px-2 py-0.2 text-[10px] font-bold bg-white/20 rounded">
                  Blood Group: {bloodGroup}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 text-xs space-y-1 backdrop-blur-xs border border-white/10">
              <span className="text-[10px] text-teal-300 font-bold uppercase block">Emergency ICE Contact:</span>
              <p className="text-slate-200 text-[11px] leading-tight">{emergencyContact}</p>
            </div>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-slate-200/80 shadow-2xs space-y-2 text-xs">
            <div className="flex items-center gap-2 text-teal-800 font-bold">
              <FileCheck className="w-4 h-4 text-teal-600" />
              <span>Verified Health Privacy</span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Your medical appointment notes, chosen facilities, and comparison histories are encrypted with healthcare HIPAA compliant standards.
            </p>
          </div>
        </div>

        {/* Right Column: Edit Form */}
        <div className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Blood Group
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="O+ Positive">O+ Positive</option>
                  <option value="O- Negative">O- Negative</option>
                  <option value="A+ Positive">A+ Positive</option>
                  <option value="A- Negative">A- Negative</option>
                  <option value="B+ Positive">B+ Positive</option>
                  <option value="B- Negative">B- Negative</option>
                  <option value="AB+ Positive">AB+ Positive</option>
                  <option value="AB- Negative">AB- Negative</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Emergency Contact (ICE Name & Phone)
              </label>
              <input
                type="text"
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-teal-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-2xs space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Notification & Alert Channels
            </h2>

            <div className="space-y-3">
              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70 cursor-pointer">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Appointment Reminders & Slot Updates</span>
                  <span className="text-[11px] text-slate-500">Receive 24hr and 2hr alerts prior to consultation time</span>
                </div>
                <input
                  type="checkbox"
                  checked={apptReminders}
                  onChange={(e) => setApptReminders(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70 cursor-pointer">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">Generic Drug Price Drop Alerts</span>
                  <span className="text-[11px] text-slate-500">Notify when lower-cost bioequivalents become available</span>
                </div>
                <input
                  type="checkbox"
                  checked={priceDrops}
                  onChange={(e) => setPriceDrops(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200/70 cursor-pointer">
                <div>
                  <span className="font-bold text-xs text-slate-900 block">SMS Notifications</span>
                  <span className="text-[11px] text-slate-500">Direct instant SMS alerts for booking confirmations</span>
                </div>
                <input
                  type="checkbox"
                  checked={smsNotif}
                  onChange={(e) => setSmsNotif(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
