import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  CheckCheck,
  Building2,
  Stethoscope,
  Pill,
  Activity,
  Bookmark,
  Calendar,
  Settings,
  LogOut,
  User,
  ExternalLink,
  Sparkles,
  X
} from 'lucide-react';
import { 
  UserProfile, 
  NotificationItem, 
  NavigationTab,
  Hospital,
  Doctor,
  Medicine,
  Disease
} from '../types';

interface TopNavbarProps {
  user: UserProfile;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  setMobileOpen: (open: boolean) => void;
  hospitals: Hospital[];
  doctors: Doctor[];
  medicines: Medicine[];
  diseases: Disease[];
  onSelectHospital: (hospital: Hospital) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectMedicine: (medicine: Medicine) => void;
  onSelectDisease: (disease: Disease) => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({
  user,
  notifications,
  setNotifications,
  setActiveTab,
  setMobileOpen,
  hospitals,
  doctors,
  medicines,
  diseases,
  onSelectHospital,
  onSelectDoctor,
  onSelectMedicine,
  onSelectDisease,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markSingleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  // Filtered search results
  const q = searchQuery.toLowerCase().trim();
  const matchedHospitals = q ? hospitals.filter(h => h.name.toLowerCase().includes(q) || h.specialties.some(s => s.toLowerCase().includes(q))) : [];
  const matchedDoctors = q ? doctors.filter(d => d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q)) : [];
  const matchedMedicines = q ? medicines.filter(m => m.name.toLowerCase().includes(q) || m.genericName.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)) : [];
  const matchedDiseases = q ? diseases.filter(d => d.name.toLowerCase().includes(q) || d.commonSymptoms.some(s => s.toLowerCase().includes(q))) : [];

  const hasSearchResults = q.length > 0;
  const totalMatches = matchedHospitals.length + matchedDoctors.length + matchedMedicines.length + matchedDiseases.length;

