import React, { useState, useMemo, useEffect } from 'react';
import { useTable, useRowSelect } from 'react-table';
//import MOCK_DATA from './MOCK_DATA.json';
import { COLUMNS } from './columns';
//import './table.css'
import { Checkbox } from './Checkbox';
import Button from '@material-ui/core/Button';

export default function Requests({ odata, name }) {
	const [selected, setselected] = useState([]);
	const data = odata;
	const columns = useMemo(() => COLUMNS, []);
	const yourname = name;

	let selectedarray = [];
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		prepareRow,
		selectedFlatRows,
	} = useTable(
		{
			columns,
			data,
		},
		useRowSelect,
		(hooks) => {
			hooks.visibleColumns.push((columns) => [
				{
					id: 'selection',
					Header: ({ getToggleAllRowsSelectedProps }) => (
						<Checkbox {...getToggleAllRowsSelectedProps()} />
					),
					Cell: ({ row }) => <Checkbox {...row.getToggleRowSelectedProps()} />,
				},
				...columns,
			]);
		}
	);
	useEffect(() => {
		selectedFlatRows.map((row) => {
			selectedarray.push(row.values);
		});
	});

	function rejectQuery(e) {
		e.preventDefault();

		async function delreview(beneid) {
			// del bene if empty
			// if null
			const delres = await fetch(
				`https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest('${beneid}')`,
				{
					method: 'DELETE', // or 'PUT'
					headers: { 'Content-Type': 'application/json' },
				}
			);
			const delresult = await delres.text();
			return delresult;
		}

		async function benequeryfunction(beneid) {
			// get bene from beneficiary entity
			const url = `https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest('${beneid}')`;
			const res = await fetch(url);
			const result = await res.json();
			return result;
		}

		async function puttoreview(benedict, beneid) {
			const putres = await fetch(
				`https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest('${beneid}')`,
				{
					method: 'PATCH', // or 'PUT'
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(benedict),
				}
			);
			const putresult = await putres.json();
			return putresult;
		}

		for (const s in selectedarray) {
			try {
				(async () => {
					let result = await benequeryfunction(
						//check in review ID
						selectedarray[s].beneficiaryID_beneficiaryID
					);
					console.log(result);
					if (result.other == null) {
						// if review have no other charities rrequesting data,
						let res = await delreview(
							selectedarray[s].beneficiaryID_beneficiaryID
						);
						console.log(res);
					} else {
						let templist = result.other.split(','); // else just remove the rejected charity
						if (templist.includes(selectedarray[s].other)) { // this one error pls 
							// if others contatins the chairty id
							var index = templist.indexOf(selectedarray[s].other);
							if (index != -1) {
								templist.splice(index, 1); // remove the charity id from other in the list
							}

							//check if the list is empty now or not

							if (templist === undefined || templist.length == 0) {
								// array empty or does not exist
								let res = await delreview(
									selectedarray[s].beneficiaryID_beneficiaryID
								);
								console.log(res);
								// if list not empty, modify it
							} else {
								let tempdict = {
									other: templist.join(),
								};
								let res = await puttoreview(
									tempdict,
									selectedarray[s].beneficiaryID_beneficiaryID
								);
								console.log(res);
							}
						}
					}
				})();
			} catch (error) {
				console.error(error);
			}
		}
	}

	function submitQuery(e) {
		e.preventDefault();
		//alert(JSON.stringify(selectedarray));
		async function puttoreview(benedict, beneid) {
			const putres = await fetch(
				`https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest('${beneid}')`,
				{
					method: 'PATCH', // or 'PUT'
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(benedict),
				}
			);
			const putresult = await putres.json();
			return putresult;
		}

		async function delreview(beneid) {
			// del bene if empty
			// if null
			const delres = await fetch(
				`https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest('${beneid}')`,
				{
					method: 'DELETE', // or 'PUT'
					headers: { 'Content-Type': 'application/json' },
				}
			);
			const delresult = await delres.text();
			return delresult;
		}

		async function benequeryfunction(beneid) {
			// to see if null / got existing string inside
			const url = `https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary('${beneid}')`;
			const res = await fetch(url);
			const result = await res.json();
			return result;
		}

		async function getDatareq(beneid) {
			// to see if null / got existing string inside
			const url = `https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/DataRequest('${beneid}')`;
			const res = await fetch(url);
			const result = await res.json();
			return result;
		}

		async function puttchartobene(benedict, beneid) {
			const putres = await fetch(
				`https://cors-anywhere.herokuapp.com/https://smucf-dev-ebs-g1t3-srv.cfapps.us10.hana.ondemand.com/api/Beneficiary('${beneid}')`,
				{
					method: 'PATCH', // or 'PUT'
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(benedict),
				}
			);
			const putresult = await putres.json();
			return putresult;
		}
		for (const s in selectedarray) {
			try {
				(async () => {
					//checking starts here
					//console.log(selectedarray[s].beneficiaryID_beneficiaryID)
					let result = await benequeryfunction(
						//see beneid of benefeceires
						selectedarray[s].beneficiaryID_beneficiaryID
					);
					if (result.extraCharities == null) {
						//if no charities are helping currently
						let dict = {
							extraCharities: selectedarray[s].other,
						};
						let res = await puttchartobene(
							// just append to null of the bene id
							dict,
							selectedarray[s].beneficiaryID_beneficiaryID
						);
						console.log(res);

						//need to edit toReview also, check if null or not null then do accorindgly

						// if only got one and it is  
						let wait = await getDatareq(selectedarray[s].beneficiaryID_beneficiaryID); 
						let waitarray = wait.other.split(",");
						let waitcount = wait.other.split(",").length;


					} else if (result.extraCharities != null) {
						//if inside not null got charities helping
						let templist = result.extraCharities.split(',');
						templist.push(selectedarray[s].other);
						let tempdict = {
							extraCharities: templist.join(),
						};
						let tempres = await puttchartobene( 
							tempdict,
							selectedarray[s].beneficiaryID_beneficiaryID
						);
						console.log(tempres);
						//need to edit toReview also, check if null or not null then do accorindgly
					}

					//console.log(result.extraCharitites);
				})();
			} catch (error) {
				console.error(error);
			}
		}
	}
	const firstPageRows = rows.slice(0, 10);
	//console.log(firstPageRows);

	return (
		<>
			<table className="table-auto "{...getTableProps()} >
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr  {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column)  => (
								<th className="w-1/4 px-4 py-2 " {...column.getHeaderProps()}>{column.render('Header' )}  </th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{firstPageRows.map((row) => {
						prepareRow(row);
						return (
							<tr className="w-1/4 px-4 py-2 "{...row.getRowProps()}  >
								{row.cells.map((cell) => {
									return (
										<td className="border px-10 py-2 "  {...cell.getCellProps()}>{cell.render('Cell')} </td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
			{/*<pre>
				<code>
					{JSON.stringify(
						{ selectedFlatRows: selectedFlatRows.map((row) => row.original) },
						null,
						2
					)}
				</code>
			</pre>*/}
			<div style={buttonscss}>
				<Button
					variant='contained'
					color='primary'
					style={container}
					onClick={submitQuery}
				>
					{'  '}
					Approve Request ! {'  '}
				</Button>
				<Button
					variant='contained'
					color='secondary'
					style={rejcontainer}
					onClick={rejectQuery}
				>
					{'  '}
					Reject Request ! {'  '}
				</Button>
			</div>
		</>
	);
}

const buttonscss = {
	display: 'flex',
	justifyContent: 'flex-end',
	height: '2%',
};

const container = {
	position: 'relative',
	width: '1%',
	right: '1%',
	padding: '5%',
	zIndex: '400',
	fontWeight: 'bold',
};

const rejcontainer = {
	position: 'relative',
	width: '1%',
	right: '1%',
	padding: '5%',
	zIndex: '400',
	fontWeight: 'bold',
};


//.table {
//    font-family: 'acumin-pro','Montserrat',Helvetica,Arial,Lucida,sans-serif ;
//    border-collapse: collapse;
//    width: 100%;
//  }
  
//table td,
//table th {
//    border: 1px solid black;
//    padding: 8px;
//  }
  
//  table tr:nth-child(even) {
//    background-color: black;
//  }
  
//  table tr:hover {
//    background-color: black;
//  }
  
//  table th, tfoot td {
//    padding-top: 12px;
//    padding-bottom: 12px;
//    text-align: center;
//    background-color: #e2e8f0;
//    color: black;
//  }