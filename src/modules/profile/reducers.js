import { combineReducers } from "redux";

import * as Types from "./types";

const initialInputs = {
	firstName: "",
	lastName: "",
	middleName: "",
	suffix: "",
	birthday: "",
	gender: "",
	address: "",
	barangay: "",
	city: "",
	country: undefined,
	zipCode: "",
	currentAddress: "",
	currentBarangay: "",
	currentCity: "",
	currentCountry: undefined,
	currentZipCode: "",
};

const changeProfileInputs = (state = initialInputs, action) => {
	switch (action.type) {
	case Types.SET_CHANGE_PROFILE_INPUTS:
		return action.data;
	case Types.RESET_CHANGE_PROFILE_INPUTS:
		return initialInputs;
	default:
		return state;
	}
};

const saveQRCode = (state = "", action) => {
	switch (action.type) {
	case Types.SAVE_QR_CODE:
		return action.data;
	default:
		return state;
	}
};

const getKYCsteps = (state = "step0", action) => {
	switch (action.type) {
	case Types.KYC_NEXT_STEPS:
		return action.data;
	default:
		return state;
	}
};

const isSavingProfileChanges = (state = false, action) => {
	switch (action.type) {
	case Types.IS_SAVING_PROFILE_CHANGES:
		return true;
	case Types.RESET_CHANGE_PROFILE_INPUTS:
	case Types.DONE_SAVING_PROFILE_CHANGES:
	case Types.FAIL_SAVING_PROFILE_CHANGES:
		return false;
	default:
		return state;
	}
};

const successSavingProfileChanges = (state = {}, action) => {
	switch (action.type) {
	case Types.DONE_SAVING_PROFILE_CHANGES:
		return action.data;
	case Types.RESET_CHANGE_PROFILE_INPUTS:
		return {};
	default:
		return state;
	}
};

const failSavingProfileChanges = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_SAVING_PROFILE_CHANGES:
		return true;
	case Types.RESET_CHANGE_PROFILE_INPUTS:
		return false;
	default:
		return state;
	}
};

const isUploadingPhoto = (state = false, action) => {
	switch (action.type) {
	case Types.IS_UPLOADING_PROFILE_PHOTO:
		return true;
	case Types.FAIL_UPLOADING_PROFILE_PHOTO:
	case Types.DONE_UPDATING_PROFILE_PHOTO:
	case Types.FAIL_UPDATING_PROFILE_PHOTO:
	case Types.RESET_UPDATING_PROFILE_PHOTO:
		return false;
	default:
		return state;
	}
};

const uploadedPhoto = (state = "", action) => {
	switch (action.type) {
	case Types.DONE_UPLOADING_PROFILE_PHOTO:
		return action.data;
	case Types.RESET_UPDATING_PROFILE_PHOTO:
		return "";
	default:
		return state;
	}
};

const failUploadingPhoto = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_UPLOADING_PROFILE_PHOTO:
		return true;
	case Types.RESET_UPDATING_PROFILE_PHOTO:
		return false;
	default:
		return state;
	}
};

const isUpdatingProfilePhoto = (state = false, action) => {
	switch (action.type) {
	case Types.IS_UPDATING_PROFILE_PHOTO:
		return true;
	case Types.DONE_UPDATING_PROFILE_PHOTO:
	case Types.FAIL_UPDATING_PROFILE_PHOTO:
	case Types.RESET_UPDATING_PROFILE_PHOTO:
		return false;
	default:
		return state;
	}
};

const doneUpdatingProfilePhoto = (state = {}, action) => {
	switch (action.type) {
	case Types.DONE_UPDATING_PROFILE_PHOTO:
		return action.data;
	case Types.RESET_UPDATING_PROFILE_PHOTO:
		return {};
	default:
		return state;
	}
};

const failUpdatingProfilePhoto = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_UPDATING_PROFILE_PHOTO:
		return true;
	case Types.RESET_UPDATING_PROFILE_PHOTO:
		return false;
	default:
		return state;
	}
};

const verificationProfileIsClick = (state = false, action) => {
	switch (action.type) {
	case Types.PROFILE_VERIFICATION_IS_CLICK:
		return true;
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

// const <name> = (state = false, action) => {
// 	switch (action.type) {
// 	default:
// 		return state;
// 	}
// };

const isSendingEmailCode = (state = false, action) => {
	switch (action.type) {
	case Types.IS_SENDING_EMAIL_VERIFICATION_CODE:
		return true;
	case Types.DONE_SENDING_EMAIL_VERIFICATION_CODE:
	case Types.FAIL_SENDING_EMAIL_VERIFICATION_CODE:
		return false;
	default:
		return state;
	}
};

const doneSendingEmailCode = (state = false, action) => {
	switch (action.type) {
	case Types.DONE_SENDING_EMAIL_VERIFICATION_CODE:
		return true;
	// case Types.IS_SENDING_EMAIL_VERIFICATION_CODE:
	case Types.FAIL_SENDING_EMAIL_VERIFICATION_CODE:
		return false;
	default:
		return state;
	}
};

const failSendingEmailCode = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_SENDING_EMAIL_VERIFICATION_CODE:
		return true;
	case Types.IS_SENDING_EMAIL_VERIFICATION_CODE:
	case Types.DONE_SENDING_EMAIL_VERIFICATION_CODE:
		return false;
	default:
		return state;
	}
};

