import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ChevronDown, MapPin, Navigation, ExternalLink, Map as MapIcon, Coffee, Utensils, Hotel, Camera, Sunrise, Sunset, Info, Plus, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { Activity, Day, ActivityType } from '../types';
import { MapEmbed } from './MapEmbed';
import { cn } from '../lib/utils';

export const getActivityIcon = (type: ActivityType) => {
  switch (type) {
    case 'coffee': return <Coffee className="w-5 h-5" />;
    case 'food': return <Utensils className="w-5 h-5" />;
    case 'hotel': return <Hotel className="w-5 h-5" />;
    case 'photo': return <Camera className="w-5 h-5" />;
    case 'sunrise': return <Sunrise className="w-5 h-5" />;
    case 'sunset': return <Sunset className="w-5 h-5" />;
    case 'info': return <Info className="w-5 h-5" />;
    case 'flight':
    case 'transport':
    case 'car':
    case 'train': return <Navigation className="w-5 h-5" />;
    default: return <MapPin className="w-5 h-5" />;
  }
};

const getActivityColor = (type: ActivityType) => {
  switch (type) {
    case 'food':
    case 'coffee': return 'bg-orange-50 text-orange-600 border-orange-100';
    case 'hotel': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'sunrise':
    case 'sunset': return 'bg-rose-50 text-rose-600 border-rose-100';
    case 'photo': return 'bg-purple-50 text-purple-600 border-purple-100';
    case 'info': return 'bg-stone-100 text-stone-600 border-stone-200';
    default: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  }
};

