import { combineReducers } from "redux";
import _ from "lodash";

import * as Types from "./types";

const initialInput = {
	username: "",
	password: "",
};

const inputLoginDetails = (state = initialInput, action) => {
	switch (action.type) {
		case Types.SET_LOGIN_DETAILS:
			return action.data;
		case Types.LOGIN_SUCCESS:
		case Types.LOGIN_ACCOUNT_NOT_VERIFIED:
		case Types.LOGIN_2FA_RESET:
		case Types.CHANGE_EXPIRED_PASSWORD_SUCCESS:
		case Types.LOGOUT:
			return initialInput;
		default:
			return state;
	}
};

const login2FACodeInput = (state = "", action) => {
	switch (action.type) {
		case Types.SET_LOGIN_VERIFICATION:
			return action.data;
		case Types.LOGIN_RESET_VERIFICATION:
		case Types.LOGIN_SUCCESS:
		case Types.LOGIN_ACCOUNT_NOT_VERIFIED:
			return "";
		default:
			return state;
	}
};

const isLoggingIn = (state = false, action) => {
	switch (action.type) {
		case Types.LOGGING_INPROGRESS:
			return true;
		case Types.LOGIN_2FA:
		case Types.LOGIN_2FA_RESET:
		case Types.LOGIN_2FA_SUCCESS:
		case Types.LOGIN_SUCCESS:
		case Types.LOGIN_RESET:
		case Types.LOGIN_ACCOUNT_NOT_VERIFIED:
		case Types.LOGIN_USER_OUTLET_NOTACTIVE:
		case Types.SET_LOGIN_DETAILS:
			return false;
		case Types.LOGIN_FAILED:
		case Types.SIMULTANEOUS_LOGIN:
		case Types.OTP_FAILED:
		case Types.BLOCKED_ACCESS:
		case Types.PASSWORD_EXPIRED:
			return "";
		default:
			return state;
	}
};

const is2FALogin = (state = false, action) => {
	switch (action.type) {
		case Types.LOGIN_2FA:
			return true;
		case Types.LOGIN_2FA_RESET:
		case Types.LOGIN_2FA_SUCCESS:
			return false;
		default:
			return state;
	}
};

const OTPFailed = (state = "", action) => {
	switch (action.type) {
		case Types.OTP_FAILED:
			return action.error;
		case Types.LOGIN_RESET:
		case Types.SET_LOGIN_DETAILS:
		case Types.SET_LOGIN_VERIFICATION:
		case Types.LOGGING_INPROGRESS:
		case Types.LOGIN_2FA_SUCCESS:
			return "";
		default:
			return state;
	}

}

const isLoggedIn = (state = false, action) => {
	switch (action.type) {
		// case Types.REGISTER_SUCCESS:
		case Types.LOGIN_SUCCESS:
		case Types.LOGIN_ACCOUNT_NOT_VERIFIED:
			return true;
		case Types.LOGOUT:
		case Types.LOGIN_2FA_RESET:
			return false;
		default:
			return state;
	}
};

const isFailed = (state = "", action) => {
	switch (action.type) {
		case Types.LOGIN_FAILED:
			return action.error;
		case Types.LOGIN_RESET:
		case Types.SET_LOGIN_DETAILS:
		case Types.SET_LOGIN_VERIFICATION:
		case Types.LOGGING_INPROGRESS:
		case Types.LOGIN_2FA_SUCCESS:
			return "";
		default:
			return state;
	}
};

const session = (state = {}, action) => {
	switch (action.type) {
		case Types.LOGIN_SUCCESS:
		case Types.LOGIN_2FA_SUCCESS:
			return _.merge({ ...state }, action.data);
		case Types.REGISTER_SUCCESS:
			return action.data;
		case Types.SEND_CODE:
			return action.data;
		case Types.LOGIN_ACCOUNT_NOT_VERIFIED:
			return action.data.session;
		case Types.CONFIRMATION_EMAIL_SUCCESS:
		case Types.CONFIRMATION_MOBILE_SUCCESS:
			const newState = { ...state };

			newState.userId = action.data;

			return newState;
		case Types.ACCOUNT_CHANGE_MOBILE_SUCCESS:
		case Types.ACCOUNT_CHANGE_EMAIL_SUCCESS:
		case Types.ACCOUNT_CHANGE_PASSWORD_SUCCESS:
		case Types.SETTING_CHANGE_2FA_SUCCESS:
		case Types.SETTING_LOGIN_ALERT_SUCCESS:
		case Types.LOGIN_SET_SESSION_USER:
			const newSession = { ...state };

			newSession.user = action.data;

			return newSession;
		case Types.ENABLE_LOGIN_ALERT_EMAIL_SUCCESS:
			const newSession1 = { ...state };

			newSession1.user.enableEmailAlert = action.data.enableEmailAlert;

			return newSession1;
		case Types.ENABLE_LOGIN_ALERT_SMS_SUCCESS:
			const newSession2 = { ...state };

			newSession2.user.enableSMSAlert = action.data.enableSMSAlert;

			return newSession2;
		default:
			return state;
	}
};

