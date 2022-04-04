import PerfectScrollbar from 'react-perfect-scrollbar';
import { Box, Card, CardHeader, Divider, Grid, Paper } from '@material-ui/core';

const Pokemons = (props) => {
	console.log(props.pokemons);

	return (
		<Card>
			<CardHeader title='Resultados de la busqueda' />
			<Divider />
			<PerfectScrollbar>
				{props.pokemons
					? props.pokemons.map((pokemon) => (
							<Grid container spacing={2}>
								<Grid item>
									<Paper variant='outlined'>
										<Box display='flex' width={300} height={120} alignItems='center' justifyContent='center'>
											<img src={pokemon.data.sprites.front_default} width='45%' />
										</Box>
									</Paper>
								</Grid>
								<Grid item>
									<Box display='flex' width={200} height={120} alignItems='center' justifyContent='center'>
										{pokemon.data.name}
									</Box>
								</Grid>
							</Grid>
					  ))
					: null}
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
};

export default Pokemons;
