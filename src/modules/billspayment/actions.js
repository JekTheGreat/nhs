/* eslint-disable */
import * as Types from "./types";
import BillsPaymentAPI from "./api/index";
import * as globals from "__src/globals";

export const setBillsPaymentScreen = (data) => ({
	type: Types.SET_BILLSPAYMENTSCREEN,
	data,
});

export const setInputDetails = (data) => ({
	type: Types.SET_INPUTDETAILS,
	data,
});

export const setTransactionDates = (data) => ({
	type: Types.SET_TRANSACTION_DATES,
	data,
});

export const fetchBillers = () => (
	async (dispatch) => {
		try {
			const result = await BillsPaymentAPI.getBillers();

			if (result) {
				dispatch({ type: Types.GET_BILLERS, data: result });
			}
		} catch (error) {
		}
	}
);

export const fetchTransactions = (session) => (
	async (dispatch) => {
		try {
			globals.CurrentApi.setToken(session.token);
			const result = await BillsPaymentAPI.getTransactions();

			if (result) {
				dispatch({ type: Types.GET_TRANSACTIONS, data: result });
			}
		} catch (error) {
		}
	}
);

export const fetchCategories = () => (
	async (dispatch) => {
		try {
			const result = await BillsPaymentAPI.getCategories();

			if (result) {
				dispatch({ type: Types.GET_CATEGORIES, data: result });
			}
		} catch (error) {

		}
	}
);

export const getFields = (param) => (
	async (dispatch) => {
		try {
			const result = await BillsPaymentAPI.getFields(param);

			if (result) {
				dispatch({ type: Types.GET_FIELDS, data: result });
			}
		} catch (error) {

		}
	}
);

export const getReceipt = (param) => (
	async (dispatch) => {
		try {
			const result = await BillsPaymentAPI.getReceipt(param);
			if (result) {
				dispatch({ type: Types.GET_RECEIPT, data: result });
			}
		} catch (error) {

		}
	}
);

export const getRates = (param, billerId, userlevel) => (
	async (dispatch) => {
		try {
			const result = await BillsPaymentAPI.getRates(param, billerId, userlevel);

			if (result) {
				dispatch({ type: Types.GET_RATES, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.GET_RATES, data: result });
		}
	}
);

export const submitPayment = (params, session) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
			globals.BillsPayment.setToken(session.token);
			const result = await BillsPaymentAPI.submitPayment(params, session);

			if (result) {
				// result.currency = params.currency;
				dispatch({ type: Types.TRANSACTION_SUCCESSFUL, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error });
		}
	}
);


export const validateFields = (session, billerId, input) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.TRANSACTION_IN_PROGRESS });
			globals.BillsPayment.setToken(session.token);
			const result = await BillsPaymentAPI.validateFields(billerId, input);

			if (result) {
				console.log("RESULT: ", result);
				dispatch({ type: Types.VALIDATE_FIELDS, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.VALIDATE_FIELDS, data: error });

			// dispatch({ type: Types.TRANSACTION_FAILED, error: error });
		}
	}
);


export const uploadImage = (image, session) => (
	async (dispatch) => {
		try {
			const param = new FormData();
			param.append("image", { type: "image/jpeg", uri: image.uri, name: image.fileName });

			globals.BillsPaymentForm.setToken(session.token);
			globals.BillsPaymentForm.setFormData(param);
			const result = await globals.BillsPaymentForm.post("/v1/upload/soa");

			if (result) {
				console.log("RESULT: ", result);
				dispatch({ type: Types.UPLOAD_IMAGE, data: result });
			}
		} catch (error) {
			dispatch({ type: Types.TRANSACTION_FAILED, error: error });
		}
	}
);