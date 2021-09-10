/* eslint-disable quotes */
/* eslint-disable max-len */
import * as Types from "./types";
import * as globals from "__src/globals";
import {Alert} from "react-native";
import _ from "lodash";
import moment from "moment";
import API from "__src/api/index";

export const walletAdded = (token, wallet) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.WALLET_LOADING });

			globals.setToken(token);
			const result = await API.callGet("/wallets/me");

			console.log("result", result);
			if (result) {
				dispatch({ type: Types.WALLET_ADDED, data: result.currencies });
				dispatch({ type: Types.SET_CURRENT_WALLET, data: result.walletNumber });
				if (result.currencies){
					const selectWallet = _.filter(result.currencies, _.isEmpty(wallet) ?
					 {primary: true} : {code: wallet.code});
		
					dispatch(walletSelected(selectWallet[0]));
				}
			}
		} catch (e) {
			if (e.message === "Unauthorized" && e.severity === "INFO"){
				// dispatch({type: Types.SET_UNAUTHORIZED});
			}
			dispatch({ type: Types.WALLET_ADDED_FAILED, e });
		}
	}
);

export const CurrencyList = (token) => (
	async (dispatch) => {
		try {

			globals.setToken(token);
			const result = await API.callGet("/currencies");

			if (result){
				dispatch({
					type: Types.GET_CURRENCIES_SUCCESS,
					data: result,
				});
			}

		} catch (e){
			dispatch({ type: Types.GET_CURRENCIES_ERROR });
		}
	}
);

export const createWalletCurrency = (params, token ) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.CREATE_WALLET_VERIFIED });

			globals.setToken(token);
			const result = await API.callPost("/wallets/me/currencies", params);

			dispatch({
				type: Types.CREATE_WALLET_CURRENCY_SUCCESS,
				data: result,
			});
		} catch (e) {
			dispatch({ type: Types.CREATE_WALLET_CURRENCY_FAIL, e });
		}
	}
);

export const getWalletLog = (token) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.EWALLET_LOGS_LOADING });

			globals.setToken(token);
			const result = await API.callGet("/transactions/me?sort=-createdAt");
			dispatch({
				type: Types.EWALLET_LOGS_SUCCESS,
				data: result,
			});

		} catch (err){
			dispatch({ type: Types.EWALLET_LOGS_FAILED, error: err.message || "Something went wrong (Code: 001)" });
		}
	}
);

export const walletSelected = (data) => ({
	type: Types.WALLET_SELECTED,
	data,
});

export const getBalanceSelected = (data) => ({
	type: Types.BALANCE_SELECTED,
	data,
});

export const selectedValue = (data) => ({
	type: Types.SELECTED_WALLET_VALUE,
	data,
});

export const closedWalletBox = (data) => ({
	type: Types.CLOSED_WALLET_BOX,
	data,
});

export const createWalletButton = () => ({
	type: Types.CREATE_WALLET_BUTTON,
});

export const addingWallet = () => ({
	type: Types.WALLET_ADDED_SUCCESS,
});

export const WalletSelected = (data) => ({
	type: Types.WALLET_SELECTED,
	data,
});

export const setEwalletScreen = (data) => ({
	type: Types.SET_EWALLET_SCREEN,
	data,
});

export const resetList = () => ({
	type: Types.RESET_ADDED_LIST,
});

export const resetState = () => ({
	type: Types.RESET_STATE_LIST,
});

export const selectedTarget = (data) => ({
	type: Types.SELECTED_TARGET,
	data,
});;

export const inputValue = (data) => ({
	type: Types.INPUT_VALUE,
	data,
});

export const inputAccountId = (data) => ({
	type: Types.INPUT_ACCOUNT_ID,
	data,
});

export const getTargetAccountWallet = (walletId) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.TARGET_ACCOUNT_LAODING });

			const walletAccount = await globals.Services.Wallet.ApiFactory.Account.findOne({
				where: { unifiedId: walletId },
				options: { returning: true },
			}, [
				"id",
			]);

			const res = await globals.Services.Wallet.ApiFactory.Wallet.findAll({
				where: {accountId: walletAccount.id},
				options: {returning: true},
			}, [
				"id",
				"credits",
				"isPrimary",
				"currencyId",
				"accountId",
				[
					"currency", [
						"name",
						"code",
						"symbol",
						"symbolNative",
					],
				],
				"createdAt",
				"updatedAt",
			]);

			const getClientId = await globals.therion.ApiFactory.Account.findOne({
				where: { id: walletId },
				options: { returning: true },
			}, [
				"id",
				[
					"client", [
						"id",
					],
				],
			]);

			const getUser = await globals.therion.ApiFactory.Client.findOne({
				where: { id: getClientId.client.id },
				options: { returning: true },
			}, [
				"firstName",
				"lastName",
				"middleName",
				[
					"user", [
						"email",
						"mobile",
					],
				],
			]);

			dispatch({
				type: Types.TARGET_ACCOUNT_WALLET,
				data: res.rows,
			});

			dispatch({
				type: Types.TARGET_ACCOUNT_USER,
				data: getUser,
			});
		} catch (err){
			dispatch({
				type: Types.TARGET_ACCOUNT_FAILED,
			});
		}
	}
);

