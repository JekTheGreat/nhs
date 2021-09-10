/* eslint-disable */

import * as Types from "./types";
import LoadingApi from "./api/index";
import _ from "lodash";

export const resetLoading = () => ({
	type: Types.RESET_LOADING,
});

export const resetError = () => ({
	type: Types.RESET_ERROR,
});

export const selectNetwork = (data) => ({
	type: Types.SELECT_NETWORK,
	data,
});

export const setInputMerge = (data) => ({
	type: Types.SET_INPUT_MERGE,
	data,
});

export const setInputInventory = (data) => ({
	type: Types.SET_INPUT_INVENTORY,
	data,
});

export const InputMobileNumber = (data) => ({
	type: Types.INPUT_MOBILE_NUMBER,
	data,
});

export const InputEmailAddress = (data) => ({
	type: Types.INPUT_EMAIL_ADDRESS,
	data,
});

export const setScreenInventory = (data) => ({
	type: Types.SET_SCREEN_INVENTORY,
	data,
});

export const selectedInventory = (data) => ({
	type: Types.SELECTED_INVENTORY,
	data,
});

export const setIntScreen = (data) => ({
	type: Types.SET_INTERNATIONAL_SCREEN,
	data,
});

export const selectedCategory = (data) => ({
	type: Types.SELECTED_CATEGORY,
	data,
});
export const selectedSubCategory = (data) => ({
	type: Types.SELECTED_SUB_PLANCODE,
	data,
});
export const selectedPlancode = (data) => ({
	type: Types.SELECTED_PLANCODE,
	data,
});

export const selectedIntProduct = (data) => ({
	type: Types.SELECTED_INT_PRODUCT,
	data,
});

export const selectIntSubCategories = (data) => ({
	type: Types.GET_INTERNATIONAL_SUBCATEGORIES,
	data,
});

export const selectedWallet = (data) => ({
	type: Types.SET_SELECTED_WALLET,
	data,
});

export const setSearchInventory = (data) => ({
	type: Types.SET_SEARCH_INPUT_INVENTORY,
	data,
});

export const setPlancodeTab = (data) => ({
	type: Types.SET_PLANCODETAB_SCREEN,
	data,
});

export const fetchCategories = () => (
	async(dispatch) => {
		try {
			const result = await LoadingApi.categories();

			if (result){
				dispatch({ type: Types.GET_LOCAL_CATEGORIES, data: result});
			}
		} catch (error) {
			console.log(error);
		}
	}
);

export const checkPrefixes = (token) => (
	async(dispatch) => {
		try {
			const result = await LoadingApi.checkPrefix(token);

			if (result){
				dispatch({ type: Types.GET_PREFIX_INFO, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.GET_PREFIX_INFO_FAILED, error });
		}
	}
);

export const convertLoad = (param, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.IS_GET_CONVERTED_AMOUNT});
			const result = await LoadingApi.convert(param, token);

			if (result){
				dispatch({ type: Types.GET_CONVERTED_AMOUNT, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.GET_CONVERTED_AMOUNT_FAILED, error });
		}
	}
);
export const loadNowInventory = (param, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.LOAD_NOW_INVENTORY_LOADING});
			
			const result = await LoadingApi.load(param, token);

			console.log("result", result);

			if (result){
				dispatch({ type: Types.LOAD_NOW_INVENTORY, data: result });
			}
		} catch (error) {
			console.log("error", JSON.stringify(error));
			dispatch({ type: Types.LOAD_NOW_INVENTORY_FAILED, error: error.message || "Something went wrong!" });
		}
	}
);

export const loadNow = (param, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.LOAD_NOW_LOADING});
			
			const result = await LoadingApi.load(param, token);

			if (result){
				dispatch({ type: Types.LOAD_NOW, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.LOAD_NOW_FAILED, error: error.message || "Something went wrong!" });
		}
	}
);

export const getIntRates = () => (
	async(dispatch) => {
		try {

			const result = await LoadingApi.getIntRates();

			if (result){
				dispatch({ type: Types.GET_INT_RATES, data: result });
			}
		} catch (error) {
			console.log("error", error);
		}
	}
);

export const searchInventory = (params) => (
	async(dispatch) => {
		try {
			dispatch({type: Types.GET_PRODUCTS_INVENTORY_LOAD});
			const result = await LoadingApi.callGet(`/cards/products?category=${params.categoryId}&skip=0&limit=${params.limit}`);
			
			if (result){
				// const baseUserlvl = _.filter(result.item, {"userLevel": params.userLevel}); 
				dispatch(setScreenInventory("PlancodeTab"));
				dispatch({type: Types.GET_PRODUCTS_INVENTORY, data: result.item});
			}
		} catch (error) {
			dispatch({type: Types.GET_PRODUCTS_INVENTORY_FAILED, error: error.message || "Something went wrong"});
		}
	}
);

