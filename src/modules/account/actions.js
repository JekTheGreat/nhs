/* eslint-disable */
/* eslint-disable no-empty */
import cryptojs from "crypto-js";
import bcrypt from "react-native-bcrypt";
import { isBase64 } from "validator";
import moment from "moment";
import {Alert} from "react-native";
import * as globals from "__src/globals";
import APICALL from "__src/api/index";
import * as Types from "./types";
import _ from "lodash";

export const setPhoneScreen = (data) => ({
	type: Types.SET_PHONE_SCREEN,
	data,
});

export const setEmailScreen = (data) => ({
	type: Types.SET_EMAIL_SCREEN,
	data,
});

export const setEmailInput = (data) => ({
	type: Types.ACCOUNT_SET_EMAIL_INPUT,
	data,
});

export const setPasswordInput = (data) => ({
	type: Types.ACCOUNT_SET_PASSWORD_INPUT,
	data,
});

export const setTransactionPinInput = (data) => ({
	type: Types.ACCOUNT_SET_TRANSACTIONPIN_INPUT,
	data,
});
export const setMobileInput = (data) => ({
	type: Types.ACCOUNT_SET_MOBILE_INPUT,
	data,
});

export const resetPasswordState = () => ({
	type: Types.RESET_PASSWORD_STATE,
});

export const resetTransPinState = () => ({
	type: Types.RESET_TRANSACTIONPIN_STATE,

});

// reset new email data
export const resetNewEmailData = () => ({
	type: Types.VERIFY_EMAIL_RESET,
});

export const resetNewEmailState = () => ({
	type: Types.RESET_INPUT_STATE,
});
export const proceedToNextSection = (section) => (
	(dispatch) => {
		dispatch(setEmailScreen(section));
	}
);
// reset new Phone data
export const resetNewPhoneData = () => ({
	type: Types.PHONE_NUMBER_DATA_RESET,
});
export const resetNewPhoneState = () => ({
	type: Types.RESET_STATE,
});
export const proceedToNextStep = () => (
	(dispatch) => {
		dispatch(setPhoneScreen("confirmPhone"));
	}
);

/*eslint-disable*/
export const checkPassword = (password, userId, type) => (
	async (dispatch) => {
		try {
			if (type === "changeEmail") {
				dispatch({ type: Types.CHECKING_EMAIL_PASSWORD });
			} else {
				dispatch({ type: Types.CHECKING_MOBILE_PASSWORD });
			}

			const result = {};

			password = cryptojs.enc.Utf8.parse(password);
			password = cryptojs.enc.Base64.stringify(password);

			if (isBase64(password)) {
				password = cryptojs.enc.Base64.parse(password);
				password = cryptojs.enc.Utf8.stringify(password);
			}

			const isCorrectPass = await bcrypt.compareSync(password, result.password);

			if (type === "changeEmail") {
				if (isCorrectPass) {
					dispatch({
						type: Types.ACCOUNT_EMAIL_PASSWORD_CORRECT,
					});
					dispatch(setEmailScreen("confirmEmail"));
				} else {
					dispatch({
						type: Types.ACCOUNT_CHANGE_EMAIL_INCORRECT_PASS,
					});
				}
			} else if (type === "changePhone") {
				if (isCorrectPass) {
					dispatch({
						type: Types.ACCOUNT_MOBILE_PASSWORD_CORRECT,
					});
					// dispatch(setPhoneScreen("confirmPhone"));
				} else {
					dispatch({
						type: Types.ACCOUNT_MOBILE_PASSWORD_INCORRECT,
					});
				}
			}
		} catch (err){
			dispatch({
				type: Types.ACCOUNT_MOBILE_PASSWORD_INCORRECT,
				err
			});
		}
	}
);


/*eslint-disable*/
export const checkTransPin = (password, userId, type) => (
	async (dispatch) => {
		try {
			if (type === "changeEmail") {
				dispatch({ type: Types.CHECKING_EMAIL_TRANSPIN });
			} else {
				dispatch({ type: Types.CHECKING_MOBILE_TRANSPIN });
			}

			const result = {};

			password = cryptojs.enc.Utf8.parse(password);
			password = cryptojs.enc.Base64.stringify(password);

			if (isBase64(password)) {
				password = cryptojs.enc.Base64.parse(password);
				password = cryptojs.enc.Utf8.stringify(password);
			}

			const isCorrectPass = await bcrypt.compareSync(password, result.password);

			if (type === "changeEmail") {
				if (isCorrectPass) {
					dispatch({
						type: Types.ACCOUNT_EMAIL_TRANSPIN_CORRECT,
					});
					dispatch(setEmailScreen("confirmEmail"));
				} else {
					dispatch({
						type: Types.ACCOUNT_CHANGE_EMAIL_INCORRECT_TRANSPIN,
					});
				}
			} else if (type === "changePhone") {
				if (isCorrectPass) {
					dispatch({
						type: Types.ACCOUNT_MOBILE_TRANSPIN_CORRECT,
					});
					// dispatch(setPhoneScreen("confirmPhone"));
				} else {
					dispatch({
						type: Types.ACCOUNT_MOBILE_TRANSPIN_INCORRECT,
					});
				}
			}
		} catch (err){
			dispatch({
				type: Types.ACCOUNT_MOBILE_TRANSPIN_INCORRECT,
				err
			});
		}
	}
);

