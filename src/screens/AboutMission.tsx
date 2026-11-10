import React from 'react';
import { ShieldCheck, Heart, Users, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

interface AboutMissionProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const AboutMission: React.FC<AboutMissionProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B9A6E]/15 text-[#6D7C52] text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Born in Uyo, Akwa Ibom</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
            Ending Rental Heartbreak in Akwa Ibom State
          </h1>
          <p className="text-sm text-[#2F3626]/80 leading-relaxed">
            Every year, thousands of students at UNIUYO and AKSU, newly posted nurses, doctors, civil servants, and young families in Uyo fall victim to rental fraud.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4 text-xs sm:text-sm text-[#2F3626]/85 leading-relaxed">
          <h2 className="font-heading font-bold text-xl text-[#2F3626]">
            The Missing Shared Memory
          </h2>
          <p>
            When a tenant packs their bags and leaves a house in Shelter Afrique or Ikot Ekpene Road, everything they discovered disappears with them: the fact that the compound floods knee-high in August, that the borehole water turns brownish after 3 days of rain, or that the landlord withholds the ₦50,000 caution deposit on frivolous claims.
          </p>
          <p>
            The next week, an agent brings a fresh house hunter, demands a ₦3,000 non-refundable inspection fee, shows sunny photos taken in January harmattan, and the cycle repeats.
          </p>
          <div className="p-4 rounded-2xl bg-[#F7F2EB] border-l-4 border-[#8B9A6E] font-medium text-[#2F3626] italic">
            "RentTruth AKS is the shared memory for Akwa Ibom rentals. We believe the outgoing tenant is the only unbiased source of truth."
          </div>
        </div>

        {/* Our 4 Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-2">
            <span className="text-2xl">🛡️</span>
            <h3 className="font-heading font-bold text-base text-[#2F3626]">No Paywalls on Truth</h3>
            <p className="text-xs text-[#2F3626]/75 leading-relaxed">
              Anyone can search, check scam reports, and read full reviews for free. Good housing information is a community safety right.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-2">
            <span className="text-2xl">📸</span>
            <h3 className="font-heading font-bold text-base text-[#2F3626]">Photo Proof Over Hearsay</h3>
            <p className="text-xs text-[#2F3626]/75 leading-relaxed">
              Every critical claim (flooding, water clarity, ceiling cracks) must be accompanied by timestamped photographs taken at the property.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-2">
            <span className="text-2xl">⚖️</span>
            <h3 className="font-heading font-bold text-base text-[#2F3626]">Right of Reply for Landlords</h3>
            <p className="text-xs text-[#2F3626]/75 leading-relaxed">
              We are fair to honest property owners. Landlords can verify their ownership, reply publicly, and show verified repairs.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-2">
            <span className="text-2xl">🤝</span>
            <h3 className="font-heading font-bold text-base text-[#2F3626]">Rewarding the Contributors</h3>
            <p className="text-xs text-[#2F3626]/75 leading-relaxed">
              Tenants who take the time to document their previous houses are rewarded with community points and airtime recharge cards.
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="bg-[#EAE2D6] rounded-3xl p-6 border border-[#D8CEBE] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-heading font-bold text-lg text-[#2F3626]">Join the Uyo Movement</h4>
            <p className="text-xs text-[#2F3626]/70">Help protect your fellow citizens from rental deception.</p>
          </div>
          <button
            onClick={() => onNavigate('post_review')}
            className="px-6 py-3 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-xs shadow-md transition-all whitespace-nowrap"
          >
            Post a Move-Out Review →
          </button>
        </div>

      </div>
    </div>
  );
};
