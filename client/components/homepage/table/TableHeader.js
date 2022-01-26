import { KeyboardArrowUp, KeyboardArrowDown } from '@material-ui/icons';

export default function TableHeader(headerGroups) {
	return (
		<thead>
			{headerGroups.headerGroups.map((headerGroup) => (
				<tr {...headerGroup.getHeaderGroupProps()}>
					{headerGroup.headers.map((column) => hideIdCol(column))}
				</tr>
			))}
		</thead>
	);
}

const hideIdCol = (column) => {
	if (column.Header != 'Id') {
		return (
			<th
				{...column.getHeaderProps(column.getSortByToggleProps())}
				className='w-1/9 px-4 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
        text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
			>
				{column.render('Header')}
				<span>
					{column.isSorted ? (
						column.isSortedDesc ? (
							<KeyboardArrowDown />
						) : (
							<KeyboardArrowUp />
						)
					) : (
						''
					)}
				</span>
			</th>
		);
	} else {
		return (
			<th
			{...column.getHeaderProps()}
			className='w-1/9 px-4 py-2 h-12 hover:bg-gray-400 text-center bg-gray-600 text-left text-xs font-semibold 
			text-gray-800 uppercase tracking-wider lg:w-auto border border-b block lg:table-cell relative lg:static lg:mb-10'
			>
			Id
			</th>
		)
	}
};
