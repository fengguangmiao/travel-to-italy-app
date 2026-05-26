export type ActivityType = 'flight' | 'transport' | 'hotel' | 'food' | 'sightseeing' | 'hiking' | 'photo' | 'info' | 'car' | 'train' | 'coffee' | 'sunrise' | 'sunset';

export type RouteMode = 'car' | 'walk' | 'transit';

export interface RouteData {
  waypoints: string[];
  mode: RouteMode;
  label?: string;
}

export interface Detail {
  id: string;
  label: string;
  content?: string;
  link?: string;
}

export interface Activity {
  id: string;
  time?: string;
  title: string;
  type: ActivityType;
  location?: string;
  mapLink?: string;
  icon?: any;
  details?: Detail[];
  images?: string[];
}

export interface Day {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  shortDesc: string;
  image?: string;
  routes?: RouteData[];
  activities: Activity[];
}
