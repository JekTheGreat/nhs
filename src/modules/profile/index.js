import Main from "./containers/main";
import qrscan from "./containers/qrscan";
import reducers from "./reducers";
import { createStackNavigator } from "react-navigation-stack";

export const profile = reducers;
export const QRScan = qrscan;

export default createStackNavigator(
	{
		Main: {
			screen: Main,
			navigationOptions: {
				headerShown: false,
			},
		},
	},
	{
		defaultNavigationOptions: {
			headerBackTitle: null,
		},
	}
);
