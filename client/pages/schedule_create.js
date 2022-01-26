import Header from '../components/homepage/header/Header';
import SubHeader from '../components/homepage/header/SubHeader';
import Footer from '../components/front/Footer';
import Table from '../components/homepage/table/Table';
import withAuth from '../hocs/withAuth';
import {
	getName,
	getRole,
	useIsAuthenticated,
	useAuth,
} from '../providers/Auth';
import Title from '../components/schedule/Title';
import ScheduleForm from '../components/schedule/ScheduleForm';
import ScheduleList from '../components/schedule/ScheduleList';
import ScheduleListContextProvider from '../components/schedule/context/ScheduleListContext';
import TaskReminder from '../components/schedule/TaskReminder';

// use back with auth
export default withAuth(function Home({ data }) {
	console.log('one');

	const isAuthenticated = useIsAuthenticated();
	const name = getName();
	const role = getRole();

	return (
		<div className='flex flex-col h-screen'>
			<Header />
			<SubHeader name={name} role={role} />
			<div className='antialiased bg-gray-200 flex-grow'>
				<TaskReminder data={data}></TaskReminder>
				<ScheduleListContextProvider>
					<div className='header my-4'>
						<h1 className='text-black font-bold'>Add Schedule</h1>
					</div>
					<div className='main'>
						<ScheduleForm />
					</div>
				</ScheduleListContextProvider>
			</div>
			<Footer />
		</div>
	);
});

export async function getStaticProps() {
	console.log('attempting to fetch data');
	//fetch odata
	try {
		const response = await fetch(
			'https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/ToReview'
		);
		var data = await response.json();
		data = data.value;
		console.log(data);
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

	// final object for prediction
	let stocks = {
		data: [],
	};

	return {
		props: {
			data,
		},
		revalidate: 3600,
	};
}