export const resetTargetAccountUser = () => ({
	type: Types.RESET_TARGET_ACCOUNT_USER,
});

export const resetSendEcash = () => ({
	type: Types.RESET_SEND_ECASH,
});

export const setTargetWallet = (selectedTarget) => ({
	type: Types.SET_TARGET_WALLET,
	data: selectedTarget,
});

export const sendEcashFund = (params, token, wallet) => (
	async(dispatch) => {
		try {
			dispatch({type: Types.SENDING_ECASH});

			globals.setToken(token);
			const result = await API.callPost("/transactions/E2E", {...params});

			dispatch({
				type: Types.SEND_ECASH_SUCCESS,
				data: result,
			});

			dispatch(walletAdded(token, wallet));
		} catch (err){
			console.log(err);
			dispatch({type: Types.SEND_ECASH_FAILED, err});
		}
	}
);
// convert currency
export const convertInputValue = (amount, fromCurrency, toCurrency) => (
	async(dispatch) => {
		try {
			if (fromCurrency === toCurrency){
				dispatch({
					type: Types.CONVERT_VALUE,
					data: amount,
				});
			} else {
				const result = await globals.therion.ApiFactory.Transaction.create({
					values: {
						type: "calculate",
						amount,
						toCurrency,
						fromCurrency,
					},
					options: { returning: true },
				}, [
					"id",
					"amount",
					"convertedValue",
				]);

				console.log("result", result);

				dispatch({
					type: Types.CONVERT_VALUE,
					data: result.convertedValue,
				});
			}
		} catch (err) {
			console.log("err", err);
		}
	}
);
export const convertAmountInput = (data) => ({
	type: Types.CONVERT_AMOUNT_INPUT,
	data,
});
export const selectedConvertValueFrom = (data) => ({
	type: Types.SELECT_CONVERT_VALUE_FROM,
	data,
});

export const selectedConvertToRecieved = (data) => ({
	type: Types.SELECT_CONVERT_TO_RECIEVED,
	data,
});
export const resetConvertData = () => ({
	type: Types.RESET_CONVERT_DATA,
});

export const convertCurrency = ( amount, walletId, targetWallet ) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.CONVERT_CURRENCY_VERIFY});

			const result = await globals.Services.Wallet.ApiFactory.Transfer.create({
				values: {
					type: "DEBIT",
					amount,
					amountDue: amount,
					senderWalletId: walletId.id,
					receiverWalletId: targetWallet.id,
					note: `Convert ${amount}${walletId.currency.code} wallet to ${targetWallet.currency.code}.`,
				},
				options: {returning: true},
			}, [
				"id",
				"amount",
				"convertedAmount",
				"fee",
				"senderCurrentCredits",
				"senderDeductibleCredits",
				"receiverCurrentCredits",
				"receiverReceivableCredits",
				"referenceId",
				"note",
				"senderWalletId",
				"receiverWalletId",
				"senderId",
				"receiverId",
				"baseCurrencyId",
				"toCurrencyId",
				"createdAt",
				"updatedAt",
			]);

			dispatch({
				type: Types.CONVERT_CURRENCY_SUCCESS,
				data: result,
			});
		} catch (e) {
			console.log(e);
			dispatch({type: Types.CONVERT_CURRENCY_FAIL});
		}
	}
);

export const getIntRates = () => (
	async(dispatch) => {
		try {

			const result = await LoadingApi.getIntRates();

			if (result){
				dispatch({ type: Types.GET_INT_RATES, data: result });
			}
		} catch (error) {
			console.log("error", error);
		}
	}
);

