import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Calendar, 
  Clock, 
  MapPin, 
  AlertCircle, 
  ShieldCheck, 
  RotateCcw
} from 'lucide-react';
import Button from './Button';

/**
 * Validation helpers for registration form
 */
const validateFullName = (value) => {
  if (!value || !value.trim()) {
    return 'Please enter your full name.';
  }
  if (value.trim().length < 2) {
    return 'Full name must be at least 2 characters.';
  }
  return null;
};

const validatePhone = (value) => {
  if (!value || !value.trim()) {
    return 'Please enter a valid phone number.';
  }
  const digitsOnly = value.replace(/\D/g, '');
  
  // Standard Indian mobile number is 10 digits (optionally with +91, 91, or leading 0)
  let standard10 = digitsOnly;
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    standard10 = digitsOnly.slice(2);
  } else if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    standard10 = digitsOnly.slice(1);
  }

  if (standard10.length !== 10) {
    return 'Please enter a valid 10-digit mobile number.';
  }

  if (!/^[6-9]/.test(standard10)) {
    return 'Mobile number must start with 6, 7, 8, or 9.';
  }

  // Reject repeated single digits (e.g. 9999999999)
  if (/^(\d)\1{9}$/.test(standard10)) {
    return 'Please enter a valid phone number.';
  }

  // Reject sequential sequences
  if (['1234567890', '9876543210', '0123456789'].includes(standard10)) {
    return 'Please enter a valid phone number.';
  }

  return null;
};

const validateEmail = (value) => {
  if (!value || !value.trim()) {
    return 'Please enter a valid email address.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(value.trim())) {
    return 'Please enter a valid email address.';
  }
  return null;
};

const validateAge = (value) => {
  if (!value || value.trim() === '') return null; // Age is optional
  const num = Number(value);
  if (isNaN(num) || !Number.isInteger(num) || num < 16 || num > 100) {
    return 'Please enter a valid age between 16 and 100.';
  }
  return null;
};

const validateConsent = (value) => {
  if (!value) {
    return 'Please accept the registration consent.';
  }
  return null;
};

/**
 * RegistrationSection Component
 * 
 * Provides the interactive registration form for the offline workshop.
 * Features:
 * - Client-side validation for required (Name, Phone, Email, Consent) & optional (Age, Organization) fields.
 * - Dynamic workshop summary from workshopData.js.
 * - Simulated submission with loading state (no backend/database/API storage).
 * - Polished demo success card with "Register Another" reset action.
 * - Respects controlled registration status (UPCOMING, ONGOING, COMPLETED, CLOSED).
 */
