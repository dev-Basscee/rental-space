import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  ArrowRight,
  ShieldAlert,
  Star,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ChevronDown,
  Camera,
  DoorOpen,
  Users
} from 'lucide-react';
import { ThreeHouseHero } from '../components/ThreeHouseHero';
import { ThreeDoorTransition } from '../components/ThreeDoorTransition';
import { OrderedVsGotCard } from '../components/OrderedVsGotCard';
import { MOCK_NEIGHBOURHOODS } from '../data/mockData';
import { Logo } from '../components/Logo';

interface LandingPageProps {
  onNavigate: (screen: string, param?: string) => void;
  onOpenGuestModal: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenGuestModal,
}) => {
  const [showDoorTransition, setShowDoorTransition] = useState(false);
  const [scamSearchInput, setScamSearchInput] = useState('');
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);

  const handleStartTransition = () => {
    setShowDoorTransition(true);
  };

  const handleCompleteTransition = () => {
    setShowDoorTransition(false);
    onNavigate('feed');
  };

  const handleScamPreviewSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (scamSearchInput.trim()) {
      onNavigate('scam_check', scamSearchInput.trim());
    } else {
      onNavigate('scam_check');
    }
  };

  const faqs = [
    {
      q: 'Why should I check RentTruth AKS before paying inspection or rent in Uyo?',
      a: 'Rental fraud in Uyo often involves agents showing pictures of one building and taking you to another, collecting non-refundable inspection fees for non-existent houses, or renting out flats that flood up to your knees in July. Real move-out reviews give you the unvarnished truth.',
    },
    {
      q: 'Do I need an account to read reviews, contact hosts, or drop a review?',
      a: 'No! RentTruth AKS is an open community directory. Guests can freely browse all spaces (houses, retail shops, single rooms, event halls, offices), call or WhatsApp landlords directly, and drop authentic reviews without creating an account. Only hosts listing spaces need a free account.',
    },
    {
      q: 'How does direct host contact and payment work?',
      a: 'All deals, lease agreements, and payments happen directly between you and the landlord or host outside the platform. There are zero platform commissions or escrow fees. Simply inspect the space in the daytime, verify ownership, and pay directly.',
    },
    {
      q: 'Can I rent commercial stores, event halls, or single rooms here?',
      a: 'Yes! RentTruth AKS covers all rentable spaces in Uyo and Akwa Ibom — including lock-up shops along Aka Road or Plaza, single rooms near Uniuyo, executive event marquees in Shelter Afrique, and serviced offices.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16 selection:bg-[#8B9A6E]/30">
      {/* 3D Door Transition Overlay */}
      <ThreeDoorTransition
        isOpen={showDoorTransition}
        onComplete={handleCompleteTransition}
        onCancel={() => setShowDoorTransition(false)}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 border-b border-[#EAE2D6]">
        {/* Parallax background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#8B9A6E]/15 via-[#EAE2D6]/40 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Headline and Call-to-actions */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              {/* Trust Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAE2D6] border border-[#D8CEBE] shadow-xs text-xs font-bold text-[#2F3626]">
                <ShieldCheck className="w-4 h-4 text-[#8B9A6E]" />
                <span>Akwa Ibom's Open Community Space &amp; Rental Directory</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#2F3626] tracking-tight leading-[1.1]">
                Check before <br className="hidden sm:inline" />
                <span className="text-[#8B9A6E] underline decoration-[#8B9A6E]/30 underline-offset-8">
                  you pay.
                </span>
              </h1>

              {/* Sub-text */}
              <p className="text-base sm:text-lg text-[#2F3626]/80 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Tenants moving out upload real photos and honest truths of houses in Uyo. 
                Check properties, landlords, and agents <strong>before paying rent or inspection fees</strong>.
              </p>

              {/* Primary Call to Action Button: The 3D Door Trigger */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={handleStartTransition}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#8B9A6E] to-[#6D7C52] text-white font-heading font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-103 active:scale-97 transition-all flex items-center justify-center gap-3 group border border-[#8B9A6E]/40 cursor-pointer"
                >
                  <DoorOpen className="w-6 h-6 text-[#F3CD6D] group-hover:rotate-12 transition-transform" />
                  <span>Get Started — Enter Community</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onNavigate('scam_check')}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-[#EAE2D6] hover:bg-[#D8CEBE] text-[#2F3626] font-bold text-sm transition-all border border-[#D8CEBE] flex items-center justify-center gap-2 active:scale-98"
                >
                  <ShieldAlert className="w-4 h-4 text-[#C4684A]" />
                  <span>Run Phone Scam Check</span>
                </button>
              </div>

              {/* Gentle safety tip */}
              <p className="text-xs text-[#2F3626]/70 flex items-center justify-center lg:justify-start gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-[#8B9A6E]" />
                <span>No sign-up needed to browse reviews and search scam database</span>
              </p>
            </div>

            {/* Right Column: Interactive 3D House Hero Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center justify-center">
              <div className="w-full max-w-lg bg-gradient-to-b from-[#EAE2D6]/50 to-white/70 rounded-3xl p-4 border border-[#EAE2D6] shadow-xl backdrop-blur-sm relative">
                <ThreeHouseHero />
                
                {/* Micro CTA strip below 3D canvas */}
                <div className="mt-2 pt-3 border-t border-[#D8CEBE]/60 flex items-center justify-between text-xs text-[#2F3626]">
                  <span className="font-semibold flex items-center gap-1">
                    <span className="text-[#8B9A6E]">●</span> Interactive 3D Model
                  </span>
                  <button
                    onClick={handleStartTransition}
                    className="text-[#8B9A6E] font-bold hover:underline flex items-center gap-1"
                  >
                    Open 3D Door & Enter →
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE-FEEL STATS STRIP */}
      <section className="bg-[#EAE2D6] border-b border-[#D8CEBE] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3 bg-white/60 rounded-2xl border border-white">
              <p className="font-heading font-black text-2xl sm:text-3xl text-[#8B9A6E]">528+</p>
              <p className="text-xs font-semibold text-[#2F3626]/80 mt-0.5">Move-Out Reviews</p>
              <span className="text-[10px] text-[#2F3626]/60">Verified Uyo tenancies</span>
            </div>
            <div className="p-3 bg-white/60 rounded-2xl border border-white">
              <p className="font-heading font-black text-2xl sm:text-3xl text-[#2F3626]">312</p>
              <p className="text-xs font-semibold text-[#2F3626]/80 mt-0.5">Properties Mapped</p>
              <span className="text-[10px] text-[#2F3626]/60">Across 10 neighbourhoods</span>
            </div>
            <div className="p-3 bg-white/60 rounded-2xl border border-white">
              <p className="font-heading font-black text-2xl sm:text-3xl text-[#C4684A]">47</p>
              <p className="text-xs font-semibold text-[#2F3626]/80 mt-0.5">Scam Cases Flagged</p>
              <span className="text-[10px] text-[#C4684A]/90 font-medium">₦14.2M fraud prevented</span>
            </div>
            <div className="p-3 bg-white/60 rounded-2xl border border-white">
              <p className="font-heading font-black text-2xl sm:text-3xl text-[#8B9A6E]">68</p>
              <p className="text-xs font-semibold text-[#2F3626]/80 mt-0.5">Verified Honest Agents</p>
              <span className="text-[10px] text-[#2F3626]/60">Physical office checked</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCAM CHECK QUICK PREVIEW SEARCH BOX */}
      <section className="py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-[#2F3626] to-[#1F2419] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#C4684A]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#C4684A] animate-ping" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#F3CD6D]">
                Instant Akwa Ibom Scam Watch
              </span>
            </div>

            <h2 className="font-heading font-bold text-2xl sm:text-3xl">
              Got an agent's phone number or house address?
            </h2>
            <p className="text-sm text-[#F7F2EB]/80 max-w-xl">
              Check our public community database before paying any "inspection commitment fee" or rent deposit.
            </p>

            <form onSubmit={handleScamPreviewSearch} className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2F3626]/50" />
                <input
                  type="text"
                  placeholder="Paste phone (e.g. 0802 341 9912) or street name..."
                  value={scamSearchInput}
                  onChange={(e) => setScamSearchInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-[#2F3626] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B9A6E] font-medium"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-[#C4684A] hover:bg-[#B3583C] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Search Scam Watch</span>
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#EAE2D6]/70">
              <span>Recent searches:</span>
              <button
                type="button"
                onClick={() => onNavigate('scam_check', '08023419912')}
                className="underline hover:text-white"
              >
                0802 341 9912 (Francis Udeme)
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => onNavigate('scam_check', 'Aka Road')}
                className="underline hover:text-white"
              >
                45 Aka Road
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHAT I ORDERED VS WHAT I GOT INTERACTIVE 3D FLIP-CARD DEMO */}
      <section className="py-12 bg-[#EAE2D6]/40 border-y border-[#EAE2D6] px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
              The Problem We Solve
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
              "What I Ordered" vs. "What I Got"
            </h2>
            <p className="text-sm text-[#2F3626]/80">
              Agents post photos taken in dry season with wide lenses. Outgoing tenants post the unfiltered reality. Tap the card below to see the 3D flip.
            </p>
          </div>

          <OrderedVsGotCard />
        </div>
      </section>

      {/* 5. HOW IT WORKS (3 Steps with 3D Icons: Check, Review, Stay Safe) */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
              Simple 3-Step Process
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
              How RentTruth AKS Works
            </h2>
            <p className="text-sm text-[#2F3626]/80">
              Built specifically for Akwa Ibom tenants, students, and home seekers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 1: Check */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#8B9A6E]/15 border border-[#8B9A6E]/30 flex items-center justify-center text-2xl font-bold shadow-inner">
                🔍
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold font-mono text-[#8B9A6E]">STEP 01</span>
                <h3 className="font-heading font-bold text-xl text-[#2F3626]">Check Before You Pay</h3>
                <p className="text-xs text-[#2F3626]/80 leading-relaxed">
                  Search the property address or agent phone. See photos of water supply, light meter, roof leaks, and whether the compound floods in July.
                </p>
              </div>
            </div>

            {/* Step 2: Review */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#EAE2D6] border border-[#D8CEBE] flex items-center justify-center text-2xl font-bold shadow-inner">
                📸
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold font-mono text-[#8B9A6E]">STEP 02</span>
                <h3 className="font-heading font-bold text-xl text-[#2F3626]">Post as You Pack Out</h3>
                <p className="text-xs text-[#2F3626]/80 leading-relaxed">
                  Follow our 3-minute photo checklist while packing out. Share facts about rent increments, water, and caution deposits to protect future renters.
                </p>
              </div>
            </div>

            {/* Step 3: Stay Safe */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#C4684A]/15 border border-[#C4684A]/30 flex items-center justify-center text-2xl font-bold shadow-inner">
                🛡️
              </div>
              <div className="space-y-1.5">
                <span className="text-xs font-bold font-mono text-[#C4684A]">STEP 03</span>
                <h3 className="font-heading font-bold text-xl text-[#2F3626]">Stay Safe & Scam-Free</h3>
                <p className="text-xs text-[#2F3626]/80 leading-relaxed">
                  Flag fraudulent agents, double-letting, and bogus inspection fees. Build a transparent, respectful rental market across Uyo and Akwa Ibom.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FEATURED NEIGHBOURHOODS */}
      <section className="py-12 bg-[#EAE2D6]/50 border-y border-[#EAE2D6] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
                Local Knowledge
              </span>
              <h2 className="font-heading font-extrabold text-3xl text-[#2F3626]">
                Featured Uyo Neighbourhoods
              </h2>
              <p className="text-xs text-[#2F3626]/80">
                Explore rent benchmarks, flood risk and power grades by area.
              </p>
            </div>
            <button
              onClick={() => onNavigate('neighbourhoods')}
              className="text-xs font-bold text-[#8B9A6E] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View All 10 Areas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_NEIGHBOURHOODS.slice(0, 3).map((area) => (
              <div
                key={area.id}
                onClick={() => onNavigate('neighbourhoods')}
                className="bg-white rounded-3xl overflow-hidden border border-[#EAE2D6] shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="h-44 overflow-hidden relative">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#2F3626]/80 text-[#F7F2EB] backdrop-blur-md px-2.5 py-1 rounded-xl text-xs font-semibold">
                    {area.reviewCount} Reviews
                  </div>
                  <div
                    className={`absolute bottom-3 left-3 px-2.5 py-1 rounded-xl text-xs font-bold ${
                      area.floodRisk === 'Low'
                        ? 'bg-[#8B9A6E] text-white'
                        : 'bg-[#C4684A] text-white'
                    }`}
                  >
                    Flood Risk: {area.floodRisk}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="font-heading font-bold text-lg text-[#2F3626]">
                    {area.name}
                  </h3>
                  <p className="text-xs text-[#2F3626]/75 line-clamp-2">
                    {area.description}
                  </p>
                  <div className="pt-2 border-t border-[#EAE2D6] flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[#2F3626]/60">Avg. 2-Bed: </span>
                      <span className="font-bold text-[#2F3626]">
                        ₦{(area.averageRent2Bed / 1000).toFixed(0)}k/yr
                      </span>
                    </div>
                    <span className="text-[#8B9A6E] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                      Explore →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. DUAL CALL TO ACTION: OUTGOING TENANTS & HONEST AGENTS */}
      <section className="py-16 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Outgoing Tenants CTA */}
          <div className="bg-gradient-to-br from-[#8B9A6E] to-[#6D7C52] rounded-3xl p-8 text-white space-y-5 shadow-lg relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white">
              <Camera className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-extrabold text-2xl text-white">
                Moving Out of Your Uyo Flat?
              </h3>
              <p className="text-xs text-white/90 leading-relaxed">
                Don't let what you learned disappear. Take 3 minutes to photograph the compound, rate the water and light, and save the next tenant from heartbreak.
              </p>
            </div>
            <ul className="text-xs space-y-2 text-white/95">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F3CD6D]" /> Earn 150 points for MTN/Airtel/Glo airtime
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F3CD6D]" /> Pseudonymous posting option for privacy
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#F3CD6D]" /> Verified Tenant trust badge
              </li>
            </ul>
            <button
              onClick={() => onNavigate('post_review')}
              className="w-full py-3.5 rounded-2xl bg-white text-[#2F3626] font-bold text-sm shadow hover:bg-neutral-100 transition-all cursor-pointer"
            >
              Post a Move-Out Review Now
            </button>
          </div>

          {/* Honest Landlords & Agents CTA */}
          <div className="bg-white rounded-3xl p-8 border border-[#EAE2D6] space-y-5 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#EAE2D6] flex items-center justify-center text-[#2F3626]">
              <Users className="w-6 h-6 text-[#8B9A6E]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                Are You an Honest Agent or Landlord?
              </h3>
              <p className="text-xs text-[#2F3626]/80 leading-relaxed">
                Tired of competing against fake agents who scam clients? Earn a Verified Agent or Landlord badge, build public reputation, and reply directly to tenant feedback.
              </p>
            </div>
            <ul className="text-xs space-y-2 text-[#2F3626]/80">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" /> Verified physical office & CAC badge
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" /> Official right of reply on all reviews
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#8B9A6E]" /> Serious clients reach out to you directly
              </li>
            </ul>
            <button
              onClick={() => onNavigate('verification_centre')}
              className="w-full py-3.5 rounded-2xl bg-[#2F3626] text-white font-bold text-sm shadow hover:bg-black transition-all cursor-pointer"
            >
              Apply for Verification Badge
            </button>
          </div>

        </div>
      </section>

      {/* 8. FAQ ACCORDION */}
      <section className="py-12 bg-[#EAE2D6]/40 border-y border-[#EAE2D6] px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
              Got Questions?
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-[#2F3626]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = faqOpenIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-[#EAE2D6] overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setFaqOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-[#2F3626] flex items-center justify-between gap-4"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#8B9A6E] shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#2F3626]/80 leading-relaxed border-t border-[#EAE2D6]/60 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="pt-12 pb-6 px-4 sm:px-6 text-[#2F3626]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 text-xs">
          <div className="col-span-2 space-y-3">
            <button
              onClick={() => onNavigate('landing')}
              className="text-left focus:outline-hidden group"
            >
              <Logo variant="full" size="md" />
            </button>
            <p className="text-xs text-[#2F3626]/75 max-w-sm leading-relaxed">
              Akwa Ibom's open community directory for renting houses, lock-up retail stores, student rooms, event marquees, and offices in Uyo. Deal directly with hosts with zero intermediary fees and real tenant reviews.
            </p>
            <p className="text-[11px] text-[#2F3626]/60">
              Compliant with Nigeria Data Protection Act (NDPA) 2023.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#8B9A6E] uppercase tracking-wider text-[11px]">
              Platform
            </h4>
            <ul className="space-y-1.5 text-[#2F3626]/80">
              <li><button onClick={() => onNavigate('feed')} className="hover:underline">Home Feed</button></li>
              <li><button onClick={() => onNavigate('scam_check')} className="hover:underline">Scam Check Database</button></li>
              <li><button onClick={() => onNavigate('fee_benchmark')} className="hover:underline">Agent Fee Benchmarks</button></li>
              <li><button onClick={() => onNavigate('neighbourhoods')} className="hover:underline">Neighbourhood Guides</button></li>
              <li><button onClick={() => onNavigate('search')} className="hover:underline">Explore All Spaces</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-[#8B9A6E] uppercase tracking-wider text-[11px]">
              Trust & Legal
            </h4>
            <ul className="space-y-1.5 text-[#2F3626]/80">
              <li><button onClick={() => onNavigate('legal_policies')} className="hover:underline">Community Guidelines</button></li>
              <li><button onClick={() => onNavigate('legal_policies')} className="hover:underline">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('legal_policies')} className="hover:underline">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('about_mission')} className="hover:underline">About Our Mission</button></li>
              <li><button onClick={() => onNavigate('faq_help')} className="hover:underline">Contact / Support</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-[#EAE2D6] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#2F3626]/60 gap-3">
          <p>© 2026 RentSpace AKS. Open community platform for Akwa Ibom State, Nigeria.</p>
          <div className="flex items-center gap-4">
            <span>Uyo, Nigeria</span>
            <span>•</span>
            <button onClick={() => onNavigate('design_system')} className="text-[#8B9A6E] font-bold hover:underline">
              Design System Explorer
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
