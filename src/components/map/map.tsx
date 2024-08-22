import 'leaflet/dist/leaflet.css';
import { Icon, layerGroup, Marker } from 'leaflet';
import { useRef, useEffect } from 'react';
import { useMap } from '../../hooks/use-map';
import { City, Offer } from '../../types/offers';
import { UrlMarkers } from '../../types/offers';

type MapProps = {
  city: City;
  points: Offer[];
  selectedOffer?: Offer;
}

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarkers.DEFAULT
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarkers.CURRENT,
});

const markers: Marker[] = [];

export const Map = ({city, points, selectedOffer}: MapProps) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });
        marker
          .setIcon(
            selectedOffer !== undefined && point.title === selectedOffer.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);

        markers.push(marker);
      });

      return () => {
        map.removeLayer(markerLayer);
        markers.forEach((marker) => {
          marker.remove();
        });
      };
    }
  }, [map, points, selectedOffer]);

  return (
    <div
      style={{
        height: '100%'
      }}
      ref={mapRef}
    />
  );
};
