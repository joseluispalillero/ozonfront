import Services from '../../services/services';

const pokemonsService = new Services();

export const POKEMONS_ALL = 'POKEMONS_ALL';
export const POKEMONS_ERROR = 'POKEMONS_ERROR';

// async action creator
export const getPokemons = () => async (dispatch) => {
	await pokemonsService
		.getAllPokemons()
		.then((response) => {
			console.log('----------', response);
			dispatch({ type: POKEMONS_ALL, payload: response.data });
		})
		.catch((err) => {
			console.log(err.response);
			dispatch({ type: POKEMONS_ERROR, payload: err.message });
		});
};
