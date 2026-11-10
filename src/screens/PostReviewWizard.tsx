import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Camera,
  CheckCircle2,
  Upload,
  Mic,
  Star,
  DollarSign,
  FileText,
  MapPin,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  Volume2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { StarRating3D } from '../components/StarRating3D';

interface PostReviewWizardProps {
  onNavigate: (screen: string, param?: string) => void;
  onReviewSubmitted?: () => void;
}

export type WizardStep = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h';

export const PostReviewWizard: React.FC<PostReviewWizardProps> = ({
  onNavigate,
  onReviewSubmitted,
}) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>('a');

  // Wizard state:
  // Step a: Property
  const [address, setAddress] = useState('Plot 14, Unit C, Shelter Afrique Estate, Uyo');
  const [area, setArea] = useState('Shelter Afrique');
  const [propertyType, setPropertyType] = useState('2-Bedroom Flat');

  // Step b: Photo Checklist (10 items)
  const [uploadedPhotos, setUploadedPhotos] = useState<Record<string, string>>({
    compound: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
    sitting_room: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    bathroom: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80',
    drainage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80',
  });

  const photoChecklist = [
    { key: 'compound', label: 'Compound & Gate' },
    { key: 'sitting_room', label: 'Sitting Room' },
    { key: 'bedrooms', label: 'Bedrooms' },
    { key: 'kitchen', label: 'Kitchen' },
    { key: 'bathroom', label: 'Bathroom & Toilet' },
    { key: 'roof', label: 'Ceiling / Roof Leaks' },
    { key: 'water', label: 'Water Source / Pumping' },
    { key: 'meter', label: 'Power Meter (Prepaid/Estimated)' },
    { key: 'drainage', label: 'Street Drainage & Gutter' },
    { key: 'street', label: 'Front Road / Access' },
  ];

  const uploadCount = Object.keys(uploadedPhotos).length;
  const progressPercent = Math.round((uploadCount / photoChecklist.length) * 100);

  // Step c: 3D Stars Category Ratings
  const [ratings, setRatings] = useState({
    water: 5,
    light: 4,
    security: 5,
    drainage: 4,
    neighbours: 4,
    landlord: 3,
    valueForMoney: 4,
  });

  // Step d: Voice Note & Text
  const [summaryLoved, setSummaryLoved] = useState(
    'Borehole water runs cleanly 24/7. Gated compound locks at 10:30 PM with active night vigilantes.'
  );
  const [summaryDisliked, setSummaryDisliked] = useState(
    'Landlord raised rent without advance notice, and the prepaid meter was initially shared between two flats.'
  );
  const [isRecording, setIsRecording] = useState(false);
  const [voiceDuration, setVoiceDuration] = useState('0:42');

  // Step e: Financial Facts
  const [rentPaid, setRentPaid] = useState(800000);
  const [agentFeePaid, setAgentFeePaid] = useState(80000);
  const [cautionFee, setCautionFee] = useState(50000);
  const [depositReturned, setDepositReturned] = useState<'yes' | 'partial' | 'no'>('yes');
  const [wouldRentAgain, setWouldRentAgain] = useState(true);

  // Step f: Proof of Tenancy
  const [proofType, setProofType] = useState<'receipt' | 'agreement' | 'geotag'>('receipt');
  const [proofUploaded, setProofUploaded] = useState(true);

  const handleSimulateUpload = (key: string) => {
    setUploadedPhotos((prev) => ({
      ...prev,
      [key]: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=400&q=80',
    }));
  };

  const handleFinalSubmit = () => {
    setCurrentStep('h');
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#8B9A6E', '#F3CD6D', '#C4684A'],
    });
    if (onReviewSubmitted) onReviewSubmitted();
  };

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-5 space-y-6">
        
        {/* Wizard Top Step Navigator */}
        <div className="bg-white rounded-3xl p-4 border border-[#EAE2D6] shadow-sm flex items-center justify-between text-xs">
          <button
            onClick={() => {
              if (currentStep === 'a') onNavigate('feed');
              else if (currentStep === 'b') setCurrentStep('a');
              else if (currentStep === 'c') setCurrentStep('b');
              else if (currentStep === 'd') setCurrentStep('c');
              else if (currentStep === 'e') setCurrentStep('d');
              else if (currentStep === 'f') setCurrentStep('e');
              else if (currentStep === 'g') setCurrentStep('f');
            }}
            className="font-bold text-[#8B9A6E] flex items-center gap-1 hover:underline"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {/* Step Bubbles (a to h) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as WizardStep[]).map((st, idx) => (
              <button
                key={st}
                onClick={() => setCurrentStep(st)}
                className={`w-6 h-6 rounded-full text-[10px] font-bold font-mono transition-all flex items-center justify-center ${
                  currentStep === st
                    ? 'bg-[#8B9A6E] text-white scale-110 shadow-sm'
                    : 'bg-[#EAE2D6] text-[#2F3626]'
                }`}
              >
                {st.toUpperCase()}
              </button>
            ))}
          </div>

          <span className="font-mono text-[#2F3626]/60 text-[11px]">
            Step {currentStep.toUpperCase()} of H
          </span>
        </div>

        {/* ---------------- STEP A: FIND OR ADD PROPERTY ---------------- */}
        {currentStep === 'a' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-5">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider font-mono">
                STEP A: PROPERTY IDENTIFICATION
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                Which House Are You Packing Out From?
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                Enter the house address in Uyo so future tenants can find it easily.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">
                  Street Address & Compound Number
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B9A6E]" />
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#F7F2EB] border border-[#D8CEBE] font-medium text-sm text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold block mb-1 text-[#2F3626]">
                    Neighbourhood / Estate
                  </label>
                  <select
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  >
                    <option value="Shelter Afrique">Shelter Afrique</option>
                    <option value="Ewet Housing">Ewet Housing</option>
                    <option value="Ikot Ekpene Road">Ikot Ekpene Road</option>
                    <option value="Abak Road">Abak Road</option>
                    <option value="Aka Road">Aka Road</option>
                    <option value="Use Offot">Use Offot (Uniuyo Campus)</option>
                    <option value="Itam">Itam</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold block mb-1 text-[#2F3626]">Property Type</label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                  >
                    <option value="Self-Contain">Self-Contain</option>
                    <option value="1-Bedroom Flat">1-Bedroom Flat</option>
                    <option value="2-Bedroom Flat">2-Bedroom Flat</option>
                    <option value="3-Bedroom Flat">3-Bedroom Flat</option>
                    <option value="Student Hostel">Student Hostel</option>
                  </select>
                </div>
              </div>

              {/* Simulated Map Pin confirmation */}
              <div className="p-4 rounded-2xl bg-[#EAE2D6]/40 border border-[#D8CEBE] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#8B9A6E] text-white flex items-center justify-center font-bold">
                    📍
                  </div>
                  <div>
                    <span className="font-bold text-[#2F3626] block">GPS Pin Locked in Uyo</span>
                    <span className="text-[11px] text-[#2F3626]/70">5.0182° N, 7.9421° E (Shelter Afrique Zone)</span>
                  </div>
                </div>
                <span className="font-bold text-[#8B9A6E]">Verified Location</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setCurrentStep('b')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Photo Checklist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP B: PHOTO CHECKLIST UPLOAD ---------------- */}
        {currentStep === 'b' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider font-mono">
                  STEP B: PHOTO CHECKLIST
                </span>
                <h2 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                  Upload by Checklist
                </h2>
                <p className="text-xs text-[#2F3626]/70">
                  {uploadCount} of {photoChecklist.length} photos uploaded. Minimum 3 required for rewards.
                </p>
              </div>

              {/* Progress Ring Indicator */}
              <div className="relative w-14 h-14 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="#EEEEEE"
                    strokeWidth="5"
                    fill="transparent"
                  />
                  <circle
                    cx="28"
                    cy="28"
                    r="24"
                    stroke="#8B9A6E"
                    strokeWidth="5"
                    strokeDasharray={150}
                    strokeDashoffset={150 - (150 * progressPercent) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <span className="absolute text-[11px] font-bold font-mono text-[#2F3626]">
                  {progressPercent}%
                </span>
              </div>
            </div>

            {/* Per-Room Upload Tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {photoChecklist.map((item) => {
                const isUploaded = !!uploadedPhotos[item.key];
                return (
                  <div
                    key={item.key}
                    onClick={() => handleSimulateUpload(item.key)}
                    className={`relative p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between h-32 group ${
                      isUploaded
                        ? 'border-[#8B9A6E] bg-[#F2F6ED]'
                        : 'border-dashed border-[#D8CEBE] hover:border-[#8B9A6E] bg-[#F7F2EB]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#2F3626] line-clamp-1">
                        {item.label}
                      </span>
                      {isUploaded && (
                        <CheckCircle2 className="w-4 h-4 text-[#8B9A6E] shrink-0" />
                      )}
                    </div>

                    {isUploaded ? (
                      <div className="relative h-16 w-full rounded-xl overflow-hidden mt-1">
                        <img
                          src={uploadedPhotos[item.key]}
                          alt={item.label}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute bottom-1 right-1 bg-black/60 text-white text-[9px] px-1.5 py-0.5 rounded">
                          Tap to replace
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center py-2 text-[#2F3626]/60 group-hover:text-[#8B9A6E]">
                        <Camera className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-semibold">+ Tap to snap</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setCurrentStep('a')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#2F3626]/70 hover:text-[#2F3626]"
              >
                ← Back to Property
              </button>
              <button
                onClick={() => setCurrentStep('c')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Rate Categories</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP C: RATE CATEGORIES WITH 3D STARS ---------------- */}
        {currentStep === 'c' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider font-mono">
                STEP C: LIVING CATEGORY RATINGS
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                Rate Living Quality (1 to 5 Stars)
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                Tap the stars to set your honest rating for each category.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {[
                { key: 'water' as const, label: 'Water (Clean Borehole & Pumping)', desc: 'Is water clean and running 24/7 without rust or mud?' },
                { key: 'light' as const, label: 'Power / NEPA & Meter Accuracy', desc: 'Prepaid meter reliability and daily supply hours' },
                { key: 'security' as const, label: 'Security & Compound Gate', desc: 'Gate lock times, night vigilante, compound fence height' },
                { key: 'drainage' as const, label: 'Drainage & Flooding Resistance', desc: 'Does the compound or street flood during heavy July rain?' },
                { key: 'neighbours' as const, label: 'Neighbours & Peace', desc: 'Noise level, generator placement, compound hygiene' },
                { key: 'landlord' as const, label: 'Landlord & Caretaker Behavior', desc: 'Prompt repairs, fair notice, respectful conduct' },
                { key: 'valueForMoney' as const, label: 'Value for Money', desc: 'Was the rent worth the living experience?' },
              ].map((cat) => (
                <div
                  key={cat.key}
                  className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div>
                    <h4 className="font-bold text-sm text-[#2F3626]">{cat.label}</h4>
                    <p className="text-[11px] text-[#2F3626]/70">{cat.desc}</p>
                  </div>
                  <div className="shrink-0">
                    <StarRating3D
                      value={ratings[cat.key]}
                      onChange={(newVal) =>
                        setRatings((prev) => ({ ...prev, [cat.key]: newVal }))
                      }
                      size="md"
                      showScore
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setCurrentStep('b')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#2F3626]/70 hover:text-[#2F3626]"
              >
                ← Back to Photos
              </button>
              <button
                onClick={() => setCurrentStep('d')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Summary</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP D: VOICE NOTE & TEXT SUMMARY ---------------- */}
        {currentStep === 'd' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider font-mono">
                STEP D: WRITE OR RECORD VOICE NOTE
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                "What I Loved" & "What I Disliked"
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                You can type your experience or tap record to leave a 30-second audio note.
              </p>
            </div>

            {/* Voice Note Recorder Simulation */}
            <div className="p-4 rounded-2xl bg-[#EAE2D6]/50 border border-[#D8CEBE] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsRecording(!isRecording)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isRecording
                      ? 'bg-[#C4684A] text-white animate-pulse'
                      : 'bg-[#8B9A6E] text-white'
                  }`}
                >
                  <Mic className="w-5 h-5" />
                </button>
                <div>
                  <span className="font-bold text-xs text-[#2F3626] block">
                    {isRecording ? 'Recording Voice Note...' : 'Voice Note Attached (0:42)'}
                  </span>
                  <span className="text-[11px] text-[#2F3626]/60">
                    {isRecording ? 'Tap to finish recording' : 'Crystal clear tenant audio summary'}
                  </span>
                </div>
              </div>

              <span className="font-mono text-xs font-bold text-[#8B9A6E]">
                {voiceDuration}
              </span>
            </div>

            {/* What I Loved Input */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-[#6D7C52] block">
                💚 What I Loved (Clean borehole, friendly security, etc.):
              </label>
              <textarea
                rows={3}
                value={summaryLoved}
                onChange={(e) => setSummaryLoved(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              />
            </div>

            {/* What I Disliked Input */}
            <div className="space-y-1.5 text-xs">
              <label className="font-bold text-[#C4684A] block">
                ⚠️ What I Didn't Like (Flooding, sudden rent increment, caution deductions):
              </label>
              <textarea
                rows={3}
                value={summaryDisliked}
                onChange={(e) => setSummaryDisliked(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
              />
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setCurrentStep('c')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#2F3626]/70 hover:text-[#2F3626]"
              >
                ← Back to Ratings
              </button>
              <button
                onClick={() => setCurrentStep('e')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Financial Facts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP E: FINANCIAL FACTS ---------------- */}
        {currentStep === 'e' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider font-mono">
                STEP E: FINANCIAL FACTS
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                Add the True Numbers
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                Help house hunters benchmark agent fees and know if caution deposits are actually refunded.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">
                  Annual Rent Paid (₦)
                </label>
                <input
                  type="number"
                  value={rentPaid}
                  onChange={(e) => setRentPaid(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-mono font-bold text-sm text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">
                  Agent Fee Paid (₦)
                </label>
                <input
                  type="number"
                  value={agentFeePaid}
                  onChange={(e) => setAgentFeePaid(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-mono font-bold text-sm text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">
                  Caution Deposit Paid (₦)
                </label>
                <input
                  type="number"
                  value={cautionFee}
                  onChange={(e) => setCautionFee(Number(e.target.value))}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] font-mono font-bold text-sm text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                />
              </div>

              <div>
                <label className="font-bold block mb-1 text-[#2F3626]">
                  Was Caution Deposit Returned?
                </label>
                <select
                  value={depositReturned}
                  onChange={(e) => setDepositReturned(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-[#F7F2EB] border border-[#D8CEBE] text-xs font-bold text-[#2F3626] focus:outline-none focus:ring-1 focus:ring-[#8B9A6E]"
                >
                  <option value="yes">✓ Yes, returned in full</option>
                  <option value="partial">⚠ Partial refund with deductions</option>
                  <option value="no">✕ No, withheld unfairly</option>
                </select>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 p-3 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={wouldRentAgain}
                  onChange={(e) => setWouldRentAgain(e.target.checked)}
                  className="rounded text-[#8B9A6E] focus:ring-[#8B9A6E]"
                />
                <span className="font-bold text-[#2F3626]">
                  I would recommend this compound to a friend / rent here again
                </span>
              </label>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setCurrentStep('d')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#2F3626]/70 hover:text-[#2F3626]"
              >
                ← Back to Summary
              </button>
              <button
                onClick={() => setCurrentStep('f')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Tenancy Proof</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP F: PROOF OF TENANCY UPLOAD ---------------- */}
        {currentStep === 'f' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider font-mono">
                STEP F: PROOF OF TENANCY
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                Earn the "Verified Tenant" Badge
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                Upload any ONE document to prove you actually lived here (receipt, agreement, or power bill).
              </p>
            </div>

            <div className="space-y-3">
              {[
                { type: 'receipt', title: 'Rent Receipt / Bank Statement', desc: 'Shows payment to landlord or caretaker' },
                { type: 'agreement', title: 'Tenancy Agreement Document', desc: 'First or signature page with compound address' },
                { type: 'geotag', title: 'Geotagged Photo at Compound Gate', desc: 'Metadata matches Uyo GPS location automatically' },
              ].map((opt) => (
                <div
                  key={opt.type}
                  onClick={() => setProofType(opt.type as any)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                    proofType === opt.type
                      ? 'border-[#8B9A6E] bg-[#F2F6ED]'
                      : 'border-[#EAE2D6] bg-[#F7F2EB] hover:bg-white'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#2F3626]">{opt.title}</h4>
                    <p className="text-[11px] text-[#2F3626]/70">{opt.desc}</p>
                  </div>
                  {proofType === opt.type && (
                    <CheckCircle2 className="w-5 h-5 text-[#8B9A6E]" />
                  )}
                </div>
              ))}
            </div>

            {/* Document Upload Dropzone */}
            <div className="p-6 rounded-2xl border-2 border-dashed border-[#8B9A6E] bg-[#F7F2EB] text-center space-y-2">
              <FileText className="w-8 h-8 text-[#8B9A6E] mx-auto" />
              <p className="text-xs font-bold text-[#2F3626]">
                Tenancy_Receipt_Elder_Okon.jpg attached (420 KB)
              </p>
              <p className="text-[11px] text-[#2F3626]/60">
                Documents are encrypted and never shown publicly to protect your privacy.
              </p>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setCurrentStep('e')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#2F3626]/70 hover:text-[#2F3626]"
              >
                ← Back to Facts
              </button>
              <button
                onClick={() => setCurrentStep('g')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Preview Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP G: PREVIEW AND SUBMIT ---------------- */}
        {currentStep === 'g' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE2D6] shadow-sm space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#8B9A6E] uppercase tracking-wider font-mono">
                STEP G: PREVIEW REVIEW
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#2F3626]">
                Review Before Publishing
              </h2>
              <p className="text-xs text-[#2F3626]/70">
                This is how your move-out review will appear to Uyo house hunters.
              </p>
            </div>

            {/* Preview Card */}
            <div className="p-5 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#2F3626]">{address}</h3>
                  <p className="text-xs text-[#2F3626]/70">{area} • {propertyType}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-[#8B9A6E] text-white text-[10px] font-bold">
                  Verified Tenant Review
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="p-2 bg-white rounded-xl">
                  <span className="text-[10px] text-[#2F3626]/60 block">Rent</span>
                  <span className="font-bold">₦{rentPaid.toLocaleString()}/yr</span>
                </div>
                <div className="p-2 bg-white rounded-xl">
                  <span className="text-[10px] text-[#2F3626]/60 block">Water Rating</span>
                  <span className="font-bold text-[#8B9A6E]">5.0 / 5.0</span>
                </div>
                <div className="p-2 bg-white rounded-xl">
                  <span className="text-[10px] text-[#2F3626]/60 block">Deposit Return</span>
                  <span className="font-bold text-[#8B9A6E]">Yes, Full</span>
                </div>
              </div>

              <p className="text-xs text-[#2F3626]/85 italic bg-white p-3 rounded-xl border border-[#EAE2D6]">
                "{summaryLoved}"
              </p>
            </div>

            <div className="pt-2 flex justify-between">
              <button
                onClick={() => setCurrentStep('f')}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-[#2F3626]/70 hover:text-[#2F3626]"
              >
                ← Back to Edit
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#8B9A6E] to-[#6D7C52] text-white font-bold text-sm shadow-xl hover:scale-102 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-[#F3CD6D]" />
                <span>Submit Review & Claim 150 Points</span>
              </button>
            </div>
          </div>
        )}

        {/* ---------------- STEP H: SUCCESS CONFIRMATION & BADGE ANIMATION ---------------- */}
        {currentStep === 'h' && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#EAE2D6] shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-500">
            {/* Animated 3D Verified Shield Badge */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#8B9A6E] via-[#6D7C52] to-[#4F5B39] mx-auto flex items-center justify-center text-white shadow-[0_10px_25px_rgba(139,154,110,0.5)] border-4 border-white animate-bounce">
              <Award className="w-12 h-12 text-[#F3CD6D]" />
            </div>

            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-[#8B9A6E]/15 text-[#6D7C52] text-xs font-extrabold uppercase tracking-wider">
                🎉 REVIEW PUBLISHED & VERIFIED
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#2F3626]">
                You're Now a Trusted Reviewer!
              </h2>
              <p className="text-xs sm:text-sm text-[#2F3626]/80 max-w-md mx-auto leading-relaxed">
                Thank you, Bassey! Your honest move-out review has been recorded on the Uyo community ledger. You just earned <strong>150 points</strong>.
              </p>
            </div>

            {/* Points & Airtime Voucher Card */}
            <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] max-w-sm mx-auto flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-[#2F3626]/60 font-semibold block uppercase">
                  Current Balance
                </span>
                <span className="font-heading font-black text-xl text-[#8B9A6E]">
                  420 Points
                </span>
              </div>
              <button
                onClick={() => onNavigate('rewards')}
                className="px-4 py-2 rounded-xl bg-[#8B9A6E] text-white font-bold hover:bg-[#6D7C52] transition-colors"
              >
                Redeem ₦1,000 Airtime →
              </button>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={() => onNavigate('feed')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] text-white font-bold text-xs shadow hover:bg-[#6D7C52] transition-all cursor-pointer"
              >
                Go to Home Feed
              </button>
              <button
                onClick={() => onNavigate('profile')}
                className="px-6 py-3 rounded-2xl bg-[#EAE2D6] text-[#2F3626] font-bold text-xs hover:bg-[#D8CEBE] transition-all"
              >
                View on My Profile
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
