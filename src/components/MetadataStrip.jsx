import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

/**
 * Reusable MetadataStrip component for Date, Time, and Location.
 * Consumes raw or formatted props from workshopData and derives display labels.
 */
export const MetadataStrip = ({
  startDate,
  endDate,
  formattedDate,
  startTime,
  endTime,
  timezone = 'IST',
  venue = '[DEMO VENUE]',
  city,
  className = '',
}) => {
  // Derive readable date display
  const displayDate = formattedDate || (startDate && endDate ? `${startDate} to ${endDate}` : startDate || '[DEMO DATE]');
  
  // Derive readable time display
  const displayTime = startTime && endTime ? `${startTime} – ${endTime} (${timezone})` : '[DEMO TIME]';
  
  // Derive readable location display
  const displayLocation = city && venue ? `${venue}, ${city}` : venue || '[DEMO LOCATION]';

  const metadataItems = [
    {
      id: 'meta-date',
      label: 'Date',
      value: displayDate,
      icon: Calendar,
    },
    {
      id: 'meta-time',
      label: 'Time',
      value: displayTime,
      icon: Clock,
    },
    {
      id: 'meta-location',
      label: 'Location',
      value: displayLocation,
      icon: MapPin,
    },
  ];

  return (
    <div
      className={`w-full max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 ${className}`}
      aria-label="Workshop Schedule and Venue Information"
    >
      {metadataItems.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-surface-raised border border-border-subtle shadow-sm transition-colors text-left"
          >
            <div className="w-10 h-10 rounded-lg bg-surface-elevated border border-border-subtle flex items-center justify-center shrink-0 text-brand-500">
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-content-muted leading-tight">
                {item.label}
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-content-primary truncate mt-0.5" title={item.value}>
                {item.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetadataStrip;