const additionalDetails = (state = {}, action) => {
	switch (action.type) {
		case Types.ADDITIONAL_DETAILS:
			return action.data;
		case Types.ACCOUNT_CHANGE_MOBILE_SUCCESS:
			const newState = { ...state };

			newState.mobile = action.data.mobile;

			return newState;
		case Types.LOGOUT:
			return {};
		default:
			return state;
	}
};

const userLevel = (subType) => {
	switch (subType) {
		case "retailer":
		case "retailer-account":
		case "visaretailer":
			return "Retailer";
		case "dealer":
		case "global":
		case "sub-dealer":
			return "1&6";
		case "hub-account":
		case "corporate-account":
			return "7";
		case "ecash-center":
		case "franchise-account":
			return "16";
	}
};

const currentAccount = (state = {}, action) => {
	switch (action.type) {
		case Types.LOGIN_SET_CURRENT_ACCOUNT:
			return _.assign({ ...state }, action.data);
		case Types.ADDITIONAL_DETAILS:
			const newState = { ...state };

			newState.userLevel = userLevel(action.data.type);

			return newState;
		case Types.LOGOUT:
			return {};
		default:
			return state;
	}
};

const getKYCVerification = (state = { kyc1: {}, kyc2: {} }, action) => {
	switch (action.type) {
		case Types.DONE_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
		case Types.DONE_CLEARING_ID_SELFIE_PHOTO:
		case Types.DONE_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
		case Types.DONE_CLEARING_PROOF_OF_ADDRESS_PHOTO:
		case Types.GET_KYC_1:
		case Types.GET_KYC_2:
			const newState = _.assign({ ...state }, action.data);

			return newState;
		// case Types.RESET_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
		// 	const kyc1 = _.merge(state, {kyc1: {}});

		// 	return kyc1;
		// case Types.RESET_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
		// 	const kyc2 = _.merge(state, {kyc2: {}});

		// 	return kyc2;
		case Types.LOGOUT:

			return { kyc1: {}, kyc2: {} };
		default:
			return state;
	}
};

const currentLogin = (state = {}, action) => {
	switch (action.type) {
		case Types.LOGIN_SET_CURRENT_LOGIN:
			return action.data;
		default:
			return state;
	}
};

const isAccountNotVerified = (state = false, action) => {
	switch (action.type) {
		case Types.LOGIN_ACCOUNT_NOT_VERIFIED:
			return true;
		case Types.LOGOUT:
			return false;
		default:
			return state;
	}
};

const isAccountVerifiedByAdmin = (state = false, action) => {
	switch (action.type) {
		case Types.LOGIN_ACCOUNT_ADMIN_VERIFIED:
			return true;
		case Types.LOGOUT:
			return false;
		default:
			return state;
	}
};

const isLocationVerifiedByAdmin = (state = false, action) => {
	switch (action.type) {
		case Types.LOGIN_LOCATION_ADMIN_VERIFIED:
			return true;
		case Types.LOGOUT:
			return false;
		default:
			return state;
	}
};


const getAccountInfos = (state = {}, action) => {
	switch (action.type) {
		case Types.LOGIN_ACCOUNT_NOT_VERIFIED:
			return action.data.client;
		case Types.VERIFY_ADDRESS_PHOTO_SUCCESS:
			return action.data;
		case Types.ACCOUNT_CHANGE_MOBILE_SUCCESS:
			const newState = { ...state };

			newState.mobile = action.data.mobile;

			return newState;
		case Types.LOGOUT:
			return {};
		default:
			return state;
	}
};

const gettingAdditionDetails = (state = false, action) => {
	switch (action.type) {
		case Types.GETTING_ADDITIONAL_DETAILS:
			return true;
		case Types.ADDITIONAL_DETAILS:
			return false;
		default:
			return state;
	}
};

const logInWithFb = (state = {}, action) => {
	switch (action.type) {
		case Types.LOGGING_IN_WITH_FB:
			return action.data;
		case Types.REGISTER_SUCCESS:
		case Types.LOGIN_SUCCESS:
		case Types.LOGIN_RESET:
		case Types.LOGIN_2FA_SUCCESS:
			return {};
		default:
			return state;
	}
};

