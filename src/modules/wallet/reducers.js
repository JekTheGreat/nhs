/* eslint-disable max-len */
import { combineReducers } from "redux";
import _ from "lodash";

import * as Types from "./types";

const switchAccount = (state = false, action ) => {
	switch (action.type){
	case Types.CHANGING_ACCOUNT:
		return true;
	case Types.LOGOUT:
	case Types.RESET_ADDED_LIST:
		return false;
	default:
		return state;
	}
};
const CurrencyList = (state = [], action ) => {
	switch (action.type) {
	case Types.GET_CURRENCIES_SUCCESS:
		return action.data;
	default:
		return state;
	}
};
const isCurrenciesError =  (state = false, action) => {
	switch (action.type){
	case Types.GET_CURRENCIES_ERROR:
		return true;
	default:
		return state;
	}
};
const createWalletButton = ( state = false, action) => {
	switch (action.type) {
	case Types.CREATE_WALLET_BUTTON:
		return true;
	case Types.CLOSED_WALLET_BOX:
		return false;
	default:
		return state;
	}
};
const isAdded = ( state = false, action ) => {
	switch (action.type) {
	case Types.CREATE_WALLET_CURRENCY_SUCCESS:
		return true;
	case Types.CLOSED_WALLET_BOX:
	case Types.CREATE_WALLET_CURRENCY_FAIL:
		return false;
	default:
		return state;
	}
};

const isWalletLoad = ( state = false, action ) => {
	switch (action.type) {
	case Types.WALLET_LOADING:
		return true;
	case Types.WALLET_ADDED:
	case Types.WALLET_ADDED_FAILED:
		return false;
	default:
		return state;
	}
};

const addedWallet = ( state = {}, action ) => {
	switch (action.type) {
	case Types.CREATE_WALLET_CURRENCY_SUCCESS:
		const newWall = [...state];
	
		newWall.push(action.data);
	
		return newWall;
	case Types.WALLET_ADDED:
		return action.data;
		// case Types.LOAD_NOW:
		// case Types.LOAD_NOW_INT_SUCCESS:
		// 	const loadNewState = [...state];

		// 	_.map(loadNewState, (data) => {
		// 		if (data.currency.code === action.data.currency){
		// 			data.credits -= _.has(action.data, "debit") ? action.data.debit : action.data.amount;
		// 		}

		// 		return data;
		// 	});

	// 	return loadNewState;
	case Types.SEND_ECASH_SUCCESS:
		const newState = [...state];
	
		_.map(newState, (data) => {
			if (data.id === action.data.senderId){
				data.credits -= (action.data.amount + action.data.fee);
			}
	
			return data;
		});
	
		return newState;
	case Types.CONVERT_CURRENCY_SUCCESS:
		const newWallet = [...state];
	
		_.map(newWallet, (data) => {
			if (data.id === action.data.senderId){
				data.credits -= (action.data.amount + action.data.fee);
			}
	
			if (data.id === action.data.receiverWalletId){
				data.credits += (action.data.convertedAmount + action.data.fee);
			}
	
			return data;
		});
	
		return newWallet;
	case Types.LOGOUT:
	case Types.RESET_WALLET:
	case Types.WALLET_ADDED_FAILED:
	case Types.WALLET_LOADING:
		return {};
	default:
		return state;
	}
};
const listAdded = ( state = false, action ) => {
	switch (action.type) {
	case Types.CREATE_WALLET_CURRENCY_SUCCESS:
		return true;
	case Types.RESET_ADDED_LIST:
	case Types.CREATE_WALLET_CURRENCY_FAIL:
		return false;
	default:
		return state;
	}
};
const isWalletCreated = ( state = false, action ) => {
	switch (action.type) {
	case Types.CREATE_WALLET_VERIFIED:
		return true;
	case Types.CREATE_WALLET_CURRENCY_SUCCESS:
	case Types.LOGOUT:
	case Types.CLOSED_WALLET_BOX:
	case Types.CREATE_WALLET_CURRENCY_FAIL:
		return false;
	default:
		return state;
	}
};
const selectValue = (state = "", action) => {
	switch (action.type) {
	case Types.SELECTED_WALLET_VALUE:
		return action.data;
	case Types.CLOSED_WALLET_BOX:
		return "";
	default:
		return state;
	}
};
const walletSelected = (state = "",  action)  => {
	switch (action.type) {
	case Types.WALLET_SELECTED:
		return action.data;
	case Types.SEND_ECASH_SUCCESS:
		const newState = {...state};

		newState.credits -= (action.data.amount + action.data.fee);

		return newState;
	case Types.CONVERT_CURRENCY_SUCCESS:
		const wallet = {...state};

		if (wallet.currency.code === action.data.fromCurrency){
			wallet.credits -= action.data.amount;
		}

		if (wallet.code === action.data.toCurrency){
			wallet.credits += action.data.convertedValue;
		}

		return wallet;
		// case Types.LOAD_NOW:
		// case Types.LOAD_NOW_INT_SUCCESS:
		// 	const loadNewState = {...state};

		// 	if (loadNewState.currency.code === action.data.currency){
		// 		loadNewState.credits -= _.has(action.data, "debit") ? action.data.debit : action.data.amount;
		// 	}

	// 	return loadNewState;
	case Types.RESET_WALLET:
	case Types.LOGOUT:
	case Types.LOGIN_SUCCESS:
		return "";
	default:
		return state;
	}
};
const CreateWalletCurrency = (state = "", action) => {
	switch (action.type) {
	case Types.CREATE_WALLET_CURRENCY_SUCCESS:
		return action.data;
	case Types.CREATE_WALLET_CURRENCY_FAIL:
		return "";
	default:
		return state;
	}
};
const getBalanceSelected = ( state = "", action) => {
	switch (action.type) {
	case Types.BALANCE_SELECTED:
		return action.data;
	default:
		return state;
	}
};

