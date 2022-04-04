import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Divider, Grid, Paper } from '@material-ui/core';

const Pokemons = (props) => (
	<Card {...props}>
		<CardHeader title='Resultados de la busqueda' />
		<Divider />
		<PerfectScrollbar>
			<Grid container spacing={2}>
				<Grid item xs={4}>
					<Paper variant='outlined'>
						<img src='url' />
					</Paper>
				</Grid>
				<Grid item xs={8}>
					Pokemon name
				</Grid>
			</Grid>
		</PerfectScrollbar>
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'flex-end',
				p: 2,
			}}
		></Box>
	</Card>
);

export default Pokemons;
