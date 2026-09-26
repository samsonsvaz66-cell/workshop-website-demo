import React from 'react';
import { User, CheckCircle2, ArrowUpRight, Award } from 'lucide-react';
import ExpandableText from './ExpandableText';

/**
 * YouTube Icon Component (Inline SVG for maximum reliability and styling control)
 */
const YouTubeIcon = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/**
 * Helper to determine if a string is an unconfigured client/demo placeholder.
 */
const isPlaceholder = (val) => {
  if (!val || typeof val !== 'string') return true;
  const trimmed = val.trim();
  return trimmed.startsWith('[') && trimmed.endsWith(']');
};

/**
 * ResourcePersonSection Component
 * 
 * Introduces the workshop resource person / speaker in a professional, grounded,
 * and editorial presentation.
 * 
 * Rules:
 * - Does not invent credentials, revenue figures, or unverified claims.
 * - Displays intentional placeholder states if image, name, or bio are not yet provided.
 * - Supports expandable text only if a complete, real biography is available.
 * - Provides an optional YouTube CTA only if a verified channel/video link exists in data.
 */
export const ResourcePersonSection = ({ data }) => {
  const speaker = data?.speaker || {};

  // Image source resolution
  const speakerImage = speaker.image || speaker.avatarUrl || data?.image?.speakerPhotoUrl;
  const hasRealImage = speakerImage && !isPlaceholder(speakerImage) && speakerImage !== 'null';

  // Text values
  const name = speaker.name || '[CLIENT SPEAKER / MENTOR NAME]';
  const role = speaker.role;
  const organization = speaker.organization;
  const headline = speaker.headline;
  const shortBio = speaker.shortBio || speaker.bio || '[CLIENT TO PROVIDE SPEAKER BIOGRAPHY AND BACKGROUND]';
  const fullBio = speaker.fullBio;

  const isBioPlaceholder = isPlaceholder(shortBio);

  // YouTube URL resolution
  const youtubeUrl = speaker.youtubeChannelUrl || data?.socialLinks?.youtubeUrl;
  const hasValidYoutube = youtubeUrl && !isPlaceholder(youtubeUrl) && youtubeUrl !== 'null';

  return (
    <section
      id="resource-person"
      className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-border-subtle bg-surface-base transition-colors duration-200"
      aria-labelledby="resource-person-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Speaker Image / Controlled Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-2xl bg-surface-raised border border-border-subtle p-2 sm:p-2.5 relative group overflow-hidden shadow-sm hover:border-border-active transition-all duration-200 flex flex-col">
              {hasRealImage ? (
                <img
                  src={speakerImage}
                  alt={name}
                  className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              ) : (
                /* Intentional, designed placeholder state */
                <div className="w-full h-full rounded-xl bg-surface-elevated/50 border border-dashed border-border-subtle flex flex-col items-center justify-center p-6 text-center relative select-none">
                  {/* Subtle decorative radial tint */}
                  <div
                    className="absolute inset-0 bg-radial from-brand-500/5 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Icon badge */}
                  <div className="w-16 h-16 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-center text-brand-500 shadow-sm mb-4">
                    <User className="w-8 h-8" aria-hidden="true" />
                  </div>

                  {/* Placeholder textual labels */}
                  <span className="text-sm font-headline font-bold text-content-primary tracking-tight">
                    Resource Person Photo
                  </span>
                  <span className="text-xs text-content-muted mt-1 font-mono">
                    [Client to provide photograph]
                  </span>

                  {/* Facilitator tag */}
                  <div className="mt-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-surface-raised border border-border-subtle text-content-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
                    <span>Workshop Facilitator</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Eyebrow, Heading, Speaker Details & Bio */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-5">
            
            {/* Eyebrow & Main Section Heading */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500 font-headline">
                Resource Person
              </span>
              <h2
                id="resource-person-heading"
                className="text-2xl sm:text-3xl font-headline font-bold text-content-primary tracking-tight"
              >
                About the Resource Person
              </h2>
            </div>

            {/* Name & Role / Headline */}
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-headline font-bold text-content-primary tracking-tight">
                {name}
              </h3>
              
              {/* Display role & organization only if present */}
              {(role || organization) && (
                <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-brand-500">
                  {role && <span>{role}</span>}
                  {role && organization && (
                    <span className="text-content-muted flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-border-strong" aria-hidden="true" />
                      <span>{organization}</span>
                    </span>
                  )}
                  {!role && organization && <span>{organization}</span>}
                </div>
              )}

              {/* Optional headline if present */}
              {headline && (
                <p className="text-xs sm:text-sm text-content-secondary">
                  {headline}
                </p>
              )}
            </div>

            {/* Biography Content */}
            <div className="text-content-secondary leading-relaxed">
              {isBioPlaceholder ? (
                /* Clean placeholder card showing that the client will supply final bio */
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-raised border border-border-subtle space-y-2">
                  <p className="text-xs sm:text-sm italic leading-relaxed text-content-muted">
                    {shortBio}
                  </p>
                  <p className="text-[11px] text-content-muted leading-relaxed">
                    Verified facilitator background, operational credentials, and focus modules will be displayed here once finalized by the client.
                  </p>
                </div>
              ) : fullBio ? (
                /* Expandable text for complete multi-paragraph biography */
                <ExpandableText
                  text={shortBio}
                  fullText={`${shortBio} ${fullBio}`}
                  lineClampClass="line-clamp-3"
                />
              ) : (
                /* Concise approved single biography */
                <p className="text-xs sm:text-sm sm:leading-relaxed">
                  {shortBio}
                </p>
              )}
            </div>

            {/* In-Person Educational Principles (Grounded in operational discipline) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-surface-raised border border-border-subtle flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="text-xs font-headline font-bold text-content-primary">
                    Direct In-Person Instruction
                  </h4>
                  <p className="text-[11px] text-content-secondary leading-relaxed mt-0.5">
                    Live classroom walkthroughs, real-time store audits, and interactive Q&A.
                  </p>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-raised border border-border-subtle flex items-start gap-2.5">
                <Award className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="text-xs font-headline font-bold text-content-primary">
                    Operational Frameworks
                  </h4>
                  <p className="text-[11px] text-content-secondary leading-relaxed mt-0.5">
                    Focus on unit economics, catalog health, and sustainable e-commerce practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Optional YouTube Channel CTA */}
            {hasValidYoutube && (
              <div className="pt-2">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-raised border border-border-subtle hover:border-border-active text-content-primary text-xs font-semibold hover:text-brand-500 transition-colors"
                >
                  <YouTubeIcon className="w-4 h-4 text-red-500" />
                  <span>Watch on YouTube</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-content-muted" aria-hidden="true" />
                </a>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcePersonSection;
