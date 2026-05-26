# Itinerary System Design & Architecture Rules

This document outlines the strict rules for adding and managing new itineraries in this React application. Follow these rules to ensure zero bugs and consistent formatting.

## 1. Directory & Assets Rules

All images and static assets MUST be isolated into their respective destination folders inside `public/`. **Never place destination-specific images directly in the root of `public/`**.

### Structure:
```text
public/
  ├── italy/                 # Destination ID (all lowercase)
  │    ├── cover.png         # Main cover image for Landing Page
  │    ├── Day1.jpg          # Specific day maps/images
  │    ├── Day12-1.jpg
  │    └── ...
  ├── helsinki/
  │    ├── cover.jpg
  │    ├── day15.png
  │    └── ...
  └── tokyo/
       └── cover.jpg
```

### Path Referencing:
In JSON files and TSX code, ALWAYS use absolute paths relative to the public root.
- ❌ Bad: `./cover.jpg` or `Day1.jpg`
- ✅ Good: `/italy/cover.png` or `/helsinki/day15.png`

## 2. JSON Data Schema Rules

All itineraries are driven by static JSON files located in `src/data/[destinationId].json`.

### 2.1 Destination Registration (`src/ItineraryPage.tsx`)
Register new itineraries in the `DESTINATIONS` object:
```typescript
const DESTINATIONS: Record<string, DestConfig> = {
  "destination_id": {
    data: importData,
    title: "Destination Itinerary",
    dates: "Oct 1 - Oct 5",
    coverImage: "/[destination_id]/cover.jpg", 
    routeDesc: "City A ➔ City B"
  }
}
```

### 2.2 Day Object (`Day`)
```json
{
  "id": "day-15",
  "dayNumber": 15,                 // Controls visual display order and routing
  "date": "10.15",                 // Format: MM.DD or custom text
  "title": "Route Title",
  "shortDesc": "Short Summary",
  "image": "/helsinki/day15.png",  // (Optional) Header image for the day
  "routes": [],                    // (Optional) Google Maps embeds or specific map triggers
  "activities": []                 // Array of Activity objects
}
```

### 2.3 Activity Object (`Activity`)
```json
{
  "id": "hel-15-1",                // MUST be globally unique (format: [dest]-[day]-[index])
  "time": "10:30",                 // (Optional) Displayed on the timeline
  "title": "Activity Name",
  "type": "flight",                // Must match ActivityType ('flight'|'hotel'|'food'|'sightseeing'|'info'|etc)
  "location": "Airport T1",        // (Optional) Location name below title
  "mapLink": "https://...",        // (Optional) Shows "Open in Google Maps" button
  "details": [                     // (Optional) Expandable detailed info
    {
      "id": "det-1",
      "label": "Flight Info",
      "content": "AY1762...",
      "link": "https://..."        // (Optional) External booking link
    }
  ]
}
```

## 3. Component Architecture
- `App.tsx`: Manages high-level routing between `LandingPage` and `ItineraryPage`.
- `ItineraryPage.tsx`: The generic wrapper that reads the `destinationId` and injects the JSON data.
- `ItineraryContainer.tsx`: The UI template that handles tabs (Overview vs Day), editing mode, and saving.
- `DayItinerary.tsx`: The complex rendering logic for the timeline, icons, and map embeds.

## 4. UI & Styling Rules
**STRICT ADHERENCE TO EXISTING AESTHETIC**: Any newly added or modified pages MUST strictly follow the current visual style and aesthetic. 
- Do NOT introduce new, unapproved design patterns or mix in external UI styles. 
- When building new features, reuse existing Tailwind utility class combinations, color palettes (e.g., `stone`, `emerald` accents), typography (`font-serif`, `font-sans`), and layout structures (e.g., `max-w-lg mx-auto`).
- Maintain the premium, minimalist, and dynamic feel of the app at all times.
