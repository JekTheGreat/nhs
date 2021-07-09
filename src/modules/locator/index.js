import ViewStore from "./containers/Store";
import reducers from "./reducers";
export const locator = reducers;

export default {
	ViewStore: {
		screen: ViewStore,
	},
};
