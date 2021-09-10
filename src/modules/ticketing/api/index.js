/* eslint-disable max-len */
import * as globals from "__src/globals";

const Ticketing = {
	callGet: async (route, token) => {
		try {
			if (token){
				globals.setToken(token);
			}
			const result = await globals.Ticketing.get(route);

			return result;
		} catch (e) {
			throw e;
		}
	},
	callPost: async (route, param, token) => {
		try {
			if (token){
				globals.setToken(token);
			}
			const result = await globals.Ticketing.post(route, param);

			return result;
		} catch (e) {
			console.log("callPost", e);
			throw e;
		}
	},
};

export default Ticketing;
