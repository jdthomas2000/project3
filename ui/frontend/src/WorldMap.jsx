import { useRef, useEffect } from "react";
import leaflet from "leaflet";

export default function WorldMap({ coords, zoom }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = leaflet
        .map(mapContainerRef.current)
        .setView(coords, zoom);

      leaflet
        .tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        })
        .addTo(mapInstanceRef.current);

      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, []);
  return <div className="map" ref={mapContainerRef}></div>;
}