const isLoggingInWithFb = (state = false, action) => {
	switch (action.type) {
		case Types.LOGGING_IN_WITH_FB:
			return true;
		case Types.LOGIN_SUCCESS:
		case Types.REGISTER_SUCCESS:
		case Types.LOGIN_FB_FAILED:
		case Types.LOGIN_FB2_FAILED:
		case Types.LOGIN_RESET:
		case Types.LOGIN_2FA_SUCCESS:
			return false;
		default:
			return state;
	}
};

const failLogInWithFb = (state = false, action) => {
	switch (action.type) {
		case Types.LOGIN_FB_FAILED:
			return true;
		case Types.LOGGING_IN_WITH_FB:
		case Types.LOGGING_INPROGRESS:
		case Types.LOGIN_RESET:
		case Types.LOGIN_2FA_SUCCESS:
			return false;
		default:
			return state;
	}
};

const isAvailable = (state = {}, action) => {
	switch (action.type) {
		case Types.IS_CHECKING:
		case Types.DONE_CHECKING:
		case Types.FAIL_CHECKING:
			const pseudoState = _.clone(state);
			const isChecking = _.merge(pseudoState, action.data);

			return isChecking;
		case Types.LOGIN_SUCCESS:
		case Types.LOGIN_RESET:
		case Types.RESET_CHECKING:
			return {};
		default:
			return state;
	}
};

const isLoggingInWithFb2 = (state = false, action) => {
	switch (action.type) {
		case Types.LOGGING_IN_WITH_FB2:
			return true;
		case Types.LOGIN_FB2_FAILED:
		case Types.REGISTER_SUCCESS:
		case Types.LOGIN_SUCCESS:
		case Types.SET_LOGIN_DETAILS:
		case Types.LOGIN_RESET:
			return false;
		default:
			return state;
	}
};

const LoggedInWithFb2Failed = (state = false, action) => {
	switch (action.type) {
		case Types.LOGIN_FB2_FAILED:
			return true;
		case Types.LOGIN_SUCCESS:
		case Types.SET_LOGIN_DETAILS:
		case Types.LOGIN_RESET:
		case Types.LOGGING_IN_WITH_FB2:
			return false;
		default:
			return state;
	}
};

const accounts = (state = [], action) => {
	switch (action.type) {
		case Types.LOGIN_GET_ACCOUNT_SUCCESS:
			return action.data;
		default:
			return state;
	}
};

const getCurrentEmployee = (state = {}, action) => {
	switch (action.type) {
		case Types.GET_CURRENT_EMPLOYEE_SUCCESS:
			return action.data;
		case Types.GET_CURRENT_EMPLOYEE_FAILED:
		case Types.LOGOUT:
			return {};
		default:
			return state;
	}
};

const notYetGetCurrentEmployee = (state = true, action) => {
	switch (action.type) {
		case Types.GET_CURRENT_EMPLOYEE_SUCCESS:
		case Types.GET_CURRENT_EMPLOYEE_FAILED:
		case Types.GETTING_CURRENT_EMPLOYEE:
			return false;
		case Types.LOGOUT:
			return true;
		default:
			return state;
	}
};

const isUserOutletActive = (state = false, action) => {
	switch (action.type) {
		case Types.LOGIN_USER_OUTLET_NOTACTIVE:
			return true;
		case Types.SET_LOGIN_DETAILS:
		case Types.LOGIN_RESET:
		case Types.LOGGING_INPROGRESS:
		case Types.SET_LOGIN_VERIFICATION:
			return false;
		default:
			return state;
	}
};
const isResendCode = (state = false, action) => {
	switch (action.type) {
		case Types.RESEND_VERIFICATION_CODE:
			return true;
		case Types.DONE_RESEND_VERIFICATION_CODE:
		case Types.FAIL_RESEND_VERIFICATION_CODE:
		case Types.LOGIN_SUCCESS:
			return false;
		default:
			return state;
	}
};

const isLoadDetails = (state = true, action) => {
	switch (action.type) {
		case Types.ADDITIONAL_DETAILS_LOAD:
			return true;
		case Types.ADDITIONAL_DETAILS:
		case Types.LOGOUT:
			return false;
		default:
			return state;
	}
};
const isUnauthorized = (state = false, action) => {
	switch (action.type) {
		case Types.SET_UNAUTHORIZED:
			return true;
		case Types.LOGGING_INPROGRESS:
		case Types.LOGIN_SUCCESS:
		case Types.LOGOUT:
		case Types.ADDITIONAL_DETAILS:
			return false;
		default:
			return state;
	}
};

