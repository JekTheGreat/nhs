/* eslint-disable max-len */
import * as globals from "../globals";

const API = {
	login: async (params, token) => {
		try {

			if (token){
				globals.CurrentApi.setToken(token);
			}
			const result = await globals.CurrentApi.post("/users/login", {...params});

			return result;
		} catch (e) {
			console.log("login", JSON.stringify(e));
			throw e;
		}
	},

	callGet: async (routes) => {
		try {

			const result = await globals.CurrentApi.get(`${routes}`);

			return result;
		} catch (e) {
			console.log("callGet", JSON.stringify(e));
			throw e;
		}
	},

	callPatch: async (routes, body, token) => {
		try {
			if (token){
				globals.CurrentApi.setToken(token);
			}
			const result = await globals.CurrentApi.patch(`${routes}`, body);

			return result;
		} catch (e) {
			console.log("callPatch", JSON.stringify(e));
			throw e;
		}
	},

	callPost: async (routes, params, token) => {
		try {
			if (token){
				globals.CurrentApi.setToken(token);
			}
			const result = await globals.CurrentApi.post(`${routes}`, {...params});

			return result;
		} catch (e) {
			console.log("callPost", JSON.stringify(e));
			throw e;
		}
	},

	getProfile: async (routes) => {
		try {
			const result = await globals.CurrentApi.get(`${routes}`);

			return result;
		} catch (e) {
			console.log("getProfile", JSON.stringify(e));
			throw e;
		}
	},

	updateProfile: async (routes, params, token) => {
		try {
			if (token){
				globals.CurrentApi.setToken(token);
			}
			const result = await globals.CurrentApi.patch(`${routes}`, params);

			return result;
		} catch (e) {
			console.log("getProfile", JSON.stringify(e));
			throw e;
		}
	},

	getAccount: async (routes, token) => {
		try {
			if (token){
				globals.CurrentApi.setToken(token);
				globals.CurrentApi.setFormData(null);
			}
			const result = await globals.CurrentApi.get(`${routes}`);

			return result;
		} catch (e) {
			console.log("getAccount", JSON.stringify(e));
			throw e;
		}
	},

	getWallet: async (routes, token) => {
		try {
			if (token){
				globals.CurrentApi.setToken(token);
				globals.CurrentApi.setFormData(null);
			}
			const result = await globals.CurrentApi.get(`${routes}`);

			return result;
		} catch (e) {
			console.log("getAccount", JSON.stringify(e));
			throw e;
		}
	},

	createWallet: async (routes, params, token) => {
		try {
			if (token){
				globals.CurrentApi.setToken(token);
				globals.CurrentApi.setFormData(null);
			}
			const result = await globals.CurrentApi.post(`${routes}`,  {...params});

			return result;
		} catch (e) {
			console.log("getAccount", JSON.stringify(e));
			throw e;
		}
	},
	getAllTransaction: async (routes, token) => {
		try {
			if (token){
				globals.CurrentApi.setToken(token);
				globals.CurrentApi.setFormData(null);
			}
			const result = await globals.CurrentApi.get(`${routes}`);

			return result;
		} catch (e) {
			console.log("getAccount", JSON.stringify(e));
			throw e;
		}
	},
	createFundRequest: async (routes, params, token) => {
		try {
			if (token){
				globals.CurrentApi.setToken(token);
				globals.CurrentApi.setFormData(null);
			}
			const result = await globals.CurrentApi.post(`${routes}`, {...params});

			return result;
		} catch (e) {
			console.log("createFundRequest", JSON.stringify(e));
			throw e;
		}
	},

	getIntRates: async (fromCurrency, toCurrency) => {
		// const result = await fetch(`https://api-ups-v3-mla.unified.ph/v1/rates/exchange/${fromCurrency}/${toCurrency}/sell`)
		const result = await fetch(`http://10.10.20.21/v1/rates/exchange/${fromCurrency}/${toCurrency}/sell`)
			.then((data) => {
				return data.json();
			}).catch((error) => {
				throw error;
			});
		
		return result;
	},
};

export default API;