const isVerifyingEmail = (state = false, action) => {
	switch (action.type) {
	case Types.IS_VERIFYING_EMAIL:
		return true;
	case Types.DONE_VERIFYING_EMAIL:
	case Types.FAIL_VERIFYING_EMAIL:
		return false;
	default:
		return state;
	}
};

const doneVerifyingEmail = (state = false, action) => {
	switch (action.type) {
	case Types.DONE_VERIFYING_EMAIL:
		return true;
	case Types.IS_VERIFYING_EMAIL:
	case Types.FAIL_VERIFYING_EMAIL:
		return false;
	default:
		return state;
	}
};

const failVerifyingEmail = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_VERIFYING_EMAIL:
		return true;
	case Types.IS_VERIFYING_EMAIL:
	case Types.DONE_VERIFYING_EMAIL:
		return false;
	default:
		return state;
	}
};

const isSendingMobileCode = (state = false, action) => {
	switch (action.type) {
	case Types.IS_SENDING_MOBILE_VERIFICATION_CODE:
		return true;
	case Types.DONE_SENDING_MOBILE_VERIFICATION_CODE:
	case Types.FAIL_SENDING_MOBILE_VERIFICATION_CODE:
		return false;
	default:
		return state;
	}
};

const doneSendingMobileCode = (state = false, action) => {
	switch (action.type) {
	case Types.DONE_SENDING_MOBILE_VERIFICATION_CODE:
		return true;
	// case Types.IS_SENDING_MOBILE_VERIFICATION_CODE:
	case Types.FAIL_SENDING_MOBILE_VERIFICATION_CODE:
		return false;
	default:
		return state;
	}
};

const failSendingMobileCode = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_SENDING_MOBILE_VERIFICATION_CODE:
		return true;
	case Types.IS_SENDING_MOBILE_VERIFICATION_CODE:
	case Types.DONE_SENDING_MOBILE_VERIFICATION_CODE:
		return false;
	default:
		return state;
	}
};

const isVerifyingMobile = (state = false, action) => {
	switch (action.type) {
	case Types.IS_VERIFYING_MOBILE:
		return true;
	case Types.DONE_VERIFYING_MOBILE:
	case Types.FAIL_VERIFYING_MOBILE:
		return false;
	default:
		return state;
	}
};

const doneVerifyingMobile = (state = false, action) => {
	switch (action.type) {
	case Types.DONE_VERIFYING_MOBILE:
		return true;
	case Types.IS_VERIFYING_MOBILE:
	case Types.FAIL_VERIFYING_MOBILE:
		return false;
	default:
		return state;
	}
};

const failVerifyingMobile = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_VERIFYING_MOBILE:
		return true;
	case Types.IS_VERIFYING_MOBILE:
	case Types.DONE_VERIFYING_MOBILE:
		return false;
	default:
		return state;
	}
};

const isSubmittingKyc = (state = false, action) => {
	switch (action.type) {
	case Types.IS_SUBMITTING_KYC:
		return true;
	case Types.DONE_SUBMITTING_KYC:
	case Types.FAIL_SUBMITTING_KYC:
		return false;
	default:
		return state;
	}
};

const doneSubmittingKyc = (state = false, action) => {
	switch (action.type) {
	case Types.DONE_SUBMITTING_KYC:
		return true;
	case Types.IS_SUBMITTING_KYC:
	case Types.FAIL_SUBMITTING_KYC:
	case Types.LOGIN_SUCCESS:
	case Types.LOGOUT:
		return false;
	default:
		return state;
	}
};

const failSubmittingKyc = (state = "", action) => {
	switch (action.type) {
	case Types.FAIL_SUBMITTING_KYC:
		return action.error;
	case Types.IS_SUBMITTING_KYC:
	case Types.DONE_SUBMITTING_KYC:
		return "";
	default:
		return state;
	}
};

const isUploadingId = (state = false, action) => {
	switch (action.type) {
	case Types.IS_UPLOADING_ID_PHOTO:
		return true;
	case Types.DONE_UPLOADING_ID_PHOTO:
	case Types.RESET_UPLOADING_ID_PHOTO:
		return false;
	default:
		return state;
	}
};

