export default function Tablefooter({ count }) {
	return (
		<div className='px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between'>
			<span className='text-xs xs:text-sm text-gray-900'>
				Retrieved {count} Entries
			</span>
		</div>
	);
}
