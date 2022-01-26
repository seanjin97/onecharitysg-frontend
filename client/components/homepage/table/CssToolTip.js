import styles from './CssToolTip.module.css';
import classnames from 'classnames';

export default function CssToolTip({ data, text }) {
	return (
		<span className={classnames(styles.tooltip, 'justify-center hover:')}>
			<p className='text-center text-red-700 hover:text-red-900 underline font-semibold cursor-pointer'>
				{data}
			</p>
			<span
				className={classnames(
					styles.tooltiptext,
					'bg-white py-2 border-2 rounded-lg z-10'
				)}
			>
				<p className='text-black text-sm'>{text}</p>
			</span>
		</span>
	);
}