const ewalletScreen = (state = "", action) => {
	switch (action.type) {
	case Types.SET_EWALLET_SCREEN:
	case Types.CLOSED_WALLET_BOX:
		return action.data;
	case Types.LOGOUT:
		return "";
	default:
		return state;
	}
};

const isWalletExisting  = ( state = false, action ) => {
	switch (action.type) {
	case Types.CREATE_WALLET_CURRENCY_FAIL:
		return true;
	case Types.SELECTED_WALLET_VALUE:
	case Types.RESET_STATE_LIST:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};
// convert currency
const selectConvertValueFrom = ( state = "", action) => {
	switch (action.type) {
	case Types.SELECT_CONVERT_VALUE_FROM:
		return action.data;
	case Types.CLOSED_WALLET_BOX:
	case Types.RESET_CONVERT_DATA:
		return "";
	default:
		return state;
	}
};
const selectConvertToRecieve = ( state = "", action) => {
	switch (action.type) {
	case Types.SELECT_CONVERT_TO_RECIEVED:
		return action.data;
	case Types.CLOSED_WALLET_BOX:
	case Types.RESET_CONVERT_DATA:
		return "";
	default:
		return state;
	}
};
const convertAmountInput = ( state = 0, action) => {
	switch (action.type) {
	case Types.CONVERT_AMOUNT_INPUT:
		return action.data;
	case Types.CLOSED_WALLET_BOX:
	case Types.RESET_CONVERT_DATA:
	case Types.RESET_SEND_ECASH:
		return 0;
	default:
		return state;
	}
};
const convertedValuetoRecieved = ( state = 0, action) => {
	switch (action.type) {
	case Types.CONVERTED_VALUE_TO_RECIEVED_SUCCESS:
		return action.data;
	case Types.CLOSED_WALLET_BOX:
	case Types.RESET_CONVERT_DATA:
	case Types.CONVERTED_VALUE_TO_RECIEVED_FAIL:
	case Types.RESET_AMOUNT_INPUT:
	case Types.RESET_SEND_ECASH:
		return 0;
	default:
		return state;
	}
};
const serviceFee = ( state = 0, action) => {
	switch (action.type) {
	case Types.CONVERT_SERVICE_FEE:
		return action.data;
	case Types.CLOSED_WALLET_BOX:
	case Types.RESET_CONVERT_DATA:
	case Types.CONVERTED_VALUE_TO_RECIEVED_FAIL:
	case Types.RESET_AMOUNT_INPUT:
		return 0;
	default:
		return state;
	}
};
const converting = ( state = false, action ) => {
	switch (action.type) {
	case Types.CONVERT_CURRENCY_VERIFY:
		return true;
	case Types.CONVERT_CURRENCY_FAIL:
	case Types.RESET_CONVERT_DATA:
		return false;
	default:
		return state;
	}
};
const convertSuccess = ( state = false, action) => {
	switch (action.type) {
	case Types.CONVERT_CURRENCY_SUCCESS:
		return true;
	case Types.CONVERT_CURRENCY_VERIFY:
	case Types.CONVERT_CURRENCY_FAIL:
	case Types.RESET_CONVERT_DATA:
		return false;
	default:
		return state;
	}
};
const currencyRate = ( state = "", action ) => {
	switch (action.type) {
	case Types.CURRENCY_RATE:
		return action.data;
	case Types.RESET_CONVERT_DATA:
		return "";
	default:
		return state;
	}
};
// send ecash
const selectedTarget = ( state = "", action) => {
	switch (action.type) {
	case Types.SELECTED_TARGET:
		return action.data;
	case Types.RESET_SEND_ECASH:
		return "";
	default:
		return state;
	}
};
const inputValue  = ( state = 0, action )  => {
	switch (action.type) {
	case Types.INPUT_VALUE:
		return action.data;
	case Types.RESET_SEND_ECASH:
	case Types.TARGET_ACCOUNT_FAILED:
		return 0;
	default:
		return state;
	}
};

const targetAccountUser = ( state = {}, action ) => {
	switch ( action.type ) {
	case Types.TARGET_ACCOUNT_USER:
		return action.data;
	case Types.RESET_TARGET_ACCOUNT_USER:
	case Types.RESET_SEND_ECASH:
		return {};
	default:
		return state;
	}
};

const targetAccountWallet = (state = [], action) => {
	switch (action.type){
	case Types.TARGET_ACCOUNT_WALLET:
		return action.data;
	case Types.TARGET_ACCOUNT_FAILED:
	case Types.RESET_TARGET_ACCOUNT:
	case Types.RESET_SEND_ECASH:
		return [];
	default:
		return state;
	}
};

const targetWallet = (state = {}, action) => {
	switch (action.type){
	case Types.SET_TARGET_WALLET:
		return action.data;
	case Types.RESET_SEND_ECASH:
		return {};
	default:
		return state;
	}
};

const getTargetAccountWalletFailed = (state = false, action) => {
	switch (action.type){
	case Types.TARGET_ACCOUNT_FAILED:
		return true;
	case Types.TARGET_ACCOUNT_WALLET:
	case Types.RESET_TARGET_ACCOUNT:
	case Types.RESET_SEND_ECASH:
		return false;
	default:
		return state;
	}
};

const isGetWalletLoading = (state = false, action) => {
	switch (action.type){
	case Types.TARGET_ACCOUNT_LAODING:
		return true;
	case Types.TARGET_ACCOUNT_WALLET:
	case Types.RESET_TARGET_ACCOUNT:
	case Types.RESET_SEND_ECASH:
	case Types.TARGET_ACCOUNT_USER:
	case Types.TARGET_ACCOUNT_FAILED:
		return false;
	default:
		return state;
	}
};

const sendEcashSuccess = (state = false, action) => {
	switch (action.type){
	case Types.SEND_ECASH_SUCCESS:
		return true;
	case Types.SEND_ECASH_RESET:
	case Types.RESET_SEND_ECASH:
		return false;
	default:
		return state;
	}
};

const sendEcashResult = (state = {}, action) => {
	switch (action.type){
	case Types.SEND_ECASH_SUCCESS:
		return action.data;
	case Types.SEND_ECASH_FAILED:
	case Types.SEND_ECASH_RESET:
	case Types.RESET_SEND_ECASH:
		return {};
	default:
		return state;
	}
};

const convertedValue = (state = 0, action) => {
	switch (action.type){
	case Types.CONVERT_VALUE:
		return action.data;
	case Types.RESET_SEND_ECASH:
		return 0;
	default:
		return state;
	}
};

const sendingEcash = (state = false, action) => {
	switch (action.type){
	case Types.SENDING_ECASH:
		return true;
	case Types.SEND_ECASH_SUCCESS:
	case Types.SEND_ECASH_FAILED:
	case Types.SEND_ECASH_RESET:
	case Types.RESET_SEND_ECASH:
		return false;
	default:
		return state;
	}
};

// request
const requestScreen = ( state = "chooseMethod", action ) => {
	switch ( action.type ) {
	case Types.SET_REQUEST_SCREEN:
		return action.data;
	case Types.REQUEST_RESET:
	case Types.LOGOUT:
	case Types.SET_EWALLET_SCREEN:
		return "chooseMethod";
	default:
		return state;
	}
};

const listRequestHeader = {
	amount: false,
	payment: false,
};

const requestScreenHeader = ( state = listRequestHeader, action ) => {
	switch ( action.type ) {
	case Types.SET_REQUEST_SCREEN_HEADER:
		return action.data;
	case Types.LOGOUT:
	case Types.RESET_REQUEST_SCREEN_HEADER:
		listRequestHeader.amount = false;
		listRequestHeader.payment = false;

		return listRequestHeader;
	default:
		return state;
	}
};

const uploadingBankPaymentConfirmImg = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.IS_UPLOADING_BANK_PAYMENT_CONFIRM_PHOTO:
		return true;
	case Types.DONE_UPLOADING_BANK_PAYMENT_CONFIRM_PHOTO:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const bankPaymentConfirmImg = ( state = "", action ) => {
	switch ( action.type ) {
	case Types.DONE_UPLOADING_BANK_PAYMENT_CONFIRM_PHOTO:
		return action.data;
	case Types.LOGOUT:
	case Types.BANK_PAYMENT_COFIRM_REMOVE_PHOTO:
	case Types.REQUEST_RESET:
		return "";
	default:
		return state;
	}
};

const selectedBank = (state = "", action) => {
	switch (action.type){
	case Types.SELECT_BANK:
		return action.data;
	case Types.REQUEST_RESET:
		return "";
	default:
		return state;
	}
};

const amountInput = (state = 0, action) => {
	switch (action.type){
	case Types.SET_AMOUNT_INPUT:
		return action.data;
	case Types.RESET_REQUEST_SCREEN_HEADER:
	case Types.REQUEST_RESET:
		return 0;
	default:
		return state;
	}
};

const confirmPaymentInput = (state = {}, action) => {
	switch (action.type){
	case Types.SET_CONFIRM_PAYMENT_INPUT:
		return action.data;
	case Types.RESET_INPUT_REDUCERS:
	case Types.REQUEST_RESET:
		return {};
	default:
		return state;
	}
};

const fundRequestResult = (state = {}, action) => {
	switch (action.type){
	case Types.CREATE_FUND_REQUEST_SUCCESS:
		return action.data;
	default:
		return state;
	}
};

const isRequestPaid = (state = false, action) => {
	switch (action.type){
	case Types.REQUEST_BANK_PAID_PROGRESS:
		return true;
	case Types.REQUEST_GRPS_OUTLET_PAID:
	case Types.REQUEST_BANK_PAID_FAILED:
	case Types.REQUEST_BANK_PAID:
		return false;
	default:
		return state;
	}
};

const displayRequestSuccessModal = (state = "", action) => {
	switch (action.type){
	case Types.REQUEST_BANK_PAID:
	case Types.REQUEST_GRPS_OUTLET_PAID:
		return action.data;
	default:
		return state;
	}
};

const requestSuccess = (state = false, action) => {
	switch (action.type){
	case Types.REQUEST_BANK_PAID:
	case Types.REQUEST_GRPS_OUTLET_PAID:
		return true;
	case Types.REQUEST_CLOSED_MODAL:
	case Types.REQUEST_RESET:
		return false;
	default:
		return state;
	}
};

const isRequestingFund = (state = false, action) => {
	switch (action.type){
	case Types.REQUEST_INPROGRESS:
		return true;
	case Types.REQUEST_RESET:
	case Types.CREATE_FUND_REQUEST_SUCCESS:
	case Types.CREATE_FUND_REQUEST_FAILED:
		return false;
	default:
		return state;
	}
};

// claim gc
const claimScreen = ( state = "", action ) => {
	switch ( action.type ) {
	case Types.SET_CLAIM_SCREEN:
		return action.data;
	case Types.CLOSED_WALLET_BOX:
		return action.data;
	default:
		return state;
	}
};
const ClaimGCInput = ( state = "", action ) => {
	switch (action.type){
	case Types.CLAIM_GC_INPUT:
		return action.data;
	case Types.CLOSED_WALLET_BOX:
		return action.data;
	default:
		return state;
	}
};

// network points
const networpointsScreen = ( state = "", action ) => {
	switch ( action.type ) {
	case Types.SET_NETWORK_POINTS_SCREEN:
		return action.data;
	case Types.CLOSED_WALLET_BOX:
		return action.data;
	default:
		return state;
	}
};

const isGettingAvailablePoints = (state = false, action) => {
	switch (action.type) {
	case Types.IS_GETTING_AVAILABLE_POINTS:
		return true;
	case Types.DONE_GETTING_AVAILABLE_POINTS:
	case Types.FAIL_GETTING_AVAILABLE_POINTS:
		return true;
	default:
		return state;
	}
};

const availablePoints = (state = {}, action) => {
	switch (action.type) {
	case Types.DONE_GETTING_AVAILABLE_POINTS:
		return action.data;
	case Types.IS_GETTING_AVAILABLE_POINTS:
	case Types.FAIL_GETTING_AVAILABLE_POINTS:
		return {};
	default:
		return state;
	}
};

const failGettingAvailablePoints = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_GETTING_AVAILABLE_POINTS:
		return true;
	case Types.IS_GETTING_AVAILABLE_POINTS:
	case Types.DONE_GETTING_AVAILABLE_POINTS:
		return false;
	default:
		return state;
	}
};

