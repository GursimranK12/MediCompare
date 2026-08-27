import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { TopNavbar } from './components/TopNavbar';
import { WelcomeBanner } from './components/WelcomeBanner';
import { HealthHub } from './components/HealthHub';
import { QuickActionCards } from './components/QuickActionCards';
import { HealthcareStats } from './components/HealthcareStats';
import { ComparisonSection } from './components/ComparisonSection';
import { VisualComparisonWidget } from './components/VisualComparisonWidget';
import { UpcomingAppointmentCard } from './components/UpcomingAppointmentCard';
import { RecommendedSection } from './components/RecommendedSection';
import { RecentActivityTimeline } from './components/RecentActivityTimeline';
import { DiseaseSearchSection } from './components/DiseaseSearchSection';

// Views
import { HospitalsView } from './components/views/HospitalsView';
import { DoctorsView } from './components/views/DoctorsView';
import { MedicinesView } from './components/views/MedicinesView';
import { DiseasesView } from './components/views/DiseasesView';
import { SavedItemsView } from './components/views/SavedItemsView';
import { ProfileSettingsView } from './components/views/ProfileSettingsView';

// Modals
import { BookAppointmentModal } from './components/modals/BookAppointmentModal';
import { FullComparisonModal } from './components/modals/FullComparisonModal';
import { AppointmentDetailsModal } from './components/modals/AppointmentDetailsModal';
import { RescheduleModal } from './components/modals/RescheduleModal';

// Mock Data & Types
import {
  initialHospitals,
  initialDoctors,
  initialMedicines,
  initialDiseases,
  initialAppointments,
  initialActivities,
  initialUserProfile,
  healthcareStatsData,
} from './data/mockData';
import {
  Hospital,
  Doctor,
  Medicine,
  Disease,
  Appointment,
  ActivityItem,
  NotificationItem,
  UserProfile,
  NavigationTab,
} from './types';

