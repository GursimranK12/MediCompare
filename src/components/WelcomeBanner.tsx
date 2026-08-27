import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, HeartPulse, Activity, ArrowUpRight, Clock } from 'lucide-react';
import { UserProfile } from '../types';

interface WelcomeBannerProps {
  user?: UserProfile;
  userName?: string;
  onQuickAction?: (action: string) => void;
  onStartComparing?: () => void;
  onBookConsultation?: () => void;
}

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  user,
  userName,
  onQuickAction,
  onStartComparing,
  onBookConsultation,
}) => {
  const displayName = user?.name || userName || 'Alex Chen';

  // Determine time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900 via-teal-800 to-slate-900 text-white p-6 sm:p-8 shadow-sm border border-teal-700/40"
      id="welcome-section-banner"
    >
      {/* Abstract Medical Graphic Background Overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-20 overflow-hidden">
        <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
          <path
            d="M 10 100 Q 50 20, 100 100 T 200 100 T 250 30 T 280 170 T 310 90 T 400 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-teal-300"
          />
          <circle cx="280" cy="170" r="8" fill="#14b8a6" />
          <circle cx="250" cy="30" r="6" fill="#38bdf8" />
          <circle cx="100" cy="100" r="5" fill="#34d399" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-xl space-y-2">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 backdrop-blur-xs border border-teal-400/30 text-teal-200 text-xs font-semibold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400"></span>
            </span>
            <span>Decision Support Active</span>
            <span className="text-teal-400">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" /> {currentDate}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-['Outfit',sans-serif]">
            {getGreeting()}, {displayName} 👋
          </h1>
          <p className="text-sm sm:text-base text-teal-100/90 font-normal leading-relaxed">
            Find the right healthcare option with MediCompare. Compare accredited facilities, verified doctors, and bioequivalent medicines with transparent clinical metrics.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 text-teal-200 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Verified Clinicians</span>
            </div>
            <div className="flex items-center gap-1.5 text-teal-200 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-xs">
              <HeartPulse className="w-4 h-4 text-rose-400" />
              <span>NABH & JCI Accreditations</span>
            </div>
          </div>
        </div>

        {/* Abstract Medical Visual & Quick Action Buttons */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-center gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-xl flex items-center gap-4 text-left shadow-lg">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-300 text-teal-950 flex items-center justify-center font-bold shadow-md">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[11px] text-teal-200 uppercase tracking-wider font-semibold">MediCompare Index</p>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-extrabold text-white">98.4%</span>
                <span className="text-xs text-emerald-300 font-semibold flex items-center">
                  <ArrowUpRight className="w-3 h-3" /> High Match
                </span>
              </div>
              <p className="text-[10px] text-teal-200/75 mt-0.5">Top-tier facilities near your area</p>
            </div>
          </div>

          {(onStartComparing || onBookConsultation) && (
            <div className="flex items-center gap-2 mt-1">
              {onStartComparing && (
                <button
                  onClick={onStartComparing}
                  className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
                >
                  Start Comparing
                </button>
              )}
              {onBookConsultation && (
                <button
                  onClick={onBookConsultation}
                  className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white font-semibold text-xs border border-white/20 shadow-xs transition-all active:scale-95"
                >
                  Book Specialist
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  );
};
