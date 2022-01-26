import React from 'react';
import classnames from 'classnames';
import styles from './DropDownMenu.module.css';

export default function DropDownMenu(props) {
	const DropDownItem = (props) => {
		return (
			<a className='flex px-8 py-2 justify-left w-auto hover:bg-gray-800 hover:text-white text-black text-lg'>
				<span>{props.icon}</span>
				{props.children}
			</a>
		);
	};

	return (
		<div
			className={classnames(
				styles.dropdown,
				'bg-white py-2 border-2 rounded-lg z-10'
			)}
		>
			{props.data.map((value, i) => {
				return <DropDownItem key={i}>{value}</DropDownItem>;
			})}
		</div>
	);
}
