/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
import _ from "lodash";
import moment from "moment";
import { Alert } from "react-native";
import API from "__src/api/index";
import * as Types from "./types";
import * as globals from "__src/globals";

export const setChangeProfileInputs = (data) => ({
	type: Types.SET_CHANGE_PROFILE_INPUTS,
	data,
});

export const setKYCsteps = (data) => ({
	type: Types.KYC_NEXT_STEPS,
	data,
});

export const resetSendingMobile = () => ({
	type: Types.FAIL_SENDING_MOBILE_VERIFICATION_CODE,
});

export const saveQRCode = (data) => ({
	type: Types.SAVE_QR_CODE,
	data,
});

export const resetChangeProfileInputs = () => ({
	type: Types.RESET_CHANGE_PROFILE_INPUTS,
});

export const submitKycForm = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_SUBMITTING_KYC });

			globals.setToken(token);
			const result = await API.callPatch("/profiles/me", params);

			dispatch({ type: Types.DONE_SUBMITTING_KYC, data: result || "Success" });
		} catch (e) {
			Alert.alert("Notice", e.message || "Something went wrong. Please try again (003)");
			dispatch({ type: Types.FAIL_SUBMITTING_KYC, error: JSON.stringify(e.errors) || "Something went wrong. Please try again (003)" });
		}
	}
);

export const saveProfileChanges = (params, token) => (
	// eslint-disable-next-line max-statements
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_SAVING_PROFILE_CHANGES });

			globals.setToken(token);
			const result = await API.callPatch("/profiles/me", params);

			dispatch({ type: Types.DONE_SAVING_PROFILE_CHANGES, data: result || "Success" });

		} catch (e) {
			dispatch({ type: Types.FAIL_SAVING_PROFILE_CHANGES, e });
		}
	}
);

// export const getAdditionalDetails = (token) => (
// 	async (dispatch) => {
// 		try {

// 			globals.setToken(token);
// 			const result = await API.callGet("/profiles/me");

// 			if (result) {
// 				dispatch({ type: Types.ADDITIONAL_DETAILS, data: result });
// 				dispatch(setProfileScreen("profile"));
// 			}
// 		} catch (e) {
// 		}
// 	}
// );

export const uploadProfilePhoto = (photo) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_UPLOADING_PROFILE_PHOTO });

			globals.CloudUpload.imageUpload(photo,
				() => {
					console.log();
				},
				(result) => {
					dispatch({
						type: Types.DONE_UPLOADING_PROFILE_PHOTO,
						data: result.secure_url ? result.secure_url : "",
					});
				},
				() => {
					console.log();
				}
			);
		} catch (e) {
			dispatch({ type: Types.FAIL_UPLOADING_PROFILE_PHOTO });
		}
	}
);

export const updateProfilePhoto = (uploadedPhoto, clientId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_UPDATING_PROFILE_PHOTO });

			const result = await globals.therion.ApiFactory.Client.update({
				values: {
					profilePhoto: uploadedPhoto,
				},
				options: {
					returning: true,
					where: {
						id: clientId,
					},
				},
			}, [
				"id",
				"userId",
				"profilePhoto",
			]);

			if (!_.isEmpty(result) && !_.isString(result)) {
				const query = {
					id: result.userId,
					client: {
						id: result.id,
						profilePhoto: result.profilePhoto,
					},
				};

				dispatch({ type: Types.DONE_UPDATING_PROFILE_PHOTO, data: query });
			} else {
				dispatch({ type: Types.FAIL_UPDATING_PROFILE_PHOTO });
			}
		} catch (e) {
			dispatch({ type: Types.FAIL_UPDATING_PROFILE_PHOTO });
		}
	}
);

export const resetUpdatingProfilePhoto = () => ({
	type: Types.RESET_UPDATING_PROFILE_PHOTO,
});

