import { Card, Grid, Typography } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import FoodBasketButton from '../Buttons/FoodBasketButton.js';

export default function StockCard({
	checker = false,
	increment = '',
	onClick = '',
	data,
	children,
}) {
	return (
		<Card>
			<Grid container>
				<CardHeader title={children} />
			</Grid>
			<CardContent>
				{checker && data ? (
					data.map((item) => (
						<Grid container key={item.stock_stockID}>
							<Grid item>
								<FoodBasketButton onClick={() => increment(item)}>
									{item.stock_name}
								</FoodBasketButton>
							</Grid>
						</Grid>
					))
				) : (
					<Typography variant='h5' component='h2' color='textSecondary'>
						Please enable editing
					</Typography>
				)}
			</CardContent>
		</Card>
	);
}
