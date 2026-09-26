import React from 'react';
import { ArrowDown, Info } from 'lucide-react';
import MetadataStrip from './MetadataStrip';
import Button from './Button';

/**
 * HeroSection Component
 * Prioritizes:
 * 1. Workshop identity & badge
 * 2. Workshop title
 * 3. Short 2–3 line description
 * 4. Date, Time, Location metadata
 * 5. Primary "Register Now" CTA (scrolls to #register)
 * 6. Secondary "View Details" CTA (scrolls to #details)
 * 
 * Styled according to Stitch visual guidelines with controlled typography.
 */
export const HeroSection = ({ data }) => {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${sectionId}`;
    }
  };

  const eyebrow = data?.eyebrowBadge || 'Upcoming In-Person Workshop (Demo)';
  const title = data?.title || '[DEMO WORKSHOP TITLE]';
  const description = data?.shortDescription || data?.description || '[DEMO SHORT DESCRIPTION — 2-3 LINES PLACEHOLDER]';

  return (
    <section
      id="hero"
      className="relative w-full pt-8 sm:pt-12 pb-12 sm:pb-16 border-b border-border-subtle bg-surface-base transition-colors duration-200"
      aria-label="Workshop Overview"
    >
      {/* Ambient background glow for dark mode */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-6 sm:space-y-7">
        {/* 1. Workshop Identity & Status Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-raised border border-border-subtle shadow-sm">
          <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse shrink-0" aria-hidden="true" />
          <span className="text-xs font-bold uppercase tracking-wider text-brand-champagne font-headline">
            {eyebrow}
          </span>
        </div>

        {/* 2. Controlled Workshop Title (H1 around ~44px on desktop, ~28-32px on mobile) */}
        <h1 className="font-headline font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[44px] lg:leading-[52px] tracking-tight text-content-primary max-w-4xl">
          {title}
        </h1>

        {/* 3. Concise 2–3 Line Description */}
        <p className="font-sans text-sm sm:text-base text-content-secondary max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* 4. Date, Time & Location Metadata */}
        <div className="w-full pt-2">
          <MetadataStrip
            startDate={data?.startDate}
            endDate={data?.endDate}
            formattedDate={data?.schedule?.formattedDate}
            startTime={data?.startTime}
            endTime={data?.endTime}
            timezone={data?.timezone || data?.schedule?.timezone}
            venue={data?.venueDetails?.name || data?.venue}
            city={data?.city || data?.venueDetails?.city}
          />
        </div>

        {/* 5. Primary & Secondary Call to Actions */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
          <Button
            variant="primary"
            size="lg"
            className="w-full sm:w-auto justify-center"
            rightIcon={ArrowDown}
            onClick={(e) => scrollToSection(e, 'register')}
          >
            Register Now
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto justify-center"
            rightIcon={Info}
            onClick={(e) => scrollToSection(e, 'details')}
          >
            View Workshop Details
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