export const convertedValuetoRecieved = (fromCurrency, toCurrency, amount, serviceFee) => (
	async (dispatch) => {
		try {

			const fromRate = await API.getIntRates(fromCurrency, toCurrency);

			console.log("fromRate", fromRate, fromCurrency, toCurrency, amount);

			
			if (fromRate){
				dispatch({
					type: Types.CONVERTED_VALUE_TO_RECIEVED_SUCCESS,
					data: fromRate.rates * amount,
				});
			}
		} catch (e) {
			dispatch({type: Types.CONVERTED_VALUE_TO_RECIEVED_FAIL, e});
		}
	}
);
export const currencyRate = ( fromCurrency ) => (
	async (dispatch) => {
		try {
			// if (fromCurrency === toCurrency){
			// 	dispatch({
			// 		type: Types.CURRENCY_RATE,
			// 		data: {from: "", to: "", result: "", rate: ""},
			// 	});
				
			// 	return;
			// }

			const fromRate = await globals.Services.Wallet.ApiFactory.CurrencyRate.findOne({
				where: {
					base: fromCurrency,
					createdAt: {
						$gt: new Date().setHours(0, 0, 0, 0),
						$lt: new Date().setHours(23, 59, 59, 999),
					},
				},
				options: {
					returning: true,
				},
			}, [
				"base",
				"rates",
				"currencyId",
			]);

			dispatch({
				type: Types.CURRENCY_RATE,
				data: fromRate,
			});

		} catch (e) {
			throw e;
		}
	}
);

export const resetAmountInput = () => ({
	type: Types.RESET_AMOUNT_INPUT,
});
// request

// claim GC
export const claimScreen = (data) => ({
	type: Types.SET_CLAIM_SCREEN,
	data,
});

export const ClaimGCInput = (data) => ({
	type: Types.CLAIM_GC_INPUT,
	data,
});

// network points
export const networpointsScreen = (data) => ({
	type: Types.SET_NETWORK_POINTS_SCREEN,
	data,
});

// fund request
export const setRequestScreen = (data) => ({
	type: Types.SET_REQUEST_SCREEN,
	data,
});

export const setRequestScreenHeader = (data) => ({
	type: Types.SET_REQUEST_SCREEN_HEADER,
	data,
});

export const setHeaderTitle = (data) => ({
	type: Types.SET_HEADER_TITLE,
	data,
});

export const resetRequestScreenHeader = () => ({
	type: Types.RESET_REQUEST_SCREEN_HEADER,
});

export const uploadBankPaymentConfirmImage = (url) => (
	async (dispatch) => {
		try {
			// dispatch({ type: Types.IS_UPLOADING_BANK_PAYMENT_CONFIRM_PHOTO });

			dispatch({
				type: Types.DONE_UPLOADING_BANK_PAYMENT_CONFIRM_PHOTO,
				data: url,
			});
		} catch (e) {
			console.log(e);
		}
	}
);

export const bankConfirmRemovePhoto = () => ({
	type: Types.BANK_PAYMENT_COFIRM_REMOVE_PHOTO,
});

export const setSelectedBank = (data) => ({
	type: Types.SELECT_BANK,
	data,
});

export const setAmountInput = (data) => ({
	type: Types.SET_AMOUNT_INPUT,
	data,
});

export const createFundRequest = (params, token, route, nextStep) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.REQUEST_INPROGRESS });

			globals.setToken(token);
			const result = await API.callPost(route, params);

			if (result){
				const response = await API.callGet(`/transactions/me/${result.transactionNumber}`);

				dispatch(setRequestScreen(nextStep || "bankDepositPayment"));
				dispatch(setRequestScreenHeader({amount: true, payment: true}));
				dispatch({ type: Types.CREATE_FUND_REQUEST_SUCCESS, data: response });
			}
		
		} catch (err){
			dispatch({ type: Types.CREATE_FUND_REQUEST_FAILED, err: err.message });
			Alert.alert("Notice", err.message || "Something went wrong.");
		}
	}
);

export const getFundRequest = (transactionNumber, token) => (
	async(dispatch) => {
		try {
			dispatch({ type: Types.REQUEST_INPROGRESS });

			globals.setToken(token);
			const response = await API.callGet(`/transactions/me/${transactionNumber}`);

			if (response){
				dispatch({ type: Types.CREATE_FUND_REQUEST_SUCCESS, data: response });
			}
		
		} catch (err){
			dispatch({ type: Types.CREATE_FUND_REQUEST_FAILED, err: err.message });
		}
	}
);

export const cancelFundRequest = () => (
	async(dispatch) => {
		try {
		
			dispatch(setRequestScreen("chooseMethod"));
			dispatch(setRequestScreenHeader({amount: false, payment: false}));
			dispatch(resetRequest());
		} catch (err) {
			console.log(err);
		}
	}
);

