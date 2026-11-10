import React, { useState } from 'react';
import { Layers, Smartphone, Monitor, ChevronRight, X, Sparkles, CheckCircle2 } from 'lucide-react';

export interface ScreenCategory {
  title: string;
  screens: { id: string; name: string; number: number; desc: string }[];
}

export const ALL_SCREEN_CATEGORIES: ScreenCategory[] = [
  {
    title: 'Public Screens (No Login Required)',
    screens: [
      { id: 'landing', name: '1. Landing Page (3D House & Door)', number: 1, desc: 'Hero with 3D house, Get Started with 3D door transition, stats, CTA' },
      { id: 'feed', name: '2. Home Feed', number: 2, desc: 'Social move-out reviews, filter chips, scam alert strip' },
      { id: 'search', name: '3. Search & Results', number: 3, desc: 'Filters for Uyo areas, price slider, verified tag, room types' },
      { id: 'map_view', name: '4. Map View', number: 4, desc: 'Interactive Uyo map with rating pins and drawer preview' },
      { id: 'property_detail', name: '5. Property Detail Page', number: 5, desc: 'Photo gallery, 7 rating categories, rent history, Ordered vs Got' },
      { id: 'single_review', name: '6. Single Review & Voice Note', number: 6, desc: 'Voice note player, facts, comments thread, landlord reply' },
      { id: 'scam_check', name: '7. Scam Check Search', number: 7, desc: 'Instant search by phone number or address (Clean vs Flagged states)' },
      { id: 'scam_report_detail', name: '8. Scam Report Case File', number: 8, desc: 'Detailed fraud report, modus operandi, evidence photos' },
      { id: 'agent_profile', name: '9. Agent & Landlord Profile', number: 9, desc: 'Verified badges, ratings, listings, scam count, response rate' },
      { id: 'neighbourhoods', name: '10. Neighbourhood Guide', number: 10, desc: 'Flood risk, power grade, clean water, average rent by zone' },
      { id: 'fee_benchmark', name: '11. Agent Fee Benchmark', number: 11, desc: 'Official rates, caution fee norms, scam fee calculator' },
      { id: 'how_it_works', name: '12. How It Works', number: 12, desc: '3-Step guide: Check, Review, Stay Safe' },
      { id: 'about_mission', name: '13. About / Mission', number: 13, desc: 'Why RentTruth AKS exists, ending rental fraud in Akwa Ibom' },
      { id: 'legal_policies', name: '14. Community & Legal Policies', number: 14, desc: 'Community rules, anti-defamation, terms of use, privacy' },
      { id: 'faq_help', name: '15. Contact & FAQ', number: 15, desc: 'Interactive FAQ accordion and Uyo support desk' },
    ],
  },
  {
    title: 'Authentication & Onboarding',
    screens: [
      { id: 'sign_in', name: '16. Sign In / Sign Up', number: 16, desc: 'Continue with Google, phone OTP, email options' },
      { id: 'otp_verification', name: '17. Phone OTP Verification', number: 17, desc: '6-digit SMS verification code entry with resend timer' },
      { id: 'onboarding', name: '18. Complete Profile & Role', number: 18, desc: 'Choose role: Tenant, House Hunter, Agent, Landlord' },
      { id: 'guest_prompt', name: '19. Guest Sign-Up Prompt', number: 19, desc: 'Friendly modal and bottom sheet when tapping protected actions' },
      { id: 'recovery', name: '20. Account Recovery', number: 20, desc: 'Reset password and phone OTP account unlock' },
    ],
  },
  {
    title: 'Logged-in Core Features',
    screens: [
      { id: 'post_review', name: '21. Post Move-Out Review (Wizard)', number: 21, desc: '8-step flow: address, photo checklist, ratings, voice note, facts, proof' },
      { id: 'report_scam', name: '22. Report a Scam Flow', number: 22, desc: 'Submit scammer phone, address, scam type, and screenshot proof' },
      { id: 'chat_inbox', name: '23. Chat Inbox', number: 23, desc: 'Conversations with outgoing tenants and verified agents' },
      { id: 'chat_thread', name: '24. Chat Thread', number: 24, desc: 'Direct message thread with safety tips & property card attachment' },
      { id: 'profile', name: '25. User Profile', number: 25, desc: 'My reviews, reputation points, badges, saved properties' },
      { id: 'edit_profile', name: '26. Edit Profile & Settings', number: 26, desc: 'Display name, phone, privacy mode, notifications' },
      { id: 'saved_properties', name: '27. Saved & Followed Areas', number: 27, desc: 'Bookmarked flats and followed neighbourhoods' },
      { id: 'notifications', name: '28. Notifications Feed', number: 28, desc: 'Review replies, scam warnings in followed areas, rewards' },
      { id: 'verification_centre', name: '29. Verification Centre', number: 29, desc: 'Get Verified Tenant, Verified Landlord, or Verified Agent badge' },
      { id: 'landlord_dashboard', name: '30. Landlord / Agent Dashboard', number: 30, desc: 'Reviews received, manage listings, mark issues fixed' },
      { id: 'reply_to_review', name: '31. Landlord Reply Tool', number: 31, desc: 'Official reply with issue resolution notice' },
      { id: 'rewards', name: '32. Open Community Directory', number: 32, desc: 'Connect directly with landlords & space hosts outside platform' },
      { id: 'property_alerts', name: '39. Property Alert Subscriptions', number: 39, desc: 'Subscribe to email & push alerts matching saved Uyo location, price & type' },
    ],
  },
  {
    title: 'Admin & Moderation',
    screens: [
      { id: 'admin_dashboard', name: '33. Admin Moderation Dashboard', number: 33, desc: 'Flagged reviews queue, scam report approvals, verification vetting' },
    ],
  },
  {
    title: 'System & Edge States',
    screens: [
      { id: 'empty_states', name: '34. Empty States', number: 34, desc: 'No reviews, no search results, no chats with 3D illustrations' },
      { id: 'error_states', name: '35. Error & Low Data Mode', number: 35, desc: '404 page, weak network/offline mode, upload failed with retry' },
      { id: 'loading_states', name: '36. Loading & Skeletons', number: 36, desc: 'Skeleton cards, shimmer placeholders, loading indicators' },
      { id: 'success_states', name: '37. Success Confirmations', number: 37, desc: 'Review submitted confetti, scam report logged, verification pending' },
    ],
  },
  {
    title: 'Design System & UI Specs',
    screens: [
      { id: 'design_system', name: '38. Design System Explorer', number: 38, desc: 'Palette, typography, buttons, badges, 3D stars, cards, inputs' },
    ],
  },
];

