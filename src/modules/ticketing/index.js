import Ticketing from "./containers/Ticketing";
import reducers from "./reducers";
import navigationOptions from "__src/components/navOpt";
// import { createAppContainer, createStackNavigator } from "react-navigation";
// import {createFluidNavigator} from "react-navigation-fluid-transitions";

export const ticketing = reducers;

// const AppNavigator = createStackNavigator({
// 	Loading: {
// 		screen: Loading,
// 		navigationOptions,
// 	},
// });

export default {
	Ticketing: {
		screen: Ticketing,
		navigationOptions,
	},
};

