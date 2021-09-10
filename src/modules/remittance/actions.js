/* eslint-disable */
import * as Types from "./types";
import RemittanceAPI from "./api/index";
import * as globals from "__src/globals";
import _ from "lodash";

export const setSelectedScreen = (data) => ({
	type: Types.GET_SELECTED_SCREEN,
	data,
});

export const selectProvider = (data) => ({
	type: Types.SELECTED_PROVIDER,
	data,
});

export const setPayoutChildScreen = (data) => ({
	type: Types.GET_PAYOUT_CHILD_SCREEN,
	data,
});

export const resetRemittance = () => ({
	type: Types.RESET_REMITTANCE,
});

export const inputDetails = (data) => ({
	type: Types.SET_INPUT_DETAILS,
	data,
});

export const inputPayoutDetails = (data) => ({
	type: Types.SET_INPUT_PAYOUT_DETAILS,
	data,
});

export const inputPOD = (data) => ({
	type: Types.SET_INPUT_POD,
	data,
});

export const fetchProviderSend = (token) => (
	async(dispatch) => {
		try {
			const result = await RemittanceAPI.callGet("/provider/SEND",token);

			if (result){
				dispatch({ type: Types.GET_ALL_PROVIDER, data: result.D});
			}
		} catch (error) {
		}
	}
);

export const searchClient = (params, token) => (
	async(dispatch) => {
		try {

			dispatch({ type: Types.SEARCH_IN_PROGRESS});

			const result = await RemittanceAPI.callPost("/sender/get", params, token);

			if (_.isEmpty(result.D)){
				result.S = 0;
				dispatch({ type: Types.SEARCH_SUCCESS, data: result});
			}	else {
				dispatch({ type: Types.SEARCH_SUCCESS, data: result});
			}
		} catch (error) {
			dispatch({ type: Types.SEARCH_FAILED, error});
		}
	}
);

export const searchBeneficiary = (params, token) => (
	async(dispatch) => {
		try {

			dispatch({ type: Types.SEARCH_IN_PROGRESS});

			const result = await RemittanceAPI.callPost("/getBeneficiary", params, token);

			if (_.isEmpty(result.D)){
				result.S = 0;
				dispatch({ type: Types.SEARCH_SUCCESS, data: result});
			}	else {
				dispatch({ type: Types.SEARCH_SUCCESS, data: result});
			}
		} catch (error) {
			dispatch({ type: Types.SEARCH_FAILED, error});
		}
	}
);

export const AddSender = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_CLIENT_INPROGRESS});

			const result = await RemittanceAPI.AddSender(params);

			if (result){
				result.type = "add";
				dispatch({ type: Types.ADD_CLIENT_SUCCESS, data: result});
			}
		} catch (error) {
			dispatch({ type: Types.ADD_CLIENT_FAILED, error});
		}
	}
);

export const OTPSend = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.OTP_SEND_LOAD });

			const result = await RemittanceAPI.OTPSend(params);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.OTP_SEND, data: result.D});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.OTP_SEND_FAILED, error});
		}
	}
);

export const OTPResend = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.OTP_SEND_LOAD });

			const result = await RemittanceAPI.OTPSend(params);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.OTP_SEND, data: result.D});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.OTP_SEND_FAILED, error: error.M || "Something went wrong. Please try again."});
		}
	}
);

export const OTPVerify = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.OTP_VERIFY_LOAD });

			const result = await RemittanceAPI.OTPVerify(params);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.OTP_VERIFY, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.OTP_VERIFY_FAILED, error: error.M || "Something went wrong. Please try again."});
		}
	}
);

export const PayoutPin = (params, params2) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.PAYOUT_PIN_LOAD});

			const result = await RemittanceAPI.call("/transaction/pin", params);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.PAYOUT_PIN, data: result});
				if(params2){
					dispatch(EcashpadalaPayout(params2));
				}
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.PAYOUT_PIN_FAILED, error: error.M || "Something went wrong. Please try again."});
		}
	}
);

