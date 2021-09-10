import { combineReducers } from "redux";
// import _ from "lodash";

import * as Types from "./types";

const forgotPasswordScreen = (state = "username", action) => {
	switch (action.type) {
	case Types.SET_FORGOT_PASSWORD_SCREEN:
		return action.data;
	case Types.RESET_DATA:
		return "username";
	default:
		return state;
	}
};

const inputDetailsFP = (state = "", action) => {
	switch (action.type) {
	case Types.SET_FORGOT_INPUT_DETAILS:
		return action.data;
	case Types.RESET_INPUT_DETAILS:
		return "";
	default:
		return state;
	}
};

const isFetchingUserInfo = (state = false, action) => {
	switch (action.type){
	case Types.FORGOTPASSWORD_USERINFO_INPROGRESS:
		return true;
	case Types.FORGOTPASSWORD_USERINFO_SUCCESS:
	case Types.FORGOTPASSWORD_USERINFO_FAILED:
	case Types.RESET_DATA:
		return false;
	default:
		return state;
	}
};

const isUserInfoError = (state = "", action) => {
	switch (action.type){
	case Types.FORGOTPASSWORD_USERINFO_FAILED:
		return action.error;
	case Types.RESET_DATA:
	case Types.SAVE_USERNAME:
		return "";
	default:
		return state;
	}
};

const userInfo = (state = {}, action) => {
	switch (action.type){
	case Types.FORGOTPASSWORD_USERINFO_SUCCESS:
		return action.data;
	case Types.FORGOTPASSWORD_USERINFO_INPROGRESS:
	case Types.FORGOTPASSWORD_USERINFO_FAILED:
		return {};
	case Types.RESET_DATA:
		return {};
	default:
		return state;
	}
};

const sendingCode = (state = false, action) => {
	switch(action.type){
		case Types.SENDING_CODE:
			return true;
		case Types.SEND_CODE_SUCCESSFUL:
		case Types.SEND_CODE_FAILED:
		case Types.RESET_DATA:
			return false;
		default:
			return state;
	}
}

const sendCode = (state = "", action) => {
	switch(action.type){
		case Types.SEND_CODE_SUCCESSFUL:
			return action.data;
		case Types.RESET_DATA:
			return "";
		default:
			return state;
	}
}

const sendCodeFailed = (state = "", action) => {
	switch(action.type){
		case Types.SEND_CODE_FAILED:
			return action.error;
		case Types.RESET_DATA:
			return "";
		default:
			return state;
	}
}

const isVerifiyingOTP = (state = false, action) => {
	switch(action.type){
		case Types.VERIFYING_OTP:
			return true;
		case Types.OTP_VERIFICATION_SUCCESSFUL:
		case Types.OTP_VERIFICATION_FAILED:
		case Types.SET_FORGOT_INPUT_DETAILS:
		case Types.RESET_DATA:
			return false;
		default:
			return state;
	}
}

const OTPVerified = (state = "", action) => {
	switch(action.type){
		case Types.OTP_VERIFICATION_SUCCESSFUL:
			return action.data;
		case Types.OTP_VERIFICATION_FAILED:
		case Types.RESET_DATA:
			return "";
		default:
			return state;
	}

}

const OTPVerificationFailed = (state = "", action) => {
	switch(action.type){
		case Types.OTP_VERIFICATION_FAILED:
			return action.error;
		case Types.RESET_DATA:
			return "";
		default:
			return state;
	}
}

const isSetNewPassword = (state = false, action) => {
	switch(action.type){
		case Types.SET_PASSWORD_INPROGRESS:
			return true;
		case Types.SET_PASSWORD_FAILED:
		case Types.RESET_DATA:
			return false;
		default:
			return state;
	}
}

const setPasswordSuccess = (state = false, action) => {
	switch(action.type){
		case Types.SET_PASSWORD_SUCCESS:
			return true;
		default:
			return state;
	}
}

const setPasswordFailed = (state = "", action) => {
	switch(action.type){
		case Types.SET_PASSWORD_FAILED:
			return action.error;
		default:
			return state;
	}
}


// const getSaveRadio = (state = "", action) => {
// 	switch (action.type) {
// 	case Types.SAVE_RADIO:
// 		return action.data.value;
// 	case Types.FORGOTPASSWORD_USERINFO_SUCCESS:
// 		return action.data.email;
// 	case Types.RESET_DATA:
// 		return "";
// 	default:
// 		return state;
// 	}
// };

const forgotpasswordType = (state = "", action) => {
	switch (action.type){
	case Types.SAVE_RADIO:
		return action.data.type;
	case Types.RESET_DATA:
		return "";
	default:
		return state;
	}
};

const getSaveUsername = (state = "", action) => {
	switch (action.type) {
	case Types.SAVE_USERNAME:
		return action.data;
	case Types.RESET_DATA:
		return "";
	default:
		return state;
	}
};

const getSaveCode = (state = "", action) => {
	switch (action.type) {
	case Types.SAVE_CODE:
		return action.data;
	case Types.RESET_DATA:
		return "";
	default:
		return state;
	}
};

