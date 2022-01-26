import { Button } from '@material-ui/core';

const FoodBasketButton = ({ onClick, className = '', children }) => (
	<div>
		<Button
			color='primary'
			// fullWidth='true'
			onClick={onClick}
			className={className}
		>
			{children}
		</Button>
	</div>
);

export default FoodBasketButton;
