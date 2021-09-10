/* eslint-disable */
import _ from "lodash";
import cryptojs from "crypto-js";
import bowser from "bowser";
import * as Types from "./types";
import * as globals from "__src/globals";
import API from "__src/api/index";
import UserAgent from "react-native-user-agent";
import AsyncStorage from '@react-native-community/async-storage';

global.navigator = {
	userAgent: 'node',
}

export const setLoginDetails = (data) => ({
	type: Types.SET_LOGIN_DETAILS,
	data,
});

export const setVerificationCode = (data) => ({
	type: Types.SET_LOGIN_VERIFICATION,
	data,
});

export const reset2FALogin = () => ({
	type: Types.LOGIN_2FA_RESET,
});

export const resetVerification = () => ({
	type: Types.LOGIN_RESET_VERIFICATION,
});

export const resetLogin = () => ({
	type: Types.LOGIN_RESET,
});

export const setProfileScreen = (screen = "accountVerification") => ({
	type: Types.SET_CURRENT_SCREEN,
	data: screen,
});

export const resetChecking = () => ({
	type: Types.RESET_CHECKING,
});

export const login = (params, token, navigation) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.LOGGING_INPROGRESS });

			const result = await API.login(params, token);
			
			if (result) {
				// if (result.authType === "2SV" || result.authType === "VRC") {
				// 	dispatch({ type: Types.LOGIN_2FA });
				// } else if (result.authType === "STANDARD") {
				// 	navigation.navigate("Home");
				// }
				// dispatch({ type: Types.LOGIN_SUCCESS, data: result });

				if (result.authType === "STANDARD" || result.authType === "VRC") {
					dispatch({ type: Types.LOGIN_2FA });
				} else if (result.authType === "STANDARD") {
					navigation.navigate("Home");
				}
				dispatch({ type: Types.LOGIN_SUCCESS, data: result });
			}

		} catch (err) {
			if (err.message == "Oops! You’re currently logged in on another device. Do you want to logout?") {
				dispatch({ type: Types.SIMULTANEOUS_LOGIN, error: err.message });
			} else if (err.message == "Oops! You have reached the maximum login attempts, please reset your password to regain your access.") {
				dispatch({ type: Types.BLOCKED_ACCESS, error: err.message });
			} else if (err.message == "Your password has expired and must be changed."){
				dispatch({ type: Types.PASSWORD_EXPIRED, error: err.token});
			} else {
				dispatch({ type: Types.LOGIN_FAILED, error: err.message });
			}
		}
	}
);

export const usernameOTPLogin = (params, token, routes) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.LOGGING_INPROGRESS });

			globals.setToken(token);
			const result = await API.callPost(routes, params);

			console.log("usernameOTPLogin", result)
			if (result) {
				dispatch(reset2FALogin());
				dispatch({ type: Types.LOGIN_SUCCESS, data: result });
			}
		} catch (e) {
			dispatch({ type: Types.OTP_FAILED, error: JSON.stringify(e.message) || "Something went wrong (Code 5)" });
		}
	}
);

export const resendOTP = (token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.RESEND_VERIFICATION_CODE });

			globals.setToken(token)
			const result = await API.callPost("/codes/resend-2sv", {});

			dispatch({ type: Types.DONE_RESEND_VERIFICATION_CODE, data: result });
		} catch (e) {
			dispatch({ type: Types.FAIL_RESEND_VERIFICATION_CODE, error: JSON.stringify(e.message) || "Something went wrong (Code 4)" });
		}
	}
);

export const getUserAccount = (token) => (
	async (dispatch) => {
		try {

			globals.setToken(token);
			const result = await API.callGet("/accounts/me");
			
			if (result) {
				const data = { id: result.accountNumber };

				dispatch({ type: Types.LOGIN_SET_CURRENT_ACCOUNT, data });
			}
		} catch (e) {
		}
	}
);

export const getAdditionalDetails = (session, navigation) => (
	async (dispatch) => {
		try {

			if (navigation) {
				dispatch({ type: Types.ADDITIONAL_DETAILS_LOAD });
			}

			globals.setToken(session.token);
			const result = await API.callGet("/profiles/me");

			if (result) {
				if (!result.individual.gender && !result.individual.streetAddress && navigation) {
					navigation.navigate("Verification", { title: "Verification" });
				} else if (!result.individual.mobile && navigation) {
					navigation.navigate("Verification", { title: "Verification" });
				}

				dispatch({ type: Types.ADDITIONAL_DETAILS, data: result });
			}
		} catch (e) {
			if (e.message === "Unauthorized" && e.severity === "INFO") {
				// dispatch({ type: Types.SET_UNAUTHORIZED });
			}
			console.log(e);
		}
	}
);

export const getKYCVerification = (token) => (
	async (dispatch) => {
		try {
			globals.setToken(token);
			const kyc1 = await API.callGet("/individuals/me/requirements/verifyId");
			const kyc2 = await API.callGet("/individuals/me/requirements/verifyAddress");

			if (kyc1) {
				dispatch({ type: Types.GET_KYC_1, data: { kyc1 } });
			}

			if (kyc2) {
				dispatch({ type: Types.GET_KYC_2, data: { kyc2 } });
			}
		} catch (e) {
			console.log(e);
		}
	}
);

export const getUserInfo = (userId) => (
	async (dispatch) => {
		try {
			const result = {}

			dispatch({
				type: Types.LOGIN_SET_SESSION_USER,
				data: result,
			});
		} catch (err) {
			// catch silently
		}
	}
);