const doneUploadingId = (state = "", action) => {
	switch (action.type) {
	case Types.DONE_UPLOADING_ID_PHOTO:
		return action.data;
	case Types.IS_UPLOADING_ID_PHOTO:
	case Types.RESET_UPLOADING_ID_PHOTO:
		return "";
	default:
		return state;
	}
};

const isUploadingSelfie = (state = false, action) => {
	switch (action.type) {
	case Types.IS_UPLOADING_SELFIE_PHOTO:
		return true;
	case Types.DONE_UPLOADING_SELFIE_PHOTO:
	case Types.RESET_UPLOADING_SELFIE_PHOTO:
		return false;
	default:
		return state;
	}
};

const doneUploadingSelfie = (state = "", action) => {
	switch (action.type) {
	case Types.DONE_UPLOADING_SELFIE_PHOTO:
		return action.data;
	case Types.IS_UPLOADING_SELFIE_PHOTO:
	case Types.RESET_UPLOADING_SELFIE_PHOTO:
		return "";
	default:
		return state;
	}
};

const isVerifyingUploadIdSelfiePhoto = (state = false, action) => {
	switch (action.type) {
	case Types.IS_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
		return true;
	case Types.DONE_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
	case Types.FAIL_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
	case Types.RESET_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
		return false;
	default:
		return state;
	}
};

const doneVerifyingUploadIdSelfiePhoto = (state = false, action) => {
	switch (action.type) {
	case Types.DONE_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
		return true;
	case Types.LOGIN_SUCCESS:
	case Types.LOGOUT:
	case Types.IS_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
	case Types.FAIL_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
	case Types.RESET_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
	case Types.RESET_UPLOADING_ID_PHOTO:
		return false;
	default:
		return state;
	}
};

const failVerifyingUploadIdSelfiePhoto = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
		return true;
	case Types.IS_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
	case Types.DONE_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
	case Types.RESET_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
		return false;
	default:
		return state;
	}
};

const isUploadingAddress = (state = false, action) => {
	switch (action.type) {
	case Types.IS_UPLOADING_ADDRESS_PHOTO:
		return true;
	case Types.DONE_UPLOADING_ADDRESS_PHOTO:
	case Types.RESET_UPLOADING_ADDRESS_PHOTO:
		return false;
	default:
		return state;
	}
};

const doneUploadingAddress = (state = "", action) => {
	switch (action.type) {
	case Types.DONE_UPLOADING_ADDRESS_PHOTO:
		return action.data;
	case Types.IS_UPLOADING_ADDRESS_PHOTO:
	case Types.RESET_UPLOADING_ADDRESS_PHOTO:
		return "";
	default:
		return state;
	}
};

const isUploadingAuth = (state = false, action) => {
	switch (action.type) {
	case Types.IS_UPLOADING_AUTH_PHOTO:
		return true;
	case Types.DONE_UPLOADING_AUTH_PHOTO:
	case Types.RESET_UPLOADING_AUTH_PHOTO:
		return false;
	default:
		return state;
	}
};

const doneUploadingAuth = (state = "", action) => {
	switch (action.type) {
	case Types.DONE_UPLOADING_AUTH_PHOTO:
		return action.data;
	case Types.IS_UPLOADING_AUTH_PHOTO:
	case Types.RESET_UPLOADING_AUTH_PHOTO:
		return "";
	default:
		return state;
	}
};

const isVerifyingUploadAddressAuthPhoto = (state = false, action) => {
	switch (action.type) {
	case Types.IS_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
		return true;
	case Types.DONE_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
	case Types.FAIL_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
	case Types.RESET_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
		return false;
	default:
		return state;
	}
};

const doneVerifyingUploadAddressAuthPhoto = (state = false, action) => {
	switch (action.type) {
	case Types.DONE_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
		return true;
	case Types.IS_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
	case Types.FAIL_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
	case Types.RESET_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
	case Types.RESET_UPLOADING_ADDRESS_PHOTO:
		return false;
	default:
		return state;
	}
};

const failVerifyingUploadAddressAuthPhoto = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
		return true;
	case Types.IS_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
	case Types.DONE_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
	case Types.RESET_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO:
		return false;
	default:
		return state;
	}
};

const currentStep = (state = "transactionPin", action) => {
	switch (action.type) {
	case Types.CHANGE_CURRENT_STEP:
		return action.data;
	case Types.LOGIN_SUCCESS:
	case Types.LOGOUT:
		return "transactionPin";
	default:
		return state;
	}
};

const currentScreen = (state = "profile", action) => {
	switch (action.type) {
	case Types.SET_CURRENT_SCREEN:
		return action.data;
	default:
		return state;
	}
};