/* eslint-enable*/

export const sendChangePhoneCode = (data, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.SENDING_CHANGE_PHONE_CODE });

			const result = {};

			if (result){
				dispatch({
					type: Types.ACCOUNT_PHONE_CODE_SUCCESS,
				});
				dispatch(setPhoneScreen("codeForm"));
			}
		} catch (err) {}
	}
);

export const sendChangePhoneEmailCode = (email, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.SENDING_CHANGE_PHONE_CODE });

			const result = {};

			if (result){
				dispatch({
					type: Types.ACCOUNT_PHONE_CODE_SUCCESS,
				});
				dispatch(setPhoneScreen("emailCodeForm"));
			}
		} catch (err){
		}
	}
);
export const confirmPhoneCode = (data, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.ACCOUNT_CHANGE_PHONE_PROGRESS });

			const getCode = {};

			if (JSON.stringify(getCode.verificationCode) !== data.code){
				dispatch({
					type: Types.ACCOUNT_CHANGE_MOBILE_INVALID,
					data: "Invalid code.",
				});
			} else if (getCode.verificationExpiresAt < +moment()){
				dispatch({
					type: Types.ACCOUNT_CHANGE_MOBILE_INVALID,
					data: "Verification already expired.",
				});
			} else {
				dispatch({
					type: Types.ACCOUNT_CHANGE_PHONE_SUCCESS,
				});
				dispatch(setPhoneScreen("confirmEmailPhone"));
			}
		} catch (err) {
		}
	}
);

export const changePhone = (data, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.ACCOUNT_CHANGE_PHONE_PROGRESS });

			const getCode = {};

			if (JSON.stringify(getCode.verificationCode) !== data.code){
				dispatch({
					type: Types.ACCOUNT_CHANGE_MOBILE_INVALID,
					data: "Invalid code.",
				});
			} else if (getCode.verificationExpiresAt < +moment()){
				dispatch({
					type: Types.ACCOUNT_CHANGE_MOBILE_INVALID,
					data: "Verification already expired.",
				});
			} else {
				const result = {};

				if (result){
					dispatch({
						type: Types.ACCOUNT_CHANGE_MOBILE_SUCCESS,
						data: result,
					});
				}
			}
		} catch (err) {
		}
	}
);

