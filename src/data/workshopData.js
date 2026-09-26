/**
 * Workshop Data Model & Mock DTO
 * 
 * IMPORTANT: All values in this file are DEMO / PLACEHOLDER DATA.
 * Neutral placeholders are used so no invented facts or unconfirmed client information appear.
 * 
 * Designed to map 1:1 with a Spring Boot REST API response (e.g. GET /api/v1/workshops/current).
 * Core source data is kept minimal; derived values (e.g. formatted dates, available seats, percentages)
 * are computed by the frontend rather than stored as raw API facts.
 */

export const workshopData = {
  // Core Identifiers & Metadata
  id: "demo-ws-001",
  code: "WS-DEMO-01",
  title: "[DEMO WORKSHOP TITLE]",
  slug: "demo-workshop",
  tagline: "[DEMO TAGLINE]",
  eyebrowBadge: "[DEMO BADGE]",
  
  description: "[DEMO WORKSHOP DESCRIPTION — CLIENT TO PROVIDE DETAILED CURRICULUM AND OVERVIEW]",
  shortDescription: "[DEMO SHORT DESCRIPTION — 2-3 LINES PLACEHOLDER]",

  // Schedule & Timings (Minimal raw API source values)
  startDate: "2026-11-21",
  endDate: "2026-11-22",
  startTime: "09:30",
  endTime: "18:30",
  timezone: "IST",

  // Venue & Geographic Information (Minimal raw source values)
  venue: "[DEMO VENUE]",
  hall: "[DEMO HALL / ROOM]",
  address: "[DEMO ADDRESS - CITY, STATE, PINCODE]",
  city: "[DEMO CITY]",
  state: "[DEMO STATE]",
  postalCode: "[DEMO PINCODE]",
  country: "India",
  // DEMO LOCATION ONLY — NOT CLIENT-CONFIRMED.
  // Replace with the client's actual venue coordinates before production.
  // Do not publish these coordinates as the final workshop location.
  latitude: 12.9988,
  longitude: 77.5921,
  isDemoCoordinates: true,
  demoLocationName: "Bengaluru Palace, Bengaluru",
  mapUrl: null,

  // Admission & Pricing Information (Minimal source values)
  fee: {
    amount: 0,
    currency: "INR",
    currencySymbol: "₹",
    originalAmount: 0,
    discountPercentage: 0,
    isFree: true,
    pricingTier: "STANDARD_DEMO",
  },

  // Capacity (Minimal raw source numbers)
  capacity: {
    totalSeats: 50,
    filledSeats: 0,
    isSoldOut: false,
  },

  // Controlled Registration Status: 'UPCOMING' | 'ONGOING' | 'COMPLETED' | 'CLOSED'
  registrationStatus: "UPCOMING",

  // Instructor / Speaker Profile (Neutral placeholder, no invented experience/claims)
  speaker: {
    name: "[CLIENT SPEAKER / MENTOR NAME]",
    role: "[SPEAKER ROLE / TITLE]",
    organization: "[SPEAKER ORGANIZATION]",
    headline: "[SPEAKER HEADLINE]",
    shortBio: "[CLIENT TO PROVIDE SPEAKER BIOGRAPHY AND BACKGROUND]",
    fullBio: null,
    bio: "[CLIENT TO PROVIDE SPEAKER BIOGRAPHY AND BACKGROUND]",
    image: null,
    avatarUrl: null,
    youtubeChannelUrl: null,
  },

  // Visual Asset Placeholders (Null until client assets are supplied)
  image: {
    heroUrl: null,
    venueMapPlaceholderUrl: null,
    speakerPhotoUrl: null,
  },

  // Detailed Workshop Narrative (Expandable text context placeholder)
  aboutWorkshop: {
    shortSummary: "[DEMO OVERVIEW SUMMARY — CLIENT TO PROVIDE ACCURATE WORKSHOP SYNOPSIS]",
    fullDetails: "[DEMO DETAILED CONTEXT — CLIENT TO PROVIDE IN-DEPTH CURRICULUM DESCRIPTION]",
  },

  // Target Audience Segments (Neutral structural templates)
  targetAudience: [
    {
      id: "aud-01",
      title: "[TARGET AUDIENCE 1]",
      description: "[DESCRIPTION OF TARGET AUDIENCE 1 — CLIENT TO PROVIDE CRITERIA]",
      icon: "storefront",
    },
    {
      id: "aud-02",
      title: "[TARGET AUDIENCE 2]",
      description: "[DESCRIPTION OF TARGET AUDIENCE 2 — CLIENT TO PROVIDE CRITERIA]",
      icon: "inventory_2",
    },
    {
      id: "aud-03",
      title: "[TARGET AUDIENCE 3]",
      description: "[DESCRIPTION OF TARGET AUDIENCE 3 — CLIENT TO PROVIDE CRITERIA]",
      icon: "trending_up",
    },
    {
      id: "aud-04",
      title: "[TARGET AUDIENCE 4]",
      description: "[DESCRIPTION OF TARGET AUDIENCE 4 — CLIENT TO PROVIDE CRITERIA]",
      icon: "domain",
    },
  ],

  // Curriculum / What You Will Learn (Neutral structural templates)
  whatYouWillLearn: [
    {
      id: "mod-01",
      number: "01",
      title: "[MODULE 1 TITLE]",
      description: "[MODULE 1 DETAILS — TOPICS, TECHNIQUES AND OUTCOMES COVERED IN THIS SESSION]",
      focusArea: "[MODULE 1 FOCUS AREA]",
    },
    {
      id: "mod-02",
      number: "02",
      title: "[MODULE 2 TITLE]",
      description: "[MODULE 2 DETAILS — TOPICS, TECHNIQUES AND OUTCOMES COVERED IN THIS SESSION]",
      focusArea: "[MODULE 2 FOCUS AREA]",
    },
    {
      id: "mod-03",
      number: "03",
      title: "[MODULE 3 TITLE]",
      description: "[MODULE 3 DETAILS — TOPICS, TECHNIQUES AND OUTCOMES COVERED IN THIS SESSION]",
      focusArea: "[MODULE 3 FOCUS AREA]",
    },
    {
      id: "mod-04",
      number: "04",
      title: "[MODULE 4 TITLE]",
      description: "[MODULE 4 DETAILS — TOPICS, TECHNIQUES AND OUTCOMES COVERED IN THIS SESSION]",
      focusArea: "[MODULE 4 FOCUS AREA]",
    },
  ],

  // Briefing Video (Null until real client video is provided)
  video: {
    title: "[DEMO VIDEO TITLE]",
    duration: null,
    recordedAt: null,
    youtubeEmbedId: null,
    placeholderThumbnailUrl: null,
  },

  // Social Links & Contact Channels (Null / non-functional placeholders)
  socialLinks: {
    whatsappNumber: null,
    whatsappPrefillMessage: null,
    whatsappUrl: null,
    admissionsEmail: null,
    supportHours: "[SUPPORT HOURS — CLIENT TO PROVIDE]",
    youtubeUrl: null,
    termsUrl: null,
    privacyUrl: null,
    conductUrl: null,
  },

  // Sample Attendee Feedback (Neutral structural templates)
  testimonials: [
    {
      id: "demo-test-01",
      name: "[ATTENDEE NAME 1]",
      role: "[ATTENDEE ROLE / STORE 1]",
      cohort: "[COHORT LABEL 1]",
      quote: "[TESTIMONIAL QUOTE 1 — CLIENT TO PROVIDE VERIFIED REVIEWS]",
      duration: null,
    },
    {
      id: "demo-test-02",
      name: "[ATTENDEE NAME 2]",
      role: "[ATTENDEE ROLE / STORE 2]",
      cohort: "[COHORT LABEL 2]",
      quote: "[TESTIMONIAL QUOTE 2 — CLIENT TO PROVIDE VERIFIED REVIEWS]",
      duration: null,
    },
    {
      id: "demo-test-03",
      name: "[ATTENDEE NAME 3]",
      role: "[ATTENDEE ROLE / STORE 3]",
      cohort: "[COHORT LABEL 3]",
      quote: "[TESTIMONIAL QUOTE 3 — CLIENT TO PROVIDE VERIFIED REVIEWS]",
      duration: null,
    },
  ],

  // Frequently Asked Questions (Neutral structural templates)
  faqs: [
    {
      id: "demo-faq-01",
      question: "[FAQ QUESTION 1 — WHO CAN ATTEND?]",
      answer: "[FAQ ANSWER 1 — CLIENT TO PROVIDE PARTICIPATION ELIGIBILITY CRITERIA]",
    },
    {
      id: "demo-faq-02",
      question: "[FAQ QUESTION 2 — IS THERE AN ADMISSION FEE?]",
      answer: "[FAQ ANSWER 2 — CLIENT TO PROVIDE FEE AND ADMISSION DETAILS]",
    },
    {
      id: "demo-faq-03",
      question: "[FAQ QUESTION 3 — WHAT SHOULD ATTENDEES BRING?]",
      answer: "[FAQ ANSWER 3 — CLIENT TO PROVIDE CHECKLIST FOR ATTENDEES]",
    },
    {
      id: "demo-faq-04",
      question: "[FAQ QUESTION 4 — WILL RECORDINGS OR MATERIALS BE PROVIDED?]",
      answer: "[FAQ ANSWER 4 — CLIENT TO PROVIDE DETAILS ON SLIDES / RECORDINGS]",
    },
    {
      id: "demo-faq-05",
      question: "[FAQ QUESTION 5 — HOW WILL CONFIRMATION BE COMMUNICATED?]",
      answer: "[FAQ ANSWER 5 — CLIENT TO PROVIDE DETAILS ON CONFIRMATION PROCESS]",
    },
  ],
};

// Backward-compatibility properties & aliases for existing FoundationPage
workshopData.schedule = {
  formattedDate: "[DEMO DATE]",
  startTime: workshopData.startTime,
  endTime: workshopData.endTime,
  timezone: workshopData.timezone,
};
workshopData.capacity.availableSeats = workshopData.capacity.totalSeats - workshopData.capacity.filledSeats;
workshopData.capacity.fillPercentage = 0;
workshopData.learningPoints = workshopData.whatYouWillLearn;
workshopData.faqPlaceholders = workshopData.faqs;

export const mockWorkshopData = workshopData;
export default workshopData;
