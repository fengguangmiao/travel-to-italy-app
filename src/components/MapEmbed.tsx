import React from 'react';
import { cn } from '../lib/utils';
import { Map as MapIcon, Footprints, Car, Train } from 'lucide-react';
import { RouteData } from '../data/itinerary';

interface MapEmbedProps {
  query?: string;
  routeData?: RouteData;
  className?: string;
  hideOpenButton?: boolean;
  hideMapIframe?: boolean;
}

const ModeIcon = ({ mode }: { mode: RouteData['mode'] }) => {
  switch (mode) {
    case 'walk': return <Footprints className="w-4 h-4 text-emerald-600" />;
    case 'transit': return <Train className="w-4 h-4 text-blue-600" />;
    case 'car':
    default:
      return <Car className="w-4 h-4 text-amber-600" />;
  }
};

export function MapEmbed({ query, routeData, className, hideOpenButton, hideMapIframe }: MapEmbedProps) {
  let mapSrc = '';
  let googleMapsLink = '';
  
  if (routeData && routeData.waypoints.length > 0) {
    const route = routeData.waypoints;
    let dirflg = 'd'; // driving
    let modeParam = 'driving';
    
    if (routeData.mode === 'walk') {
      dirflg = 'w';
      modeParam = 'walking';
    } else if (routeData.mode === 'transit') {
      dirflg = 'r';
      modeParam = 'transit';
    }

    if (route.length > 1) {
      const origin = route[0];
      const destination = route[route.length - 1];
      const waypoints = route.slice(1, -1);
      
      const saddr = encodeURIComponent(origin);
      let daddr = encodeURIComponent(destination);
      if (waypoints.length > 0) {
        daddr = waypoints.map(wp => encodeURIComponent(wp)).join('+to:') + '+to:' + daddr;
      }
      mapSrc = `https://maps.google.com/maps?saddr=${saddr}&daddr=${daddr}&dirflg=${dirflg}&output=embed`;
      
      const wpQuery = waypoints.length > 0 ? `&waypoints=${waypoints.map(w => encodeURIComponent(w)).join('|')}` : '';
      googleMapsLink = `https://www.google.com/maps/dir/?api=1&origin=${saddr}&destination=${encodeURIComponent(destination)}&travelmode=${modeParam}${wpQuery}`;

    } else if (route.length === 1) {
      mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(route[0])}&t=&z=14&ie=UTF8&output=embed`;
      googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(route[0])}`;
    }
  } else if (query) {
    mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=14&ie=UTF8&output=embed`;
    googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  }

  if (!mapSrc) return null;

  const borderTheme = routeData?.mode === 'walk' ? 'border-emerald-200 shadow-emerald-900/5' :
                      routeData?.mode === 'transit' ? 'border-blue-200 shadow-blue-900/5' : 'border-amber-200 shadow-amber-900/5';

  return (
    <div className="flex flex-col w-full mb-6 relative">
      {routeData && (
        <div className="flex items-center gap-2 px-1 mb-2">
          <div className="p-1.5 bg-stone-100 rounded-full shadow-sm">
            <ModeIcon mode={routeData.mode} />
          </div>
          <span className="font-sans font-medium text-stone-700 text-sm tracking-wide">
            {routeData.label || '路线地图'}
          </span>
        </div>
      )}
      {!hideMapIframe && (
        <div className={cn("w-full overflow-hidden rounded-2xl shadow-sm border-2 bg-stone-50 relative", borderTheme, className)}>
          <iframe
            width="100%"
            height="100%"
            className="border-0 absolute inset-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            style={{ filter: "sepia(0.12) hue-rotate(-5deg) contrast(0.98)" }}
            src={mapSrc}
          />
        </div>
      )}
      {!hideOpenButton && googleMapsLink && (
        <a 
          href={googleMapsLink}
          target="_blank"
          rel="noreferrer"
          className={cn("w-full inline-flex items-center justify-center gap-2 bg-[#efece5] hover:bg-[#e4dfd4] text-stone-800 text-sm font-medium py-2.5 px-4 rounded-xl transition-colors", hideMapIframe ? "mt-0" : "mt-2")}
        >
          <MapIcon className="w-4 h-4" /> 开启 Google Maps 导航
        </a>
      )}
    </div>
  );
}
