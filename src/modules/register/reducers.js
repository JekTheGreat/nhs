import { combineReducers } from "redux";
import * as Types from "./types";

const initialInput = {
	username: "",
	password: "",
	confirmPassword: "",
	email: "",
	firstName: "",
	middleName: "",
	lastName: "",
	country: "Philippines",
};

const addAccountInitialInput = {
	accountType: "",
	accountId: "",
	referenceId: "",
	pin: "",
	reTypePin: "",
	mobileNumber: "",
	sponsor: "",
	upline: "",
	position: "",
};

const addNewAccountInput = (state = addAccountInitialInput, action) => {
	switch (action.type) {
		case Types.SET_ADD_ACCOUNT_DETAILS:
			return action.data;
		case Types.ADD_ACCOUNT_RESET_INPUT:
			return addAccountInitialInput;
		case Types.ACCOUNT_ADDED:
			return addAccountInitialInput;
		default:
			return state;
	}
};

const registerNewInput = (state = initialInput, action) => {
	switch (action.type) {
		case Types.SET_REGISTER_DETAILS:
			return action.data;
		case Types.REGISTER_RESET_INPUT:
			return initialInput;
		default:
			return state;
	}
};

const isRegistered = (state = {}, action) => {
	switch (action.type) {
		case Types.REGISTER_SUCCESS:
			return action.data;
		// case Types.SEND_CODE:
		// 	return action.data;
		case Types.REGISTER_RESET_INPUT:
		case Types.REGISTERING_INPROGRESS:
		case Types.REGISTER_FAILED:
		case Types.LOGOUT:
			return {};
		default:
			return state;
	}
};

const isRegistering = (state = false, action) => {
	switch (action.type) {
		case Types.REGISTERING_INPROGRESS:
			return true;
		case Types.REGISTER_SUCCESS:
		case Types.REGISTER_FAILED:
		case Types.REGISTER_RESET_INPUT:
			return false;
		default:
			return state;
	}
};

const isResendingCode = (state = false, action) => {
	switch (action.type) {
		case Types.RESEND_CODE_PROGRESS:
			return true;
		case Types.RESEND_CODE:
		case Types.RESEND_CODE_FAILED:
			return false;
		default:
			return state;
	}
};

const isRegisterFailed = (state = "", action) => {
	switch (action.type) {
		case Types.REGISTER_FAILED:
			return action.error;
		case Types.REGISTER_SUCCESS:
		case Types.REGISTERING_INPROGRESS:
		case Types.RESET_REGISTER_FAILED:
			return "";
		default:
			return state;
	}
};

const registerCountryDial = (state = "63", action) => {
	switch (action.type) {
		case Types.SET_COUNTRY_DIAL:
			return action.data;
		default:
			return state;
	}
};

const isRegisterSuccessful = (state = false, action) => {
	switch (action.type) {
		case Types.REGISTER_SUCCESS:
			return true;
		case Types.REGISTER_FAILED:
			return false;
		default:
			return state;
	}
};

const isSummary = (state = false, action) => {
	switch (action.type) {
		case Types.REGISTER_SUMMARY:
			return true;
		case Types.REGISTER_RESET_SUMMARY:
			return false;
		default:
			return state;
	}
};

const isSendingCode = (state = false, action) => {
	switch (action.type) {
		case Types.SEND_CODE_PROGRESS:
			return true;
		case Types.SEND_CODE:
		case Types.SEND_CODE_FAILED:
			return false;
		default:
			return state;
	}
};

const SendCodeSuccess = (state = {}, action) => {
	switch (action.type) {
		case Types.SEND_CODE:
			return action.data;
		case Types.SEND_CODE_PROGRESS:
		case Types.SEND_CODE_FAILED:
			return {};
		default:
			return state;
	}
};

const SendCodeFailed = (state = "", action) => {
	switch (action.type) {
		case Types.SEND_CODE_FAILED:
			return action.error;
		case Types.SEND_CODE_PROGRESS:
		case Types.SEND_CODE:
			return "";
		default:
			return state;
	}
};

const currentStep = (state = "emailVerification", action) => {
	switch (action.type) {
		case Types.SET_CURRENT_STEP:
			return action.data;
		default:
			return state;
	}
};

const is2FAReg = (state = false, action) => {
	switch (action.type) {
		case Types.REG_2FA:
			return true;
		case Types.REG_2FA_RESET:
			return false;
		default:
			return state;
	}
};

const isEmailScreen = (state = false, action) => {
	switch (action.type) {
		case Types.REG_CHANGE_SCREEN:
			return true;
		case Types.REG_2FA_RESET:
			return false;
		default:
			return state;
	}
};

export default combineReducers({
	isEmailScreen,
	is2FAReg,
	registerNewInput,
	isRegisterSuccessful,
	isRegistered,
	isRegistering,
	isRegisterFailed,
	registerCountryDial,
	addNewAccountInput,
	isSummary,
	isResendingCode,
	isSendingCode,
	SendCodeFailed,
	SendCodeSuccess,
	currentStep,
});
