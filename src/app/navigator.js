/* eslint-disable */
import React from "react";
import { connect } from "react-redux";
import { createAppContainer } from "react-navigation";
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { bindActionCreators } from "redux";
import {
	createReactNavigationReduxMiddleware, createNavigationReducer,
} from "react-navigation-redux-helpers";

import navigationOptions from "__src/components/navOpt";
import Login from "../modules/login";
import Profile, { QRScan, Setting } from "../modules/profile/outside";
import StoreNavs, { BurgerMenu } from "../modules/marketplace/storeNavs";
import MarketPlaceMain from "../modules/marketplace";
import OnlineStoreMain from "../modules/onlinestore";
import OnlineStoreNavs from "../modules/onlinestore/otherNavs";
import Home from "../modules/home";
import Register from "../modules/register";
import Forgot from "../modules/forgot";
import Account from "../modules/account";
// import Conversion from "../modules/wallet/components/Conversion";
// import Wallet, {EcashtoEcashs} from "../modules/wallet";
import Wallet from "../modules/wallet/outside";
import Loading from "../modules/loading";
import AddLegacy from "../modules/addlegacy";
import Remittance from "../modules/remittance";
import BillsPayment from "../modules/billspayment/index"
import samp from "__src/components/CustomAlert";
import Locator from "../modules/locator/index";
import Staycation, { Stack1 } from "../modules/staycation";
import Ticketing from "../modules/ticketing";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import Test from "../test/accordion/index";
import Test from "../test/airbnb/index";

const AppNavigator = createStackNavigator({
	// ...MarketPlaceMain,
	// ReportsScreen: {
	// 	screen: ReportsScreen,
	// 	params: { isSearching: false }
	// },
	// SearchScreen: {
	// 	screen: SearchScreen,
	// },
	// StackCart: {
	// 	screen: StackCart,
	// 	navigationOptions: {
	// 		headerShown: false
	// 	}
	// },
	// Staycation: {
	// 	screen: Staycation,
	// 	navigationOptions: {
	// 		headerShown: false
	// 	}
	// },
	// ...Ticketing,
	// ...Remittance,

	// Test: {
	// 	screen: Test,
	// 	navigationOptions
	// },
	// // // ...Register,
	// // ...Locator,
	// ...BillsPayment,
	// ...OnlineStore,
	// ...Staycation,

	// ...OnlineStoreOutside,
	// ...OnlineStoreMain,
	// Setting: {
	// 	screen: Setting,
	// 	navigationOptions,
	// },

	MarketPlaceMain: {
		screen: MarketPlaceMain,
		navigationOptions: {
			headerShown: false
		}
	},

	Login: {
		screen: Login,
		navigationOptions: {
			headerShown: false
		}
	},
	Home: {
		screen: Home,
		navigationOptions: {
			headerShown: false
		}
	},
	Stack1: {
		screen: Stack1,
		navigationOptions: {
			headerShown: false
		}
	},
	QRScan: {
		screen: QRScan,
		navigationOptions,
	},

	BurgerMenu: {
		screen: BurgerMenu,
		navigationOptions: {
			headerShown: false,
		}
	},
	// MarketPlaceMain: {
	// 	screen: MarketPlaceMain,
	// 	navigationOptions: {
	// 		headerShown: false
	// 	}
	// },
	...Ticketing,
	...Forgot,
	...Register,
	...Wallet,
	...Profile,
	...Loading,
	...AddLegacy,
	...Remittance,
	...Locator,
	// ...MarketPlaceMain,
	...StoreNavs,
	...OnlineStoreMain,
	...OnlineStoreNavs,
	// ...Staycation,
	...BillsPayment,
}, {
	mode: "",
	defaultNavigationOptions: {
		headerTitleAlign: 'center',
		headerBackTitle: null,
		gestureEnabled: false,
		...TransitionPresets.SlideFromRightIOS,
	},

});

const AppContainer = createAppContainer(AppNavigator);

export const nav = createNavigationReducer(AppNavigator);

export const reactNavigation = createReactNavigationReduxMiddleware(
	"root",
	({ nav }) => nav,
);

const mapStateToProps = ({ nav }) => ({
	nav,
});

const mapDispatchToProps = (dispatch) => ({
	db: bindActionCreators({}, dispatch),
});

const App = () => <AppContainer />;

export default connect(mapStateToProps, mapDispatchToProps)(App);

