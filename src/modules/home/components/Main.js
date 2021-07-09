/* eslint-disable */
import React from "react";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Resource from "__src/resources";
import HomeScreen from "../containers/Homescreen";
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
const { Res, Color } = Resource;

const TabNavigator = createMaterialTopTabNavigator({
	Home: HomeScreen,
	"Step Tracker": CSOON,
	Articles: CSOON,
}, {
	initialRouteName: "Home",
	transparentCard: true,
	swipeEnabled: false,
	tabBarPosition: "bottom",
	animationEnabled: true,
	tabBarComponent: props => <Tabbar {...props} />,
});

export default createAppContainer(TabNavigator);
