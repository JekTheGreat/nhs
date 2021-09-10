/* eslint-disable */
import * as Types from "./types";
import OnlineStoreApi from "./api/index";
import * as globals from "__src/globals";

export const setOnlineStoreScreen = (data) => ({
	type: Types.SET_ONLINESTORESCREEN,
	data,
});

export const setToReturnScreen = (data) => ({
	type: Types.SET_TO_RETURN_SCREEN,
	data,
});

export const setProfileScreen = (data) => ({
	type: Types.SET_PROFILE_SCREEN,
	data,
});

export const setInputDetails = (data) => ({
	type: Types.SET_INPUTDETAILS,
	data,
});

export const setUserSide = (data) => ({
	type: Types.SET_USER_SIDE,
	data,
});

export const setSelectedItems = (data) => ({
	type: Types.SET_SELECTED_ITEMS,
	data,
});

export const reset_data = () => (
	async (dispatch) => {
		dispatch({ type: Types.RESET_DATA });
	}
);
export const fetchCartList = (token, setInputDetails) => (
	async (dispatch) => {
		try {
			globals.OnlineStore.setToken(token);
			const result = await OnlineStoreApi.getCartList(token);

			if (result) {
				dispatch({ type: Types.GET_CART_LIST, data: result });
			}
		} catch (error) {

		}
	}
);

export const deleteCartItem = (param, session) => (
	async (dispatch) => {
		try {
			globals.OnlineStore.setToken(session.token);
			const result = await OnlineStoreApi.deleteCartItem(param);

			if (result) {
				dispatch({ type: Types.DELETE_CART_ITEM, data: result });
			}
		} catch (error) {

		}
	}
);


export const patchTransaction = (id, param, session) => (
	async (dispatch) => {
		try {
			globals.OnlineStore.setToken(session.token);
			const result = await OnlineStoreApi.patchTransaction(id, param);

			if (result) {
				dispatch({ type: Types.PATCH_TRANSACTION, data: result });
			}
		} catch (error) {

		}
	}
);

export const changeCartItem = (param, session) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });

			globals.OnlineStore.setToken(session.token);
			const result = await OnlineStoreApi.changeCartItem(param);

			if (result) {
				dispatch({ type: Types.CHANGE_CART_ITEM, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);

export const buyNow = (param, session) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });

			globals.OnlineStore.setToken(session.token);
			const result = await OnlineStoreApi.buyNow(param);

			if (result) {
				dispatch({ type: Types.BUY_NOW, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);


export const searchProduct = (param, session) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });

			globals.OnlineStore.setToken(session.token);
			const result = await OnlineStoreApi.searchProduct(param);

			if (result) {
				dispatch({ type: Types.SEARCH_PRODUCT, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);



export const postProductList = (param, session) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
			globals.OnlineStore.setToken(session.token);
			const result = await OnlineStoreApi.postProductList(param);

			if (result) {
				dispatch({ type: Types.POST_PRODUCT_LIST, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);

export const fetchMyShop = (token) => (
	async (dispatch) => {
		try {
			globals.OnlineStore.setToken(token);
			const result = await OnlineStoreApi.getMyShop(token);

			if (result) {
				dispatch({ type: Types.GET_MY_SHOP, data: result });
			}
		} catch (error) {

		}
	}
);

export const fetchProductList = (param) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });

			const result = await OnlineStoreApi.getProductList();

			if (result) {
				dispatch({ type: Types.GET_PRODUCT_LIST, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);

export const getDeliveryAddress = (userId) => (
	async (dispatch) => {
		try {
			const result = await OnlineStoreApi.getDeliveryAddress(userId);

			if (result) {
				dispatch({ type: Types.GET_DELIVERY_ADDRESS, data: result });
			}
		} catch (error) {

		}
	}
);

export const fetchFilterCategoryList = (param) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
			const result = await OnlineStoreApi.getProductFilterCategoryList();

			if (result) {
				dispatch({ type: Types.GET_FILTER_CATEGORY_LIST, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);

export const fetchMostSearch = (param) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
			const result = await OnlineStoreApi.getMostSearch();

			if (result) {
				dispatch({ type: Types.GET_MOST_SEARCH, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);

export const fetchSomethingNew = (param) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });

			const result = await OnlineStoreApi.getSomethingNew();

			if (result) {
				dispatch({ type: Types.GET_SOMETHING_NEW, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);

export const fetchAdsImages = (param) => (
	async (dispatch) => {
		try {
			const result = await OnlineStoreApi.getAdsImages();

			if (result) {
				dispatch({ type: Types.GET_ADS_IMAGES, data: result });
			}
		} catch (error) {

		}
	}
);

export const fetchCategoryList = (session) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
			globals.OnlineStore.setToken(session.token);
			const result = await OnlineStoreApi.getProductCategoryList();

			if (result) {
				dispatch({ type: Types.GET_CATEGORY_LIST, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);

export const fetchDisputeList = (param) => (
	async (dispatch) => {
		try {
			const result = await OnlineStoreApi.getDisputeList();

			if (result) {
				dispatch({ type: Types.GET_DISPUTE_LIST, data: result });
			}
		} catch (error) {

		}
	}
);


export const fetchReasonsToCancel = () => (
	async (dispatch) => {
		try {
			const result = await OnlineStoreApi.getReasonsToCancel();

			if (result) {
				dispatch({ type: Types.GET_REASONS_TO_CANCEL, data: result });
			}
		} catch (error) {

		}
	}
);

export const fetchPurchaseList = (session) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
			globals.OnlineStore.setToken(session.token);
			const result = await OnlineStoreApi.getPurchaseList();

			if (result) {
				dispatch({ type: Types.GET_PURCHASE_LIST, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);