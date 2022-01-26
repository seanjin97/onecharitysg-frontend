import classnames from 'classnames';

export default function TableRow({ data, index, bg }) {
	let profile =
		data.race + ' ' + data.religion + ' ' + data.dietaryRestrictions;

	if (index % 2 == 0) {
		bg = 'bg-gray-100';
	} else {
		bg = 'bg-white';
	}

	return (
		<tr id={index} className={bg}>
			<td className='px-5 py-5 border text-sm'>
				<p className='text-center text-gray-900 whitespace-no-wrap'>
					data.regionID
				</p>
			</td>

			<td className='px-5 py-5 border text-sm'>
				<p className='text-center text-gray-900 whitespace-no-wrap'>
					{data.address.charAt(0).toUpperCase() + data.address.slice(1)}
				</p>
			</td>

			<td className='px-5 py-5 border text-sm'>
				<p className='text-center text-gray-900 whitespace-no-wrap'>
					{' '}
					{data.householdSize}{' '}
				</p>
			</td>

			<td className='px-5 py-5 border text-sm'>
				<p className='text-center text-gray-900 whitespace-no-wrap'>
					{' '}
					{data.race}{' '}
				</p>
			</td>

			<td className='px-5 py-5 border text-sm'>
				<p className='text-center text-gray-900 whitespace-no-wrap'>
					{' '}
					{data.religion}{' '}
				</p>
			</td>

			<td className='px-5 py-5 border text-sm'>
				<p className='text-center text-gray-900 whitespace-no-wrap'>
					{' '}
					{data.dietaryRestrictions}{' '}
				</p>
			</td>

			<td className='px-5 py-5 border text-sm'>
				<p className='text-center text-gray-900 whitespace-no-wrap'>
					{' '}
					data.stock{' '}
				</p>
			</td>

			<td className='px-5 py-5 border text-sm'>
				<p className='text-center text-gray-900 whitespace-no-wrap'> data </p>
			</td>
		</tr>
	);
}

{
	/* <td className="px-5 py-5 border text-sm">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-full h-full rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80" alt="" />
                        </div>
                        <div className="ml-3">
                            <p className="text-center text-gray-900 whitespace-no-wrap"> Vera Carpenter </p>
                        </div>
                    </div>
                </td> */
}

{
	/* <td className="px-5 py-5 border text-sm">
                    <span
                        className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                        <span aria-hidden
                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                        <span className="relative">Activo</span>
                    </span>
                </td> */
}
