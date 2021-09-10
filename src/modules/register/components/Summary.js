/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Alert, StatusBar, ScrollView} from "react-native";
import Color from "__src/resources/styles/color";
import Detail from "__src/components/Detail";
import PropTypes from "prop-types";
import styles from "../styles.css";
import Button from "__src/components/Button";
import {StackActions, NavigationActions} from "react-navigation";
import _ from "lodash";

export default class RegisterScreen extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error: {},
			isCheck: true,
		};
	}

	componentDidUpdate(prevProps) {
		const { register: { isRegistered, isRegisterFailed }, navigation} = this.props;

		if (!_.isEqual(prevProps.register.isRegistered, isRegistered) &&
			!_.isEmpty(isRegistered)) {

			const resetAction = StackActions.reset({
				index: 0,
				key: null,
				actions: [NavigationActions.navigate({routeName: "Login"})],
			});
	
			navigation.dispatch(resetAction);
		}

		if (!_.isEqual(prevProps.register.isRegisterFailed, isRegisterFailed) &&
		 !_.isEmpty(isRegisterFailed)) {
			Alert.alert("Notice", isRegisterFailed);
		}
	}

	_submit = () => {
		const { register, actions } = this.props;
    
		actions.register(register.registerNewInput);
	}
  
	_renderSummary(){
		const {register: {registerNewInput, registerCountryDial,
			isRegistering}, navigation} = this.props;

		return (
			<View style={styles.container}>
				<ScrollView scrollEnabled={false} style={styles.bodyContainer}>
					<View style={styles.margin30}>
						<Text style={styles.labelText}>Confirmation</Text>
						<Text style={styles.labelText2}>
                Please review your registration details
						</Text>
					</View>

					<Detail style={styles.margin20}label="Username" value={registerNewInput.username} />
					<Detail label="Email" value={registerNewInput.email} />
					{/* <Detail label="Mobile Number" value={`+${registerCountryDial}${registerNewInput.mobileNumber}`} /> */}
					<Detail label="First Name" value={registerNewInput.firstName} />
					<Detail label="Last Name" value={registerNewInput.lastName} />
					<Detail label="Country" value={registerNewInput.country} />
					<View style={styles.termsWrapper}>
						<Text style={styles.txtTerms}>By clicking "Finish" button you agree to our
							<Text style={{color: Color.colorPrimary}}
								suppressHighlighting
								onPress={() => navigation.navigate("Terms", {title: "Terms and Conditions"})}> Terms of Services </Text> and
							<Text style={{color: Color.colorPrimary}}
								suppressHighlighting
								onPress={() => navigation.navigate("Terms", {title: "Privacy Policy"})}> Privacy Policy</Text>
						</Text>
					</View>
				</ScrollView>
				<Button onPress={this._submit} loading={isRegistering} style={styles.btnProceed} label="Submit"/>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" backgroundColor={Color.Header} />
				{this._renderSummary()}
			</View>
		);
	}
}
RegisterScreen.propTypes = {
	actions: PropTypes.object,
	InputedData: PropTypes.object,
	navigation: PropTypes.object,
	register: PropTypes.object,
};
