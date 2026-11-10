import React from 'react';
import {
  ChevronLeft,
  CheckCircle2,
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Building,
  Calendar,
  MessageSquare,
  Award
} from 'lucide-react';
import { MOCK_AGENTS, MOCK_PROPERTIES } from '../data/mockData';
import { StarRating3D } from '../components/StarRating3D';

interface AgentLandlordProfileProps {
  agentId?: string;
  onNavigate: (screen: string, param?: string) => void;
  onOpenGuestModal: () => void;
  isLoggedIn: boolean;
}

export const AgentLandlordProfile: React.FC<AgentLandlordProfileProps> = ({
  agentId = 'agent-1',
  onNavigate,
  onOpenGuestModal,
  isLoggedIn,
}) => {
  const agent = MOCK_AGENTS.find((a) => a.id === agentId) || MOCK_AGENTS[0];
  const listings = MOCK_PROPERTIES.slice(0, 2);

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('feed')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#8B9A6E] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Feed</span>
        </button>

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#8B9A6E] shadow-sm"
              />
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                    {agent.name}
                  </h1>
                  <span className="px-2.5 py-1 rounded-xl bg-[#8B9A6E] text-white text-xs font-bold flex items-center gap-1 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Agent</span>
                  </span>
                </div>
                <p className="text-xs text-[#2F3626]/70 mt-0.5 font-medium">
                  {agent.agencyName} • {agent.officeAddress}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <StarRating3D value={agent.rating} readonly size="sm" showScore />
                  <span className="text-xs text-[#2F3626]/60 font-medium">
                    ({agent.totalReviews} tenant reviews)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (!isLoggedIn) onOpenGuestModal();
                else onNavigate('chat_thread');
              }}
              className="px-5 py-3 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact Verified Agent</span>
            </button>
          </div>

          {/* Bio */}
          <p className="text-xs sm:text-sm text-[#2F3626]/80 leading-relaxed bg-[#F7F2EB] p-4 rounded-2xl border border-[#EAE2D6]">
            {agent.bio}
          </p>

          {/* Trust Matrix Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-2">
            <div className="p-3 bg-[#EAE2D6]/40 rounded-2xl border border-[#EAE2D6]">
              <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Deals Closed</span>
              <span className="font-bold text-[#2F3626] text-sm">{agent.dealsCompleted} Leases</span>
            </div>
            <div className="p-3 bg-[#EAE2D6]/40 rounded-2xl border border-[#EAE2D6]">
              <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Scam Reports</span>
              <span className="font-bold text-[#8B9A6E] text-sm">0 Reports (Clean)</span>
            </div>
            <div className="p-3 bg-[#EAE2D6]/40 rounded-2xl border border-[#EAE2D6]">
              <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Response Rate</span>
              <span className="font-bold text-[#2F3626] text-sm">{agent.responseRate}</span>
            </div>
            <div className="p-3 bg-[#EAE2D6]/40 rounded-2xl border border-[#EAE2D6]">
              <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Inspection Fee</span>
              <span className="font-bold text-[#8B9A6E] text-sm">₦0 (Strict Policy)</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="font-semibold text-[#2F3626]/70">Verified Areas Covered:</span>
            {agent.areasCovered.map((area) => (
              <span
                key={area}
                className="px-2.5 py-1 rounded-xl bg-[#EAE2D6] text-[#2F3626] font-semibold text-[11px]"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Managed & Linked Properties */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-xl text-[#2F3626]">
              Current Listings with Verified Reviews ({listings.length})
            </h2>
            <span className="text-xs text-[#2F3626]/60">Physical Keys Verified</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {listings.map((prop) => (
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
                  <div className="absolute bottom-2 left-2 bg-white/90 px-2.5 py-1 rounded-xl text-xs font-bold text-[#2F3626]">
                    ₦{(prop.currentRentNaira / 1000).toFixed(0)}k/yr
                  </div>
                </div>
                <div className="p-4 space-y-1">
                  <h4 className="font-heading font-bold text-sm text-[#2F3626] line-clamp-1">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-[#2F3626]/70 line-clamp-1">{prop.address}</p>
                  <div className="flex items-center justify-between pt-2 text-xs">
                    <span className="font-bold text-[#8B9A6E]">⭐ {prop.averageRating}</span>
                    <span className="text-[#8B9A6E] font-semibold">View Reviews →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
