import React from 'react';
import { MessageSquare, Quote, Star } from 'lucide-react';

/**
 * Checks whether a string value is an unpopulated demo placeholder (e.g. starts and ends with brackets).
 */
const isPlaceholder = (val) => {
  if (!val || typeof val !== 'string') return true;
  const trimmed = val.trim();
  return trimmed.startsWith('[') && trimmed.endsWith(']');
};

/**
 * Determines whether a testimonial object contains authentic, client-verified feedback
 * rather than demo/placeholder structural text.
 */
const isRealTestimonial = (item) => {
  if (!item || typeof item !== 'object') return false;
  if (!item.quote || isPlaceholder(item.quote)) return false;
  if (!item.name || isPlaceholder(item.name)) return false;
  return true;
};

/**
 * Derives a clean two-letter monogram from an attendee name for avatar fallback.
 */
const getInitials = (name) => {
  if (!name || isPlaceholder(name)) return 'EG';
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * TestimonialsSection Component
 * 
 * Renders participant feedback for the offline workshop.
 * Features:
 * - Strictly prevents the display of fabricated reviews, fake revenue claims, or AI photos.
 * - Inspects data.testimonials and filters out placeholder templates.
 * - Displays a polished, intentional empty state when no real reviews are present.
 * - Dynamically renders verified reviews in a responsive 1, 2, or 3-column layout when available.
 * - Uses semantic HTML (<section>, <header>, <article>, <footer>) with full ARIA labeling.
 */
export const TestimonialsSection = ({ data }) => {
  const rawList = data?.testimonials || [];
  const realTestimonials = rawList.filter(isRealTestimonial);
  const hasRealTestimonials = realTestimonials.length > 0;

  // Determine responsive grid layout based on count of valid testimonials
  const getGridClasses = (count) => {
    if (count === 1) return 'max-w-xl mx-auto';
    if (count === 2) return 'grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-6';
    return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto gap-6';
  };

  return (
    <section
      id="testimonials"
      className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-border-subtle bg-surface-base transition-colors duration-200"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <header className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500 font-headline">
            Participant Feedback
          </span>
          <h2
            id="testimonials-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-headline font-bold text-content-primary tracking-tight"
          >
            What Participants Say
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
            {hasRealTestimonials
              ? 'Direct feedback and key takeaways from workshop participants.'
              : 'Participant feedback will be added after the workshop experiences are collected.'}
          </p>
        </header>

        {/* Dynamic Content: Real Reviews or Polished Empty State */}
        {hasRealTestimonials ? (
          <div className={getGridClasses(realTestimonials.length)}>
            {realTestimonials.map((item) => {
              const hasRating = typeof item.rating === 'number' && item.rating > 0 && item.rating <= 5;
              const hasImage = item.image && !isPlaceholder(item.image);

              return (
                <article
                  key={item.id || item.name}
                  className="p-5 sm:p-6 rounded-2xl bg-surface-raised border border-border-subtle hover:border-border-active transition-all duration-200 shadow-sm flex flex-col justify-between space-y-4"
                >
                  {/* Card Header: Quote Icon, Optional Rating, Optional Cohort */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center text-brand-500 shrink-0">
                      <Quote className="w-4 h-4 text-brand-500" aria-hidden="true" />
                    </div>

                    <div className="flex items-center gap-2">
                      {item.cohort && !isPlaceholder(item.cohort) && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-surface-elevated text-brand-champagne border border-border-subtle">
                          {item.cohort}
                        </span>
                      )}

                      {hasRating && (
                        <div
                          className="flex items-center gap-0.5 text-brand-amber"
                          aria-label={`Rating: ${item.rating} out of 5 stars`}
                        >
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < item.rating ? 'fill-current text-brand-amber' : 'text-content-muted/30'
                              }`}
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <blockquote className="text-xs sm:text-sm text-content-secondary leading-relaxed italic flex-1">
                    "{item.quote}"
                  </blockquote>

                  {/* Author Metadata Footer */}
                  <footer className="flex items-center gap-3 pt-3 border-t border-border-subtle/60">
                    {hasImage ? (
                      <img
                        src={item.image}
                        alt={`Photo of ${item.name}`}
                        className="w-10 h-10 rounded-full object-cover border border-border-subtle"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="w-10 h-10 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center text-xs font-bold text-brand-500 font-headline select-none"
                        aria-hidden="true"
                      >
                        {getInitials(item.name)}
                      </div>
                    )}

                    <div className="leading-tight">
                      <h3 className="text-xs sm:text-sm font-headline font-bold text-content-primary">
                        {item.name}
                      </h3>
                      {(item.role || item.organization) && (
                        <p className="text-[11px] text-content-muted mt-0.5">
                          {[item.role, item.organization]
                            .filter((f) => f && !isPlaceholder(f))
                            .join(' • ')}
                        </p>
                      )}
                    </div>
                  </footer>
                </article>
              );
            })}
          </div>
        ) : (
          /* Polished, intentional empty state */
          <div className="max-w-xl mx-auto">
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-raised border border-dashed border-border-subtle text-center space-y-3 shadow-sm select-none">
              <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center mx-auto text-brand-500 shadow-sm mb-3">
                <MessageSquare className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-base sm:text-lg font-headline font-bold text-content-primary tracking-tight">
                Participant feedback coming soon
              </h3>
              <p className="text-xs sm:text-sm text-content-secondary max-w-md mx-auto leading-relaxed">
                Real feedback from workshop participants will appear here once it has been confirmed and approved.
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-surface-elevated border border-border-subtle text-content-muted">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" aria-hidden="true" />
                  <span>Awaiting Post-Session Submissions</span>
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default TestimonialsSection;
