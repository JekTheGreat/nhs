import { combineReducers } from "redux";
import * as Types from "../types";
import Payout from "./payout";

const setSelectedScreen = (state = "select", action) => {
	switch (action.type) {
	case Types.GET_SELECTED_SCREEN:
		return action.data;
	case Types.RESET_REMITTANCE:
		return "select";
	default:
		return state;
	}
};
 
const isValidatingAmount = (state = false, action) => {
	switch (action.type) {
	case Types.SELECTED_PROVIDER_LOAD:
		return true;
	case Types.SELECTED_PROVIDER:
	case Types.SELECTED_PROVIDER_FAILED:
	case Types.RESET_REMITTANCE:
	case Types.GET_ALL_PROVIDER:
		return false;
	default:
		return state;
	}
};

const selectProvider = (state = [], action) => {
	switch (action.type) {
	case Types.SELECTED_PROVIDER:
		return action.data;
	case Types.RESET_REMITTANCE:
		return [];
	default:
		return state;
	}
};

const selectProviderFailed = (state = "", action) => {
	switch (action.type) {
	case Types.SELECTED_PROVIDER_FAILED:
		return action.error;
	case Types.RESET_REMITTANCE:
	case Types.SELECTED_PROVIDER_LOAD:
		return "";
	default:
		return state;
	}
};

const fetchProvider = (state = [], action) => {
	switch (action.type) {
	case Types.GET_ALL_PROVIDER:
		return action.data;
	default:
		return state;
	}
};

const inputDetails = (state = {Sender: {}, Beneficiary: {}}, action) => {
	switch (action.type) {
	case Types.SET_INPUT_DETAILS:
		return action.data;
	case Types.RESET_REMITTANCE:
		return {sender: {}, beneficiary: {}};
	default:
		return state;
	}
};

const isSearching = (state = false, action) => {
	switch (action.type) {
	case Types.SEARCH_IN_PROGRESS:
		return true;
	case Types.SEARCH_FAILED:
	case Types.SEARCH_SUCCESS:
		return false;
	default:
		return state;
	}
};

const SearchFound = (state = {}, action) => {
	switch (action.type) {
	case Types.SEARCH_SUCCESS:
		return action.data;
	case Types.SEARCH_FAILED:
	case Types.SEARCH_IN_PROGRESS:
		return {};
	default:
		return state;
	}
};

const SearchFailed = (state = "", action) => {
	switch (action.type) {
	case Types.SEARCH_FAILED:
		return action.error;
	case Types.SEARCH_SUCCESS:
	case Types.SEARCH_IN_PROGRESS:
	case Types.RESET_REMITTANCE:
		return "";
	default:
		return state;
	}
};

const isAddLoad = (state = false, action) => {
	switch (action.type) {
	case Types.ADD_CLIENT_INPROGRESS:
		return true;
	case Types.ADD_CLIENT_SUCCESS:
	case Types.RESET_REMITTANCE:
	case Types.ADD_CLIENT_FAILED:
		return false;
	default:
		return state;
	}
};

const AddedClient = (state = {}, action) => {
	switch (action.type) {
	case Types.ADD_CLIENT_SUCCESS:
		return action.data;
	case Types.ADD_CLIENT_INPROGRESS:
	case Types.RESET_REMITTANCE:
	case Types.ADD_CLIENT_FAILED:
		return {};
	default:
		return state;
	}
};

const isTransactionLoad = (state = false, action) => {
	switch (action.type) {
	case Types.TRANSACTION_INPROGRESS:
		return true;
	case Types.TRANSACTION_SUCCESS:
	case Types.RESET_REMITTANCE:
	case Types.TRANSACTION_FAILED:
	case Types.GET_PAYOUT_DETAILS:
	case Types.GET_PAYOUT_DETAILS_FAILED:
	case Types.GET_ALL_PROVIDER_PAYOUT:
		return false;
	default:
		return state;
	}
};

const TransactionSuccess = (state = {}, action) => {
	switch (action.type) {
	case Types.TRANSACTION_SUCCESS:
		return action.data;
	case Types.TRANSACTION_INPROGRESS:
	case Types.RESET_REMITTANCE:
	case Types.TRANSACTION_FAILED:
		return {};
	default:
		return state;
	}
};

const TransFailed = (state = "", action) => {
	switch (action.type) {
	case Types.TRANSACTION_FAILED:
		return action.error;
	case Types.TRANSACTION_INPROGRESS:
	case Types.TRANSACTION_SUCCESS:
	case Types.RESET_REMITTANCE:
		return "";
	default:
		return state;
	}
};

const ServiceFee = (state = "", action) => {
	switch (action.type) {
	case Types.SERVICES_FEE:
		return action.data;
	case Types.RESET_REMITTANCE:
		return "";
	default:
		return state;
	}
};

