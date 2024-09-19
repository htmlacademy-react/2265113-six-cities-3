import 'leaflet/dist/leaflet.css';
import { Icon, layerGroup, Marker, LatLng } from 'leaflet';
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

export const Map = ({city, points, selectedOffer}: MapProps) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().clearLayers().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });
        marker
          .setIcon(
            selectedOffer !== undefined && point.id === selectedOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);

        markerLayer.addLayer(marker);
        map.setView(new LatLng(city.location.latitude, city.location.longitude), city.location.zoom);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedOffer, city]);

  return (
    <div
      style={{
        height: '100%'
      }}
      ref={mapRef}
    />
  );
};
