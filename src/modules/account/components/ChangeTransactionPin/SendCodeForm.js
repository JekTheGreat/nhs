/* eslint-disable max-len */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Alert } from "react-native";
import _ from "lodash";
import PropTypes from "prop-types";
import Resource from "__src/resources";
import styles from "../../styles.css";
import {CheckBox} from "react-native-elements";
import Button from "__src/components/Button";

const {Color} = Resource;

class SendCodeForm extends PureComponent {
	constructor(){
		super();
		this.state = {
			error: {},
			isEmail: true,
			isMobile: false,
		};
	}

	_handleChangeRadio = (type) => {
		const { actions, login } = this.props;
		const { additionalDetails } = login;

		if (type === "SMS"){
			actions.changeTransPinSaveRadio({
				type,
				// value: additionalDetails.individual.mobile,
			});
			this.setState({isEmail: false, isMobile: true});
		} else {
			actions.changeTransPinSaveRadio({
				type,
				// value: additionalDetails.metadata.email,
			});
			this.setState({isEmail: true, isMobile: false});
		}
	}

	_proceedCodeForm = () => {
		const { actions, account, login } = this.props;
		const { changeTransPindSaveRadio } = account;
		const { session } = login;
		
		let error = "";

		if (_.isEmpty(changeTransPindSaveRadio)) {
			error = "Please select method";
		}

		if (_.isEmpty(error)) {
			actions.changeTransPinSendCode(changeTransPindSaveRadio, session.token);
		} else {
			Alert.alert(error);
		}
	}

	_back = () => {
		const { actions } = this.props;

		actions.setChangeTransPinScreen("changeTransPinForm");
	}

	render() {
		const { account, login } = this.props;
		const { sendingCodeChangeTransPin, changeTransPindSaveRadio } = account;
		const { additionalDetails } = login;

		return (
			<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Choose Activation</Text>
					<Text style={styles.subtitle}>
					Tell us where we can send you the activation code to reset your transaction pin
					</Text>
					<View style={styles.marginTop30}>
						<CheckBox
							containerStyle={styles.containerStyle}
							textStyle={styles.textStyle}
							title={`Email: ${additionalDetails.metadata.email.substring(0, 2)}****${additionalDetails.metadata.email.substring(additionalDetails.metadata.email.length - 5)}`}
							checkedIcon='dot-circle-o'
							uncheckedIcon='circle-o'
							checkedColor={Color.Standard2}
							onPress={() => this._handleChangeRadio("MAIL")}
							checked={!!_.isEqual(changeTransPindSaveRadio.type, "MAIL")}/>
						<CheckBox
							containerStyle={styles.containerStyle}
							textStyle={styles.textStyle}
							title={`Mobile Number: ${additionalDetails.individual.mobile.substring(0, 6)}****${additionalDetails.individual.mobile.substring(additionalDetails.individual.mobile.length - 2)}`}
							checkedIcon='dot-circle-o'
							uncheckedIcon='circle-o'
							checkedColor={Color.Standard2}
							onPress={() => this._handleChangeRadio("SMS")}
							checked={!!_.isEqual(changeTransPindSaveRadio.type, "SMS")}/>

					</View>
				</View>
				<View style={styles.marginBottom30}>
  				<Button
  					onPress={this._proceedCodeForm}
  					style={styles.btnStyle2}
  					loading={sendingCodeChangeTransPin}
  					label="Submit"/>
  				<Button
  					onPress={this._back}
  					style={styles.btnStyle3}
  					labelStyle={styles.btnLabelStyle}
  					label="Back"/>
  			</View>

			</View>
		);
	}
}

SendCodeForm.propTypes = {
	account: PropTypes.object,
	login: PropTypes.object,
	actions: PropTypes.object,
};

export default SendCodeForm;
