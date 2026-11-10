import React, { useState } from 'react';
import { RefreshCw, AlertCircle, CheckCircle2, Eye } from 'lucide-react';

interface OrderedVsGotCardProps {
  agentPhoto?: string;
  realPhoto?: string;
  propertyTitle?: string;
  location?: string;
  note?: string;
  className?: string;
}

export const OrderedVsGotCard: React.FC<OrderedVsGotCardProps> = ({
  agentPhoto = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  realPhoto = 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  propertyTitle = '2-Bedroom Flat in Ikot Ekpene Road',
  location = 'Ikot Ekpene Road, Uyo',
  note = 'Agent posted dry sunny photos taken in January harmattan. In reality, the compound gutter overflows into the front porch whenever it rains for 2 hours in July.',
  className = '',
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      {/* Header and Toggle Controls */}
      <div className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C4684A] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-[#2F3626]">
            Ordered vs. Got Reality Check
          </span>
        </div>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="text-xs font-medium text-[#8B9A6E] hover:text-[#6D7C52] flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EAE2D6]/60 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 transition-transform duration-500 ${isFlipped ? 'rotate-180' : ''}`} />
          <span>Flip to {isFlipped ? 'Agent Photo' : 'Real Move-Out'}</span>
        </button>
      </div>

      {/* 3D Flip Card Container */}
      <div
        className="relative w-full h-[320px] sm:h-[350px] perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`relative w-full h-full transition-transform duration-700 transform-style-3d rounded-3xl shadow-md border border-[#EAE2D6] overflow-hidden ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
        >
          {/* FRONT SIDE: What the Agent Listed ("What I Ordered") */}
          <div className="absolute inset-0 w-full h-full backface-hidden bg-[#EAE2D6] rounded-3xl overflow-hidden flex flex-col">
            <div className="relative flex-1 overflow-hidden">
              <img
                src={agentPhoto}
                alt="Agent listing"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#2F3626]/80 text-[#F7F2EB] backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
                <Eye className="w-3.5 h-3.5 text-[#F3CD6D]" />
                <span>What I Ordered (Agent Listing)</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-white/90 text-[#2F3626] backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-medium shadow-sm">
                Wide-angle lens • Staged
              </div>
            </div>
            
            <div className="p-3.5 bg-white flex items-center justify-between">
              <div>
                <p className="text-xs text-[#2F3626]/70">Advertised in WhatsApp group</p>
                <p className="text-sm font-bold text-[#2F3626]">{propertyTitle}</p>
              </div>
              <span className="text-xs font-semibold text-[#8B9A6E] bg-[#8B9A6E]/10 px-2.5 py-1 rounded-full">
                Tap to Flip 🔄
              </span>
            </div>
          </div>

          {/* BACK SIDE: What the Tenant Actually Got ("What I Got") */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-[#F7F2EB] rounded-3xl overflow-hidden flex flex-col border-2 border-[#C4684A]/30">
            <div className="relative flex-1 overflow-hidden">
              <img
                src={realPhoto}
                alt="Real tenant move-out photo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#C4684A] text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>What I Got (Tenant Reality)</span>
              </div>
              <div className="absolute bottom-3 right-3 bg-[#2F3626]/80 text-white backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-medium shadow-sm">
                Taken during July rains • Unfiltered
              </div>
            </div>

            <div className="p-3.5 bg-[#FFF8F6] border-t border-[#C4684A]/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-[#C4684A] shrink-0 mt-0.5" />
                <p className="text-xs text-[#2F3626] leading-relaxed">
                  {note}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-[11px] text-center text-[#2F3626]/60 mt-1.5">
        Tap the card to rotate 180° in 3D and see the unedited tenant photo
      </p>
    </div>
  );
};
