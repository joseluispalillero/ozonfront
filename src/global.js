let Global = {
	env: process.env.REACT_APP_ENV,
	url: process.env.REACT_APP_POKEMON_BASE_URL,
	mobileWidth: 1024,
};

export function compareValues(key, order = 'asc') {
	return function innerSort(a, b) {
		if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			return 0;
		}
		const varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
		const varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
		let comparison = 0;
		if (varA > varB) {
			comparison = 1;
		} else if (varA < varB) {
			comparison = -1;
		}
		return order === 'desc' ? comparison * -1 : comparison;
	};
}

export default Global;
