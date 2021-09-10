
import EWallet from "./containers/Ewallet";
import history from "./containers/history";
import reducers from "./reducers";
import {createStackNavigator} from "react-navigation-stack";

export const wallet = reducers;
export const EcashtoEcashs = history;

export default createStackNavigator({
	EWallet: {
		screen: EWallet,
		navigationOptions: {
			headerShown: false,
		},
	},
}, {
	defaultNavigationOptions: {
		headerBackTitle: null,
	},
});

