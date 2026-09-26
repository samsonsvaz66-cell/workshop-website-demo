import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

/**
 * Checks whether a string is an unconfigured client/demo placeholder (starts and ends with square brackets).
 */
const isPlaceholder = (value) => {
  if (!value || typeof value !== 'string') return true;
  const trimmed = value.trim();
  return trimmed.startsWith('[') && trimmed.endsWith(']');
};

/**
 * Determines whether an FAQ object contains authentic, client-approved Q&A copy
 * rather than demo/placeholder structural text.
 */
const isValidFAQ = (item) => {
  if (!item || typeof item !== 'object') return false;
  if (!item.question || isPlaceholder(item.question)) return false;
  if (!item.answer || isPlaceholder(item.answer)) return false;
  return true;
};

/**
 * FAQSection Component
 * 
 * Provides an accessible accordion of Frequently Asked Questions for the workshop.
 * Features:
 * - Reads faqs from workshopData.js without duplicating or hardcoding content.
 * - Filters out placeholder structural templates to prevent displaying unconfirmed client claims.
 * - Displays a polished, intentional empty state when no verified FAQs exist yet.
 * - Fully accessible accordion with native buttons, aria-expanded, aria-controls, and keyboard navigation.
 * - Smooth CSS-grid transition with subtle chevron rotation.
 */
export const FAQSection = ({ data }) => {
  const rawList = data?.faqs || [];
  const validFaqs = rawList.filter(isValidFAQ);
  const hasValidFaqs = validFaqs.length > 0;

  // Single-item active accordion state (null means all items collapsed)
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleItem = (index) => {
    setActiveIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-border-subtle bg-surface-base transition-colors duration-200"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500 font-headline">
            Frequently Asked Questions
          </span>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-headline font-bold text-content-primary tracking-tight"
          >
            Questions, Answered
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
            Find clear answers about the workshop, registration, schedule, and participation.
          </p>
        </header>

        {/* Dynamic Content: Real Accordion Items or Polished Empty State */}
        {hasValidFaqs ? (
          <div className="max-w-3xl mx-auto space-y-3.5">
            {validFaqs.map((item, index) => {
              const isOpen = activeIndex === index;
              const itemId = item.id || `faq-item-${index}`;
              const questionId = `faq-question-${itemId}`;
              const answerId = `faq-answer-${itemId}`;

              return (
                <article
                  key={itemId}
                  className="rounded-2xl bg-surface-raised border border-border-subtle hover:border-border-active transition-all duration-200 overflow-hidden shadow-sm"
                >
                  <button
                    type="button"
                    id={questionId}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => toggleItem(index)}
                    className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left font-headline font-semibold text-content-primary hover:text-brand-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 transition-colors select-none"
                  >
                    <span className="text-sm sm:text-base leading-snug">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-brand-500 shrink-0 transition-transform duration-200 ease-in-out ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  {/* Accessible smooth CSS grid transition panel */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    className={`grid transition-all duration-200 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100'
                        : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-content-secondary leading-relaxed border-t border-border-subtle/50 mt-1">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Polished, intentional empty state */
          <div className="max-w-xl mx-auto">
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-raised border border-dashed border-border-subtle text-center space-y-3 shadow-sm select-none">
              <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center mx-auto text-brand-500 shadow-sm mb-3">
                <HelpCircle className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-base sm:text-lg font-headline font-bold text-content-primary tracking-tight">
                Workshop FAQs coming soon
              </h3>
              <p className="text-xs sm:text-sm text-content-secondary max-w-md mx-auto leading-relaxed">
                Confirmed workshop details regarding participation checklist, materials, and admissions will appear here once approved.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-surface-elevated border border-border-subtle text-content-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" aria-hidden="true" />
                  <span>Curating Session Guidance</span>
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default FAQSection;
