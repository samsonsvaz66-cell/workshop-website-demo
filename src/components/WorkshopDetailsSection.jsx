import React from 'react';
import { 
  Calendar, 
  Clock, 
  Building2, 
  MapPin, 
  Users, 
  CheckCircle2, 
  CreditCard,
  CalendarDays
} from 'lucide-react';
import CountdownTimer from './CountdownTimer';

/**
 * Helper to render status badge with appropriate styling based on controlled enum.
 */
const renderStatusBadge = (status) => {
  switch (status) {
    case 'UPCOMING':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" aria-hidden="true" />
          Upcoming
        </span>
      );
    case 'ONGOING':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-500 border border-brand-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-500" aria-hidden="true" />
          In Session
        </span>
      );
    case 'COMPLETED':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-elevated text-content-muted border border-border-subtle">
          Completed
        </span>
      );
    case 'CLOSED':
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-elevated text-content-muted border border-border-subtle">
          Registration Closed
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-elevated text-content-secondary border border-border-subtle">
          {status}
        </span>
      );
  }
};

/**
 * WorkshopDetailsSection Component
 * Displays the core logistical workshop details (Date, Time, Venue, Address, Duration, Fee, Capacity, Status)
 * and embeds the CountdownTimer component.
 * 
 * Uses section id="details" to support anchor navigation from the Hero CTA.
 */
export const WorkshopDetailsSection = ({ data }) => {
  // Derive date string cleanly without inventing facts
  const displayDate = data?.schedule?.formattedDate || 
    (data?.startDate && data?.endDate ? `${data.startDate} to ${data.endDate}` : data?.startDate || '[DEMO DATE]');

  // Derive timings string cleanly
  const displayTimings = data?.schedule?.timings || 
    (data?.startTime && data?.endTime ? `${data.startTime} – ${data.endTime} (${data.timezone || 'IST'})` : '[DEMO TIME]');

  // Derive venue name and hall
  const venueName = data?.venueDetails?.name || data?.venue || '[DEMO VENUE]';
  const venueHall = data?.hall || data?.venueDetails?.hall;
  const displayVenue = venueHall ? `${venueName} (${venueHall})` : venueName;

  // Derive address
  const displayAddress = data?.venueDetails?.addressLine || data?.address || '[DEMO ADDRESS]';

  // Derive capacity without urgency language
  const displayCapacity = data?.capacity?.totalSeats 
    ? `${data.capacity.totalSeats} total capacity` 
    : '[DEMO CAPACITY]';

  // Derive fee display
  const displayFee = data?.fee?.isFree 
    ? 'Free Admission (Demo)' 
    : data?.fee?.amount !== undefined 
      ? `${data.fee.currencySymbol || '₹'}${data.fee.amount}` 
      : '[DEMO FEE]';

  const detailsList = [
    {
      id: 'detail-dates',
      icon: Calendar,
      label: 'Dates',
      value: displayDate,
    },
    {
      id: 'detail-time',
      icon: Clock,
      label: 'Timings',
      value: displayTimings,
    },
    {
      id: 'detail-venue',
      icon: Building2,
      label: 'Venue',
      value: displayVenue,
    },
    {
      id: 'detail-address',
      icon: MapPin,
      label: 'Address',
      value: displayAddress,
    },
    {
      id: 'detail-duration',
      icon: CalendarDays,
      label: 'Session Format',
      value: '2-Day In-Person Workshop Sessions',
    },
    {
      id: 'detail-capacity',
      icon: Users,
      label: 'Cohort Capacity',
      value: displayCapacity,
    },
    {
      id: 'detail-status',
      icon: CheckCircle2,
      label: 'Registration Status',
      customValue: renderStatusBadge(data?.registrationStatus || 'UPCOMING'),
    },
    {
      id: 'detail-fee',
      icon: CreditCard,
      label: 'Admission Fee',
      value: displayFee,
      isHighlight: true,
    },
  ];

  return (
    <section
      id="details"
      className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-border-subtle bg-surface-base transition-colors duration-200"
      aria-labelledby="details-heading"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-500 font-headline">
            Logistics & Schedule
          </span>
          <h2
            id="details-heading"
            className="text-2xl sm:text-3xl font-headline font-bold text-content-primary tracking-tight"
          >
            Workshop Details & Schedule
          </h2>
          <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
            Essential session logistics and scheduling for registered participants.
          </p>
        </div>

        {/* Details Table Card */}
        <div className="p-5 sm:p-7 rounded-2xl bg-surface-raised border border-border-subtle shadow-sm space-y-3.5">
          <div className="divide-y divide-border-subtle/60">
            {detailsList.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4 first:pt-0 last:pb-0"
                >
                  <span className="text-xs sm:text-sm font-medium text-content-muted flex items-center gap-2 shrink-0">
                    <Icon className="w-4 h-4 text-brand-500 shrink-0" aria-hidden="true" />
                    <span>{item.label}</span>
                  </span>

                  {item.customValue ? (
                    <div>{item.customValue}</div>
                  ) : (
                    <span
                      className={`text-xs sm:text-sm text-left sm:text-right font-medium max-w-md ${
                        item.isHighlight ? 'text-brand-champagne font-bold' : 'text-content-primary'
                      }`}
                    >
                      {item.value}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Countdown Timer Component */}
        <CountdownTimer
          startDate={data?.startDate}
          startTime={data?.startTime}
          status={data?.registrationStatus}
          label="Workshop Countdown"
        />
      </div>
    </section>
  );
};

export default WorkshopDetailsSection;
