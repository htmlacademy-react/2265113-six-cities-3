import 'leaflet/dist/leaflet.css';
import { Icon, layerGroup, Marker, LatLng } from 'leaflet';
import { useRef, useEffect } from 'react';
import { useMap } from '../../hooks/use-map';
import { City, Offer } from '../../types/offers';
import { UrlMarkers } from '../../types/offers';
import { useAppSelector } from '../../hooks';
import { selectActiveOfferId, selectCurrentOffer } from '../../store/offer-data/selectors';

type MapProps = {
  city: City;
  points: Offer[];
}

const defaultCustomIcon = new Icon({
  iconUrl: UrlMarkers.DEFAULT
});

const currentCustomIcon = new Icon({
  iconUrl: UrlMarkers.CURRENT,
});

export const Map = ({city, points}: MapProps) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const currentOffer = useAppSelector(selectCurrentOffer);
  const selectedOffer = useAppSelector(selectActiveOfferId);

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
            currentOffer === null && point.id === selectedOffer ? currentCustomIcon : defaultCustomIcon
          )
          .addTo(map);

        markerLayer.addLayer(marker);
        map.setView(new LatLng(city.location.latitude, city.location.longitude), city.location.zoom);
      });

      if (currentOffer) {
        const marker = new Marker({
          lat: currentOffer.location.latitude,
          lng: currentOffer.location.longitude
        });
        marker.setIcon(currentCustomIcon).addTo(map);
      }

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedOffer, city, currentOffer]);

  return (
    <div
      style={{
        height: '100%'
      }}
      data-testid='map'
      ref={mapRef}
    />
  );
};
