import React, {PureComponent} from "react";
import {View, Text, Image} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import Button from "__src/components/Button";
import styles from "../../styles.css";


const {Res} = Resource;

export default class VerifyEmail extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			error: {},
			code: "",
			seconds: 60,
		};
		this.countDown();
	}

	renderDone =() => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
  			<Text style={styles.txtalright}>Success!</Text>
  			<Text style={styles.txtsuccess}>Email Verified!</Text>
  		</View>
			<View style={styles.marb20}>
				<Button
					onPress={this._handleCurrentStep}
					style={styles.btnStyle2}
					label="Next"/>
			</View>
  	</View>
	);
	
	_renderInput =() => {
		const {profile: {isSendingEmailCode, isVerifyingEmail, failVerifyingEmail}} = this.props;
		const {error, code, seconds} = this.state;

		return (
			<View style={styles.flex1mar30pad30}>
  		<Text style={styles.txtmobile}>Enter your code</Text>
				<Text style={styles.txtcodesend}>Code was sent to your email address.</Text>
				<TxtInput
					onFocus={() => this.setState({otpFocus: true})}
					onBlur={() => this.setState({otpFocus: false})}
					isFocus={this.state.otpFocus}
					round
					placeholder="Enter the 4-digit number"
					onChangeText={(e) => this._onChange(e)}
					value={code}
					returnKeyType='done'
					err={failVerifyingEmail ? "Invalid code" : "" || error.code} />

				{seconds > 0 ?
					<Text style={[styles.txtdidntgetcode]}>
						You may resend code in {
							(seconds > 1) ?
								`${seconds} seconds` :
								`${seconds} second`
						}
					</Text> :
					<Text style={styles.txtdidntgetcode}>
								Didn't get the code?
						<Text  suppressHighlighting
							onPress={this._handleSendEmailCode}
							style={styles.txtresend}> Resend Code.</Text>
					</Text>}

				<Button
					onPress={this._handleVerifyEmail}
					loading={isSendingEmailCode || isVerifyingEmail}
					style={styles.btnStyle}
					label="Verify"/>

  	</View>
		);
	}

	_handleVerifyEmail = () => {
		const { actions, login: { additionalDetails }  } = this.props;
		const { code } = this.state;
		const error = {};

		if (_.isEmpty(code)) {
			error.code = "Verification Code is required";
		}

		if (_.isEmpty(error)) {
			actions.verifyEmail(additionalDetails.id,
				additionalDetails.email, code);
		} else {
			this.setState({error});
		}
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

	componentWillUnmount(){
		clearInterval(this.interval);
	}

	_handleSendEmailCode = () => {
		const { actions, login: { additionalDetails } } = this.props;

		this.setState({ seconds: 60 });
  	this.countDown();
		actions.sendEmailCode(additionalDetails.id, additionalDetails.email);
	}

	_onChange = (value) => {
		const error = { };

		if (_.isEmpty(value)) {
			error.code = "Verification Code is required";
		} else {
			delete error.code;
		}

		this.setState({
			error,
			code: value,
		});
	}

  _handleCurrentStep = () => {
  	const { actions } = this.props;

  	actions.changeCurrentStep("mobileVerification");
  }

  render(){
  	const {profile: {isSendingEmailCode, doneSendingEmailCode, doneVerifyingEmail },
  		login: { additionalDetails: {email} }} = this.props;

  	if (doneVerifyingEmail){
  		return (
  			<View style={styles.flex1}>
  				{this.renderDone()}
  			</View>
  		);
  	}
		
  	if (doneSendingEmailCode){
  		return (
  			<View style={styles.flex1}>
  				{this._renderInput()}
  			</View>
  		);
  	}
  	
  	return (
  		<View style={styles.flex1mar30pad30}>
  			<Text style={styles.txtmobile}>Email</Text>
  			<TxtInput
  				defaultValue={email}
  				editable={false}
  				inputStyles={styles.inputStyles}
  				style3={styles.borderWidth0} />
  			<Button
  				onPress={this._handleSendEmailCode}
  				loading={isSendingEmailCode}
  				style={styles.btnStyle}
  				label="Verify"/>
  		</View>
  	);
  }
}

VerifyEmail.propTypes = {
	actions: PropTypes.object,
	profile: PropTypes.object,
	login: PropTypes.object,
};

