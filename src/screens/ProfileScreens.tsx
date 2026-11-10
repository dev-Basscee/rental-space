import React, { useState } from 'react';
import {
  User,
  Settings,
  Bookmark,
  Bell,
  Award,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Calendar,
  Heart,
  ChevronRight,
  Eye,
  Sliders,
  LogOut,
  AlertCircle
} from 'lucide-react';
import { CURRENT_USER, MOCK_PROPERTIES, MOCK_REVIEWS, MOCK_NOTIFICATIONS, MOCK_NEIGHBOURHOODS } from '../data/mockData';

import { AppNotification } from '../types';

interface ProfileScreensProps {
  initialSubScreen?: 'profile' | 'edit_profile' | 'saved_properties' | 'notifications';
  onNavigate: (screen: string, param?: string) => void;
  onLogout?: () => void;
  notifications?: AppNotification[];
}

export const ProfileScreens: React.FC<ProfileScreensProps> = ({
  initialSubScreen = 'profile',
  onNavigate,
  onLogout,
  notifications: initialNotifications,
}) => {
  const [subScreen, setSubScreen] = useState(initialSubScreen);
  const [user, setUser] = useState(CURRENT_USER);
  const [localNotifications, setLocalNotifications] = useState<AppNotification[]>(
    initialNotifications || MOCK_NOTIFICATIONS
  );
  const notifications = initialNotifications || localNotifications;

  // Edit settings state
  const [nameInput, setNameInput] = useState(user.name);
  const [bioInput, setBioInput] = useState(user.bio || '');
  const [phoneInput, setPhoneInput] = useState(user.phone);
  const [anonymousReviewing, setAnonymousReviewing] = useState(false);
  const [emailAlerts, setEmailAlerts] = useState(true);

  const myReviews = MOCK_REVIEWS.slice(0, 2);
  const savedProps = MOCK_PROPERTIES.filter((p) => p.saved);

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        
        {/* Sub-navigation bar across screens 25-28 */}
        <div className="flex items-center justify-between border-b border-[#EAE2D6] pb-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setSubScreen('profile')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                subScreen === 'profile' ? 'bg-[#8B9A6E] text-white shadow-sm' : 'bg-white text-[#2F3626]'
              }`}
            >
              25. Profile
            </button>
            <button
              onClick={() => setSubScreen('edit_profile')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                subScreen === 'edit_profile' ? 'bg-[#8B9A6E] text-white shadow-sm' : 'bg-white text-[#2F3626]'
              }`}
            >
              26. Edit Settings
            </button>
            <button
              onClick={() => setSubScreen('saved_properties')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                subScreen === 'saved_properties' ? 'bg-[#8B9A6E] text-white shadow-sm' : 'bg-white text-[#2F3626]'
              }`}
            >
              27. Saved & Followed
            </button>
            <button
              onClick={() => onNavigate('property_alerts')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap bg-white hover:bg-[#EAE2D6] text-[#2F3626] flex items-center gap-1.5"
            >
              <Bell className="w-3.5 h-3.5 text-[#8B9A6E]" />
              <span>Property Alerts (3)</span>
            </button>
            <button
              onClick={() => setSubScreen('notifications')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 ${
                subScreen === 'notifications' ? 'bg-[#8B9A6E] text-white shadow-sm' : 'bg-white text-[#2F3626]'
              }`}
            >
              <span>28. Alerts</span>
              <span className="w-2 h-2 rounded-full bg-[#C4684A]" />
            </button>
          </div>

          <button
            onClick={() => onNavigate('feed')}
            className="text-xs text-[#8B9A6E] font-bold hover:underline"
          >
            Feed →
          </button>
        </div>

        {/* ---------------- SCREEN 25: USER PROFILE ---------------- */}
        {subScreen === 'profile' && (
          <div className="space-y-6">
            {/* Profile Overview Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-18 h-18 rounded-3xl object-cover border-2 border-[#8B9A6E] shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h1 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                        {user.name}
                      </h1>
                      <span className="px-2.5 py-0.5 rounded-md bg-[#8B9A6E]/15 text-[#6D7C52] text-xs font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#8B9A6E]" />
                        <span>Verified Tenant</span>
                      </span>
                    </div>
                    <p className="text-xs text-[#2F3626]/70 mt-0.5 font-medium">
                      {user.location} • Member since {user.verifiedAt}
                    </p>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#F7F2EB] border border-[#EAE2D6] text-[11px] font-bold text-[#8B9A6E] mt-2">
                      🏆 {user.level} (420 Points)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSubScreen('edit_profile')}
                    className="px-4 py-2 rounded-2xl bg-[#EAE2D6] hover:bg-[#D8CEBE] text-xs font-bold text-[#2F3626] transition-colors"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => onNavigate('rewards')}
                    className="px-4 py-2 rounded-2xl bg-[#8B9A6E] text-white text-xs font-bold shadow hover:bg-[#6D7C52] transition-colors"
                  >
                    Redeem Airtime
                  </button>
                </div>
              </div>

              {/* Bio */}
              <p className="text-xs sm:text-sm text-[#2F3626]/80 leading-relaxed bg-[#F7F2EB] p-4 rounded-2xl border border-[#EAE2D6]">
                {user.bio}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-3 text-center text-xs pt-1">
                <div className="p-3 bg-[#EAE2D6]/40 rounded-2xl">
                  <span className="font-heading font-black text-xl text-[#8B9A6E]">
                    {user.reviewsCount}
                  </span>
                  <p className="text-[11px] text-[#2F3626]/70 font-semibold">Move-Out Reviews</p>
                </div>
                <div className="p-3 bg-[#EAE2D6]/40 rounded-2xl">
                  <span className="font-heading font-black text-xl text-[#2F3626]">
                    {user.helpfulVotes}
                  </span>
                  <p className="text-[11px] text-[#2F3626]/70 font-semibold">Helpful Votes</p>
                </div>
                <div className="p-3 bg-[#EAE2D6]/40 rounded-2xl">
                  <span className="font-heading font-black text-xl text-[#F3CD6D]">
                    {user.reputationPoints}
                  </span>
                  <p className="text-[11px] text-[#2F3626]/70 font-semibold">Reward Points</p>
                </div>
              </div>
            </div>

            {/* My Posted Reviews */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-heading font-bold text-lg text-[#2F3626]">
                  My Posted Move-Out Reviews ({myReviews.length})
                </h2>
                <button
                  onClick={() => onNavigate('post_review')}
                  className="text-xs font-bold text-[#8B9A6E] hover:underline"
                >
                  + Post Another Review
                </button>
              </div>

              {myReviews.map((rev) => (
                <div
                  key={rev.id}
                  onClick={() => onNavigate('single_review', rev.id)}
                  className="bg-white rounded-3xl p-5 border border-[#EAE2D6] shadow-sm hover:shadow-md transition-all cursor-pointer space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#2F3626]">
                      Shelter Afrique 2-Bedroom Flat
                    </span>
                    <span className="text-[#8B9A6E] font-bold">⭐ {rev.overallRating}</span>
                  </div>
                  <p className="text-[#2F3626]/80 line-clamp-2 italic">
                    "{rev.summaryLoved}"
                  </p>
                  <div className="pt-2 border-t border-[#EAE2D6] flex items-center justify-between text-[11px] text-[#2F3626]/60">
                    <span>{rev.datePosted}</span>
                    <span>{rev.likesCount} people thanked you</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 26: EDIT PROFILE & SETTINGS ---------------- */}
        {subScreen === 'edit_profile' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-5">
            <h2 className="font-heading font-bold text-xl text-[#2F3626]">
              Edit Profile & Privacy Settings
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">Display Name</label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] font-medium focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">Bio & Living Perspective</label>
                <textarea
                  rows={3}
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">Phone Number (Hidden)</label>
                <input
                  type="tel"
                  value={phoneInput}
                  disabled
                  className="w-full p-3 rounded-xl bg-[#EEEEEE] border border-[#D8CEBE] text-xs text-[#2F3626]/60 font-mono"
                />
                <span className="text-[10px] text-[#2F3626]/50">Phone is strictly for SMS OTP verification and never shown publicly.</span>
              </div>

              {/* Privacy toggles */}
              <div className="pt-2 border-t border-[#EAE2D6] space-y-3">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#6D7C52]">
                  Privacy & Safety Preferences
                </h4>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F7F2EB] cursor-pointer">
                  <div>
                    <span className="font-bold text-xs text-[#2F3626] block">
                      Pseudonymous Review Mode
                    </span>
                    <span className="text-[11px] text-[#2F3626]/70">
                      Display reviews as "Outgoing Tenant" rather than your full name.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={anonymousReviewing}
                    onChange={(e) => setAnonymousReviewing(e.target.checked)}
                    className="rounded text-[#8B9A6E] focus:ring-[#8B9A6E]"
                  />
                </label>

                <label className="flex items-center justify-between p-3 rounded-2xl bg-[#F7F2EB] cursor-pointer">
                  <div>
                    <span className="font-bold text-xs text-[#2F3626] block">
                      Area Scam Alerts Notification
                    </span>
                    <span className="text-[11px] text-[#2F3626]/70">
                      Get instant alerts when a fake agent is flagged in your area.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={emailAlerts}
                    onChange={(e) => setEmailAlerts(e.target.checked)}
                    className="rounded text-[#8B9A6E] focus:ring-[#8B9A6E]"
                  />
                </label>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                onClick={() => setSubScreen('profile')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-colors"
              >
                Save Settings
              </button>

              <button
                onClick={onLogout}
                className="text-xs text-[#C4684A] font-bold hover:underline flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 27: SAVED PROPERTIES & FOLLOWED AREAS ---------------- */}
        {subScreen === 'saved_properties' && (
          <div className="space-y-6">
            <h2 className="font-heading font-bold text-xl text-[#2F3626]">
              Saved Properties & Followed Uyo Neighbourhoods
            </h2>

            {/* Saved properties grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedProps.map((prop) => (
                <div
                  key={prop.id}
                  onClick={() => onNavigate('property_detail', prop.id)}
                  className="bg-white rounded-3xl overflow-hidden border border-[#EAE2D6] shadow-sm hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={prop.coverPhoto}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-[#8B9A6E] text-white text-[10px] font-bold px-2 py-0.5 rounded-lg">
                      Saved
                    </div>
                  </div>
                  <div className="p-4 space-y-1 text-xs">
                    <h4 className="font-bold text-sm text-[#2F3626] line-clamp-1">
                      {prop.title}
                    </h4>
                    <p className="text-[#2F3626]/70 line-clamp-1">{prop.address}</p>
                    <p className="font-bold text-[#8B9A6E] pt-1">
                      ₦{(prop.currentRentNaira / 1000).toFixed(0)}k/year • ⭐ {prop.averageRating}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Followed Neighbourhoods */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] space-y-3">
              <h3 className="font-heading font-bold text-base text-[#2F3626]">
                Followed Uyo Areas (2)
              </h3>
              <div className="flex gap-2 flex-wrap">
                <span className="px-3.5 py-1.5 rounded-2xl bg-[#EAE2D6] text-xs font-bold text-[#2F3626] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8B9A6E]" />
                  <span>Shelter Afrique</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-2xl bg-[#EAE2D6] text-xs font-bold text-[#2F3626] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#8B9A6E]" />
                  <span>Ewet Housing</span>
                </span>
              </div>
            </div>

            {/* Property Alert Subscriptions Summary Box */}
            <div className="bg-gradient-to-r from-[#EAE2D6] to-[#F7F2EB] rounded-3xl p-6 border border-[#D8CEBE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#8B9A6E] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bell className="w-5 h-5 text-[#F3CD6D]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#2F3626]">
                    Property Alert Subscriptions (3 Active)
                  </h3>
                  <p className="text-xs text-[#2F3626]/75">
                    Shelter Afrique under ₦900k, Ewet Housing Flats, Uniuyo Campus Lodges.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate('property_alerts')}
                className="px-4 py-2 rounded-xl bg-[#8B9A6E] text-white font-bold text-xs hover:bg-[#6D7C52] transition-colors shadow-xs whitespace-nowrap"
              >
                Manage & Test Alerts →
              </button>
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 28: NOTIFICATIONS ---------------- */}
        {subScreen === 'notifications' && (
          <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading font-bold text-xl text-[#2F3626]">
                Community Notifications
              </h2>
              <button
                onClick={() =>
                  setLocalNotifications(notifications.map((n) => ({ ...n, read: true })))
                }
                className="text-xs font-semibold text-[#8B9A6E] hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            </div>

            <div className="space-y-3">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  onClick={() => {
                    if (notif.linkScreen) {
                      onNavigate(notif.linkScreen, notif.linkParam);
                    }
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                    notif.read
                      ? 'bg-white border-[#EAE2D6]'
                      : 'bg-[#F2F6ED] border-[#8B9A6E]/50 shadow-xs'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      notif.type === 'scam_alert'
                        ? 'bg-[#C4684A] text-white'
                        : notif.type === 'property_alert'
                        ? 'bg-[#2F3626] text-white shadow-xs'
                        : 'bg-[#8B9A6E] text-white'
                    }`}
                  >
                    {notif.type === 'scam_alert' ? '⚠️' : notif.type === 'property_alert' ? '🏡' : '🔔'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs sm:text-sm text-[#2F3626]">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-[#2F3626]/50 shrink-0 ml-2">
                        {notif.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-[#2F3626]/80 mt-0.5 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