  return (
    <header className="sticky top-0 z-20 h-20 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between gap-4">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          id="mobile-menu-toggle"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex flex-col">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
            <span>Healthcare</span>
            <span>/</span>
            <span className="text-teal-700 font-semibold capitalize">Decision Support Hub</span>
          </div>
          <span className="text-sm font-semibold text-slate-800 tracking-tight">Clinical & Price Comparator</span>
        </div>
      </div>

      {/* Middle: Global Search with Animated Glow & Focus */}
      <div className="flex-1 max-w-xl relative" ref={searchRef}>
        <div
          className={`relative flex items-center w-full transition-all duration-300 rounded-xl ${
            searchFocused
              ? 'ring-3 ring-teal-500/20 shadow-md bg-white border-teal-500'
              : 'bg-slate-100/80 hover:bg-slate-100 border-slate-200/70'
          } border`}
        >
          <div className="pl-3.5 pr-2 text-slate-400 flex items-center pointer-events-none">
            <Search className={`w-4 h-4 transition-colors duration-200 ${searchFocused ? 'text-teal-600' : 'text-slate-400'}`} />
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            placeholder="Search hospitals, doctors, medicines or diseases…"
            className="w-full py-2.5 pr-8 text-sm text-slate-800 placeholder:text-slate-400 bg-transparent focus:outline-none"
            id="global-search-input"
          />

          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1.5 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-200/60"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Quick keyboard shortcut pill */}
          {!searchFocused && !searchQuery && (
            <div className="hidden lg:flex items-center mr-3 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-200/60 rounded border border-slate-300/40">
              ⌘K
            </div>
          )}
        </div>

        {/* Live Search Autocomplete Dropdown */}
        <AnimatePresence>
          {searchFocused && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden z-50 max-h-[75vh] overflow-y-auto"
              id="search-results-dropdown"
            >
              {!hasSearchResults ? (
                <div className="p-4 text-xs">
                  <div className="flex items-center justify-between text-slate-400 mb-3 px-1 font-semibold uppercase tracking-wider text-[10px]">
                    <span>Popular Searches</span>
                    <span className="flex items-center gap-1 text-teal-600 font-medium">
                      <Sparkles className="w-3 h-3" /> Quick Assist
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => { setSearchQuery('Cardiology'); }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-left text-slate-700 transition-colors"
                    >
                      <Building2 className="w-4 h-4 text-teal-600" />
                      <div>
                        <p className="font-semibold text-xs text-slate-800">Top Cardiology Hospitals</p>
                        <p className="text-[10px] text-slate-500">Apex Health & St. Jude</p>
                      </div>
                    </button>
                    <button
                      onClick={() => { setSearchQuery('Lipitor'); }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-left text-slate-700 transition-colors"
                    >
                      <Pill className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="font-semibold text-xs text-slate-800">Lipitor 20mg Alternatives</p>
                        <p className="text-[10px] text-slate-500">Generic savings up to 78%</p>
                      </div>
                    </button>
                    <button
                      onClick={() => { setSearchQuery('Dr. Sarah'); }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-left text-slate-700 transition-colors"
                    >
                      <Stethoscope className="w-4 h-4 text-blue-600" />
                      <div>
                        <p className="font-semibold text-xs text-slate-800">Dr. Sarah Sharma</p>
                        <p className="text-[10px] text-slate-500">Cardiologist (14 yrs exp)</p>
                      </div>
                    </button>
                    <button
                      onClick={() => { setSearchQuery('Diabetes'); }}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-left text-slate-700 transition-colors"
                    >
                      <Activity className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="font-semibold text-xs text-slate-800">Type 2 Diabetes Mellitus</p>
                        <p className="text-[10px] text-slate-500">Specialist treatment guides</p>
                      </div>
                    </button>
                  </div>
                </div>
              ) : totalMatches === 0 ? (
                <div className="p-8 text-center">
                  <Activity className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No medical records found for "{searchQuery}"</p>
                  <p className="text-xs text-slate-500 mt-1">Try searching for hospital names, doctor specialties, drug generic names or conditions.</p>
                </div>
              ) : (
                <div className="p-3 space-y-4 text-xs">
                  {matchedHospitals.length > 0 && (
                    <div>
                      <div className="px-2 mb-1.5 font-bold uppercase tracking-wider text-[10px] text-slate-400 flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-teal-600" /> Hospitals ({matchedHospitals.length})
                      </div>
                      <div className="space-y-1">
                        {matchedHospitals.map(h => (
                          <div
                            key={h.id}
                            onClick={() => {
                              onSelectHospital(h);
                              setSearchFocused(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-teal-50/60 cursor-pointer group transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <img src={h.image} alt={h.name} className="w-8 h-8 rounded-lg object-cover" />
                              <div>
                                <p className="font-semibold text-slate-800 group-hover:text-teal-700">{h.name}</p>
                                <p className="text-[11px] text-slate-500">{h.accreditation} · {h.city}</p>
                              </div>
                            </div>
                            <span className="text-xs font-semibold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-md">
                              ★ {h.rating}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchedDoctors.length > 0 && (
                    <div>
                      <div className="px-2 mb-1.5 font-bold uppercase tracking-wider text-[10px] text-slate-400 flex items-center gap-1.5">
                        <Stethoscope className="w-3.5 h-3.5 text-blue-600" /> Doctors ({matchedDoctors.length})
                      </div>
                      <div className="space-y-1">
                        {matchedDoctors.map(d => (
                          <div
                            key={d.id}
                            onClick={() => {
                              onSelectDoctor(d);
                              setSearchFocused(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-blue-50/60 cursor-pointer group transition-colors"
                          >
                            <div className="flex items-center gap-2.5">
                              <img src={d.image} alt={d.name} className="w-8 h-8 rounded-full object-cover" />
                              <div>
                                <p className="font-semibold text-slate-800 group-hover:text-blue-700">{d.name}</p>
                                <p className="text-[11px] text-slate-500">{d.specialization} · {d.hospital}</p>
                              </div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">${d.consultationFee}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchedMedicines.length > 0 && (
                    <div>
                      <div className="px-2 mb-1.5 font-bold uppercase tracking-wider text-[10px] text-slate-400 flex items-center gap-1.5">
                        <Pill className="w-3.5 h-3.5 text-emerald-600" /> Medicines ({matchedMedicines.length})
                      </div>
                      <div className="space-y-1">
                        {matchedMedicines.map(m => (
                          <div
                            key={m.id}
                            onClick={() => {
                              onSelectMedicine(m);
                              setSearchFocused(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-emerald-50/60 cursor-pointer group transition-colors"
                          >
                            <div>
                              <p className="font-semibold text-slate-800 group-hover:text-emerald-700">{m.name}</p>
                              <p className="text-[11px] text-slate-500">{m.category} · Generic: {m.genericName}</p>
                            </div>
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded">
                              Save {m.genericSavingsPercent}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {matchedDiseases.length > 0 && (
                    <div>
                      <div className="px-2 mb-1.5 font-bold uppercase tracking-wider text-[10px] text-slate-400 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5 text-amber-600" /> Diseases & Health Conditions ({matchedDiseases.length})
                      </div>
                      <div className="space-y-1">
                        {matchedDiseases.map(dis => (
                          <div
                            key={dis.id}
                            onClick={() => {
                              onSelectDisease(dis);
                              setSearchFocused(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center justify-between p-2 rounded-xl hover:bg-amber-50/60 cursor-pointer group transition-colors"
                          >
                            <div>
                              <p className="font-semibold text-slate-800 group-hover:text-amber-700">{dis.name}</p>
                              <p className="text-[11px] text-slate-500">Symptoms: {dis.commonSymptoms.slice(0, 3).join(', ')}</p>
                            </div>
                            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                              {dis.severity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Controls: Notifications & User Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Icon with Dropdown */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            id="notification-bell-button"
            className="relative flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all duration-150"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-500 border border-white"></span>
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200/80 shadow-2xl overflow-hidden z-50"
                id="notifications-dropdown-menu"
              >
                <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">Notifications</span>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-800 font-bold text-xs rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-semibold hover:underline"
                    >
                      <CheckCheck className="w-3.5 h-3.5" /> Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => markSingleRead(notif.id)}
                        className={`p-3.5 transition-colors cursor-pointer flex gap-3 ${
                          notif.isRead ? 'bg-white hover:bg-slate-50/80' : 'bg-teal-50/40 hover:bg-teal-50/70'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {notif.category === 'appointment' && (
                            <div className="w-7 h-7 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                              <Calendar className="w-4 h-4" />
                            </div>
                          )}
                          {notif.category === 'doctor' && (
                            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                              <Stethoscope className="w-4 h-4" />
                            </div>
                          )}
                          {notif.category === 'medicine' && (
                            <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                              <Pill className="w-4 h-4" />
                            </div>
                          )}
                          {notif.category === 'hospital' && (
                            <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                              <Building2 className="w-4 h-4" />
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-xs font-semibold ${notif.isRead ? 'text-slate-800' : 'text-teal-900'}`}>
                              {notif.title}
                            </p>
                            {!notif.isRead && (
                              <span className="w-2 h-2 rounded-full bg-teal-500" />
                            )}
                          </div>
                          <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">{notif.message}</p>
                          <span className="text-[10px] text-slate-400 font-medium mt-1 block">{notif.timestamp}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                  <button
                    onClick={() => {
                      setActiveTab('appointments');
                      setNotifOpen(false);
                    }}
                    className="text-xs text-teal-700 font-semibold hover:text-teal-800 transition-colors"
                  >
                    View All Activity Reminders →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile Avatar & Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            id="user-profile-menu-button"
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl hover:bg-slate-100 active:scale-95 transition-all duration-150 group"
          >
            <div className="relative">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl object-cover border border-teal-200/80 shadow-xs"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
            </div>

            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-bold text-slate-800 leading-tight group-hover:text-teal-700 transition-colors">
                {user.name}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">Patient / User</span>
            </div>

            <ChevronDown className={`w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Profile Dropdown with Smooth Scale + Fade */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl border border-slate-200/80 shadow-2xl p-2 z-50"
                id="user-profile-dropdown"
              >
                <div className="p-3 border-b border-slate-100 flex items-center gap-3">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                    <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[9px] font-bold bg-teal-50 text-teal-700 rounded border border-teal-200/50">
                      Blood: {user.bloodGroup}
                    </span>
                  </div>
                </div>

                <div className="py-1 space-y-0.5 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setProfileOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-slate-700 font-medium rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile & Health ID</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('appointments');
                      setProfileOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-slate-700 font-medium rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>My Appointments</span>
                    <span className="ml-auto text-[10px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.5 rounded-full">1</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('saved');
                      setProfileOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-slate-700 font-medium rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>Saved Hospitals & Doctors</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveTab('settings');
                      setProfileOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-slate-700 font-medium rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    <span>Settings & Notifications</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={() => {
                      setProfileOpen(false);
                      if (confirm('Sign out of MediCompare?')) {
                        setActiveTab('dashboard');
                      }
                    }}
                    className="flex items-center gap-2.5 w-full px-3 py-2 text-rose-600 font-semibold rounded-xl hover:bg-rose-50 text-xs transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
