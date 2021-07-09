import { createStackNavigator } from "react-navigation-stack";
import Main from "./components/Main";
import reducers from "./reducers";

export const home = reducers;

export default createStackNavigator({
	Home: {
		screen: Main,
		navigationOptions: {
			headerShown: false,
		},
	},

}, {
	mode: "modal",
	headerMode: "none",
	defaultNavigationOptions: {
		headerBackTitle: null,
		gestureEnabled: true,
		cardStyle: { backgroundColor: "transparent" },
	},
});
