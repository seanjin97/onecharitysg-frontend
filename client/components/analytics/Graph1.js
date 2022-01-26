import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';


//const initialState = {
//	labels: ['North', 'South', 'East', 'West', 'Central'],
//	datasets: [
//		{
//			label: 'Benefeceries by Region',
//			backgroundColor: [
//				'rgba(255, 99, 132, 0.2)',
//				'rgba(54, 162, 235, 0.2)',
//				'rgba(255, 206, 86, 0.2)',
//				'rgba(75, 192, 192, 0.2)',
//				'rgba(69, 175, 234, 0.2)',
//			],
//			borderColor: [
//				'rgba(255, 99, 132, 1)',
//				'rgba(54, 162, 235, 1)',
//				'rgba(255, 206, 86, 1)',
//				'rgba(75, 192, 192, 1)',
//				'rgba(69, 175, 234, 0.2)',
//			],
//			borderWidth: 1,
//			data: [1,1,1,1,1],
//		},
//	],
//};

class Graph1 extends React.Component {


	async componentDidMount() {
		//console.log(initialState)
	}




	render() {
		return (
			<div className='pie'>
				<Pie
					data={this.props.data}
					options={{
						maintainAspectRatio: false,
					}}
				/>
			</div>
		);
	}
}

export default Graph1;
//export default () => (
//	<div>
//		<h2>Benefeceries Per Zones</h2>
//	</div>
//    		<Graph1 />
//);
