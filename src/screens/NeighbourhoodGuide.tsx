import React, { useState } from 'react';
import {
  MapPin,
  Waves,
  Zap,
  Droplets,
  Shield,
  TrendingUp,
  GraduationCap,
  Car,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { MOCK_NEIGHBOURHOODS } from '../data/mockData';

interface NeighbourhoodGuideProps {
  onNavigate: (screen: string, param?: string) => void;
}

export const NeighbourhoodGuide: React.FC<NeighbourhoodGuideProps> = ({ onNavigate }) => {
  const [selectedId, setSelectedId] = useState(MOCK_NEIGHBOURHOODS[0].id);
  const selectedArea =
    MOCK_NEIGHBOURHOODS.find((n) => n.id === selectedId) || MOCK_NEIGHBOURHOODS[0];

  return (
    <div className="min-h-screen bg-[#F7F2EB] text-[#2F3626] pb-24 md:pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B9A6E]">
            Uyo Living & Housing Insights
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#2F3626]">
            Neighbourhood Guides
          </h1>
          <p className="text-xs sm:text-sm text-[#2F3626]/75 mt-1">
            Unbiased community data on flooding risk, clean borehole water, power supply hours, and typical rent.
          </p>
        </div>

        {/* Area Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {MOCK_NEIGHBOURHOODS.map((area) => (
            <button
              key={area.id}
              onClick={() => setSelectedId(area.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedId === area.id
                  ? 'bg-[#8B9A6E] text-white shadow-md'
                  : 'bg-white border border-[#D8CEBE] text-[#2F3626] hover:bg-[#EAE2D6]'
              }`}
            >
              {area.name}
            </button>
          ))}
        </div>

        {/* Selected Area Deep-Dive Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#EAE2D6] shadow-sm">
          <div className="relative h-64 sm:h-80 w-full overflow-hidden">
            <img
              src={selectedArea.image}
              alt={selectedArea.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
              <span className="px-3 py-1 rounded-full bg-[#8B9A6E] text-xs font-bold">
                {selectedArea.reviewCount} Verified Move-Out Reviews
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white">
                {selectedArea.name}
              </h2>
              <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
                {selectedArea.description}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* 4 Pillars Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Flood Risk */}
              <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2F3626]/70 uppercase">Flood Risk</span>
                  <Waves className="w-4 h-4 text-[#C4684A]" />
                </div>
                <p
                  className={`font-heading font-extrabold text-xl ${
                    selectedArea.floodRisk === 'Low'
                      ? 'text-[#8B9A6E]'
                      : selectedArea.floodRisk === 'Moderate'
                      ? 'text-[#F3CD6D]'
                      : 'text-[#C4684A]'
                  }`}
                >
                  {selectedArea.floodRisk}
                </p>
                <p className="text-[11px] text-[#2F3626]/75 leading-tight">
                  {selectedArea.floodRiskNote}
                </p>
              </div>

              {/* Power Supply */}
              <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2F3626]/70 uppercase">Power Hours</span>
                  <Zap className="w-4 h-4 text-[#F3CD6D]" />
                </div>
                <p className="font-heading font-extrabold text-xl text-[#2F3626]">
                  {selectedArea.powerRating.split('(')[0]}
                </p>
                <p className="text-[11px] text-[#2F3626]/75 leading-tight">
                  {selectedArea.powerRating}
                </p>
              </div>

              {/* Water Quality */}
              <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2F3626]/70 uppercase">Water Source</span>
                  <Droplets className="w-4 h-4 text-[#8B9A6E]" />
                </div>
                <p className="font-heading font-extrabold text-lg text-[#2F3626]">
                  Borehole
                </p>
                <p className="text-[11px] text-[#2F3626]/75 leading-tight">
                  {selectedArea.waterQuality}
                </p>
              </div>

              {/* Security Level */}
              <div className="p-4 rounded-2xl bg-[#F7F2EB] border border-[#EAE2D6] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#2F3626]/70 uppercase">Security</span>
                  <Shield className="w-4 h-4 text-[#8B9A6E]" />
                </div>
                <p className="font-heading font-extrabold text-lg text-[#2F3626]">
                  Community Vigil
                </p>
                <p className="text-[11px] text-[#2F3626]/75 leading-tight">
                  {selectedArea.securityRating}
                </p>
              </div>
            </div>

            {/* Average Rent Benchmarks */}
            <div className="p-6 rounded-3xl bg-[#EAE2D6]/40 border border-[#D8CEBE] space-y-4">
              <h3 className="font-heading font-bold text-lg text-[#2F3626] flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#8B9A6E]" />
                <span>Typical Yearly Rent Benchmarks in {selectedArea.name}</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#D8CEBE]">
                  <span className="text-xs text-[#2F3626]/60 font-semibold block">
                    Self-Contain / Mini Flat
                  </span>
                  <span className="font-heading font-extrabold text-2xl text-[#2F3626]">
                    ₦{(selectedArea.averageRentSelfCon / 1000).toFixed(0)},000
                    <span className="text-xs font-normal text-[#2F3626]/60"> / year</span>
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#D8CEBE]">
                  <span className="text-xs text-[#2F3626]/60 font-semibold block">
                    2-Bedroom Standard Flat
                  </span>
                  <span className="font-heading font-extrabold text-2xl text-[#8B9A6E]">
                    ₦{(selectedArea.averageRent2Bed / 1000).toFixed(0)},000
                    <span className="text-xs font-normal text-[#2F3626]/60"> / year</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-xs">
                <span className="text-[#2F3626]/70">
                  🚗 Commute note: <strong>{selectedArea.commuteNote}</strong>
                </span>
                <button
                  onClick={() => onNavigate('fee_benchmark')}
                  className="font-bold text-[#8B9A6E] hover:underline"
                >
                  Check Agent Fees for {selectedArea.name} →
                </button>
              </div>
            </div>

            {/* CTA to view properties in this area */}
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onNavigate('search')}
                className="px-6 py-3 rounded-2xl bg-[#8B9A6E] hover:bg-[#6D7C52] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Browse Flats in {selectedArea.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
