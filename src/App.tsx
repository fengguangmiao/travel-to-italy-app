import React, { useState, useEffect, useRef } from 'react';
import { Overview } from './components/Overview';
import { DayItinerary } from './components/DayItinerary';
import { itinerary } from './data/itinerary';
import { ArrowLeft, Menu, Map as MapIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'day'>('overview');
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldScrollRef = useRef(false);

  // Allow clicking back to overview
  const goBack = () => {
    setActiveTab('overview');
    shouldScrollRef.current = true;
  };

  const selectDay = (dayId: number) => {
    setSelectedDay(dayId);
    setActiveTab('day');
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const dayData = itinerary.find(d => d.dayNumber === selectedDay);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-800 font-sans font-antialiased selection:bg-[#dfd8c8]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-[#fcfbf9]/80 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {activeTab === 'day' ? (
              <motion.button
                key="back"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                onClick={goBack}
                className="flex items-center gap-1.5 text-stone-600 hover:text-stone-900 font-medium text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Overview
              </motion.button>
            ) : (
              <motion.div
                key="logo"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center gap-2 font-serif text-lg font-medium text-stone-800"
              >
                <MapIcon className="w-5 h-5 text-[#8a816c]" />
                Italy Trip
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Directory Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-16 left-4 right-4 bg-white rounded-2xl shadow-xl z-50 max-h-[70vh] overflow-y-auto border border-stone-100 p-2 max-w-lg mx-auto"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {itinerary.map(day => (
                  <button
                    key={day.id}
                    onClick={() => selectDay(day.dayNumber)}
                    className={`p-3 rounded-xl text-left border ${selectedDay === day.dayNumber && activeTab === 'day' ? 'bg-[#f4efe6] border-[#dfd8c8] text-stone-900' : 'bg-transparent border-transparent text-stone-600 hover:bg-stone-50'}`}
                  >
                    <div className="font-serif font-medium mb-0.5">Day {day.dayNumber}</div>
                    <div className="text-xs text-stone-400 truncate">{day.date}</div>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence 
        mode="wait"
        onExitComplete={() => {
          if (activeTab === 'overview' && shouldScrollRef.current) {
            shouldScrollRef.current = false;
            // Delay slightly so layout gets calculated
            setTimeout(() => {
              const el = document.getElementById(`overview-day-${selectedDay}`);
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'instant' });
              }
            }, 50);
          }
        }}
      >
        {activeTab === 'overview' ? (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Overview onSelectDay={selectDay} />
          </motion.div>
        ) : (
          <motion.div
            key="day"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {dayData && <DayItinerary day={dayData} />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
