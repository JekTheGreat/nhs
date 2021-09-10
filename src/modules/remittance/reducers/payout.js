import * as Types from "../types";

const selectPayoutProvider = (state = [], action) => {
	switch (action.type) {
	case Types.SELECTED_PAYOUT_PROVIDER:
		return action.data;
	case Types.RESET_REMITTANCE:
		return [];
	default:
		return state;
	}
};

const setPayoutChildScreen = (state = "sender", action) => {
	switch (action.type) {
	case Types.GET_PAYOUT_CHILD_SCREEN:
		return action.data;
	case Types.RESET_REMITTANCE:
		return "sender";
	default:
		return state;
	}
};

const setPayoutScreen = (state = "selection", action) => {
	switch (action.type) {
	case Types.GET_PAYOUT_SCREEN:
		return action.data;
	case Types.RESET_REMITTANCE:
		return "selection";
	default:
		return state;
	}
};

const fetchPayoutProvider = (state = [], action) => {
	switch (action.type) {
	case Types.GET_ALL_PROVIDER_PAYOUT:
		return action.data;
	default:
		return state;
	}
};

const inputPayoutDetails = (state = {}, action) => {
	switch (action.type) {
	case Types.SET_INPUT_PAYOUT_DETAILS:
		return action.data;
	case Types.RESET_REMITTANCE:
		return {};
	default:
		return state;
	}
};

const getPayoutDetail = (state = {}, action) => {
	switch (action.type) {
	case Types.GET_PAYOUT_DETAILS:
		return action.data;
	case Types.RESET_REMITTANCE:
	case Types.GET_PAYOUT_DETAILS_FAILED:
		return {};
	default:
		return state;
	}
};

const getPayoutDetailFailed = (state = "", action) => {
	switch (action.type) {
	case Types.GET_PAYOUT_DETAILS_FAILED:
		return action.error;
	case Types.RESET_REMITTANCE:
	case Types.GET_PAYOUT_DETAILS:
	case Types.TRANSACTION_INPROGRESS:
		return "";
	default:
		return state;
	}
};

const payoutPin = (state = {}, action) => {
	switch (action.type) {
	case Types.PAYOUT_PIN:
		return action.data;
	case Types.RESET_REMITTANCE:
	case Types.TRANSACTION_FAILED:
		return {};
	default:
		return state;
	}
};
const payoutPinFailed = (state = "", action) => {
	switch (action.type) {
	case Types.PAYOUT_PIN_FAILED:
		return action.error;
	case Types.PAYOUT_PIN:
	case Types.PAYOUT_PIN_LOAD:
		return "";
	default:
		return state;
	}
};

const isPayoutPinLoad = (state = false, action) => {
	switch (action.type) {
	case Types.PAYOUT_PIN_LOAD:
		return true;
	case Types.PAYOUT_PIN:
	case Types.PAYOUT_PIN_FAILED:
		return false;
	default:
		return state;
	}
};

const getIdType = (state = [], action) => {
	switch (action.type) {
	case Types.GET_ID_TYPES:
		return action.data;
	default:
		return state;
	}
};

const getIdTypePayout = (state = [], action) => {
	switch (action.type) {
	case Types.GET_ID_TYPES_PAYOUT:
		return action.data;
	default:
		return state;
	}
};

const inputPOD = (state = {}, action) => {
	switch (action.type) {
	case Types.SET_INPUT_POD:
		return action.data;
	case Types.RESET_REMITTANCE:
		return {};
	default:
		return state;
	}
};

const isPODLoad = (state = false, action) => {
	switch (action.type) {
	case Types.GET_POD_TRANSACTION_LOAD:
		return true;
	case Types.GET_POD_TRANSACTION:
	case Types.GET_POD_TRANSACTION_FAILED:
	case Types.RESET_REMITTANCE:
		return false;
	default:
		return state;
	}
};

const getPODdetails = (state = {}, action) => {
	switch (action.type) {
	case Types.GET_POD_TRANSACTION:
		return action.data;
	case Types.GET_POD_TRANSACTION_FAILED:
	case Types.RESET_REMITTANCE:
	case Types.GET_POD_TRANSACTION_LOAD:
		return {};
	default:
		return state;
	}
};

const isUploadingId = (state = false, action) => {
	switch (action.type) {
	case Types.IS_UPLOADING_ID_PHOTO:
		return true;
	case Types.RESET_REMITTANCE:
	case Types.DONE_UPLOADING_ID_PHOTO:
	case Types.DONE_UPLOADING_ID_PHOTO_FAILED:
		return false;
	default:
		return state;
	}
};

const doneUploadId = (state = "", action) => {
	switch (action.type) {
	case Types.DONE_UPLOADING_ID_PHOTO:
		return action.data;
	case Types.RESET_REMITTANCE:
		return "";
	default:
		return state;
	}
};

