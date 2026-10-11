export type NavigationTab = 
  | 'dashboard'
  | 'hospitals'
  | 'doctors'
  | 'appointments'
  | 'medicines'
  | 'diseases'
  | 'comparisons'
  | 'saved'
  | 'profile'
  | 'settings'
  | 'auth';

export interface Hospital {
  id: string;
  name: string;
  city: string;
  state: string;
  rating: number;
  reviewsCount: number;
  departmentsCount: number;
  facilitiesCount: number;
  emergency247: boolean;
  icuBeds: number;
  avgWaitTime: string;
  costScore: 'Low' | 'Moderate' | 'High' | 'Premium';
  establishedYear: number;
  accreditation: string;
  specialties: string[];
  image: string;
  address: string;
  phone: string;
  features: {
    parking: boolean;
    cafeteria: boolean;
    pharmacy247: boolean;
    telehealth: boolean;
    bloodBank: boolean;
    nabhAccredited: boolean;
  };
}

export interface Doctor {
  id: string;
  name: string;
  title: string;
  specialization: string;
  subSpecialty?: string;
  experienceYears: number;
  hospital: string;
  hospitalId: string;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  availability: 'Available Today' | 'Next Available: Tomorrow' | 'In 2 Days' | 'Available this Week';
  nextSlot: string;
  languages: string[];
  education: string;
  image: string;
  verified: boolean;
  about: string;
  acceptingNewPatients: boolean;
}

export interface Medicine {
  id: string;
  name: string;
  brandName: string;
  genericName: string;
  category: string;
  composition: string;
  manufacturer: string;
  price: number;
  prescriptionRequired: boolean;
  dosageForms: string[];
  rating: number;
  reviewsCount: number;
  uses: string[];
  sideEffects: string[];
  genericSavingsPercent: number;
  alternatives: {
    name: string;
    manufacturer: string;
    price: number;
    savings: string;
  }[];
}

export interface Disease {
  id: string;
  name: string;
  category: string;
  severity: 'Mild' | 'Moderate' | 'Chronic' | 'Critical';
  commonSymptoms: string[];
  suggestedSpecialists: string[];
  recommendedHospitalsCount: number;
  overview: string;
  primaryTreatments: string[];
  preventiveTips: string[];
}

export interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorImage: string;
  hospitalName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Rescheduled' | 'Cancelled';
  type: 'In-Person' | 'Video Consultation';
  roomNumber?: string;
  bookingRef: string;
  patientNotes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  category: 'appointment' | 'doctor' | 'medicine' | 'hospital' | 'system';
  isRead: boolean;
  actionUrl?: string;
}

export interface ActivityItem {
  id: string;
  type: 'comparison' | 'doctor_view' | 'appointment' | 'medicine_search' | 'saved_item';
  title: string;
  description: string;
  timestamp: string;
  status: 'Completed' | 'Submitted' | 'Saved' | 'Active';
  statusColor?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  emergencyContact: string;
  avatarUrl: string;
  savedHospitalIds: string[];
  savedDoctorIds: string[];
  savedMedicineIds: string[];
  notificationPreferences: {
    email: boolean;
    sms: boolean;
    appointmentReminders: boolean;
    priceDrops: boolean;
  };
}
