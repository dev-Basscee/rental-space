import React, { useState } from 'react';
import {
  Building,
  CheckCircle2,
  MessageSquare,
  Eye,
  Star,
  Wrench,
  AlertTriangle,
  ChevronLeft,
  Send,
  Plus
} from 'lucide-react';
import { MOCK_PROPERTIES, MOCK_REVIEWS } from '../data/mockData';

interface LandlordDashboardProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const LandlordDashboard: React.FC<LandlordDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reply_tool'>('overview');
  const [isVacant, setIsVacant] = useState(true);
  const [replyText, setReplyText] = useState(
    'Thank you for staying with us. We have cleared the compound gutter and sealed the bedroom ceiling as of this month.'
  );
  const [fixTag, setFixTag] = useState('Roof leak repaired & drain cleared');
  const [replySaved, setReplySaved] = useState(false);

  const property = MOCK_PROPERTIES[0];
  const reviews = MOCK_REVIEWS.filter((r) => r.propertyId === property.id);

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    setReplySaved(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#8B9A6E] text-white text-[10px] font-bold">
                Elder Okon Asuquo (Landlord)
              </span>
              <span className="text-xs text-[#2F3626]/60">Verified Landlord Portal</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2F3626] mt-1">
              Property Management Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview' ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
              }`}
            >
              30. Dashboard
            </button>
            <button
              onClick={() => setActiveTab('reply_tool')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'reply_tool' ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
              }`}
            >
              31. Reply Tool
            </button>
          </div>
        </div>

        {/* ---------------- SCREEN 30: OVERVIEW & PROPERTY STATS ---------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Metric Strips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 bg-white rounded-3xl border border-[#EAE2D6] shadow-sm">
                <span className="text-xs text-[#2F3626]/70 font-semibold block">Average Score</span>
                <span className="font-heading font-black text-2xl text-[#8B9A6E]">4.2 / 5</span>
                <span className="text-[10px] text-[#2F3626]/50">4 tenant reviews</span>
              </div>
              <div className="p-4 bg-white rounded-3xl border border-[#EAE2D6] shadow-sm">
                <span className="text-xs text-[#2F3626]/70 font-semibold block">Profile Views</span>
                <span className="font-heading font-black text-2xl text-[#2F3626]">1,482</span>
                <span className="text-[10px] text-[#8B9A6E] font-bold">+18% this month</span>
              </div>
              <div className="p-4 bg-white rounded-3xl border border-[#EAE2D6] shadow-sm">
                <span className="text-xs text-[#2F3626]/70 font-semibold block">Direct Enquiries</span>
                <span className="font-heading font-black text-2xl text-[#2F3626]">36</span>
                <span className="text-[10px] text-[#2F3626]/50">Via chat inbox</span>
              </div>
              <div className="p-4 bg-white rounded-3xl border border-[#EAE2D6] shadow-sm">
                <span className="text-xs text-[#2F3626]/70 font-semibold block">Scam Reports</span>
                <span className="font-heading font-black text-2xl text-[#8B9A6E]">0</span>
                <span className="text-[10px] text-[#8B9A6E] font-bold">100% Clean Title</span>
              </div>
            </div>

            {/* Managed Flat Card with Vacancy Switch */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#2F3626]">
                    {property.title}
                  </h3>
                  <p className="text-xs text-[#2F3626]/70">{property.address}</p>
                </div>

                {/* Vacancy toggle */}
                <div className="flex items-center gap-2 bg-[#F7F2EB] p-2 px-3 rounded-2xl border border-[#D8CEBE]">
                  <span className="text-xs font-semibold text-[#2F3626]">
                    Vacancy Status:
                  </span>
                  <button
                    onClick={() => setIsVacant(!isVacant)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      isVacant
                        ? 'bg-[#8B9A6E] text-white shadow-xs'
                        : 'bg-[#EAE2D6] text-[#2F3626]'
                    }`}
                  >
                    {isVacant ? '● Room Vacant' : '○ Fully Occupied'}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#F7F2EB] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-[#2F3626] block">
                    Current Listed Rent: ₦{(property.currentRentNaira / 1000).toFixed(0)}k/year
                  </span>
                  <span className="text-[#2F3626]/60">
                    Includes 24/7 borehole pumping and dedicated compound night vigilante.
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('reply_tool')}
                  className="px-4 py-2 rounded-xl bg-[#8B9A6E] text-white font-bold hover:bg-[#6D7C52] transition-colors whitespace-nowrap"
                >
                  Reply to Latest Review →
                </button>
              </div>
            </div>

            {/* Reviews Needing Attention */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#2F3626]">
                Incoming Tenant Reviews
              </h3>
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#2F3626]">{rev.authorName}</span>
                    <span className="text-[#8B9A6E] font-bold">⭐ {rev.overallRating}</span>
                  </div>
                  <p className="text-[#2F3626]/80">{rev.summaryLoved}</p>
                  <p className="text-[#C4684A] font-medium">Issue noted: {rev.summaryDisliked}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- SCREEN 31: RIGHT OF REPLY SCREEN ---------------- */}
        {activeTab === 'reply_tool' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider font-mono">
                SCREEN 31: OFFICIAL RIGHT OF REPLY
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                Reply to Review by Chioma Nwachukwu
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                Your reply will appear with a verified green landlord badge directly underneath the review.
              </p>
            </div>

            {replySaved ? (
              <div className="p-6 rounded-2xl bg-[#F2F6ED] border border-[#8B9A6E] text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#8B9A6E] mx-auto" />
                <h3 className="font-bold text-lg text-[#2F3626]">Official Response Published!</h3>
                <p className="text-xs text-[#2F3626]/80">
                  Your reply and the tag <strong>"{fixTag}"</strong> are now visible to prospective tenants on the property page.
                </p>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="px-6 py-2.5 rounded-xl bg-[#8B9A6E] text-white font-bold text-xs"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <form onSubmit={handlePostReply} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold block mb-1 text-[#2F3626]">
                    Issue Resolution Tag (Shows in Green)
                  </label>
                  <input
                    type="text"
                    value={fixTag}
                    onChange={(e) => setFixTag(e.target.value)}
                    placeholder="e.g. Roof leak repaired Dec 2025 or Separate meter installed"
                    className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-bold text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-[#2F3626]">
                    Your Response Message
                  </label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                    required
                  />
                </div>

                <div className="p-4 rounded-2xl bg-[#EAE2D6]/40 text-xs text-[#2F3626]/80">
                  Fairness Rule: Landlord replies cannot dispute photographic facts without providing counter-photos. Respectful dialogue maintains high property trust scores.
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-xs shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Official Landlord Response</span>
                </button>
              </form>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
