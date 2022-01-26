import Header from '../components/homepage/header/Header';
import SubHeader from '../components/homepage/header/SubHeader';
import Footer from '../components/front/Footer';
//import Table from "../components/homepage/table/Table";
import 'leaflet/dist/leaflet.css';
import dynamic from 'next/dynamic';
//import Benemap from "../components/analytics/Benemap";
import withAuth from '../hocs/withAuth';
import { getName, getRole, useIsAuthenticated } from '../providers/Auth';

import Graph1 from '../components/analytics/Graph1';
import Graph2 from '../components/analytics/Graph2';

const Benemap = dynamic(() => import('../components/analytics/Benemap'), {
	loading: () => 'Loading...',
	ssr: false,
});

// use back with auth
export default withAuth(function Home({ initialState, secondinitialState }) {
	console.log('one');
	const isAuthenticated = useIsAuthenticated();
	const name = getName();
	const role = getRole();
	console.log(name);
	
	//console.log(initialState);
	//console.log(secondinitialState);
	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<SubHeader name={name} role={role} />
			<div className='antialiased bg-gray-200 flex-grow'>
				<Graph1 data={initialState} />
				<Benemap name={name} />
				<Graph2 anotherdata={secondinitialState} />
			</div>

			<Footer />
		</div>
	);
});

export async function getStaticProps() {
	let North = 0;
	let South = 0;
	let East = 0;
	let West = 0;
	let Central = 0;

	try {
		const northres = await fetch(
			//"https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary"
			`https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary?$expand=regionID&$count=true&$filter=regionID/name eq 'North'`
		);
		let northresult = await northres.json();
		North += northresult['@odata.count'];

		const southurl =
			"https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary?$expand=regionID&$count=true&$filter=regionID/name eq 'South'";
		const southres = await fetch(southurl);
		const southresult = await southres.json();

		South += southresult['@odata.count'];

		const easturl =
			"https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary?$expand=regionID&$count=true&$filter=regionID/name eq 'East'";
		const eastres = await fetch(easturl);
		const eastresult = await eastres.json();

		East += eastresult['@odata.count'];

		const westurl =
			"https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary?$expand=regionID&$count=true&$filter=regionID/name eq 'West'";
		const westres = await fetch(westurl);
		const westresult = await westres.json();

		West += westresult['@odata.count'];

		const centralurl =
			"https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary?$expand=regionID&$count=true&$filter=regionID/name eq 'Central'";
		const centralres = await fetch(centralurl);
		const centralresult = await centralres.json();

		Central += centralresult['@odata.count'];

		let array = [North, South, East, West, Central];

		const initialState = {
			labels: ['North', 'South', 'East', 'West', 'Central'],
			datasets: [
				{
					label: 'Benefeceries by Region',
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
						'rgba(255, 206, 86, 0.2)',
						'rgba(75, 192, 192, 0.2)',
						'rgba(69, 175, 234, 0.2)',
					],
					borderColor: [
						'rgba(255, 99, 132, 1)',
						'rgba(54, 162, 235, 1)',
						'rgba(255, 206, 86, 1)',
						'rgba(75, 192, 192, 1)',
						'rgba(69, 175, 234, 0.2)',
					],
					borderWidth: 1,
					data: array,
				},
			],
		};

		const res = await fetch(
			`https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary`
		);
		let response = await res.json();
		let anotherdata = response.value;

		let notwellserved = 0;
		let wellserved = 0;
		//console.log(initialState);
		let data = anotherdata;
		for (const d in data) {
			if (data[d].extraCharities === null) {
				notwellserved += 1;
			} else {
				if (data[d].extraCharities.split(',').length >= 2) {
					wellserved += 1;
				}
			}
		}
		const secondinitialState = {
			labels: ['Well Served', 'Not Well Served'],
			datasets: [
				{
					label: 'Total Benefeceries Served',
					backgroundColor: [
						'rgba(255, 99, 132, 0.2)',
						'rgba(54, 162, 235, 0.2)',
					],
					borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
					borderWidth: 1,
					data: [notwellserved, wellserved, 0],
				},
			],
		};

		return {
			props: {
				initialState,
				secondinitialState,
			},
			revalidate: 3600,
		};
	} catch (error) {
		let data = {};
		console.log('Error fetching odata');
		return {
			props: {
				data,
			},
			revalidate: 3600,
		};
	}

	//const centralurl =
	//	"https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary?$expand=regionID&$count=true&$filter=regionID/name eq 'Central'";
	//const centralres = await fetch(centralurl, {
	//	method: 'GET',
	//	headers: { 'Access-Control-Allow-Origin': '*' },
	//});
	//const centralresult = await centralres.json();

	//Central += centralresult['@odata.count'];

	//let array = [North, South, East, West, Central];

	//return {
	//	props: {
	//		array,
	//	},
	//};
}
