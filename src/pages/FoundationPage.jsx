import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Tag, 
  ArrowRight, 
  Palette, 
  Layers, 
  Cpu,
  RefreshCw
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { ExpandableText } from '../components/ExpandableText';
import { useTheme } from '../hooks/useTheme';
import { mockWorkshopData } from '../data/workshopData';

export const FoundationPage = () => {
  const { theme } = useTheme();
  const [btnLoading, setBtnLoading] = useState(false);

  const simulateLoading = () => {
    setBtnLoading(true);
    setTimeout(() => setBtnLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-surface-base text-content-primary flex flex-col transition-colors duration-200">
      {/* Reusable Navbar */}
      <Navbar onRegisterClick={() => alert('Foundation Demo: Registration flow will be connected in next phase.')} />

      {/* Main Foundation Showcase */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Foundation Status Banner */}
        <section className="relative overflow-hidden rounded-card-lg border border-border-default bg-surface-card p-6 sm:p-8 shadow-card">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-500 border border-brand-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                Frontend Foundation Initialized
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-content-primary">
                EcomGyan <span className="gradient-text">Workshop Architecture</span>
              </h1>
              <p className="text-content-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
                Core design tokens, theme engine (Dark / Light), reusable primitives, and Spring Boot-aligned mock data structures are loaded and ready.
              </p>
            </div>

            {/* Current Active Theme Indicator */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-surface-secondary/70 p-4 rounded-xl border border-border-subtle">
              <div className="text-xs">
                <span className="text-content-muted block">Active Theme</span>
                <span className="font-bold text-brand-500 capitalize">{theme}</span>
              </div>
              <ThemeToggle compact={false} />
            </div>
          </div>
        </section>

        {/* SECTION 1: Design Tokens & Typography */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border-subtle">
            <Palette className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl font-bold tracking-tight text-content-primary">
              1. Design Tokens & Visual Hierarchy
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Surface Tokens */}
            <div className="p-5 rounded-card border border-border-default bg-surface-card shadow-card space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-content-muted">Surfaces</span>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-surface-base border border-border-subtle text-xs flex justify-between">
                  <span>surface-base</span>
                  <span className="text-content-muted">Background Canvas</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-primary border border-border-subtle text-xs flex justify-between">
                  <span>surface-primary</span>
                  <span className="text-content-muted">Base Panels</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-secondary border border-border-subtle text-xs flex justify-between">
                  <span>surface-secondary</span>
                  <span className="text-content-muted">Subtle Elements</span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-card border border-border-default text-xs flex justify-between">
                  <span>surface-card</span>
                  <span className="text-content-muted">Elevated Cards</span>
                </div>
              </div>
            </div>

            {/* Brand Colors */}
            <div className="p-5 rounded-card border border-border-default bg-surface-card shadow-card space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-content-muted">Brand & Status</span>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-brand-500 text-white font-medium text-xs flex justify-between items-center">
                  <span>brand-500 (Primary)</span>
                  <span>#2563eb</span>
                </div>
                <div className="p-2.5 rounded-lg bg-brand-accent text-white font-medium text-xs flex justify-between items-center">
                  <span>brand-accent (Cyan)</span>
                  <span>#06b6d4</span>
                </div>
                <div className="p-2.5 rounded-lg bg-brand-emerald text-white font-medium text-xs flex justify-between items-center">
                  <span>status-open (Emerald)</span>
                  <span>#10b981</span>
                </div>
                <div className="p-2.5 rounded-lg bg-brand-amber text-slate-900 font-medium text-xs flex justify-between items-center">
                  <span>status-urgency (Amber)</span>
                  <span>#f59e0b</span>
                </div>
              </div>
            </div>

            {/* Typography Tokens */}
            <div className="p-5 rounded-card border border-border-default bg-surface-card shadow-card space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-content-muted">Typography</span>
              <div className="space-y-2 text-content-primary">
                <div>
                  <span className="text-xl font-bold tracking-tight block">Heading Bold</span>
                  <span className="text-[11px] text-content-muted">Plus Jakarta Sans 700</span>
                </div>
                <div>
                  <span className="text-base font-semibold block">Subheading Semi</span>
                  <span className="text-[11px] text-content-muted">Plus Jakarta Sans 600</span>
                </div>
                <div>
                  <span className="text-sm font-normal text-content-secondary block">Body Text Regular</span>
                  <span className="text-[11px] text-content-muted">Controlled 2-3 lines with soft contrast</span>
                </div>
              </div>
            </div>

            {/* Shadows & Borders */}
            <div className="p-5 rounded-card border border-border-default bg-surface-card shadow-card space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-content-muted">Borders & Shadows</span>
              <div className="space-y-2.5">
                <div className="p-2 rounded-lg border border-border-subtle text-xs text-content-secondary">
                  border-subtle (6-7% opacity)
                </div>
                <div className="p-2 rounded-lg border border-border-default text-xs text-content-secondary">
                  border-default (12% opacity)
                </div>
                <div className="p-2 rounded-lg border border-border-strong text-xs text-content-secondary">
                  border-strong (22% opacity)
                </div>
                <div className="p-2 rounded-lg border border-border-glow bg-brand-500/5 text-xs text-brand-500 font-medium">
                  border-glow (Active focus / highlight)
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Reusable UI Components */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5 pb-2 border-b border-border-subtle">
            <Layers className="w-5 h-5 text-brand-500" />
            <h2 className="text-xl font-bold tracking-tight text-content-primary">
              2. Reusable Primitives (Buttons, Toggles & Expandable Content)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Button Component Variations */}
            <div className="p-6 rounded-card border border-border-default bg-surface-card shadow-card space-y-5">
              <div>
                <h3 className="text-base font-bold text-content-primary">Button Component (`Button.jsx`)</h3>
                <p className="text-xs text-content-secondary">
                  Supports variants, sizing, loading states, and leading/trailing icons.
                </p>
              </div>

              {/* Variants */}
              <div className="space-y-2">
                <span className="text-xs text-content-muted font-medium block">Variants:</span>
                <div className="flex flex-wrap gap-2.5 items-center">
                  <Button variant="primary" size="sm">Primary</Button>
                  <Button variant="secondary" size="sm">Secondary</Button>
                  <Button variant="outline" size="sm">Outline</Button>
                  <Button variant="ghost" size="sm">Ghost</Button>
                  <Button variant="accent" size="sm">Accent Gradient</Button>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-2">
                <span className="text-xs text-content-muted font-medium block">Sizes (Small, Medium, Large):</span>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button size="sm">Small Button</Button>
                  <Button size="md">Medium Button</Button>
                  <Button size="lg">Large Button</Button>
                </div>
              </div>

              {/* States & Icons */}
              <div className="space-y-2">
                <span className="text-xs text-content-muted font-medium block">States & Icons:</span>
                <div className="flex flex-wrap gap-3 items-center">
                  <Button 
                    variant="primary" 
                    isLoading={btnLoading} 
                    onClick={simulateLoading}
                    leftIcon={RefreshCw}
                  >
                    {btnLoading ? 'Processing...' : 'Click to Test Loading'}
                  </Button>

                  <Button variant="secondary" rightIcon={ArrowRight}>
                    With Right Icon
                  </Button>

                  <Button variant="outline" disabled>
                    Disabled State
                  </Button>
                </div>
              </div>
            </div>

            {/* Expandable Text & Theme Toggle Demo */}
            <div className="p-6 rounded-card border border-border-default bg-surface-card shadow-card space-y-6">
              <div>
                <h3 className="text-base font-bold text-content-primary">Controlled Descriptions (`ExpandableText.jsx`)</h3>
                <p className="text-xs text-content-secondary">
                  Preserves visual balance by limiting initial text to 2–3 lines with smooth "Read more / Show less" interaction.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-surface-secondary/60 border border-border-subtle">
                <span className="text-xs font-semibold text-brand-500 uppercase tracking-wide block mb-1">
                  Workshop Overview Preview
                </span>
                <ExpandableText
                  text={mockWorkshopData.aboutWorkshop.shortSummary}
                  fullText={`${mockWorkshopData.aboutWorkshop.shortSummary} ${mockWorkshopData.aboutWorkshop.fullDetails}`}
                />
              </div>

              <div className="pt-2 border-t border-border-subtle space-y-2">
                <h4 className="text-sm font-semibold text-content-primary">Theme Switcher Variants</h4>
                <p className="text-xs text-content-secondary">
                  Used in Navbar and settings. Supports full pill and compact icon modes:
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-content-muted">Full:</span>
                    <ThemeToggle compact={false} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-content-muted">Compact:</span>
                    <ThemeToggle compact={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Mock Workshop Data Structure (Spring Boot Ready) */}
        <section className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-border-subtle flex-wrap gap-4">
            <div className="flex items-center gap-2.5">
              <Cpu className="w-5 h-5 text-brand-500" />
              <h2 className="text-xl font-bold tracking-tight text-content-primary">
                3. Mock Data Contract (`workshopData.js`)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Spring Boot DTO Compatible
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Data Summary Card */}
            <div className="p-6 rounded-card border border-border-default bg-surface-card shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-surface-secondary text-content-secondary">
                  {mockWorkshopData.code}
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                  {mockWorkshopData.registrationStatus.replace('_', ' ')}
                </span>
              </div>

              <h3 className="text-lg font-bold text-content-primary leading-snug">
                {mockWorkshopData.title}
              </h3>

              <div className="space-y-2 text-xs text-content-secondary">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>{mockWorkshopData.schedule.formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-brand-500 shrink-0" />
                  <span>{mockWorkshopData.schedule.startTime} - {mockWorkshopData.schedule.endTime} ({mockWorkshopData.schedule.timezone})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-500 shrink-0" />
                  <span className="truncate">{mockWorkshopData.venue.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-brand-500 shrink-0" />
                  <span className="font-semibold text-content-primary">
                    {mockWorkshopData.fee.currencySymbol}{mockWorkshopData.fee.amount}
                  </span>
                  <span className="line-through text-content-muted">
                    {mockWorkshopData.fee.currencySymbol}{mockWorkshopData.fee.originalAmount}
                  </span>
                  <span className="text-emerald-500 font-bold">
                    ({mockWorkshopData.fee.discountPercentage}% OFF)
                  </span>
                </div>
              </div>

              {/* Capacity Progress Bar */}
              <div className="pt-2 border-t border-border-subtle space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-content-secondary flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-brand-500" />
                    Seats Remaining
                  </span>
                  <span className="font-bold text-content-primary">
                    {mockWorkshopData.capacity.availableSeats} of {mockWorkshopData.capacity.totalSeats} left
                  </span>
                </div>
                <div className="w-full bg-surface-secondary rounded-full h-2 overflow-hidden border border-border-subtle">
                  <div
                    className="bg-gradient-to-r from-brand-500 to-brand-accent h-2 rounded-full transition-all duration-500"
                    style={{ width: `${mockWorkshopData.capacity.fillPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Structured Learning Points DTO Preview */}
            <div className="p-6 rounded-card border border-border-default bg-surface-card shadow-card space-y-4 lg:col-span-2">
              <h3 className="text-sm font-bold text-content-primary uppercase tracking-wider">
                Mock Learning Points ({mockWorkshopData.learningPoints.length} Modules in DTO)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockWorkshopData.learningPoints.map((point) => (
                  <div
                    key={point.id}
                    className="p-3.5 rounded-xl bg-surface-secondary/50 border border-border-subtle space-y-1"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold text-brand-500">
                      <span className="w-5 h-5 rounded-md bg-brand-500/10 flex items-center justify-center font-mono">
                        {point.number}
                      </span>
                      <span className="text-content-primary truncate">{point.title}</span>
                    </div>
                    <p className="text-xs text-content-secondary line-clamp-2 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-lg bg-surface-secondary/40 border border-border-subtle flex items-center justify-between text-xs">
                <span className="text-content-muted">
                  FAQ Placeholders Defined: <strong className="text-content-primary">{mockWorkshopData.faqPlaceholders.length} questions</strong>
                </span>
                <span className="text-brand-500 font-medium">Ready for section integration</span>
              </div>
            </div>
          </div>
        </section>

        {/* Foundation Compliance Checklist */}
        <section className="p-6 rounded-card border border-border-default bg-surface-card shadow-card">
          <h3 className="text-sm font-bold uppercase tracking-wider text-content-muted mb-4">
            Foundation Checklist Verification
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2 text-content-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Tailwind CSS & Design Tokens</span>
            </div>
            <div className="flex items-center gap-2 text-content-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Dark / Light Persistence</span>
            </div>
            <div className="flex items-center gap-2 text-content-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Navbar, ThemeToggle & Button</span>
            </div>
            <div className="flex items-center gap-2 text-content-secondary">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero Backend / Zero DB / Clean DTO</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FoundationPage;
