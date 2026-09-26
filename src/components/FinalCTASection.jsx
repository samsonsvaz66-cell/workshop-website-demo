import React from 'react';
import { Calendar, Clock, MapPin, ArrowDown } from 'lucide-react';
import Button from './Button';

/**
 * FinalCTASection Component
 * 
 * Provides a contained, conversion-focused closing section guiding users toward registration
 * or workshop logistical review.
 * 
 * Rules:
 * - Strictly avoids exaggerated sales copy, fabricated scarcity, and fake urgency.
 * - Dynamically reflects data.registrationStatus (UPCOMING, ONGOING, CLOSED, COMPLETED).
 * - Smoothly navigates to #register for primary conversion and #details for secondary review.
 * - Respects the EcomGyan dark-first executive token system.
 */
export const FinalCTASection = ({ data }) => {
  const status = data?.registrationStatus || 'UPCOMING';
  const isRegistrationOpen = status === 'UPCOMING' || status === 'ONGOING';

  // Derived metadata strings
  const displayDate = data?.schedule?.formattedDate || data?.startDate;
  const displayTime = data?.schedule?.timings || data?.startTime;
  const displayLocation = data?.city || data?.venueDetails?.name || data?.venue;

  // Smooth scroll handler
  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${targetId}`;
    }
  };

  return (
    <section
      id="final-cta"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-surface-base transition-colors duration-200"
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contained Master CTA Panel */}
        <div className="relative max-w-5xl mx-auto rounded-3xl bg-surface-raised border border-border-subtle p-8 sm:p-12 lg:p-16 text-center shadow-lg overflow-hidden isolate">
          
          {/* Subtle Ambient Radial Glow */}
          <div
            className="absolute inset-0 bg-radial from-brand-500/10 via-transparent to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            
            {/* Eyebrow Label */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-brand-500 font-headline bg-brand-500/10 border border-brand-500/20">
                Ready to Attend?
              </span>

              {/* Main Heading */}
              <h2
                id="final-cta-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-headline font-bold text-content-primary tracking-tight"
              >
                Reserve Your Workshop Spot
              </h2>

              {/* Supporting Copy */}
              <p className="text-xs sm:text-sm sm:leading-relaxed text-content-secondary max-w-xl mx-auto">
                Review the workshop details and complete the registration form to reserve your place.
              </p>
            </div>

            {/* Optional Metadata Row (Only rendered if values exist) */}
            {(displayDate || displayTime || displayLocation) && (
              <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2 rounded-full bg-surface-elevated/70 border border-border-subtle text-xs text-content-secondary font-medium select-none">
                {displayDate && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-500 shrink-0" aria-hidden="true" />
                    <span>{displayDate}</span>
                  </span>
                )}
                {displayTime && (
                  <>
                    <span className="text-content-muted hidden sm:inline" aria-hidden="true">•</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-500 shrink-0" aria-hidden="true" />
                      <span>{displayTime}</span>
                    </span>
                  </>
                )}
                {displayLocation && (
                  <>
                    <span className="text-content-muted hidden sm:inline" aria-hidden="true">•</span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-emerald shrink-0" aria-hidden="true" />
                      <span>{displayLocation}</span>
                    </span>
                  </>
                )}
              </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              {isRegistrationOpen ? (
                /* Active Registration CTA */
                <Button
                  href="#register"
                  variant="primary"
                  size="lg"
                  rightIcon={ArrowDown}
                  onClick={(e) => handleScrollTo(e, 'register')}
                  className="w-full sm:w-auto shadow-md shadow-amber-500/20"
                >
                  Register Now
                </Button>
              ) : (
                /* Closed or Completed Status Button */
                <Button
                  disabled
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto opacity-60 cursor-not-allowed"
                >
                  {status === 'COMPLETED' ? 'Workshop Completed' : 'Registration Closed'}
                </Button>
              )}

              {/* Secondary Review Action */}
              <Button
                href="#details"
                variant="outline"
                size="lg"
                onClick={(e) => handleScrollTo(e, 'details')}
                className="w-full sm:w-auto"
              >
                Review Workshop Details
              </Button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTASection;
