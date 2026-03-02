import { MapContainer, TileLayer, Marker, Tooltip, useMap } from 'react-leaflet';
import { useEffect, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MARKER_ICON = {
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
};

function FitBounds({ bounds }) {
  const map = useMap();

  useEffect(() => {
    if (!bounds) {
      return;
    }

    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });
  }, [map, bounds]);

  return null;
}

export default function Map({ trip }) {
  const markerIcon = useMemo(() => new L.Icon(MARKER_ICON), []);

  const startCoordinates = trip?.['start station location']?.coordinates;
  const endCoordinates = trip?.['end station location']?.coordinates;

  const center = useMemo(() => {
    if (!startCoordinates || !endCoordinates) {
      return null;
    }
    const [startLng, startLat] = startCoordinates;
    const [endLng, endLat] = endCoordinates;
    return [(startLat + endLat) / 2, (startLng + endLng) / 2];
  }, [startCoordinates, endCoordinates]);

  const bounds = useMemo(() => {
    if (!startCoordinates || !endCoordinates) {
      return null;
    }
    const [startLng, startLat] = startCoordinates;
    const [endLng, endLat] = endCoordinates;
    return [
      [Math.min(startLat, endLat), Math.min(startLng, endLng)],
      [Math.max(startLat, endLat), Math.max(startLng, endLng)],
    ];
  }, [startCoordinates, endCoordinates]);

  if (!startCoordinates || !endCoordinates || !center || !bounds) {
    return null;
  }

  const [startLng, startLat] = startCoordinates;
  const [endLng, endLat] = endCoordinates;

  return (
    <MapContainer style={{ height: '100%', width: '100%' }} center={center} zoom={13}>
      <FitBounds bounds={bounds} />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[startLat, startLng]} icon={markerIcon}>
        <Tooltip permanent direction="right">
          Start: {trip['start station name']}
        </Tooltip>
      </Marker>
      <Marker position={[endLat, endLng]} icon={markerIcon}>
        <Tooltip permanent direction="right">
          End: {trip['end station name']}
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
