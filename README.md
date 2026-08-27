<!-- Project Tree -->
MediCompare/
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── icons/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── HospitalCard.jsx
│   │   │   ├── DoctorCard.jsx
│   │   │   ├── MedicineCard.jsx
│   │   │   ├── AppointmentCard.jsx
│   │   │   ├── ComparisonTable.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── NotificationDropdown.jsx
│   │   │   ├── ProfileDropdown.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Hospitals.jsx
│   │   │   ├── HospitalDetails.jsx
│   │   │   ├── Doctors.jsx
│   │   │   ├── DoctorDetails.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── BookAppointment.jsx
│   │   │   ├── Medicines.jsx
│   │   │   ├── MedicineDetails.jsx
│   │   │   ├── Diseases.jsx
│   │   │   ├── DiseaseDetails.jsx
│   │   │   ├── Comparisons.jsx
│   │   │   ├── SavedItems.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── Settings.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx
│   │   │
│   │   ├── utils/
│   │   │   ├── validation.js
│   │   │   └── helpers.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
│
├── backend/
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Hospital.js
│   │   ├── Doctor.js
│   │   ├── Appointment.js
│   │   ├── Medicine.js
│   │   ├── Disease.js
│   │   ├── Review.js
│   │   └── SavedItem.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── hospitalController.js
│   │   ├── doctorController.js
│   │   ├── appointmentController.js
│   │   ├── medicineController.js
│   │   ├── diseaseController.js
│   │   └── userController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── hospitalRoutes.js
│   │   ├── doctorRoutes.js
│   │   ├── appointmentRoutes.js
│   │   ├── medicineRoutes.js
│   │   ├── diseaseRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── server.js
│   └── package.json
│
│
├── README.md
└── .gitignore


<!-- Project Architecture -->

                    MEDICOMPARE
                         │
             ┌───────────┴───────────┐
             │                       │
         FRONTEND                 BACKEND
          React                Node + Express
             │                       │
       ┌─────┴─────┐           ┌─────┴─────┐
       │           │           │           │
     Pages     Components    Routes    Controllers
       │                       │           │
       └──────────┐            └─────┬─────┘
                  │                  │
                  └──── REST API ────┘
                             │
                          MongoDB
                             │
              ┌──────────────┼──────────────┐
              │              │              │
            Users        Hospitals       Doctors
              │              │              │
        Appointments     Medicines       Diseases
