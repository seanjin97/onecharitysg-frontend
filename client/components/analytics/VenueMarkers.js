import React, {
	Fragment,
} from 'react';
import { Marker } from 'react-leaflet';
import { VenueLocationIcon } from './VenueLocationIcon';
import MarkerPopup from './MarkerPopup';

const VenueMarkers = (props) => {
	const { check } = props;
	const { geo_venues } = props;
	const { fromChildToParentCallback } = props;

	//console.log(venues); test see data of

	if (check) {
		const markers = geo_venues.map((venue, index) => (
			//alert(venue.id)
			<Marker
				key={index}
				position={venue.LongLat.reverse()}
				icon={VenueLocationIcon}
				onClick={() => fromChildToParentCallback(venue.id)}
			>
				<MarkerPopup data={venue} />
			</Marker>
		));
		return <Fragment>{markers}</Fragment>;
	} else {
		//popup appear say loading || show nothing first

		return (
			<tr>
				<td colSpan='5'>Loading...</td>
			</tr>
		);
	}
};

export default VenueMarkers;
