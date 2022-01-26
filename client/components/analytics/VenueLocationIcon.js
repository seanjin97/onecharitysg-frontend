import L from 'leaflet';

export const VenueLocationIcon = L.icon({
	iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
	//iconRetinaUrl: require('../assets/venue_location_icon.svg'),
	iconAnchor: null,
	shadowUrl: null,
	shadowSize: null,
	shadowAnchor: null,
	iconSize: [35, 35],
	className: 'leaflet-venue-icon',
});
