/*eslint-disable*/
import { combineReducers } from "redux";

import * as Types from "./types";

const inputDetails = {
	showMore: false,
	isFilterBySearch: false,
	isFromPreviewProducts: false,
	isPlaceOrderShowing: false,
	cartCB: {},
	paymentOps: "e2e",
	brandCB: {},
	placeOrder: [],
	selectcartAll: false,
	cartQuantity: 1,
	filterBy: {},
	route: "Home",
	options: {},
	selectedProductToReturn: {},
	reasonsToReturn: {},
	quantityToReturn: {},
}


const setOnlineStoreScreen = (state = {}, action) => {
	switch (action.type) {
		case Types.SET_ONLINESTORESCREEN:
			return action.data;
		default:
			return state;
	}
};
const setToReturnScreen = (state = "chooseItem", action) => {
	switch (action.type) {
		case Types.SET_TO_RETURN_SCREEN:
			return action.data;
		default:
			return state;
	}
};

const setProfileScreen = (state = {}, action) => {
	switch (action.type) {
		case Types.SET_PROFILE_SCREEN:
			return action.data;
		default:
			return state;
	}
};

const setInputDetails = (state = inputDetails, action) => {
	switch (action.type) {
		case Types.SET_INPUTDETAILS:
			return action.data;
		case Types.RESET_DATA:
			return inputDetails;
		default:
			return state;
	}
};

const setUserSide = (state = false, action) => {
	switch (action.type) {
		case Types.SET_USER_SIDE:
			return action.data;
		default:
			return state;
	}
};

const setSelectedItems = (state = [], action) => {
	switch (action.type) {
		case Types.SET_SELECTED_ITEMS:
			return action.data;
		default:
			return state;
	}
};

const getCartList = (state = [], action) => {
	switch (action.type) {
		case Types.GET_CART_LIST:
			return action.data;
		default:
			return state;
	}
};

const deleteCartItem = (state = [], action) => {
	switch (action.type) {
		case Types.DELETE_CART_ITEM:
			return action.data;
		default:
			return state;
	}
};

const patchTransaction = (state = [], action) => {
	switch (action.type) {
		case Types.PATCH_TRANSACTION:
			return action.data;
		default:
			return state;
	}
};

const changeCartItem = (state = [], action) => {
	switch (action.type) {
		case Types.CHANGE_CART_ITEM:
			return action.data;
		default:
			return state;
	}
};

const postProductList = (state = [], action) => {
	switch (action.type) {
		case Types.POST_PRODUCT_LIST:
			return action.data;
		default:
			return state;
	}
};

const buyNowResponse = (state = [], action) => {
	switch (action.type) {
		case Types.BUY_NOW:
			return action.data;
		default:
			return state;
	}
};


const getMyShop = (state = [], action) => {
	switch (action.type) {
		case Types.GET_MY_SHOP:
			return action.data;
		default:
			return state;
	}
};

const searchedProducts = (state = [], action) => {
	switch (action.type) {
		case Types.SEARCH_PRODUCT:
			return action.data;
		default:
			return state;
	}
}

const getProductList = (state = [], action) => {
	switch (action.type) {
		case Types.GET_PRODUCT_LIST:
			return action.data;
		default:
			return state;
	}
};

const getDeliveryAddress = (state = [], action) => {
	switch (action.type) {
		case Types.GET_DELIVERY_ADDRESS:
			return action.data;
		default:
			return state;
	}
};



const getFilterCategoryList = (state = [], action) => {
	switch (action.type) {
		case Types.GET_FILTER_CATEGORY_LIST:
			return action.data;
		default:
			return state;
	}
};

const getMostSearch = (state = [], action) => {
	switch (action.type) {
		case Types.GET_MOST_SEARCH:
			return action.data;
		default:
			return state;
	}
};

const getSomethingNew = (state = [], action) => {
	switch (action.type) {
		case Types.GET_SOMETHING_NEW:
			return action.data;
		default:
			return state;
	}
};

const getAdsImages = (state = [], action) => {
	switch (action.type) {
		case Types.GET_ADS_IMAGES:
			return action.data;
		default:
			return state;
	}
};

const getCategoryList = (state = [], action) => {
	switch (action.type) {
		case Types.GET_CATEGORY_LIST:
			return action.data;
		default:
			return state;
	}
};

const getDisputeList = (state = [], action) => {
	switch (action.type) {
		case Types.GET_DISPUTE_LIST:
			return action.data;
		default:
			return state;
	}
};

const getReasonsToCancel = (state = [], action) => {
	switch (action.type) {
		case Types.GET_REASONS_TO_CANCEL:
			return action.data;
		default:
			return state;
	}
};

const getPurchaseList = (state = [], action) => {
	switch (action.type) {
		case Types.GET_PURCHASE_LIST:
			return action.data;
		default:
			return state;
	}
};

const transactionInProgress = (state = false, action) => {
	switch (action.type) {
		case Types.TRANSACTION_IN_PROGRESS:
			return true;
		case Types.BUY_NOW:
		case Types.GET_PURCHASE_LIST:
		case Types.CHANGE_CART_ITEM:
		case Types.SEARCH_PRODUCT:
		case Types.GET_CATEGORY_LIST:
		case Types.GET_SOMETHING_NEW:
		case Types.GET_MOST_SEARCH:
		case Types.GET_FILTER_CATEGORY_LIST:
		case Types.GET_PRODUCT_LIST:
		case Types.POST_PRODUCT_LIST:
		case Types.TRANSACTION_FAILED:
			return false;
		default:
			return state;
	}
};

const transactionFailed = (state = {}, action) => {
	switch (action.type) {
		case Types.TRANSACTION_FAILED:
			return action.error;
		case Types.TRANSACTION_IN_PROGRESS:
			return {};
		default:
			return state;
	}
};

export default combineReducers({
	setOnlineStoreScreen,
	setProfileScreen,
	setToReturnScreen,
	setInputDetails,
	setUserSide,
	setSelectedItems,
	searchedProducts,
	getProductList,
	getDeliveryAddress,
	getDisputeList,
	getPurchaseList,
	getMyShop,
	getReasonsToCancel,
	getCategoryList,
	getCartList,
	deleteCartItem,
	changeCartItem,
	getFilterCategoryList,
	getMostSearch,
	getAdsImages,
	getSomethingNew,
	postProductList,
	transactionInProgress,
	transactionFailed,
	buyNowResponse,
	patchTransaction,
});
