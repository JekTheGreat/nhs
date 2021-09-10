import { combineReducers } from "redux";
import _ from "lodash";
import * as Types from "./types";

const accountScreen = (state = "change", action) => {
	switch (action.type) {
	case Types.SET_ACCOUNT_SCREEN:
		return action.data;
	default:
		return state;
	}
};
const isPhoneNumberNotAvailable = (state = false, action) => {
	switch (action.type){
	case Types.PHONE_NUMBER_NOT_AVAILABLE:
		return true;
	case Types.RESET_STATE:
	case Types.PHONE_NUMBER_DATA_RESET:
	case Types.PHONENUMBER_IS_VALIDATING:
	case Types.PHONE_NUMBER_AVAILABLE:
		return false;
	default:
		return state;
	}
};
const isPhoneNumberAvailable = (state = false, action) => {
	switch (action.type){
	case Types.PHONE_NUMBER_AVAILABLE:
		return true;
	case Types.RESET_STATE:
	case Types.PHONE_NUMBER_DATA_RESET:
	case Types.PHONENUMBER_IS_VALIDATING:
	case Types.PHONE_NUMBER_NOT_AVAILABLE:
	case Types.ACCOUNT_PHONE_CODE_SUCCESS:
		return false;
	default:
		return state;
	}
};
const isValidatingPhone = ( state = false, action) => {
	switch (action.type){
	case Types.PHONENUMBER_IS_VALIDATING:
		return true;
	case Types.PHONENUMBER_IS_VALIDATING_DONE:
		return false;
	default:
		return state;
	}
};
const isValidatingEmail = (state = false, action) => {
	switch (action.type){
	case Types.IS_VALIDATING_EMAIL:
		return true;
	case Types.IS_VALIDATING_EMAIL_DONE:
		return false;
	default:
		return state;
	}
};

const isEmailNotAvailable = (state = false, action) => {
	switch (action.type){
	case Types.EMAIL_NOT_AVAILABLE:
		return true;
	case Types.RESET_INPUT_STATE:
	case Types.ACCOUNT_SET_EMAIL_INPUT:
	case Types.VERIFY_EMAIL_RESET:
	case Types.IS_VALIDATING_EMAIL:
	case Types.EMAIL_AVAILABLE:
		return false;
	default:
		return state;
	}
};

const isEmailAvailable = (state = false, action) => {
	switch (action.type){
	case Types.EMAIL_AVAILABLE:
		return true;
	case Types.RESET_INPUT_STATE:
	case Types.VERIFY_EMAIL_RESET:
	case Types.EMAIL_NOT_AVAILABLE:
	case Types.IS_VALIDATING_EMAIL:
		return false;
	default:
		return state;
	}
};

const checkingEmailPassword = (state = false, action) => {
	switch (action.type) {
	case Types.CHECKING_EMAIL_PASSWORD:
		return true;
	case Types.VERIFY_EMAIL_RESET:
	case Types.ACCOUNT_EMAIL_PASSWORD_CORRECT:
	case Types.ACCOUNT_CHANGE_EMAIL_INCORRECT_PASS:
		return false;
	default:
		return state;
	}
};

const checkingEmailTransPin = (state = false, action) => {
	switch (action.type) {
	case Types.CHECKING_EMAIL_TRANSPIN:
		return true;
	case Types.VERIFY_EMAIL_RESET:
	case Types.ACCOUNT_EMAIL_TRANSPIN_CORRECT:
	case Types.ACCOUNT_CHANGE_EMAIL_INCORRECT_TRANSPIN:
		return false;
	default:
		return state;
	}
};


const incorrectEmailPass = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_EMAIL_INCORRECT_PASS:
		return true;
	case Types.ACCOUNT_SET_EMAIL_INPUT:
	case Types.VERIFY_EMAIL_RESET:
	case Types.ACCOUNT_CHANGE_EMAIL_RESET:
		return false;
	default:
		return state;
	}
};

const incorrectEmailTransPin = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_EMAIL_INCORRECT_TRANSPIN:
		return true;
	case Types.ACCOUNT_SET_EMAIL_INPUT:
	case Types.VERIFY_EMAIL_RESET:
	case Types.ACCOUNT_CHANGE_EMAIL_RESET:
		return false;
	default:
		return state;
	}
};

