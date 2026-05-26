import React from 'react';
import { ArrowLeft, Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function TokyoItinerary({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 font-sans font-antialiased selection:bg-[#dfd8c8]">
      <header className="sticky top-0 z-50 bg-[#fcfbf9]/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <motion.button
            key="logo"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={onBack}
            className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors active:scale-95"
          >
            <ArrowLeft className="w-4 h-4" /> Destinations
          </motion.button>
        </div>
      </header>

      <div className="pt-8 pb-16 px-4 max-w-lg mx-auto text-center">
        <MapIcon className="w-12 h-12 text-stone-300 mx-auto mb-4" />
        <h1 className="font-serif text-3xl text-stone-800 mb-2 tracking-tight">Tokyo Itinerary</h1>
        <p className="text-stone-500 font-medium">Coming soon.</p>
      </div>
    </div>
  );
}