const simultaneousLogin = (state = [], action) => {
	switch (action.type) {
		case Types.GET_LOGIN_HISTORIES:
			return action.data;
		case Types.GET_LOGIN_HISTORIES_FAILED:
			return [];
		default:
			return state;
	}
};

const simultaneousLoginMsg = (state = "", action) => {
	switch (action.type) {
		case Types.SIMULTANEOUS_LOGIN:
			return action.error;
		case Types.LOGIN_RESET:
		case Types.SET_LOGIN_DETAILS:
		case Types.SET_LOGIN_VERIFICATION:
		case Types.LOGGING_INPROGRESS:
		case Types.LOGIN_2FA_SUCCESS:
			return "";
		default:
			return state;
	}
};

const loggingOutDevices = (state = false, action) => {
	switch(action.type){
		case Types.IS_LOGGING_OUT_DEVICES:
			return true;
		case Types.LOGOUT_OTHER_DEVICES_SUCCESS:
		case Types.LOGOUT_OTHER_DEVICES_FAILED:
			return false;
		default:
			return state;
	}
}

const logoutOtherDevices = (state = false, action) => {
	switch (action.type) {
		case Types.LOGOUT_OTHER_DEVICES_SUCCESS:
			return true;
		case Types.LOGOUT_OTHER_DEVICES_FAILED:
		case Types.LOGGING_OUT_OTHER_DEVICES:
		case Types.LOGIN_FAILED:
		case Types.SIMULTANEOUS_LOGIN:
		case Types.BLOCKED_ACCESS:
			return false;
		default:
			return state;
	}
};

const blockAccess = (state = "", action) => {
	switch (action.type) {
		case Types.BLOCKED_ACCESS:
			return action.error;
		case Types.LOGIN_RESET:
		case Types.SET_LOGIN_DETAILS:
		case Types.SET_LOGIN_VERIFICATION:
		case Types.LOGGING_INPROGRESS:
		case Types.LOGIN_2FA_SUCCESS:
			return "";
		default:
			return state;
	}
};

const passwordExpired = (state = "", action) => {
	switch (action.type) {
		case Types.PASSWORD_EXPIRED:
			return action.error;
		case Types.LOGIN_RESET:
		case Types.SET_LOGIN_DETAILS:
		case Types.SET_LOGIN_VERIFICATION:
		case Types.LOGGING_INPROGRESS:
		case Types.LOGIN_2FA_SUCCESS:
			return "";
		default:
			return state;
	}
}

const isChangingPassword = (state = false, action) => {
	switch (action.type) {
		case Types.CHANGING_EXPIRED_PASSWORD:
			return true;
		case Types.CHANGE_EXPIRED_PASSWORD_SUCCESS:
		case Types.CHANGE_EXPIRED_PASSWORD_FAILED:
		case Types.LOGGING_INPROGRESS:
			return false;
		default:
			return state;
	}
}

const ChangePasswordSuccess = (state = false, action) => {
	switch(action.type) {
		case Types.CHANGE_EXPIRED_PASSWORD_SUCCESS:
			return true;
		default:
			return state;
	}

}

const ChangePasswordFailed = (state = false, action) => {
	switch(action.type) {
		case Types.CHANGE_EXPIRED_PASSWORD_FAILED:
			return action.error;
		case Types.LOGIN_RESET:
		case Types.CHANGING_EXPIRED_PASSWORD:
			return false;
		default:
			return state;
	}

}


export default combineReducers({
	inputLoginDetails,
	isLoggingIn,
	isLoggedIn,
	isFailed,
	is2FALogin,
	login2FACodeInput,
	session,
	additionalDetails,
	currentLogin,
	currentAccount,
	isAccountNotVerified,
	getAccountInfos,
	gettingAdditionDetails,
	logInWithFb,
	isLoggingInWithFb,
	failLogInWithFb,
	isAvailable,
	isLoggingInWithFb2,
	LoggedInWithFb2Failed,
	accounts,
	isAccountVerifiedByAdmin,
	isLocationVerifiedByAdmin,
	getCurrentEmployee,
	notYetGetCurrentEmployee,
	isUserOutletActive,
	isResendCode,
	isLoadDetails,
	getKYCVerification,
	isUnauthorized,
	simultaneousLogin,
	logoutOtherDevices,
	OTPFailed,
	simultaneousLoginMsg,
	blockAccess,
	passwordExpired,
	isChangingPassword,
	ChangePasswordSuccess,
	ChangePasswordFailed,
	loggingOutDevices,
});
