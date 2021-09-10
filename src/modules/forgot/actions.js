import moment from "moment";

import _ from "lodash";
import * as Types from "./types";
import * as globals from "__src/globals";
import API from "__src/api/index";
import validator from "validator";

global.navigator = {
	userAgent: 'node',
 }

export const saveInput = (data) => ({
	type: Types.SAVE_INPUT,
	data,
});

export const inputDetailsFP = (data) => ({
	type: Types.SET_FORGOT_INPUT_DETAILS,
	data,
});

export const sendCode = (params) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.SENDING_CODE});

			const result = await API.callPost("/users/requests/forgot/password", params);
			
			if(result){
				dispatch({ type: Types.SEND_CODE_SUCCESSFUL, data: result});
			}

		} catch (e) {
			dispatch({ type: Types.SEND_CODE_FAILED, error: e});
			console.log("error: ", e.message || e);
		}
	}
);

export const verifyOTP = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.VERIFYING_OTP});

			const result = await API.callPost("/users/requests/verify/forgot/password", params, token);
			
			if(result) {
				dispatch ({ type: Types.OTP_VERIFICATION_SUCCESSFUL, data: result});
			}
		} catch (e) {
			dispatch ({ type: Types.OTP_VERIFICATION_FAILED, error: e.message});
		}
	}
);

export const setNewPassword = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.SET_PASSWORD_INPROGRESS});

			const result = await API.callPatch("/users/requests/forgot/password", params, token);

			if(result){
				dispatch({ type: Types.SET_PASSWORD_SUCCESS, data: result});
			}

		} catch (e) {
			dispatch({ type: Types.SET_PASSWORD_FAILED, error: e});
		}
	}
);

export const checkUser = (data) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.FORGOTUSERNAME_USER_INPROGRESS,
			});
			if (!isNaN(data) && data.startsWith("0")){
				data = data.replace("0", "+63");
			}
			const result = {};

			if (result){
				console.log("RESULT", result);
				dispatch(forgotUsername(data, result.id));
			}
		} catch (err){
			dispatch({
				type: Types.FORGOTUSERNAME_USER_FAILED,
			});
		}
	}
);

export const forgotUsername = (userEmail, userId) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.FORGOTUSERNAME_SENDING,
			});

			let result;

			if (validator.isEmail(userEmail)){
				result = {};
			} else {
				result = {};
			}

			if (result){
				dispatch({
					type: Types.FORGOTUSERNAME_SUCCESS,
				});
			}
		} catch (err) {
			dispatch({
				type: Types.FORGOTUSERNAME_FAILED,
			});
		}
	}
);

export const reset = () => ({
	type: Types.FORGOTUSERNAME_RESET,
});

export const resetData = () => ({
	type: Types.RESET_DATA,
});

export const setForgotPasswordScreen = (data) => ({
	type: Types.SET_FORGOT_PASSWORD_SCREEN,
	data,
});

export const saveUsername = (data) => ({
	type: Types.SAVE_USERNAME,
	data,
});

export const saveRadio = (data) => ({
	type: Types.SAVE_RADIO,
	data,
});

export const saveCode = (data) => ({
	type: Types.SAVE_CODE,
	data,
});

export const setPasswordInputs = (userInput) => ({
	type: Types.SET_PASSWORD_INPUTS,
	data: userInput,
});

export const getUserEmailAndMobile = (params) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.FORGOTPASSWORD_USERINFO_INPROGRESS,
			});

			const result = await API.callPost("/users/requests/verify/email", params);
			
			if (result){
				dispatch({
					type: Types.FORGOTPASSWORD_USERINFO_SUCCESS,
					data: result,
				});
			}
		} catch (err){
			dispatch({
				type: Types.FORGOTPASSWORD_USERINFO_FAILED,
				error: err.message
			});
		}
	}
);

export const forgotPasswordEmail = (mobileEmail, id, type) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.FORGOTPASSWORD_VERIFICATION_SENDING,
			});

			let result;

			if (type === "email"){
				result = {};
			} else {
				result = {};
			}

			if (result){
				dispatch(setForgotPasswordScreen("codeForm"));
			}
		} catch (err){
			dispatch({
				type: Types.FORGOTPASSWORD_VERIFICATION_FAILED,
			});
		}
	}
);

export const resendCode = (mobileEmail, id, type) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.FORGOTPASSWORD_RESENDING_CODE,
			});

			let result;

			if (type === "email"){
				result = {};
			} else {
				result = {};
			}

			if (result){
				dispatch({ type: Types.FORGOTPASSWORD_RESEND_CODE_SUCCESS });
			} else {
				dispatch({
					type: Types.FORGOTPASSWORD_RESEND_CODE_FAILED,
				});
			}
		} catch (err){
			dispatch({
				type: Types.FORGOTPASSWORD_RESEND_CODE_FAILED,
			});
		}
	}
);

// export const sendCode = (params) => (
// 	async (dispatch) => {
// 		try {
// 			dispatch({ type: Types.FORGOTPASSWORD_CODE_VALIDATING });

// 			const result = {};

// 			if (JSON.stringify(result.verificationCode) !== code){
// 				dispatch({
// 					type: Types.FORGOTPASSWORD_CODE_INVALID,
// 					data: "Invalid code.",
// 				});
// 			} else if (result.verificationExpiresAt < +moment()){
// 				dispatch({
// 					type: Types.FORGOTPASSWORD_CODE_INVALID,
// 					data: "Verification already expired.",
// 				});
// 			} else {
// 				dispatch(setForgotPasswordScreen("resetForm"));
// 			}
// 		} catch (err){
// 			dispatch({
// 				type: Types.FORGOTPASSWORD_CODE_INVALID,
// 				data: "",
// 			});
// 		}
// 	}
// );

export const setUserPassword = (id, userDetails, code) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.FORGOTPASSWORD_INPROGRESS,
			});

			const result = {};

			if (result){
				dispatch({
					type: Types.FORGOTPASSWORD_SUCCESS,
				});
				dispatch(setForgotPasswordScreen("resetSuccess"));
			}
		} catch (err){
			dispatch({
				type: Types.FORGOTPASSWORD_FAILED,
			});
		}
	}
);
