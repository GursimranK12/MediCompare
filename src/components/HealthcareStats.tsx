import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Building2, Stethoscope, Pill, CalendarCheck, TrendingUp, CheckCircle } from 'lucide-react';

interface StatItem {
  id: string;
  label: string;
  targetValue: number;
  prefix?: string;
  suffix: string;
  subtext: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
}

const STATS_DATA: StatItem[] = [
  {
    id: 'hospitals',
    label: 'Hospitals Available',
    targetValue: 250,
    suffix: '+',
    subtext: 'Across 18 specialty departments',
    icon: Building2,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    id: 'doctors',
    label: 'Doctors Available',
    targetValue: 1200,
    suffix: '+',
    subtext: 'Board-certified specialists',
    icon: Stethoscope,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'medicines',
    label: 'Medicines Listed',
    targetValue: 850,
    suffix: '+',
    subtext: 'With generic bioequivalent savings',
    icon: Pill,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'appointments',
    label: 'Appointments Completed',
    targetValue: 320,
    suffix: '+',
    subtext: '99.4% on-time consultations',
    icon: CalendarCheck,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
];

// Reusable animated counter component
const CounterDisplay: React.FC<{ target: number; suffix: string; prefix?: string }> = ({
  target,
  suffix,
  prefix = '',
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  const formatted = target >= 1000 ? count.toLocaleString() : count;

  return (
    <span className="font-extrabold tracking-tight text-slate-900 text-2xl sm:text-3xl font-['Outfit',sans-serif]">
      {prefix}{formatted}{suffix}
    </span>
  );
};

export const HealthcareStats: React.FC = () => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs" id="healthcare-overview-statistics">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Clinical Network
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 font-['Outfit',sans-serif]">
            Healthcare Overview Statistics
          </h2>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-teal-700 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200/60 font-semibold">
          <CheckCircle className="w-3.5 h-3.5" />
          <span>Real-time Verified Directory</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_DATA.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/60 hover:bg-white hover:border-slate-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor} ${stat.color} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-0.5">
                <CounterDisplay target={stat.targetValue} suffix={stat.suffix} prefix={stat.prefix} />
                <p className="text-xs font-semibold text-slate-700 leading-tight">
                  {stat.label}
                </p>
                <p className="text-[11px] text-slate-400 font-medium">
                  {stat.subtext}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
