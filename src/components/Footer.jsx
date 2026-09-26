import React from 'react';
import { Mail, ExternalLink, Calendar, MapPin } from 'lucide-react';

/**
 * Footer Component
 * 
 * Closes the EcomGyan workshop website with an executive, understated presentation.
 * Features:
 * - Brand descriptor and monogram matching the Navbar.
 * - Smooth anchor navigation to all workshop sections (#hero, #intro, #resource-person, etc.).
 * - Workshop logistics summary column derived from workshopData.js.
 * - Verified contact channel (ron@ecomgyan.com) and dynamic year copyright.
 * - Strictly zero WhatsApp, fake legal links, or unverified social accounts.
 */
export const Footer = ({ data }) => {
  const currentYear = new Date().getFullYear();

  const displayDate = data?.schedule?.formattedDate || data?.startDate;
  const displayLocation = data?.city || data?.venueDetails?.name || data?.venue;
  const contactEmail = data?.socialLinks?.admissionsEmail || 'ron@ecomgyan.com';
  const youtubeUrl = data?.socialLinks?.youtubeUrl;

  const handleScrollTo = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = `#${targetId}`;
    }
  };

  const navLinks = [
    { label: 'Workshop', href: '#hero', id: 'hero' },
    { label: 'About', href: '#intro', id: 'intro' },
    { label: 'Resource Person', href: '#resource-person', id: 'resource-person' },
    { label: 'Details', href: '#details', id: 'details' },
    { label: 'Location', href: '#location', id: 'location' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
    { label: 'Register', href: '#register', id: 'register' },
  ];

  const workshopLinks = [
    { label: 'Workshop Details', href: '#details', id: 'details' },
    { label: 'Registration Form', href: '#register', id: 'register' },
    { label: 'Venue & Map', href: '#location', id: 'location' },
  ];

  return (
    <footer className="w-full border-t border-border-subtle bg-surface-raised transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Mission Area (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-slate-950 font-headline font-bold text-sm shadow-sm">
                EG
              </div>
              <span className="font-headline text-lg sm:text-xl font-bold tracking-tight text-content-primary">
                Ecom<span className="text-brand-500">Gyan</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-brand-champagne">
              Offline Workshops & Practical E-commerce Learning
            </p>

            <p className="text-xs text-content-secondary leading-relaxed max-w-sm">
              Hands-on masterclasses designed for e-commerce operators, store owners, and brand builders. Focused on unit economics, catalog health, and sustainable growth.
            </p>
          </div>

          {/* Navigation Column (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-headline font-bold uppercase tracking-wider text-content-primary">
              Navigation
            </h3>
            <ul className="grid grid-cols-2 gap-x-2 gap-y-2 text-xs sm:text-sm" aria-label="Footer Navigation">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.id)}
                    className="text-content-secondary hover:text-brand-500 transition-colors py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Workshop Column (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-headline font-bold uppercase tracking-wider text-content-primary">
              Workshop
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm" aria-label="Workshop Links">
              {workshopLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.id)}
                    className="text-content-secondary hover:text-brand-500 transition-colors py-1 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Quick logistical note */}
            {(displayDate || displayLocation) && (
              <div className="pt-2 text-[11px] text-content-muted space-y-1">
                {displayDate && (
                  <p className="flex items-center gap-1.5 truncate">
                    <Calendar className="w-3 h-3 text-brand-500 shrink-0" aria-hidden="true" />
                    <span>{displayDate}</span>
                  </p>
                )}
                {displayLocation && (
                  <p className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-brand-emerald shrink-0" aria-hidden="true" />
                    <span>{displayLocation}</span>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Connect Column (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-headline font-bold uppercase tracking-wider text-content-primary">
              Connect
            </h3>
            
            <p className="text-xs text-content-secondary leading-relaxed">
              For corporate admissions, cohort inquiries, or delegate questions:
            </p>

            {/* Verified Email Link */}
            <div>
              <a
                href={`mailto:${contactEmail}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-elevated border border-border-subtle hover:border-brand-500/50 text-xs font-semibold text-content-primary hover:text-brand-500 transition-colors"
                aria-label={`Send inquiry email to ${contactEmail}`}
              >
                <Mail className="w-3.5 h-3.5 text-brand-500 shrink-0" aria-hidden="true" />
                <span className="break-all">{contactEmail}</span>
              </a>
            </div>

            {/* Render official YouTube destination only if confirmed in project data */}
            {youtubeUrl && (
              <div className="pt-1">
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-content-secondary hover:text-brand-500 transition-colors"
                >
                  <span>Official Channel</span>
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright & Subtle Descriptor */}
        <div className="pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-border-subtle/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-content-muted">
          <p>
            © {currentYear} EcomGyan. All rights reserved.
          </p>

          <p className="text-[11px] text-content-muted/80">
            Offline Workshop & Masterclass Registration Portal
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
