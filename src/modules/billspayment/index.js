import BillsPaymentHome from "./containers/Store";
import navigationOptions from "__src/components/navOpt";
import reducers from "./reducers";
export const billspayment = reducers;

export default {
	BillsPaymentHome: {
		screen: BillsPaymentHome,
		navigationOptions,
	},
};
