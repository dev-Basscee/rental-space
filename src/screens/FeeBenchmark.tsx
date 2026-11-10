import React, { useState } from 'react';
import {
  DollarSign,
  Calculator,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { MOCK_FEE_BENCHMARKS } from '../data/mockData';

interface FeeBenchmarkProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const FeeBenchmark: React.FC<FeeBenchmarkProps> = ({ onNavigate }) => {
  const [rentInput, setRentInput] = useState<number>(600000);
  const [quotedAgentFee, setQuotedAgentFee] = useState<number>(80000);
  const [quotedInspectionFee, setQuotedInspectionFee] = useState<number>(5000);

  // Standard calculation: 10% agency fee, 5-10% legal/agreement fee
  const standardAgencyFee = rentInput * 0.1;
  const isAgentFeeInflated = quotedAgentFee > standardAgencyFee * 1.15;
  const isInspectionFeeExtortion = quotedInspectionFee > 2000;

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Header */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
            Price Transparency
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
            Uyo Agent Fee Benchmarks
          </h1>
          <p className="text-xs sm:text-sm text-[#2F3626]/75">
            Know what is fair before an agent charges you ₦10,000 inspection fee or 25% agency fee.
          </p>
        </div>

        {/* 1. INTERACTIVE FAIR FEE CALCULATOR */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#8B9A6E]/15 text-[#8B9A6E] flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-[#2F3626]">
                Instant Fair Fee & Scam Gauge
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                Input your house rent to see standard legal vs illegal fee ranges.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold block mb-1 text-[#2F3626]">Annual House Rent (₦)</label>
              <input
                type="number"
                step="50000"
                value={rentInput}
                onChange={(e) => setRentInput(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-mono font-bold text-sm text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              />
            </div>

            <div>
              <label className="font-bold block mb-1 text-[#2F3626]">Agent Quoted Agency Fee (₦)</label>
              <input
                type="number"
                step="5000"
                value={quotedAgentFee}
                onChange={(e) => setQuotedAgentFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-mono font-bold text-sm text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              />
            </div>

            <div>
              <label className="font-bold block mb-1 text-[#2F3626]">Agent Demanded Inspection (₦)</label>
              <input
                type="number"
                step="1000"
                value={quotedInspectionFee}
                onChange={(e) => setQuotedInspectionFee(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-mono font-bold text-sm text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              />
            </div>
          </div>

          {/* Calculator Verdict Boxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Standard Fair Agency Fee */}
            <div
              className={`p-4 rounded-2xl border ${
                isAgentFeeInflated
                  ? 'bg-[#FFF8F6] border-[#C4684A]'
                  : 'bg-[#F2F6ED] border-[#8B9A6E]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>Standard Akwa Ibom 10% Agency:</span>
                <span className="font-mono text-base">
                  ₦{standardAgencyFee.toLocaleString()}
                </span>
              </div>
              <p className="text-xs text-[#2F3626]/80 leading-relaxed">
                {isAgentFeeInflated ? (
                  <span className="text-[#C4684A] font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Quoted fee is inflated by ₦
                    {(quotedAgentFee - standardAgencyFee).toLocaleString()}. Standard ceiling is 10%.
                  </span>
                ) : (
                  <span className="text-[#8B9A6E] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Quoted agency fee is within normal 10% benchmark.
                  </span>
                )}
              </p>
            </div>

            {/* Inspection Fee Verdict */}
            <div
              className={`p-4 rounded-2xl border ${
                isInspectionFeeExtortion
                  ? 'bg-[#FFF8F6] border-[#C4684A]'
                  : 'bg-[#F2F6ED] border-[#8B9A6E]'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold mb-1">
                <span>Inspection Fee Norm:</span>
                <span className="font-mono text-base">FREE — ₦1,500</span>
              </div>
              <p className="text-xs text-[#2F3626]/80 leading-relaxed">
                {isInspectionFeeExtortion ? (
                  <span className="text-[#C4684A] font-semibold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> Extortion alert! ₦{quotedInspectionFee} is predatory. Verified agents charge ₦0 to ₦1,500 for Keke fuel.
                  </span>
                ) : (
                  <span className="text-[#8B9A6E] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Normal fuel support range.
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* 2. REGIONAL BENCHMARK TABLE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-[#2F3626]">
            Typical Fee Norms by Uyo District
          </h2>

          <div className="space-y-3">
            {MOCK_FEE_BENCHMARKS.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h3 className="font-bold text-sm text-[#2F3626]">{item.area}</h3>
                  <div className="flex items-center gap-3 text-[#2F3626]/80">
                    <span>Agency: <strong>{item.typicalAgencyPercent}</strong></span>
                    <span>•</span>
                    <span>Legal: <strong>{item.typicalLegalPercent}</strong></span>
                    <span>•</span>
                    <span>Caution: <strong>{item.typicalCautionDeposit}</strong></span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EAE2D6] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                  <span className="text-[#8B9A6E] font-semibold">
                    Inspection: {item.inspectionFeeNorm}
                  </span>
                  <span className="text-[#C4684A] font-medium">
                    ⚠️ {item.riskNote}
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
