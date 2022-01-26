import classnames from 'classnames';
import CssToolTip from './CssToolTip';

export default function TableBody({ page, prepareRow, send }) {

	return (
		<tbody>
			{page.map((row, i) => {
				let bg = 'bg-gray-100';
				if (i % 2 == 0) {
					bg = 'bg-gray-100';
				} else {
					bg = 'bg-white';
				}

				prepareRow(row);
				return (
					<tr
						{...row.getRowProps()}
						id={row.cells[0].value}
						className={classnames(
							bg,
							'border hover:bg-gray-400 flex lg:table-row flex-wrap mb-1 mt-1 lg:mb-0'
						)}
						
					>
						{row.cells.map((cell) => {
							if (
								cell.column.Header == 'Stock lvl' &&
								cell.row.original.delivery != null
							) {
								// console.log(cell);
								// console.log(cell.value);
								if (cell.value < 14) {
									if (cell.value < 5) {
										var cl = 'bg-red-400';
										send.push(row.cells[0].value);
									}
									else {
										var cl = 'bg-yellow-400';	
										// med.push(row.cells[0].value);
									}
								}
								else {
									var cl = 'bg-green-400';
								}
								
								let tl =
									cell.value < 14
										? cell.value < 5
											? 'text-red-800'
											: 'text-yellow-800'
										: 'text-green-800';
								// console.log(cell.value);

								return (
									<td
										className='px-5 py-5 lg:table-cell'
										{...cell.getCellProps()}
									>
										<span
											className={classnames(
												tl,
												'relative block text-center px-2 py-2 font-semibold leading-tight'
											)}
										>
											<span
												aria-hidden
												className={classnames(
													cl,
													'absolute inset-0 opacity-50 rounded-full'
												)}
											></span>
											<span className='relative'>
												<p>
													{cell.value < 14
														? cell.value < 5
															? 'Low'
															: 'Medium'
														: 'High'}
												</p>
											</span>
										</span>
										<p className='relative block text-center px-2 py-2 text-semi-bold'>
											{cell.row.original.delivery}
										</p>
									</td>
								);
							} else if (cell.column.Header == 'Dietary restrictions') {
								return (
									<td
										className='px-5 py-5 lg:table-cell'
										{...cell.getCellProps()}
									>
										{typeof cell.value != 'undefined' &&
										cell.value != null &&
										cell.value != ''  &&
										cell.value.length != 0 ? (
											<CssToolTip
												data={cell.value}
												text={'Generic Restriction Text'}
											/>
										) : (
											<p className='text-center text-gray-900 underline'>{'None'}</p>
										)}
									</td>
								);
							} else if (cell.column.Header != 'Id') {
								if (cell.column.Header == 'Stock lvl') {
									send.push(row.cells[0].value);
								}
								return (
									<td
										className='px-5 py-5 lg:table-cell'
										{...cell.getCellProps()}
									>
										{typeof cell.value == 'undefined' ||
										cell.value == null ||
										cell.value == '' ? (
											<p className='text-center text-gray-900 underline'>
												None
											</p>
										) : (
											<p className='text-center text-gray-900'>
												{/* {cell.render("Cell")} */}
												{typeof cell.value == 'undefined' ||
												cell.value == null ||
												cell.value == ''
													? 'None'
													: cell.value}
											</p>
										)}
									</td>
								);
							}
							else {
								return (
									<td
									className='px-5 py-5 lg:table-cell'
									{...cell.getCellProps()}
									>
									{cell.value}
									</td>
								)
								// return <td className='hidden' key={cell.value}></td>;
							}

						})}
						{/* {setLow(low), setNone(none), setMedium(med)} */}
					</tr>
				);
			})}
		</tbody>
	);
}