export const clickingVerification = (data) => ({
	type: Types.PROFILE_VERIFICATION_IS_CLICK,
	data,
});
export const resetIdSelfieAndAddressVerify = () => ({
	type: Types.RESET_ADDRESS_VERIFY,
});
export const sameStatedSelfieAndAddressVerify = () => ({
	type: Types.SAME_STATE_FOR_SELFIE_ADDRESS,
});

export const sendEmailCode = (id, email) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_SENDING_EMAIL_VERIFICATION_CODE });

			const result = await globals.therion.ApiFactory.User.update({
				values: {
					email,
				},
				options: {
					returning: true,
					where: {
						id,
					},
				},
			});

			if (!_.isEmpty(result) && !_.isString(result)) {
				dispatch({ type: Types.DONE_SENDING_EMAIL_VERIFICATION_CODE });
			} else {
				dispatch({ type: Types.FAIL_SENDING_EMAIL_VERIFICATION_CODE });
			}
		} catch (e) {
			console.log(e);
			dispatch({ type: Types.FAIL_SENDING_EMAIL_VERIFICATION_CODE });
		}
	}
);

export const verifyEmail = (id, email, verificationCode) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_VERIFYING_EMAIL });

			const getUserCode = await globals.therion.ApiFactory.User.findOne({
				where: { id },
				options: { returning: true },
			}, [
				"verificationCode",
				"verificationExpiresAt",
			]);

			if (!_.isEmpty(getUserCode) && !_.isString(getUserCode)) {
				if (getUserCode.verificationCode !== parseInt(verificationCode, 10)) {
					Alert("Invalid Code");
					dispatch({ type: Types.FAIL_VERIFYING_EMAIL });
				} else if (getUserCode.verificationExpiresAt < +moment()) {
					Alert("Verification already expired");
					dispatch({ type: Types.FAIL_VERIFYING_EMAIL });
				} else {
					const result = await globals.therion.ApiFactory.User.update({
						values: {
							email,
							verificationCode: parseInt(verificationCode, 10),
						},
						options: {
							returning: true,
							where: { id },
						},
					});

					if (!_.isEmpty(result) && !_.isString(result)) {
						dispatch({ type: Types.DONE_VERIFYING_EMAIL });
					} else {
						dispatch({ type: Types.FAIL_VERIFYING_EMAIL });
					}
				}
			} else {
				dispatch({ type: Types.FAIL_VERIFYING_EMAIL });
			}
		} catch (e) {
			console.log(e);
			dispatch({ type: Types.FAIL_VERIFYING_EMAIL });
		}
	}
);

export const sendMobileCode = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_SENDING_MOBILE_VERIFICATION_CODE });

			globals.setToken(token);
			const result = await API.callPost("/profiles/mobiles/send-code", params);

			dispatch({ type: Types.DONE_SENDING_MOBILE_VERIFICATION_CODE, data: result });
		} catch (e) {
			dispatch({ type: Types.FAIL_SENDING_MOBILE_VERIFICATION_CODE, e });
		}
	}
);

export const verifyMobile = (params, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_VERIFYING_MOBILE });

			globals.setToken(token);
			const result = await API.callPost("/profiles/mobiles/verify-code", params);


			dispatch({ type: Types.DONE_VERIFYING_MOBILE, data: result });
		} catch (e) {
			dispatch({ type: Types.FAIL_VERIFYING_MOBILE, e });
		}
	}
);

export const uploadIdPhoto = (idPhoto) => ({
	type: Types.DONE_UPLOADING_ID_PHOTO,
	data: idPhoto,
});

export const resetIdPhoto = () => ({
	type: Types.RESET_UPLOADING_ID_PHOTO,
});

export const uploadSelfiePhoto = (selfiePhoto) => ({
	type: Types.DONE_UPLOADING_SELFIE_PHOTO,
	data: selfiePhoto,
});

export const resetSelfiePhoto = () => ({
	type: Types.RESET_UPLOADING_SELFIE_PHOTO,
});

