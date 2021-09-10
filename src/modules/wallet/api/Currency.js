import * as globals from "__src/globals";

const Currency = {

	CurrencyList: async () => {
		try {
			const CurrencyList = await globals.CurrencyApi.get("/api/v1/currencies");

			return CurrencyList;
		} catch (e) {
			throw e;
		}
	},
	CreateWalletCurrency: async ( result, currency ) => {
		try {
			/* eslint-disable */
			const CreateWalletCurrency =
			await globals.CheckCurrencyApi.post("/api/v1/wallets/",
				{
					account: result.id,
					currency: currency,
				});
			/* eslint-enable */

			return CreateWalletCurrency;
		} catch (e) {
			throw e;
		}
	},

	RetrieveMultipleWallet: async ( id ) => {
		try {
			/* eslint-disable */
			const RetrieveMultipleWallet =
			await globals.CheckCurrencyApi.get("/api/v1/wallets/accounts/"+ id );
			/* eslint-enable */

			return RetrieveMultipleWallet;
		} catch (e) {
			throw e;
		}
	},
	RateCurrency: async (fromCurrency, toCurrency, amount) => {
		try {
			const result = await globals.CheckCurrencyApi.post("/api/v1/rates/calculate", {
				fromCurrency,
				toCurrency,
				amount,
			});

			return result;
		} catch (e) {
			throw e;
		}
	},
};

export default Currency;
