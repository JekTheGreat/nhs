import { createStackNavigator } from "react-navigation-stack";
import Main from "./components/Main";
import EditService from "./components/screens/EditService";
import reducers from "./reducers";

export const home = reducers;

export default createStackNavigator({
	Home: {
		screen: Main,
		navigationOptions: {
			headerShown: false,
		},
	},

	EditService: {
		screen: EditService,
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
