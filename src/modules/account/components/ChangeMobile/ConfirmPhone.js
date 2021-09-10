import React, {PureComponent} from "react";
import {View, Text} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import Color from "__src/resources/styles/color";
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
		const { actions, account, login } = this.props;

		actions.sendChangePhoneCode(account.changeMobileInput, login.session.userId);
	}

	render() {
		const { login, account } = this.props;
		const { sendingPhoneCode, changeMobileInput} = account;
		
		return (
			<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Confirmation</Text>
					<Text style={styles.subtitle}>Confirmation your new mobile number</Text>

					<TxtInput
						value={login.session.user.mobile}
						label='Old Mobile Number'
						isText
						inputStyles={styles.inputStyles}
						style={styles.marginTop30}
						style3={styles.borderWidth0}/>

					<TxtInput
						value={`${changeMobileInput.countryCode}${changeMobileInput.newMobile}`}
						label='New Mobile Number'
						isText
						inputStyles={styles.inputStyles}
						style={styles.marginTop30}
						style3={styles.borderWidth0}/>

					<Text style={styles.info}>
					We will be sending a code to
						<Text style={{color: Color.Standard2}}>
							{` ${changeMobileInput.countryCode}${changeMobileInput.newMobile} `}
						</Text>
					to verify this number
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
