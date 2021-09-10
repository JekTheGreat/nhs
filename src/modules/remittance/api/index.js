// /* eslint-disable */
import * as globals from "__src/globals";

const Remittance = {
	callGet: async (routes, token) => {
		try {
			if (token){
				globals.Remittance.setToken(token);
			}
			const result = await globals.Remittance.get(`${routes}`);

			return result;
		} catch (e) {
			console.log("callGet", JSON.stringify(e));
			throw e;
		}
	},

	callPatch: async (routes, body, token) => {
		try {
			if (token){
				globals.Remittance.setToken(token);
			}
			const result = await globals.Remittance.patch(`${routes}`, body);

			return result;
		} catch (e) {
			console.log("callPatch", JSON.stringify(e));
			throw e;
		}
	},

	callPost: async (routes, params, token) => {
		try {
			if (token){
				globals.Remittance.setToken(token);
			}
			const result = await globals.Remittance.post(`${routes}`, {...params});

			return result;
		} catch (e) {
			console.log("callPost", JSON.stringify(e));
			throw e;
		}
	},

	getProvider: async (param) => {
		try {
			const result = await globals.Remittance.post("/getProvider", {
				type: param,
			});

			return result;
		} catch (e) {
			throw e;
		}
	},

	AddSender: async (param) => {
		try {
			const result = await globals.Remittance.post("/cebuana/AddSender", {...param});

			return result;
		} catch (e) {
			throw e;
		}
	},

	OTPSend: async (params) => {
		try {
			const result = await globals.Remittance.post("/otp/create", { ...params });

			return result;
		} catch (e) {
			throw e;
		}
	},
	
	OTPVerify: async (params) => {
		try {
			const result = await globals.Remittance.post("/otp/verify", { ...params });

			return result;
		} catch (e) {
			throw e;
		}
	},

	call: async (route, params) => {
		try {
			const result = await globals.Remittance.post(route, { ...params });

			return result;
		} catch (e) {
			throw e;
		}
	},

	fetchIdType: async () => {
		try {
			const result = await globals.Remittance.get("/idTypes");

			return result;
		} catch (e) {
			throw e;
		}
	},
};

export default Remittance;
