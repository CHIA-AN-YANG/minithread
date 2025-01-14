import React, { useEffect, useRef, useState } from 'react';

interface TextDisplayProps {
  text: string;
  maxHeight: number;
  onIconClick?: () => void;
}

const TextDisplay: React.FC<TextDisplayProps> = ({ text, maxHeight, onIconClick }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current && containerRef.current) {
      const isTextOverflowing =
        textRef.current.scrollHeight > containerRef.current.clientHeight;
      setIsOverflowing(isTextOverflowing);
    }
  }, [text]);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded && onIconClick) {
      onIconClick();
    }
  };

  return (
    <div
      ref={containerRef}
      className={`h-[${maxHeight}px] z-[100] overflow-hidden relative m-2`}
      style={{ maxHeight: maxHeight }}
    >
      <p
        ref={textRef}
        className='text-gray-800 leading-5'
      >
        {text}
      </p>
      {isOverflowing && (
        <p className='bg-gray-300/75 hover:bg-gray-300 text-lg font-bold px-1.5 leading-none align-middle 
            absolute right-1 rounded-md cursor-pointer'
          style={{ top: `${maxHeight - 21}px` }}
          onClick={handleClick}
        >・・・</p>
      )}
    </div>
  );
};

export default TextDisplay;
