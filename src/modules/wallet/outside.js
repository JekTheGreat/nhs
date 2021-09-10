

import SendEcash from "./containers/SendEcash";
import Addwallet from "./containers/Addwallet";
import history from "./containers/history";
import TransactionDetail from "./containers/detail";
import Conversion from "./containers/Conversion";
import EcashtoEcash from "./containers/EcashtoEcash";
import FundRequest from "./containers/FundRequest";
import QRCode from "__src/modules/profile/containers/qrcode";
import Resource from "__src/resources";
import Verification from "__src/modules/profile/containers/verification";
import _ from "lodash";

const {Color} = Resource;
const navigationOptions = ({ navigation }) =>  ({
	title: _.has(navigation, "state.params.title") ?
		navigation.state.params.title : "",
	headerBackTitle: null,
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
	FundRequest: {
		screen: FundRequest,
		navigationOptions,
	},
	QRCode: {
		screen: QRCode,
		navigationOptions,
	},
	Conversion: {
		screen: Conversion,
		navigationOptions,
	},
	SendEcash: {
		screen: SendEcash,
		navigationOptions,
	},
	Addwallet: {
		screen: Addwallet,
		navigationOptions,
	},
	History: {
		screen: history,
		navigationOptions,
	},
	TransactionDetail: {
		screen: TransactionDetail,
		navigationOptions,
	},
	EcashtoEcash: {
		screen: EcashtoEcash,
		navigationOptions,
	},
	
	Verification: {
		screen: Verification,
		navigationOptions,
	},
};

