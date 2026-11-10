import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Star,
  ChevronLeft,
  Search,
  PlusCircle,
  Copy,
  Check
} from 'lucide-react';
import { StarRating3D } from '../components/StarRating3D';

interface DesignSystemProps {
  onNavigate: (screen: string) => void;
}

export const DesignSystem: React.FC<DesignSystemProps> = ({ onNavigate }) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [testRating, setTestRating] = useState(4);

  const colors = [
    { name: 'Primary Sage Green', hex: '#8B9A6E', desc: 'Trust, nature, growth, primary buttons & accents' },
    { name: 'Warm Cream Background', hex: '#F7F2EB', desc: 'Page backgrounds, soft paper warmth' },
    { name: 'Sand Surface / Cards', hex: '#EAE2D6', desc: 'Card containers, pill borders, secondary surfaces' },
    { name: 'Soft Light Grey', hex: '#EEEEEE', desc: 'Star rating track, neutral borders, shimmers' },
    { name: 'Deep Olive-Charcoal', hex: '#2F3626', desc: 'Primary body text, high contrast headings, dark UI' },
    { name: 'Muted Terracotta', hex: '#C4684A', desc: 'Scam warnings, fraud flags, destructive triggers' },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-[#8B9A6E] text-white text-[10px] font-mono font-bold">
                DESIGN SPECIFICATION
              </span>
              <span className="text-xs text-[#2F3626]/70">RentTruth AKS Brand Guide</span>
            </div>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626] mt-1">
              Design System & Component Library
            </h1>
          </div>

          <button
            onClick={() => onNavigate('landing')}
            className="text-xs text-[#8B9A6E] font-bold hover:underline"
          >
            ← Back to Landing
          </button>
        </div>

        {/* 1. COLOR PALETTE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-[#2F3626]">
            1. Official Brand Color Palette
          </h2>
          <p className="text-xs text-[#2F3626]/70">
            Warm, earthy, trustworthy, and modern. Strict 6-color system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {colors.map((c) => (
              <div
                key={c.hex}
                onClick={() => handleCopy(c.hex)}
                className="p-4 rounded-2xl border border-[#EAE2D6] bg-[#F7F2EB] hover:shadow-md transition-all cursor-pointer group"
              >
                <div
                  style={{ backgroundColor: c.hex }}
                  className="w-full h-16 rounded-xl shadow-inner mb-3 border border-black/5"
                />
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-[#2F3626]">{c.name}</h4>
                  <span className="font-mono text-xs font-bold text-[#2F3626] flex items-center gap-1 group-hover:text-[#8B9A6E]">
                    {copiedHex === c.hex ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5 opacity-60" />}
                    {c.hex}
                  </span>
                </div>
                <p className="text-[11px] text-[#2F3626]/70 mt-1">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. TYPOGRAPHY */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-[#2F3626]">
            2. Typographic Scale & Hierarchy
          </h2>
          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
              <span className="text-[10px] font-mono text-[#8B9A6E] block font-bold">Display Heading / Space Grotesk 48px</span>
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
                Check before you pay.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
              <span className="text-[10px] font-mono text-[#8B9A6E] block font-bold">Section Heading / Space Grotesk 24px</span>
              <p className="font-heading font-bold text-xl sm:text-2xl text-[#2F3626]">
                Verified Move-Out Reviews & Scam Check
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6]">
              <span className="text-[10px] font-mono text-[#8B9A6E] block font-bold">Body Sans / Plus Jakarta Sans 14px</span>
              <p className="text-sm text-[#2F3626]/85 leading-relaxed">
                Tenants who are moving out upload unedited photos and honest reviews of the houses they lived in across Uyo, Shelter Afrique, Ewet Housing, and Ikot Ekpene Road.
              </p>
            </div>
          </div>
        </div>

        {/* 3. BUTTONS & CHIPS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-[#2F3626]">
            3. Buttons, Chips & Interactive Controls
          </h2>
          
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button className="px-5 py-3 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white text-xs font-bold shadow-md transition-all">
              Primary Action Button
            </button>
            <button className="px-5 py-3 rounded-2xl bg-[#C4684A] hover:bg-[#B3583C] text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Scam Alert Button</span>
            </button>
            <button className="px-5 py-3 rounded-2xl bg-[#EAE2D6] hover:bg-[#D8CEBE] text-[#2F3626] text-xs font-bold transition-all">
              Secondary Sand Button
            </button>
            <button className="px-5 py-3 rounded-2xl bg-white border border-[#2F3626] text-[#2F3626] text-xs font-bold hover:bg-[#2F3626] hover:text-white transition-all">
              Outline Button
            </button>
          </div>

          <div className="pt-3 border-t border-[#EAE2D6] flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#2F3626]/70">Area Chips:</span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#8B9A6E] text-white text-xs font-bold shadow-xs">
              Shelter Afrique (Active)
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#EAE2D6] text-[#2F3626] text-xs font-bold">
              Ewet Housing
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-[#EAE2D6] text-[#2F3626] text-xs font-bold">
              Ikot Ekpene Road
            </span>
          </div>
        </div>

        {/* 4. 3D TACTILE RATING STARS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-[#2F3626]">
            4. 3D Tactile Rating Stars
          </h2>
          <p className="text-xs text-[#2F3626]/70">
            Interactive rating with soft dropshadow and warm amber highlights.
          </p>

          <div className="p-5 rounded-2xl bg-[#F7F2EB] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#2F3626] block">
                Tap to test rating interaction:
              </span>
              <p className="text-[11px] text-[#2F3626]/60">
                Score selected: {testRating}.0 / 5.0
              </p>
            </div>
            <StarRating3D value={testRating} onChange={setTestRating} size="lg" showScore />
          </div>
        </div>

        {/* 5. TRUST BADGES */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-4">
          <h2 className="font-heading font-bold text-xl text-[#2F3626]">
            5. Verification Badges
          </h2>
          
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="px-3 py-1.5 rounded-xl bg-[#8B9A6E] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Tenant (Proof Checked)</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#8B9A6E] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verified Agent (CAC & Office Audited)</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#2F3626] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#F3CD6D]" />
              <span>Verified Landlord</span>
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-[#C4684A] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Flagged Scam Contact</span>
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
