import React, { useState } from 'react';
import { LandingPage, Destination } from './components/LandingPage';
import { ItineraryPage } from './ItineraryPage';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
  const [currentView, setCurrentView] = useState<Destination>('landing');

  const handleSelectDestination = (dest: Destination) => {
    setCurrentView(dest);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence mode="wait">
      {currentView === 'landing' && (
        <motion.div
          key="landing"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
        >
          <LandingPage onSelectDestination={handleSelectDestination} />
        </motion.div>
      )}
      {currentView !== 'landing' && (
        <motion.div
          key="itinerary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <ItineraryPage destinationId={currentView} onBack={handleBack} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