const isOTPSend = (state = false, action) => {
	switch (action.type) {
	case Types.OTP_SEND_LOAD:
		return true;
	case Types.OTP_SEND_FAILED:
	case Types.OTP_SEND:
		return false;
	default:
		return state;
	}
};

const OTPSend = (state = "", action) => {
	switch (action.type) {
	case Types.OTP_SEND:
		return action.data;
	default:
		return state;
	}
};

const OTPFailed = (state = "", action) => {
	switch (action.type) {
	case Types.OTP_SEND_FAILED:
		return action.error;
	case Types.OTP_SEND:
	case Types.OTP_SEND_LOAD:
		return "";
	default:
		return state;
	}
};

const isOTPVerify = (state = false, action) => {
	switch (action.type) {
	case Types.OTP_VERIFY_LOAD:
		return true;
	case Types.OTP_VERIFY_FAILED:
	case Types.OTP_VERIFY:
		return false;
	default:
		return state;
	}
};

const OTPVerify = (state = {}, action) => {
	switch (action.type) {
	case Types.OTP_VERIFY:
		return action.data;
	case Types.OTP_VERIFY_FAILED:
	case Types.OTP_VERIFY_LOAD:
		return {};
	default:
		return state;
	}
};

const OTPVerifyFailed = (state = "", action) => {
	switch (action.type) {
	case Types.OTP_VERIFY_FAILED:
		return action.error;
	case Types.OTP_VERIFY:
	case Types.OTP_VERIFY_LOAD:
		return "";
	default:
		return state;
	}
};

const isSendingReport = (state = false, action) => {
	switch (action.type) {
	case Types.SEND_REPORT_INPROGRESS:
		return true;
	case Types.SEND_REPORT_SUCCESS:
	case Types.SEND_REPORT_FAILED:
		return false;
	default:
		return state;
	}
};

const SendReports = (state = {}, action) => {
	switch (action.type) {
	case Types.SEND_REPORT_SUCCESS:
		return action.data;
	default:
		return state;
	}
};

const isAddNewIDLoading = (state = false, action) => {
	switch (action.type) {
	case Types.ADD_NEW_ID_LOAD:
		return true;
	case Types.ADD_NEW_ID:
	case Types.ADD_NEW_ID_FAILED:
	case Types.TRANSACTION_FAILED:
	case Types.TRANSACTION_SUCCESS:
		return false;
	default:
		return state;
	}
};

const AddNewID = (state = {}, action) => {
	switch (action.type) {
	case Types.ADD_NEW_ID:
		return action.data;
	case Types.ADD_NEW_ID_LOAD:
	case Types.ADD_NEW_ID_FAILED:
		return {};
	default:
		return state;
	}
};

const AddNewIDFailed = (state = "", action) => {
	switch (action.type) {
	case Types.ADD_NEW_ID_FAILED:
		return action.error;
	case Types.ADD_NEW_ID_LOAD:
	case Types.ADD_NEW_ID:
		return "";
	default:
		return state;
	}
};

const isCheckVerification = (state = false, action) => {
	switch (action.type) {
	case Types.CHECK_VERIFICATION_LOAD:
		return true;
	case Types.CHECK_VERIFICATION:
	case Types.CHECK_VERIFICATION_FAILED:
	case Types.RESET_REMITTANCE:
	case Types.OTP_SEND:
		return false;
	default:
		return state;
	}
};

const checkVerificationSuccess = (state = {}, action) => {
	switch (action.type) {
	case Types.CHECK_VERIFICATION:
		return action.data;
	case Types.CHECK_VERIFICATION_LOAD:
	case Types.CHECK_VERIFICATION_FAILED:
	case Types.OTP_SEND:
	case Types.RESET_REMITTANCE:
		return {};
	default:
		return state;
	}
};

const checkVerificationFailed = (state = "", action) => {
	switch (action.type) {
	case Types.CHECK_VERIFICATION_FAILED:
		return action.error;
	case Types.CHECK_VERIFICATION_LOAD:
	case Types.CHECK_VERIFICATION:
	case Types.OTP_SEND:
	case Types.RESET_REMITTANCE:
		return "";
	default:
		return state;
	}
};

export default combineReducers({
	selectProvider,
	isValidatingAmount,
	selectProviderFailed,

	setSelectedScreen,
	fetchProvider,
	inputDetails,
	isSearching,
	SearchFound,
	SearchFailed,
	isAddLoad,
	AddedClient,
	isTransactionLoad,
	TransactionSuccess,
	TransFailed,
	ServiceFee,
	...Payout,
	isOTPSend,
	OTPSend,
	OTPFailed,
	isOTPVerify,
	OTPVerify,
	OTPVerifyFailed,
	isSendingReport,
	SendReports,
	isAddNewIDLoading,
	AddNewID,
	AddNewIDFailed,

	isCheckVerification,
	checkVerificationSuccess,
	checkVerificationFailed,
});