/* eslint-disable max-statements */
export const getUserEmailAndMobile = (changePasswordInput, changeTransPinInput) => (
	async (dispatch) => {
		if (changeTransPinInput){
			try {
				dispatch({ type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_USERINFO_PROGRESS });
				// const result =
				let userFound;
				try {
					userFound = {};
				} catch (err) {
					// dispatch user not found error
				}
				console.log("userFound", userFound);
				changeTransPinInput.confirmPin =
					cryptojs.enc.Utf8.parse(changeTransPinInput.confirmPin);
				changeTransPinInput.confirmPin =
					cryptojs.enc.Base64.stringify(changeTransPinInput.confirmPin);
				if (isBase64(changeTransPinInput.confirmPin)) {
					changeTransPinInput.confirmPin =
						cryptojs.enc.Base64.parse(changeTransPinInput.confirmPin);
					changeTransPinInput.confirmPin =
						cryptojs.enc.Utf8.stringify(changeTransPinInput.confirmPin);
				}
				const isCorrectPass = await bcrypt.compareSync(
					changeTransPinInput.confirmPin, userFound.password);
				console.log("isCorrectPass", isCorrectPass);
				if (isCorrectPass) {
					if (changeTransPinInput.pin){
						dispatch({
							type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SUCCESS_NEWTRANSACTIONPIN,
						});
						dispatch({
							type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_USERINFO_SUCCESS,
							data: userFound,
						});
						dispatch(setChangeTransPinScreen("sendCodeForm"));
					} else {
						dispatch({
							type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_INCORRECT_NEWTRANSACTIONPIN,
						});
					}
				} else {
					dispatch({
						type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_INCORRECT_PASS,
					});
				}
			} catch (e) {
				dispatch({ type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_USERINFO_FAILED, e });
			}

		} else {
			try {
				dispatch({ type: Types.ACCOUNT_CHANGE_PASSWORD_USERINFO_PROGRESS });
				let userFound;
	
				try {
					userFound = {};
				} catch (err) {
					// dispatch user not found error
				}
				console.log("userFound", userFound);
				changePasswordInput.currentPassword =
					cryptojs.enc.Utf8.parse(changePasswordInput.currentPassword);
				changePasswordInput.currentPassword =
					cryptojs.enc.Base64.stringify(changePasswordInput.currentPassword);
				if (isBase64(changePasswordInput.currentPassword)) {
					changePasswordInput.currentPassword =
						cryptojs.enc.Base64.parse(changePasswordInput.currentPassword);
					changePasswordInput.currentPassword =
						cryptojs.enc.Utf8.stringify(changePasswordInput.currentPassword);
				}
				const isCorrectPass = await bcrypt.compareSync(
					changePasswordInput.currentPassword, userFound.password);
				console.log("isCorrectPass", isCorrectPass);
				if (isCorrectPass) {
					if (changePasswordInput.retypeNewPassword && changePasswordInput.newPassword){
						if (changePasswordInput.retypeNewPassword === changePasswordInput.newPassword){
							dispatch({
								type: Types.ACCOUNT_CHANGE_PASS_SUCCESS_NEWPASS,
							});
							dispatch({
								type: Types.ACCOUNT_CHANGE_PASSWORD_USERINFO_SUCCESS,
								data: userFound,
							});
							dispatch(setChangePasswordScreen("sendCodeForm"));
						} else {
							dispatch({
								type: Types.ACCOUNT_CHANGE_PASS_INCORRECT_NEWPASS,
							});
						}
					}
				} else {
					dispatch({
						type: Types.ACCOUNT_CHANGE_PASSWORD_INCORRECT_PASS,
					});
				}
			} catch (e) {
				dispatch({ type: Types.ACCOUNT_CHANGE_PASSWORD_USERINFO_FAILED, e });
			}
		}
	}
);

export const changePasswordSendCode = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.ACCOUNT_CHANGE_PASS_SENDING_CODE });

			const response = await APICALL.callPost("/users/requests/change/password", params, token);

			dispatch(setChangePasswordScreen("codeForm"));
		} catch (err){
			dispatch({ type: Types.ACCOUNT_CHANGE_PASS_SENDING_CODE_FAILED, err });
		}
	}
);

export const changeTransPinSendCode = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SENDING_CODE });

			const response = await APICALL.callPost("/users/pins", params, token);

			dispatch(setChangeTransPinScreen("codeTransPinForm"));
		} catch (err){
			dispatch({ type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SENDING_CODE_FAILED, err });
		}
	}
);

export const changePassword = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.ACCOUNT_CHANGE_PASSSWORD_PROGRESS });

			const response = await APICALL.callPatch("/users/requests/change/password", params, token);

			if (response){
				dispatch({
					type: Types.ACCOUNT_CHANGE_PASSWORD_SUCCESS,
					data: response,
				});
			}
		} catch (e) {
			dispatch({ type: Types.ACCOUNT_CHANGE_PASSWORD_FAILED, error: e.message || "Invalid code!" });
		}
	}
);

export const changeTransPin = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_PROGRESS });

			const response = await APICALL.callPatch("/users/pins", params, token);

			if (response){
				dispatch({
					type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SUCCESS,
					data: response,
				});
			}
		} catch (e) {
			dispatch({ type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_FAILED, error: e.message || "Invalid code!" });
		}
	}
);

export const saveCodeChangePass = (data) => ({
	type: Types.ACCOUNT_CHANGE_PASSWORD_CODE,
	data,
});

export const saveCodeChangeTransPin = (data) => ({
	type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_CODE,
	data,
});

export const resetChangePass = () => ({
	type: Types.ACCOUNT_CHANGE_PASSWORD_RESET,
});

export const resetChangeTransPin = () => ({
	type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET,
});

export const resetChangeEmail = () => ({
	type: Types.ACCOUNT_CHANGE_EMAIL_RESET,
});

export const resetChangeMobile = () => ({
	type: Types.ACCOUNT_CHANGE_MOBILE_RESET,
});

export const setChangePasswordScreen = (screen) => ({
	type: Types.SET_CHANGE_PASSWORD_SCREEN,
	data: screen,
});
export const setChangeTransPinScreen = (screen) => ({
	type: Types.SET_CHANGE_TRANSACTIONPIN_SCREEN,
	data: screen,
});