// history
const logHistory = (state = [], action) => {
	switch (action.type) {
	case Types.EWALLET_LOGS_SUCCESS:
		return action.data;
	default:
		return state;
	}
};

const isFetching = (state = false, action) => {
	switch (action.type) {
	case Types.EWALLET_LOGS_LOADING:
		return true;
	case Types.EWALLET_LOGS_SUCCESS:
	case Types.EWALLET_LOGS_FAILED:
		return false;
	default:
		return state;
	}
};

const inputAccountId  = ( state = "", action )  => {
	switch (action.type) {
	case Types.INPUT_ACCOUNT_ID:
		return action.data;
	case Types.RESET_SEND_ECASH:
		return "";
	default:
		return state;
	}
};
const setHeaderTitle  = ( state = "Fund Request", action )  => {
	switch (action.type) {
	case Types.SET_HEADER_TITLE:
		return action.data;
	default:
		return state;
	}
};

const currentWalletId  = ( state = "", action )  => {
	switch (action.type) {
	case Types.SET_CURRENT_WALLET:
		return action.data;
	default:
		return state;
	}
};

export default combineReducers({
	CurrencyList,
	isCurrenciesError,
	createWalletButton,
	isAdded,
	addedWallet,
	selectValue,
	walletSelected,
	ewalletScreen,
	CreateWalletCurrency,
	getBalanceSelected,
	listAdded,
	isWalletCreated,
	isWalletExisting,
	selectConvertValueFrom,
	selectConvertToRecieve,
	selectedTarget,
	inputValue,
	targetAccountWallet,
	targetAccountUser,
	getTargetAccountWalletFailed,
	targetWallet,
	sendEcashSuccess,
	convertedValue,
	sendEcashResult,
	sendingEcash,
	convertAmountInput,
	convertedValuetoRecieved,
	converting,
	convertSuccess,
	requestScreen,
	requestScreenHeader,
	uploadingBankPaymentConfirmImg,
	bankPaymentConfirmImg,
	claimScreen,
	ClaimGCInput,
	networpointsScreen,
	currencyRate,
	switchAccount,
	selectedBank,
	amountInput,
	fundRequestResult,
	confirmPaymentInput,
	displayRequestSuccessModal,
	requestSuccess,
	isRequestingFund,
	isGettingAvailablePoints,
	availablePoints,
	failGettingAvailablePoints,
	logHistory,
	isGetWalletLoading,
	inputAccountId,
	isFetching,
	isWalletLoad,
	serviceFee,
	setHeaderTitle,
	isRequestPaid,
	currentWalletId,
});
