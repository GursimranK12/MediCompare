import React from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Building2,
  Stethoscope,
  Calendar,
  Pill,
  Activity,
  GitCompare,
  Bookmark,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  HeartPulse
} from 'lucide-react';
import { NavigationTab } from '../types';

interface SidebarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  savedCount: number;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isCollapsed,
  setIsCollapsed,
  savedCount,
  mobileOpen,
  setMobileOpen,
  onLogout,
}) => {
  const mainNavItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'hospitals' as NavigationTab, label: 'Hospitals', icon: Building2 },
    { id: 'doctors' as NavigationTab, label: 'Doctors', icon: Stethoscope },
    { id: 'appointments' as NavigationTab, label: 'Appointments', icon: Calendar, badge: '1' },
    { id: 'medicines' as NavigationTab, label: 'Medicines', icon: Pill },
    { id: 'diseases' as NavigationTab, label: 'Diseases', icon: Activity },
    { id: 'comparisons' as NavigationTab, label: 'Comparisons', icon: GitCompare },
    { id: 'saved' as NavigationTab, label: 'Saved Items', icon: Bookmark, badge: savedCount ? String(savedCount) : undefined },
    { id: 'profile' as NavigationTab, label: 'Profile', icon: User },
    { id: 'settings' as NavigationTab, label: 'Settings', icon: Settings },
  ];

  const bottomNavItems = [
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
    { id: 'logout', label: 'Logout', icon: LogOut, isDanger: true },
  ];

  const handleNavClick = (tabId: NavigationTab) => {
    setActiveTab(tabId);
    if (mobileOpen) {
      setMobileOpen(false);
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-slate-200/80 select-none">
      {/* Brand Header */}
      <div className={`flex items-center h-20 px-4 border-b border-slate-100 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        <div 
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
          id="sidebar-logo-brand"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
            <HeartPulse className="w-5 h-5" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-teal-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col overflow-hidden"
            >
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-slate-900 font-['Outfit',sans-serif]">Medi<span className="text-teal-600">Compare</span></span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-teal-50 text-teal-700 rounded border border-teal-200/60">PRO</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">Healthcare Decision Platform</span>
            </motion.div>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors duration-150"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          id="toggle-sidebar-button"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
        <div className={`px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 ${isCollapsed ? 'text-center' : ''}`}>
          {isCollapsed ? '•••' : 'Platform Menu'}
        </div>

        {mainNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              id={`nav-item-${item.id}`}
              className={`group relative flex items-center w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-teal-50/90 text-teal-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
              } ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}
              title={isCollapsed ? item.label : undefined}
            >
              {/* Active Indicator bar */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-teal-600 rounded-r-full"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <div className={`flex items-center justify-center w-6 h-6 transition-colors ${
                isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-slate-600'
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
              </div>

              {!isCollapsed && (
                <span className="flex-1 text-left truncate">{item.label}</span>
              )}

              {!isCollapsed && item.badge && (
                <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                  isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                }`}>
                  {item.badge}
                </span>
              )}

              {/* Tooltip on collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 whitespace-nowrap shadow-lg">
                  {item.label}
                  {item.badge && <span className="ml-1.5 px-1.5 py-0.2 bg-teal-500 text-white rounded-full text-[10px]">{item.badge}</span>}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Decision Support Security Badge */}
      {!isCollapsed && (
        <div className="mx-3 my-2 p-3 bg-gradient-to-br from-teal-500/10 via-emerald-500/5 to-slate-50 border border-teal-200/50 rounded-xl">
          <div className="flex items-center gap-2 text-teal-800 font-semibold text-xs mb-1">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            <span>Verified Healthcare Data</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            All hospital accreditations and drug generic bio-equivalents are clinically reviewed.
          </p>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'help') {
                  alert('MediCompare Support Center: Contact 24/7 at support@medicompare.health or call 1-800-MEDI-HELP');
                } else {
                  onLogout();
                }
              }}
              id={`sidebar-${item.id}`}
              className={`group relative flex items-center w-full px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${
                item.isDanger
                  ? 'text-rose-600 hover:bg-rose-50'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              } ${isCollapsed ? 'justify-center px-0' : 'gap-3'}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-4 h-4 stroke-[1.8]" />
              {!isCollapsed && <span className="truncate text-xs font-semibold">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar with smooth width transition */}
      <motion.aside
        animate={{ width: isCollapsed ? 76 : 260 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden md:block flex-shrink-0 h-screen sticky top-0 z-30 shadow-xs"
        id="desktop-sidebar"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.25 }}
            className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10"
          >
            {sidebarContent}
          </motion.div>
        </div>
      )}
    </>
  );
};