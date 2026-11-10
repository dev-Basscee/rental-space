import React from 'react';
import {
  ChevronLeft,
  ShieldAlert,
  AlertTriangle,
  MapPin,
  Phone,
  Calendar,
  FileText,
  Share2,
  CheckCircle2
} from 'lucide-react';
import { MOCK_SCAM_REPORTS } from '../data/mockData';

interface ScamReportDetailProps {
  scamId?: string;
  onNavigate: (screen: string, param?: string) => void;
}

export const ScamReportDetail: React.FC<ScamReportDetailProps> = ({
  scamId = 'scam-1',
  onNavigate,
}) => {
  const report =
    MOCK_SCAM_REPORTS.find((s) => s.id === scamId) || MOCK_SCAM_REPORTS[0];

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        
        {/* Back link */}
        <button
          onClick={() => onNavigate('scam_check')}
          className="flex items-center gap-1.5 text-xs font-bold text-[#8B9A6E] hover:underline"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Scam Check</span>
        </button>

        {/* Case File Header Card */}
        <div className="bg-[#FFF8F6] rounded-3xl p-6 border-2 border-[#C4684A] shadow-md space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#C4684A] text-white text-xs font-bold uppercase tracking-wider">
                COMMUNITY FRAUD CASE #{report.id.toUpperCase()}
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                {report.reportedName}
              </h1>
              <p className="text-xs text-[#C4684A] font-semibold">
                Status: Verified Warning • Reported by {report.reportCount} House Hunters
              </p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#2F3626]/60 block">Total Loss Reported</span>
              <span className="font-heading font-black text-xl text-[#C4684A]">
                ₦{report.amountLostNaira.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Key particulars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
            <div className="p-3 bg-white rounded-2xl border border-[#C4684A]/30 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#C4684A]" />
              <div>
                <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Reported Phone</span>
                <span className="font-mono font-bold text-[#2F3626]">{report.reportedPhone}</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-2xl border border-[#C4684A]/30 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C4684A]" />
              <div>
                <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Alleged Property</span>
                <span className="font-bold text-[#2F3626] truncate">{report.propertyAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modus Operandi & Details */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#2F3626] flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#C4684A]" />
            <span>How the Scam Was Carried Out</span>
          </h2>

          <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] text-xs sm:text-sm text-[#2F3626]/90 leading-relaxed">
            {report.description}
          </div>

          <div className="flex items-center justify-between text-xs text-[#2F3626]/70 pt-2 border-t border-[#EAE2D6]">
            <span>{report.reporterDisplay}</span>
            <span>Date Reported: {report.dateReported}</span>
          </div>
        </div>

        {/* Evidence Photos & Forged Documents */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-lg text-[#2F3626] flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#8B9A6E]" />
            <span>Submitted Evidence & Fake Receipts ({report.evidencePhotos.length})</span>
          </h2>
          <p className="text-xs text-[#2F3626]/70">
            Uploaded by victims. Sensitive bank account numbers and BVN are masked to protect ongoing police inquiries.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.evidencePhotos.map((imgUrl, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden border border-[#EAE2D6] h-52 relative group">
                <img src={imgUrl} alt="Evidence" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="bg-white text-[#2F3626] px-3 py-1.5 rounded-xl text-xs font-bold shadow">
                    View Full Evidence
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions: Warn Friends & Share */}
        <div className="bg-[#EAE2D6] rounded-3xl p-5 border border-[#D8CEBE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-[#2F3626] block">Know someone hunting for a house in Uyo?</span>
            <span className="text-[#2F3626]/70">Share this warning on WhatsApp to prevent another victim.</span>
          </div>
          <button
            onClick={() => {
              const text = encodeURIComponent(
                `SCAM ALERT in Uyo: Watch out for ${report.reportedName} (${report.reportedPhone}). Check details on RentTruth AKS: https://renttruth-aks.ng/scam/${report.id}`
              );
              window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share to WhatsApp</span>
          </button>
        </div>

      </div>
    </div>
  );
};