export const EcashpadalaPayout = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_INPROGRESS});

			const result = await RemittanceAPI.call("/EcashPadala/payout", params);
			console.log("Result:", JSON.stringify(result));
			if (_.has(result, "S") && result.S === 1){
				result.type = "payout";
				dispatch({ type: Types.TRANSACTION_SUCCESS, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error: error.M || "Something wrong!"});
		}
	}
);

export const getIdType = (token) => (
	async(dispatch) => {
		try {

			const result = await RemittanceAPI.callGet("/idTypes/ecps", token);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.GET_ID_TYPES, data: result.D});
			}
		} catch (error) {
		}
	}
);

export const getIdTypePayout = (token) => (
	async(dispatch) => {
		try {

			const result = await RemittanceAPI.callGet("/idTypes/ecpp", token);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.GET_ID_TYPES_PAYOUT, data: result.D});
			}
		} catch (error) {
		}
	}
);

export const uploadIdPhoto = (idPhoto) => (
	async (dispatch) => {
		try {

			dispatch({
				type: Types.DONE_UPLOADING_ID_PHOTO,
				data: idPhoto ? idPhoto : "",
			});
		} catch (e) {
			dispatch({ type: Types.DONE_UPLOADING_ID_PHOTO_FAILED, e });
		}
	}
);

export const secondaryId = (idPhoto) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_UPLOADING_SECONDARY_ID_PHOTO });

			globals.CloudUpload.imageUpload(idPhoto,
				() => { },
				(result) => {
					dispatch({
						type: Types.DONE_UPLOADING_SECONDARY_ID_PHOTO,
						data: result.secure_url ? result.secure_url : "",
					});
				},
				() => { }
			);
		} catch (e) {
			dispatch({ type: Types.DONE_UPLOADING_SECONDARY_ID_PHOTO_FAILED, e });
		}
	}
);

export const uploadSelfiePhoto = (idPhoto) => (
	async (dispatch) => {
		try {
			dispatch({
				type: Types.DONE_UPLOADING_SELFIE_PHOTO,
				data: idPhoto ? idPhoto : "",
			});
		} catch (e) {
			dispatch({ type: Types.DONE_UPLOADING_SELFIE_PHOTO_FAILED, e });
		}
	}
);

export const clearUpload = (data) => ({
	type: Types.DONE_UPLOADING_ID_PHOTO,
	data,
});

export const clearSecondaryId = (data) => ({
	type: Types.DONE_UPLOADING_SECONDARY_ID_PHOTO,
	data,
});

export const clearUploadSelfie = (data) => ({
	type: Types.DONE_UPLOADING_SELFIE_PHOTO,
	data,
});

export const checkIdRegisterPayout = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.CHECK_EXISTING_PAYOUT_ID_LOAD});

			const result = await RemittanceAPI.call("/customerKYC/get", params);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.CHECK_EXISTING_PAYOUT_ID, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.CHECK_EXISTING_PAYOUT_ID_FAILED, error});
		}
	}
);

const getFileName = (url) => {
	try {
		new URL(url);

		const x = url.split('https://storage.googleapis.com/v3-remittance-bucket-main-01/').pop()
		return x.split("?")[0]
	} catch (_) {
		return url
	}
}

export const AddNewPayoutID = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_NEW_PAYOUT_ID_LOAD});
			const filename1 = params.attachment.split("/");
			const filename2 = params.selfie.split("/");
			const upload = new FormData();
			upload.append("file", {type: "image/jpg", uri: params.attachment, name: filename1[filename1.length - 1]});
			upload.append("file", {type: "image/jpg", uri: params.selfie, name: filename2[filename2.length - 1]});

			globals.setToken(token);
			globals.setFormData(upload);
			const resultUpload = await globals.RemittanceForm.post("/private/upload");

			if(resultUpload.S === 1){
				params.attachment = resultUpload.D[0].url;
				params.selfie = resultUpload.D[1].url;

				const result = await RemittanceAPI.callPost("/customerKYC/create", params, token);

				if (_.has(result, "S") && result.S === 1){
					dispatch({ type: Types.ADD_NEW_PAYOUT_ID, data: result});
				} else {
					throw result;
				}
			}
		} catch (error) {
			dispatch({ type: Types.ADD_NEW_PAYOUT_ID_FAILED, error});
		}
	}
);

