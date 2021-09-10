/* eslint-disable */
import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Resource from "__src/resources";
import HomeScreen from "../containers/Homescreen";
import Wallet from "__src/modules/wallet";
import Profile from "__src/modules/profile/containers/main";
import CSOON from "./CSOON";
import Tabbar from "./screens/Tabbar";
// import cryptojs from "crypto-js";
// import SvgUri from "react-native-svg-uri";
// import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
// import icoMoonConfig from './wallet.json';
// import SVGImage from "react-native-remote-svg";
// import Svg from "./menu_wallet_tint.svg";
// import Wallet from "./wallet.json";
// import Icon from "react-native-vector-icons";
// import SVG from "__src/resources/customize/Svg";
const {Res, Color} = Resource;

const TabNavigator = createMaterialTopTabNavigator({
	Home: HomeScreen,
	Inbox: CSOON,
	Wallet,
	Notification: CSOON,
	Account: Profile,
}, {
	initialRouteName: "Home",
	transparentCard: true,
	swipeEnabled: false,
	tabBarPosition: "bottom",
	animationEnabled: true,
	tabBarComponent: props => <Tabbar {...props}/>,
	// defaultNavigationOptions: ({ navigation }) => ({
	// 	headerBackTitle: null,
	// 	tabBarIcon: ({ focused }) => {
	// 		const { routeName } = navigation.state;
	// 		let iconName;

	// 		if (routeName === "Home") {
	// 			iconName = focused ? "menu_home_tint" : "menu_home";
	// 		} else if (routeName === "Inbox") {
	// 			iconName = focused ? "menu_inbox_tint" : "menu_inbox";
	// 		} else if (routeName === "Wallet") {
	// 			iconName = focused ? "menu_wallet_tint" : "menu_wallet";
	// 		} else if (routeName === "Notification") {
	// 			iconName = focused ? "menu_notif_tint" : "menu_notif";
	// 		} else if (routeName === "Account") {
	// 			iconName = focused ? "menu_profile_tint" : "menu_profile";
	// 		}

	// 		return <Image style={{width: 28, height: 28, padding: 2}}  source={Res.get(iconName)} resizeMode="contain" />;
	// 	},
	// }),
	// tabBarOptions: {
	// 	showLabel: false,
	// 	activeTintColor: Color.colorPrimary,
	// 	inactiveTintColor: Color.Standard2,
	// 	tabStyle: {alignItems: "center",
	// 		margin: 0, flexDirection: "column", justifyContent: "center" },
	// 	iconStyle: {backgroundColor: Color.transparent},
	// 	labelStyle: {
	// 		fontSize: 9,
	// 		fontFamily: "Roboto-Light",
	// 		alignSelf: null,
	// 		backgroundColor: Color.transparent,
	// 		bottom: 5,
	// 	},
	// 	style: {
	// 		padding: 0, height: 55,
	// 		margin: 0, backgroundColor: Color.white, borderTopColor: Color.transparent,
	// 	},
	// },
});

export default createAppContainer(TabNavigator);

// class AppNavigatorWrapper extends React.PureComponent {
// 	static router = TabNavigator.router

// 	render() {

// 		return <AppContainer  />;
// 	}
// }

// export default AppNavigatorWrapper;
