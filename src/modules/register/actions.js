import _ from "lodash";
import * as Types from "./types";
import API from "__src/api/index";
import * as globals from "__src/globals";

export const setRegisterInput = (data) => ({
	type: Types.SET_REGISTER_DETAILS,
	data,
});

export const resetRegister = () => ({
	type: Types.REGISTER_RESET_INPUT,
});

export const summary = () => ({
	type: Types.REGISTER_SUMMARY,
});

export const currentStep = (data) => ({
	type: Types.SET_CURRENT_STEP, data,
});

export const resetSummary = () => ({
	type: Types.REGISTER_RESET_SUMMARY,
});

// export const register = (data) => (
// 	async(dispatch) => {
// 		try {
// 			dispatch({ type: Types.REGISTERING_INPROGRESS });

// 			const result = await API.callPost("/users/register", data);

// 			if (result) {
// 				dispatch({type: Types.LOGIN_2FA});

// 				dispatch({ type: Types.REGISTER_SUCCESS, data: result });
// 			}
// 		} catch (error) {
// 			dispatch({ type: Types.REGISTER_FAILED, error: JSON.stringify(error.message) || "Something went wrong (Code 1)"});
// 		}
// 	}
// );


export const reset2FAReg = () => ({
	type: Types.REG_2FA_RESET,
});

export const isEmailScreen = () => ({
	type: Types.REG_CHANGE_SCREEN,
});


export const register = (data) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.REGISTERING_INPROGRESS });

			const result = await API.callPost("/users/register", data);

			if (result) {
				dispatch({ type: Types.REG_2FA });
				dispatch({ type: Types.REGISTER_SUCCESS, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.REGISTER_FAILED, error });
		}
	}
);
export const resendCode = (token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.RESEND_CODE_PROGRESS });

			globals.setToken(token);
			const result = await API.callPatch("/codes/resend-registration", {});
			if (result) {
				dispatch({ type: Types.RESEND_CODE, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.RESEND_CODE_FAILED, error: JSON.stringify(error.message) || "Something went wrong (Code 2)" });
		}
	}
);

export const sendCode = (data, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.SEND_CODE_PROGRESS });

			globals.setToken(token);
			const result = await API.callPost("/codes/verify-registration", data);

			if (result) {
				dispatch({ type: Types.SEND_CODE, data: result });
				// dispatch({ type: Types.LOGIN_SUCCESS, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.SEND_CODE_FAILED, error: JSON.stringify(error.message) || "Something went wrong (Code 3)" });
		}
	}
);

export const resetRegisterFailed = () => ({
	type: Types.RESET_REGISTER_FAILED,
});

export const setCountryDial = (data) => ({
	type: Types.SET_COUNTRY_DIAL,
	data,
});

export const checkImportantDetails = (value, type) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.IS_CHECKING_IMPORTANT_DETAILS,
				data: { [type]: "Loading" },
			});

			const result = await globals.therion.ApiFactory.User.findOne({
				where: { [type]: value },
				options: { returning: true },
			});

			if (!_.isEmpty(result) && !_.isString(result) && !result.length) {
				dispatch({
					type: Types.DONE_CHECKING_IMPORTANT_DETAILS,
					data: { [type]: "Error" },
				});
			} else {
				dispatch({
					type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
					data: { [type]: "Validated" },
				});
			}
		} catch (e) {
			dispatch({
				type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
				data: { [type]: "Validated" },
				error: e,
			});
		}
	}
);

export const resetCheckImportantDetails = () => ({
	type: Types.RESET_CHECKING_IMPORTANT_DETAILS,
});
