import { AccountBox, FiberManualRecord } from '@material-ui/icons';

export default function SubHeader({ name, role }) {
	return (
		<div className='max-w-7xl bg-gray-800 '>
			<div className='flex items-center h-10 mx-auto container'>
				<AccountBox
					className='ml-auto'
					fontSize='small'
					style={{ color: 'white' }}
				/>
				<span className='text-l text-white float-right border-r-1 border-gray-400'>
					<p className='mr-2 ml-1'>
						{role == "" ? "Not set" : "Role: " +role}
					</p>{' '}
				</span>

				<span className='ml-2 text-l text-white float-right cursor-pointer'>
					{' '}
					<p className=''>Welcome back, {name}</p>{' '}
				</span>
				<FiberManualRecord
					className='animate-pulse ml-1 mr-8 py-1'
					fontSize='small'
					style={{ color: '#4bffc4' }}
				/>
			</div>
		</div>
	);
}