export const RenewPayoutID = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_NEW_PAYOUT_ID_LOAD});
			if(params.attachment.startsWith("https")){
				params.attachment = getFileName(params.attachment);
			}

			if(params.selfie.startsWith("https")){
				params.selfie = getFileName(params.selfie);
			}
			
			const result = await RemittanceAPI.callPost("/customerKYC/update", params, token);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.ADD_NEW_PAYOUT_ID, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.ADD_NEW_PAYOUT_ID_FAILED, error});
		}
	}
);

export const RenewPayoutIDWithUpload = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_NEW_PAYOUT_ID_LOAD});

			const filename1 = params.attachment.split("/");
			const filename2 = params.selfie.split("/");
			const upload = new FormData();
			upload.append("file", {type: "image/jpg", uri: params.attachment, name: filename1[filename1.length - 1]});
			upload.append("file", {type: "image/jpg", uri: params.selfie, name: filename2[filename2.length - 1]});

			globals.setToken(token);
			globals.setFormData(upload);
			const resultUpload = await globals.RemittanceForm.post("/private/upload");

			if(resultUpload.S === 1){
				params.attachment = resultUpload.D[0].url;
				params.selfie = resultUpload.D[1].url;
				const result = await RemittanceAPI.callPost("/customerKYC/update", params, token);

				if (_.has(result, "S") && result.S === 1){
					dispatch({ type: Types.ADD_NEW_PAYOUT_ID, data: result});
				} else {
					throw result;
				}
			}
		} catch (error) {
			dispatch({ type: Types.Types.ADD_NEW_PAYOUT_ID_FAILED, error: error.message || "Something wrong!"});
		}
	}
);

export const checkIdRegisterSend = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.CHECK_EXISTING_ID_LOAD});

			const result = await RemittanceAPI.call("/customerKYC/get", params);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.CHECK_EXISTING_ID, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.CHECK_EXISTING_ID_FAILED, error});
		}
	}
);

export const AddNewID = (params, token, screen) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_NEW_ID_LOAD});
			const filename1 = params.attachment.split("/");
			const filename2 = params.selfie.split("/");
			const upload = new FormData();
			upload.append("file", {type: "image/jpg", uri: params.attachment, name: filename1[filename1.length - 1]});
			upload.append("file", {type: "image/jpg", uri: params.selfie, name: filename2[filename2.length - 1]});

			globals.setToken(token);
			globals.setFormData(upload);
			const resultUpload = await globals.RemittanceForm.post("/private/upload");

			if(resultUpload.S === 1){
				params.attachment = resultUpload.D[0].url;
				params.selfie = resultUpload.D[1].url;

				const result = await RemittanceAPI.callPost("/customerKYC/create", params, token);

				if (_.has(result, "S") && result.S === 1){
					dispatch({ type: Types.ADD_NEW_ID, data: result});
					if(params.type === "SEND"){
						dispatch(setSelectedScreen(screen));
					} else {
						dispatch(setSelectedScreen(screen));
					}
				} else {
					throw result;
				}
			}
		} catch (error) {
			dispatch({ type: Types.ADD_NEW_ID_FAILED, error: error.message || "Something wrong!"});
		}
	}
);

