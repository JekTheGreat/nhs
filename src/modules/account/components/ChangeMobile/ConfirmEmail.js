/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import styles from "../../styles.css";


export default class ConfirmEmail extends PureComponent {
	_back = () => {
		const { actions } = this.props;

		actions.setPhoneScreen("phoneForm");
		actions.resetNewPhoneData();
		actions.resetPasswordState();
	}

	_proceedCodeForm = () => {
		const { actions, login } = this.props;

		actions.sendChangePhoneEmailCode(login.session.user.email, login.session.userId);
	}

	render() {
		const { login: {session}, account } = this.props;
		const { sendingPhoneCode} = account;
		
		return (
			<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Send Code</Text>
					<Text style={styles.subtitle}>
					To complete the change on your email address. We have sent a code to your registered email address.
					</Text>
					<TxtInput
						value={session.user.email}
						label='Your Registered Email Address'
						isText
						inputStyles={styles.inputStyles}
						style={styles.marginTop30}
						style3={styles.borderWidth0}/>
					<Text style={styles.info}>
					You will receive a code in your email
					</Text>
				</View>
				<View style={styles.marginBottom30}>
  				<Button
  					onPress={this._proceedCodeForm}
						style={styles.btnStyle2}
						loading={sendingPhoneCode}
  					label="Proceed"/>
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
ConfirmEmail.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