export const changePasswordSaveRadio = (data) => ({
	type: Types.ACCOUNT_CHANGE_PASSWORD_SAVE_RADIO,
	data,
});
export const changeTransPinSaveRadio = (data) => ({
	type: Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SAVE_RADIO,
	data,
});

export const set2FA = (data, userId) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.SETTING_CHANGE_2FA_INPROGRESS,
			});

			const result = {};

			if (result){
				dispatch({
					type: Types.SETTING_CHANGE_2FA_SUCCESS,
					data: result,
				});
			}
		} catch (err){
			dispatch({
				type: Types.SETTING_CHANGE_2FA_FAILED,
			});
		}
	}
);

export const setSettingsScreen = (screen) => ({
	type: Types.SET_ACCOUNT_SCREEN,
	data: screen,
});

export const getLoginHistory = (userId, offset) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.SETTING_DEVICE_INPROGRESS,
			});
			const result = {};

			dispatch({
				type: Types.SETTING_HISTORY_SUCCESS,
				data: result,
			});
		} catch (err){
			dispatch({
				type: Types.SETTING_HISTORY_FAILED,
			});
		}
	}
);

export const seeMoreLoginHistory = (userId, offset) => (
	async (dispatch) => {
		try {
			const result = {};

			dispatch({
				type: Types.SETTING_HISTORY_SEE_MORE,
				data: result.rows,
			});
		} catch (err) {
			dispatch({
				type: Types.SETTING_HISTORY_FAILED,
			});
		}
	}
);

export const resetLoginHistory = () => ({
	type: Types.SETTING_HISTORY_RESET,
});

export const getDevices = (userId) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.SETTING_DEVICE_INPROGRESS,
			});
			const result = {};

			dispatch({
				type: Types.SETTING_DEVICE_SUCCESS,
				data: result.rows,
			});
		} catch (err){
			dispatch({
				type: Types.SETTING_DEVICE_FAILED,
				err,
			});
		}
	}
);

export const removeDevice = (deviceId) => (
	async (dispatch) => {
		try {
			const result = {};

			if (result){
				dispatch({
					type: Types.SETTING_DEVICE_REMOVED,
					data: deviceId,
				});
			}
		} catch (err){
			// fail silently
		}
	}
);

export const getIdToRemove = (deviceId) => (
	async (dispatch) => {
		try {
			const result = {};

			if (result){
				dispatch({
					type: Types.SELECTED_DEVICE_TO_REMOVE,
					data: result,
				});
			}
		} catch (e){

		}
	}
);

export const setLoginAlertProgress = (type) => (
	(dispatch) => {
		if (type === "EMAIL"){
			dispatch({
				type: Types.SETTING_LOGIN_ALERT_EMAILINPROGRESS,
			});
		} else {
			dispatch({
				type: Types.SETTING_LOGIN_ALERT_SMSINPROGRESS,
			});
		}
	}
);

export const setLoginAlert = (userId, value) => (
	async (dispatch) => {
		try {
			const result = {};
			if (result){
				dispatch({
					type: Types.SETTING_LOGIN_ALERT_SUCCESS,
					data: result,
				});
			}
		} catch (err){
		}
	}
);

export const enableEmailAlert = (userId, isEnable) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.ENABLE_LOGIN_ALERT_EMAILINPROGRESS,
			});

			const result = {};

			if (result) {
				dispatch({
					type: Types.ENABLE_LOGIN_ALERT_EMAIL_SUCCESS,
					data: result,
				});
			} else {
				dispatch({
					type: Types.ENABLE_LOGIN_ALERT_EMAIL_FAILED,
				});
			}
		} catch (e) {
			dispatch({
				type: Types.ENABLE_LOGIN_ALERT_EMAIL_FAILED,
			});
		}
	}
);

export const enableSMSAlert = (userId, isEnable) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.ENABLE_LOGIN_ALERT_SMSINPROGRESS,
			});

			const result = {};

			if (result) {
				dispatch({
					type: Types.ENABLE_LOGIN_ALERT_SMS_SUCCESS,
					data: result,
				});
			} else {
				dispatch({
					type: Types.ENABLE_LOGIN_ALERT_SMS_FAILED,
				});
			}
		} catch (e) {
			dispatch({
				type: Types.ENABLE_LOGIN_ALERT_SMS_FAILED,
			});
		}
	}
);


