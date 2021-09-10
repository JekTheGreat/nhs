/* eslint-disable no-useless-catch */
/* eslint-disable quotes */
/* eslint-disable max-len */
import * as globals from "__src/globals";

const Loading = {
	callGet: async (route, token) => {
		try {
			if (token){
				globals.setToken(token);
			}
			const result = await globals.Loading.get(route);

			return result;
		} catch (e) {
			console.log("callGet", e);
			throw e;
		}
	},

	callPost: async (route, param, token) => {
		try {
			if (token){
				globals.setToken(token);
			}
			const result = await globals.Loading.post(route, param);

			return result;
		} catch (e) {
			console.log("callPost", e);
			throw e;
		}
	},
	checkPrefix: async (token) => {
		try {
			if (token){
				globals.setToken(token);
			}
			// const result = await globals.Loading.get(`/prefix/${prefixes}`);
			const result = await globals.Loading.get(`/airtime/prefixes`);

			return result;
		} catch (e) {
			throw e;
		}
	},

	categories: async (param) => {
		try {
			// Local & International
			const result = await globals.Loading.get(`/airtime/categories/${param || ""}`);

			return result;
		} catch (e) {
			throw e;
		}
	},

	load: async (params, token) => {
		try {
			if (token){
				globals.setToken(token);
			}
			const result = await globals.Loading.post("/airtime/load", {
				...params,
			});

			return result;
		} catch (e) {
			throw e;
		}
	},

	convert: async (params, token) => {
		try {
			if (token){
				globals.setToken(token);
			}
			const result = await globals.Loading.post(`/airtime/transactions/compute`, {...params});

			return result;
		} catch (e) {
			throw e;
		}
	},

	searchInventory: async (params, token) => {
		try {
			if (token){
				globals.setToken(token);
			}
			const result = await globals.Loading.get(`/cards/products?category=${params.category || ""}&search=${params.search || ""}`);

			return result;
		} catch (e) {
			throw e;
		}
	},
};

export default Loading;
