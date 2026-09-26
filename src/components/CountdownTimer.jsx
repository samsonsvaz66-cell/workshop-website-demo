import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

/**
 * Safely parses startDate (YYYY-MM-DD) and startTime (HH:MM or HH:MM AM/PM)
 * into a valid Date object without external libraries.
 */
const parseTargetTimestamp = (startDate, startTime) => {
  if (!startDate) return null;

  try {
    let hours = 9;
    let minutes = 30;

    if (startTime) {
      const match = String(startTime).match(/(\d+):(\d+)\s*(AM|PM)?/i);
      if (match) {
        hours = parseInt(match[1], 10);
        minutes = parseInt(match[2], 10);
        const meridiem = match[3]?.toUpperCase();
        if (meridiem === 'PM' && hours < 12) hours += 12;
        if (meridiem === 'AM' && hours === 12) hours = 0;
      }
    }

    const target = new Date(startDate);
    if (isNaN(target.getTime())) return null;

    target.setHours(hours, minutes, 0, 0);
    return target.getTime();
  } catch {
    return null;
  }
};

/**
 * Reusable CountdownTimer Component
 * Derives target timestamp dynamically from startDate + startTime props.
 * Automatically clears interval on unmount and handles past/closed events gracefully.
 */
export const CountdownTimer = ({
  startDate,
  startTime,
  status = 'UPCOMING',
  label = 'Workshop Starts In',
  className = '',
}) => {
  const [timeLeft, setTimeLeft] = useState(() => {
    const targetTime = parseTargetTimestamp(startDate, startTime);
    if (!targetTime || status === 'COMPLETED' || status === 'CLOSED') {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    const diff = targetTime - Date.now();
    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      isPast: false,
    };
  });

  useEffect(() => {
    const targetTime = parseTargetTimestamp(startDate, startTime);
    if (!targetTime || status === 'COMPLETED' || status === 'CLOSED') {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
      return;
    }

    const calculateTime = () => {
      const diff = targetTime - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isPast: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [startDate, startTime, status]);

  const units = [
    { label: 'Days', value: String(timeLeft.days).padStart(2, '0') },
    { label: 'Hours', value: String(timeLeft.hours).padStart(2, '0') },
    { label: 'Mins', value: String(timeLeft.minutes).padStart(2, '0') },
    { label: 'Secs', value: String(timeLeft.seconds).padStart(2, '0') },
  ];

  return (
    <div
      className={`p-3.5 sm:p-4 rounded-2xl bg-surface-elevated border border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 shadow-sm ${className}`}
      aria-label="Workshop Countdown"
    >
      <div className="flex items-center gap-2.5 text-center sm:text-left">
        <div className="w-8 h-8 rounded-lg bg-surface-raised border border-border-subtle flex items-center justify-center text-brand-500 shrink-0">
          <Timer className="w-4 h-4" aria-hidden="true" />
        </div>
        <div>
          <span className="block text-xs font-headline font-bold text-content-primary">
            {label}
          </span>
          <span className="block text-[11px] text-content-muted">
            {timeLeft.isPast ? 'Cohort in progress / concluded' : 'Target offline schedule'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 text-center w-full sm:w-auto">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="px-2.5 py-1.5 rounded-xl bg-surface-raised border border-border-subtle min-w-[50px] sm:min-w-[58px]"
          >
            <span className="block text-base sm:text-lg font-headline font-bold text-brand-500 font-mono tracking-tight leading-none">
              {unit.value}
            </span>
            <span className="block text-[10px] font-semibold text-content-muted uppercase tracking-wider mt-1">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CountdownTimer;