const correctEmailPass = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_EMAIL_PASSWORD_CORRECT:
		return true;
	case Types.ACCOUNT_CHANGE_EMAIL_INCORRECT_PASS:
	case Types.RESET_PASSWORD_STATE:
	case Types.ACCOUNT_CHANGE_EMAIL_RESET:
		return false;
	default:
		return state;
	}
};

const correctEmailTransPin = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_EMAIL_TRANSPIN_CORRECT:
		return true;
	case Types.ACCOUNT_CHANGE_EMAIL_INCORRECT_TRANSPIN:
	case Types.RESET_TRANSACTIONPIN_STATE:
	case Types.ACCOUNT_CHANGE_EMAIL_RESET:
		return false;
	default:
		return state;
	}
};

const incorrectMobilePass = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_MOBILE_PASSWORD_INCORRECT:
		return true;
	case Types.PHONE_NUMBER_DATA_RESET:
	case Types.ACCOUNT_SET_MOBILE_INPUT:
		return false;
	default:
		return state;
	}
};

const incorrectMobileTransPin = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_MOBILE_TRANSPIN_INCORRECT:
		return true;
	case Types.PHONE_NUMBER_DATA_RESET:
	case Types.ACCOUNT_SET_MOBILE_INPUT:
		return false;
	default:
		return state;
	}
};

const correctMobilePass = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_MOBILE_PASSWORD_CORRECT:
		return true;
	case Types.ACCOUNT_MOBILE_PASSWORD_INCORRECT:
	case Types.RESET_PASSWORD_STATE:
	case Types.ACCOUNT_PHONE_CODE_SUCCESS:
		return false;
	default:
		return state;
	}
};

const correctMobileTransPin = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_MOBILE_TRANSPIN_CORRECT:
		return true;
	case Types.ACCOUNT_MOBILE_TRANSPIN_INCORRECT:
	case Types.RESET_TRANSACTIONPIN_STATE:
	case Types.ACCOUNT_PHONE_CODE_SUCCESS:
		return false;
	default:
		return state;
	}
};

const phoneScreen = (state = "phoneForm", action) => {
	switch (action.type) {
	case Types.SET_PHONE_SCREEN:
		return action.data;
	case Types.LOGOUT:
		return "phoneForm";
	default:
		return state;
	}
};

const mobileInput = {
	countryCodeDisplay: "Philippines (+63)",
	countryCode: "+63",
	newMobile: "",
	password: "",
	code: "",
};

const changeMobileInput = (state = mobileInput, action) => {
	switch (action.type){
	case Types.ACCOUNT_SET_MOBILE_INPUT:
		return action.data;
	case Types.PHONE_NUMBER_DATA_RESET:
	case Types.ACCOUNT_CHANGE_MOBILE_RESET:
	case Types.LOGOUT:
		return mobileInput;
	default:
		return state;
	}
};

const isSuccessChangeMobile = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_MOBILE_SUCCESS:
		return true;
	case Types.ACCOUNT_CHANGE_MOBILE_RESET:
	case Types.ACCOUNT_CHANGE_MOBILE_INVALID:
		return false;
	default:
		return state;
	}
};

const incorrectChangeTransPin = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_INCORRECT_PASS:
		return true;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET:
	case Types.ACCOUNT_SET_TRANSACTIONPIN_INPUT:
		return false;
	default:
		return state;
	}
};

/* change password reducers */
const passwordInput = {
	oldPassword: "",
	newPassword: "",
	confirmNewPassword: "",
	code: "",
};

const changePasswordInput = (state = passwordInput, action) => {
	switch (action.type) {
	case Types.ACCOUNT_SET_PASSWORD_INPUT:
		return action.data;
	case Types.ACCOUNT_CHANGE_PASSWORD_RESET:
		return passwordInput;
	default:
		return state;
	}
};

/* change transpin reducers */
const transPinInput = {
	confirmPin: "",
	pin: "",
	code: "",
};

const changeTransPinInput = (state = transPinInput, action) => {
	switch (action.type) {
	case Types.ACCOUNT_SET_TRANSACTIONPIN_INPUT:
		return action.data;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET:
		return transPinInput;
	default:
		return state;
	}
};

const isSuccessChangePass = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_PASSWORD_SUCCESS:
		return true;
	case Types.ACCOUNT_CHANGE_PASSWORD_RESET:
	case Types.ACCOUNT_CHANGE_PASSWORD_FAILED:
		return false;
	default:
		return state;
	}
};

