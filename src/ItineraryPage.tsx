import React from 'react';
import { ItineraryContainer } from './components/ItineraryContainer';
import italyData from './data/italy.json';
import helsinkiData from './data/helsinki.json';
import tokyoData from './data/tokyo.json';
import { Day } from './types';

interface DestConfig {
  data: any;
  title: string;
  dates: string;
  coverImage: string;
  routeDesc: string;
}

const DESTINATIONS: Record<string, DestConfig> = {
  italy: {
    data: italyData,
    title: "Italy Itinerary",
    dates: "14 Days • Oct 1 - Oct 14",
    coverImage: "/italy/cover.png",
    routeDesc: "Milan ➔ Dolomites ➔ Florence ➔ Rome"
  },
  helsinki: {
    data: helsinkiData,
    title: "Helsinki Itinerary",
    dates: "Oct 15 - Oct 16",
    coverImage: "/helsinki/cover.jpg",
    routeDesc: "Helsinki City Tour"
  },
  tokyo: {
    data: tokyoData,
    title: "Tokyo Itinerary",
    dates: "Coming Soon",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80",
    routeDesc: "Tokyo ➔ Kyoto ➔ Osaka"
  }
};

interface ItineraryPageProps {
  destinationId: string;
  onBack: () => void;
}

export function ItineraryPage({ destinationId, onBack }: ItineraryPageProps) {
  const config = DESTINATIONS[destinationId];

  if (!config) {
    return <div>Destination not found</div>;
  }

  return (
    <ItineraryContainer
      onBack={onBack}
      destinationId={destinationId}
      initialData={config.data as Day[]}
      title={config.title}
      dates={config.dates}
      coverImage={config.coverImage}
      routeDesc={config.routeDesc}
    />
  );
}
