import { LayoutDashboard, Upload, Sliders, MessageSquare, Award, ArrowLeft, Brain, GraduationCap, LogOut } from 'lucide-react';
import { AppView } from '../types';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  onBackToLanding: () => void;
}

export default function Sidebar({ currentView, onViewChange, onBackToLanding }: SidebarProps) {
  const { profile, logout } = useAuth();
  const menuItems = [
    { id: 'dashboard' as AppView, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'upload' as AppView, label: 'Upload PYQs', icon: Upload },
    { id: 'config' as AppView, label: 'Mock Config', icon: Sliders },
    { id: 'chat' as AppView, label: 'AI Chat Architect', icon: MessageSquare },
    { id: 'results' as AppView, label: 'Results & Analytics', icon: Award },
  ];

  return (
    <aside className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-screen fixed top-0 left-0 z-20 overflow-y-auto shrink-0">
      {/* Brand logo header */}
      <div className="p-6 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-blue-600 rounded-lg shadow-sm shadow-blue-500/20">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            Insta<span className="text-blue-500 font-extrabold font-display">Mocks</span>
          </span>
        </div>
        <span className="px-2 py-0.5 bg-blue-950 text-blue-400 border border-blue-900/50 rounded text-[10px] font-mono font-medium">
          v1.0
        </span>
      </div>

      {/* Navigation options */}
      <nav className="flex-1 px-4 py-6 space-y-1.5">
        <div className="text-[10px] font-semibold text-gray-500 tracking-wider uppercase px-3 mb-2">
          Study Portal
        </div>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              id={`sidebar-item-${item.id}`}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group cursor-pointer ${
                isActive
                  ? 'bg-blue-600 font-semibold text-white'
                  : 'text-gray-400 hover:text-gray-100 hover:bg-gray-800/60'
              }`}
            >
              <IconComponent className={`w-4.5 h-4.5 shrink-0 ${
                isActive ? 'text-white' : 'text-gray-500 group-hover:text-blue-400 transition-colors'
              }`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User profile / Quick indicators status */}
      <div className="p-4 border-t border-gray-800 space-y-3">
        {/* Dynamic logged-in user profile block */}
        {profile ? (
          <div className="p-3 bg-gray-950/80 border border-gray-800/80 rounded-xl flex items-center gap-3">
            {profile.profilePhoto ? (
              <img
                src={profile.profilePhoto}
                referrerPolicy="no-referrer"
                alt={profile.name}
                className="w-9 h-9 rounded-lg object-cover border border-gray-800 shadow-sm bg-gray-850"
              />
            ) : (
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-sm text-white shadow-sm">
                {profile.name.substring(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="text-xs font-semibold text-gray-200 truncate">{profile.name}</div>
              <div className="text-[10px] text-gray-500 font-mono truncate">
                {profile.email}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-gray-950/80 border border-gray-800/80 rounded-xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center font-bold text-sm text-gray-400">
              ?
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-gray-400">Not Signed In</div>
            </div>
          </div>
        )}

        {/* Action Button: Logout */}
        <button
          onClick={logout}
          id="btn-sidebar-logout"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-red-950 hover:border-red-900 bg-red-950/10 hover:bg-red-950/30 rounded-xl text-xs text-red-400 hover:text-red-300 transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          Log Out
        </button>

        {/* Secondary Action Option: Return to marketing landing page */}
        <button
          onClick={onBackToLanding}
          id="btn-sidebar-landing"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 border border-gray-800 hover:border-gray-700 bg-gray-950 hover:bg-gray-900 rounded-xl text-xs text-gray-500 hover:text-gray-300 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Landing & Features
        </button>
      </div>
    </aside>
  );
}