const isSuccessChangeTransPin = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SUCCESS:
		return true;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_FAILED:
		return false;
	default:
		return state;
	}
};

const ChangePassFailed = (state = "", action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_PASSWORD_FAILED:
		return action.error;
	case Types.ACCOUNT_CHANGE_PASSWORD_RESET:
	case Types.ACCOUNT_CHANGE_PASSWORD_SUCCESS:
	case Types.ACCOUNT_CHANGE_PASSSWORD_PROGRESS:
	case Types.SENDING_CHANGE_PHONE_CODE:
		return "";
	default:
		return state;
	}
};

const ChangeTransPinFailed = (state = "", action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_FAILED:
		return action.error;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SUCCESS:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_PROGRESS:
	case Types.SENDING_CHANGE_PHONE_CODE:
		return "";
	default:
		return state;
	}
};

const incorrectChangePassPassword = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_PASSWORD_INCORRECT_PASS:
		return true;
	case Types.ACCOUNT_CHANGE_PASSWORD_RESET:
	case Types.ACCOUNT_SET_PASSWORD_INPUT:
		return false;
	default:
		return state;
	}
};

const incorrectChangePassTransPin = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_INCORRECT_PASS:
		return true;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET:
	case Types.ACCOUNT_SET_TRANSACTIONPIN_INPUT:
		return false;
	default:
		return state;
	}
};

const newPasswordreducer = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_PASS_INCORRECT_NEWPASS:
		return true;
	case Types.ACCOUNT_CHANGE_PASSWORD_RESET:
	case Types.ACCOUNT_SET_PASSWORD_INPUT:
		return false;
	default:
		return state;
	}
};

const newTransPinreducer = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_INCORRECT_NEWTRANSACTIONPIN:
		return true;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET:
	case Types.ACCOUNT_SET_TRANSACTIONPIN_INPUT:
		return false;
	default:
		return state;
	}
};

/* change email */
const emailScreen = (state = "emailForm", action) => {
	switch (action.type) {
	case Types.SET_EMAIL_SCREEN:
		return action.data;
	case Types.ACCOUNT_CHANGE_EMAIL_RESET:
	case Types.LOGOUT:
		return "emailForm";
	default:
		return state;
	}
};

const emailInput = {
	newEmail: "",
	password: "",
	code: "",
};

const changeEmailInput = (state = emailInput, action) => {
	switch (action.type) {
	case Types.ACCOUNT_SET_EMAIL_INPUT:
		return action.data;
	case Types.VERIFY_EMAIL_RESET:
	case Types.ACCOUNT_CHANGE_EMAIL_RESET:
	case Types.LOGOUT:
		return emailInput;
	default:
		return state;
	}
};

const isSuccessChangeEmail = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_EMAIL_SUCCESS:
		return true;
	case Types.ACCOUNT_CHANGE_EMAIL_RESET:
	case Types.ACCOUNT_CHANGE_EMAIL_FAILED:
		return false;
	default:
		return state;
	}
};

const proceedButtonIsLoading = (state = false, action) => {
	switch (action.type){
	case Types.ACCOUNT_CHANGE_EMAIL_PROGRESS:
	case Types.SENDING_CHANGE_EMAIL_CODE:
		return true;

	case Types.BUTTON_LOAD_STOP:
	case Types.ACCOUNT_EMAIL_CODE_SUCCESS:
	case Types.SEND_CHANGE_EMAIL_CODE_FAILED:
	case Types.ACCOUNT_CHANGE_EMAIL_SUCCESS:
	case Types.ACCOUNT_CHANGE_EMAIL_INVALID:
	case Types.ACCOUNT_CHANGE_EMAIL_FAILED:
		return false;
	default:
		return state;
	}
};

const changePasswordScreen = (state = "changePasswordForm", action) => {
	switch (action.type) {
	case Types.SET_CHANGE_PASSWORD_SCREEN:
		return action.data;
	case Types.ACCOUNT_CHANGE_PASSWORD_RESET:
	case Types.LOGOUT:
		return "changePasswordForm";
	default:
		return state;
	}
};

const changeTransPinScreen = (state = "changeTransPinForm", action) => {
	switch (action.type) {
	case Types.SET_CHANGE_TRANSACTIONPIN_SCREEN:
		return action.data;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET:
	case Types.LOGOUT:
		return "changeTransPinForm";
	default:
		return state;
	}
};

