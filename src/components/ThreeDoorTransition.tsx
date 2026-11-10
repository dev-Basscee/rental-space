import React, { useState, useEffect } from 'react';
import { DoorClosed, Sparkles, ArrowRight, X } from 'lucide-react';

interface ThreeDoorTransitionProps {
  isOpen: boolean;
  onComplete: () => void;
  onCancel?: () => void;
}

export type DoorState = 'closed' | 'opening' | 'walking' | 'arrival';

export const ThreeDoorTransition: React.FC<ThreeDoorTransitionProps> = ({
  isOpen,
  onComplete,
  onCancel,
}) => {
  const [doorState, setDoorState] = useState<DoorState>('closed');
  const [manualScrubMode, setManualScrubMode] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setDoorState('closed');
      return;
    }

    if (manualScrubMode) return;

    // Sequence automatically
    setDoorState('closed');
    const timer1 = setTimeout(() => {
      setDoorState('opening');
    }, 450);

    const timer2 = setTimeout(() => {
      setDoorState('walking');
    }, 1800);

    const timer3 = setTimeout(() => {
      setDoorState('arrival');
    }, 2900);

    const timer4 = setTimeout(() => {
      onComplete();
    }, 3600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isOpen, manualScrubMode, onComplete]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#2F3626]/95 backdrop-blur-xl overflow-hidden transition-all duration-700">
      {/* Top action controls: Skip & State Explorer */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-40 text-[#F7F2EB]">
        <div className="flex items-center gap-2 bg-[#2F3626]/80 border border-[#8B9A6E]/40 px-3 py-1.5 rounded-full text-xs">
          <Sparkles className="w-4 h-4 text-[#8B9A6E]" />
          <span className="font-medium">3D Door Transition Experience</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setManualScrubMode(!manualScrubMode)}
            className="px-3 py-1.5 text-xs font-medium rounded-full bg-[#EAE2D6]/20 hover:bg-[#EAE2D6]/30 text-[#F7F2EB] transition-colors"
          >
            {manualScrubMode ? 'Auto Play' : 'Inspect States'}
          </button>
          <button
            onClick={onComplete}
            className="px-4 py-1.5 text-xs font-semibold rounded-full bg-[#8B9A6E] hover:bg-[#8B9A6E]/90 text-white transition-all shadow-md flex items-center gap-1.5"
          >
            <span>Skip to Feed</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          {onCancel && (
            <button
              onClick={onCancel}
              className="p-1.5 text-[#F7F2EB]/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive State Tabs if manual inspect mode is active */}
      {manualScrubMode && (
        <div className="absolute top-16 z-40 flex items-center gap-2 bg-[#2F3626]/90 border border-[#8B9A6E]/50 p-1.5 rounded-2xl">
          {(['closed', 'opening', 'walking', 'arrival'] as DoorState[]).map((st) => (
            <button
              key={st}
              onClick={() => setDoorState(st)}
              className={`px-3 py-1 text-xs rounded-xl font-medium transition-all ${
                doorState === st
                  ? 'bg-[#8B9A6E] text-white shadow-sm'
                  : 'text-[#EAE2D6]/70 hover:text-white'
              }`}
            >
              {st === 'closed' && '1. Closed Door'}
              {st === 'opening' && '2. Door Opening'}
              {st === 'walking' && '3. Walking Through'}
              {st === 'arrival' && '4. Arrival in Feed'}
            </button>
          ))}
        </div>
      )}

      {/* 3D Scene Wrapper with Perspective */}
      <div className="relative w-full max-w-md h-[560px] perspective-1000 flex items-center justify-center">
        
        {/* Background Warm Light Beam from doorway */}
        <div
          className={`absolute w-96 h-[500px] rounded-full bg-gradient-to-t from-[#F7F2EB] via-[#EAE2D6] to-[#8B9A6E]/40 blur-3xl transition-all duration-1000 pointer-events-none ${
            doorState === 'closed'
              ? 'opacity-0 scale-50'
              : doorState === 'opening'
              ? 'opacity-70 scale-100'
              : doorState === 'walking'
              ? 'opacity-95 scale-150'
              : 'opacity-100 scale-200'
          }`}
        />

        {/* Outer Stone / Sand Doorframe */}
        <div
          className={`relative w-72 h-[460px] bg-[#EAE2D6] rounded-t-[140px] p-3 shadow-2xl border-4 border-[#D8CEBE] transform-style-3d transition-all duration-1000 ${
            doorState === 'walking' ? 'scale-125 translate-z-40 opacity-80' : ''
          } ${doorState === 'arrival' ? 'scale-150 opacity-0' : ''}`}
        >
          {/* Engraved archway header */}
          <div className="text-center pt-3 pb-1 border-b border-[#D8CEBE]/70">
            <span className="text-[10px] tracking-widest uppercase font-mono font-bold text-[#6D7C52]">
              UYO COMMUNITY ARCHWAY • AKS 01
            </span>
          </div>

          {/* Door Reveal Chamber */}
          <div className="relative w-full h-[400px] bg-[#2F3626] rounded-t-[120px] overflow-hidden flex items-center justify-center">
            
            {/* Interior glow shining out */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5E6] via-[#F7F2EB] to-[#8B9A6E]/50 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-[#8B9A6E] flex items-center justify-center text-white mb-3 shadow-lg animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-[#2F3626] text-xl">
                Welcome to RentTruth
              </h3>
              <p className="text-xs text-[#2F3626]/80 mt-1 max-w-[180px]">
                Entering honest reviews and verified homes in Uyo...
              </p>
            </div>

            {/* 3D Door Leaf (Swings open on left hinge) */}
            <div
              style={{
                transformOrigin: 'left center',
                transform:
                  doorState === 'closed'
                    ? 'rotateY(0deg)'
                    : doorState === 'opening'
                    ? 'rotateY(-78deg)'
                    : doorState === 'walking'
                    ? 'rotateY(-95deg) translateZ(40px)'
                    : 'rotateY(-110deg) translateZ(80px)',
              }}
              className="absolute inset-0 bg-gradient-to-br from-[#A0522D] via-[#8B4513] to-[#5C2E0B] rounded-t-[120px] shadow-2xl transition-transform duration-1000 ease-out border-2 border-[#D2691E]/30 p-4 flex flex-col justify-between transform-style-3d cursor-pointer"
              onClick={() => {
                if (doorState === 'closed') setDoorState('opening');
                else setDoorState('closed');
              }}
            >
              {/* Door Carving Panels */}
              <div className="space-y-4 pt-8">
                {/* Upper Carved Arch */}
                <div className="w-full h-24 rounded-t-full border-2 border-[#D2691E]/40 bg-[#000000]/15 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-[#F3CD6D]/60 flex items-center justify-center text-[#F3CD6D] shadow-inner">
                    <DoorClosed className="w-5 h-5 opacity-90" />
                  </div>
                </div>

                {/* Middle Carved Panel with Door Knocker */}
                <div className="relative w-full h-24 rounded-xl border-2 border-[#D2691E]/40 bg-[#000000]/15 flex items-center justify-center">
                  {/* Brass Lion / Ring Knocker */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFE082] to-[#B78103] shadow-md flex items-center justify-center border border-[#FFF8E1]">
                    <div className="w-5 h-5 rounded-full border-2 border-[#5C2E0B]" />
                  </div>
                  {/* Brass Door Handle */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-12 bg-gradient-to-r from-[#FFF59D] to-[#D4A017] rounded-full shadow-lg border border-[#FFF9C4]" />
                </div>

                {/* Bottom Carved Panel */}
                <div className="w-full h-20 rounded-xl border-2 border-[#D2691E]/40 bg-[#000000]/15" />
              </div>

              {/* Door Bottom Plate */}
              <div className="h-3 bg-[#FFE082]/70 rounded-full shadow-inner" />
            </div>
          </div>
        </div>

        {/* Floor Light Beam Reflection */}
        <div
          className={`absolute -bottom-16 w-80 h-32 bg-gradient-to-t from-transparent via-[#FFF1D0]/30 to-[#FFE082]/50 rounded-full blur-xl transform -rotate-x-60 transition-all duration-700 ${
            doorState === 'closed' ? 'opacity-0 scale-50' : 'opacity-80 scale-125'
          }`}
        />
      </div>

      {/* Frame Status Sub-caption & Guide */}
      <div className="absolute bottom-6 left-0 right-0 text-center text-[#F7F2EB] pointer-events-none">
        <p className="text-sm font-semibold tracking-wide">
          {doorState === 'closed' && 'Step 1: Front Door Closed — Tap to Unlock'}
          {doorState === 'opening' && 'Step 2: Door Swings Open — Light Spills Out'}
          {doorState === 'walking' && 'Step 3: Stepping through into Akwa Ibom Communities...'}
          {doorState === 'arrival' && 'Step 4: Arrived! Welcome to the Home Feed'}
        </p>
        <p className="text-xs text-[#EAE2D6]/60 mt-1">
          Designed with 3D perspective & warm lighting
        </p>
      </div>
    </div>
  );
};
