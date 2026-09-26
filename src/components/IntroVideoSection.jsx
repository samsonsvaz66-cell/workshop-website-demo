import React, { useState } from 'react';
import { Play } from 'lucide-react';

/**
 * Validates whether a given string is a valid YouTube video ID.
 * Rejects null, undefined, empty, or bracketed placeholder values like [DEMO...].
 */
const isValidYouTubeId = (id) => {
  if (!id || typeof id !== 'string') return false;
  const trimmed = id.trim();
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) return false;
  if (trimmed === 'null' || trimmed === 'undefined' || trimmed === '') return false;
  return /^[a-zA-Z0-9_-]{11}$/.test(trimmed);
};

/**
 * IntroVideoSection Component
 * 
 * Provides an introduction video section introducing the offline workshop.
 * Adheres strictly to the YouTube performance facade pattern:
 * - Does NOT load the YouTube iframe on initial page load.
 * - Displays a poster thumbnail and accessible play button when a valid ID exists.
 * - Replaces the thumbnail with an embedded iframe only upon explicit user interaction.
 * - Displays an intentional, polished placeholder card when no valid video ID is provided.
 */
export const IntroVideoSection = ({ data }) => {
  const videoId = data?.video?.youtubeEmbedId;
  const hasValidVideo = isValidYouTubeId(videoId);

  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbSrc, setThumbSrc] = useState(
    hasValidVideo ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : null
  );

  // Fallback to high-quality thumbnail if maxresdefault is not available
  const handleThumbError = () => {
    if (hasValidVideo && thumbSrc && thumbSrc.includes('maxresdefault')) {
      setThumbSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
    }
  };

  return (
    <section
      id="intro-video"
      className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-border-subtle bg-surface-base transition-colors duration-200"
      aria-labelledby="intro-video-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500 font-headline">
            Workshop Introduction
          </span>
          <h2
            id="intro-video-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-headline font-bold text-content-primary tracking-tight"
          >
            See What the Workshop Is About
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
            A brief walkthrough of the session structure, practical exercises, and operational focus areas covered during the in-person masterclass.
          </p>
        </div>

        {/* Video Card Container (Centered, max-width ~1050px, 16:9 ratio) */}
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full aspect-video rounded-2xl bg-surface-raised border border-border-subtle shadow-sm overflow-hidden isolate">
            
            {hasValidVideo ? (
              isPlaying ? (
                /* Lazy-loaded YouTube iframe upon user click */
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
                  title="Workshop Introduction Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                /* Lightweight Poster Thumbnail with Play Button */
                <div className="relative w-full h-full group flex items-center justify-center bg-surface-elevated">
                  {thumbSrc && (
                    <img
                      src={thumbSrc}
                      alt="Workshop introduction video preview"
                      onError={handleThumbError}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      loading="lazy"
                    />
                  )}
                  {/* Subtle dark tint over thumbnail */}
                  <div
                    className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"
                    aria-hidden="true"
                  />

                  {/* Accessible Play Button */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label="Play workshop introduction video"
                    className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-brand-500 hover:bg-brand-400 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/25 transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/50"
                  >
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5 fill-current" aria-hidden="true" />
                  </button>

                  {/* Corner indicator badge */}
                  <div className="absolute bottom-4 left-4 z-10 hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-xs text-white border border-white/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                    <span>Watch Workshop Briefing</span>
                  </div>
                </div>
              )
            ) : (
              /* Polished, intentional placeholder state when video ID is null / pending */
              <div className="w-full h-full rounded-2xl bg-surface-elevated/50 border border-dashed border-border-subtle flex flex-col items-center justify-center p-6 sm:p-8 text-center relative select-none">
                {/* Subtle radial tint */}
                <div
                  className="absolute inset-0 bg-radial from-brand-500/5 to-transparent pointer-events-none"
                  aria-hidden="true"
                />

                {/* Decorative Play Icon container */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-center text-brand-500 shadow-sm mb-4 sm:mb-5">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 translate-x-0.5" aria-hidden="true" />
                </div>

                {/* Neutral placeholder messaging */}
                <h3 className="text-base sm:text-lg font-headline font-bold text-content-primary tracking-tight">
                  Workshop video coming soon
                </h3>
                <p className="text-xs sm:text-sm text-content-secondary mt-2 max-w-md leading-relaxed font-sans">
                  The introduction video will be added once the final workshop recording is confirmed.
                </p>

                {/* Production status badge */}
                <div className="mt-5 sm:mt-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-semibold bg-surface-raised border border-border-subtle text-content-secondary">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" aria-hidden="true" />
                  <span>Recording in Production</span>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

export default IntroVideoSection;
