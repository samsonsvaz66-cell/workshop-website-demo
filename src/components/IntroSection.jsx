import React from 'react';
import { Store, Package, TrendingUp, Building, CheckCircle2, Users } from 'lucide-react';
import ExpandableText from './ExpandableText';

/**
 * Helper to resolve icon by string or fallback to Users icon.
 */
const getAudienceIcon = (iconName) => {
  switch (iconName) {
    case 'storefront':
      return Store;
    case 'inventory_2':
      return Package;
    case 'trending_up':
      return TrendingUp;
    case 'domain':
      return Building;
    default:
      return Users;
  }
};

/**
 * IntroSection Component
 * Covers:
 * 1. What the workshop is
 * 2. Why it exists / why attend in person
 * 3. Who it is for (4 target audience cards)
 * 4. Main practical outcome
 * 
 * Styled according to Stitch visual guidelines and tokens.
 */
export const IntroSection = ({ data }) => {
  const about = data?.aboutWorkshop || {
    shortSummary: '[DEMO OVERVIEW SUMMARY — CLIENT TO PROVIDE ACCURATE WORKSHOP SYNOPSIS]',
    fullDetails: '[DEMO DETAILED CONTEXT — CLIENT TO PROVIDE IN-DEPTH CURRICULUM DESCRIPTION]',
  };

  const audienceList = data?.targetAudience || [];

  return (
    <section
      id="intro"
      className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-border-subtle bg-surface-base transition-colors duration-200"
      aria-labelledby="intro-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: What Is This Workshop & Why Attend */}
          <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500 font-headline">
                Workshop Overview
              </span>
              <h2
                id="intro-heading"
                className="text-2xl sm:text-3xl font-headline font-bold text-content-primary tracking-tight"
              >
                About The Masterclass
              </h2>
            </div>

            {/* Expandable Overview Description */}
            <div className="text-content-secondary leading-relaxed">
              <ExpandableText
                text={about.shortSummary}
                fullText={about.fullDetails ? `${about.shortSummary} ${about.fullDetails}` : undefined}
                lineClampClass="line-clamp-3"
              />
            </div>

            {/* Key In-Person Value / Practical Outcome Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-raised border border-border-subtle shadow-sm space-y-2.5 mt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0" aria-hidden="true" />
                <h3 className="text-sm font-headline font-bold text-content-primary">
                  Practical In-Person Sessions
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                Focused on live working audits, spreadsheet teardowns, and peer problem-solving under mutual confidentiality. All exercises focus on verifiable store fundamentals and operational stability.
              </p>
            </div>
          </div>

          {/* Right Column: Who Is This Workshop For? (4 Target Audience Cards) */}
          <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-emerald font-headline">
                Audience Curation
              </span>
              <h3 className="text-xl sm:text-2xl font-headline font-bold text-content-primary tracking-tight">
                Who Is This Workshop For?
              </h3>
            </div>

            {/* 4 Audience Cards in a 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {audienceList.map((item) => {
                const IconComponent = getAudienceIcon(item.icon);
                return (
                  <div
                    key={item.id}
                    className="p-4 sm:p-4.5 rounded-2xl bg-surface-raised border border-border-subtle hover:border-border-active shadow-sm transition-all duration-200 flex flex-col space-y-2 text-left"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center shrink-0 text-brand-500">
                        <IconComponent className="w-4 h-4" aria-hidden="true" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-headline font-bold text-content-primary truncate">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-xs text-content-secondary leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
