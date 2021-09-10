import React, {PureComponent} from "react";
import {View, Text} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import Color from "__src/resources/styles/color";
import PropTypes from "prop-types";
import styles from "../../styles.css";


export default class ConfirmEmail extends PureComponent {
	_backEmailForm = () => {
		const { actions } = this.props;

		actions.setEmailScreen("emailForm");
		actions.resetNewEmailData();
		actions.resetPasswordState();
	}

	_proceedCodeForm = () => {
		const { actions, account, login } = this.props;

		actions.sendChangeEmailCode(account.changeEmailInput, login.session.userId);
	}

	_renderComponent(){
		const {isValidatingPhone, isPhoneNumberAvailable,
			isPhoneNumberNotAvailable} = this.props.account;

		if (isValidatingPhone){
			return ;
		} else if (isPhoneNumberAvailable){
			return ;
		} else if (isPhoneNumberNotAvailable){
			return ;
		}
		
		return null;
	}

	render() {
		const { login, account } = this.props;
		const { proceedButtonIsLoading, changeEmailInput} = account;
		
		return (
			<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Confirmation</Text>
					<Text style={styles.subtitle}>Confirmation your new email address</Text>

					<TxtInput
						value={login.session.user.email}
						label='Old Email'
						isText
						style={styles.marginTop30}
						style3={styles.borderWidth0}/>

					<TxtInput
						value={changeEmailInput.newEmail}
						label='New Email'
						isText
						style={styles.marginTop30}
						style3={styles.borderWidth0}/>

					<Text style={styles.info}>
					We will be sending to email
						<Text style={{color: Color.Standard2}}> {changeEmailInput.newEmail} </Text>
					to verify this email
					</Text>
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
ConfirmEmail.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