export const checkFb = (fbCredentials, type) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.LOGGING_IN_WITH_FB, data: fbCredentials });

			const result = {}

			console.log("checkFb", result);

			if (!_.isEmpty(result) && !_.isString(result)) {
				dispatch(loginWithFacebook1(fbCredentials, type));
			} else if (fbCredentials.id) {
				dispatch({ type: Types.LOGIN_FB_FAILED });
			}
		} catch (e) {
			if (fbCredentials.id) {
				dispatch({ type: Types.LOGIN_FB_FAILED, e });
			}
		}
	}
);

export const checkImportantDetails = (type, value) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_CHECKING, data: { [type]: "loading" } });

			const result = {}

			if (!_.isEmpty(result) && !_.isString(result) && !result.length) {
				dispatch({ type: Types.DONE_CHECKING, data: { [type]: "close-circle-o" } });
			} else {
				dispatch({ type: Types.FAIL_CHECKING, data: { [type]: "check-circle-o" } });
			}
		} catch (e) {
			dispatch({ type: Types.FAIL_CHECKING, data: { [type]: "check-circle-o" } });
		}
	}
);

export const loginWithFacebook1 = (fbCredentials, type) => (
	async (dispatch) => {
		try {
			const browser = bowser.getParser(window.navigator.userAgent || UserAgent.getUserAgent());
			const userTechData = browser.parse();
			const utf8newAccesstoken = cryptojs.enc.Utf8.parse(fbCredentials.accessToken);
			const encryptednewAccesstoken = cryptojs.enc.Base64.stringify(utf8newAccesstoken);
			const body = await API.ipinfo();

			try {
				const result = {}

				if ((!_.isEmpty(result) && !_.isString(result)) || result.hasOwnProperty("errors")) {
					dispatch({ type: Types.LOGIN_SUCCESS, data: result });
					AsyncStorage.setItem("accessToken", JSON.stringify(result.accessToken));
					dispatch(getCurrentLogin(result.userId || {}));
				} else {
					dispatch({ type: Types.LOGIN_FB2_FAILED });
				}
			} catch (err) {
				dispatch({ type: Types.LOGIN_FB2_FAILED, err });
			}

		} catch (e) {
			dispatch({ type: Types.LOGIN_FB2_FAILED, e });
		}
	}
);

export const loginWithFacebook2 = (fbCredentials, type, values) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.LOGGING_IN_WITH_FB2 });

			const browser = bowser.getParser(window.navigator.userAgent || UserAgent.getUserAgent());
			const userTechData = browser.parse();
			const utf8newAccesstoken = cryptojs.enc.Utf8.parse(fbCredentials.accessToken);
			const encryptednewAccesstoken = cryptojs.enc.Base64.stringify(utf8newAccesstoken);
			const body = await API.ipinfo();

			const params = {};
			params.accessToken = utf8newAccesstoken;
			params.provider = "facebook";

			try {
				const result = await API.callPost("/users/social-login", params);

				if ((!_.isEmpty(result) && !_.isString(result)) || result.hasOwnProperty("errors")) {
					dispatch({ type: Types.LOGIN_SUCCESS, data: result });
					AsyncStorage.setItem("accessToken", JSON.stringify(result.accessToken));
					dispatch(getCurrentLogin(result.userId || {}));
				} else {
					dispatch({ type: Types.LOGIN_FB2_FAILED });
				}
			} catch (err) {
				dispatch({ type: Types.LOGIN_FB2_FAILED, err });
			}

		} catch (e) {
			dispatch({ type: Types.LOGIN_FB2_FAILED, e });
		}
	}
);

export const loginWithFacebook3 = () => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.LOGGING_IN_WITH_FACEBOOK });

			const result = {};
		} catch {

		}
	}
);

export const getAdditionalDetails2 = (username) => (
	async (dispatch) => {
		try {
			const result = {}

			if (!_.isEmpty(result) && !_.isString(result)) {
				dispatch({ type: Types.ADDITIONAL_DETAILS, data: result });
			}
		} catch (e) {
		}
	}
);

export const getCurrentLogin = (userId) => (
	async (dispatch) => {
		try {

			const result = {}

			dispatch({
				type: Types.LOGIN_SET_CURRENT_LOGIN,
				data: _.isEmpty(result.rows[0]) ? {} : result.rows[0],
			});
		} catch (err) {
		}
	}
);

export const getLoginHistories = (params) => (
	async (dispatch) => {
		try {

			const result = await API.callGet(`/users/histories?email=${params}`);

			if (!_.isEmpty(result)) {
				dispatch({ type: Types.GET_LOGIN_HISTORIES, data: result });
			}
		} catch (err) {
			dispatch({ type: Types.GET_LOGIN_HISTORIES_FAILED });
		}

	}
);

export const logoutOtherDevices = (params) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_LOGGING_OUT_DEVICES});

			const result = await API.callPost("/users/logout/", params);

			if (result) {
				dispatch({ type: Types.LOGOUT_OTHER_DEVICES_SUCCESS, data: result });
			}
		} catch (e) {
			dispatch({ type: Types.LOGOUT_OTHER_DEVICES_FAILED });
		}
	}
);

export const changeExpiredPassword = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.CHANGING_EXPIRED_PASSWORD});

			const result = await API.callPatch("/users/requests/change/expired/password", params, token);

			if (result){
				dispatch({ type: Types.CHANGE_EXPIRED_PASSWORD_SUCCESS, data: result});
			}

		} catch (e) {
			dispatch({ type: Types.CHANGE_EXPIRED_PASSWORD_FAILED, error: e.message});
		}
	}
);
