import React from 'react';
import { Platform } from 'react-native';
import RegisterScreen from "./containers/RegisterScreen";
import Color from "__src/resources/styles/color";
import Username from "./containers/Username";
import Password from "./containers/Password";
import Email from "./containers/Email";
import EmailActivation from "./containers/EmailActivation";
import Mobile from "./containers/Mobile";
import Summary from "./containers/Summary";
import Success from "./containers/Success";
import RegisterVerification from "./containers/RegisterVerification";
import _ from "lodash";
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import reducers from "./reducers";

const navigationOptions = ({ navigation }) => ({
	title: _.has(navigation, "state.params.title") ?
		navigation.state.params.title : "REGISTER",
	headerStyle: {
		backgroundColor: Color.white,
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

export const register = reducers;
export default {
	RegisterVerification: {
		screen: RegisterVerification,
		navigationOptions,
	},
	RegisterScreen: {
		screen: RegisterScreen,
		navigationOptions,
	},
	Username: {
		screen: Username,
		navigationOptions,
	},
	Password: {
		screen: Password,
		navigationOptions,
	},
	Email: {
		screen: Email,
		navigationOptions,
	},
	Mobile: {
		screen: Mobile,
		navigationOptions,
	},
	Summary: {
		screen: Summary,
		navigationOptions,
	},
	Success: {
		screen: Success,
		navigationOptions,
	},
	EmailActivation: {
		screen: EmailActivation,
		navigationOptions: ({ navigation }) => ({
			headerStyle: {
				backgroundColor: Color.white,
				elevation: 0,
				shadowOpacity: 0,
				borderBottomWidth: 0,
			},
			title: "EMAIL VERIFICATION",
			headerTitleStyle: {
				color: "black",
				fontWeight: "bold",
				fontSize: 20,
				fontFamily: "Roboto",
			},
			headerTintColor: Color.white,
			headerLeft: () => { return null }
		}),
	},

};
