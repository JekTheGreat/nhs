import * as Types from "./types";
import * as globals from "__src/globals";
import _ from "lodash";

export const setAddLegacyTabs = (data) => ({
	type: Types.ADDLEGACY_SET_TABS,
	data,
});

export const setAddLegacyAccountScreen = (data) => ({
	type: Types.ADDLEGACY_ACCOUNT_SET_SCREEN,
	data,
});

export const setSearchRegcodeInput = (data) => ({
	type: Types.SET_SEARCH_RECODE_INPUT,
	data,
});

export const searchRegcode = (accountNumber) => (
	async ( dispacth ) => {
		try {
			dispacth({ type: Types.SEARCHING_REGCODE });

			const result = {};

			if (result) {
				if (result.isLegacyAccount === true && result.clientId === 1 &&
					!_.isEmpty(result.mobile)) {
					dispacth({
						type: Types.ADDLEGACY_ACCOUNT_SET_SCREEN,
						data: "regcodeAccount",
					});
				} else {
					dispacth({ type: Types.SEARCH_REGCODE_FAIL });
				}
			} else {
				dispacth({ type: Types.SEARCH_REGCODE_FAIL });
			}
		} catch (e) {
			dispacth({ type: Types.SEARCH_REGCODE_FAIL, e});
		}
	}
);

export const setRegcodeCredentials = (data) => ({
	type: Types.SET_REGCODE_CREDENTIALS,
	data,
});

export const getRegcodeCredentials = (credentials, id) => (
	async ( dispacth ) => {
		try {
			dispacth({ type: Types.GETTING_REGCODE_CREDENTIALS });

			const result = {};

			if (result) {
				// dispacth({
				// 	type: Types.GET_REGCODE_CREDENTIALS_SUCCESS,
				// 	data: result,
				// });
				dispacth({
					type: Types.ADDLEGACY_ACCOUNT_SET_SCREEN,
					data: "confirmationCode",
				});
			} else {
				dispacth({ type: Types.GET_REGCODE_CREDENTIALS_FAILED });
			}
		} catch (e) {
			dispacth({ type: Types.GET_REGCODE_CREDENTIALS_FAILED });
		}
	}
);

export const saveVerificationCode = (data) => ({
	type: Types.SAVE_VERIFICATION_CODE,
	data,
});

export const verifyCode = (code, id, clientId) => (
	async ( dispacth ) => {
		try {
			dispacth({ type: Types.VERIFYING_CODE });

			const result = {};

			if (_.isEmpty(result)) {
				dispacth({ type: Types.VERIFY_CODE_FAILED });
			} else {
				dispacth({ type: Types.VERIFY_CODE_SUCCESS });
				dispacth({
					type: Types.ADDLEGACY_ACCOUNT_SET_SCREEN,
					data: "Success",
				});
			}
		} catch (e) {
			dispacth({ type: Types.VERIFY_CODE_FAILED });
		}
	}
);

export const resendCode = (credentials, id) => (
	async ( dispacth ) => {
		try {
			dispacth({ type: Types.RESENDING_CODE });

			const result = {};

			if (result) {
				dispacth({
					type: Types.RESENDING_CODE_SUCCESS,
					data: result,
				});
			} else {
				dispacth({ type: Types.RESENDING_CODE_FAILED });
			}
		} catch (e) {
			dispacth({ type: Types.RESENDING_CODE_FAILED });
		}
	}
);

export const closeModal = () => ({
	type: Types.ADD_LEGACY_CLOSE_MODAL,
});

export const getClaimHistory = (clientId) => (
	async ( dispacth ) => {
		try {
			dispacth({ type: Types.GETTING_HISTORY_CLAIM });

			const result = {};

			if (_.isEmpty(result)) {
				dispacth({ type: Types.GET_HISTORY_CLAIM_FAILED });
			} else {
				dispacth({
					type: Types.GET_HISTORY_CLAIM_SUCCESS,
					data: result.rows,
				});
			}
		} catch (e) {
			dispacth({ type: Types.GET_HISTORY_CLAIM_FAILED, e });
		}
	}
);
