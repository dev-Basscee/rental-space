import React from 'react';
import {
  ShieldCheck,
  Camera,
  Search,
  CheckCircle2,
  Lock,
  Award,
  ArrowRight,
  Gift
} from 'lucide-react';

interface HowItWorksProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
            Platform Architecture
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
            How RentTruth AKS Works
          </h1>
          <p className="text-xs sm:text-sm text-[#2F3626]/75 max-w-lg mx-auto">
            A closed-loop community trust system that turns outgoing tenant experiences into permanent shared memory for Uyo.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="space-y-6">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#8B9A6E]/15 border border-[#8B9A6E]/30 flex items-center justify-center text-3xl shrink-0">
              🔍
            </div>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-bold font-mono text-[#8B9A6E]">PHASE 1: HOUSE HUNTER</span>
              <h2 className="font-heading font-bold text-xl text-[#2F3626]">
                Check Before You Pay Any Inspection Fee
              </h2>
              <p className="text-xs sm:text-sm text-[#2F3626]/80 leading-relaxed">
                Before paying any agent or committing to a compound, search the house address or the agent's phone on RentTruth AKS. You will see unedited move-out photos taken by actual tenants who slept in the rooms.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2F3626]/80 pt-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" />
                  <span>Verify borehole water clarity</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" />
                  <span>Inspect ceiling leak history</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" />
                  <span>July/August rainy season flooding status</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" />
                  <span>Landlord caution fee return honesty</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#EAE2D6] border border-[#D8CEBE] flex items-center justify-center text-3xl shrink-0">
              📸
            </div>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-bold font-mono text-[#8B9A6E]">PHASE 2: OUTGOING TENANT</span>
              <h2 className="font-heading font-bold text-xl text-[#2F3626]">
                3-Minute Move-Out Review Flow
              </h2>
              <p className="text-xs sm:text-sm text-[#2F3626]/80 leading-relaxed">
                As you pack your bags to leave, follow our guided photo checklist: snap the compound gate, water meter, kitchen, bathroom, and front street. Add your rent facts, and record an optional 30-second voice note.
              </p>
              <div className="p-3 bg-[#F7F2EB] rounded-2xl border border-[#EAE2D6] text-xs flex items-center justify-between">
                <span className="font-semibold text-[#8B9A6E] flex items-center gap-1.5">
                  <Gift className="w-4 h-4" /> Earn 150 Community Points
                </span>
                <span className="text-[11px] text-[#2F3626]/70">Redeemable for MTN / Airtel / Glo Airtime</span>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm flex flex-col md:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-[#C4684A]/15 border border-[#C4684A]/30 flex items-center justify-center text-3xl shrink-0">
              🛡️
            </div>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-bold font-mono text-[#C4684A]">PHASE 3: COMMUNITY SAFETY</span>
              <h2 className="font-heading font-bold text-xl text-[#2F3626]">
                Automated Verification & Fraud Blacklist
              </h2>
              <p className="text-xs sm:text-sm text-[#2F3626]/80 leading-relaxed">
                Photos are timestamped and geotagged. Suspicious or duplicate images are flagged. When scammers try double-letting or fake adverts, multiple reports automatically place a public warning banner on their phone number.
              </p>
              <div className="text-xs text-[#2F3626]/75">
                Landlords and honest agents are granted an official Right of Reply so improvements (e.g., roof repairs, new borehole) are reflected live on the property page.
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="text-center pt-2">
          <button
            onClick={() => onNavigate('feed')}
            className="px-8 py-4 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-heading font-bold text-base shadow-lg transition-all"
          >
            Start Exploring Reviews →
          </button>
        </div>

      </div>
    </div>
  );
};
