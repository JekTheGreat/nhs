
import React, {PureComponent} from "react";
import {View, Text, Image} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import Button from "__src/components/Button";
import styles from "../../styles.css";
const {Res} = Resource;

export default class VerifyMobile extends PureComponent{
	constructor(props){
		super(props);
		this.state = {
			doneSendingMobileCode: false,
			otp: "",
			otpErr: "",
			seconds: 0,
		};
	}

	componentDidMount(){
		const {actions, register: {isRegistered}} = this.props;

		if (isRegistered.token){
			actions.getAdditionalDetails(isRegistered.token);
		}
	}

	componentWillUnmount(){
		clearInterval(this.interval);
	}
	
	renderDone = () => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
  			<Text style={styles.txtalright}>Success!</Text>
  			<Text style={styles.txtsuccess}>Mobile Number Verified!</Text>
  		</View>
			<View style={styles.marb20}>
				<Button
					onPress={this._handleCurrentStep}
					style={styles.btnStyle2}
					label="Next"/>
			</View>
  		
  	</View>
	);

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
	
	renderInput =() => {
		const {seconds} = this.state;
		const {profile: {isSendingMobileCode, isVerifyingMobile, failVerifyingMobile}} = this.props;

		return (
			<View style={styles.flex1mar30pad30}>
  		<Text style={styles.txtmobile}>Enter your code</Text>
				<Text style={styles.txtcodesend}>Code was sent to your mobile number.</Text>
				<TxtInput
					onFocus={() => this.setState({otpFocus: true})}
					onBlur={() => this.setState({otpFocus: false})}
					isFocus={this.state.otpFocus}
					round
					placeholder="Enter the 4-digit number"
					onChangeText={(e) => this.setState({otp: e})}
					value={this.state.otp}
					returnKeyType='done'
					err={failVerifyingMobile ? "Invalid code" : "" || this.state.otpErr} />

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
							onPress={this.resendCode}
							style={styles.txtresend}> Resend Code.</Text>
					</Text>}

				<Button onPress={this._handleVerifyMobile}
					loading={isSendingMobileCode || isVerifyingMobile}
					style={styles.btnStyle4} label="Verify"/>
  	</View>
		);
	}

	_handleVerifyMobile = () => {
		const { actions, register: { registerNewInput,
			registerCountryDial, isRegistered }  } = this.props;
		const { otp } = this.state;

		let otpErr = "";

		if (_.isEmpty(otp)) {
			otpErr = "Verification Code is required";
		} else {
			const params = {
				mobile: `${registerCountryDial}${registerNewInput.mobileNumber}`,
				code: otp,
			};
			actions.verifyMobile(params, isRegistered.token);
		}

		this.setState({otpErr});
	}

	resendCode = () => {
		const { actions, register: {isRegistered, registerNewInput,
			registerCountryDial} } = this.props;
		this.setState({ seconds: 60 }, () => {
			this.countDown();
			actions.sendMobileCode(
				{mobile: `${registerCountryDial}${registerNewInput.mobileNumber}`},
				isRegistered.token);
		});
	}

	_handleSendMobileCode = () => {
		const { actions, register: {isRegistered, registerNewInput,
			registerCountryDial} } = this.props;
		this.setState({ seconds: 60 }, () => {
			this.countDown();
			actions.sendMobileCode(
				{mobile: `${registerCountryDial}${registerNewInput.mobileNumber}`},
				isRegistered.token);
			this.setState({doneSendingMobileCode: true});
		});
	}

  _handleCurrentStep = () => {
  	const { actions } = this.props;

  	actions.currentStep("idAndSelfie");
  }

  render(){
  	const {register: { registerNewInput, registerCountryDial },
  		profile: {doneVerifyingMobile }} = this.props;
  	const {doneSendingMobileCode} = this.state;
  	const {profile: {isSendingMobileCode, isVerifyingMobile}} = this.props;

  	if (doneVerifyingMobile){
  		return (
  			<View style={styles.flex1}>
  				{this.renderDone()}
  			</View>
  		);
  	}
		
  	if (doneSendingMobileCode){
  		return (
  			<View style={styles.flex1}>
  				{this.renderInput()}
  			</View>
  		);
  	}
  	
  	return (
  		<View style={styles.flex1mar30pad30}>
  			<Text style={styles.txtmobile}>Mobile Number</Text>
  			<TxtInput
  				defaultValue={`+${registerCountryDial}${registerNewInput.mobileNumber}`}
  				editable={false}
  				inputStyles={styles.inputStyles2}
  				style3={styles.borderWidth0}/>

  			<Button
  				onPress={this._handleSendMobileCode}
  				style={styles.btnStyle4}
  				loading={isSendingMobileCode || isVerifyingMobile}
  				label="Verify"/>
  		</View>
  	);
  }
}

VerifyMobile.propTypes = {
	actions: PropTypes.object,
	profile: PropTypes.object,
	register: PropTypes.object,
};

