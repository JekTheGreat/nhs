import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import ForgotPassword from "./containers/ForgotPassword";
import ForgotUsername from "./containers/ForgotUsername";
import Color from "__src/resources/styles/color";
import reducers from "./reducers";
import _ from "lodash";

const navigationOptions = ({ navigation }) => ({
	title: _.has(navigation, "state.params.title") ?
		navigation.state.params.title : "FORGOT PASSWORD",
	headerStyle: {
		backgroundColor: "#F8F9FB",
		elevation: 0,
		shadowOpacity: 0,
		borderBottomWidth: 0,
	},
	headerTitleStyle: {
		color: "black",
		fontWeight: "bold",
		fontSize: 20,
		fontFamily: "Roboto",
	},
	headerTintColor: Color.white,
	headerLeft: () => <TouchableOpacity onPress={() => navigation.goBack()}
		style={{ marginLeft: 20, marginTop: 5, backgroundColor: "#FFC914", padding: 5, elevation: 10, borderRadius: 20 }} >
		<Icon type='ionicons' name='arrow-back' size={20} color='white' />
	</TouchableOpacity>,
	// safeAreaInsets: { top: 0 },
});

export const forgot = reducers;
export default {
	// ForgotUsername: {
	// 	screen: ForgotUsername,
	// 	navigationOptions
	// },
	ForgotPassword: {
		screen: ForgotPassword,
		navigationOptions
	},
};
