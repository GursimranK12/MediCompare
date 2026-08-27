import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  GitCompare, 
  UserCheck, 
  CalendarCheck, 
  Pill, 
  Bookmark, 
  ArrowRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { ActivityItem } from '../types';

interface RecentActivityTimelineProps {
  activities: ActivityItem[];
  onExploreMore?: () => void;
}

export const RecentActivityTimeline: React.FC<RecentActivityTimelineProps> = ({
  activities,
  onExploreMore,
}) => {
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = filterType === 'all' 
    ? activities 
    : activities.filter(a => a.type === filterType);

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'comparison':
        return { icon: GitCompare, color: 'text-teal-600', bg: 'bg-teal-50 border-teal-200' };
      case 'doctor_view':
        return { icon: UserCheck, color: 'text-blue-600', bg: 'bg-blue-50 border-blue-200' };
      case 'appointment':
        return { icon: CalendarCheck, color: 'text-purple-600', bg: 'bg-purple-50 border-purple-200' };
      case 'medicine_search':
        return { icon: Pill, color: 'text-emerald-600', bg: 'bg-emerald-50 border-emerald-200' };
      case 'saved_item':
        return { icon: Bookmark, color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' };
      default:
        return { icon: History, color: 'text-slate-600', bg: 'bg-slate-50 border-slate-200' };
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-2xs" id="recent-activity-section">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 font-['Outfit',sans-serif]">
              Recent Activity
            </h2>
            <p className="text-[11px] text-slate-400">Your recent clinical searches & comparisons</p>
          </div>
        </div>

        {/* Quick Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {['all', 'comparison', 'appointment', 'medicine_search'].map((ft) => (
            <button
              key={ft}
              onClick={() => setFilterType(ft)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize whitespace-nowrap transition-colors ${
                filterType === ft
                  ? 'bg-teal-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {ft === 'all' ? 'All Activity' : ft.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline List with Connector Line */}
      <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-100">
        {filtered.map((act, index) => {
          const { icon: Icon, color, bg } = getActivityIcon(act.type);

          return (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="relative flex items-start gap-3 group"
            >
              {/* Timeline Bullet Node */}
              <div className={`absolute -left-6 mt-0.5 flex items-center justify-center w-5 h-5 rounded-full border ${bg} ${color} shadow-2xs`}>
                <Icon className="w-2.5 h-2.5" />
              </div>

              {/* Activity Card */}
              <div className="flex-1 p-3 rounded-xl bg-slate-50/60 group-hover:bg-slate-50 border border-slate-200/50 group-hover:border-slate-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800 font-['Outfit',sans-serif]">
                      {act.title}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-white text-slate-600 border border-slate-200">
                      {act.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">{act.description}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center flex-shrink-0">
                  <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                    {act.timestamp}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
