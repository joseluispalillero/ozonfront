import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import localforage from 'localforage';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { pokemonsReducer } from './reducers/pokemonsReducer';

import axios from 'axios';
import Global from '../global';

const env = Global.env;

const effect = (effect, _action) => axios(effect);
const discard = async (error, _action, _retries) => {
	const { request, response } = error;
	if (!request) throw error;
	if (!response) return false;
	return 400 <= response.status && response.status < 500;
};

localforage.config({
	name: 'OZON:' + env,
	storeName: 'keyvaluepairs',
	description: 'OZON database',
});

const pokemonsPersistConfig = {
	key: 'ozon:auth',
	storage: localforage,
	whitelist: ['pokemons'],
};

const { middleware: offlineMiddleware, enhanceReducer: offlineEnhanceReducer, enhanceStore: offlineEnhanceStore } = createOffline({
	...offlineConfig,
	persist: false,
	effect,
	discard,
});

const reducer = combineReducers({
	pokemons: pokemonsReducer,
});

const persistedReducer = persistReducer(pokemonsPersistConfig, offlineEnhanceReducer(reducer));

export default function configureStore() {
	const store = createStore(persistedReducer, composeWithDevTools(offlineEnhanceStore, applyMiddleware(thunk, offlineMiddleware)));
	const persistor = persistStore(store);

	return { persistor, store };
}
