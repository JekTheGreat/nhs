/* eslint-disable */
import * as globals from "__src/globals";

const Staycation = {
	getProperties: async () => {
		try {
			const result = await globals.Staycation.get(`/home/get/properties`);
			
			return result;
		} catch (e) {
			throw e;
		}
	},
	getAmenities: async () => {
		try {
			const result = await globals.Staycation.get("/home/amenities");
			
			return result;
		} catch (e) {
			throw e;
		}
	},
	getRules: async () => {
		try {
			const result = await globals.Staycation.get(`/home/house-rules`);
			return result;
		} catch (e) {
			throw e;
		}
	},
	
	getPropertyTypes: async (param) => {
		try {
			const result = await globals.Staycation.get(`/home/get/property/type/${param}`);

			return result;
		} catch (e) {
			throw e;
		}
	},
	getLoc: async (param) => {
		try {
			const result = await globals.Staycation.get(`/places/autocomplete/address/${param}`);

			return result;
		} catch (e) {
			throw e;
		}
	},
	fetchPlancode: async (param, Int ) => {
		try {
			const result = await globals.Staycation.post(`/${Int || ""}plancodes`,
				{ ...param });

			return result;
		} catch (e) {
			throw e;
		}
	},
};

export default Staycation;
