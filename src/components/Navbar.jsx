import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Button from './Button';

/**
 * Navbar component for EcomGyan Workshop.
 * Features sticky glassmorphic header, desktop navigation, responsive mobile drawer,
 * visible Light/Dark theme toggle, and primary "Register Now" CTA scrolling to #register.
 * 
 * NOTE: Strictly zero WhatsApp elements as required.
 */
export const Navbar = ({
  brandName = 'EcomGyan',
  tagline = 'Masterclass',
  navLinks = [
    { label: 'Workshop', href: '#hero' },
    { label: 'About', href: '#intro' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ],
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = href;
    }
  };

  const handleRegisterClick = (e) => {
    if (e) e.preventDefault();
    setMobileMenuOpen(false);
    const regSection = document.getElementById('register');
    if (regSection) {
      regSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#register';
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-surface-base/90 backdrop-blur-xl border-b border-border-subtle shadow-sm transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Branding / Logo */}
            <div className="flex items-center gap-3">
              <a
                href="#hero"
                onClick={(e) => handleNavClick(e, '#hero')}
                className="flex items-center gap-2.5 group"
                aria-label={`${brandName} Workshop Home`}
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-brand-500 flex items-center justify-center text-slate-950 font-headline font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
                  EG
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline text-lg sm:text-xl font-bold tracking-tight text-content-primary">
                    Ecom<span className="text-brand-500">Gyan</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-surface-raised border border-border-subtle text-[10px] font-semibold text-brand-champagne uppercase tracking-wider hidden xs:inline-block">
                    {tagline}
                  </span>
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-content-secondary hover:text-content-primary hover:bg-surface-raised transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions: ThemeToggle + Register Now CTA */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle compact={false} />
              <Button
                variant="primary"
                size="md"
                rightIcon={ArrowDown}
                onClick={handleRegisterClick}
              >
                Register Now
              </Button>
            </div>

            {/* Mobile Controls: ThemeToggle + Register CTA + Hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <ThemeToggle compact={true} />
              <button
                type="button"
                onClick={handleRegisterClick}
                className="px-3 py-1.5 rounded-lg bg-brand-500 text-slate-950 font-bold text-xs shadow-sm active:scale-95 transition-transform"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-raised transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer & Backdrop */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-out drawer panel */}
          <div
            className="fixed top-0 right-0 h-full w-[80%] max-w-[320px] bg-surface-raised border-l border-border-subtle shadow-2xl z-50 flex flex-col justify-between p-6 animate-in slide-in-from-right duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex flex-col gap-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-border-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center text-slate-950 font-headline font-bold text-xs">
                    EG
                  </div>
                  <span className="font-headline font-bold text-base text-content-primary">
                    EcomGyan
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-content-secondary hover:text-content-primary hover:bg-surface-elevated transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="flex flex-col gap-1.5" aria-label="Mobile Menu Links">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="flex items-center justify-between px-3.5 py-3 rounded-lg text-sm font-medium text-content-secondary hover:text-content-primary hover:bg-surface-elevated transition-colors"
                  >
                    <span>{link.label}</span>
                  </a>
                ))}
              </nav>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-border-subtle flex flex-col gap-3">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center"
                rightIcon={ArrowDown}
                onClick={handleRegisterClick}
              >
                Register Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