export default function App() {
  // Navigation & UI State
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Core Data State
  const [hospitals] = useState<Hospital[]>(initialHospitals);
  const [doctors] = useState<Doctor[]>(initialDoctors);
  const [medicines] = useState<Medicine[]>(initialMedicines);
  const [diseases] = useState<Disease[]>(initialDiseases);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);

  // Notifications State
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Appointment Confirmed',
      message: 'Cardiology consultation with Dr. Sarah Sharma is confirmed for tomorrow at 10:30 AM.',
      timestamp: '10 mins ago',
      category: 'appointment',
      isRead: false,
    },
    {
      id: 'notif-2',
      title: 'New Specialist Slot',
      message: 'Dr. Marcus Vance opened 4 new afternoon slots for Thursday at St. Jude.',
      timestamp: '2 hours ago',
      category: 'doctor',
      isRead: false,
    },
    {
      id: 'notif-3',
      title: 'Generic Savings Alert',
      message: 'New generic manufacturer alternative added for Metformin XR with 72% savings.',
      timestamp: 'Yesterday',
      category: 'medicine',
      isRead: true,
    },
  ]);

  // Saved Bookmarks
  const [savedHospitalIds, setSavedHospitalIds] = useState<string[]>(['hosp-1']);
  const [savedDoctorIds, setSavedDoctorIds] = useState<string[]>(['doc-1']);
  const [savedMedicineIds, setSavedMedicineIds] = useState<string[]>(['med-1']);

  // Modal Controllers
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);

  const [isFullComparisonModalOpen, setIsFullComparisonModalOpen] = useState(false);
  const [comparisonCategory, setComparisonCategory] = useState<'hospitals' | 'doctors' | 'medicines'>('hospitals');

  const [isApptDetailsModalOpen, setIsApptDetailsModalOpen] = useState(false);
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Bookmark Toggle Handlers
  const handleToggleSaveHospital = (id: string) => {
    if (savedHospitalIds.includes(id)) {
      setSavedHospitalIds(savedHospitalIds.filter((item) => item !== id));
      showToast('Removed hospital from saved vault');
    } else {
      setSavedHospitalIds([...savedHospitalIds, id]);
      showToast('Saved hospital to your personal vault');
      addActivity('saved_item', 'Hospital Saved', 'Bookmarked Apex Health for future reference.');
    }
  };

  const handleToggleSaveDoctor = (id: string) => {
    if (savedDoctorIds.includes(id)) {
      setSavedDoctorIds(savedDoctorIds.filter((item) => item !== id));
      showToast('Removed doctor from saved list');
    } else {
      setSavedDoctorIds([...savedDoctorIds, id]);
      showToast('Doctor bookmarked in your vault');
      addActivity('saved_item', 'Doctor Saved', 'Bookmarked specialist for fast consultation booking.');
    }
  };

  const handleToggleSaveMedicine = (id: string) => {
    if (savedMedicineIds.includes(id)) {
      setSavedMedicineIds(savedMedicineIds.filter((item) => item !== id));
      showToast('Removed medicine from saved list');
    } else {
      setSavedMedicineIds([...savedMedicineIds, id]);
      showToast('Saved medicine formulation');
      addActivity('saved_item', 'Medicine Saved', 'Bookmarked generic bioequivalent alternative.');
    }
  };

  // Activity Logger
  const addActivity = (type: ActivityItem['type'], title: string, description: string) => {
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      title,
      type,
      timestamp: 'Just now',
      status: 'Completed',
      description,
    };
    setActivities([newAct, ...activities]);
  };

  // Booking Confirm
  const handleConfirmBooking = (newAppointment: Appointment) => {
    setAppointments([newAppointment, ...appointments]);
    showToast(`Appointment confirmed with ${newAppointment.doctorName}!`);
    addActivity(
      'appointment',
      'Appointment Request Submitted',
      `Booked consultation with ${newAppointment.doctorName} on ${newAppointment.date}.`
    );
  };

  // Reschedule Confirm
  const handleConfirmReschedule = (newDate: string, newTime: string) => {
    if (appointments.length > 0) {
      const updated = appointments.map((apt, idx) =>
        idx === 0 ? { ...apt, date: newDate, time: newTime, status: 'Confirmed' as const } : apt
      );
      setAppointments(updated);
      showToast(`Appointment rescheduled to ${newDate} at ${newTime}`);
      addActivity(
        'appointment',
        'Appointment Rescheduled',
        `Updated schedule for ${appointments[0].doctorName}.`
      );
    }
  };

  // Total saved count for badge
  const totalSavedCount = savedHospitalIds.length + savedDoctorIds.length + savedMedicineIds.length;

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* 1. Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setIsMobileOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        savedCount={totalSavedCount}
        mobileOpen={isMobileOpen}
        setMobileOpen={setIsMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* 2. Top Navigation Bar */}
        <TopNavbar
          user={userProfile}
          notifications={notifications}
          setNotifications={setNotifications}
          activeTab={activeTab}
          setActiveTab={(tab) => setActiveTab(tab)}
          setMobileOpen={setIsMobileOpen}
          hospitals={hospitals}
          doctors={doctors}
          medicines={medicines}
          diseases={diseases}
          onSelectHospital={(h) => {
            setActiveTab('hospitals');
          }}
          onSelectDoctor={(d) => {
            setSelectedDoctorForBooking(d);
            setIsBookModalOpen(true);
          }}
          onSelectMedicine={(m) => {
            setActiveTab('medicines');
          }}
          onSelectDisease={(dis) => {
            setActiveTab('diseases');
          }}
        />

        {/* Global Toast Alert */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-6 z-50 px-4 py-3 bg-slate-900 text-white rounded-xl shadow-xl flex items-center gap-3 text-xs font-semibold border border-slate-700"
            >
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Body View Rendering */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* 3. Welcome Banner */}
              <WelcomeBanner
                user={userProfile}
                userName={userProfile.name}
                onStartComparing={() => {
                  setComparisonCategory('hospitals');
                  setIsFullComparisonModalOpen(true);
                }}
                onBookConsultation={() => {
                  setSelectedDoctorForBooking(doctors[0]);
                  setIsBookModalOpen(true);
                }}
              />

              {/* 4. Signature Circular Health Hub */}
              <HealthHub
                onNavigate={(tab) => setActiveTab(tab)}
                onOpenBooking={() => {
                  setSelectedDoctorForBooking(doctors[0]);
                  setIsBookModalOpen(true);
                }}
              />

              {/* 5. 4 Primary Quick Action Cards */}
              <QuickActionCards
                onNavigate={(tab) => setActiveTab(tab)}
                onOpenBooking={() => {
                  setSelectedDoctorForBooking(doctors[0]);
                  setIsBookModalOpen(true);
                }}
              />

              {/* 6. Healthcare Statistics Counters */}
              <HealthcareStats stats={healthcareStatsData} />

              {/* 7. Comparison Cards Section (Hospitals, Doctors, Medicines) */}
              <ComparisonSection
                onCompareCategory={(category) => {
                  setComparisonCategory(category);
                  setIsFullComparisonModalOpen(true);
                }}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />

              {/* 8. Interactive Side-by-Side Hospital Comparison Matrix */}
              <VisualComparisonWidget
                hospitals={hospitals}
                onOpenFullComparison={() => {
                  setComparisonCategory('hospitals');
                  setIsFullComparisonModalOpen(true);
                }}
              />

              {/* 9. Upcoming Appointment Card */}
              {appointments.length > 0 && (
                <UpcomingAppointmentCard
                  appointment={appointments[0]}
                  onViewDetails={() => setIsApptDetailsModalOpen(true)}
                  onReschedule={() => setIsRescheduleModalOpen(true)}
                />
              )}

              {/* 10. Recommended Healthcare Section */}
              <RecommendedSection
                hospital={hospitals[0]}
                doctor={doctors[0]}
                medicine={medicines[0]}
                onSelectHospital={() => setActiveTab('hospitals')}
                onSelectDoctor={(doc) => {
                  setSelectedDoctorForBooking(doc);
                  setIsBookModalOpen(true);
                }}
                onSelectMedicine={() => setActiveTab('medicines')}
                onNavigate={(tab) => setActiveTab(tab)}
              />

              {/* 11. Recent Activity Timeline */}
              <RecentActivityTimeline
                activities={activities}
                onExploreMore={() => setActiveTab('saved')}
              />

              {/* 12. "What are you looking for today?" Disease Search */}
              <DiseaseSearchSection
                diseases={diseases}
                onSelectDisease={(disease) => {
                  setActiveTab('diseases');
                }}
                onNavigate={(tab) => setActiveTab(tab)}
              />
            </div>
          )}

          {/* Hospitals Dedicated Directory View */}
          {activeTab === 'hospitals' && (
            <HospitalsView
              hospitals={hospitals}
              savedHospitalIds={savedHospitalIds}
              onToggleSave={handleToggleSaveHospital}
              onOpenFullComparison={() => {
                setComparisonCategory('hospitals');
                setIsFullComparisonModalOpen(true);
              }}
              onSelectHospital={() => {
                setComparisonCategory('hospitals');
                setIsFullComparisonModalOpen(true);
              }}
            />
          )}

          {/* Doctors Dedicated Directory View */}
          {activeTab === 'doctors' && (
            <DoctorsView
              doctors={doctors}
              savedDoctorIds={savedDoctorIds}
              onToggleSave={handleToggleSaveDoctor}
              onBookDoctor={(doc) => {
                setSelectedDoctorForBooking(doc);
                setIsBookModalOpen(true);
              }}
              onSelectDoctor={(doc) => {
                setSelectedDoctorForBooking(doc);
                setIsBookModalOpen(true);
              }}
            />
          )}

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 font-['Outfit',sans-serif]">
                    Your Healthcare Consultations
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Manage upcoming appointments, past medical consults, and digital clinic check-in passes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedDoctorForBooking(doctors[0]);
                    setIsBookModalOpen(true);
                  }}
                  className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-xs"
                >
                  Book New Appointment
                </button>
              </div>

              {appointments.length > 0 ? (
                <div className="space-y-4">
                  {appointments.map((apt) => (
                    <UpcomingAppointmentCard
                      key={apt.id}
                      appointment={apt}
                      onViewDetails={() => setIsApptDetailsModalOpen(true)}
                      onReschedule={() => setIsRescheduleModalOpen(true)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                  <p className="text-slate-500 text-sm">No scheduled appointments found.</p>
                </div>
              )}
            </div>
          )}

          {/* Medicines & Bioequivalents Dedicated View */}
          {activeTab === 'medicines' && (
            <MedicinesView
              medicines={medicines}
              savedMedicineIds={savedMedicineIds}
              onToggleSave={handleToggleSaveMedicine}
              onSelectMedicine={() => {
                setComparisonCategory('medicines');
                setIsFullComparisonModalOpen(true);
              }}
            />
          )}

          {/* Comparisons Dedicated Tab */}
          {activeTab === 'comparisons' && (
            <div className="space-y-6">
              <ComparisonSection
                onCompareCategory={(category) => {
                  setComparisonCategory(category);
                  setIsFullComparisonModalOpen(true);
                }}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
              <VisualComparisonWidget
                hospitals={hospitals}
                onOpenFullComparison={() => {
                  setComparisonCategory('hospitals');
                  setIsFullComparisonModalOpen(true);
                }}
              />
            </div>
          )}

          {/* Disease Guide Dedicated View */}
          {activeTab === 'diseases' && (
            <DiseasesView
              diseases={diseases}
              onNavigate={(tab) => setActiveTab(tab)}
              onSelectDisease={() => {}}
            />
          )}

          {/* Saved Bookmarks Vault */}
          {activeTab === 'saved' && (
            <SavedItemsView
              savedHospitals={hospitals.filter((h) => savedHospitalIds.includes(h.id))}
              savedDoctors={doctors.filter((d) => savedDoctorIds.includes(d.id))}
              savedMedicines={medicines.filter((m) => savedMedicineIds.includes(m.id))}
              onRemoveHospital={handleToggleSaveHospital}
              onRemoveDoctor={handleToggleSaveDoctor}
              onRemoveMedicine={handleToggleSaveMedicine}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenFullComparison={() => {
                setComparisonCategory('hospitals');
                setIsFullComparisonModalOpen(true);
              }}
              onBookDoctor={(doc) => {
                setSelectedDoctorForBooking(doc);
                setIsBookModalOpen(true);
              }}
            />
          )}

          {/* Profile & Settings View */}
          {(activeTab === 'profile' || activeTab === 'settings') && (
            <ProfileSettingsView
              user={userProfile}
              onUpdateUser={(updated) => {
                setUserProfile(updated);
                showToast('Profile & preferences saved successfully');
              }}
            />
          )}
        </main>
      </div>

      {/* Global Modals */}
      {/* 1. Book Appointment Modal */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        doctors={doctors}
        hospitals={hospitals}
        selectedDoctor={selectedDoctorForBooking}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* 2. Full Multi-Entity Comparison Modal */}
      <FullComparisonModal
        isOpen={isFullComparisonModalOpen}
        onClose={() => setIsFullComparisonModalOpen(false)}
        hospitals={hospitals}
        doctors={doctors}
        medicines={medicines}
        initialCategory={comparisonCategory}
      />

      {/* 3. Appointment Pass Details Modal */}
      {appointments.length > 0 && (
        <AppointmentDetailsModal
          isOpen={isApptDetailsModalOpen}
          onClose={() => setIsApptDetailsModalOpen(false)}
          appointment={appointments[0]}
          onReschedule={() => {
            setIsApptDetailsModalOpen(false);
            setIsRescheduleModalOpen(true);
          }}
        />
      )}

      {/* 4. Reschedule Modal */}
      {appointments.length > 0 && (
        <RescheduleModal
          isOpen={isRescheduleModalOpen}
          onClose={() => setIsRescheduleModalOpen(false)}
          appointment={appointments[0]}
          onConfirmReschedule={handleConfirmReschedule}
        />
      )}
    </div>
  );
}