export const RenewIDWithUpload = (params, token, screen) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_NEW_ID_LOAD});

			const filename1 = params.attachment.split("/");
			const filename2 = params.selfie.split("/");
			const upload = new FormData();
			upload.append("file", {type: "image/jpg", uri: params.attachment, name: filename1[filename1.length - 1]});
			upload.append("file", {type: "image/jpg", uri: params.selfie, name: filename2[filename2.length - 1]});

			globals.setToken(token);
			globals.setFormData(upload);
			const resultUpload = await globals.RemittanceForm.post("/private/upload");

			if(resultUpload.S === 1){
				params.attachment = resultUpload.D[0].url;
				params.selfie = resultUpload.D[1].url;
				const result = await RemittanceAPI.callPost("/customerKYC/update", params, token);

				if (_.has(result, "S") && result.S === 1){
					dispatch({ type: Types.ADD_NEW_ID, data: result});
					dispatch(setSelectedScreen(screen))
				} else {
					throw result;
				}
			}
		} catch (error) {
			dispatch({ type: Types.ADD_NEW_ID_FAILED, error: error.message || "Something wrong!"});
		}
	}
);


export const RenewID = (params, token, screen) => (
	async(dispatch) => {
		try {

			dispatch({ type: Types.ADD_NEW_ID_LOAD});

			if(params.attachment.startsWith("https")){
				params.attachment = getFileName(params.attachment);
			}

			if(params.selfie.startsWith("https")){
				params.selfie = getFileName(params.selfie);
			}
			
			const result = await RemittanceAPI.callPost("/customerKYC/update", params, token);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.ADD_NEW_ID, data: result});
				dispatch(setSelectedScreen(screen))
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.ADD_NEW_ID_FAILED, error: error.message || "Something wrong!"});
		}
	}
);

export const getPODdetails = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.GET_POD_TRANSACTION_LOAD});

			const result = await RemittanceAPI.call("/pod/search", params);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.GET_POD_TRANSACTION, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.GET_POD_TRANSACTION, data: error});
		}
	}
);

export const Payout = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_INPROGRESS});

			const result = await RemittanceAPI.call("/Cebuana/Payout", params);

			if (_.has(result, "S") && result.S === 1){
				result.type = "payout";
				dispatch({ type: Types.TRANSACTION_SUCCESS, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, data: error});
		}
	}
);

export const PODPayout = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_INPROGRESS});

			const result = await RemittanceAPI.call("/pod/create", params);

			if (_.has(result, "S") && result.S === 1){
				result.type = "pod";
				dispatch({ type: Types.TRANSACTION_SUCCESS, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, data: error});
		}
	}
);

export const SendReports = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.SEND_REPORT_INPROGRESS});

			const result = await RemittanceAPI.call("/transaction/browse", params);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.SEND_REPORT_SUCCESS, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.SEND_REPORT_FAILED, data: error});
		}
	}
);

export const PayoutReports = (params) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.SEND_REPORT_INPROGRESS});

			const result = await RemittanceAPI.call("/transaction/browse", params);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.SEND_REPORT_SUCCESS, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.SEND_REPORT_FAILED, data: error});
		}
	}
);

export const addSenderRemittance = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_CLIENT_INPROGRESS});

			const result = await RemittanceAPI.callPost("/sender/add", params, token);

			if (_.has(result, "S") && result.S === 1){
				result.type = "add";
				dispatch({ type: Types.ADD_CLIENT_SUCCESS, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.ADD_CLIENT_FAILED, error: error.M });
		}
	}
);

export const addBeneficiaryRemittance = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_CLIENT_INPROGRESS});

			const result = await RemittanceAPI.callPost("/addBeneficiary", params, token);

			if (_.has(result, "S") && result.S === 1){
				result.type = "add";
				dispatch({ type: Types.ADD_CLIENT_SUCCESS, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.ADD_CLIENT_FAILED, error: error.M });
		}
	}
);

export const updateClient = (params, route, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.ADD_CLIENT_INPROGRESS});

			const result = await RemittanceAPI.callPatch(route, params, token);

			if (_.has(result, "S") && result.S === 1){
				result.type = "update";
				dispatch({ type: Types.ADD_CLIENT_SUCCESS, data: result});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.ADD_CLIENT_FAILED, error: error.M || "Something went wrong!", error2: error });
		}
	}
);

