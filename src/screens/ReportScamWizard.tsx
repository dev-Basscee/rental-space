import React, { useState } from 'react';
import {
  ShieldAlert,
  ChevronLeft,
  AlertTriangle,
  Upload,
  CheckCircle2,
  Phone,
  MapPin,
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface ReportScamWizardProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const ReportScamWizard: React.FC<ReportScamWizardProps> = ({ onNavigate }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [scamType, setScamType] = useState('Collected money & vanished');
  const [suspectName, setSuspectName] = useState('');
  const [suspectPhone, setSuspectPhone] = useState('');
  const [propertyAddress, setPropertyAddress] = useState('');
  const [amountLost, setAmountLost] = useState<number>(50000);
  const [description, setDescription] = useState('');
  const [evidenceUploaded, setEvidenceUploaded] = useState(true);

  const scamTypes = [
    'Collected money & vanished',
    'Double letting / multiple tenants',
    'What I ordered vs what I got misrepresentation',
    'Fake property listing',
    'Excessive illegal inspection fee extortion',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3); // confirmation
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Back Link */}
        <button
          onClick={() => onNavigate('scam_check')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#8B9A6E] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Scam Check</span>
        </button>

        {/* Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C4684A]/10 text-[#C4684A] text-xs font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Community Defense Registry</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2F3626]">
            Report a Rental Scam in Uyo
          </h1>
          <p className="text-xs sm:text-sm text-[#2F3626]/75">
            Help alert others. Every report is investigated by our moderation team before public blacklisting.
          </p>
        </div>

        {/* STEP 1 & 2 FORMS */}
        {step < 3 ? (
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-5">
            {/* Scam Category */}
            <div>
              <label className="text-xs font-bold text-[#2F3626] block mb-1">
                Type of Scam Encountered
              </label>
              <select
                value={scamType}
                onChange={(e) => setScamType(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              >
                {scamTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Suspect Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">
                  Suspect Name / Agency
                </label>
                <input
                  type="text"
                  placeholder="e.g. Agent Francis Udeme"
                  value={suspectName}
                  onChange={(e) => setSuspectName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  required
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">
                  Suspect Nigerian Phone
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0802 341 9912"
                  value={suspectPhone}
                  onChange={(e) => setSuspectPhone(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-mono text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  required
                />
              </div>
            </div>

            {/* Property Address & Amount Lost */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">
                  Property Address in Uyo
                </label>
                <input
                  type="text"
                  placeholder="e.g. 45 Aka Road, near AKBC"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  required
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">
                  Amount Extorted / Lost (₦)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  value={amountLost}
                  onChange={(e) => setAmountLost(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-mono font-bold text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  required
                />
              </div>
            </div>

            {/* Narrative description */}
            <div className="text-xs space-y-1">
              <label className="font-bold block text-[#2F3626]">
                What Happened? (Provide chronological facts)
              </label>
              <textarea
                rows={4}
                placeholder="Explain what the agent promised, how money was paid (OPay/Kuda/Bank), and what happened after..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                required
              />
            </div>

            {/* Proof Upload */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-[#D8CEBE] bg-[#F7F2EB] text-center space-y-2 cursor-pointer hover:border-[#C4684A]">
              <Upload className="w-6 h-6 text-[#C4684A] mx-auto" />
              <p className="text-xs font-bold text-[#2F3626]">
                Attach Bank Transfer Receipt or WhatsApp Chat Screenshots
              </p>
              <p className="text-[11px] text-[#2F3626]/60">
                1 file attached: transfer_receipt_opay.png (340 KB)
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-[#C4684A] hover:bg-[#B3583C] text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Submit Scam Report for Moderation</span>
            </button>
          </form>
        ) : (
          /* STEP 3: CONFIRMATION */
          <div className="bg-white rounded-3xl p-8 border border-[#EAE2D6] shadow-xl text-center space-y-5 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-[#8B9A6E]/15 text-[#8B9A6E] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#8B9A6E]/15 text-[#6D7C52] text-xs font-bold">
                REPORT LOGGED #AKS-SCAM-982
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                Report Submitted for Review
              </h2>
              <p className="text-xs text-[#2F3626]/80 max-w-md mx-auto leading-relaxed">
                Thank you for protecting Uyo home hunters. Once two verified reports or conclusive evidence is vetted by our legal team, this contact will show a warning in Scam Check.
              </p>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={() => onNavigate('scam_check')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-all"
              >
                Back to Scam Check
              </button>
              <button
                onClick={() => onNavigate('feed')}
                className="px-6 py-3 rounded-2xl bg-[#EAE2D6] text-[#2F3626] font-bold text-xs hover:bg-[#D8CEBE] transition-all"
              >
                Go to Home Feed
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