/* change email */
// change email - validate if email is existing
export const validateNewEmail = (userEmail) => (
	async (dispatch) => {
		try {

			dispatch({ type: Types.IS_VALIDATING_EMAIL});

			const result = {};

			if (result) {
				dispatch({ type: Types.EMAIL_NOT_AVAILABLE });
				dispatch({ type: Types.IS_VALIDATING_EMAIL_DONE});
			}
		} catch (e) {
			dispatch({ type: Types.EMAIL_AVAILABLE });
			dispatch({ type: Types.IS_VALIDATING_EMAIL_DONE});
		}
	}
);

export const sendChangeEmailCode = (data, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.SENDING_CHANGE_EMAIL_CODE });

			const result = {};

			if (result){
				dispatch({
					type: Types.ACCOUNT_EMAIL_CODE_SUCCESS,
				});
				dispatch(setEmailScreen("codeEmail"));
			}
		} catch (err) {
			dispatch({ type: Types.SEND_CHANGE_EMAIL_CODE_FAILED });
		}
	}
);
export const resendEmailCode = (data, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.RESEND_CHANGE_EMAIL_CODE });

			const result = {};

			if (result){
				dispatch({
					type: Types.RESEND_CHANGE_EMAIL_CODE_SUCCESS,
				});
				dispatch(setEmailScreen("codeEmail"));
			}
		} catch (err) {
			dispatch({ type: Types.RESEND_CHANGE_EMAIL_CODE_FAIL });
		}
	}
);

export const sendChangeEmailMobileCode = (mobile, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.SENDING_CHANGE_EMAIL_CODE });

			const result = {};

			if (result){
				dispatch({
					type: Types.ACCOUNT_EMAIL_CODE_SUCCESS,
				});
				dispatch(setEmailScreen("codeMobileEmail"));
			}
		} catch (err) {
			dispatch({ type: Types.SEND_CHANGE_EMAIL_CODE_FAILED });
		}
	}
);
export const resendMobileCode = (mobile, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.RESENDING_CHANGE_EMAIL_CODE });

			const result = {};

			if (result){
				dispatch({
					type: Types.RESENDING_CHANGE_EMAIL_CODE_SUCCESS,
				});
				dispatch(setEmailScreen("codeMobileEmail"));
			}
		} catch (err) {
			dispatch({ type: Types.RESENDING_CHANGE_EMAIL_CODE_FAIL });
		}
	}
);


export const changeEmail = (data, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.ACCOUNT_CHANGE_EMAIL_PROGRESS });

			const getCode = {};

			if (JSON.stringify(getCode.verificationCode) !== data.code){
				dispatch({
					type: Types.ACCOUNT_CHANGE_EMAIL_INVALID,
					data: "Invalid code.",
				});
			} else if (getCode.verificationExpiresAt < +moment()){
				dispatch({
					type: Types.ACCOUNT_CHANGE_EMAIL_INVALID,
					data: "Verification already expired.",
				});
			} else {
				const result = {};

				if (result){
					dispatch({
						type: Types.ACCOUNT_CHANGE_EMAIL_SUCCESS,
						data: result,
					});
				}
			}
		} catch (err) {
			dispatch({
				type: Types.ACCOUNT_CHANGE_EMAIL_FAILED,
			});
		}
	}
);

export const confirmEmailCode = (data, userId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.ACCOUNT_CHANGE_EMAIL_PROGRESS });

			const getCode = {};

			if (JSON.stringify(getCode.verificationCode) !== data.code){
				dispatch({
					type: Types.ACCOUNT_CHANGE_EMAIL_INVALID,
					data: "Invalid code.",
				});
			} else if (getCode.verificationExpiresAt < +moment()){
				dispatch({
					type: Types.ACCOUNT_CHANGE_EMAIL_INVALID,
					data: "Verification already expired.",
				});
			} else {
				dispatch({ type: Types.BUTTON_LOAD_STOP });
				dispatch(setEmailScreen("confirmMobileEmail"));
			}
		} catch (err) {
			dispatch({
				type: Types.ACCOUNT_CHANGE_EMAIL_FAILED,
			});
		}
	}
);

// this is for changing new phone number
export const validateNewPhone = (PhoneNumber) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.PHONENUMBER_IS_VALIDATING });

			const result = {};

			if (result) {
				dispatch({ type: Types.PHONE_NUMBER_NOT_AVAILABLE });
				dispatch({ type: Types.PHONENUMBER_IS_VALIDATING_DONE});
			}
		} catch (e) {
			dispatch({ type: Types.PHONE_NUMBER_AVAILABLE });
			dispatch({ type: Types.PHONENUMBER_IS_VALIDATING_DONE});
		}
	}
);

export const setCurrentScreen = (screen) => ({
	type: Types.SET_CURRENT_SCREEN,
	data: screen,
});
