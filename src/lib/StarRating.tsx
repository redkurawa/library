import { useState } from 'react';
import { Star } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

type Props = {
  max?: number;
  value?: number;
  onChange?: (rating: number) => void;
  className?: string;
};

export default function StarRating({
  max = 5,
  value = 0,
  onChange,
  className,
}: Props) {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleClick = (rating: number) => {
    onChange?.(rating);
  };

  return (
    <div className={twMerge('flex gap-1', className)}>
      {Array.from({ length: max }, (_, i) => {
        const index = i + 1;
        const isFilled = hovered !== null ? index <= hovered : index <= value;

        return (
          <button
            key={index}
            type='button'
            onClick={() => handleClick(index)}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className='transition-transform hover:scale-110'
            aria-label={`Rate ${index} star`}
          >
            <Star
              size={24}
              className={twMerge(
                'stroke-yellow-400',
                isFilled ? 'fill-yellow-400' : 'fill-transparent'
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
