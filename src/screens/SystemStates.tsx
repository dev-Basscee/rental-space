import React, { useState } from 'react';
import {
  Search,
  WifiOff,
  AlertTriangle,
  RotateCw,
  CheckCircle2,
  Sparkles,
  Inbox,
  FileQuestion,
  Home,
  ArrowRight
} from 'lucide-react';

interface SystemStatesProps {
  initialState?: 'empty' | 'error' | 'loading' | 'success';
  onNavigate: (screen: string, param?: string) => void;
}

export const SystemStates: React.FC<SystemStatesProps> = ({
  initialState = 'empty',
  onNavigate,
}) => {
  const [activeTab, setActiveTab] = useState<'empty' | 'error' | 'loading' | 'success'>(initialState);

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* State Tab Switcher */}
        <div className="flex items-center justify-between border-b border-[#EAE2D6] pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab('empty')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'empty' ? 'bg-[#8B9A6E] text-white shadow-sm' : 'bg-white text-[#2F3626]'
              }`}
            >
              34. Empty States
            </button>
            <button
              onClick={() => setActiveTab('error')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'error' ? 'bg-[#8B9A6E] text-white shadow-sm' : 'bg-white text-[#2F3626]'
              }`}
            >
              35. Error & Offline
            </button>
            <button
              onClick={() => setActiveTab('loading')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'loading' ? 'bg-[#8B9A6E] text-white shadow-sm' : 'bg-white text-[#2F3626]'
              }`}
            >
              36. Loading & Skeletons
            </button>
            <button
              onClick={() => setActiveTab('success')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'success' ? 'bg-[#8B9A6E] text-white shadow-sm' : 'bg-white text-[#2F3626]'
              }`}
            >
              37. Success Confirmations
            </button>
          </div>

          <button
            onClick={() => onNavigate('feed')}
            className="text-xs text-[#8B9A6E] font-bold hover:underline"
          >
            Home Feed →
          </button>
        </div>

        {/* ---------------- SCREEN 34: EMPTY STATES ---------------- */}
        {activeTab === 'empty' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#EAE2D6] shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-[#EAE2D6] mx-auto flex items-center justify-center text-3xl shadow-inner">
                🏠
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-extrabold text-xl text-[#2F3626]">
                  No Reviews for This Compound Yet
                </h3>
                <p className="text-xs text-[#2F3626]/75 max-w-sm mx-auto">
                  Be the very first tenant to document this building in Uyo and earn 150 airtime points!
                </p>
              </div>
              <button
                onClick={() => onNavigate('post_review')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-xs shadow transition-all"
              >
                + Post First Move-Out Review
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F2EB] mx-auto flex items-center justify-center text-xl">
                  🔍
                </div>
                <h4 className="font-bold text-sm text-[#2F3626]">No Search Results Found</h4>
                <p className="text-xs text-[#2F3626]/70">
                  Try adjusting your price filter or searching by neighbourhood name.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F7F2EB] mx-auto flex items-center justify-center text-xl">
                  💬
                </div>
                <h4 className="font-bold text-sm text-[#2F3626]">No Messages in Inbox</h4>
                <p className="text-xs text-[#2F3626]/70">
                  When you tap "Ask Tenant" on any review, your conversation will appear here.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 35: ERROR & LOW DATA STATES ---------------- */}
        {activeTab === 'error' && (
          <div className="space-y-6">
            {/* Offline / Low Data Mode */}
            <div className="bg-white rounded-3xl p-8 border border-[#EAE2D6] shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-[#C4684A]/15 text-[#C4684A] mx-auto flex items-center justify-center">
                <WifiOff className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-heading font-extrabold text-xl text-[#2F3626]">
                  Slow Internet / Offline Draft Mode
                </h3>
                <p className="text-xs text-[#2F3626]/75 max-w-md mx-auto leading-relaxed">
                  Akwa Ibom network seems weak right now. Don't worry! Your move-out photos and review drafts have been saved locally on your phone.
                </p>
              </div>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => alert('Retrying network sync...')}
                  className="px-5 py-2.5 rounded-2xl bg-[#8B9A6E] text-white text-xs font-bold flex items-center gap-1.5 shadow"
                >
                  <RotateCw className="w-4 h-4" />
                  <span>Retry Sync</span>
                </button>
                <button
                  onClick={() => onNavigate('feed')}
                  className="px-5 py-2.5 rounded-2xl bg-[#EAE2D6] text-[#2F3626] text-xs font-bold"
                >
                  Browse Cached Reviews
                </button>
              </div>
            </div>

            {/* 404 Page Not Found */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] text-center space-y-3">
              <span className="font-heading font-black text-4xl text-[#C4684A]">404</span>
              <h4 className="font-bold text-base text-[#2F3626]">Property or Review Not Found</h4>
              <p className="text-xs text-[#2F3626]/70 max-w-sm mx-auto">
                The listing URL might have changed or was removed by our moderation team.
              </p>
              <button
                onClick={() => onNavigate('feed')}
                className="px-4 py-2 rounded-xl bg-[#8B9A6E] text-white text-xs font-bold"
              >
                Return to Uyo Feed
              </button>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 36: LOADING & SKELETON SCREENS ---------------- */}
        {activeTab === 'loading' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-[#8B9A6E]">
              <RotateCw className="w-4 h-4 animate-spin" />
              <span>Shimmer & Skeleton Loading States (Low data friendly):</span>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] space-y-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EAE2D6]" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-[#EAE2D6] rounded-md w-1/3" />
                  <div className="h-3 bg-[#EAE2D6] rounded-md w-1/4" />
                </div>
              </div>

              <div className="h-44 bg-[#EAE2D6] rounded-2xl w-full" />

              <div className="space-y-2">
                <div className="h-3 bg-[#EAE2D6] rounded-md w-full" />
                <div className="h-3 bg-[#EAE2D6] rounded-md w-4/5" />
              </div>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 37: SUCCESS CONFIRMATIONS ---------------- */}
        {activeTab === 'success' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-[#EAE2D6] shadow-sm text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#8B9A6E]/15 text-[#8B9A6E] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-[#8B9A6E]/15 text-[#6D7C52] text-xs font-bold">
                  VERIFICATION SUCCESSFUL
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                  Review Submitted & Geotag Approved
                </h3>
                <p className="text-xs text-[#2F3626]/80 max-w-md mx-auto leading-relaxed">
                  Your photographic review for Shelter Afrique has been added to the public register.
                </p>
              </div>

              <button
                onClick={() => onNavigate('feed')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-xs shadow"
              >
                Back to Feed
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
