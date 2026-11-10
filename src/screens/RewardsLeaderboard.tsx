import React, { useState } from 'react';
import {
  Gift,
  Award,
  Sparkles,
  CheckCircle2,
  Phone,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ChevronLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { REWARD_AIRTIME_OPTIONS, TOP_REVIEWERS, CURRENT_USER } from '../data/mockData';

interface RewardsLeaderboardProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const RewardsLeaderboard: React.FC<RewardsLeaderboardProps> = ({ onNavigate }) => {
  const [points, setPoints] = useState(CURRENT_USER.reputationPoints);
  const [redeemedSuccess, setRedeemedSuccess] = useState<string | null>(null);
  const [phoneForRecharge, setPhoneForRecharge] = useState('+234 803 456 7890');

  const handleRedeem = (opt: typeof REWARD_AIRTIME_OPTIONS[0]) => {
    if (points >= opt.pointsCost) {
      setPoints((prev) => prev - opt.pointsCost);
      setRedeemedSuccess(`${opt.label} sent to ${phoneForRecharge}!`);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#8B9A6E', '#F3CD6D'],
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
            Community Recognition
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
            Reviewer Rewards & Leaderboard
          </h1>
          <p className="text-xs sm:text-sm text-[#2F3626]/75">
            Outgoing tenants are the heroes of RentTruth AKS. Turn your verified reviews into real airtime and data.
          </p>
        </div>

        {/* Current User Balance Card */}
        <div className="bg-gradient-to-r from-[#8B9A6E] to-[#6D7C52] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
              🏆
            </div>
            <div>
              <span className="text-xs text-white/80 font-bold uppercase tracking-wider block">
                Your Available Reward Balance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-4xl text-white">
                  {points}
                </span>
                <span className="text-sm font-bold text-[#F3CD6D]">Points</span>
              </div>
              <p className="text-xs text-white/90 mt-1">
                Level 3: Trusted Reviewer • 3 Verified Uyo Reviews
              </p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-xs space-y-1">
            <span className="font-bold text-[#F3CD6D] block">How to earn more points:</span>
            <p className="text-white/90">
              • Post Move-Out Review: <strong>+150 pts</strong><br />
              • Upload 4+ Room Photos: <strong>+50 pts</strong><br />
              • Add Audio Voice Note: <strong>+25 pts</strong>
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {redeemedSuccess && (
          <div className="p-4 rounded-2xl bg-[#F2F6ED] border border-[#8B9A6E] text-xs text-[#6D7C52] font-bold flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" />
              {redeemedSuccess}
            </span>
            <button
              onClick={() => setRedeemedSuccess(null)}
              className="text-[#2F3626] underline hover:no-underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 1. AIRTIME & DATA REDEMPTION OPTIONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-extrabold text-xl text-[#2F3626]">
              Instant Airtime & Data Vouchers
            </h2>
            <div className="text-xs text-[#2F3626]/70 flex items-center gap-1.5">
              <span>Send to:</span>
              <input
                type="text"
                value={phoneForRecharge}
                onChange={(e) => setPhoneForRecharge(e.target.value)}
                className="px-2 py-1 rounded-lg bg-white border border-[#D8CEBE] font-mono font-bold text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REWARD_AIRTIME_OPTIONS.map((opt) => {
              const canAfford = points >= opt.pointsCost;
              return (
                <div
                  key={opt.id}
                  className="bg-white rounded-3xl p-5 border border-[#EAE2D6] shadow-sm flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-[#8B9A6E] uppercase tracking-wider block">
                      {opt.network}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-[#2F3626]">
                      {opt.label}
                    </h3>
                    <span className="text-xs font-mono font-bold text-[#F3CD6D] bg-[#2F3626] px-2 py-0.5 rounded-md inline-block">
                      {opt.pointsCost} Points
                    </span>
                  </div>

                  <button
                    disabled={!canAfford}
                    onClick={() => handleRedeem(opt)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-sm ${
                      canAfford
                        ? 'bg-[#8B9A6E] hover:bg-[#6D7C52] text-white active:scale-95 cursor-pointer'
                        : 'bg-[#EEEEEE] text-[#2F3626]/40 cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'Redeem Now' : 'Need More Points'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. UYO TOP REVIEWERS LEADERBOARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-heading font-extrabold text-xl text-[#2F3626] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#8B9A6E]" />
                <span>Akwa Ibom Reviewer Leaderboard</span>
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                Top contributors helping thousands of house hunters avoid bad flats and scams.
              </p>
            </div>
            <span className="text-xs font-bold text-[#8B9A6E]">November 2026</span>
          </div>

          <div className="divide-y divide-[#EAE2D6] pt-1">
            {TOP_REVIEWERS.map((rev) => (
              <div
                key={rev.rank}
                className="py-3.5 flex items-center justify-between text-xs sm:text-sm"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-heading font-extrabold text-xs ${
                      rev.rank === 1
                        ? 'bg-[#F3CD6D] text-[#2F3626] shadow-sm'
                        : rev.rank === 2
                        ? 'bg-[#D8CEBE] text-[#2F3626]'
                        : rev.rank === 3
                        ? 'bg-[#C4684A]/30 text-[#2F3626]'
                        : 'bg-[#F7F2EB] text-[#2F3626]'
                    }`}
                  >
                    #{rev.rank}
                  </div>
                  <div>
                    <span className="font-bold text-[#2F3626] block">{rev.name}</span>
                    <span className="text-[11px] text-[#2F3626]/60">
                      {rev.location} • {rev.reviews} move-out reviews
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-heading font-extrabold text-[#8B9A6E] text-base">
                    {rev.points} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