export const verifyUploadIdSelfiePhoto = (idPhoto, selfiePhoto, parameters, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_VERIFYING_UPLOAD_ID_SELFIE_PHOTO });
			const filename1 = idPhoto.split("/");
			const filename2 = selfiePhoto.split("/");

			const params = new FormData();
			params.append("content", JSON.stringify(parameters));
			params.append("images", { type: "image/jpg", uri: idPhoto, name: filename1[filename1.length - 1] });
			params.append("images", { type: "image/jpg", uri: selfiePhoto, name: filename2[filename2.length - 1] });

			globals.setToken(token);
			globals.setFormData(params);
			const result = await globals.CurrentApiForm.patch("/individuals/me/requirements/verifyId");


			dispatch({ type: Types.DONE_VERIFYING_UPLOAD_ID_SELFIE_PHOTO, data: { kyc1: { status: "pending", ...result } } });

		} catch (e) {
			console.log("result", JSON.stringify(e));
			dispatch({ type: Types.FAIL_VERIFYING_UPLOAD_ID_SELFIE_PHOTO, e });
		}
	}
);

export const uploadAddressPhoto = (addressPhoto) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_UPLOADING_ADDRESS_PHOTO });
			dispatch({ type: Types.DONE_UPLOADING_ADDRESS_PHOTO, data: addressPhoto });
		} catch (e) {
			console.log(e);
		}
	}
);

export const resetAddressPhoto = () => ({
	type: Types.RESET_UPLOADING_ADDRESS_PHOTO,
});

export const uploadAuthPhoto = (authPhoto) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_UPLOADING_AUTH_PHOTO });
			dispatch({ type: Types.DONE_UPLOADING_AUTH_PHOTO, data: authPhoto });
		} catch (e) {
			console.log(e);
		}
	}
);

export const resetAuthPhoto = () => ({
	type: Types.RESET_UPLOADING_AUTH_PHOTO,
});

export const verifyUploadAddressAuthPhoto = (addressPhoto, token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO });
			const filename1 = addressPhoto.split("/");
			const params = new FormData();
			params.append("images", { type: "image/jpg", uri: addressPhoto, name: filename1[filename1.length - 1] });

			globals.setToken(token);
			globals.setFormData(params);
			const result = await globals.CurrentApiForm.patch("/individuals/me/requirements/verifyAddress");


			dispatch({ type: Types.DONE_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO, data: { kyc2: { status: "pending", ...result } } });
		} catch (e) {
			console.log(e);
			dispatch({ type: Types.FAIL_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO });
		}
	}
);

export const changeCurrentStep = (step) => ({
	type: Types.CHANGE_CURRENT_STEP, data: step,
});

export const setIdAndSelfie = () => ({
	type: Types.DONE_VERIFYING_UPLOAD_ID_SELFIE_PHOTO,
});

export const setAddressAndAuth = () => ({
	type: Types.DONE_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO,
});

export const setCurrentScreen = (screen) => ({
	type: Types.SET_CURRENT_SCREEN,
	data: screen,
});

export const clearIdAndSelfie = (id) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.DONE_CLEARING_ID_SELFIE_PHOTO, data: { kyc1: {} } });
			dispatch({ type: Types.RESET_VERIFYING_UPLOAD_ID_SELFIE_PHOTO });
		} catch (e) {
			console.log(e);
			dispatch({ type: Types.FAIL_CLEARING_ID_SELFIE_PHOTO });
		}
	}
);

export const clearProofOfAddress = () => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.DONE_CLEARING_PROOF_OF_ADDRESS_PHOTO, data: { kyc2: {} } });
			dispatch({ type: Types.RESET_VERIFYING_UPLOAD_ADDRESS_AUTH_PHOTO });
		} catch (e) {
			console.log(e);
			dispatch({ type: Types.FAIL_CLEARING_PROOF_OF_ADDRESS_PHOTO });
		}
	}
);
