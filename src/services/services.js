import axios from 'axios';
import Global from '../global';

const baseURL = Global.url;

class Services {
	constructor() {
		this.service = axios.create({
			timeout: 30000,
			baseURL,
		});

		this.service.interceptors.response.use(
			async (response) => {
				return response;
			},
			(error) => {
				return Promise.reject(error.message);
			}
		);
	}

	getAllPokemons() {
		return this.service.get('/findAll');
	}

	getPokemon(name) {
		return this.service.get('/findById/' + name);
	}
}

export default Services;
