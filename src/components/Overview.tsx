import React from 'react';
import { Day } from '../types';
import { MapEmbed } from './MapEmbed';
import { Calendar, MapPin, Navigation, Plus, Trash2 } from 'lucide-react';

export function Overview({ 
  itinerary, 
  onSelectDay, 
  isEditing, 
  onUpdateItinerary,
  title,
  dates,
  coverImage,
  routeDesc
}: { 
  itinerary: Day[], 
  onSelectDay: (dayId: number) => void,
  isEditing?: boolean,
  onUpdateItinerary?: (newItin: Day[]) => void,
  title: string;
  dates: string;
  coverImage: string;
  routeDesc: string;
}) {

  const handleAddDay = () => {
    if (!onUpdateItinerary) return;
    const newDayNum = itinerary.length > 0 ? Math.max(...itinerary.map(d => d.dayNumber)) + 1 : 1;
    const newDay: Day = {
      id: `day-${Date.now()}`,
      dayNumber: newDayNum,
      date: 'MM.DD',
      title: 'New Day',
      shortDesc: 'Description',
      routes: [],
      activities: []
    };
    onUpdateItinerary([...itinerary, newDay]);
  };

  const handleDeleteDay = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!onUpdateItinerary) return;
    if (confirm('Delete this entire day?')) {
      onUpdateItinerary(itinerary.filter(d => d.id !== id));
    }
  };

  return (
    <div className="pt-8 pb-16 px-4 max-w-lg mx-auto">
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl text-stone-800 mb-3 tracking-tight">{title}</h1>
        <p className="text-stone-500 flex items-center justify-center gap-2 font-medium">
          <Calendar className="w-4 h-4" /> {dates}
        </p>
      </div>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4 px-2">
          <Navigation className="w-5 h-5 text-stone-600" />
          <h2 className="font-serif text-2xl text-stone-800">Route Map</h2>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-sm border-2 border-stone-200 relative bg-stone-50 min-h-[300px]">
          <img 
            src={coverImage} 
            alt={`${title} Route Map`} 
            className="w-full h-auto object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80";
              e.currentTarget.classList.add("opacity-60");
            }}
          />
        </div>
        <p className="text-center text-sm text-stone-500 mt-3 px-4">
          {routeDesc}
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4 px-2">
          <MapPin className="w-5 h-5 text-stone-600" />
          <h2 className="font-serif text-2xl text-stone-800">Daily Directory</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {itinerary.map((day) => (
            <div key={day.id} className="relative group">
              <button
                id={`overview-day-${day.dayNumber}`}
                onClick={() => onSelectDay(day.dayNumber)}
                className="text-left w-full bg-white p-4 rounded-2xl shadow-sm border border-stone-100 hover:shadow-md hover:border-stone-200 transition-all flex items-center justify-between active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-serif font-medium text-lg text-stone-800">Day {day.dayNumber}</span>
                    <span className="text-xs font-medium text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">{day.date}</span>
                  </div>
                  <p className="text-sm font-medium text-stone-600 group-hover:text-emerald-700 transition-colors">
                    {day.title}
                  </p>
                  <p className="text-sm text-stone-400 mt-0.5 truncate max-w-[240px]">
                    {day.shortDesc}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#f4efe6] flex items-center justify-center text-[#8a816c] group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                  <Navigation className="w-4 h-4 rotate-90" />
                </div>
              </button>

              {isEditing && (
                <button
                  onClick={(e) => handleDeleteDay(e, day.id)}
                  className="absolute -right-2 -top-2 w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center hover:bg-red-200 shadow-sm z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}

          {isEditing && (
            <button
              onClick={handleAddDay}
              className="mt-2 w-full border-2 border-dashed border-stone-300 text-stone-500 hover:text-stone-700 hover:border-stone-400 hover:bg-stone-50 rounded-2xl p-4 flex items-center justify-center gap-2 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" /> Add New Day
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
