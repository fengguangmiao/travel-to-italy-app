import React from 'react';
import { Map as MapIcon, Plane, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export type Destination = 'landing' | 'italy' | 'helsinki' | 'tokyo';

interface LandingPageProps {
  onSelectDestination: (dest: Destination) => void;
}

export function LandingPage({ onSelectDestination }: LandingPageProps) {
  const destinations = [
    {
      id: 'italy',
      title: 'Italy',
      dates: 'Oct 1 - Oct 14',
      image: './cover.png',
      description: 'Milan ➔ Dolomites ➔ Florence ➔ Rome',
      ready: true
    },
    {
      id: 'helsinki',
      title: 'Helsinki',
      dates: 'Oct 15 - Oct 16',
      image: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?w=800&q=80',
      description: 'Nordic design & architecture',
      ready: true
    },
    {
      id: 'tokyo',
      title: 'Tokyo',
      dates: 'Oct 17 - Oct 20',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
      description: 'Neon city lights & culture',
      ready: true
    }
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 font-sans font-antialiased selection:bg-[#dfd8c8]">
      <header className="sticky top-0 z-50 bg-[#fcfbf9]/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-center">
          <div className="flex items-center gap-2 font-serif text-lg font-medium text-stone-800">
            <Plane className="w-5 h-5 text-[#8a816c]" />
            Global Itineraries
          </div>
        </div>
      </header>

      <div className="pt-8 pb-16 px-4 max-w-lg mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl text-stone-800 mb-3 tracking-tight">Select Destination</h1>
          <p className="text-stone-500 font-medium">Choose a trip to view its itinerary</p>
        </div>

        <div className="flex flex-col gap-6">
          {destinations.map((dest, i) => (
            <motion.button
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileTap={dest.ready ? { scale: 0.98 } : {}}
              onClick={() => dest.ready && onSelectDestination(dest.id as Destination)}
              className="group text-left relative bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 hover:shadow-md hover:border-stone-200 transition-all block w-full"
            >
              <div className="h-48 relative overflow-hidden bg-stone-100">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="font-serif text-3xl text-white mb-1 drop-shadow-sm">{dest.title}</h2>
                  <p className="text-white/90 text-sm font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" /> {dest.dates}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-white flex items-center justify-between">
                <p className="text-stone-600 text-sm font-medium">{dest.description}</p>
                <div className="w-8 h-8 rounded-full bg-[#f4efe6] flex items-center justify-center text-[#8a816c] group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  <MapIcon className="w-4 h-4" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
