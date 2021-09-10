import ChangeEmail from "./containers/ChangeEmail";
import ChangeTransactionPin from "./containers/ChangeTransactionPin";
import ChangeMobile from "./containers/ChangeMobile";
import ChangePassword from "./containers/ChangePassword";
import Security from "./containers/Security";
import reducers from "./reducers";
import Resource from "__src/resources";
import _ from "lodash";
const {Color} = Resource;

export const account = reducers;


const navigationOptions = ({ navigation }) =>  ({
	// eslint-disable-next-line no-negated-condition
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
	headerBackTitle: null,
});

export default {
	Security: {
		screen: Security,
		navigationOptions,
	},
	ChangeTransactionPin: {
		screen: ChangeTransactionPin,
		navigationOptions,
	},
	ChangePassword: {
		screen: ChangePassword,
		navigationOptions,
	},
	ChangeMobile: {
		screen: ChangeMobile,
		navigationOptions,
	},
	ChangeEmail: {
		screen: ChangeEmail,
		navigationOptions,
	},
};
