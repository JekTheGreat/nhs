/*eslint-disable*/
import * as globals from "__src/globals";

const OnlineStore = {

	getCartList: async (token) => {
		try {
			const result = await globals.OnlineStore.get(`/product/cart/list`);

			return result;
		} catch (e) {
			throw e;
		}
	},

	deleteCartItem: async (param) => {
		try {
			const result = await globals.OnlineStore.patch(`/product/cart`, { ...param });

			return result;
		} catch (e) {
			throw e;
		}
	},

	changeCartItem: async (param) => {
		try {
			const result = await globals.OnlineStore.post(`/product/cart/save`, { ...param });

			return result;
		} catch (e) {
			throw e;
		}
	},

	getMyShop: async (token) => {
		try {
			const result = await globals.OnlineStore.get(`/myShop`);

			return result;
		} catch (e) {
			throw e;
		}
	},


	searchProduct: async (param) => {
		try {
			const result = await globals.OnlineStore.post(`/product/list`, { ...param });

			return result;
		} catch (e) {
			throw e;
		}
	},


	getProductList: async () => {
		try {
			const result = await globals.OnlineStore.get(`/product/list/?limit=1000000000&skip=0`);

			return result;
		} catch (e) {
			throw e;
		}
	},

	patchTransaction: async (id, param) => {
		try {
			const result = await globals.OnlineStore.patch(`/transaction/id/${id}`, { ...param });

			return result;
		} catch (e) {
			throw e;
		}
	},

	buyNow: async (param) => {
		try {
			const result = await globals.OnlineStore.post(`/transaction/SaveOrder`, { ...param });
			return result;
		} catch (e) {
			throw e;
		}
	},

	getProductFilterCategoryList: async () => {
		try {
			const result = await globals.OnlineStore.get(`/product/filter/`);
			return result;
		} catch (e) {
			throw e;
		}
	},

	getProductCategoryList: async () => {
		try {
			const result = await globals.OnlineStore.get(`/category/list?`);
			return result;
		} catch (e) {
			throw e;
		}
	},

	getSomethingNew: async () => {
		try {
			const result = await globals.OnlineStore.get(`/product/trending`);
			return result;
		} catch (e) {
			throw e;
		}
	},

	getMostSearch: async () => {
		try {
			const result = await globals.OnlineStore.get(`/product/top`);
			return result;
		} catch (e) {
			throw e;
		}
	},

	getAdsImages: async () => {
		try {
			const result = await globals.OnlineStore.get(`/adsCollection/active`);
			return result;
		} catch (e) {
			throw e;
		}
	},

	getDisputeList: async () => {
		try {
			const result = await globals.OnlineStore.get(`/transaction/dispute/`);

			return result;
		} catch (e) {
			throw e;
		}
	},


	getReasonsToCancel: async () => {
		try {
			const result = await globals.OnlineStore.get(`/reason/list`);

			return result;
		} catch (e) {
			throw e;
		}
	},


	getPurchaseList: async () => {
		try {
			const result = await globals.OnlineStore.get(`/transaction/fullList?limit=99999999999&skip=0`);

			return result;
		} catch (e) {
			throw e;
		}
	},

	getDeliveryAddress: async (userId) => {
		try {
			const result = await globals.OnlineStore.get(`/delivery/user_id/${userId}`);

			return result;
		} catch (e) {
			throw e;
		}
	},
};


export default OnlineStore;
