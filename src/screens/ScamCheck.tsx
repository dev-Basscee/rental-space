import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Search,
  CheckCircle2,
  AlertTriangle,
  Phone,
  MapPin,
  ArrowRight,
  ShieldCheck,
  FileText,
  AlertCircle
} from 'lucide-react';
import { MOCK_SCAM_REPORTS, MOCK_AGENTS } from '../data/mockData';
import { ScamReport, AgentProfile } from '../types';

interface ScamCheckProps {
  initialQuery?: string;
  onNavigate: (screen: string, param?: string) => void;
  onOpenGuestModal: () => void;
  isLoggedIn: boolean;
}

export const ScamCheck: React.FC<ScamCheckProps> = ({
  initialQuery = '',
  onNavigate,
  onOpenGuestModal,
  isLoggedIn,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [hasSearched, setHasSearched] = useState(false);
  const [matchedScam, setMatchedScam] = useState<ScamReport | null>(null);
  const [matchedAgent, setMatchedAgent] = useState<AgentProfile | null>(null);

  useEffect(() => {
    if (initialQuery) {
      executeSearch(initialQuery);
    }
  }, [initialQuery]);

  const executeSearch = (searchTerm: string) => {
    setHasSearched(true);
    const cleaned = searchTerm.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    // Check scam database
    const foundScam = MOCK_SCAM_REPORTS.find((s) => {
      const cleanPhone = s.reportedPhone.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const cleanName = s.reportedName.toLowerCase();
      const cleanAddr = s.propertyAddress.toLowerCase();
      return (
        cleanPhone.includes(cleaned) ||
        cleanName.includes(searchTerm.toLowerCase()) ||
        cleanAddr.includes(searchTerm.toLowerCase())
      );
    });

    // Check verified agents
    const foundAgent = MOCK_AGENTS.find((a) => {
      const cleanPhone = a.phone.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
      const cleanName = a.name.toLowerCase();
      return cleanPhone.includes(cleaned) || cleanName.includes(searchTerm.toLowerCase());
    });

    setMatchedScam(foundScam || null);
    setMatchedAgent(foundAgent || null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      executeSearch(query.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C4684A]/10 text-[#C4684A] text-xs font-bold">
            <ShieldAlert className="w-4 h-4" />
            <span>Akwa Ibom Public Fraud Registry</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
            Scam Check
          </h1>
          <p className="text-xs sm:text-sm text-[#2F3626]/75 max-w-lg mx-auto">
            Search any agent phone number, name, or Uyo house address before paying inspection fees or rent deposit.
          </p>
        </div>

        {/* Big Search Input */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl p-3 sm:p-4 border border-[#D8CEBE] shadow-lg space-y-3"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2F3626]/50" />
            <input
              type="text"
              placeholder="Paste phone (e.g. 0802 341 9912), agent name, or street..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-[#F7F2EB] text-sm text-[#2F3626] font-medium focus:outline-none focus:ring-2 focus:ring-[#8B9A6E]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="flex-1 py-3.5 rounded-2xl bg-[#C4684A] hover:bg-[#B3583C] text-white font-bold text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Verify & Check Database</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (!isLoggedIn) onOpenGuestModal();
                else onNavigate('report_scam');
              }}
              className="px-5 py-3.5 rounded-2xl bg-[#EAE2D6] hover:bg-[#D8CEBE] text-[#2F3626] font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>+ Report a New Scam</span>
            </button>
          </div>
        </form>

        {/* Quick Test Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-[#2F3626]/70">
          <span>Try quick searches:</span>
          <button
            type="button"
            onClick={() => {
              setQuery('08023419912');
              executeSearch('08023419912');
            }}
            className="px-2.5 py-1 rounded-xl bg-[#C4684A]/10 text-[#C4684A] font-semibold hover:bg-[#C4684A]/20"
          >
            Flagged: 0802 341 9912 (Francis Udeme)
          </button>
          <button
            type="button"
            onClick={() => {
              setQuery('08037721099');
              executeSearch('08037721099');
            }}
            className="px-2.5 py-1 rounded-xl bg-[#8B9A6E]/15 text-[#6D7C52] font-semibold hover:bg-[#8B9A6E]/25"
          >
            Clean: 0803 772 1099 (Arc. Edidiong)
          </button>
          <button
            type="button"
            onClick={() => {
              setQuery('08099999999');
              executeSearch('08099999999');
            }}
            className="px-2.5 py-1 rounded-xl bg-[#EAE2D6] font-semibold hover:bg-[#D8CEBE]"
          >
            No Reports: 0809 999 9999
          </button>
        </div>

        {/* RESULT STATES */}

        {/* STATE A: MATCHED SCAM REPORT (Terracotta Alert) */}
        {hasSearched && matchedScam && (
          <div className="bg-[#FFF8F6] rounded-3xl p-6 border-2 border-[#C4684A] shadow-xl space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-[#C4684A] text-white flex items-center justify-center font-bold">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C4684A]">
                    HIGH RISK WARNING • REPORTED BY {matchedScam.reportCount} USERS
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-[#2F3626]">
                    {matchedScam.reportedName}
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#C4684A] text-white text-xs font-bold">
                Flagged
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-white border border-[#C4684A]/30">
                <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Reported Phone</span>
                <span className="font-mono font-bold text-[#C4684A] text-sm">
                  {matchedScam.reportedPhone}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white border border-[#C4684A]/30">
                <span className="text-[10px] text-[#2F3626]/60 block font-semibold">Scam Modus Operandi</span>
                <span className="font-bold text-[#2F3626]">{matchedScam.scamType}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#C4684A]/20 text-xs text-[#2F3626] space-y-1">
              <span className="font-bold text-[#C4684A] block">Report Summary:</span>
              <p className="leading-relaxed">{matchedScam.description}</p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-[#2F3626]/70">
                Total reported losses: <strong>₦{matchedScam.amountLostNaira.toLocaleString()}</strong>
              </span>
              <button
                onClick={() => onNavigate('scam_report_detail', matchedScam.id)}
                className="px-4 py-2 rounded-xl bg-[#C4684A] text-white text-xs font-bold hover:bg-[#B3583C] transition-colors flex items-center gap-1.5"
              >
                <span>View Full Case File & Receipts</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STATE B: MATCHED VERIFIED AGENT (Green Verified) */}
        {hasSearched && matchedAgent && (
          <div className="bg-[#F2F6ED] rounded-3xl p-6 border-2 border-[#8B9A6E] shadow-xl space-y-4 animate-in fade-in duration-300">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={matchedAgent.avatar}
                  alt={matchedAgent.name}
                  className="w-12 h-12 rounded-2xl object-cover border-2 border-[#8B9A6E]"
                />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6D7C52] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B9A6E]" />
                    VERIFIED HONEST AGENT • PHYSICAL OFFICE AUDITED
                  </span>
                  <h3 className="font-heading font-extrabold text-xl text-[#2F3626]">
                    {matchedAgent.name}
                  </h3>
                  <p className="text-xs text-[#2F3626]/70">{matchedAgent.agencyName}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#8B9A6E] text-white text-xs font-bold">
                0 Scam Reports
              </span>
            </div>

            <p className="text-xs text-[#2F3626]/80 leading-relaxed bg-white p-3.5 rounded-2xl border border-[#8B9A6E]/30">
              {matchedAgent.bio}
            </p>

            <div className="flex items-center justify-between text-xs pt-1">
              <span className="text-[#2F3626]/70">
                Rating: <strong>⭐ {matchedAgent.rating}</strong> ({matchedAgent.totalReviews} reviews)
              </span>
              <button
                onClick={() => onNavigate('agent_profile', matchedAgent.id)}
                className="px-4 py-2 rounded-xl bg-[#8B9A6E] text-white text-xs font-bold hover:bg-[#6D7C52] transition-colors"
              >
                View Agent Profile & Listings →
              </button>
            </div>
          </div>
        )}

        {/* STATE C: NO REPORTS FOUND (Neutral Clean) */}
        {hasSearched && !matchedScam && !matchedAgent && (
          <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] shadow-sm text-center space-y-4 animate-in fade-in duration-300">
            <div className="w-14 h-14 rounded-full bg-[#8B9A6E]/15 mx-auto flex items-center justify-center text-[#8B9A6E]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-xl text-[#2F3626]">
                No Scam Reports on Record for "{query}"
              </h3>
              <p className="text-xs text-[#2F3626]/75 max-w-md mx-auto">
                No house hunters have flagged this phone number or address on RentTruth AKS so far.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] text-xs text-[#2F3626] max-w-md mx-auto text-left space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-[#8B9A6E]">
                <ShieldCheck className="w-4 h-4" /> Golden Rule:
              </span>
              <p className="text-[#2F3626]/80 leading-relaxed">
                Even with zero reports, <strong>never transfer money</strong> before physically walking inside the house and verifying ownership with the compound caretaker or neighbours.
              </p>
            </div>
          </div>
        )}

        {/* Safety checklist */}
        <div className="bg-white rounded-3xl p-6 border border-[#EAE2D6] space-y-3">
          <h3 className="font-heading font-bold text-sm text-[#2F3626] uppercase tracking-wider">
            Akwa Ibom Rental Scam Red Flags:
          </h3>
          <ul className="text-xs space-y-2 text-[#2F3626]/80">
            <li className="flex items-start gap-2">
              <span className="text-[#C4684A] font-bold">1.</span>
              <span>Demanding ₦5,000+ "registration fee" before taking you to see the house.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C4684A] font-bold">2.</span>
              <span>Saying "5 other people are rushing it, pay half now to hold it" over WhatsApp.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C4684A] font-bold">3.</span>
              <span>Showing you around at night or refusing to let you test the borehole tap and meter.</span>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};
