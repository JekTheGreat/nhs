

import reducers from "./reducers";
import navigationOptions from "__src/components/navOpt";
import AddLegacy from "./containers/AddLegacy";
import ALDetails from "./containers/Details";

export const addlegacy = reducers;


export default {
	AddLegacy: {
		screen: AddLegacy,
		navigationOptions,
	},
	ALDetails: {
		screen: ALDetails,
		navigationOptions,
	},
};
