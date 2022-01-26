import React from 'react';
import { Bar } from 'react-chartjs-2';

const initialState = {
	labels: ['Well Served', 'Not Well Served'],
	datasets: [
		{
			label: 'Total Benefeceries Served',
			backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
			borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
			borderWidth: 1,
			data: [33, 40, 50],
		},
	],
};

class Graph1 extends React.Component {

	componentDidMount() {
		console.log(initialState);
	}

	render() {
		return (
			<div className='bar'>
				<Bar
					data={this.props.anotherdata}
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