const isInvalidCode = (state = false, action) => {
	switch (action.type){
	case Types.FORGOTPASSWORD_CODE_INVALID:
		return true;
	case Types.SAVE_CODE:
		return false;
	case Types.RESET_DATA:
		return false;
	default:
		return state;
	}
};

const codeError = (state = "", action) => {
	switch (action.type){
	case Types.FORGOTPASSWORD_CODE_INVALID:
		return action.data;
	case Types.SAVE_CODE:
		return "";
	case Types.RESET_DATA:
		return "";
	default:
		return state;
	}
};

const passwordInitial = {
	username: "",
	password: "",
	retypePassword: "",
};

const passwordInputs = (state = passwordInitial, action) => {
	switch (action.type) {
	case Types.FORGOTPASSWORD_USERINFO_SUCCESS:
		const newState = {...state};

		newState.username = action.data.username;

		return newState;
	case Types.SET_PASSWORD_INPUTS:
		return action.data;
	case Types.RESET_DATA:
		return passwordInitial;
	default:
		return state;
	}
};

const resetInProgress = (state = false, action) => {
	switch (action.type){
	case Types.FORGOTPASSWORD_INPROGRESS:
		return true;
	case Types.FORGOTPASSWORD_SUCCESS:
	case Types.FORGOTPASSWORD_FAILED:
		return false;
	default:
		return state;
	}
};

const sendingVerification = (state = false, action) => {
	switch (action.type) {
	case Types.FORGOTPASSWORD_VERIFICATION_SENDING:
		return true;
	case Types.SET_FORGOT_PASSWORD_SCREEN:
	case Types.FORGOTPASSWORD_VERIFICATION_FAILED:
		return false;
	default:
		return state;
	}
};

const codeValidating = (state = false, action) => {
	switch (action.type) {
	case Types.FORGOTPASSWORD_CODE_VALIDATING:
		return true;
	case Types.FORGOTPASSWORD_CODE_INVALID:
	case Types.SET_FORGOT_PASSWORD_SCREEN:
		return false;
	default:
		return state;
	}
};

const resendingCode = ( state = false, action ) => {
	switch ( action.type ) {
	case Types.FORGOTPASSWORD_RESENDING_CODE:
		return true;
	case Types.FORGOTPASSWORD_RESEND_CODE_SUCCESS:
	case Types.FORGOTPASSWORD_RESEND_CODE_FAILED:
	case Types.RESET_DATA:
		return false;
	default:
		return state;
	}
};

// FORGOT USERNAME
const getSaveInput = (state = {}, action) => {
	switch (action.type) {
	case Types.SAVE_INPUT:
		return action.data;
	case Types.FORGOTUSERNAME_RESET:
		return {};
	default:
		return state;
	}
};

const isCheckingUser = (state = false, action) => {
	switch (action.type){
	case Types.FORGOTUSERNAME_USER_INPROGRESS:
		return true;
	case Types.FORGOTUSERNAME_USER_FAILED:
	case Types.FORGOTUSERNAME_FAILED:
	case Types.FORGOTUSERNAME_RESET:
		return false;
	default:
		return state;
	}
};

const getInformationFailed = (state = false, action) => {
	switch (action.type){
	case Types.FORGOTUSERNAME_USER_INPROGRESS:
		return false;
	case Types.FORGOTUSERNAME_USER_FAILED:
		return true;
	case Types.FORGOTUSERNAME_RESET:
		return false;
	case Types.SAVE_INPUT:
		return false;
	default:
		return state;
	}
};

const forgotUsernameEmailSent = (state = false, action) => {
	switch (action.type){
	case Types.FORGOTUSERNAME_FAILED:
	case Types.FORGOTUSERNAME_RESET:
		return false;
	case Types.FORGOTUSERNAME_SUCCESS:
		return true;
	default:
		return state;
	}
};

const forgotUsernameEmailSending = (state = false, action) => {
	switch (action.type){
	case Types.FORGOTUSERNAME_FAILED:
	case Types.FORGOTUSERNAME_RESET:
	case Types.FORGOTUSERNAME_SUCCESS:
		return false;
	case Types.FORGOTUSERNAME_SENDING:
		return true;
	default:
		return state;
	}
};

export default combineReducers({
	forgotPasswordScreen,
	isFetchingUserInfo,
	userInfo,
	getSaveUsername,
	// getSaveRadio,
	forgotpasswordType,
	getSaveCode,
	isInvalidCode,
	codeError,
	passwordInputs,
	isUserInfoError,
	resetInProgress,
	sendingVerification,
	codeValidating,
	resendingCode,

	getSaveInput,
	forgotUsernameEmailSent,
	forgotUsernameEmailSending,
	isCheckingUser,
	getInformationFailed,
	// getSaveOTP,
	inputDetailsFP,
	sendCode,
	sendingCode,
	sendCodeFailed,
	isVerifiyingOTP,
	OTPVerified,
	isSetNewPassword,
	setPasswordSuccess,
	OTPVerificationFailed,
	setPasswordFailed,
});