export const searchProduct = (params) => (
	async(dispatch) => {
		try {
			dispatch({type: Types.GET_PRODUCTS_MERGE_LOAD});

			if (params.localprefix){
				const prefix = await LoadingApi.callGet(`/airtime/prefix/${params.localprefix}`);
				const mobile = `mobileNumber=${params.prefix}${params.mobile}`;
				const userLevel = `userLevel=${params.userLevel}`;
				const mobileNetworkId = `mobileNetworkId=${prefix.mobileNetworkId.id}`;
				const categoryId = params.categoryId ? `categoryId=${params.categoryId}` : "categoryId=LOAD";
				const result = await LoadingApi.callGet(`/airtime/products?${mobile}&${userLevel}&${mobileNetworkId}&${categoryId}&type=local&system=unified&isInternational=0`);
				console.log("prefix", prefix, result);
				console.log("result", result.data);
				
				const unique = [...new Map(result.data.map((item) =>
					[item.amount, item])).values()];
				if (result){
					if (categoryId == "categoryId=LOAD"){
						params.mobileNetworkId = prefix.mobileNetworkId.id;
						dispatch(setIntScreen("PlancodeTab"));
						dispatch(setInputMerge(params));
						dispatch({type: Types.GET_PRODUCTS_MERGE, data: unique});
					} else {
						params.mobileNetworkId = prefix.mobileNetworkId.id;
						dispatch(setIntScreen("PlancodeTab"));
						dispatch(setInputMerge(params));
						dispatch({type: Types.GET_PRODUCTS_MERGE, data: result.data});
					}
				}
			} else {
				const mobile = `mobileNumber=${params.prefix}${params.mobile}`;
				const userLevel = `userLevel=${params.userLevel}`;
				const result = await LoadingApi.callGet(`/airtime/products?${mobile}&${userLevel}&type=international&system=unified`);
				const param = {};
				if (result){
					dispatch({ type: Types.GET_INTERNATIONAL_CATEGORIES, data: result });
					if(result.data){
						dispatch({type: Types.GET_INTERNATIONAL_SUBCATEGORIES, data:result.data[0]});
						
					}
					dispatch({type: Types.GET_PRODUCTS_MERGE, data: result.data});
					if(!_.isEmpty(result.data[0].categories.bundle)) {
						param.name = "Bundle";
						param.product = result.data[0].categories.bundle;
						dispatch({type: Types.SELECTED_INT_PRODUCT, data: param});
					} else if (!_.isEmpty(result.data[0].categories.data)) {
						param.name = "Data";
						param.product = result.data[0].categories.data;
						dispatch({type: Types.SELECTED_INT_PRODUCT, data: param});
					} else if (!_.isEmpty(result.data[0].categories.topup)) {
						param.name = "Topup";
						param.product = result.data[0].categories.topup;
						dispatch({type: Types.SELECTED_INT_PRODUCT, data: param});
					}
					dispatch(setIntScreen("SubCategory"));

				}
			}
		} catch (error) {
			dispatch({type: Types.GET_PRODUCTS_MERGE_FAILED, error: error.message || "Something went wrong"});
		}
	}
);

export const getCurrentReports = (params, param, token) => (
	async(dispatch) => {
		try {
			dispatch({type: Types.GET_REPORTS_LOAD});
			const status = params.status ? `&status=${params.status}` : "";
			const trackingNumber = params.trackingNumber ? `trackingNumber=${params.trackingNumber}` : "";
			const limit = params.limit ? `&limit=${params.limit}` : "";
			const skip = params.skip ? `skip=${params.skip}` : "skip=0";
			let result = await LoadingApi.callPost(`/airtime/transactions/me?${skip}${limit}`, param, token);
			// const result = await LoadingApi.callGet(`/airtime/transactions/?${skip}${limit}${status}${trackingNumber}`);
			if (_.isEmpty(params.trackingNumber)){
				result = await LoadingApi.callPost(`/airtime/transactions/me?${skip}${limit}`, param, token);
			} else {
				result = await LoadingApi.callPost(`/airtime/transactions/me?transactionNumber=${params.trackingNumber}`, param, token);
			}
			if (result){
				dispatch({ type: Types.GET_REPORTS, data: result.data });
			}
		} catch (error) {
			dispatch({type: Types.GET_REPORTS_FAILED, error: error.message || "Something went wrong!"});
		}
	}
);

export const searchCurrentReports = (params, param, token) => (
	async(dispatch) => {
		try {
			dispatch({type: Types.GET_REPORTS_LOAD});
			const limit = params.limit ? `&limit=${params.limit}` : "";
			const skip = params.skip ? `skip=${params.skip}` : "skip=0";
			const	result = await LoadingApi.callPost(`/airtime/transactions/me?transactionNumber=${params.trackingNumber}`, param, token);
			
			if (result){
				dispatch({ type: Types.GET_REPORTS, data: result.data });
			}
		} catch (error) {
			dispatch({type: Types.GET_REPORTS_FAILED, error: error.message || "Something went wrong!"});
		}
	}
);

export const getSearchInventory = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({type: Types.IS_GET_SEARCH_INVENTORY});

			const result = await LoadingApi.searchInventory(params, token);
			
			if (result){
				dispatch({type: Types.GET_SEARCH_INVENTORY, data: result});
			}
		} catch (error) {
			dispatch({type: Types.GET_SEARCH_INVENTORY_FAILED, error: error.message || "Something went wrong"});
		}
	}
);

export const getRecentInventory = (params) => (
	async(dispatch) => {
		try {
			dispatch({type: Types.IS_GET_RECENT_INVENTORY});

			const result = await LoadingApi.callGet(`/product?denomination=${params.denomination}`);
			
			if (result){
				dispatch({type: Types.GET_RECENT_INVENTORY, data: result});
			}
		} catch (error) {
			dispatch({type: Types.GET_RECENT_INVENTORY_FAILED, error: error.message || "Something went wrong"});
		}
	}
);
