import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  FileText,
  AlertTriangle,
  UserCheck,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { MOCK_SCAM_REPORTS, MOCK_REVIEWS, MOCK_AGENTS } from '../data/mockData';

interface AdminDashboardProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'queue' | 'scam_reports' | 'verifications' | 'analytics'>('queue');
  const [flaggedReviews, setFlaggedReviews] = useState([
    {
      id: 'flag-1',
      reviewId: 'rev-2',
      property: '18 Ikot Ekpene Road',
      author: 'Ubong Sunday',
      reason: 'Landlord claims flooding photo was taken in 2022 before gutter culvert was constructed.',
      status: 'pending_audit',
      date: 'Today, 10:14 AM',
    },
    {
      id: 'flag-2',
      reviewId: 'rev-3',
      property: 'Use Offot Student Lodge',
      author: 'Aniekeme Edet',
      reason: 'Agent claims borehole machine was repaired immediately, not spoilt for 3 weeks.',
      status: 'pending_audit',
      date: 'Yesterday, 4:30 PM',
    },
  ]);

  const handleResolveFlag = (flagId: string, action: 'keep' | 'dismiss') => {
    setFlaggedReviews((prev) => prev.filter((f) => f.id !== flagId));
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#2F3626] text-white text-[10px] font-mono font-bold">
                ADMIN ACCESS ONLY
              </span>
              <span className="text-xs text-[#2F3626]/70">Akwa Ibom Trust Operations</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2F3626] mt-1">
              Moderation & Scam Review Desk
            </h1>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'queue' ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
              }`}
            >
              Flagged ({flaggedReviews.length})
            </button>
            <button
              onClick={() => setActiveTab('scam_reports')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'scam_reports' ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
              }`}
            >
              Scam Audits (3)
            </button>
            <button
              onClick={() => setActiveTab('verifications')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'verifications' ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
              }`}
            >
              Agents Pending (4)
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'analytics' ? 'bg-[#8B9A6E] text-white' : 'bg-white text-[#2F3626]'
              }`}
            >
              State Analytics
            </button>
          </div>
        </div>

        {/* 1. FLAGGED REVIEWS QUEUE */}
        {activeTab === 'queue' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-xl text-[#2F3626]">
                  Contested Tenant Reviews
                </h2>
                <p className="text-xs text-[#2F3626]/70">
                  Reviews flagged by landlords for dispute or metadata audit.
                </p>
              </div>
              <span className="text-xs font-bold text-[#C4684A]">
                {flaggedReviews.length} unresolved cases
              </span>
            </div>

            {flaggedReviews.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#2F3626]/60">
                ✓ All flagged review disputes have been resolved!
              </div>
            ) : (
              <div className="space-y-4">
                {flaggedReviews.map((item) => (
                  <div
                    key={item.id}
                    className="p-5 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] space-y-3 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-[#2F3626]">
                        {item.property}
                      </span>
                      <span className="text-[10px] text-[#2F3626]/60 font-mono">
                        {item.date}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#D8CEBE] text-xs">
                      <span className="font-bold text-[#C4684A] block mb-0.5">
                        Landlord Contest Claim:
                      </span>
                      <p className="text-[#2F3626]/80">{item.reason}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[11px] text-[#2F3626]/70">
                        Reviewer: <strong>{item.author}</strong> (GPS EXIF: Confirmed Uyo)
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleResolveFlag(item.id, 'dismiss')}
                          className="px-3 py-1.5 rounded-xl bg-white border border-[#D8CEBE] hover:bg-[#EAE2D6] text-xs font-semibold text-[#2F3626]"
                        >
                          Request Counter-Photo
                        </button>
                        <button
                          onClick={() => handleResolveFlag(item.id, 'keep')}
                          className="px-3.5 py-1.5 rounded-xl bg-[#8B9A6E] text-white text-xs font-bold hover:bg-[#6D7C52]"
                        >
                          Maintain Review (Valid EXIF)
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 2. SCAM REPORT AUDITS */}
        {activeTab === 'scam_reports' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-xl text-[#2F3626]">
              Submitted Scam Reports Pending Warning Placement
            </h2>

            <div className="space-y-3">
              {MOCK_SCAM_REPORTS.map((scam) => (
                <div
                  key={scam.id}
                  className="p-4 rounded-2xl bg-[#FFF8F6] border border-[#C4684A]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#2F3626]">
                        {scam.reportedName}
                      </span>
                      <span className="font-mono text-[#C4684A] font-bold">
                        ({scam.reportedPhone})
                      </span>
                    </div>
                    <p className="text-[#2F3626]/80 line-clamp-1">{scam.description}</p>
                    <span className="text-[10px] text-[#2F3626]/60">
                      Alleged loss: ₦{scam.amountLostNaira.toLocaleString()} • {scam.area}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => onNavigate('scam_report_detail', scam.id)}
                      className="px-3 py-1.5 rounded-xl bg-white border border-[#C4684A]/40 text-[#C4684A] font-bold text-xs"
                    >
                      Examine Proof
                    </button>
                    <button className="px-3 py-1.5 rounded-xl bg-[#C4684A] text-white font-bold text-xs">
                      Approve Blacklist Banner
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. VERIFICATIONS QUEUE */}
        {activeTab === 'verifications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4">
            <h2 className="font-heading font-bold text-xl text-[#2F3626]">
              Agent & Landlord Physical Office Vetting
            </h2>

            <div className="space-y-3">
              {MOCK_AGENTS.map((agent) => (
                <div
                  key={agent.id}
                  className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={agent.avatar}
                      alt=""
                      className="w-10 h-10 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[#2F3626]">{agent.name}</h4>
                      <p className="text-[#2F3626]/70">{agent.officeAddress}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-[11px] text-[#8B9A6E] font-bold">
                      Physical Audit Scheduled
                    </span>
                    <button className="px-3.5 py-1.5 rounded-xl bg-[#8B9A6E] text-white font-bold text-xs">
                      Issue Badge
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. STATE ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <h2 className="font-heading font-bold text-xl text-[#2F3626]">
              Akwa Ibom Housing Market Data Insights
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-xs">
              <div className="p-4 bg-[#F7F2EB] rounded-2xl border border-[#EAE2D6]">
                <span className="text-[#2F3626]/70 block font-semibold">Average Uyo 2-Bed Rent</span>
                <span className="font-heading font-black text-2xl text-[#8B9A6E]">₦780,000</span>
                <span className="text-[10px] text-[#2F3626]/60">+8.5% YoY inflation</span>
              </div>

              <div className="p-4 bg-[#F7F2EB] rounded-2xl border border-[#EAE2D6]">
                <span className="text-[#2F3626]/70 block font-semibold">Caution Deposit Return Rate</span>
                <span className="font-heading font-black text-2xl text-[#C4684A]">34%</span>
                <span className="text-[10px] text-[#C4684A] font-semibold">66% of tenants lose deposit</span>
              </div>

              <div className="p-4 bg-[#F7F2EB] rounded-2xl border border-[#EAE2D6]">
                <span className="text-[#2F3626]/70 block font-semibold">Total Scams Prevented</span>
                <span className="font-heading font-black text-2xl text-[#8B9A6E]">47 Cases</span>
                <span className="text-[10px] text-[#2F3626]/60">₦14.2M saved</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
