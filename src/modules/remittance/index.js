import Remittance from "./containers/Remittance";
import reducers from "./reducers/index";
import navigationOptions from "__src/components/navOpt";

export const remittance = reducers;

export default {
	Remittance: {
		screen: Remittance,
		navigationOptions,
	},
};

