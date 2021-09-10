import { combineReducers } from "redux";

import * as Types from "./types";

const addLegacyAccountScreen = (state = "regcodeVerification", action) => {
	switch (action.type){
	case Types.ADDLEGACY_ACCOUNT_SET_SCREEN:
		return action.data;
	case Types.ADD_LEGACY_CLOSE_MODAL:
		return "regcodeVerification";
	default:
		return state;
	}
};

const addLegacyTabs = ( state = "legacyAccount", action ) => {
	switch (action.type){
	case Types.ADDLEGACY_SET_TABS:
		return action.data;
	default:
		return state;
	}
};

const getSearchRegcodeInput = (state = "", action) => {
	switch ( action.type ) {
	case Types.SET_SEARCH_RECODE_INPUT:
		return action.data;
	case Types.LOGOUT:
	case Types.ADD_LEGACY_CLOSE_MODAL:
		return "";
	default:
		return state;
	}
};

const regcodeCredentials = {
	username: "",
	password: "",
};

const isSearchingRegcode = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.SEARCHING_REGCODE:
		return true;
	case Types.SEARCH_REGCODE_FAIL:
	case Types.ADDLEGACY_ACCOUNT_SET_SCREEN:
		return false;
	default:
		return state;
	}
};

const isSearchRegcodeFailed = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.SEARCH_REGCODE_FAIL:
		return true;
	case Types.SET_SEARCH_RECODE_INPUT:
	case Types.ADD_LEGACY_CLOSE_MODAL:
		return false;
	default:
		return state;
	}
};

const isGettingRegcodeCredentials = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.GETTING_REGCODE_CREDENTIALS:
		return true;
	// case Types.GET_REGCODE_CREDENTIALS_SUCCESS:
	case Types.ADDLEGACY_ACCOUNT_SET_SCREEN:
	case Types.GET_REGCODE_CREDENTIALS_FAILED:
		return false;
	default:
		return state;
	}
};

const isGetRegcodeCredentialsSuccess = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.GET_REGCODE_CREDENTIALS_SUCCESS:
		return true;
	case Types.ADDLEGACY_ACCOUNT_SET_SCREEN:
	case Types.LOGOUT:
	// case Types.ADD_LEGACY_CLOSE_MODAL:
		return false;
	default:
		return state;
	}
};

const isGetRegcodeCredentialsFailed = ( state = false, action ) => {
	switch (action.type) {
	case Types.GET_REGCODE_CREDENTIALS_FAILED:
		return true;
	case Types.SET_REGCODE_CREDENTIALS:
	case Types.ADD_LEGACY_CLOSE_MODAL:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const regcodeCredentialsInput = (state = regcodeCredentials, action) => {
	switch ( action.type ) {
	case Types.SET_REGCODE_CREDENTIALS:
		return action.data;
	case Types.ADD_LEGACY_CLOSE_MODAL:
	case Types.LOGOUT:
		return regcodeCredentials;
	default:
		return state;
	}
};

const getVerificationCode = ( state = "", action ) => {
	switch (action.type) {
	case Types.SAVE_VERIFICATION_CODE:
		return action.data;
	case Types.VERIFY_CODE_SUCCESS:
	case Types.LOGOUT:
		return "";
	default:
		return state;
	}
};

const isVerifyingCode = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.VERIFYING_CODE:
		return true;
	case Types.VERIFY_CODE_SUCCESS:
	case Types.VERIFY_CODE_FAILED:
		return false;
	default:
		return state;
	}
};

const isVerifyCodeSuccess = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.VERIFY_CODE_SUCCESS:
		return true;
	case Types.ADD_LEGACY_CLOSE_MODAL:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const isVerifyCodeFailed = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.VERIFY_CODE_FAILED:
		return true;
	case Types.VERIFYING_CODE:
	case Types.ADD_LEGACY_CLOSE_MODAL:
		return false;
	default:
		return state;
	}
};

const gettingClaimHistory = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.GETTING_HISTORY_CLAIM:
		return true;
	case Types.GET_HISTORY_CLAIM_SUCCESS:
	case Types.GET_HISTORY_CLAIM_FAILED:
		return false;
	default:
		return state;
	}
};

const getClaimHistory = ( state = [], action ) => {
	switch ( action.type ) {
	case Types.GET_HISTORY_CLAIM_SUCCESS:
		return action.data;
	case Types.LOGOUT:
		return [];
	default:
		return state;
	}
};

const isResendingCode = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.RESENDING_CODE:
		return true;
	case Types.RESENDING_CODE_SUCCESS:
	case Types.RESENDING_CODE_FAILED:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

export default combineReducers({
	addLegacyAccountScreen,
	addLegacyTabs,
	getSearchRegcodeInput,
	regcodeCredentialsInput,
	isVerifyCodeSuccess,
	isVerifyingCode,
	isVerifyCodeFailed,
	isSearchingRegcode,
	isGettingRegcodeCredentials,
	isGetRegcodeCredentialsSuccess,
	isSearchRegcodeFailed,
	isGetRegcodeCredentialsFailed,
	getVerificationCode,
	getClaimHistory,
	gettingClaimHistory,
	isResendingCode,
});
