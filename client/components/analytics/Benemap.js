import React, { Component } from "react";
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import Button from '@material-ui/core/Button';
import Markers from './VenueMarkers';
let classifyPoint = require("robust-point-in-polygon");
import { Map, TileLayer, FeatureGroup} from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import Popup from './Querypopup'; 


class Benemap extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentLocation: { lat: 1.3521, lng: 103.8198 },
			zoom: 12,
			isDisabled: true,
			geodata: [],
			//id: null,
			showPopup: false,
			popupList: null,
			isLoaded: false
		}
	}


	//markers child function 
	receivedChildVal = (data) => {
		//console.log(data);
		this.setState({
			isDisabled: false,
			id: data
		})
	}  
	_onCreated = (e) => {
		let type = e.layerType;
		//let layer = e.layer;
		if (type === 'polygon') {
		  // Do marker specific actions
		  //console.log("_onCreated: marker created", e);
		  let polygon = [];
		  let id_chosen = ""
	
		  const final_latlon = Object.values(e.layer._latlngs['0']);
		  //console.log(final_latlon);
		  for (const property in final_latlon) {
			//console.log(`${property}: ${final_latlon[property]}`);
	
			polygon.push([final_latlon[property]['lng'], final_latlon[property]['lat']])
		  }
		  //console.log(polygon);
		  //console.log(polygon);
		  let location = this.state.geodata; 
		  
		  //let bene_markers = [];
		  for (let k in location) {
			  if (classifyPoint(polygon, location[k]["LongLat"].reverse()) === -1 || classifyPoint(polygon, location[k]["LongLat"].reverse()) === 0) {
				id_chosen +=  location[k]['id'] + ","
			  }
		  }
		  if (id_chosen.length > 0) {
			this.setState({
			  isDisabled: false,
			  id: id_chosen
			});
		  }
		}
		
		else {
		  console.log("_onCreated: something else created:", type, e);
		}
		
		// Do whatever else you need to. (save to db; etc)
	  }


	  _onDeleted = () => {
		  this.setState({
			  isDisabled: true
		  })
	  }

	  togglePopup = () => {  
        this.setState({  //to set state 
             showPopup: false  //Opposite of default if click --> showPopup : True  
        });  
    }

	
	  //button 
	  //api call will be here , pop up yt table ? 


	printData = () => {
		async function benequeryfunction(beneid) {
			const url = `https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary('${beneid}')`
			const res = await fetch(url)
			const result = await res.json();
			return result;
		}
		(async () => {
			let name = this.props.name; // get the name from here 
			console.log(name);
			//console.log(name.indexOf('@'));
			//let test = name.substring(0, name.indexOf('@')); //remove email 

			//console.log(test)
			//console.log(test.length)
			//console.log(typeof test)
			let final_list_to_table = [];
			let query = this.state.id.split(',');
			let filtered = query.filter(function (el) {
				return el != "";
			  });
			for (const f in filtered) {
				//console.log(filtered[f])
				let result = await benequeryfunction(filtered[f]);
				//console.log(result.org_charityID)
				//console.log(name)
				////console.log(result.extraCharities.split(',').includes(name))
				//console.log(typeof result.extraCharities)

				if (result.org_charityID == name) {
					final_list_to_table.push(result);
				} 
				else if (result.extraCharities === null) {
					let editedResult = {
						beneficiaryID: result.beneficiaryID,
						regionID_regionID: result.regionID_regionID,
						org_charityID:  result.org_charityID,
						address: 'HIDDEN',
						householdSize: 'HIDDEN',
						race: 'HIDDEN',
						dietaryRestrictions: 'HIDDEN', 
						religion: 'HIDDEN',
						extraCharities: result.extraCharities
						//stocks here 
					}
					final_list_to_table.push(editedResult);
				} else if (result.extraCharities.split(',').includes(name)) {
					final_list_to_table.push(result);
				} 
				else if (result.org_charityID != name) {
					let editedResult = {
						beneficiaryID: result.beneficiaryID,
						regionID_regionID: result.regionID_regionID,
						org_charityID:  result.org_charityID,
						address: 'HIDDEN',
						householdSize: 'HIDDEN',
						race: 'HIDDEN',
						dietaryRestrictions: 'HIDDEN', 
						religion: 'HIDDEN',
						extraCharities: result.extraCharities
						//stocks here 
					}
					final_list_to_table.push(editedResult);
				}
				//else if (result.result.extraCharities != null || extraCharities.split(',').includes(name) === true) {
				//	final_list_to_table.push(result)
				//} else {

				//}

				//result.then((res) => final_list_to_table.push(res))
			}
			
			//console.log(final_list_to_table)
			this.setState({
				isDisabled: true,
				showPopup: true,
				popupList: final_list_to_table
			})
		})();
	  }
	  

	// component did mount api call here
	async componentDidMount() { 
		let unique_postcode_set = new Set()
		let cleaned_data = [];
		let final_output = []; 
		const url = "https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary";
		const res = await fetch(url);
		const result = await res.json();
			//set up set, get all unqiue postcode 
			//console.log(result)
		for (const check in result.value) {
			unique_postcode_set.add(result.value[check].postcode)
		}
			//console.log(unique_postcode_set);
			//check if postcode exist in set
		for (const r in result.value) {
			if (unique_postcode_set.has(result.value[r].postcode)) {
				cleaned_data.push({
					id: [result.value[r].beneficiaryID],
					postcode: result.value[r].postcode
				})
				unique_postcode_set.delete(result.value[r].postcode);
			} else {
				for (const c in cleaned_data) {
					if (result.value[r].postcode === cleaned_data[c].postcode) {
						cleaned_data[c].id.push(result.value[r].beneficiaryID)
					}
				}
			}
		}
		
		//console.log(cleaned_data);
		for (const m in cleaned_data) {
			let list = cleaned_data[m].postcode
			let geo_url = new URL('https://developers.onemap.sg/commonapi/search?searchVal=' + list + '&returnGeom=Y&getAddrDetails=Y&pageNum=1')
			let res = await fetch(geo_url)
			const georesult = await res.json();
			
			//console.log(georesult);
			if (georesult.found > 0 ) {
				//console.log(result.value[m].postcode)
				final_output.push(
					{
					'id': cleaned_data[m]['id'].toString(),
					//'address': result.value[m]['address'],
					"LongLat": [georesult.results[0]['LONGITUDE'], georesult.results[0]['LATITUDE']]
					}
				)
			}
		}
		this.setState({
			isLoaded: true,
			geodata: final_output
		})

	}

	render () {
		//console.log(this.props.stars)
		console.log('MAP TEST');
		const { currentLocation, zoom, popupList, isLoaded} = this.state;

		//console.log(geodata.length )
		//|| geodata.length === 0
			if (!isLoaded) {
				return <div>Loading ! ......</div>
			} else {
				//console.log('shld be above 0: ' + geodata.length)
				return (
					<Map className="map" center={currentLocation} zoom={zoom}>
					{/*<div style={Selected}>No of Selected </div>*/}
					{this.state.showPopup ? <Popup data={popupList} closePopup={this.togglePopup}  />  : null } 

					<Button variant="contained" color="primary" style={container} onClick={this.printData} disabled={this.state.isDisabled} > View Selected </Button>
					<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					/>

					{
						this.state.geodata ?
						<Markers geo_venues={this.state.geodata} fromChildToParentCallback={this.receivedChildVal} check={isLoaded}/> : ''
					}

					<FeatureGroup>
						<EditControl
						position='topleft'
						onEdited={this._onEdited}
						onCreated={this._onCreated}
						onDeleted={this._onDeleted}
						draw={{
						rectangle: false,
						marker: false,
						circle: false,
						polyline: false,
						circlemarker: false
						}}
						/>
					</FeatureGroup>
					</Map>
					
				);
			}
	}

}


const container = {
	position: "absolute",
	//top: "20px",
	bottom: '3%',
	right: '1%',
	//left: '2%',
	padding: '2%',
	zIndex: "400",
	height: "10%",
	width: "10%",
	fontWeight: 'bold',
}

const Selected = {
	position: "absolute",
	zIndex: '999',
	top: '1%',
	right: '1%',
	color: 'red',
	fontWeight: 'bold',
}




export default Benemap; 
