import { combineReducers } from "redux";
import * as Types from "./types";
const initInput = {flag: "USD", callingCodes: "1", mobile: ""};

const categories = (state = [], action) => {
	switch (action.type) {
	case Types.GET_LOCAL_CATEGORIES:
		return action.data;
	default:
		return state;
	}
};

const checkPrefixes = (state = {}, action) => {
	switch (action.type) {
	case Types.GET_PREFIX_INFO:
		return action.data;
	case Types.GET_PREFIX_INFO_FAILED:
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const isCheckingPrefixes = (state = false, action) => {
	switch (action.type) {
	case Types.GET_PREFIX_INFO_LOAD:
		return true;
	case Types.GET_PREFIX_INFO_FAILED:
	case Types.GET_INTERNATIONAL_CATEGORIES:
	case Types.GET_PREFIX_INFO:
	case Types.GET_INTERNATIONAL_CATEGORIES_FAILED:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const checkPrefixesFailed = (state = [], action) => {
	switch (action.type) {
	case Types.GET_PREFIX_INFO_FAILED:
		return action.error;
	case Types.GET_PREFIX_INFO:
	case Types.GET_PREFIX_INFO_LOAD:
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const checkIntNumberFailed = (state = [], action) => {
	switch (action.type) {
	case Types.GET_INTERNATIONAL_CATEGORIES_FAILED:
		return action.error;
	case Types.GET_INTERNATIONAL_CATEGORIES:
	case Types.GET_PREFIX_INFO_LOAD:
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const InputMobileNumber = (state = "", action) => {
	switch (action.type) {
	case Types.INPUT_MOBILE_NUMBER:
		return action.data;
	case Types.RESET_LOADING:
		return "";
	default:
		return state;
	}
};

const InputEmailAddress = (state = initInput, action) => {
	switch (action.type) {
	case Types.INPUT_EMAIL_ADDRESS:
		return action.data;
	case Types.RESET_LOADING:
		return initInput;
	default:
		return state;
	}
};

const setScreenInventory = (state = "Input", action) => {
	switch (action.type) {
	case Types.SET_SCREEN_INVENTORY:
		return action.data;
	case Types.RESET_LOADING:
		return "Input";
	default:
		return state;
	}
};

const fetchPlancodeList = (state = [], action) => {
	switch (action.type) {
	case Types.GET_PLANCODES:
		return action.data;
	case Types.GET_PLANCODES_LOADING:
	case Types.GET_PLANCODES_FAILED:
		return [];
	default:
		return state;
	}
};

const isPlancodeLoad = (state = false, action) => {
	switch (action.type) {
	case Types.GET_PLANCODES_LOADING:
		return true;
	case Types.GET_PLANCODES_FAILED:
	case Types.GET_PLANCODES:
		return false;
	default:
		return state;
	}
};
const selectedPlancode = (state = {}, action) => {
	switch (action.type) {
	case Types.SELECTED_PLANCODE:
		return action.data;
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const selectedIntProduct = (state = {}, action) => {
	switch (action.type) {
	case Types.SELECTED_INT_PRODUCT:
		return action.data;
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const selectedCategory = (state = {}, action) => {
	switch (action.type) {
	case Types.SELECTED_CATEGORY:
		return action.data;
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};
const selectedSubCategory = (state = {}, action) => {
	switch (action.type) {
	case Types.SELECTED_SUB_PLANCODE:
		return action.data;
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const isLoadNow = (state = false, action) => {
	switch (action.type) {
	case Types.LOAD_NOW_LOADING:
		return true;
	case Types.LOAD_NOW:
	case Types.LOAD_NOW_FAILED:
	case Types.LOAD_NOW_INT_FAILED:
	case Types.LOAD_NOW_INT_SUCCESS:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const loadSuccess = (state = {}, action) => {
	switch (action.type) {
	case Types.LOAD_NOW:
		return action.data;
	case Types.LOAD_NOW_FAILED:
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const loadSuccessInt = (state = {}, action) => {
	switch (action.type) {
	case Types.LOAD_NOW_INT_SUCCESS:
		return action.data;
	case Types.LOAD_NOW_INT_FAILED:
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const loadFailed = (state = "", action) => {
	switch (action.type) {
	case Types.LOAD_NOW_FAILED:
	case Types.LOAD_NOW_INT_FAILED:
		return action.error;
	case Types.LOAD_NOW:
	case Types.RESET_LOADING:
	case Types.LOAD_NOW_LOADING:
	case Types.RESET_ERROR:
		return "";
	default:
		return state;
	}
};

const setIntScreen = (state = "Input", action) => {
	switch (action.type) {
	case Types.SET_INTERNATIONAL_SCREEN:
		return action.data;
	// case Types.RESET_LOADING:
	// 	return "Input";
	default:
		return state;
	}
};

const IntCategories = (state = [], action) => {
	switch (action.type) {
	case Types.GET_INTERNATIONAL_CATEGORIES:
		return action.data;
	default:
		return state;
	}
};

const GetCountryCode = (state = [], action) => {
	switch (action.type) {
	case Types.GET_ALL_COUNTRY_CODE:
		return action.data;
	default:
		return state;
	}
};

const IntSubCategories = (state = {}, action) => {
	switch (action.type) {
	case Types.GET_INTERNATIONAL_SUBCATEGORIES:
		return action.data;
	default:
		return state;
	}
};
const getIntRates = (state = {}, action) => {
	switch (action.type) {
	case Types.GET_INT_RATES:
		return action.data;
	default:
		return state;
	}
};

const initialMobile = {
	prefix: "63",
	code: "PHP",
	country: "Philippines",
	mobile: "",
};

const initialMobileInv = {
	prefix: "63",
	code: "PHP",
	country: "Philippines",
	mobile: "",
	email: "",
};


const setInputMerge = (state = initialMobile, action) => {
	switch (action.type) {
	case Types.SET_INPUT_MERGE:
		return action.data;
	case Types.RESET_LOADING:
		return initialMobile;
	default:
		return state;
	}
};

const isSearchingProduct = (state = false, action) => {
	switch (action.type) {
	case Types.GET_PRODUCTS_MERGE_LOAD:
		return true;
	case Types.GET_PRODUCTS_MERGE:
	case Types.GET_PRODUCTS_MERGE_FAILED:
	case Types.RESET_LOADING:
		return false;
	default:
		return state;
	}
};

const searchProduct = (state = [], action) => {
	switch (action.type) {
	case Types.GET_PRODUCTS_MERGE:
		return action.data;
	case Types.GET_PRODUCTS_MERGE_LOAD:
	case Types.GET_PRODUCTS_MERGE_FAILED:
	case Types.RESET_LOADING:
		return [];
	default:
		return state;
	}
};

const searchProductFailed = (state = "", action) => {
	switch (action.type) {
	case Types.GET_PRODUCTS_MERGE_FAILED:
		return action.error;
	case Types.GET_PRODUCTS_MERGE_LOAD:
	case Types.GET_PRODUCTS_MERGE:
	case Types.RESET_LOADING:
		return "";
	default:
		return state;
	}
};

const isGettingReports = (state = false, action) => {
	switch (action.type) {
	case Types.GET_REPORTS_LOAD:
		return true;
	case Types.GET_REPORTS:
	case Types.GET_REPORTS_FAILED:
	case Types.RESET_LOADING:
		return false;
	default:
		return state;
	}
};

const getReports = (state = [], action) => {
	switch (action.type) {
	case Types.GET_REPORTS:
		return action.data;
	case Types.GET_REPORTS_LOAD:
	case Types.GET_REPORTS_FAILED:
		return [];
	default:
		return state;
	}
};

const getReportFailed = (state = "", action) => {
	switch (action.type) {
	case Types.GET_REPORTS_FAILED:
		return action.error;
	case Types.GET_REPORTS_LOAD:
	case Types.GET_REPORTS:
	case Types.RESET_LOADING:
		return "";
	default:
		return state;
	}
};

const reportCount = (state = 0, action) => {
	switch (action.type) {
	case Types.GET_REPORTS_COUNT:
		return action.data;
	case Types.GET_REPORTS_LOAD:
	case Types.RESET_LOADING:
		return 0;
	default:
		return state;
	}
};

const selectNetwork = (state = "LOAD", action) => {
	switch (action.type) {
	case Types.SELECT_NETWORK:
		return action.data;
	case Types.RESET_LOADING:
		return "LOAD";
	default:
		return state;
	}
};


const isSearchingInventory = (state = false, action) => {
	switch (action.type) {
	case Types.GET_PRODUCTS_INVENTORY_LOAD:
		return true;
	case Types.GET_PRODUCTS_INVENTORY:
	case Types.GET_PRODUCTS_INVENTORY_FAILED:
	case Types.RESET_LOADING:
		return false;
	default:
		return state;
	}
};

const searchInventory = (state = [], action) => {
	switch (action.type) {
	case Types.GET_PRODUCTS_INVENTORY:
		return action.data;
	case Types.GET_PRODUCTS_INVENTORY_LOAD:
	case Types.GET_PRODUCTS_INVENTORY_FAILED:
	case Types.RESET_LOADING:
		return [];
	default:
		return state;
	}
};

const searchInventoryFailed = (state = "", action) => {
	switch (action.type) {
	case Types.GET_PRODUCTS_INVENTORY_FAILED:
		return action.error;
	case Types.GET_PRODUCTS_INVENTORY_LOAD:
	case Types.GET_PRODUCTS_INVENTORY:
	case Types.RESET_LOADING:
		return "";
	default:
		return state;
	}
};

const setInputInventory = (state = initialMobileInv, action) => {
	switch (action.type) {
	case Types.SET_INPUT_INVENTORY:
		return action.data;
	case Types.RESET_LOADING:
		return initialMobileInv;
	default:
		return state;
	}
};

const selectedInventory = (state = {}, action) => {
	switch (action.type) {
	case Types.SELECTED_INVENTORY:
		return action.data;
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const isLoadNowInventory = (state = false, action) => {
	switch (action.type) {
	case Types.LOAD_NOW_INVENTORY_LOADING:
		return true;
	case Types.LOAD_NOW_INVENTORY:
	case Types.LOAD_NOW_INVENTORY_FAILED:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const loadInventorySuccess = (state = {}, action) => {
	switch (action.type) {
	case Types.LOAD_NOW_INVENTORY:
		return action.data;
	case Types.LOAD_NOW_INVENTORY_FAILED:
	case Types.RESET_LOADING:
		return {};
	default:
		return state;
	}
};

const loadInventoryFailed = (state = "", action) => {
	switch (action.type) {
	case Types.LOAD_NOW_INVENTORY_FAILED:
		return action.error;
	case Types.LOAD_NOW_INVENTORY:
	case Types.RESET_LOADING:
	case Types.LOAD_NOW_INVENTORY_LOADING:
	case Types.RESET_ERROR:
		return "";
	default:
		return state;
	}
	
};

const isLoadComputation = (state = false, action) => {
	switch (action.type) {
	case Types.IS_GET_CONVERTED_AMOUNT:
		return true;
	case Types.GET_CONVERTED_AMOUNT:
	case Types.GET_CONVERTED_AMOUNT_FAILED:
		return false;
	default:
		return state;
	}
};

const loadComputation = (state = {}, action) => {
	switch (action.type) {
	case Types.GET_CONVERTED_AMOUNT:
		return action.data;
	case Types.GET_CONVERTED_AMOUNT_FAILED:
		return {};
	default:
		return state;
	}
};

const loadComputationFailed = (state = "", action) => {
	switch (action.type) {
	case Types.GET_CONVERTED_AMOUNT_FAILED:
		return action.error;
	case Types.GET_CONVERTED_AMOUNT:
		return "";
	default:
		return state;
	}
	
};

const selectedWallet = (state = "", action) => {
	switch (action.type) {
	case Types.SET_SELECTED_WALLET:
		return action.data;
	default:
		return state;
	}
	
};

const searchInputInventory = (state = "", action) => {
	switch (action.type) {
	case Types.SET_SEARCH_INPUT_INVENTORY:
		return action.data;
	case Types.RESET_ERROR:
		return "";
	default:
		return state;
	}
};

const isGetSearchInventory = (state = false, action) => {
	switch (action.type) {
	case Types.IS_GET_SEARCH_INVENTORY:
		return true;
	case Types.GET_SEARCH_INVENTORY:
	case Types.GET_SEARCH_INVENTORY_FAILED:
		return false;
	default:
		return state;
	}
};

const getSearchInventory = (state = {}, action) => {
	switch (action.type) {
	case Types.GET_SEARCH_INVENTORY:
		return action.data;
	case Types.GET_SEARCH_INVENTORY_FAILED:
		return {};
	default:
		return state;
	}
};

const getSearchInventoryFailed = (state = "", action) => {
	switch (action.type) {
	case Types.GET_SEARCH_INVENTORY_FAILED:
		return action.error;
	case Types.GET_SEARCH_INVENTORY:
		return "";
	default:
		return state;
	}
	
};

const setPlancodeTabScreen = (state = "", action) => {
	switch (action.type) {
	case Types.SET_PLANCODETAB_SCREEN:
		return action.data;
	default:
		return state;
	}
	
};

const isGetRecentInventory = (state = false, action) => {
	switch (action.type) {
	case Types.IS_GET_RECENT_INVENTORY:
		return true;
	case Types.GET_RECENT_INVENTORY:
	case Types.GET_RECENT_INVENTORY_FAILED:
		return false;
	default:
		return state;
	}
};

const getRecentInventory = (state = {}, action) => {
	switch (action.type) {
	case Types.GET_RECENT_INVENTORY:
		return action.data;
	case Types.GET_RECENT_INVENTORY_FAILED:
		return {};
	default:
		return state;
	}
};

const getRecentInventoryFailed = (state = "", action) => {
	switch (action.type) {
	case Types.GET_RECENT_INVENTORY_FAILED:
		return action.error;
	case Types.GET_RECENT_INVENTORY:
		return "";
	default:
		return state;
	}
	
};

export default combineReducers({
	categories,
	InputMobileNumber,
	setScreenInventory,
	isCheckingPrefixes,
	checkPrefixes,
	checkPrefixesFailed,
	fetchPlancodeList,
	isPlancodeLoad,
	selectedPlancode,
	isLoadNow,
	loadSuccess,
	loadSuccessInt,
	loadFailed,
	InputEmailAddress,
	setIntScreen,
	IntCategories,
	IntSubCategories,
	selectedCategory,
	selectedSubCategory,
	selectedIntProduct,
	GetCountryCode,
	checkIntNumberFailed,
	getIntRates,

	setInputMerge,
	isSearchingProduct,
	searchProduct,
	searchProductFailed,

	isGettingReports,
	getReports,
	getReportFailed,
	reportCount,

	selectNetwork,

	isSearchingInventory,
	searchInventory,
	searchInventoryFailed,

	setInputInventory,
	selectedInventory,

	isLoadNowInventory,
	loadInventorySuccess,
	loadInventoryFailed,

	isLoadComputation,
	loadComputation,
	loadComputationFailed,

	selectedWallet,

	searchInputInventory,
	isGetSearchInventory,
	getSearchInventory,
	getSearchInventoryFailed,

	setPlancodeTabScreen,

	isGetRecentInventory,
	getRecentInventory,
	getRecentInventoryFailed,
});
