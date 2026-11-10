import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Upload,
  Building,
  User,
  Award,
  ChevronLeft,
  ArrowRight,
  FileText
} from 'lucide-react';

interface VerificationCentreProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const VerificationCentre: React.FC<VerificationCentreProps> = ({ onNavigate }) => {
  const [selectedBadge, setSelectedBadge] = useState<'tenant' | 'agent' | 'landlord'>('agent');
  const [cacNumber, setCacNumber] = useState('BN-3920194');
  const [officeAddress, setOfficeAddress] = useState('Suite 4, Ibom Plaza Commercial Block, Uyo');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('profile')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#8B9A6E] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Profile</span>
        </button>

        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
            Trust & Credibility System
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
            Verification Centre
          </h1>
          <p className="text-xs sm:text-sm text-[#2F3626]/75">
            Earn the official badge to gain tenant trust, get featured in searches, and combat fake agents in Uyo.
          </p>
        </div>

        {/* 3 Badge Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            onClick={() => setSelectedBadge('tenant')}
            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
              selectedBadge === 'tenant'
                ? 'border-[#8B9A6E] bg-white shadow-md'
                : 'border-[#EAE2D6] bg-[#F7F2EB] hover:bg-white'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#8B9A6E]/15 text-[#8B9A6E] flex items-center justify-center mb-3">
              <User className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#2F3626]">
              Verified Tenant
            </h3>
            <p className="text-xs text-[#2F3626]/70 mt-1 leading-relaxed">
              Earned by uploading geotagged photos or rent receipts with your move-out review.
            </p>
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#8B9A6E]/15 text-[#6D7C52] text-[10px] font-bold mt-3">
              Free • Auto-Verified
            </span>
          </div>

          <div
            onClick={() => setSelectedBadge('agent')}
            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
              selectedBadge === 'agent'
                ? 'border-[#8B9A6E] bg-white shadow-md'
                : 'border-[#EAE2D6] bg-[#F7F2EB] hover:bg-white'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#8B9A6E]/15 text-[#8B9A6E] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#2F3626]">
              Verified Agent
            </h3>
            <p className="text-xs text-[#2F3626]/70 mt-1 leading-relaxed">
              For licensed practitioners with physical offices in Uyo and NIN / CAC registration.
            </p>
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#8B9A6E] text-white text-[10px] font-bold mt-3">
              Audited Badge
            </span>
          </div>

          <div
            onClick={() => setSelectedBadge('landlord')}
            className={`p-5 rounded-3xl border-2 transition-all cursor-pointer ${
              selectedBadge === 'landlord'
                ? 'border-[#8B9A6E] bg-white shadow-md'
                : 'border-[#EAE2D6] bg-[#F7F2EB] hover:bg-white'
            }`}
          >
            <div className="w-10 h-10 rounded-2xl bg-[#8B9A6E]/15 text-[#8B9A6E] flex items-center justify-center mb-3">
              <Building className="w-5 h-5" />
            </div>
            <h3 className="font-heading font-bold text-base text-[#2F3626]">
              Verified Landlord
            </h3>
            <p className="text-xs text-[#2F3626]/70 mt-1 leading-relaxed">
              For building owners. Unlocks official Right of Reply and vacancy listings.
            </p>
            <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#8B9A6E]/15 text-[#6D7C52] text-[10px] font-bold mt-3">
              Title / Deed Checked
            </span>
          </div>
        </div>

        {/* Verification Form Body */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
          {submitted ? (
            <div className="p-6 rounded-2xl bg-[#F2F6ED] border border-[#8B9A6E] text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#8B9A6E] mx-auto" />
              <h3 className="font-heading font-bold text-xl text-[#2F3626]">
                Application Under Physical Verification
              </h3>
              <p className="text-xs text-[#2F3626]/80 max-w-md mx-auto leading-relaxed">
                Our Uyo field ambassador will schedule a physical inspection of your office address within 48 hours to confirm credentials.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 text-xs"
            >
              <h2 className="font-heading font-bold text-lg text-[#2F3626]">
                Apply for {selectedBadge === 'agent' ? 'Verified Agent' : selectedBadge === 'landlord' ? 'Verified Landlord' : 'Verified Tenant'} Badge
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1 text-[#2F3626]">
                    CAC Registration Number or NIN
                  </label>
                  <input
                    type="text"
                    value={cacNumber}
                    onChange={(e) => setCacNumber(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-mono text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold block mb-1 text-[#2F3626]">
                    Physical Office / Business Address in Uyo
                  </label>
                  <input
                    type="text"
                    value={officeAddress}
                    onChange={(e) => setOfficeAddress(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                    required
                  />
                </div>
              </div>

              {/* Document upload tile */}
              <div className="p-5 rounded-2xl border-2 border-dashed border-[#8B9A6E] bg-[#F7F2EB] text-center space-y-2 cursor-pointer">
                <Upload className="w-6 h-6 text-[#8B9A6E] mx-auto" />
                <span className="font-bold text-xs text-[#2F3626] block">
                  Upload Government ID (NIN Slip, Driver's License or Passport)
                </span>
                <span className="text-[11px] text-[#2F3626]/60">
                  Attached: nin_slip_verified.pdf (1.2 MB)
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#EAE2D6]/40 text-xs text-[#2F3626]/80 space-y-1">
                <span className="font-bold text-[#2F3626]">Verification Guarantee:</span>
                <p>
                  No agent or landlord can ever pay to delete or alter an honest move-out review. Verification only certifies your physical identity, valid title, and compliance with ethical fee norms.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-sm shadow transition-all cursor-pointer"
              >
                Submit Application for Audit
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
