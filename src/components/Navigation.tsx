import React, { useState } from 'react';
import {
  Home,
  Search,
  PlusCircle,
  MessageSquare,
  User,
  ShieldAlert,
  Bell,
  ShieldCheck,
  X,
  Sparkles,
  ChevronDown,
  Star
} from 'lucide-react';
import { User as UserType } from '../types';

import { Logo } from './Logo';

interface NavigationProps {
  currentScreen: string;
  onNavigate: (screen: string, param?: string) => void;
  currentUser: UserType | null;
  unreadCount?: number;
  unreadChatCount?: number;
  onOpenGuestReview?: (propertyId?: string) => void;
  onOpenPostSpace?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentScreen,
  onNavigate,
  currentUser,
  unreadCount = 2,
  unreadChatCount = 1,
  onOpenGuestReview,
  onOpenPostSpace,
}) => {
  const [showSafetyBanner, setShowSafetyBanner] = useState(true);

  return (
    <>
      {/* 1. Optional Slim Safety Notice Ticker (Desktop) */}
      {showSafetyBanner && (
        <div className="hidden md:block bg-[#2F3626] text-[#EAE2D6] py-1 px-4 text-xs border-b border-white/10 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 font-bold text-[#8B9A6E]">
                <ShieldCheck className="w-3.5 h-3.5" /> RentSpace AKS
              </span>
              <span className="text-[#EAE2D6]/60">• Open Community Rental & Space Directory</span>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="px-1.5 py-0.5 rounded bg-[#C4684A]/30 text-[#F3CD6D] font-bold text-[10px] uppercase tracking-wider">
                Direct Deal Notice
              </span>
              <span className="text-[11px] text-[#F7F2EB] font-medium">
                Connect directly with landlords & hosts. Zero middleman fees. Always inspect in daytime!
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <button
                onClick={() => onNavigate('fee_benchmark')}
                className="text-[#8B9A6E] hover:underline font-medium cursor-pointer"
              >
                Fee Benchmark
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => onNavigate('neighbourhoods')}
                className="text-[#8B9A6E] hover:underline font-medium cursor-pointer"
              >
                Uyo Zones
              </button>
              <button
                onClick={() => setShowSafetyBanner(false)}
                className="ml-2 text-white/40 hover:text-white p-0.5 rounded cursor-pointer"
                title="Dismiss safety notice"
                aria-label="Dismiss safety notice"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Top Desktop Navigation Bar */}
      <header className="hidden md:block sticky top-0 z-40 bg-[#F7F2EB]/95 backdrop-blur-md border-b border-[#EAE2D6] shadow-[0_2px_12px_rgba(47,54,38,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          
          {/* Professional Brand Logo */}
          <Logo
            variant="full"
            size="md"
            onClick={() => onNavigate('landing')}
          />

          {/* Center Navigation Links (Rewards removed as requested) */}
          <nav className="flex items-center gap-1 bg-[#EAE2D6]/50 p-1 rounded-2xl border border-[#EAE2D6]">
            <button
              onClick={() => onNavigate('feed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'feed'
                  ? 'bg-[#8B9A6E] text-white shadow-xs'
                  : 'text-[#2F3626]/80 hover:text-[#2F3626] hover:bg-white/60'
              }`}
            >
              Feed
            </button>
            <button
              onClick={() => onNavigate('search')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'search' || currentScreen === 'map_view'
                  ? 'bg-[#8B9A6E] text-white shadow-xs'
                  : 'text-[#2F3626]/80 hover:text-[#2F3626] hover:bg-white/60'
              }`}
            >
              Explore Spaces
            </button>
            <button
              onClick={() => onNavigate('scam_check')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentScreen === 'scam_check' || currentScreen === 'scam_report_detail'
                  ? 'bg-[#C4684A] text-white shadow-xs'
                  : 'text-[#C4684A] hover:bg-[#C4684A]/10'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Scam Check</span>
            </button>
            <button
              onClick={() => onNavigate('property_alerts')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                currentScreen === 'property_alerts'
                  ? 'bg-[#8B9A6E] text-white shadow-xs'
                  : 'text-[#2F3626]/80 hover:text-[#2F3626] hover:bg-white/60'
              }`}
            >
              <Bell className="w-3.5 h-3.5 text-[#8B9A6E]" />
              <span>Alerts</span>
            </button>
            <button
              onClick={() => onNavigate('how_it_works')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                currentScreen === 'how_it_works'
                  ? 'bg-[#8B9A6E] text-white shadow-xs'
                  : 'text-[#2F3626]/80 hover:text-[#2F3626] hover:bg-white/60'
              }`}
            >
              How It Works
            </button>
          </nav>

          {/* Right Action Controls: Drop Review (Guest-friendly) + List Space (Host) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Drop Review (Open to guests & users) */}
            <button
              onClick={() => {
                if (onOpenGuestReview) onOpenGuestReview();
                else onNavigate('post_review');
              }}
              className="bg-white hover:bg-[#EAE2D6] text-[#2F3626] border border-[#D8CEBE] px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
              title="Drop a community review without logging in"
            >
              <Star className="w-3.5 h-3.5 text-[#F3CD6D] fill-[#F3CD6D]" />
              <span>+ Drop Review</span>
            </button>

            {/* List a Space (Requires Host Account) */}
            <button
              onClick={() => {
                if (onOpenPostSpace) onOpenPostSpace();
                else onNavigate('post_review');
              }}
              className="bg-[#8B9A6E] hover:bg-[#6D7C52] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1 active:scale-95 cursor-pointer"
              title="Post house, shop, room, event hall, or office"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>+ List a Space</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={() => onNavigate('notifications')}
              className="relative p-2 rounded-xl text-[#2F3626] hover:bg-[#EAE2D6] transition-colors cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#C4684A] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#F7F2EB]">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Chat Inbox */}
            <button
              onClick={() => onNavigate('chat_inbox')}
              className="relative p-2 rounded-xl text-[#2F3626] hover:bg-[#EAE2D6] transition-colors cursor-pointer"
              aria-label="Messages"
            >
              <MessageSquare className="w-4.5 h-4.5" />
              {unreadChatCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8B9A6E] text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-[#F7F2EB]">
                  {unreadChatCount}
                </span>
              )}
            </button>

            {/* User Profile Pill */}
            {currentUser ? (
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-xl bg-white hover:bg-[#EAE2D6] transition-colors border border-[#EAE2D6] cursor-pointer shadow-2xs"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-6 h-6 rounded-lg object-cover border border-[#8B9A6E]"
                />
                <span className="text-xs font-bold text-[#2F3626]">
                  {currentUser.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('sign_in')}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#2F3626] border border-[#2F3626] hover:bg-[#2F3626] hover:text-white transition-all cursor-pointer"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 3. Mobile Top Header Bar */}
      <header className="md:hidden sticky top-0 z-40 bg-[#F7F2EB]/95 backdrop-blur-md border-b border-[#EAE2D6] px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <Logo
          variant="compact"
          size="sm"
          onClick={() => onNavigate('landing')}
        />

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigate('property_alerts')}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
              currentScreen === 'property_alerts'
                ? 'bg-[#8B9A6E] text-white'
                : 'text-[#2F3626] bg-[#EAE2D6]/60'
            }`}
            title="Property Alerts"
          >
            <Bell className="w-4 h-4 text-[#8B9A6E]" />
          </button>
          <button
            onClick={() => onNavigate('scam_check')}
            className="p-1.5 rounded-lg text-xs font-semibold text-[#C4684A] bg-[#C4684A]/10 flex items-center gap-1"
            title="Scam Check"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
          {currentUser && (
            <button
              onClick={() => onNavigate('profile')}
              className="p-0.5 rounded-lg border border-[#8B9A6E]/40"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 rounded-md object-cover"
              />
            </button>
          )}
        </div>
      </header>

      {/* 4. Mobile Bottom Navigation Bar with Raised 3D Center "+" Button */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#F7F2EB]/95 backdrop-blur-lg border-t border-[#EAE2D6] pb-safe shadow-[0_-4px_20px_rgba(47,54,38,0.08)]">
        <div className="grid grid-cols-5 items-center h-15 px-2">
          {/* 1. Home Feed */}
          <button
            onClick={() => onNavigate('feed')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              currentScreen === 'feed' || currentScreen === 'landing'
                ? 'text-[#8B9A6E] font-bold'
                : 'text-[#2F3626]/70 hover:text-[#2F3626]'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">Home</span>
          </button>

          {/* 2. Search & Map */}
          <button
            onClick={() => onNavigate('search')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              currentScreen === 'search' || currentScreen === 'map_view'
                ? 'text-[#8B9A6E] font-bold'
                : 'text-[#2F3626]/70 hover:text-[#2F3626]'
            }`}
          >
            <Search className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">Search</span>
          </button>

          {/* 3. Center Raised 3D "+ Post Review" Button */}
          <div className="flex justify-center -translate-y-3.5">
            <button
              onClick={() => onNavigate('post_review')}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#6D7C52] via-[#8B9A6E] to-[#A7B68B] text-white flex items-center justify-center shadow-[0_6px_16px_rgba(139,154,110,0.45)] border-3 border-[#F7F2EB] hover:scale-108 active:scale-95 transition-all cursor-pointer"
              aria-label="Post a Move-Out Review"
            >
              <PlusCircle className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>

          {/* 4. Chat Inbox */}
          <button
            onClick={() => onNavigate('chat_inbox')}
            className={`relative flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              currentScreen === 'chat_inbox' || currentScreen === 'chat_thread'
                ? 'text-[#8B9A6E] font-bold'
                : 'text-[#2F3626]/70 hover:text-[#2F3626]'
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            {unreadChatCount > 0 && (
              <span className="absolute top-1 right-4 w-2 h-2 rounded-full bg-[#8B9A6E] ring-2 ring-[#F7F2EB]" />
            )}
            <span className="text-[10px] mt-0.5 font-medium">Chat</span>
          </button>

          {/* 5. User Profile / Account */}
          <button
            onClick={() => onNavigate(currentUser ? 'profile' : 'sign_in')}
            className={`flex flex-col items-center justify-center py-1 transition-colors cursor-pointer ${
              currentScreen === 'profile' || currentScreen === 'sign_in'
                ? 'text-[#8B9A6E] font-bold'
                : 'text-[#2F3626]/70 hover:text-[#2F3626]'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] mt-0.5 font-medium">
              {currentUser ? 'Profile' : 'Sign In'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
