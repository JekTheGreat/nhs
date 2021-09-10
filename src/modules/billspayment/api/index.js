/*eslint-disable*/
import * as globals from "__src/globals";

const BillsPayment = {

	getBillers: async () => {
		try {
			const result = await globals.BillsPayment.get(`/v1/billers/client`);

			return result;
		} catch (e) {
			throw e;
		}
	},

	getCategories: async () => {
		try {
			const result = await globals.BillsPayment.get(`/v1/categories`);

			return result;
		} catch (e) {
			throw e;
		}
	},

	getFields: async (param) => {
		try {
			const result = await globals.BillsPayment.get(`/v1/billers/${param}`);

			return result;
		} catch (e) {
			throw e;
		}
	},

	getReceipt: async (param) => {
		try {
			const result = await globals.BillsPayment.get(`/v1/receipts/${param}`);

			return result;
		} catch (e) {
			throw e;
		}
	},


	getRates: async (param, billerId, userlevel) => {
		try {
			// const result = await globals.BillsPayment.get(`/v1/billers/${billerId}/rates/levels/${userlevel}`);
			// const result = await globals.BillsPayment.get(`/v1/billers/${billerId}/rates/levels/retailer`);
			const result = await globals.BillsPayment.post(`/v1/billers/${billerId}/rates/levels/${userlevel}`, { ...param, });
			return result;
		} catch (e) {
			throw e;
		}
	},

	submitPayment: async (params, session) => {
		try {
			const result = await globals.BillsPayment.post(`/v1/payments`, {
				...params,
			});

			return result;
		} catch (e) {
			throw e;
		}
	},

	validateFields: async (billerId, input) => {
		try {
			const result = await globals.BillsPayment.post(`/v1/payments/validate-fields`, {
				billerId, input
			});

			return result;
		} catch (e) {
			throw e;
		}
	},

	getTransactions: async (date) => {
		try {
			// const newDate = new Date();
			// const dateToday = moment(newDate).format('MM/DD/YYYY');
			// const route = _.isEmpty(date)? `/v1/transactions/me?offset=0&limit=10&createdAt=between:04/01/2019,${dateToday}&service=BILLSPAYMENT&sort=-createdAt`
			//  : `/v1/transactions/me?offset=0&limit=10&createdAt=between:${date}&service=BILLSPAYMENT&sort=-createdAt` ;
			const result = await globals.CurrentApi.get('/transactions/me?service=BILLSPAYMENT');

			return result;
		} catch (e) {
			throw e;
		}
	},

};

export default BillsPayment;
