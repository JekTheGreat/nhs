/* eslint-disable max-len */
import React, {PureComponent} from "react";
import {View, Text} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import _ from "lodash";


export default class ConfirmMobileEmail extends PureComponent {
	_backEmailForm = () => {
		const { actions } = this.props;

		actions.setEmailScreen("emailForm");
		actions.resetNewEmailData();
		actions.resetPasswordState();
	}

	_onChange = (type) => (value) => {
  	const { account, actions } = this.props;
  	const { error } = this.state;
  	const newInput = _.merge({}, account.changeEmailInput);

  	switch (type){
  	case "code":
  		if (_.isEmpty(value)) {
  			error.code = "Verification code is required.";
  		} else {
  			delete error.code;
  		}

  		newInput.code = value;
  		break;
  	default:
  		break;
  	}

  	actions.setEmailInput(newInput);
	};

	_proceedCodeForm = () => {
		const { actions, login } = this.props;
		const newInput = _.merge({}, account.changeEmailInput);
		
		newInput.code = "";
		actions.setEmailInput(newInput);
		actions.sendChangeEmailMobileCode(login.session.user.mobile, login.session.userId);
	}

	render() {
		const { login: {session}, account } = this.props;
		const { proceedButtonIsLoading} = account;
		
		return (
			<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Send Code</Text>
					<Text style={styles.subtitle}>
					To complete the change on your email address. We have sent a code to your registered mobile number.
					</Text>
					<TxtInput
						value={`${session.user.mobile.substring(0, 6)}*****${session.user.mobile.substring(session.user.mobile.length - 2)}`}
						label='Your Registered Mobile Number'
						isText
						inputStyles={styles.inputStyles}
						style={styles.marginTop30}
						style3={styles.borderWidth0}/>
				</View>
				<View style={styles.marginBottom30}>
  				<Button
  					onPress={this._proceedCodeForm}
						style={styles.btnStyle2}
						loading={proceedButtonIsLoading}
  					label="Proceed"/>
  				<Button
  					onPress={this._backEmailForm}
  					style={styles.btnStyle3}
  					labelStyle={styles.btnLabelStyle}
  					label="Back"/>
  			</View>
			</View>
		);
	}
}
ConfirmMobileEmail.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