interface ScreenSwitcherProps {
  currentScreen: string;
  onSelectScreen: (screenId: string) => void;
  isMobileFrame: boolean;
  onToggleMobileFrame: (val: boolean) => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  currentScreen,
  onSelectScreen,
  isMobileFrame,
  onToggleMobileFrame,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const currentScreenObj = ALL_SCREEN_CATEGORIES.flatMap((c) => c.screens).find(
    (s) => s.id === currentScreen
  );

  const filteredCategories = ALL_SCREEN_CATEGORIES.map((cat) => ({
    ...cat,
    screens: cat.screens.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((cat) => cat.screens.length > 0);

  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Floating Navigator Bar (docked bottom-right, well clear of top navbar) */}
      <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 transition-all duration-300">
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className="flex items-center gap-2 bg-[#2F3626] hover:bg-[#3D4533] text-[#F7F2EB] px-3.5 py-2.5 rounded-full shadow-[0_12px_30px_rgba(47,54,38,0.45)] border border-[#8B9A6E]/50 text-xs font-bold transition-all hover:scale-105 active:scale-95 group"
            title="Expand Screen Navigator"
          >
            <span className="w-2 h-2 rounded-full bg-[#8B9A6E] animate-pulse" />
            <Layers className="w-4 h-4 text-[#8B9A6E] group-hover:rotate-12 transition-transform" />
            <span>Screen: {currentScreenObj ? currentScreenObj.number : '•'}</span>
            <span className="text-[10px] text-[#A7B68B] uppercase tracking-wider hidden sm:inline">Directory</span>
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-[#2F3626]/95 backdrop-blur-md text-[#F7F2EB] p-1.5 sm:px-3 sm:py-2 rounded-2xl shadow-[0_16px_36px_rgba(47,54,38,0.5)] border border-[#8B9A6E]/50 text-xs animate-in fade-in slide-in-from-bottom-2">
            {/* Viewport frame toggle */}
            <button
              onClick={() => onToggleMobileFrame(!isMobileFrame)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl transition-all font-semibold cursor-pointer ${
                isMobileFrame
                  ? 'bg-[#8B9A6E] text-white shadow-sm'
                  : 'bg-white/10 text-[#EAE2D6] hover:bg-white/20'
              }`}
              title="Toggle Mobile Bezel vs Desktop View"
            >
              {isMobileFrame ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 text-[#F3CD6D]" />
                  <span className="hidden sm:inline">Mobile Frame</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5 text-[#A7B68B]" />
                  <span className="hidden sm:inline">Desktop</span>
                </>
              )}
            </button>

            {/* Screen Picker Trigger */}
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1.5 bg-[#8B9A6E] hover:bg-[#6D7C52] text-white px-3 py-1.5 rounded-xl font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden md:inline text-[11px] opacity-80">Screen:</span>
              <span className="max-w-[110px] sm:max-w-[150px] truncate text-xs font-semibold">
                {currentScreenObj ? currentScreenObj.name : currentScreen}
              </span>
              <ChevronRight className="w-3 h-3 opacity-75" />
            </button>

            {/* Collapse toggle */}
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 rounded-lg text-[#EAE2D6]/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Minimize navigator"
              aria-label="Minimize navigator"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Screen Selector Drawer / Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div
            className="w-full max-w-2xl bg-[#F7F2EB] rounded-3xl shadow-2xl border border-[#EAE2D6] overflow-hidden flex flex-col max-h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#2F3626] text-[#F7F2EB] p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#8B9A6E] flex items-center justify-center text-white">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    RentTruth AKS Screen Directory
                  </h3>
                  <p className="text-xs text-[#EAE2D6]/70">
                    All 37 requested screens + Design System fully implemented
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-4 border-b border-[#EAE2D6] bg-white">
              <input
                type="text"
                placeholder="Search screens by name, flow or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-sm text-[#2F3626] focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
                autoFocus
              />
            </div>

            {/* Screens List */}
            <div className="p-4 overflow-y-auto space-y-6 flex-1">
              {filteredCategories.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#6D7C52] px-1">
                    {cat.title}
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {cat.screens.map((scr) => {
                      const isCurrent = currentScreen === scr.id;
                      return (
                        <button
                          key={scr.id}
                          onClick={() => {
                            onSelectScreen(scr.id);
                            setIsOpen(false);
                          }}
                          className={`p-3 rounded-2xl text-left transition-all border flex items-start gap-3 ${
                            isCurrent
                              ? 'bg-[#8B9A6E] text-white border-[#8B9A6E] shadow-md'
                              : 'bg-white hover:bg-[#EAE2D6] text-[#2F3626] border-[#EAE2D6]'
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold font-mono ${
                              isCurrent
                                ? 'bg-white text-[#8B9A6E]'
                                : 'bg-[#EAE2D6] text-[#2F3626]'
                            }`}
                          >
                            {scr.number}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-xs font-bold truncate ${
                                isCurrent ? 'text-white' : 'text-[#2F3626]'
                              }`}
                            >
                              {scr.name}
                            </p>
                            <p
                              className={`text-[11px] mt-0.5 line-clamp-1 ${
                                isCurrent ? 'text-white/80' : 'text-[#2F3626]/70'
                              }`}
                            >
                              {scr.desc}
                            </p>
                          </div>
                          {isCurrent && (
                            <CheckCircle2 className="w-4 h-4 text-white shrink-0 self-center" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer with Mode Switch */}
            <div className="p-4 bg-[#EAE2D6] border-t border-[#D8CEBE] flex items-center justify-between text-xs text-[#2F3626]">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Quick Viewport:</span>
                <button
                  onClick={() => onToggleMobileFrame(true)}
                  className={`px-3 py-1 rounded-lg font-medium ${
                    isMobileFrame ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
                  }`}
                >
                  Mobile Phone Bezel
                </button>
                <button
                  onClick={() => onToggleMobileFrame(false)}
                  className={`px-3 py-1 rounded-lg font-medium ${
                    !isMobileFrame ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
                  }`}
                >
                  Desktop Responsive
                </button>
              </div>
              <span className="text-[11px] text-[#2F3626]/70 font-mono">
                37 Screens Active
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
