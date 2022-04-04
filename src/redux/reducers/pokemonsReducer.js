import { POKEMONS_ALL } from '../actions/pokemonsAction';
import { merger } from './actionReducers';

const initialState = {
	pokemons: null,
};

export const pokemonsReducer = (state = initialState, action) => {
	switch (action.type) {
		case POKEMONS_ALL:
			return merger(state, { pokemons: action.payload, err: undefined });
		default:
			return state;
	}
};
