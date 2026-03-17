import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Gold driver marker icon
const driverIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Green pickup marker
const pickupIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Red dropoff marker
const dropoffIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Component to recenter map when coordinates change
const MapUpdater = ({ pickupLatLng, dropoffLatLng }) => {
    const map = useMap();

    useEffect(() => {
        if (pickupLatLng && dropoffLatLng) {
            const bounds = L.latLngBounds([pickupLatLng, dropoffLatLng]);
            map.fitBounds(bounds, { padding: [50, 50] });
        } else if (pickupLatLng) {
            map.setView(pickupLatLng, 13);
        } else if (dropoffLatLng) {
            map.setView(dropoffLatLng, 13);
        }
    }, [pickupLatLng, dropoffLatLng, map]);

    return null;
};

const MapComponent = ({ pickupLatLng, dropoffLatLng, driverLatLng }) => {
    const defaultCenter = [19.0760, 72.8777];

    return (
        <MapContainer
            center={pickupLatLng || defaultCenter}
            zoom={12}
            style={{ height: '100%', width: '100%', zIndex: 10 }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapUpdater pickupLatLng={pickupLatLng} dropoffLatLng={dropoffLatLng} />

            {pickupLatLng && (
                <Marker position={pickupLatLng} icon={pickupIcon}>
                    <Popup>Pickup Location</Popup>
                </Marker>
            )}

            {dropoffLatLng && (
                <Marker position={dropoffLatLng} icon={dropoffIcon}>
                    <Popup>Dropoff Location</Popup>
                </Marker>
            )}

            {driverLatLng && (
                <Marker position={driverLatLng} icon={driverIcon}>
                    <Popup>Driver Location</Popup>
                </Marker>
            )}

            {pickupLatLng && dropoffLatLng && (
                <Polyline
                    positions={[pickupLatLng, dropoffLatLng]}
                    color="#3b82f6"
                    weight={4}
                    dashArray="10, 10"
                />
            )}
        </MapContainer>
    );
};

export default MapComponent;