const gettingUserEmailAndMobile = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_PASSWORD_USERINFO_PROGRESS:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_USERINFO_PROGRESS:
		return true;
	case Types.ACCOUNT_CHANGE_PASSWORD_USERINFO_SUCCESS:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_USERINFO_SUCCESS:
	case Types.ACCOUNT_CHANGE_PASSWORD_INCORRECT_PASS:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_INCORRECT_PASS:
	case Types.ACCOUNT_CHANGE_PASSWORD_USERINFO_FAILED:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_USERINFO_FAILED:
	case Types.ACCOUNT_CHANGE_PASS_SUCCESS_NEWPASS:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SUCCESS_NEWTRANSACTIONPIN:
	case Types.ACCOUNT_CHANGE_PASS_INCORRECT_NEWPASS:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_INCORRECT_NEWTRANSACTIONPIN:
		return false;
	default:
		return state;
	}
};

const changePasswordUserInfo = (state = {}, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_PASSWORD_USERINFO_SUCCESS:
		return action.data;
	case Types.ACCOUNT_CHANGE_PASSWORD_RESET:
		return {};
	default:
		return state;
	}
};

const changeTransPinUserInfo = (state = {}, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_USERINFO_SUCCESS:
		return action.data;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET:
		return {};
	default:
		return state;
	}
};

const changePasswordSaveRadio = (state = {}, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_PASSWORD_SAVE_RADIO:
		return action.data;
	case Types.ACCOUNT_CHANGE_PASSWORD_RESET:
	case Types.LOGOUT:
		return {};
	default:
		return state;
	}
};

const changeTransPindSaveRadio = (state = {}, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SAVE_RADIO:
		return action.data;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_RESET:
	case Types.LOGOUT:
		return {};
	default:
		return state;
	}
};

const changingPassword = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_PASSSWORD_PROGRESS:
		return true;
	case Types.ACCOUNT_CHANGE_PASS_CODE_INVALID:
	case Types.ACCOUNT_CHANGE_PASSWORD_SUCCESS:
	case Types.ACCOUNT_CHANGE_PASSWORD_FAILED:
	case Types.ACCOUNT_CHANGE_PASSWORD_CODE:
		return false;
	default:
		return state;
	}
};

const changingTransPass = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_INPROGRESS:
		return true;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_CODE_INVALID:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SUCCESS:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_FAILED:
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_CODE:
		return false;
	default:
		return state;
	}
};

const saveCodeChangePass = (state = "", action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_PASSWORD_CODE:
		return action.data;
	default:
		return state;
	}
};

const saveCodeChangeTransPin = (state = "", action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_CODE:
		return action.data;
	default:
		return state;
	}
};

const sendingCodeChangePass = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_PASS_SENDING_CODE:
		return true;
	case Types.SET_CHANGE_PASSWORD_SCREEN:
		return false;
	default:
		return state;
	}
};

const sendingCodeChangeTransPin = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_SENDING_CODE:
		return true;
	case Types.SET_CHANGE_TRANSACTIONPIN_SCREEN:
		return false;
	default:
		return state;
	}
};

/* Change 2FA settings */
const isSetting2FA = (state = false, action) => {
	switch (action.type){
	case Types.SETTING_CHANGE_2FA_SUCCESS:
	case Types.SETTING_CHANGE_2FA_FAILED:
		return false;
	case Types.SETTING_CHANGE_2FA_INPROGRESS:
		return true;
	default:
		return state;
	}
};

/* Where you Logged in */
const loginHistories = (state = [], action) => {
	switch (action.type){
	case Types.SETTING_HISTORY_SUCCESS:
		return action.data.rows;
	case Types.SETTING_HISTORY_SEE_MORE:

		return [...state].concat(action.data);
	case Types.SETTING_HISTORY_FAILED:
		return [];
	default:
		return state;
	}
};

const loginHistoryCount = (state = 0, action) => {
	switch (action.type){
	case Types.SETTING_HISTORY_SUCCESS:
		return action.data.count;
	case Types.SETTING_HISTORY_RESET:
		return 0;
	default:
		return state;
	}
};

const authorizedDevice = (state = [], action) => {
	switch (action.type){
	case Types.SETTING_DEVICE_SUCCESS:
		return action.data;
	case Types.SETTING_DEVICE_REMOVED:
		const newState = _.filter([...state], (data) => {
			return data.id !== action.data;
		});

		return newState;
	case Types.SETTING_DEVICE_FAILED:
		return [];
	default:
		return state;
	}
};

