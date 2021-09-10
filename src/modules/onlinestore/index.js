/*eslint-disable*/
import OnlineStoreMain from "./containers/main";
import otherNavs from "./otherNavs";
import navigationOptions from "__src/components/navOpt";
import { createStackNavigator } from "react-navigation-stack";
import reducers from "./reducers";
import Resource from "__src/resources";
const { Color, Res } = Resource;
export const onlinestore = reducers;

export default {
	OnlineStoreMain: {
		screen: OnlineStoreMain,
		navigationOptions,
	},
}
