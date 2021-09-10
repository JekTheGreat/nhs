import * as Types from "./types";
import {Alert} from "react-native";
import _ from "lodash";
import cryptojs from "crypto-js";

export const walletClick = () => ({
	type: Types.WALLET_CLICK,
});

export const setCounter = () => ({
	type: Types.SET_COUNTER_INTERS,
});

export const setServiceScreen = (screen) => ({
	type: Types.SERVICES_SET_SCREEN,
	data: screen,
});

export const setAddAccountInput = (data) => ({
	type: Types.SET_ADD_ACCOUNT_DETAILS,
	data,
});

export const resetAddAccountInput = () => ({
	type: Types.ADD_ACCOUNT_RESET_INPUT,
});

export const logout = () => (
	async (dispatch) => {
		dispatch({type: Types.LOGOUT});
	}
);

export const addAccount = (data, clientId) => (
	// eslint-disable-next-line max-statements
	async(dispatch) => {
		try {
			dispatch({
				type: Types.IS_ADDING_ACCOUNT,
			});

			const utf8newPin = cryptojs.enc.Utf8.parse(data.pin);
			const encryptednewPin = cryptojs.enc.Base64.stringify(utf8newPin);

			let newMobileNumber = data.mobileNumber;

			if ((newMobileNumber).startsWith("0")) {
				newMobileNumber = "+63".concat(newMobileNumber.slice(1, newMobileNumber.length));
			} else {
				newMobileNumber = "+63".concat(newMobileNumber);
			}

			const values = {
				accountNumber: data.accountId,
				trackingNumber: data.referenceId,
				mobile: newMobileNumber,
				pin: encryptednewPin,
				clientId,
			};

			// const values = {
			// 	accountNumber: data.accountId,
			// 	trackingNumber: data.referenceId,
			// 	mobile: data.mobileNumber,
			// 	pin: encryptednewPin,
			// 	clientId,
			// };

			if (data.accountType === "Dealer") {
				values.sponsorId = data.sponsor;
				values.uplineId = data.upline;
				values.position = data.position;
			}

			const result = {};

			if (result){
				dispatch({ type: Types.ADD_ACCOUNT_SUCCESS });
				dispatch({ type: Types.ACCOUNT_ADDED });
				dispatch({ type: Types.ADD_ACCOUNT_DONE });
				dispatch({ type: Types.NEWLY_ADDED_ACCOUNT, data: result });
			}
		} catch (error) {
			Alert.alert("Failed to Add Account");
			dispatch({ type: Types.ADD_ACCOUNT_FAILED });
			dispatch({ type: Types.ADD_ACCOUNT_DONE });
		}
	}
);

export const getUserAccount = (clientId, toSwitch = true, currentAccount, skip = 0) => (
	async (dispatch) => {
		try {
			console.log("getUserAccount", clientId);
			const result = {};

			if (toSwitch) {
				dispatch({
					type: Types.LOGIN_SET_CURRENT_ACCOUNT,
					data: result.rows[0],
				});
			}

			if (currentAccount.id && !toSwitch) {
				let isFound = false;

				_.map(result.rows, (row) => {
					if (row.id === currentAccount.id) {
						isFound = true;
					}
				});

				if (!isFound) {
					dispatch({
						type: Types.LOGIN_SET_CURRENT_ACCOUNT,
						data: result.rows[0],
					});
				}
			}

			dispatch({
				type: Types.LOGIN_GET_ACCOUNT_SUCCESS,
				data: result.rows,
			});
		} catch (err){

		}
	}
);

export const setCurrentAccount = (record) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.RESET_WALLET });

			dispatch({
				type: Types.LOGIN_SET_CURRENT_ACCOUNT,
				data: record,
			});
		} catch (e) {
			console.log();
		}
	}
);

export const changeAccount = () => ({type: Types.CHANGING_ACCOUNT});