export const markPaidFundRequest = (parameter, token) => (
	async(dispatch) => {
		try {

			dispatch({ type: Types.REQUEST_BANK_PAID_PROGRESS});

			const params = new FormData();
			params.append("transaction", parameter.transaction);
			params.append("remarks", parameter.remarks);
			params.append("bank", parameter.bank);
			params.append("dateTime", parameter.dateTime);
			params.append("amount", parameter.amount);
			params.append("referenceNumber", parameter.referenceNumber);
			params.append("receipt", {type: "image/jpeg", uri: parameter.receipt, name: parameter.filename});

			globals.setToken(token);
			globals.setFormData(params);
			const response = await globals.CurrentApiForm.post(`/transactions/${parameter.transaction}/payment_receipts`);

			if (response){
				dispatch({ type: Types.REQUEST_BANK_PAID, data: response.referenceNumber });
				// dispatch(setRequestScreen("bankDepositPayment"));
				dispatch(setRequestScreenHeader({amount: true, payment: true}));
				// dispatch({ type: Types.CREATE_FUND_REQUEST_SUCCESS, data: response });
			}
		} catch (err) {
			console.log(err);
			dispatch({ type: Types.REQUEST_BANK_PAID_FAILED, error: err.message || "Something went wrong." });

		}
	}
);

export const gprsRequestFund = (type, targetWalletId,
	targetAccount, targetWalletCurrency, amount, userId) => (
	async(dispatch) => {
		try {
			dispatch({
				type: Types.REQUEST_INPROGRESS,
			});

			const result = await globals.therion.ApiFactory.FundRequest.create({
				values: {
					type,
					targetWalletId,
					targetAccount,
					targetWalletCurrency,
					amount,
					status: "WAITINGFORPAYMENT",
					userId,
				},
				options: {returning: true},
			}, [
				"trackingNumber",
				"id",
				"type",
				"targetWalletId",
				"targetAccount",
				"targetWalletCurrency",
				"amount",
				"status",
			]);

			if (result){
				dispatch(setRequestScreen("gprsPayment"));
				dispatch(setRequestScreenHeader({amount: true, payment: true}));
				dispatch({
					type: Types.CREATE_FUND_REQUEST_SUCCESS,
					data: result,
				});
			}
		} catch (err){
			console.log(err);
		}
	}
);

export const setConfirmPaymentInput = (newInputs) => ({
	type: Types.SET_CONFIRM_PAYMENT_INPUT,
	data: newInputs,
});

export const resetRequest = () => ({
	type: Types.REQUEST_RESET,
});

export const closedModal = () => ({
	type: Types.REQUEST_CLOSED_MODAL,
});

export const resetInputReducers = () => ({
	type: Types.RESET_INPUT_REDUCERS,
});

export const getAccumulatedPoints = (accountId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_GETTING_ACCUMULATED_POINTS });

			const result = await globals.therion.ApiFactory.AccumulatedPoint.findOne({
				where: { accountId },
				options: {returning: true},
			}, [
				"leftPoints",
				"rightPoints",
				"directReferral",
				"indirectReferral",
				"weeklyPairing",
				"totalPairing",
				"rightWaitingPoints",
				"leftWaitingPoints",
				"giftCheck",
				"flushoutLeft",
				"flushoutRight",
			]);

			if (!_.isEmpty(result) && !_.isString(result)) {
				const objectKeysResult = Object.keys(result);
				const arrayResult = [];

				_.map(objectKeysResult, (v, k) => {
					return arrayResult.push({
						key: k,
						category: v,
						value: parseInt(result[v], 10),
					});
				});

				dispatch({ type: Types.DONE_GETTING_ACCUMULATED_POINTS, data: arrayResult });
			} else {
				dispatch({ type: Types.FAIL_GETTING_ACCUMULATED_POINTS });
			}
		} catch (e) {
			dispatch({ type: Types.FAIL_GETTING_ACCUMULATED_POINTS });
		}
	}
);

export const getAccountAvailablePoints = (accountId) => (
	async (dispatch) => {
		try {
			dispatch({ type: Types.IS_GETTING_AVAILABLE_POINTS });

			const result = await globals.therion.ApiFactory.AvailablePoint.findOne({
				where: { accountId },
				options: {returning: true},
			}, [
				"directReferral",
				"indirectReferral",
				"totalPairing",
				"giftCheck",
				"totalPoints",
			]);

			if (!_.isEmpty(result) && !_.isString(result)) {
				dispatch({ type: Types.DONE_GETTING_AVAILABLE_POINTS, data: result });
			} else {
				dispatch({ type: Types.FAIL_GETTING_AVAILABLE_POINTS });
			}
		} catch (e) {
			console.log(e);
			dispatch({ type: Types.FAIL_GETTING_AVAILABLE_POINTS });
		}
	}
);