const isLoadDevice = (state = false, action) => {
	switch (action.type){
	case Types.SETTING_DEVICE_INPROGRESS:
		return true;
	case Types.SETTING_DEVICE_SUCCESS:
	case Types.SETTING_DEVICE_FAILED:
	case Types.SETTING_HISTORY_SUCCESS:
	case Types.SETTING_HISTORY_FAILED:
		return false;
	default:
		return state;
	}
};


const selectedDeviceToRemove = (state = [],  action) => {
	switch (action.type){
	case Types.SELECTED_DEVICE_TO_REMOVE:
		return action.data;
	default:
		return state;
	}
};
const isInvalidEmailCode = (state = "", action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_EMAIL_INVALID:
		return action.data;
	case Types.ACCOUNT_CHANGE_EMAIL_FAILED:
		return "Something went wrong! Please try again";
	case Types.ACCOUNT_CHANGE_PHONE_SUCCESS:
	case Types.ACCOUNT_CHANGE_MOBILE_SUCCESS:
	case Types.ACCOUNT_SET_EMAIL_INPUT:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const changingEmail = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_EMAIL_PROGRESS:
		return true;
	case Types.ACCOUNT_CHANGE_EMAIL_SUCCESS:
	case Types.ACCOUNT_CHANGE_EMAIL_FAILED:
	case Types.ACCOUNT_SET_EMAIL_INPUT:
	case Types.ACCOUNT_CHANGE_EMAIL_INVALID:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const sendingChangeEmailCode = (state = false, action) => {
	switch (action.type) {
	case Types.SENDING_CHANGE_EMAIL_CODE:
		return true;
	case Types.ACCOUNT_EMAIL_CODE_SUCCESS:
	case Types.SEND_CHANGE_EMAIL_CODE_FAILED:
		return false;
	default:
		return state;
	}
};

const resendEmailCode = (state = false, action) => {
	switch (action.type) {
	case Types.RESEND_CHANGE_EMAIL_CODE:
		return true;
	case Types.RESEND_CHANGE_EMAIL_CODE_SUCCESS:
	case Types.RESEND_CHANGE_EMAIL_CODE_FAIL:
		return false;
	default:
		return state;
	}
};

const resendPhoneCode = (state = false, action) => {
	switch (action.type) {
	case Types.RESENDING_CHANGE_EMAIL_CODE:
		return true;
	case Types.RESENDING_CHANGE_EMAIL_CODE_SUCCESS:
	case Types.RESENDING_CHANGE_EMAIL_CODE_FAIL:
		return false;
	default:
		return state;
	}
};

const checkingMobilePassword = (state = false, action) => {
	switch (action.type) {
	case Types.CHECKING_MOBILE_PASSWORD:
		return true;
	case Types.PHONE_NUMBER_DATA_RESET:
	case Types.ACCOUNT_MOBILE_PASSWORD_CORRECT:
	case Types.ACCOUNT_MOBILE_PASSWORD_INCORRECT:
		return false;
	default:
		return state;
	}
};

const checkingMobileTransPin = (state = false, action) => {
	switch (action.type) {
	case Types.CHECKING_MOBILE_TRANSPIN:
		return true;
	case Types.PHONE_NUMBER_DATA_RESET:
	case Types.ACCOUNT_MOBILE_TRANSPIN_CORRECT:
	case Types.ACCOUNT_MOBILE_TRANSPIN_INCORRECT:
		return false;
	default:
		return state;
	}
};

const isInvalidPhoneCode = (state = "", action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_MOBILE_INVALID:
		return action.data;
	case Types.ACCOUNT_SET_MOBILE_INPUT:
	case Types.ACCOUNT_CHANGE_PHONE_SUCCESS:
	case Types.LOGOUT:
		return "";
	default:
		return state;
	}
};

const sendingPhoneCode = (state = false, action) => {
	switch (action.type) {
	case Types.SENDING_CHANGE_PHONE_CODE:
		return true;
	case Types.ACCOUNT_PHONE_CODE_SUCCESS:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const changingPhone = (state = false, action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_PHONE_PROGRESS:
		return true;
	case Types.ACCOUNT_CHANGE_MOBILE_INVALID:
	case Types.ACCOUNT_CHANGE_PHONE_SUCCESS:
	case Types.ACCOUNT_CHANGE_MOBILE_SUCCESS:
	case Types.PHONE_NUMBER_DATA_RESET:
		return false;
	default:
		return state;
	}
};

const inCorrectCodeChangePass = (state = "", action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_PASS_CODE_INVALID:
		return action.data;
	case Types.ACCOUNT_CHANGE_PASSWORD_CODE:
	case Types.LOGOUT:
		return "";
	default:
		return state;
	}
};

