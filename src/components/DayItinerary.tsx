import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Navigation, ExternalLink, Map as MapIcon, Coffee, Utensils, Hotel, Camera, Sunrise, Sunset, Info } from 'lucide-react';
import { Activity, Day } from '../data/itinerary';
import { MapEmbed } from './MapEmbed';
import { cn } from '../lib/utils';

export function getActivityIcon(type: Activity['type']) {
  switch (type) {
    case 'flight': return <Navigation className="w-4 h-4" />;
    case 'transport': return <Navigation className="w-4 h-4" />;
    case 'car': return <Navigation className="w-4 h-4" />;
    case 'train': return <Navigation className="w-4 h-4" />;
    case 'hotel': return <Hotel className="w-4 h-4" />;
    case 'food': return <Utensils className="w-4 h-4" />;
    case 'coffee': return <Coffee className="w-4 h-4" />;
    case 'sightseeing': return <MapPin className="w-4 h-4" />;
    case 'hiking': return <MapPin className="w-4 h-4" />;
    case 'photo': return <Camera className="w-4 h-4" />;
    case 'sunrise': return <Sunrise className="w-4 h-4" />;
    case 'sunset': return <Sunset className="w-4 h-4" />;
    case 'info': return <Info className="w-4 h-4" />;
    default: return <MapPin className="w-4 h-4" />;
  }
}

export function DayItinerary({ day }: { day: Day }) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="pt-8 pb-16 px-4 max-w-lg mx-auto" id={`day-${day.dayNumber}`}>
      <div className="mb-6">
        <h2 className="font-serif text-3xl text-stone-800 mb-1 flex items-center justify-between">
          <span>Day {day.dayNumber}</span>
          <span className="text-sm font-sans font-medium text-stone-500 bg-stone-200/50 px-3 py-1 rounded-full">{day.date}</span>
        </h2>
        <h3 className="text-lg text-stone-600 font-medium">{day.title}</h3>
      </div>

      {day.routes && day.routes.length > 0 && (
        <div className="mb-10 mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4 mb-2">
            {day.dayNumber === 12 ? (
              <>
                <img src="./Day12.jpg" alt={`Day ${day.dayNumber} map`} className="w-full rounded-2xl shadow-sm border border-stone-200" />
                <img src="./Day12-1.jpg" alt={`Day ${day.dayNumber} map part 2`} className="w-full rounded-2xl shadow-sm border border-stone-200" />
              </>
            ) : (
              <img src={`./Day${day.dayNumber}.jpg`} alt={`Day ${day.dayNumber} map`} className="w-full rounded-2xl shadow-sm border border-stone-200" />
            )}
          </div>
          {day.routes.map((route, i) => (
            <MapEmbed key={i} routeData={route} className="h-0" hideMapIframe={true} />
          ))}
        </div>
      )}

      <div className="space-y-4">
        {day.activities.map((activity, index) => {
          const isExpanded = expandedId === activity.id;
          const hasDetails = activity.details && activity.details.length > 0;
          const hasLocation = !!activity.location;
          const isInteractive = hasDetails || hasLocation;

          return (
            <div key={activity.id} className="relative">
              {/* Timeline Connector */}
              {index !== day.activities.length - 1 && (
                <div className="absolute left-6 top-10 bottom-[-16px] w-[2px] bg-stone-200" />
              )}
              
              <motion.div 
                whileTap={isInteractive ? { scale: 0.97 } : {}}
                onClick={() => isInteractive && toggleExpand(activity.id)}
                className={cn(
                  "bg-white rounded-2xl p-4 shadow-sm border border-stone-100 transition-all duration-200",
                  isInteractive ? "cursor-pointer hover:shadow-md hover:border-stone-200" : ""
                )}
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#efece5] text-[#6b7266] rounded-full flex items-center justify-center z-10 border-4 border-white shadow-sm">
                    {getActivityIcon(activity.type)}
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-stone-800 leading-tight">
                        {activity.title}
                      </h4>
                      {isInteractive && (
                        <ChevronDown 
                          className={cn("w-4 h-4 text-stone-400 transition-transform flex-shrink-0 mt-0.5", isExpanded ? "rotate-180" : "")} 
                        />
                      )}
                    </div>
                    
                    {activity.location && (
                      <p className="text-sm text-stone-500 mt-1.5 flex items-start gap-1">
                        <MapPin className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{activity.location}</span>
                      </p>
                    )}

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t border-stone-100 space-y-3">
                            {activity.details?.map(detail => (
                              <div key={detail.id} className="text-sm">
                                <span className="font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded mr-2">
                                  {detail.label}
                                </span>
                                {detail.content && (
                                  <span className="text-stone-600 block mt-1.5 leading-relaxed">{detail.content}</span>
                                )}
                                {detail.link && (
                                  <a 
                                    href={detail.link} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium mt-1.5 active:scale-95 transition-transform origin-left"
                                  >
                                    {detail.link.includes('google.com/maps') ? 'View on Maps' : '预定链接'} <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}
                              </div>
                            ))}

                            {activity.mapLink && (
                              <a 
                                href={activity.mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#efece5] hover:bg-[#e4dfd4] text-stone-800 text-sm font-medium py-2 px-4 rounded-xl transition-all active:scale-[0.98]"
                              >
                                <MapIcon className="w-4 h-4" /> Open in Google Maps
                              </a>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
