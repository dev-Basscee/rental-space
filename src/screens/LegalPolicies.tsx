import React, { useState } from 'react';
import { ShieldCheck, BookOpen, Lock, Scale, AlertCircle } from 'lucide-react';

interface LegalPoliciesProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const LegalPolicies: React.FC<LegalPoliciesProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'guidelines' | 'terms' | 'privacy'>('guidelines');

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
            Legal & Trust Framework
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
            Community Guidelines & Legal Policies
          </h1>
          <p className="text-xs sm:text-sm text-[#2F3626]/75">
            Designed in accordance with Nigerian law and the Nigeria Data Protection Act (NDPA) 2023.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-2 border-b border-[#EAE2D6] pb-2">
          <button
            onClick={() => setActiveTab('guidelines')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'guidelines'
                ? 'bg-[#8B9A6E] text-white shadow-sm'
                : 'bg-white text-[#2F3626] hover:bg-[#EAE2D6]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Community Guidelines</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-[#8B9A6E] text-white shadow-sm'
                : 'bg-white text-[#2F3626] hover:bg-[#EAE2D6]'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>Terms of Service</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-[#8B9A6E] text-white shadow-sm'
                : 'bg-white text-[#2F3626] hover:bg-[#EAE2D6]'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Privacy & NDPA Policy</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-5 text-xs sm:text-sm text-[#2F3626]/85 leading-relaxed">
          {activeTab === 'guidelines' && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-[#2F3626]">
                1. Community Review Standards
              </h2>
              <p>
                RentTruth AKS exists to protect housing seekers and reward honest landlords. To maintain absolute credibility:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Only Review Where You Actually Lived:</strong> Never submit reviews on behalf of other people or for houses you only visited for 5 minutes during an inspection.
                </li>
                <li>
                  <strong>Do Not Photograph People's Faces or Vehicle Plates:</strong> When uploading photos of the compound or street, make sure no human faces, minors, or car registration numbers are visible.
                </li>
                <li>
                  <strong>Stick to Factual Evidence:</strong> Describe your lived experience ("The roof leaked during heavy July rain over bedroom 1", "Caution fee of ₦40,000 was withheld"). Avoid unverified criminal allegations.
                </li>
                <li>
                  <strong>No Slander or Retaliation:</strong> Rival agents found submitting malicious fake reviews on another agent’s properties will be permanently banned and referred to local estate associations.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-[#2F3626]">
                2. Terms of Use & Defamation Shield
              </h2>
              <p>
                By using RentTruth AKS, you acknowledge that all reviews reflect the personal, factual experiences of individual contributors.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Platform as an Intermediary:</strong> RentTruth AKS acts as a neutral technology host under Nigerian communications regulations. The platform does not author user opinions.
                </li>
                <li>
                  <strong>Right of Reply:</strong> Any landlord, property owner, or registered agent has the guaranteed free right to submit a formal response that will appear directly beneath the review.
                </li>
                <li>
                  <strong>Takedown Procedure:</strong> If any review contains demonstrably fabricated photographic evidence, an expedited 48-hour administrative dispute process is available for resolution.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-xl text-[#2F3626]">
                3. Privacy & NDPA 2023 Compliance
              </h2>
              <p>
                We value your safety. We recognize that tenants in Nigeria may fear landlord harassment:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>Pseudonymous Display Names:</strong> When posting a move-out review, you can choose to display an alias (e.g., "Outgoing Tenant, Shelter Afrique"). Only system administrators verify your tenancy proof.
                </li>
                <li>
                  <strong>Masked Phone Numbers:</strong> User phone numbers are never publicly broadcasted in reviews. Scam Check searches can verify phone numbers without disclosing personal directory data.
                </li>
                <li>
                  <strong>Data Minimization:</strong> Uploaded utility bills and tenancy receipts are stored in encrypted cloud vaults and deleted once your "Verified Tenant" badge is approved.
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
