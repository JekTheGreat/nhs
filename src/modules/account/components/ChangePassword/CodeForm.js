import React, {PureComponent} from "react";
import {View, Text, Image, Alert} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import _ from "lodash";
const {Res} = Resource;

export default class CodeForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			seconds: 60,
			error: {},
			code: "",
		};

		this.countDown();
	}
	interval = null;

	componentDidUpdate(prevProps){
		const {account: {ChangePassFailed}} = this.props;

		if (!_.isEqual(prevProps.account.ChangePassFailed, ChangePassFailed) &&
		!_.isEmpty(ChangePassFailed)){
			Alert.alert("Update Error", ChangePassFailed);
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	countDown = () => {
		const countDownDate = new Date().getTime() + 60100;
		let seconds = 0;

		this.interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = countDownDate - now;

			seconds = Math.floor((distance % (1000 * 60)) / 1000);

			if (seconds < 0) {
				clearInterval(this.interval);
				this.setState({ seconds });
			} else {
				this.setState({ seconds });
			}

		}, 1000);
	}
  
  _onChange = (value) => {
  	const { account, actions } = this.props;
  	const newInput = _.merge({}, account.changePasswordInput);
  	delete account.ChangePassFailed;
  	newInput.code = value;
  	actions.setPasswordInput(newInput);
  }
	
	_handleSendEmailCode = () => {
		const { actions, account, login: {session} } = this.props;
		const { changePasswordSaveRadio } = account;
		this.setState({ seconds: 60 });
		this.countDown();
		actions.changePasswordSendCode(changePasswordSaveRadio, session.token);
	}
	
	_reset = () => {
		const { actions } = this.props;
		actions.resetChangePass();
		actions.setChangePasswordScreen("changePasswordForm");
	}

	_back = () => {
		const { actions } = this.props;
		actions.setChangePasswordScreen("sendCodeForm");
	}

	_changePassword = () => {
  	const { actions, account, login: {session} } = this.props;
		const { changePasswordInput } = account;
		const error = {};
		if (_.isEmpty(changePasswordInput.code)) {
			error.code = "Verification code is required.";
			this.setState({error});
		} else {
			actions.changePassword(changePasswordInput, session.token);
		}
	}
	
	renderDone =() => (
		<View style={styles.flex1marT30padH30}>
			<View style={styles.flex1}>
				<Text style={styles.subsuccess}>Change Password</Text>
				<Text style={styles.success}>Successfully!</Text>
				<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
			</View>
			<View style={styles.marginBottom30}>
				<Button
					onPress={this._reset}
					style={styles.btnStyle3}
					labelStyle={styles.fontRenderDone}
					label="Ok"/>
			</View>
		</View>
	);

	render() {
  	const {error, seconds} = this.state;
  	const { account } = this.props;
  	const { isInvalidPhoneCode, changePasswordInput, isSuccessChangePass, sendingPhoneCode, changingPassword} = account;

		if (isSuccessChangePass){
			return this.renderDone();
		}
  	
		return (
  		<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Confirmation Code</Text>
  				<Text style={styles.subtitle}>Code was sent to your registered email address.</Text>
  				<TxtInput
  					onChangeText={this._onChange}
  					value={changePasswordInput.code}
  					onFocus={() => this.setState({fnewE: true})}
  					onBlur={() => this.setState({fnewE: false})}
  					isFocus={this.state.fnewE}
						autoCapitalize="none"
						keyboardType="number-pad"
  					placeholder="Enter the 4-digit Number"
  					returnKeyType='next'
  					err={isInvalidPhoneCode ? "Invalid code" : "" || error.code}
  					label='Enter your code'
  					style={styles.marginTop30}/>
  			</View>
  			<View style={styles.marginBottom30}>
					{seconds > 0 ?
						<Text style={styles.txtGetHelpContainer2}>
					You may resend code in {
								(seconds > 1) ?
									`${seconds} seconds` : `${seconds} second`}
						</Text> :
						<Text style={[styles.txtGetHelpContainer, {}]}>
							Didn't get the code?
							<Text  suppressHighlighting
								onPress={this._handleSendEmailCode}
								style={styles.txtHelp}> Resend Code.</Text>
						</Text>
					}
  				
  				<Button
  					onPress={this._changePassword}
  					style={styles.btnStyle2}
  					loading={sendingPhoneCode || changingPassword}
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
CodeForm.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
