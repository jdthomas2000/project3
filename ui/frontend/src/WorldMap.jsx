import { useRef, useEffect } from "react";
import leaflet from "leaflet";

const icon = leaflet.divIcon({
  html: `
    <svg width="25" height="25" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 16L15 12L21 8V5L12 10L3 5V8L9 12L3 16V19L12 14L21 19V16Z" 
            fill="#000000" />
      <path d="M10.18 9L12 3L13.82 9H19.5L14.91 12.34L16.66 18.23L12 14.65L7.34 18.23L9.09 12.34L4.5 9H10.18Z" 
            fill="#000000"/>
    </svg>`,
  className: "airplane-marker",
  iconSize: [25, 25],
  iconAnchor: [12, 12],
});

export default function WorldMap({ coords, zoom, markers }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerLayerRef = useRef(leaflet.layerGroup());

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
      markerLayerRef.current.addTo(mapInstanceRef.current);
      return () => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
      };
    }
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      markerLayerRef.current.clearLayers();

      if (markers) {
        markers.forEach((mark) => {
          if (mark.lat && mark.lng) {
            leaflet
              .marker([mark.lat, mark.lng], { icon: icon })
              .addTo(markerLayerRef.current);
          }
        });
      }
    }
  }, [markers]);
  return <div className="map" ref={mapContainerRef}></div>;
}