const inCorrectCodeChangeTransPin = (state = "", action) => {
	switch (action.type) {
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_CODE_INVALID:
		return action.data;
	case Types.ACCOUNT_CHANGE_TRANSACTIONPIN_CODE:
	case Types.LOGOUT:
		return "";
	default:
		return state;
	}
};

/* Alerts reducers */
const alertsSMSInProgress = (state = false, action) => {
	switch (action.type){
	case Types.SETTING_LOGIN_ALERT_SMSINPROGRESS:
		return true;
	case Types.SETTING_LOGIN_ALERT_SUCCESS:
		return false;
	default:
		return state;
	}
};

const alertsEMAILInProgress = (state = false, action) => {
	switch (action.type){
	case Types.SETTING_LOGIN_ALERT_EMAILINPROGRESS:
		return true;
	case Types.SETTING_LOGIN_ALERT_SUCCESS:
		return false;
	default:
		return state;
	}
};

const enableEmailAlertProgress = (state = false, action) => {
	switch (action.type) {
	case Types.ENABLE_LOGIN_ALERT_EMAILINPROGRESS:
		return true;
	case Types.ENABLE_LOGIN_ALERT_EMAIL_SUCCESS:
	case Types.ENABLE_LOGIN_ALERT_EMAIL_FAILED:
		return false;
	default:
		return state;
	}
};

const enableSMSAlertProgress = (state = false, action) => {
	switch (action.type) {
	case Types.ENABLE_LOGIN_ALERT_SMSINPROGRESS:
		return true;
	case Types.ENABLE_LOGIN_ALERT_SMS_SUCCESS:
	case Types.ENABLE_LOGIN_ALERT_SMS_FAILED:
		return false;
	default:
		return state;
	}
};

export default combineReducers({
	proceedButtonIsLoading,
	correctEmailPass,
	isValidatingEmail,
	isEmailNotAvailable,
	isEmailAvailable,
	phoneScreen,
	emailScreen,
	accountScreen,
	changePasswordInput,
	checkingEmailPassword,
	changeEmailInput,
	changeMobileInput,
	ChangePassFailed,
	incorrectEmailPass,
	isSuccessChangePass,
	incorrectChangePassPassword,
	isSuccessChangeEmail,
	isSuccessChangeMobile,
	changePasswordScreen,
	gettingUserEmailAndMobile,
	changePasswordUserInfo,
	changePasswordSaveRadio,
	changingPassword,
	saveCodeChangePass,
	sendingCodeChangePass,
	isSetting2FA,
	loginHistories,
	loginHistoryCount,
	authorizedDevice,
	isInvalidEmailCode,
	changingEmail,
	sendingChangeEmailCode,
	checkingMobilePassword,
	incorrectMobilePass,
	isInvalidPhoneCode,
	sendingPhoneCode,
	changingPhone,
	inCorrectCodeChangePass,
	newPasswordreducer,
	alertsSMSInProgress,
	alertsEMAILInProgress,
	isValidatingPhone,
	isPhoneNumberAvailable,
	isPhoneNumberNotAvailable,
	correctMobilePass,
	enableEmailAlertProgress,
	enableSMSAlertProgress,
	selectedDeviceToRemove,
	resendEmailCode,
	resendPhoneCode,
	isLoadDevice,
	changeTransPinInput,
	isSuccessChangeTransPin,
	incorrectChangeTransPin,
	newTransPinreducer,
	changeTransPinScreen,
	changeTransPinUserInfo,
	sendingCodeChangeTransPin,
	changeTransPindSaveRadio,
	changingTransPass,
	saveCodeChangeTransPin,
	correctMobileTransPin,
	incorrectEmailTransPin,
	incorrectMobileTransPin,
	correctEmailTransPin,
	checkingEmailTransPin,
	ChangeTransPinFailed,
	incorrectChangePassTransPin,
	checkingMobileTransPin,
	inCorrectCodeChangeTransPin,
});
