import qrscan from "./containers/qrscan";
import Verification from "./containers/verification";
import Setting from "./containers/setting";
import General from "./containers/general";
import SecuritySetting from "./containers/security";
import reducers from "./reducers";
import Resource from "__src/resources";
import Accounts from "__src/modules/account";
import MyProfile from "./containers/profile";
import Switch from "./containers/switch";
import Terms from "./containers/terms";
import _ from "lodash";
const { Color } = Resource;

export const profile = reducers;
export const QRScan = qrscan;

const navigationOptions = ({ navigation }) => ({
	title: _.has(navigation, "state.params.title") ?
		navigation.state.params.title : "",
	headerStyle: {
		backgroundColor: Color.Header,
	},
	headerTitleStyle: {
		color: "#99abb4",
		fontWeight: "normal",
		fontFamily: "Roboto",
	},
	headerTintColor: Color.white,
	headerBackTitle: " ",
	headerBackTitleVisible: false,
});


export default {
	Switch: {
		screen: Switch,
		navigationOptions,
	},
	General: {
		screen: General,
		navigationOptions,
	},
	Setting: {
		screen: Setting,
		navigationOptions,
	},
	Terms: {
		screen: Terms,
		navigationOptions,
	},
	MyProfile: {
		screen: MyProfile,
		navigationOptions,
	},
	Verification: {
		screen: Verification,
		navigationOptions: {
			headerShown: false,
		}
	},

	SecuritySetting: {
		screen: SecuritySetting,
		navigationOptions,
	},
	...Accounts,
};
