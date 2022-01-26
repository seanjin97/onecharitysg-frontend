import Basket from '../components/foodbasket/Basket';
import Footer from '../components/front/Footer';
import Header from '../components/homepage/header/Header';
import SubHeader from '../components/homepage/header/SubHeader';
import withAuth from '../hocs/withAuth';
import { getName, getRole, useIsAuthenticated } from '../providers/Auth';

// use back with auth
export default withAuth(function Home({ data }) {
	console.log('one');

	const isAuthenticated = useIsAuthenticated();
	const name = getName();
	const role = getRole();
	return (
		<div className='flex flex-col h-screen'>
			<Header name={name} role={role} />

			<SubHeader name={name} role={role} />

			<div className='antialiased bg-gray-200 flex-grow'>
				<Basket data={data} />
			</div>

			<Footer />
		</div>
	);
});

// To-do: Cache request data
// https://stackoverflow.com/questions/62005208/api-caching-for-next-js
export async function getStaticProps() {
	console.log('attempting to fetch data');

	//fetch odata
	const [basket, allStocks] = await Promise.all([
		fetch(
			'https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Basket?$expand=stocks'
		)
			.then((r) => r.json())
			.then((j) => j.value),
		fetch(
			'https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/CharitiesStocks?$filter=charities_charityID%20eq%20%27charity001%27'
		)
			.then((r) => r.json())
			.then((j) => j.value),
	]);
	const data = { basket, allStocks };
	console.log('Sucessfully fetched data');
	// console.log(basket, allStocks);
	return {
		props: {
			data,
		},
		revalidate: 3600,
	};
}