const isUploadingSelfie = (state = false, action) => {
	switch (action.type) {
	case Types.IS_UPLOADING_SELFIE_PHOTO:
		return true;
	case Types.RESET_REMITTANCE:
	case Types.DONE_UPLOADING_SELFIE_PHOTO:
	case Types.DONE_UPLOADING_SELFIE_PHOTO_FAILED:
		return false;
	default:
		return state;
	}
};

const doneUploadSelfie = (state = "", action) => {
	switch (action.type) {
	case Types.DONE_UPLOADING_SELFIE_PHOTO:
		return action.data;
	case Types.RESET_REMITTANCE:
		return "";
	default:
		return state;
	}
};

const isUploadingSecondaryId = (state = false, action) => {
	switch (action.type) {
	case Types.IS_UPLOADING_SECONDARY_ID_PHOTO:
		return true;
	case Types.RESET_REMITTANCE:
	case Types.DONE_UPLOADING_SECONDARY_ID_PHOTO:
	case Types.DONE_UPLOADING_SECONDARY_ID_PHOTO_FAILED:
		return false;
	default:
		return state;
	}
};

const secondaryID = (state = "", action) => {
	switch (action.type) {
	case Types.DONE_UPLOADING_SECONDARY_ID_PHOTO:
		return action.data;
	case Types.RESET_REMITTANCE:
		return "";
	default:
		return state;
	}
};

const isCheckingID = (state = false, action) => {
	switch (action.type) {
	case Types.CHECK_EXISTING_ID_LOAD:
		return true;
	case Types.CHECK_EXISTING_ID:
	case Types.CHECK_EXISTING_ID_FAILED:
	case Types.RESET_REMITTANCE:
		return false;
	default:
		return state;
	}
};

const checkIdRegister = (state = {}, action) => {
	switch (action.type) {
	case Types.CHECK_EXISTING_ID:
		return action.data;
	case Types.CHECK_EXISTING_ID_LOAD:
	case Types.CHECK_EXISTING_ID_FAILED:
		return {};
	default:
		return state;
	}
};

const checkIdRegisterPayout = (state = {}, action) => {
	switch (action.type) {
	case Types.CHECK_EXISTING_PAYOUT_ID:
		return action.data;
	case Types.CHECK_EXISTING_PAYOUT_ID_LOAD:
	case Types.CHECK_EXISTING_PAYOUT_ID_FAILED:
		return {};
	default:
		return state;
	}
};

const checkIdRegisterPayoutFailed = (state = {}, action) => {
	switch (action.type) {
	case Types.CHECK_EXISTING_PAYOUT_ID_FAILED:
		return action.error;
	case Types.CHECK_EXISTING_PAYOUT_ID_LOAD:
	case Types.CHECK_EXISTING_PAYOUT_ID:
		return {};
	default:
		return state;
	}
};

const isAddNewPayoutIDLoad = (state = false, action) => {
	switch (action.type) {
	case Types.ADD_NEW_PAYOUT_ID_LOAD:
		return true;
	case Types.ADD_NEW_PAYOUT_ID:
	case Types.ADD_NEW_PAYOUT_ID_FAILED:
	case Types.TRANSACTION_FAILED:
	case Types.TRANSACTION_SUCCESS:
		return false;
	default:
		return state;
	}
};

const AddNewPayoutID = (state = {}, action) => {
	switch (action.type) {
	case Types.ADD_NEW_PAYOUT_ID:
		return action.data;
	case Types.ADD_NEW_PAYOUT_ID_LOAD:
	case Types.ADD_NEW_PAYOUT_ID_FAILED:
		return {};
	default:
		return state;
	}
};

const AddNewPayoutIDFailed = (state = "", action) => {
	switch (action.type) {
	case Types.ADD_NEW_PAYOUT_ID_FAILED:
		return action.error;
	case Types.ADD_NEW_PAYOUT_ID_LOAD:
	case Types.ADD_NEW_PAYOUT_ID:
		return "";
	default:
		return state;
	}
};

export default {
	selectPayoutProvider,

	inputPayoutDetails,
	setPayoutScreen,
	setPayoutChildScreen,
	fetchPayoutProvider,
	getPayoutDetail,
	payoutPin,
	getIdType,
	inputPOD,
	isPODLoad,
	getPODdetails,
	getPayoutDetailFailed,
	isPayoutPinLoad,
	payoutPinFailed,
	isUploadingId,
	doneUploadId,
	isCheckingID,
	checkIdRegister,
	isUploadingSelfie,
	doneUploadSelfie,
	checkIdRegisterPayout,
	checkIdRegisterPayoutFailed,
	isAddNewPayoutIDLoad,
	AddNewPayoutID,
	AddNewPayoutIDFailed,
	isUploadingSecondaryId,
	secondaryID,
	getIdTypePayout,
};
