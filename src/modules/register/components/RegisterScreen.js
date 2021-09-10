/* eslint-disable */
import React, { PureComponent } from "react";
import { View, StatusBar } from "react-native";
import RegistrationForms from './RegistrationForms';
import Color from "__src/resources/styles/color";
import PropTypes from "prop-types";
import _ from "lodash";


export default class RegisterScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
		};
	}


	render() {
		const { register: { registerNewInput, isRegistering } } = this.props;
		console.log("STATE", this.state)
		return (

			<View style={{ flex: 1, backgroundColor: "white" }}>
				<StatusBar barStyle="dark-content" backgroundColor={Color.white} />
				<RegistrationForms  {...this.props} />
			</View>

		);
	}
}
RegisterScreen.propTypes = {
	actions: PropTypes.object,
	InputedData: PropTypes.object,
	navigation: PropTypes.object,
};
