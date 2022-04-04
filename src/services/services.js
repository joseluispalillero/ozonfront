import axios from 'axios';
import Global from '../global';
import AxiosOffline from 'axios-offline';
import LocalForage from 'localforage';

const baseURL = Global.url;

class Services {
	constructor() {
		let AxiosOfflineAdapter = AxiosOffline({
			defaultAdapter: axios.defaults.adapter, //require, basic adapter
			storageName: 'axiosOZON', //optional, default: "axios-stack"
			storageDriver: LocalForage.WEBSQL, //optional, default: LocalForage.LOCALSTORAGE
		});

		this.service = axios.create({
			timeout: 30000,
			adapter: AxiosOfflineAdapter,
			baseURL,
			withCredentials: true,
		});

		this.service.interceptors.response.use(
			async (response) => {
				if (response.headers.version !== Global.version) {
					await LocalForage.clear();
					return null;
				} else {
					return response;
				}
			},
			(error) => {
				return Promise.reject(error.message);
			}
		);
	}

	getAllPokemons() {
		return this.service.get('/pokemons');
	}

	getPokemon(name) {
		return this.service.get('/pokemon/search/' + name);
	}
}

export default Services;