export const checkAccountNumber = (accountNumber, trackingNumber, mobile,
	sponsorId, uplineId, position) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_CHECKING_ACCOUNT_NUMBER });

			const result = {};

			if (!_.isEmpty(result) && !_.isString(result)) {
				if (trackingNumber !== result.trackingNumber) {
					Alert.alert("Reference Number does not match Account ID");
					dispatch({ type: Types.FAIL_CHECKING_ACCOUNT_NUMBER });
				} else if (result.isUsed) {
					Alert.alert("Account ID is already used");
					dispatch({ type: Types.FAIL_CHECKING_ACCOUNT_NUMBER });
				} else {
					dispatch(checkMobile(mobile, sponsorId, uplineId, position, result));
				}
			} else {
				Alert.alert("Account ID not found");
				dispatch({ type: Types.FAIL_CHECKING_ACCOUNT_NUMBER });
			}
		} catch (e) {
			console.log(e);
			Alert.alert("Account ID not found");
			dispatch({ type: Types.FAIL_CHECKING_ACCOUNT_NUMBER });
		}
	}
);

const checkMobile = (mobile, sponsorId, uplineId, position, firstResult) => (
	async (dispatch) => {
		try {
			const newmobile = "+63".concat(mobile);
			const result = {};

			if (!_.isEmpty(result) && !_.isString(result)) {
				// Alert.alert("Mobile number is already used");
				dispatch({ type: Types.FAIL_CHECKING_MOBILE });
			} else if (!_.isEmpty(uplineId) && !_.isEmpty(sponsorId) && !_.isEmpty(position)) {
				dispatch(checkUplineSponsor(sponsorId, uplineId, position, firstResult));
			} else {
				dispatch({ type: Types.DONE_CHECKING_ACCOUNT_NUMBER, data: firstResult });
			}
		} catch (e) {
			console.log(e);
			if (!_.isEmpty(sponsorId) && !_.isEmpty(uplineId) && !_.isEmpty(position)) {
				dispatch(checkUplineSponsor(sponsorId, uplineId, position, firstResult));
			} else {
				dispatch({ type: Types.DONE_CHECKING_ACCOUNT_NUMBER, data: firstResult });
			}
		}
	}
);

const checkUplineSponsor = (sponsorId, uplineId, position, firstResult) => (
	async (dispatch) => {
		try {
			const result = {};

			if (!_.isEmpty(result) && !_.isString(result)) {
				dispatch(checkUpline(uplineId, position, firstResult));
			} else {
				Alert.alert("Sponsor not found");
				dispatch({ type: Types.FAIL_CHECKING_SPONSOR });
			}
		} catch (e) {
			console.log(e);
			Alert.alert("Sponsor not found");
			dispatch({ type: Types.FAIL_CHECKING_SPONSOR });
		}
	}
);

const checkUpline = (uplineId, position, firstResult) => (
	async (dispatch) => {
		try {
			const result = {};

			if (!_.isEmpty(result) && !_.isString(result)) {
				dispatch(checkUplinePosition(uplineId, position, firstResult));
			} else {
				Alert.alert("Upline not found");
				dispatch({ type: Types.FAIL_CHECKING_UPLINE });
			}
		} catch (e) {
			console.log(e);
			Alert.alert("Upline not found");
			dispatch({ type: Types.FAIL_CHECKING_UPLINE });
		}
	}
);

const checkUplinePosition = (uplineId, position, firstResult) => (
	async (dispatch) => {
		try {
			const result = {};

			switch (result.rows.length) {
			case 0:
				dispatch({ type: Types.DONE_CHECKING_ACCOUNT_NUMBER, data: firstResult });
				break;
			case 1:
				if (result.rows[0].position === position) {
					Alert.alert(`Upline already has a ${position} child`);
					dispatch({ type: Types.FAIL_CHECKING_UPLINE });
				} else {
					dispatch({ type: Types.DONE_CHECKING_ACCOUNT_NUMBER, data: firstResult });
				}
				break;
			case 2:
			default:
				Alert.alert("Upline already has 2 positions");
				dispatch({ type: Types.FAIL_CHECKING_UPLINE });
			}
		} catch (e) {
			console.log(e);
		}
	}
);

export const resetCheckAccountNumber = () => ({
	type: Types.RESET_CHECKING_ACCOUNT_NUMBER,
});

export const resetAdminPage = () => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.SET_ADMIN_SCREEN, data: "accountList" });
			dispatch({ type: Types.SET_ADMIN_ACCOUNT_LIST_SCREEN, data: "accountList" });
		} catch (e) {
			console.log(e);
		}
	}
);

export const setProfileScreen = (screen = "profile") => ({
	type: Types.SET_CURRENT_SCREEN,
	data: screen,
});

