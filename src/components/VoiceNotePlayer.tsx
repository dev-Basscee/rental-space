import React, { useState, useEffect } from 'react';
import { Play, Pause, Mic, Volume2 } from 'lucide-react';

interface VoiceNotePlayerProps {
  duration?: string;
  authorName?: string;
  className?: string;
}

export const VoiceNotePlayer: React.FC<VoiceNotePlayerProps> = ({
  duration = '0:42',
  authorName = 'Outgoing Tenant Voice Note',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0); // 0 to 100
  const [playbackRate, setPlaybackRate] = useState<1 | 1.5 | 2>(1);

  // Waveform heights
  const bars = [18, 28, 42, 65, 30, 80, 95, 40, 60, 85, 100, 75, 45, 90, 60, 35, 70, 85, 50, 65, 90, 70, 45, 30, 60, 40, 20];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 2 * playbackRate;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate]);

  const toggleRate = () => {
    if (playbackRate === 1) setPlaybackRate(1.5);
    else if (playbackRate === 1.5) setPlaybackRate(2);
    else setPlaybackRate(1);
  };

  return (
    <div className={`bg-[#EAE2D6] rounded-2xl p-3 border border-[#D8CEBE] shadow-sm ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2F3626]">
          <Mic className="w-3.5 h-3.5 text-[#8B9A6E]" />
          <span>{authorName}</span>
        </div>
        <button
          onClick={toggleRate}
          className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/80 hover:bg-white text-[#2F3626] transition-colors"
        >
          {playbackRate}x
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Play / Pause button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-10 h-10 rounded-full bg-[#8B9A6E] hover:bg-[#6D7C52] text-white flex items-center justify-center shrink-0 shadow-md transition-all active:scale-95"
          aria-label={isPlaying ? 'Pause voice note' : 'Play voice note'}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current translate-x-0.5" />}
        </button>

        {/* Interactive Waveform Bar Visualizer */}
        <div
          className="flex-1 flex items-center gap-[3px] h-10 cursor-pointer overflow-hidden py-1"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            setPlaybackProgress(Math.min(100, Math.max(0, pos * 100)));
          }}
        >
          {bars.map((height, idx) => {
            const barProgress = (idx / bars.length) * 100;
            const isPlayed = barProgress <= playbackProgress;
            return (
              <div
                key={idx}
                style={{ height: `${height}%` }}
                className={`w-1.5 rounded-full transition-all duration-150 ${
                  isPlayed
                    ? 'bg-[#8B9A6E]'
                    : 'bg-[#D8CEBE] hover:bg-[#8B9A6E]/50'
                }`}
              />
            );
          })}
        </div>

        {/* Time Display */}
        <div className="text-[11px] font-mono font-medium text-[#2F3626]/80 shrink-0">
          {isPlaying
            ? `0:${Math.floor((playbackProgress / 100) * 42).toString().padStart(2, '0')}`
            : duration}
        </div>
      </div>
    </div>
  );
};