const isClearingIdAndSelfiePhoto = (state = false, action) => {
	switch (action.type) {
	case Types.IS_CLEARING_ID_SELFIE_PHOTO:
		return true;
	case Types.DONE_CLEARING_ID_SELFIE_PHOTO:
	case Types.FAIL_CLEARING_ID_SELFIE_PHOTO:
		return false;
	default:
		return state;
	}
};

const doneClearingIdAndSelfiePhoto = (state = false, action) => {
	switch (action.type) {
	case Types.DONE_CLEARING_ID_SELFIE_PHOTO:
		return true;
	case Types.IS_CLEARING_ID_SELFIE_PHOTO:
	case Types.FAIL_CLEARING_ID_SELFIE_PHOTO:
		return false;
	default:
		return state;
	}
};

const failClearingIdAndSelfiePhoto = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_CLEARING_ID_SELFIE_PHOTO:
		return true;
	case Types.IS_CLEARING_ID_SELFIE_PHOTO:
	case Types.DONE_CLEARING_ID_SELFIE_PHOTO:
		return false;
	default:
		return state;
	}
};

const isClearingProofOfAddressPhoto = (state = false, action) => {
	switch (action.type) {
	case Types.IS_CLEARING_PROOF_OF_ADDRESS_PHOTO:
		return true;
	case Types.DONE_CLEARING_PROOF_OF_ADDRESS_PHOTO:
	case Types.FAIL_CLEARING_PROOF_OF_ADDRESS_PHOTO:
		return false;
	default:
		return state;
	}
};

const doneClearingProofOfAddressPhoto = (state = false, action) => {
	switch (action.type) {
	case Types.DONE_CLEARING_PROOF_OF_ADDRESS_PHOTO:
		return true;
	case Types.IS_CLEARING_PROOF_OF_ADDRESS_PHOTO:
	case Types.FAIL_CLEARING_PROOF_OF_ADDRESS_PHOTO:
		return false;
	default:
		return state;
	}
};

const failClearingProofOfAddressPhoto = (state = false, action) => {
	switch (action.type) {
	case Types.FAIL_CLEARING_PROOF_OF_ADDRESS_PHOTO:
		return true;
	case Types.IS_CLEARING_PROOF_OF_ADDRESS_PHOTO:
	case Types.DONE_CLEARING_PROOF_OF_ADDRESS_PHOTO:
		return false;
	default:
		return state;
	}
};

const IDetails = (state = {}, action) => {
	switch (action.type) {
	case Types.DONE_VERIFYING_UPLOAD_ID_SELFIE_PHOTO:
	case Types.CHECK_VERIFY_ID:
		return action.data;
	case Types.LOGOUT:
		return {};
	default:
		return state;
	}
};

// const isQRCodeSuccess = (state = false, action) => {
// 	switch (action.type) {
// 	case Types.SET_QR_CODE:
// 		return true;
// 	case Types.SET_QR_CODE_LOADING:
// 		return false;
// 	default:
// 		return state;
// 	}
// };

export default combineReducers({
	changeProfileInputs,
	isSavingProfileChanges,
	successSavingProfileChanges,
	failSavingProfileChanges,
	isUploadingPhoto,
	uploadedPhoto,
	failUploadingPhoto,
	isUpdatingProfilePhoto,
	doneUpdatingProfilePhoto,
	failUpdatingProfilePhoto,
	verificationProfileIsClick,
	isSendingEmailCode,
	doneSendingEmailCode,
	failSendingEmailCode,
	isVerifyingEmail,
	doneVerifyingEmail,
	failVerifyingEmail,
	isSendingMobileCode,
	doneSendingMobileCode,
	failSendingMobileCode,
	isVerifyingMobile,
	doneVerifyingMobile,
	failVerifyingMobile,
	isSubmittingKyc,
	doneSubmittingKyc,
	failSubmittingKyc,
	isUploadingId,
	doneUploadingId,
	isUploadingSelfie,
	doneUploadingSelfie,
	isVerifyingUploadIdSelfiePhoto,
	doneVerifyingUploadIdSelfiePhoto,
	failVerifyingUploadIdSelfiePhoto,
	isUploadingAddress,
	doneUploadingAddress,
	isUploadingAuth,
	doneUploadingAuth,
	isVerifyingUploadAddressAuthPhoto,
	doneVerifyingUploadAddressAuthPhoto,
	failVerifyingUploadAddressAuthPhoto,
	currentStep,
	currentScreen,
	isClearingIdAndSelfiePhoto,
	doneClearingIdAndSelfiePhoto,
	failClearingIdAndSelfiePhoto,
	isClearingProofOfAddressPhoto,
	doneClearingProofOfAddressPhoto,
	failClearingProofOfAddressPhoto,
	getKYCsteps,
	saveQRCode,
	IDetails,
});