export const RemittanceFee = (params, token) => (
	async(dispatch) => {
		try {

			const result = await RemittanceAPI.callPost("/transaction/serviceFee", params, token);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.SERVICES_FEE, data: result.D});
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error: error.M });
		}
	}
);

export const RemittanceTransactSend= (params, token) => (
	async(dispatch) => {
		try {

			dispatch({ type: Types.TRANSACTION_INPROGRESS});

			const result = await RemittanceAPI.callPost(params.api, params, token);

			if (_.has(result, "S") && result.S === 1){
				result.type = "success";
				result.TRANSTYPE = "payout";
				dispatch({ type: Types.TRANSACTION_SUCCESS, data: result});
			}else{
				throw result;
			}
		} catch (error) {
			const err = _.has(error, "M") ? error.M : "Invalid transaction, please try again.";
			
			dispatch({ type: Types.TRANSACTION_FAILED, error: err});
		}
	}
);

export const validateAmount = (params, token) => (
	async(dispatch) => {
		try {

			dispatch({ type: Types.SELECTED_PROVIDER_LOAD});

			const result = await RemittanceAPI.callPost("/ecps/validateAmount", params, token);

			if (_.has(result, "S") && result.S === 1){
				dispatch({ type: Types.SELECTED_PROVIDER, data: result.D});
				dispatch(setSelectedScreen("senderDetails"));
			}else{
				throw result;
			}
		} catch (error) {
			const err = _.has(error, "M") ? error.M : "Something went wrong, please try again.";
			
			dispatch({ type: Types.SELECTED_PROVIDER_FAILED, error: err});
		}
	}
);

export const checkVerification = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.CHECK_VERIFICATION_LOAD});
			const param = {};
			param.id1 = params.id1;
			param.id2 = params.id2;
			const validate = await RemittanceAPI.callPost("/customerKYC/validate", param, token);

			if (_.has(validate, "S") && validate.S === 0){
				throw validate;
			}

			const forOtp = await RemittanceAPI.callPost("/ecps/forOtp", params, token);

			if (_.has(forOtp, "S") && forOtp.S === 0){
				throw forOtp;
			}
			const param1 = {};
			param1.userId = params.userId;
			param1.email = params.email;
			param1.provider = params.provider;
			param1.company = params.company;
			dispatch(OTPSend(param1, token))

		} catch (error) {
			const err = _.has(error, "M") ? error.M : "Something went wrong, please try again.";
			
			dispatch({ type: Types.CHECK_VERIFICATION_FAILED, error: err});
		}
	}
);


// REMITTANCE PAYOUT

export const selectPayoutProvider = (data) => ({
	type: Types.SELECTED_PAYOUT_PROVIDER,
	data,
});

export const setPayoutScreen = (data) => ({
	type: Types.GET_PAYOUT_SCREEN,
	data,
});

export const fetchProviderPayout = (token) => (
	async(dispatch) => {
		try {
			const result = await RemittanceAPI.callGet("/provider/PAYOUT", token);

			if (result){
				dispatch({ type: Types.GET_ALL_PROVIDER_PAYOUT, data: result.D});
			}
		} catch (error) {
		}
	}
);

export const getPayoutInfo = (params, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_INPROGRESS});

			const result = await RemittanceAPI.callPost("/getTransaction", params, token);

			console.log("result", result);
			if (_.has(result, "S") && result.S === 1){
				result.type = "selection";
				dispatch({ type: Types.GET_PAYOUT_DETAILS, data: result});
				dispatch(selectPayoutProvider(result.D.steps));
			} else {
				throw result;
			}
		} catch (error) {
			dispatch({ type: Types.GET_PAYOUT_DETAILS_FAILED, error: error.M || "Something went wrong."});
		}
	}
);