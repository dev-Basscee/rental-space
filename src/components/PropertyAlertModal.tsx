import React, { useState, useEffect } from 'react';
import {
  Bell,
  Mail,
  Smartphone,
  CheckCircle2,
  X,
  MapPin,
  Sliders,
  DollarSign,
  ShieldCheck,
  Sparkles,
  MessageSquare,
  AlertCircle
} from 'lucide-react';
import { PropertyAlertSubscription } from '../types';

interface PropertyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveSubscription: (sub: PropertyAlertSubscription) => void;
  initialCriteria?: {
    location?: string;
    propertyType?: string;
    maxPriceNaira?: number;
    onlyVerifiedListings?: boolean;
    minRating?: number;
  };
  userEmail?: string;
  userPhone?: string;
}

export const PropertyAlertModal: React.FC<PropertyAlertModalProps> = ({
  isOpen,
  onClose,
  onSaveSubscription,
  initialCriteria,
  userEmail = 'bassey.etim@gmail.com',
  userPhone = '+234 803 456 7890',
}) => {
  const [alertName, setAlertName] = useState('');
  const [location, setLocation] = useState(initialCriteria?.location || 'Shelter Afrique');
  const [propertyType, setPropertyType] = useState(initialCriteria?.propertyType || '2-Bedroom Flat');
  const [maxPrice, setMaxPrice] = useState(initialCriteria?.maxPriceNaira || 850000);
  const [onlyVerified, setOnlyVerified] = useState(initialCriteria?.onlyVerifiedListings ?? true);
  const [minRating, setMinRating] = useState(initialCriteria?.minRating || 3.5);

  // Channels
  const [channelEmail, setChannelEmail] = useState(true);
  const [channelPush, setChannelPush] = useState(true);
  const [channelWhatsapp, setChannelWhatsapp] = useState(true);
  const [emailInput, setEmailInput] = useState(userEmail);
  const [phoneInput, setPhoneInput] = useState(userPhone);
  const [frequency, setFrequency] = useState<'instant' | 'daily_digest'>('instant');

  // Push Permission State
  const [pushPermission, setPushPermission] = useState<string>('default');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPushPermission(Notification.permission);
    }
  }, [isOpen]);

  useEffect(() => {
    // Generate suggested alert name
    const loc = location === 'All' ? 'All Uyo' : location;
    const type = propertyType === 'All' ? 'All Types' : propertyType;
    setAlertName(`${loc} ${type} under ₦${(maxPrice / 1000).toFixed(0)}k`);
  }, [location, propertyType, maxPrice]);

  if (!isOpen) return null;

  const handleRequestPushPermission = async () => {
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        setPushPermission(permission);
        if (permission === 'granted') {
          setChannelPush(true);
        }
      } catch (err) {
        console.warn('Notification permission error', err);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSub: PropertyAlertSubscription = {
      id: `alert-${Date.now()}`,
      name: alertName || `${location} ${propertyType}`,
      location,
      propertyType,
      maxPriceNaira: maxPrice,
      onlyVerifiedListings: onlyVerified,
      minRating,
      channels: {
        email: channelEmail,
        push: channelPush,
        whatsapp: channelWhatsapp,
      },
      emailAddress: channelEmail ? emailInput : undefined,
      phoneNumber: channelWhatsapp ? phoneInput : undefined,
      frequency,
      createdAt: 'Just now',
      active: true,
      matchCount: 2,
    };

    onSaveSubscription(newSub);
    onClose();
  };

  const areas = [
    'All Uyo',
    'Shelter Afrique',
    'Ewet Housing',
    'Ikot Ekpene Road',
    'Abak Road',
    'Aka Road',
    'Use Offot',
    'Itam',
  ];

  const propertyTypes = [
    'All Types',
    'Self-Contain',
    '1-Bedroom Flat',
    '2-Bedroom Flat',
    '3-Bedroom Flat',
    'Student Hostel',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2F3626]/70 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#EAE2D6] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#8B9A6E] to-[#6D7C52] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
              <Bell className="w-5 h-5 text-[#F3CD6D]" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">
                Set Property Alert
              </h3>
              <p className="text-xs text-white/90">
                Get notified when matching verified homes are listed in Uyo
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Alert Name */}
          <div>
            <label className="font-bold text-[#2F3626] block mb-1">
              Alert Subscription Label
            </label>
            <input
              type="text"
              value={alertName}
              onChange={(e) => setAlertName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-bold text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              required
            />
          </div>

          {/* Location & Property Type */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-[#2F3626] block mb-1">
                Target Uyo Location
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-medium text-xs focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              >
                {areas.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-[#2F3626] block mb-1">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-medium text-xs focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              >
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Ceiling */}
          <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#2F3626]">Maximum Annual Rent:</span>
              <span className="font-mono font-extrabold text-sm text-[#8B9A6E]">
                ₦{(maxPrice / 1000).toLocaleString()}k / yr
              </span>
            </div>
            <input
              type="range"
              min={200000}
              max={1800000}
              step={50000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#8B9A6E] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[#2F3626]/50">
              <span>₦200,000 (Student)</span>
              <span>₦1,000,000</span>
              <span>₦1,800,000 (Executive)</span>
            </div>
          </div>

          {/* Quality & Trust Filters */}
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] cursor-pointer hover:bg-[#EAE2D6]/70 transition-colors">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8B9A6E]" />
                <span className="font-bold text-[#2F3626]">
                  Only Verified Title / Inspected Listings
                </span>
              </div>
              <input
                type="checkbox"
                checked={onlyVerified}
                onChange={(e) => setOnlyVerified(e.target.checked)}
                className="rounded text-[#8B9A6E] focus:ring-[#8B9A6E]"
              />
            </label>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE]">
              <span className="font-bold text-[#2F3626]">Minimum Tenant Rating</span>
              <div className="flex items-center gap-1 font-bold text-[#8B9A6E]">
                <span>⭐</span>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="bg-transparent font-bold focus:outline-none"
                >
                  <option value={0}>Any rating</option>
                  <option value={3.0}>3.0+ Stars</option>
                  <option value={4.0}>4.0+ Stars (Recommended)</option>
                  <option value={4.5}>4.5+ Stars (Top Tier)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notification Channels Selection */}
          <div className="space-y-2 pt-2 border-t border-[#EAE2D6]">
            <span className="font-bold text-xs uppercase tracking-wider text-[#6D7C52] block">
              Where to Deliver Alerts
            </span>

            {/* Email Option */}
            <div className="p-3 rounded-xl border border-[#D8CEBE] bg-white space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2 font-bold text-[#2F3626]">
                  <Mail className="w-4 h-4 text-[#8B9A6E]" />
                  <span>Email Notification Alerts</span>
                </div>
                <input
                  type="checkbox"
                  checked={channelEmail}
                  onChange={(e) => setChannelEmail(e.target.checked)}
                  className="rounded text-[#8B9A6E] focus:ring-[#8B9A6E]"
                />
              </label>
              {channelEmail && (
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-mono text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  required={channelEmail}
                />
              )}
            </div>

            {/* Browser Push Notifications */}
            <div className="p-3 rounded-xl border border-[#D8CEBE] bg-white space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2 font-bold text-[#2F3626]">
                  <Smartphone className="w-4 h-4 text-[#8B9A6E]" />
                  <span>Mobile & Browser Push Notifications</span>
                </div>
                <input
                  type="checkbox"
                  checked={channelPush}
                  onChange={(e) => {
                    const next = e.target.checked;
                    setChannelPush(next);
                    if (next && pushPermission !== 'granted') {
                      handleRequestPushPermission();
                    }
                  }}
                  className="rounded text-[#8B9A6E] focus:ring-[#8B9A6E]"
                />
              </label>

              {channelPush && pushPermission !== 'granted' && (
                <div className="flex items-center justify-between bg-[#F7F2EB] p-2 rounded-lg text-[11px]">
                  <span className="text-[#2F3626]/70">
                    Browser notification permission required:
                  </span>
                  <button
                    type="button"
                    onClick={handleRequestPushPermission}
                    className="px-2.5 py-1 rounded bg-[#8B9A6E] text-white font-bold text-[10px]"
                  >
                    Enable Push
                  </button>
                </div>
              )}
            </div>

            {/* WhatsApp / SMS Option */}
            <div className="p-3 rounded-xl border border-[#D8CEBE] bg-white space-y-2">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2 font-bold text-[#2F3626]">
                  <MessageSquare className="w-4 h-4 text-[#8B9A6E]" />
                  <span>WhatsApp / SMS Instant Ping</span>
                </div>
                <input
                  type="checkbox"
                  checked={channelWhatsapp}
                  onChange={(e) => setChannelWhatsapp(e.target.checked)}
                  className="rounded text-[#8B9A6E] focus:ring-[#8B9A6E]"
                />
              </label>
              {channelWhatsapp && (
                <input
                  type="tel"
                  value={phoneInput}
                  onChange={(e) => setPhoneInput(e.target.value)}
                  placeholder="+234 phone number"
                  className="w-full px-3 py-1.5 rounded-lg bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-mono text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  required={channelWhatsapp}
                />
              )}
            </div>
          </div>

          {/* Delivery Frequency */}
          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-[#2F3626]">Alert Frequency:</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setFrequency('instant')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  frequency === 'instant'
                    ? 'bg-[#8B9A6E] text-white shadow-xs'
                    : 'bg-[#F7F2EB] text-[#2F3626]'
                }`}
              >
                ⚡ Instant
              </button>
              <button
                type="button"
                onClick={() => setFrequency('daily_digest')}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  frequency === 'daily_digest'
                    ? 'bg-[#8B9A6E] text-white shadow-xs'
                    : 'bg-[#F7F2EB] text-[#2F3626]'
                }`}
              >
                📅 Daily Digest (8 PM)
              </button>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#2F3626]/70 hover:text-[#2F3626]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#8B9A6E] to-[#6D7C52] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-[#F3CD6D]" />
              <span>Subscribe to Property Alerts</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
