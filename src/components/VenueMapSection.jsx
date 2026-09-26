import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin, Building2, Navigation, ExternalLink } from 'lucide-react';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Configure Leaflet standard marker icon resolution for Vite bundler
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

/**
 * Validates whether latitude and longitude are valid numeric coordinates.
 */
const isValidCoordinatePair = (lat, lng) => {
  if (lat === null || lat === undefined || lng === null || lng === undefined) return false;
  const numLat = Number(lat);
  const numLng = Number(lng);
  if (isNaN(numLat) || isNaN(numLng)) return false;
  if (numLat < -90 || numLat > 90 || numLng < -180 || numLng > 180) return false;
  if (numLat === 0 && numLng === 0) return false;
  return true;
};

/**
 * VenueMapSection Component
 * 
 * Renders an interactive OpenStreetMap + Leaflet map showing the workshop location,
 * venue logistics details, and a direct "Get Directions" action.
 * 
 * Features:
 * - Real interactive React-Leaflet map with pan, zoom, and standard marker popup.
 * - Leaflet CSS loaded with scoped CSS isolation (`isolate z-0`) to prevent z-index conflicts with sticky navbar.
 * - Fallback placeholder state if coordinates are missing/unconfirmed.
 * - Dynamic Google Maps directions link when coordinates exist.
 */
export const VenueMapSection = ({ data }) => {
  const lat = data?.latitude;
  const lng = data?.longitude;
  const hasValidCoords = isValidCoordinatePair(lat, lng);

  const venueName = data?.venueDetails?.name || data?.venue || '[DEMO VENUE]';
  const venueHall = data?.hall || data?.venueDetails?.hall;
  const venueAddress = data?.venueDetails?.addressLine || data?.address || '[DEMO ADDRESS]';
  const city = data?.city;
  const state = data?.state;
  const country = data?.country || 'India';

  const isDemoLocation = data?.isDemoCoordinates || false;

  const directionsUrl = hasValidCoords
    ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    : null;

  return (
    <section
      id="location"
      className="relative w-full py-12 sm:py-16 lg:py-20 border-b border-border-subtle bg-surface-base transition-colors duration-200"
      aria-labelledby="location-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Venue Information & Get Directions CTA */}
          <div className="lg:col-span-5 flex flex-col space-y-5">
            {/* Eyebrow & Heading */}
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-500 font-headline">
                Venue & Location
              </span>
              <h2
                id="location-heading"
                className="text-2xl sm:text-3xl font-headline font-bold text-content-primary tracking-tight"
              >
                Workshop Location
              </h2>
              <p className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                Convenient in-person venue access with dedicated parking and classroom facilities.
              </p>
            </div>

            {/* Structured Venue Address Card */}
            <div className="p-5 rounded-2xl bg-surface-raised border border-border-subtle shadow-sm space-y-4">
              {/* Venue Name & Hall */}
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center shrink-0 text-brand-500">
                  <Building2 className="w-4 h-4" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-headline font-bold text-content-primary leading-tight">
                    {venueName}
                  </h3>
                  {venueHall && (
                    <p className="text-xs text-brand-500 font-medium mt-0.5">
                      {venueHall}
                    </p>
                  )}
                </div>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-3 pt-3 border-t border-border-subtle/60">
                <div className="w-9 h-9 rounded-xl bg-surface-elevated border border-border-subtle flex items-center justify-center shrink-0 text-brand-emerald">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                </div>
                <div className="text-xs sm:text-sm text-content-secondary leading-relaxed">
                  <p>{venueAddress}</p>
                  {(city || state) && (
                    <p className="text-content-muted mt-0.5">
                      {[city, state, country].filter(Boolean).join(' • ')}
                    </p>
                  )}
                </div>
              </div>

              {/* On-Site Logistical Check-in Note */}
              <div className="pt-3 border-t border-border-subtle/60 flex items-center gap-2 text-xs text-content-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald shrink-0" aria-hidden="true" />
                <span>On-site badge collection and registration desk opens 45 mins prior to start.</span>
              </div>
            </div>

            {/* Get Directions CTA */}
            <div className="pt-1">
              {hasValidCoords ? (
                <div>
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-brand-500 text-brand-500 hover:bg-brand-500/10 font-bold text-xs sm:text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                    aria-label={`Get directions to ${venueName} on Google Maps (opens in a new tab)`}
                  >
                    <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-content-muted" aria-hidden="true" />
                  </a>
                  {isDemoLocation && (
                    <p className="text-[11px] text-content-muted mt-1.5 leading-tight">
                      Demo directions — replace after venue confirmation
                    </p>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  disabled
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-surface-raised text-content-muted text-xs sm:text-sm font-medium cursor-not-allowed opacity-70"
                  aria-label="Directions unavailable until venue coordinates are confirmed"
                >
                  <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Directions Pending Confirmation</span>
                </button>
              )}
            </div>

          </div>

          {/* Right Column: Interactive Leaflet Map or Fallback Placeholder */}
          <div className="lg:col-span-7">
            <div className="w-full h-[360px] sm:h-[420px] lg:h-[460px] rounded-2xl bg-surface-raised border border-border-subtle shadow-sm overflow-hidden relative isolate z-0">
              {hasValidCoords ? (
                <>
                  {/* Real interactive React-Leaflet Map */}
                  <MapContainer
                    center={[lat, lng]}
                    zoom={15}
                    scrollWheelZoom={false}
                    className="w-full h-full z-0"
                    attributionControl={true}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[lat, lng]}>
                      <Popup>
                        <div className="p-1 font-sans text-xs">
                          <div className="font-bold text-slate-900">
                            {isDemoLocation ? 'Demo Location — Bengaluru Palace' : 'Workshop Venue'}
                          </div>
                          <div className="text-slate-600 mt-0.5">
                            {isDemoLocation ? 'Temporary preview (Venue to be confirmed)' : venueName}
                          </div>
                        </div>
                      </Popup>
                    </Marker>
                  </MapContainer>

                  {/* Non-intrusive Demo Location Badge */}
                  {isDemoLocation && (
                    <div className="absolute top-3 right-3 z-[1000] inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-surface-base/90 backdrop-blur-xs text-brand-champagne border border-border-subtle shadow-sm select-none pointer-events-none">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse" aria-hidden="true" />
                      <span>Demo Location</span>
                    </div>
                  )}
                </>
              ) : (
                /* Professional Map Placeholder when coordinates are unconfirmed */
                <div className="w-full h-full rounded-2xl bg-surface-elevated/50 border border-dashed border-border-subtle flex flex-col items-center justify-center p-6 text-center relative select-none">
                  <div
                    className="absolute inset-0 bg-radial from-brand-500/5 to-transparent pointer-events-none"
                    aria-hidden="true"
                  />
                  <div className="w-14 h-14 rounded-2xl bg-surface-raised border border-border-subtle flex items-center justify-center text-brand-500 shadow-sm mb-4">
                    <MapPin className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-headline font-bold text-content-primary tracking-tight">
                    Interactive Map Pending
                  </span>
                  <p className="text-xs sm:text-sm text-content-muted mt-2 max-w-sm leading-relaxed">
                    Workshop location will be updated once the venue is confirmed.
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-surface-raised border border-border-subtle text-content-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-amber" aria-hidden="true" />
                    <span>Venue Confirmation in Progress</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VenueMapSection;