export const RegistrationSection = ({ data }) => {
  const workshopTitle = data?.title || '[DEMO WORKSHOP TITLE]';
  const displayDate = data?.schedule?.formattedDate || 
    (data?.startDate && data?.endDate ? `${data.startDate} to ${data.endDate}` : data?.startDate || '[DEMO DATE]');
  const displayTimings = data?.schedule?.timings || 
    (data?.startTime && data?.endTime ? `${data.startTime} – ${data.endTime} (${data.timezone || 'IST'})` : '[DEMO TIME]');
  const venueName = data?.venueDetails?.name || data?.venue || '[DEMO VENUE]';
  const venueAddress = data?.venueDetails?.addressLine || data?.address || '[DEMO ADDRESS]';
  const status = data?.registrationStatus || 'UPCOMING';

  const isClosed = status === 'CLOSED' || status === 'COMPLETED';

  // Form State
  const initialFormState = {
    fullName: '',
    phone: '',
    email: '',
    age: '',
    organization: '',
    consent: false,
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState(null);

  // Field change handler
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));

    // Clear error on change if already touched
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  // Field blur handler
  const handleBlur = (e) => {
    const { name, value, checked } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    let error = null;
    if (name === 'fullName') error = validateFullName(value);
    if (name === 'phone') error = validatePhone(value);
    if (name === 'email') error = validateEmail(value);
    if (name === 'age') error = validateAge(value);
    if (name === 'consent') error = validateConsent(checked);

    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Form submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSubmitting || isClosed) return;

    // Validate all fields
    const validationErrors = {
      fullName: validateFullName(formData.fullName),
      phone: validatePhone(formData.phone),
      email: validateEmail(formData.email),
      age: validateAge(formData.age),
      consent: validateConsent(formData.consent),
    };

    // Filter out null errors
    const activeErrors = Object.entries(validationErrors).reduce((acc, [key, err]) => {
      if (err) acc[key] = err;
      return acc;
    }, {});

    if (Object.keys(activeErrors).length > 0) {
      setErrors(activeErrors);
      setTouched({
        fullName: true,
        phone: true,
        email: true,
        age: true,
        consent: true,
      });

      // Focus first errored element for accessibility
      const firstErrorField = Object.keys(activeErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.focus();
      }
      return;
    }

    // Begin simulated submission (Frontend demo only, no backend/database transmission)
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setSubmittedSummary({
        name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        organization: formData.organization.trim(),
      });
      // Do NOT persist to localStorage/sessionStorage/cookies
    }, 900);
  };

  // Reset to form state
  const handleReset = () => {
    setFormData(initialFormState);
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
    setSubmittedSummary(null);
  };

  return (
    <section
      id="register"
      className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-border-subtle bg-surface-base transition-colors duration-200"
      aria-labelledby="register-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Workshop Summary & Logistics Note */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500 font-headline">
                Workshop Registration
              </span>
              <h2
                id="register-heading"
                className="text-2xl sm:text-3xl font-headline font-bold text-content-primary tracking-tight"
              >
                Secure Your Seat
              </h2>
              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                Complete the admission form to register for this in-person masterclass.
              </p>
            </div>

            {/* Workshop Overview Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-surface-raised border border-border-subtle shadow-sm space-y-4">
              {/* Workshop Title */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-content-muted font-headline">
                  Selected Session
                </span>
                <h3 className="text-base sm:text-lg font-headline font-bold text-content-primary leading-snug">
                  {workshopTitle}
                </h3>
              </div>

              {/* Schedule and Timings */}
              <div className="space-y-2.5 pt-3 border-t border-border-subtle/60 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 text-content-secondary">
                  <Calendar className="w-4 h-4 text-brand-500 shrink-0" aria-hidden="true" />
                  <span>{displayDate}</span>
                </div>
                <div className="flex items-center gap-2.5 text-content-secondary">
                  <Clock className="w-4 h-4 text-brand-500 shrink-0" aria-hidden="true" />
                  <span>{displayTimings}</span>
                </div>
                <div className="flex items-start gap-2.5 text-content-secondary">
                  <MapPin className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="leading-tight">
                    <p className="font-medium text-content-primary">{venueName}</p>
                    <p className="text-xs text-content-muted mt-0.5">{venueAddress}</p>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="pt-3 border-t border-border-subtle/60 flex items-center justify-between text-xs">
                <span className="text-content-muted">Admissions Status:</span>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold ${
                  status === 'UPCOMING'
                    ? 'bg-brand-emerald/10 text-brand-emerald border border-brand-emerald/20'
                    : status === 'ONGOING'
                    ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                    : 'bg-surface-elevated text-content-muted border border-border-subtle'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    status === 'UPCOMING' ? 'bg-brand-emerald' : status === 'ONGOING' ? 'bg-brand-500' : 'bg-content-muted'
                  }`} />
                  <span>{status}</span>
                </span>
              </div>
            </div>

            {/* In-Person Logistics Guarantee */}
            <div className="p-4 rounded-xl bg-surface-raised border border-border-subtle text-xs text-content-secondary space-y-1.5">
              <div className="flex items-center gap-2 text-content-primary font-headline font-bold">
                <ShieldCheck className="w-4 h-4 text-brand-emerald shrink-0" aria-hidden="true" />
                <span>Admission Protocol</span>
              </div>
              <p className="text-content-muted leading-relaxed">
                Cohort sizes are strictly regulated to maintain hands-on classroom interaction. Physical delegate kits and credentials are provided at the venue.
              </p>
            </div>
          </div>

          {/* Right Column: Registration Form or Success State or Closed Notice */}
          <div className="lg:col-span-7">
            {isClosed ? (
              /* Registration Closed State */
              <div className="p-6 sm:p-8 rounded-2xl bg-surface-raised border border-border-subtle text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center mx-auto text-content-muted">
                  <Clock className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-headline font-bold text-content-primary">
                    Registration is Currently Closed
                  </h3>
                  <p className="text-xs sm:text-sm text-content-muted max-w-sm mx-auto leading-relaxed">
                    Admissions for this workshop cohort are concluded. Please check back for updates regarding future scheduled dates.
                  </p>
                </div>
              </div>
            ) : isSubmitted ? (
              /* Polished Demo Success Card */
              <div
                role="status"
                aria-live="polite"
                className="p-6 sm:p-8 rounded-2xl bg-surface-raised border border-brand-emerald/30 shadow-sm space-y-5 animate-in fade-in zoom-in-95 duration-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald shrink-0">
                    <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-headline font-bold text-content-primary">
                        Registration Submitted
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-brand-500/10 text-brand-500 border border-brand-500/20">
                        Demo
                      </span>
                    </div>
                    <p className="text-xs text-content-secondary mt-0.5">
                      Your interest has been registered for this session.
                    </p>
                  </div>
                </div>

                {/* Neutral demo supporting message */}
                <div className="p-4 rounded-xl bg-surface-elevated/60 border border-border-subtle text-xs sm:text-sm text-content-secondary leading-relaxed">
                  Your registration details have been captured in this demo. Backend confirmation will be connected after client approval.
                </div>

                {/* Submitted Summary Details */}
                {submittedSummary && (
                  <div className="p-4 rounded-xl bg-surface-elevated/40 border border-border-subtle/60 text-xs space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-content-muted font-headline">
                      Submission Summary
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-content-secondary pt-1">
                      <div>
                        <span className="text-content-muted">Attendee: </span>
                        <span className="font-semibold text-content-primary">{submittedSummary.name}</span>
                      </div>
                      <div>
                        <span className="text-content-muted">Email: </span>
                        <span className="font-semibold text-content-primary">{submittedSummary.email}</span>
                      </div>
                      <div>
                        <span className="text-content-muted">Phone: </span>
                        <span className="font-semibold text-content-primary">{submittedSummary.phone}</span>
                      </div>
                      {submittedSummary.organization && (
                        <div>
                          <span className="text-content-muted">Organization: </span>
                          <span className="font-semibold text-content-primary">{submittedSummary.organization}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action button: Register Another */}
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleReset}
                    leftIcon={RotateCcw}
                    className="w-full sm:w-auto"
                  >
                    Register Another
                  </Button>
                </div>
              </div>
            ) : (
              /* Active Registration Form */
              <div className="p-6 sm:p-8 rounded-2xl bg-surface-raised border border-border-subtle shadow-sm">
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                  
                  {/* Workshop Display Field (Readonly) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-content-secondary uppercase tracking-wider">
                      Selected Workshop
                    </label>
                    <div className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated/80 border border-border-subtle text-content-primary text-xs sm:text-sm font-medium flex items-center justify-between select-none">
                      <span className="truncate">{workshopTitle}</span>
                      <span className="text-[10px] font-bold text-brand-500 uppercase tracking-wider shrink-0 ml-2">
                        Confirmed
                      </span>
                    </div>
                  </div>

                  {/* Row: Full Name & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="fullName" className="block text-xs font-semibold text-content-primary">
                        Full Name <span className="text-brand-amber" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.fullName}
                        aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                        placeholder="e.g. Rahul Sharma"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border text-xs sm:text-sm text-content-primary placeholder:text-content-muted transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 ${
                          errors.fullName && touched.fullName
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-border-default focus:border-brand-500'
                        }`}
                      />
                      {errors.fullName && touched.fullName && (
                        <p id="fullName-error" role="alert" className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone Number */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="block text-xs font-semibold text-content-primary">
                        Phone Number <span className="text-brand-amber" aria-hidden="true">*</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        placeholder="10-digit mobile (e.g. 9876543210)"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border text-xs sm:text-sm text-content-primary placeholder:text-content-muted transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 ${
                          errors.phone && touched.phone
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-border-default focus:border-brand-500'
                        }`}
                      />
                      {errors.phone && touched.phone && (
                        <p id="phone-error" role="alert" className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold text-content-primary">
                      Email Address <span className="text-brand-amber" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      placeholder="e.g. rahul@example.com"
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border text-xs sm:text-sm text-content-primary placeholder:text-content-muted transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 ${
                        errors.email && touched.email
                          ? 'border-red-500/80 focus:border-red-500'
                          : 'border-border-default focus:border-brand-500'
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p id="email-error" role="alert" className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Row: Age (Optional) & Organization (Optional) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Age */}
                    <div className="space-y-1.5">
                      <label htmlFor="age" className="block text-xs font-semibold text-content-secondary">
                        Age <span className="text-content-muted text-[11px]">(Optional)</span>
                      </label>
                      <input
                        id="age"
                        name="age"
                        type="number"
                        min="16"
                        max="100"
                        value={formData.age}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.age}
                        aria-describedby={errors.age ? 'age-error' : undefined}
                        placeholder="e.g. 28"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border text-xs sm:text-sm text-content-primary placeholder:text-content-muted transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 ${
                          errors.age && touched.age
                            ? 'border-red-500/80 focus:border-red-500'
                            : 'border-border-default focus:border-brand-500'
                        }`}
                      />
                      {errors.age && touched.age && (
                        <p id="age-error" role="alert" className="text-xs text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.age}</span>
                        </p>
                      )}
                    </div>

                    {/* Organization / Company */}
                    <div className="space-y-1.5">
                      <label htmlFor="organization" className="block text-xs font-semibold text-content-secondary">
                        Organization / Store <span className="text-content-muted text-[11px]">(Optional)</span>
                      </label>
                      <input
                        id="organization"
                        name="organization"
                        type="text"
                        autoComplete="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        placeholder="e.g. Retail Store or Brand"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-surface-elevated border border-border-default text-xs sm:text-sm text-content-primary placeholder:text-content-muted transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500"
                      />
                    </div>
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        required
                        checked={formData.consent}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!errors.consent}
                        aria-describedby={errors.consent ? 'consent-error' : undefined}
                        className="w-4 h-4 mt-0.5 rounded border-border-default text-brand-500 focus:ring-brand-500/50 bg-surface-elevated cursor-pointer"
                      />
                      <span className="text-xs text-content-secondary leading-snug">
                        I agree to provide my details for workshop registration.
                      </span>
                    </label>
                    {errors.consent && touched.consent && (
                      <p id="consent-error" role="alert" className="text-xs text-red-500 flex items-center gap-1 mt-1.5">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      isLoading={isSubmitting}
                      disabled={isSubmitting}
                      className="w-full justify-center shadow-lg shadow-amber-500/10"
                    >
                      {isSubmitting ? 'Submitting...' : 'Register Now'}
                    </Button>
                  </div>

                  {/* Security / Demo Notice */}
                  <p className="text-[11px] text-content-muted text-center leading-relaxed">
                    Demo Mode: Submission verifies client-side validation without transmitting personal data.
                  </p>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default RegistrationSection;