export const setEwalletScreen = (data) => ({
	type: Types.SET_EWALLET_SCREEN,
	data,
});

export const getCurrentEmployee = ( userId ) => (
	async ( dispatch ) => {
		try {
			dispatch({ type: Types.GETTING_CURRENT_EMPLOYEE });

			const result = {};

			if (_.isEmpty(result) || _.isEmpty(result)) {
				dispatch({ type: Types.GET_CURRENT_EMPLOYEE_FAILED });
			} else {
				dispatch({ type: Types.GET_CURRENT_EMPLOYEE_SUCCESS, data: result });
			}
		} catch (e) {
			dispatch({ type: Types.GET_CURRENT_EMPLOYEE_FAILED });
		}
	}
);


export const checkImportantDetails = (value, type) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.IS_CHECKING_IMPORTANT_DETAILS,
				data: { [type]: "loading" },
			});

			const result = {};

			if (result.isUsed === false){
				dispatch({
					type: Types.DONE_CHECKING_IMPORTANT_DETAILS,
					data: { [type]: "check-circle-o" },
				});
			} else if (!_.isEmpty(result) && !_.isString(result)) {
				dispatch({
					type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
					data: { [type]: "close-circle-o" },
				});
			} else {
				dispatch({
					type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
					data: { [type]: "close-circle-o" },
				});
			}
		} catch (e) {
			dispatch({
				type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
				data: {
					[type]: "close-circle-o",
					[type.concat("error")]: "close-circle-o",
				},
			});
		}
	}
);

export const checkImportantDetailTrackingNumber = (accountNumber, value, type) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.IS_CHECKING_IMPORTANT_DETAILS,
				data: { [type]: "loading" },
			});

			const checkAccountNumber = {};

			if (!_.isEmpty(checkAccountNumber) && !_.isString(checkAccountNumber)) {
				if (value !== checkAccountNumber.trackingNumber) {
					dispatch({
						type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
						data: {
							accountNumber: "close-circle-o",
							accountNumbererror: "close-circle-o",
						},
					});

					dispatch({
						type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
						data: {
							[type]: "close-circle-o",
							[type.concat("error")]: "close-circle-o",
						},
					});
				} else if (checkAccountNumber.isUsed) {
					dispatch({
						type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
						data: {
							accountNumber: "close-circle-o",
							accountNumbererror: "close-circle-o",
						},
					});

					dispatch({
						type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
						data: {
							[type]: "close-circle-o",
							[type.concat("error")]: "close-circle-o",
						},
					});
				} else {
					dispatch({
						type: Types.DONE_CHECKING_IMPORTANT_DETAILS,
						data: { [type]: "check-circle-o" },
					});
				}
			} else {
				dispatch({
					type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
					data: {
						accountNumber: "close-circle-o",
						accountNumbererror: "close-circle-o",
					},
				});

				dispatch({
					type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
					data: {
						[type]: "close-circle-o",
						[type.concat("error")]: "close-circle-o",
					},
				});
			}
		} catch (e) {
			dispatch({
				type: Types.FAIL_CHECKING_IMPORTANT_DETAILS,
				data: {
					[type]: "close-circle-o",
					[type.concat("error")]: "close-circle-o",
				},
			});
		}
	}
);

export const addErrorIcon = (type) => ({
	type: Types.CHECKING_MOBILE_DONE,
	data: { [type]: "close-circle-o" },
});

export const inputCheckMobile = (value, type) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.CHECKING_MOBILE_INPROGRESS,
				data: { [type]: "loading" },
			});

			const result = {};

			if (!_.isEmpty(result) && !_.isString(result) && !result.length) {
				dispatch({
					type: Types.CHECKING_MOBILE_DONE,
					data: { [type]: "close-circle-o" },
				});
			} else {
				dispatch({
					type: Types.CHECKING_MOBILE_DONE,
					data: { [type]: "check-circle-o" },
				});
			}
		} catch (e) {
			dispatch({
				type: Types.CHECKING_MOBILE_DONE,
				data: { [type]: "check-circle-o" },
			});
			// bugsnagClient.notify(e);
		}
	}
);

export const resetCheckImportant = () => ({
	type: Types.RESET_CHECKING_IMPORTANT_DETAILS,
});
