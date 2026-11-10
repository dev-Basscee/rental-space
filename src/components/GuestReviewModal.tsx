import React, { useState } from 'react';
import { X, Star, ShieldCheck, Heart, AlertCircle, Building2, User, CheckCircle2 } from 'lucide-react';
import { Property, Review } from '../types';

interface GuestReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  preSelectedPropertyId?: string;
  onSaveReview: (review: Review) => void;
}

export const GuestReviewModal: React.FC<GuestReviewModalProps> = ({
  isOpen,
  onClose,
  properties,
  preSelectedPropertyId,
  onSaveReview,
}) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    preSelectedPropertyId || properties[0]?.id || ''
  );
  const [authorName, setAuthorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [usageType, setUsageType] = useState('Rented Space / Apartment');
  const [duration, setDuration] = useState('2024 - 2025 (1 Year)');
  
  // Rating states (1-5)
  const [lightRating, setLightRating] = useState(4);
  const [waterRating, setWaterRating] = useState(4);
  const [securityRating, setSecurityRating] = useState(4);
  const [drainageRating, setDrainageRating] = useState(4);
  const [hostRating, setHostRating] = useState(4);
  const [valueRating, setValueRating] = useState(4);

  const [lovedText, setLovedText] = useState('');
  const [dislikedText, setDislikedText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentProperty = properties.find((p) => p.id === selectedPropertyId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lovedText.trim()) return;

    const overall = parseFloat(
      (
        (lightRating + waterRating + securityRating + drainageRating + hostRating + valueRating) /
        6
      ).toFixed(1)
    );

    const newReview: Review = {
      id: `rev-guest-${Date.now()}`,
      propertyId: selectedPropertyId,
      userId: `guest-${Date.now()}`,
      authorName: isAnonymous
        ? 'Verified Community Guest'
        : authorName.trim() || 'Uyo Space Reviewer',
      authorAvatar: isAnonymous
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      authorBadge: 'verified_tenant',
      authorTenancyTime: `${usageType} • ${duration}`,
      datePosted: 'Just now',
      overallRating: overall,
      isGuestReview: true,
      spaceUsageType: usageType,
      ratings: {
        water: waterRating,
        light: lightRating,
        security: securityRating,
        drainage: drainageRating,
        neighbours: 4,
        landlord: hostRating,
        valueForMoney: valueRating,
        agentHonesty: hostRating,
      },
      summaryLoved: lovedText,
      summaryDisliked:
        dislikedText.trim() || 'No major issues experienced during stay.',
      photos: [],
      facts: {
        rentPaidNaira: currentProperty?.currentRentNaira || 0,
        rentPeriod: currentProperty?.rentPeriod || 'Per Year',
        tenancyDuration: duration,
        agentFeePaidNaira: 0,
        cautionFeePaidNaira: 0,
        agreementFeePaidNaira: 0,
        rentIncreasedDuringStay: false,
        depositReturned: true,
        wouldRentAgain: true,
        recommendToFriend: true,
        waterSource: currentProperty?.waterReliability || 'Borehole',
        powerPrepaidMeter: true,
      },
      likesCount: 1,
      commentsCount: 0,
    };

    onSaveReview(newReview);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  const renderStarInput = (val: number, setVal: (n: number) => void) => (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setVal(star)}
          className="p-1 hover:scale-110 transition-transform cursor-pointer"
        >
          <Star
            className={`w-5 h-5 ${
              star <= val
                ? 'text-[#F3CD6D] fill-[#F3CD6D]'
                : 'text-gray-300 stroke-gray-400'
            }`}
          />
        </button>
      ))}
      <span className="text-xs font-bold text-[#8B9A6E] ml-1">{val}.0</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-[#F7F2EB] rounded-3xl shadow-2xl border border-[#EAE2D6] overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#2F3626] text-[#F7F2EB] p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#8B9A6E] flex items-center justify-center text-white shadow-md">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-lg text-white">
                  Drop a Community Review
                </h3>
                <span className="bg-[#8B9A6E]/30 text-[#A7B68B] px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide">
                  Open Guest Access
                </span>
              </div>
              <p className="text-xs text-[#EAE2D6]/70">
                Share your honest experience to guide others in Uyo. No login required.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#8B9A6E] text-white flex items-center justify-center mx-auto shadow-md animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-heading font-bold text-lg text-[#2F3626]">
              Review Submitted Successfully!
            </h4>
            <p className="text-xs text-[#2F3626]/75 max-w-sm mx-auto">
              Thank you for sharing your genuine experience. Your review is now live for all prospective renters in Akwa Ibom.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            {/* Space Picker */}
            <div>
              <label className="block text-xs font-bold text-[#2F3626] mb-1.5">
                Select Space / Property Reviewed
              </label>
              <select
                value={selectedPropertyId}
                onChange={(e) => setSelectedPropertyId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#D8CEBE] text-xs font-medium focus:ring-2 focus:ring-[#8B9A6E] outline-none"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    [{p.spaceCategory || 'Apartment'}] {p.title} ({p.area})
                  </option>
                ))}
              </select>
            </div>

            {/* Reviewer Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#2F3626] mb-1">
                  Your Name / Nickname
                </label>
                <input
                  type="text"
                  placeholder="e.g. Edidiong or Adaeze"
                  value={authorName}
                  disabled={isAnonymous}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8CEBE] text-xs outline-none focus:ring-2 focus:ring-[#8B9A6E] disabled:bg-gray-100"
                />
                <label className="flex items-center gap-1.5 mt-1 text-[11px] text-[#2F3626]/75 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="accent-[#8B9A6E] rounded"
                  />
                  <span>Post anonymously (hide my name)</span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2F3626] mb-1">
                  Space Usage / Relationship
                </label>
                <select
                  value={usageType}
                  onChange={(e) => setUsageType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-[#D8CEBE] text-xs outline-none focus:ring-2 focus:ring-[#8B9A6E]"
                >
                  <option value="Rented Apartment / Flat">Rented Apartment / Flat</option>
                  <option value="Rented Store / Retail Shop">Rented Store / Retail Shop</option>
                  <option value="Rented Student Room / Lodge">Rented Student Room / Lodge</option>
                  <option value="Booked Event Hall / Venue">Booked Event Hall / Venue</option>
                  <option value="Rented Office Suite">Rented Office Suite</option>
                  <option value="Inspected Space (Did Not Take)">Inspected Space (Did Not Take)</option>
                </select>
              </div>
            </div>

            {/* 6 Core Experience Ratings */}
            <div className="bg-white p-4 rounded-2xl border border-[#EAE2D6] space-y-2.5">
              <span className="text-xs font-bold text-[#2F3626] block">
                Rate Core Features (1-5 Stars)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#2F3626]/80">Power & Light:</span>
                  {renderStarInput(lightRating, setLightRating)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2F3626]/80">Water / Cleanliness:</span>
                  {renderStarInput(waterRating, setWaterRating)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2F3626]/80">Security & Gate:</span>
                  {renderStarInput(securityRating, setSecurityRating)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2F3626]/80">Road & Drainage:</span>
                  {renderStarInput(drainageRating, setDrainageRating)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2F3626]/80">Host / Landlord Honesty:</span>
                  {renderStarInput(hostRating, setHostRating)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#2F3626]/80">Value for Money:</span>
                  {renderStarInput(valueRating, setValueRating)}
                </div>
              </div>
            </div>

            {/* What you Loved */}
            <div>
              <label className="block text-xs font-bold text-[#2F3626] mb-1">
                What did you LOVE about this space? *
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Constant power generator, clean borehole water, high customer foot-traffic, landlord is honest and helpful..."
                value={lovedText}
                onChange={(e) => setLovedText(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#D8CEBE] text-xs focus:ring-2 focus:ring-[#8B9A6E] outline-none"
              />
            </div>

            {/* What you Disliked / Warnings */}
            <div>
              <label className="block text-xs font-bold text-[#2F3626] mb-1">
                Any DISLIKES or warnings for future renters? (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Flooding when rain falls heavily, noisy generator at night, street parking issues..."
                value={dislikedText}
                onChange={(e) => setDislikedText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white border border-[#D8CEBE] text-xs focus:ring-2 focus:ring-[#8B9A6E] outline-none"
              />
            </div>

            {/* Notice */}
            <div className="p-3 rounded-2xl bg-[#8B9A6E]/10 border border-[#8B9A6E]/30 text-[11px] text-[#2F3626] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8B9A6E] shrink-0 mt-0.5" />
              <span>
                <strong>Open Community Shield:</strong> Your review helps protect Akwa Ibom residents from bad rentals and unfair conditions. We enforce zero defamation and strictly honest experiences.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-sm shadow-md transition-all active:scale-98 cursor-pointer"
            >
              Post Community Review (Instant Publish)
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
