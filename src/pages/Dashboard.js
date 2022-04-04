import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, TextField, InputAdornment, Button, Container, Grid, SvgIcon } from '@material-ui/core';
import Pokemons from '../components/dashboard/Pokemons';
import { getPokemons } from '../redux/actions/pokemonsAction';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Search as SearchIcon } from 'react-feather';
import Services from '../services/services';

const pokemonsService = new Services();

const Dashboard = (props) => {
	const [name, setName] = useState(0);
	const [pokemonsF, setPokemonsF] = useState([]);

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const fetchData = async () => {
		await props.getPokemons();
	};

	const search = async () => {
		console.log('', name);
		console.log(props.pokemons.results.filter((item) => item.name.includes(name)));

		const promises = [];
		props.pokemons.results
			.filter((item) => item.name.includes(name))
			.forEach((item) => {
				console.log(item.url);
				promises.push(pokemonsService.getPokemon(item.url.split('/')[6]));
				console.log(item.url.split('/')[6]);
			});

		setPokemonsF(await Promise.all(promises));
	};

	const handleInputChange = (event) => {
		setName(event.target.value);
	};

	return (
		<>
			<Helmet>
				<title>Dashboard</title>
			</Helmet>
			<Box
				sx={{
					backgroundColor: 'background.default',
					minHeight: '100%',
					py: 3,
				}}
			>
				<Container maxWidth={false}>
					<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
						<Grid item xs={8}>
							<TextField
								name='name'
								fullWidth
								onChange={handleInputChange}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<SvgIcon fontSize='small' color='action'>
												<SearchIcon />
											</SvgIcon>
										</InputAdornment>
									),
								}}
								placeholder='Ingresa el nombre a buscar'
								variant='standard'
							/>
						</Grid>
						<Grid>
							<Button color='primary' fullWidth size='large' onClick={search}>
								Buscar
							</Button>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item lg={8} md={12} xl={9} xs={12}>
							<Pokemons pokemons={pokemonsF} />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
};

const mapStateToProps = (state) => ({
	pokemons: state.pokemons.pokemons,
});
export default connect(mapStateToProps, { getPokemons })(Dashboard);
