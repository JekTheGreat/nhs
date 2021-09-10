import Loading from "./containers/Eloading";
import reducers from "./reducers";
import navigationOptions from "__src/components/navOpt";
// import { createAppContainer, createStackNavigator } from "react-navigation";
// import {createFluidNavigator} from "react-navigation-fluid-transitions";

export const loading = reducers;

// const AppNavigator = createStackNavigator({
// 	Loading: {
// 		screen: Loading,
// 		navigationOptions,
// 	},
// });

export default {
	Loading: {
		screen: Loading,
		navigationOptions,
	},
};

