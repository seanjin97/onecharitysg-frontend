import React, { Component, useState, useEffect } from 'react';
import SearchFilter from './SearchFilter';
import ReactTable from 'react-table';
import {
	useTable,
	useSortBy,
	useFilters,
	useGlobalFilter,
	usePagination,
} from 'react-table';
import { render } from 'react-dom';
import { columns } from './dataSource';
import Button from '@material-ui/core/Button';

import {
	getName,
	getRole,
	useIsAuthenticated,
	useAuth,
} from '../../providers/Auth';

//export default function Popup({data , closePopup}){
export default function Popup({ closePopup, data }) {
	const [studentState, setStudentState] = useState([]);

	const isAuthenticated = useIsAuthenticated();
	const name = getName();
	const role = getRole();
	//console.log(name);
	//console.log(role)
	//console.log(isAuthenticated);

	//const count = data.filter(function (item) {
	//	if (item.status === 0) {
	//		return true;
	//	} else {
	//		return false;
	//	}
	//}).length; // 6

	//console.log(count)
	//console.log(data[0].beneficiaryID);
	useEffect(() => {
		let studentState = data;
		setStudentState(
			studentState.map((d) => {
				return {
					select: false,
					id: d.beneficiaryID,
					address: d.address,
					race: d.race,
					religion: d.religion,
					region: d.regionID_regionID,
					diet: d.dietaryRestrictions,
					//stock: '',
					org: d.org_charityID,
					hsehold: d.householdSize,
					extraCharities: d.extraCharities,
				};
			})
		);
	}, []);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		setGlobalFilter,
		page,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			//filterTypes,
			initialState: {
				pageIndex: 0,
				// hiddenColumns: ['beneficiaryID']
			},
		},
		useFilters,
		useGlobalFilter,
		useSortBy,
		usePagination
	);

	function submitQuery(e) {
		//console.log(name); // test user name here !! ! ! !  !
		e.preventDefault();
		let fake_charity_data = name;
		////console.log(name);
		let payload = [];
		let id_list = [];
		//console.log(studentState);
		for (const s in studentState) {
			// only true append, else don lol
			if (studentState[s].select === true) {
				id_list.push(studentState[s].id); //to be append to beneid_beneid
			}
		}
		//console.log(id_list);
		//console.log(id_list.toString());
		async function benequeryfunction(beneid) {
			const url = `https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest('${beneid}')`;
			const res = await fetch(url);
			const result = await res.json();
			return result;
		}

		async function posttoreview(benedict) {
			const postres = await fetch(
				'https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest',
				{
					method: 'POST', // or 'PUT'
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(benedict),
				}
			);
			const postresult = await postres.json();
			return postresult;
		}

		async function puttoreview(benedict, beneid) {
			const putres = await fetch(
				`https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest('${beneid}')`,
				{
					method: 'PUT', // or 'PUT'
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(benedict),
				}
			);
			const putresult = await putres.json();
			return putresult;
		}

		for (const i in id_list) {
			//console.log(id_list[i]);
			// try to add charity id one by one to help bene
			try {
				(async () => {
					let result = await benequeryfunction(id_list[i]);
					//console.log('@odata.context' in result)

					if ('@odata.context' in result) {
						//if beneid is already inside , get the json and update to other PUT req
						let result_list = result.other; //ERROR HERE , check it later
						//console.log(result_list)
						let res = result_list.split(',');
						//console.log(res);
						if (res.includes(fake_charity_data)) {
							// check if charity id insdie or not ?
							console.log(
								'You have already requested data b4 / have access to the current data' // this shld be pop up, after tat close the whole window and reset state
							);
						} else {
							for (const r in res) {
								//  update and add charity id json
								if (res[r] === 'null') {
									// if null (no charity on the bene) update charity to bene and else add to string
									let dict = {
										//status: 'Request data',
										other: fake_charity_data,
									};
									let res = await puttoreview(dict, id_list[i]);
									console.log(res);
								} else {
									// get the json 
									let existingOthers = result.other; // per bene id
									let stringToList = existingOthers.split(',');
									stringToList.push(fake_charity_data);
									let listToString = stringToList.join();
									console.log(listToString);
									let payload = {
										//status: 'Request data',
										other: listToString,
									};
									let res = await puttoreview(payload, id_list[i]);
									console.log(res);
								}
							}
						}
					} else if (result.error.message === 'Not Found') {
						// if bene not found , post req
						//console.log(id_list[i]);
						let dict = {
							//status: 'Request data',
							other: fake_charity_data,
							beneficiaryID_beneficiaryID: id_list[i],
						};
						let res = await posttoreview(dict);
						console.log(res);
					}
				})();
			} catch (error) {
				console.error(error);
			}
		}
	}

	//const tabledata = data;

	return (
		<div className='popup'>
			<div className='container mx-auto px-4 sm:px-8 mt-18'>
				{/*<div className='popup\_inner'>  */}
				<div className='py-8 flex-grow flex-col flex justify-center bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-4'>
					<Button
						style={cursor}
						onClick={closePopup}
						variant='contained'
						color='secondary'
					>
						Close
					</Button>
					<h2 className='text-2xl font-semibold leading-tigh text-left'>
						Selected Beneficiaries Data
					</h2>
					<div>
						<SearchFilter
							setFilter={setGlobalFilter}
							goPrev={previousPage}
							pageCount={pageCount}
							pageSize={pageSize}
							setPageSize={setPageSize}
							canPrev={canPreviousPage}
							goNext={nextPage}
							canNext={canNextPage}
							pageIndex={pageIndex}
							pageOptionsLength={pageOptions.length}
						/>
					</div>
					{
						<table {...getTableProps()} className='w-full table-auto'>
							<thead>
								<tr>
									<th scope='col'>
										{/*<input type='checkbox'> </input>{' '}*/}
										<input
											type='checkbox'
											onChange={(e) => {
												let checked = e.target.checked;
												setStudentState(
													studentState.map((d) => {
														d.select = checked;
														return d;
													})
												);
											}}
										></input>
									</th>
									<th
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										BENEID
									</th>
									<th
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										REGION
									</th>
									<th
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										ADDRESS
									</th>
									<th
										scope='col'
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										HOUSEHOLD
									</th>
									<th
										scope='col'
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										RACE
									</th>
									<th
										scope='col'
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										RELIGION
									</th>
									<th
										scope='col'
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										DIETARY RESTRICTIONS
									</th>
									{/*<th
										scope='col'
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										STOCK LVL
									</th>*/}
									<th
										scope='col'
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										ORG
									</th>
									<th
										scope='col'
										className='px-2 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
											text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
									>
										Charities helping
									</th>
								</tr>
							</thead>
							<tbody {...getTableBodyProps()}>
								{studentState.map((row, i) => {
									prepareRow(row);
									return (
										<tr
											key={row.id}
											{...row.getRowProps()}
											className='border hover:bg-gray-400 flex lg:table-row flex-wrap mb-1 mt-1 lg:mb-0 '
										>
											<th scope='row'>
												<input
													onChange={(event) => {
														let checked = event.target.checked;
														setStudentState(
															studentState.map((data) => {
																if (row.id === data.id) {
																	data.select = checked;
																}
																return data;
															})
														);
													}}
													type='checkbox'
													checked={row.select}
												></input>
											</th>
											{/*{row.cells.map((cell) => {
												return (
													<td
														className='px-1 py-1 lg:table-cell border text-sm text-center '
														{...cell.getCellProps()}
													>
														{cell.render('Cell')}
													</td>
												);
											})}*/}
											<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.id}
											</td>
											<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.region}
											</td>
											<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.address}
											</td>
											<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.hsehold}
											</td>
											<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.race}
											</td>
											<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.religion}
											</td>
											<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.diet}
											</td>
											{/*<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.stock}
											</td>*/}
											<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.org}
											</td>
											<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.extraCharities}
											</td>

											{/*<td className='px-1 py-1 lg:table-cell border text-sm text-center '>
												{row.id}
											</td>*/}
										</tr>
									);
								})}
							</tbody>
						</table>
					}
				</div>
				<Button
					variant='contained'
					color='primary'
					style={container}
					onClick={submitQuery}
				>
					{'  '}
					Request data ! {'  '}
				</Button>
				{/*<h1 style={about}> HELLOOOOOOOOO </h1>  */}
			</div>
		</div>
		//</div>
	);
}

const about = {
	color: 'black',
	fontWeight: 'bold',
};

const cursor = {
	position: 'relative',
	left: '0%',
	width: '5%',
	color: 'white',
	cursor: 'pointer',
	fontWeight: 'bold',
};

const container = {
	position: 'absolute',
	//top: "20px",
	width: '15%',
	height: '15%',
	bottom: '3%',
	right: '1%',
	//left: '2%',
	padding: '2%',
	zIndex: '400',
	fontWeight: 'bold',
};

//count == 0 ?
