import SearchFilter from './SearchFilter';
import { columns } from './Init';
import {
	useTable,
	useSortBy,
	useFilters,
	useGlobalFilter,
	usePagination,
} from 'react-table';
import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Tablefooter from './TableFooter';

//https://www.tailwindtoolbox.com/components/responsive-table

//https://blog.logrocket.com/building-styling-tables-react-table-v7/
//https://codesandbox.io/s/react-table-7-sort-cpvwe?file=/src/RTable.js
//https://medium.com/@blaiseiradukunda/react-table-7-tutorial-3d8ba6ac8b16

export default function Table({ odata, send }) {
	let count = odata.length;
	let data = odata;
	// console.log(data);
	
	const Table = ({ columns, data }) => {
		const filterTypes = React.useMemo(
			() => ({
				text: (rows, id, filterValue) => {
					return rows.filter((row) => {
						const rowValue = row.values[id];
						return rowValue !== undefined
							? String(rowValue)
									.toLowerCase()
									.startsWith(String(filterValue).toLowerCase())
							: true;
					});
				},
			}),
			[]
		);

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
				filterTypes,
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

		return (
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

				<table {...getTableProps()} className='w-full table-fixed'>
					<TableHeader headerGroups={headerGroups} {...getTableBodyProps()} />
					<TableBody
						page={page}
						prepareRow={prepareRow}
						{...getTableBodyProps()}
						send={send}
					/>
				</table>
				<Tablefooter count={count} />
			</div>
		);
	};

	return (
			<div className='py-8 flex-grow flex-col flex justify-center bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 mt-4'>
				<h2 className='text-2xl font-semibold leading-tigh text-left'>
					Beneficiaries Data
				</h2>
					<Table columns={columns} data={odata} />
			</div>
	);
}
