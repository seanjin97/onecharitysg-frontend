import Header from '../components/homepage/header/Header';
import SubHeader from '../components/homepage/header/SubHeader';
import Footer from '../components/front/Footer';
import Requests from '../components/requests/Requests';
//import Manipulate from '../components/requests/Manipulate';
import withAuth from '../hocs/withAuth';
import React, { useMemo, useEffect, useState } from 'react';
import {
	getName,
	getRole,
	useIsAuthenticated,
	useAuth,
} from '../providers/Auth';

// use back with auth

export default withAuth(function Home({ data , finalList}) {
	//const [loading, setLoading] = useState(true);
	const [count, setCount] = useState([]);
	//console.log('one');
	const isAuthenticated = useIsAuthenticated();
	const role = getRole();
	const name = getName();

	//console.log('test');
	//console.log(data);
	//console.log(finalList);
	//console.log(name);

	let final_data = [];
	//console.log(finalList)

	//const nameTest = 'charity002';


	for (const f in finalList) {
		if (finalList[f].org_charityID == name) {
			if (finalList[f].other != 'null') {
				console.log(finalList[f]);
				let finalarray = finalList[f].other.split(',')
				for (const c in finalarray) {
					let dict = {
						beneficiaryID_beneficiaryID: finalList[f].beneficiaryID_beneficiaryID,
						org_charityID: finalList[f].org_charityID,
						other: finalarray[c]
					}
					final_data.push(dict);
					console.log(finalarray[c])
				}
			}
		}
	}
	console.log(final_data);


	//console.log(count);
	//if (loading) {
	//	return <div>Loading ! ......</div>;
	//} else {
		return (
			<div className='flex flex-col h-screen'>
				<Header />
				<SubHeader name={name} role={role} />
				<div className='antialiased bg-gray-200 flex-grow'>
			
					<Requests odata={final_data} name={name} />
				</div>
				<Footer />
			</div>
		);
	//}
});
// To-do: Cache request data
// https://stackoverflow.com/questions/62005208/api-caching-for-next-js

// known bug
// fetches data even if not logged in

export async function getStaticProps() {
	console.log('attempting to fetch data');
	//fetch odata
	let finalList = [];
	try {
		const response = await fetch(
			//`https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary?$filter=org_charityID eq ('charity002')`
			'https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest'
			//'http://localhost:4004/api/ToReview'
		);
		var data = await response.json();
		data = data.value;

		const res = await fetch(`https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary`)
		var data2 = await res.json(); 
		data2 = data2.value 


		for (const d in data2) {
			for (const a in data) {
				if (data[a].beneficiaryID_beneficiaryID == data2[d].beneficiaryID) {
					let tempdict = {
						beneficiaryID_beneficiaryID: data[a].beneficiaryID_beneficiaryID,
						org_charityID: data2[d].org_charityID,
						other: data[a].other,
					}
					finalList.push(tempdict)
				}
			}
		}
		//for (const d in data) { //get all bene id in the To review 
		//	if data[d].beneficiaryID_beneficiaryID
		//}
	

		return {
			props: {
				data,
				finalList
			},
			revalidate: 3600,
		};
	} catch (error) {
		let data = {};
		console.log('Error fetching odata');
		return {
			props: {
				data,
				finalList
			},
			revalidate: 3600,
		};
	}

	//// final object for prediction
	//let stocks = {
	//	data: [],
	//};
	//let order = [
	//	'id',
	//	'house',
	//	'biscuit',
	//	'Egg',
	//	'vege',
	//	'rice',
	//	'canned',
	//	'beverage',
	//	'instant',
	//	'bread',
	//];
	//let today = new Date();
	//today = today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear();

	//for (var i = 0; i < data.length; i++) {
	//	// if have stock
	//	if (data[i].Stocks.length != 0) {
	//		let innerData = {
	//			id: data[i].beneficiaryID,
	//			house: data[i].householdSize,
	//		};
	//		let ordered = {};
	//		for (var k = 0; k < data[i].Stocks.length; k++) {
	//			innerData[data[i].Stocks[k].stock_stockID] =
	//				data[i].Stocks[k].stockCount;
	//		}

	//		// ordering
	//		for (var k = 0; k < order.length; k++) {
	//			ordered[order[k]] =
	//				typeof innerData[order[k]] == 'undefined' ? 0 : innerData[order[k]];
	//		}
	//		stocks.data.push(ordered);
	//		data[i].delivery = today;
	//	}
	//	// console.log(data[i]);
	//}

	//console.log('Querying prediction api');
	//let options = {
	//	method: 'POST',
	//	headers: { 'Content-Type': 'application/json' },
	//	body: JSON.stringify(stocks),
	//};
	//var prediction;

	//try {
	//	// let prediction = await fetch("http://127.0.0.1:5000/api/predict", options);
	//	let prediction = await fetch(
	//		'https://g1t3-foodstock-quick-wallaby-xx.cfapps.us10.hana.ondemand.com/api/predict',
	//		options
	//	);
	//	prediction = await prediction.json();
	//	var map = new Map();
	//	for (var i = 0; i < prediction.length; i++) {
	//		map.set(prediction[i]['id'], prediction[i]['result']);
	//	}

	//	for (let i = 0; i < data.length; i++) {
	//		// if have stock
	//		if (data[i].Stocks.length != 0) {
	//			data[i].stock = map.get(data[i].beneficiaryID);
	//		}
	//		// console.log(data[i]);
	//	}
	//} catch (error) {
	//	console.log('Error posting to prediction api');
	//	// console.log(error);
	//}

	//console.log('Sucessfully fetched data');
	//return {
	//	props: {
	//		data,
	//	},
	//	revalidate: 3600,
	//};
}
