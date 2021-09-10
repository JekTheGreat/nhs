/*eslint-disable*/
import { combineReducers } from "redux";

import * as Types from "./types";

const inputDetails = {
	chooseBillers: {},
	filloutform: {},
	summary: {},
}

const transactDates = {
	isFromDatePicked: false,
	isToDatePicked: false,
	markedDates: {},
	fromDate: {}
}


const setBillsPaymentScreen = (state = [], action) => {
	switch (action.type) {
		case Types.SET_BILLSPAYMENTSCREEN:
			return action.data;
		default:
			return state;
	}
};

const setTransactionDates = (state = transactDates, action) => {
	switch (action.type) {
		case Types.SET_TRANSACTION_DATES:
			return action.data;
		default:
			return state;
	}
};

const setInputDetails = (state = inputDetails, action) => {
	switch (action.type) {
		case Types.SET_INPUTDETAILS:
			return action.data;
		default:
			return state;
	}
};

const getTransactions = (state = [], action) => {
	switch (action.type) {
		case Types.GET_TRANSACTIONS:
			return action.data;
		default:
			return state;
	}
}

const getBillers = (state = [], action) => {
	switch (action.type) {
		case Types.GET_BILLERS:
			return action.data;
		default:
			return state;
	}
}

const getCategories = (state = [], action) => {
	switch (action.type) {
		case Types.GET_CATEGORIES:
			return action.data;
		default:
			return state;
	}
}

const getFields = (state = [], action) => {
	switch (action.type) {
		case Types.GET_FIELDS:
			return action.data;
		default:
			return state;
	}
}

const getReceipt = (state = [], action) => {
	switch (action.type) {
		case Types.GET_RECEIPT:
			return action.data;
		default:
			return state;
	}
}

const getRates = (state = [], action) => {
	switch (action.type) {
		case Types.GET_RATES:
			return action.data;
		default:
			return state;
	}
}

const submitPayment = (state = [], action) => {
	switch (action.type) {
		case Types.TRANSACTION_SUCCESSFUL:
			return action.data;
		default:
			return state;
	}
}

const validateFields = (state = "", action) => {
	switch (action.type) {
		case Types.VALIDATE_FIELDS:
			return action.data;
		default:
			return state;
	}
};

const uploadImage = (state = "", action) => {
	switch (action.type) {
		case Types.UPLOAD_IMAGE:
			return action.data;
		default:
			return state;
	}
};

const transactionInProgress = (state = false, action) => {
	switch (action.type) {
		case Types.TRANSACTION_IN_PROGRESS:
			return true;
		case Types.VALIDATE_FIELDS:
		case Types.TRANSACTION_SUCCESSFUL:
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
		case Types.TRANSACTION_PROGRESS:
			return {};
		default:
			return state;
	}
};


export default combineReducers({
	setBillsPaymentScreen,
	setTransactionDates,
	setInputDetails,
	getTransactions,
	getBillers,
	getFields,
	getReceipt,
	getCategories,
	getRates,
	submitPayment,
	validateFields,
	transactionFailed,
	transactionInProgress,
	uploadImage,
});