export function DayItinerary({ day, isEditing, onUpdateDay }: { day: Day, isEditing?: boolean, onUpdateDay?: (day: Day) => void }) {
  const [expandedActivity, setExpandedActivity] = useState<string | null>(null);

  const updateDay = (updates: Partial<Day>) => {
    if (onUpdateDay) onUpdateDay({ ...day, ...updates });
  };

  const addActivity = () => {
    const newActivity: Activity = {
      id: `act-${Date.now()}`,
      title: 'New Activity',
      type: 'info',
      details: []
    };
    updateDay({ activities: [...day.activities, newActivity] });
  };

  const updateActivity = (id: string, updates: Partial<Activity>) => {
    updateDay({ activities: day.activities.map(a => a.id === id ? { ...a, ...updates } : a) });
  };

  const deleteActivity = (id: string) => {
    if(confirm('Delete activity?')) {
      updateDay({ activities: day.activities.filter(a => a.id !== id) });
    }
  };

  const moveActivity = (index: number, direction: 1 | -1) => {
    const newActivities = [...day.activities];
    if (index + direction < 0 || index + direction >= newActivities.length) return;
    const temp = newActivities[index];
    newActivities[index] = newActivities[index + direction];
    newActivities[index + direction] = temp;
    updateDay({ activities: newActivities });
  };

  if (isEditing) {
    return (
      <div className="pb-24 pt-4 px-4 max-w-lg mx-auto font-sans">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-200 mb-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
          <h3 className="font-serif text-lg text-emerald-800 mb-4 flex items-center gap-2"><Plus className="w-5 h-5"/> Edit Day Info</h3>
          
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Day Number</label>
              <input type="number" value={day.dayNumber} onChange={e => updateDay({dayNumber: Number(e.target.value)})} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none p-2 rounded-xl text-sm transition-all" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Date</label>
              <input type="text" value={day.date} onChange={e => updateDay({date: e.target.value})} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none p-2 rounded-xl text-sm transition-all" placeholder="e.g. 10.01" />
            </div>
          </div>
          <div className="mb-3">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Title</label>
            <input type="text" value={day.title} onChange={e => updateDay({title: e.target.value})} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none p-2 rounded-xl text-sm font-medium transition-all" />
          </div>
          <div className="mb-2">
            <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Short Description</label>
            <input type="text" value={day.shortDesc} onChange={e => updateDay({shortDesc: e.target.value})} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none p-2 rounded-xl text-sm transition-all" />
          </div>
        </div>

        <div className="space-y-4">
          {day.activities.map((activity, index) => (
            <div key={activity.id} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 relative group">
              <div className="absolute -right-2 -top-2 flex gap-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => moveActivity(index, -1)} disabled={index === 0} className="w-8 h-8 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center shadow-sm disabled:opacity-0 hover:bg-stone-200"><ArrowUp className="w-4 h-4"/></button>
                <button onClick={() => moveActivity(index, 1)} disabled={index === day.activities.length - 1} className="w-8 h-8 bg-stone-100 text-stone-600 rounded-full flex items-center justify-center shadow-sm disabled:opacity-0 hover:bg-stone-200"><ArrowDown className="w-4 h-4"/></button>
                <button onClick={() => deleteActivity(activity.id)} className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center shadow-sm hover:bg-red-200"><Trash2 className="w-4 h-4"/></button>
              </div>

              <div className="grid grid-cols-[1fr_2fr] gap-3 mb-3 pr-4">
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Time</label>
                  <input type="text" value={activity.time || ''} onChange={e => updateActivity(activity.id, {time: e.target.value})} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none p-2 rounded-lg text-sm transition-all" placeholder="e.g. 09:00" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Type</label>
                  <select value={activity.type} onChange={e => updateActivity(activity.id, {type: e.target.value as ActivityType})} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none p-2 rounded-lg text-sm transition-all appearance-none">
                    {['flight','transport','hotel','food','sightseeing','hiking','photo','info','car','train','coffee','sunrise','sunset'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              
              <div className="mb-3">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Activity Title</label>
                <input type="text" value={activity.title} onChange={e => updateActivity(activity.id, {title: e.target.value})} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none p-2 rounded-lg text-sm font-medium transition-all" />
              </div>
              <div className="mb-3">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Location Name</label>
                <input type="text" value={activity.location || ''} onChange={e => updateActivity(activity.id, {location: e.target.value})} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none p-2 rounded-lg text-sm transition-all" placeholder="Optional" />
              </div>
              <div className="mb-4">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-1 block">Google Maps URL</label>
                <input type="text" value={activity.mapLink || ''} onChange={e => updateActivity(activity.id, {mapLink: e.target.value})} className="w-full bg-stone-50 border border-stone-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none p-2 rounded-lg text-sm transition-all" placeholder="https://..." />
              </div>

              <div className="border-t border-stone-100 pt-3 bg-stone-50 -mx-4 -mb-4 p-4 rounded-b-2xl">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Additional Details</label>
                  <button onClick={() => {
                    const newDetails = [...(activity.details || []), { id: `det-${Date.now()}`, label: 'Info' }];
                    updateActivity(activity.id, {details: newDetails});
                  }} className="text-xs flex items-center gap-1 text-emerald-600 font-medium px-2 py-1 bg-emerald-50 rounded-md hover:bg-emerald-100 transition-colors"><Plus className="w-3 h-3"/> Add Row</button>
                </div>
                
                {(activity.details || []).length === 0 && <p className="text-xs text-stone-400 italic mb-2">No details added.</p>}
                
                {(activity.details || []).map((detail, dIdx) => (
                  <div key={detail.id} className="flex gap-2 mb-3 items-start bg-white p-2 rounded-lg border border-stone-200 shadow-sm">
                    <div className="flex-1 space-y-2">
                      <input type="text" value={detail.label} onChange={e => {
                        const newDetails = [...(activity.details || [])];
                        newDetails[dIdx].label = e.target.value;
                        updateActivity(activity.id, {details: newDetails});
                      }} className="w-full border-b border-stone-200 focus:border-emerald-400 outline-none px-1 py-0.5 text-xs font-medium" placeholder="Label (e.g. Note)" />
                      <textarea value={detail.content || ''} onChange={e => {
                        const newDetails = [...(activity.details || [])];
                        newDetails[dIdx].content = e.target.value;
                        updateActivity(activity.id, {details: newDetails});
                      }} className="w-full border-b border-stone-200 focus:border-emerald-400 outline-none px-1 py-0.5 text-xs h-10 resize-none" placeholder="Content text..." />
                      <input type="text" value={detail.link || ''} onChange={e => {
                        const newDetails = [...(activity.details || [])];
                        newDetails[dIdx].link = e.target.value;
                        updateActivity(activity.id, {details: newDetails});
                      }} className="w-full outline-none px-1 py-0.5 text-xs text-blue-500" placeholder="Hyperlink URL (optional)" />
                    </div>
                    <button onClick={() => {
                       const newDetails = [...(activity.details || [])];
                       newDetails.splice(dIdx, 1);
                       updateActivity(activity.id, {details: newDetails});
                    }} className="text-stone-300 hover:text-red-500 p-1 transition-colors"><Trash2 className="w-4 h-4"/></button>
                  </div>
                ))}
              </div>

            </div>
          ))}

          <button onClick={addActivity} className="w-full border-2 border-dashed border-emerald-200 text-emerald-600 rounded-2xl p-4 flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors font-medium">
            <Plus className="w-5 h-5"/> Add New Activity
          </button>
        </div>
      </div>
    );
  }

  // View Mode
  return (
    <div className="pb-24">
      {/* Day Header */}
      <div className="pt-8 pb-8 px-4 text-center max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center gap-2 mb-3 bg-stone-100 px-3 py-1 rounded-full">
          <Calendar className="w-3.5 h-3.5 text-stone-500" />
          <span className="text-xs font-semibold tracking-widest text-stone-500 uppercase">
            Day {day.dayNumber} • {day.date}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-stone-800 mb-3 tracking-tight">{day.title}</h1>
        <p className="text-stone-500 text-sm">{day.shortDesc}</p>
      </div>

      {day.image && (
        <div className="max-w-lg mx-auto px-4 mb-8">
          <img 
            src={day.image} 
            alt={`Day ${day.dayNumber} Route Map`} 
            className="w-full h-auto rounded-2xl shadow-sm border border-stone-200" 
          />
        </div>
      )}

      {day.routes && day.routes.length > 0 && (
        <div className="mb-10 mt-6 flex flex-col gap-4 px-4 max-w-lg mx-auto">
          <div className="flex flex-col gap-4 mb-2">
            {day.dayNumber === 12 ? (
              <>
                <img src="/italy/Day12.jpg" alt={`Day ${day.dayNumber} map`} className="w-full rounded-2xl shadow-sm border border-stone-200" />
                <img src="/italy/Day12-1.jpg" alt={`Day ${day.dayNumber} map part 2`} className="w-full rounded-2xl shadow-sm border border-stone-200" />
              </>
            ) : (
              <img src={`/italy/Day${day.dayNumber}.jpg`} alt={`Day ${day.dayNumber} map`} className="w-full rounded-2xl shadow-sm border border-stone-200" />
            )}
          </div>
          {day.routes.map((route, i) => (
            <MapEmbed key={i} routeData={route} className="h-0" hideMapIframe={true} />
          ))}
        </div>
      )}

      <div className="max-w-lg mx-auto px-4 space-y-4">
        {day.activities.map((activity, index) => {
          const isExpanded = expandedActivity === activity.id;
          const hasDetails = activity.details && activity.details.length > 0;
          const hasLocation = !!activity.location;
          const hasMap = !!activity.mapLink;
          const isInteractive = hasDetails || hasLocation || hasMap;

          return (
            <div key={activity.id} className="relative">
              {/* Timeline Connector */}
              {index !== day.activities.length - 1 && (
                <div className="absolute left-6 top-10 bottom-[-16px] w-[2px] bg-stone-200" />
              )}
              
              <div 
                onClick={() => isInteractive && setExpandedActivity(isExpanded ? null : activity.id)}
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
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-800 font-medium mt-1.5"
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
                                rel="noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="mt-3 w-full inline-flex items-center justify-center gap-2 bg-[#efece5] hover:bg-[#e4dfd4] text-stone-800 text-sm font-medium py-2 px-4 rounded-xl transition-colors"
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
