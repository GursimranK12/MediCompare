import React from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Stethoscope, 
  Pill, 
  Calendar, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { NavigationTab } from '../types';

interface QuickActionCardsProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenBooking: () => void;
}

export const QuickActionCards: React.FC<QuickActionCardsProps> = ({
  onNavigate,
  onOpenBooking,
}) => {
  const cards = [
    {
      id: 'hospitals',
      title: 'Find a Hospital',
      description: 'Compare hospitals and healthcare facilities.',
      buttonText: 'Explore Hospitals',
      icon: Building2,
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50 group-hover:bg-teal-600 group-hover:text-white',
      badge: '250+ Listed',
      accentColor: 'border-teal-100 hover:border-teal-300',
      btnColor: 'bg-teal-50 text-teal-700 hover:bg-teal-600 hover:text-white',
      onClick: () => onNavigate('hospitals'),
    },
    {
      id: 'doctors',
      title: 'Find a Doctor',
      description: 'Find doctors based on specialization and experience.',
      buttonText: 'Find Doctors',
      icon: Stethoscope,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50 group-hover:bg-blue-600 group-hover:text-white',
      badge: '1,200+ Verified',
      accentColor: 'border-blue-100 hover:border-blue-300',
      btnColor: 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white',
      onClick: () => onNavigate('doctors'),
    },
    {
      id: 'medicines',
      title: 'Compare Medicines',
      description: 'Compare medicine information and alternatives.',
      buttonText: 'Compare Medicines',
      icon: Pill,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white',
      badge: 'Save ~75%',
      accentColor: 'border-emerald-100 hover:border-emerald-300',
      btnColor: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white',
      onClick: () => onNavigate('medicines'),
    },
    {
      id: 'appointments',
      title: 'Book Appointment',
      description: 'Find a suitable doctor and request an appointment.',
      buttonText: 'Book Appointment',
      icon: Calendar,
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50 group-hover:bg-purple-600 group-hover:text-white',
      badge: 'Instant Slots',
      accentColor: 'border-purple-100 hover:border-purple-300',
      btnColor: 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white',
      onClick: () => onOpenBooking(),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1],
      }
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
      id="quick-actions-grid"
    >
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.id}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`group relative flex flex-col justify-between p-5 rounded-2xl bg-white border ${card.accentColor} shadow-2xs hover:shadow-md transition-all duration-200 cursor-pointer`}
            onClick={card.onClick}
            id={`quick-card-${card.id}`}
          >
            {/* Top row with icon & badge */}
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 ${card.iconBg} ${card.iconColor}`}>
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Icon className="w-6 h-6 stroke-[1.9]" />
                </motion.div>
              </div>

              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 group-hover:bg-slate-200/80 transition-colors">
                {card.badge}
              </span>
            </div>

            {/* Content */}
            <div className="space-y-1.5 flex-1 mb-5">
              <h3 className="font-bold text-base text-slate-900 font-['Outfit',sans-serif] group-hover:text-slate-800 transition-colors">
                {card.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {card.description}
              </p>
            </div>

            {/* Bottom button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                card.onClick();
              }}
              className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 group-hover:shadow-xs ${card.btnColor}`}
            >
              <span>{card.buttonText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        );
      })}
    </motion.section>
  );
};
