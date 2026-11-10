import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface StarRating3DProps {
  value: number; // 0 to 5
  onChange?: (val: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showScore?: boolean;
}

export const StarRating3D: React.FC<StarRating3DProps> = ({
  value,
  onChange,
  size = 'md',
  readonly = false,
  showScore = false,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const starSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const activeVal = hoverValue !== null ? hoverValue : value;

  return (
    <div className="inline-flex items-center gap-1.5 select-none">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = activeVal >= starIndex;
          const isHalf = !isFilled && activeVal >= starIndex - 0.5;

          return (
            <button
              key={starIndex}
              type="button"
              disabled={readonly}
              onMouseEnter={() => !readonly && setHoverValue(starIndex)}
              onMouseLeave={() => !readonly && setHoverValue(null)}
              onClick={() => !readonly && onChange && onChange(starIndex)}
              className={`relative transition-all duration-200 focus:outline-none ${
                readonly ? 'cursor-default' : 'cursor-pointer hover:scale-115 active:scale-95'
              }`}
            >
              <div
                className={`p-0.5 rounded-md transition-shadow ${
                  isFilled
                    ? 'drop-shadow-[0_2px_4px_rgba(243,205,109,0.5)]'
                    : 'drop-shadow-none'
                }`}
              >
                <Star
                  className={`${starSizeClasses[size]} transition-colors duration-150 ${
                    isFilled
                      ? 'text-[#F3CD6D] fill-[#F3CD6D]'
                      : isHalf
                      ? 'text-[#F3CD6D] fill-[#F3CD6D]/50'
                      : 'text-[#D8CEBE] fill-[#EEEEEE]'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>

      {showScore && (
        <span className="text-xs font-bold text-[#2F3626] font-mono ml-1">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};
