import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

/**
 * ExpandableText component
 * Displays ~2-3 lines initially, with a clean "Read more / Read less" toggle.
 */
export const ExpandableText = ({
  text,
  fullText,
  lineClampClass = 'line-clamp-3',
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // If fullText is provided, use it when expanded; otherwise toggle clamp
  const displayText = isExpanded && fullText ? fullText : text;

  return (
    <div className={`space-y-1.5 ${className}`}>
      <p
        className={`text-content-secondary leading-relaxed text-sm sm:text-base transition-all duration-200 ${
          !isExpanded && !fullText ? lineClampClass : ''
        }`}
      >
        {displayText}
      </p>
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-500 hover:text-brand-400 focus:outline-none transition-colors"
        aria-expanded={isExpanded}
      >
        {isExpanded ? (
          <>
            <span>Show less</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </>
        ) : (
          <>
            <span>Read more</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </>
        )}
      </button>
    </div>
  );
};

export default ExpandableText;
