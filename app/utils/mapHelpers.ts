// utils/mapHelpers.ts

export function initializeMap(mapContainer: HTMLElement, lat: number, lng: number) {
    const map = L.map(mapContainer).setView([lat, lng], 13);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    }).addTo(map);
  
    return map;
  }
  