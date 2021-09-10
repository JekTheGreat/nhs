/* eslint-disable */
import Resource from "__proj/src/resources";
import TxtInput from "__src/components/TxtInput";
import React, { PureComponent } from "react";
import { Text, View, Image, TextInput, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import styles from "../styles.css";
import { CheckBox } from "react-native-elements";
import Button from "__src/components/Button";
import KeyboardDismiss from "__src/components/KeyboardDismiss";
import _ from "lodash";
import * as Animatable from "react-native-animatable";
import { Icon } from "react-native-elements";
import Dropdown from "__src/components/Dropdown";
import DropDownItem from "__src/components/DropDownItem";

const {Res, Color} = Resource;

class OTPForm extends PureComponent {
	static navigationOptions = {
		headerShow: false,
	}

	constructor(props){
		super(props);

		this.state = {
			error: {},
			isCheck: false,
			seconds: 60,
			disabled: true,
			steps: "step1",
			unrecognizedDevice: false,
		};
	}

	componenDidMount(){
		const { actions } = this.props;

		this.setState({ isCheck: false });
		actions.resetVerification();
	}

	componentWillUnmount() {
		const { actions } = this.props;

		clearInterval(this.interval);
	}

	back = () => {
		const { actions } = this.props;

		actions.reset2FALogin();
	}

	_handleSendEmailCode = () => {
		const { actions, login: { session } } = this.props;
		this.setState({ seconds: 60 });
		this.countDown();

		if (session.token){
			actions.resendOTP(session.token);
			
			return;
		}

		this.back();
	}

	_login = () => {
		const { login, login: {session, login2FACodeInput}, actions } = this.props;
		const error = {};

		if (!login.isLoggingIn){
			if (_.isEmpty(login.login2FACodeInput)){
				error.verification = "Verification code is required";
			}

			if (_.isEmpty(error)){
				const params = { code: login2FACodeInput};
				let routes = "/codes/verify-2sv";

				if(_.isEmpty(session.authType)){
					routes = "/codes/verify-registration";
				}else if(session.authType === "VRC"){
					routes = "/codes/verify-registration";
				}
				actions.usernameOTPLogin(params, session.token, routes);
			} else {
				this.setState({error});
			}
		}
	}

	onChangeInput = (value) => {
		const { actions } = this.props;
		const { error } = this.state;

		if (_.isEmpty(value)){
			this.setState({disabled: true});
		} else {
			delete error.verification;
			this.setState({disabled: false});
		}

		actions.setVerificationCode(value);
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

	renderBase = () => {
		
		return (
			<View style={{flexDirection: "row"}}>
				<Text style={[{textAlign: "center", fontSize: 16, color: "gray"}]}>
					{"Prefix"}
				</Text>
				<Icon style={{paddingLeft: 20, paddingTop: 4}} name='chevron-down' color="black" size={15} />
			</View>
		);
	}

	renderRow = (rowData, rowID, highlighted) => {
		
		return (
			<DropDownItem row
				rowData={rowData.prefix}
				highlighted={highlighted} />
		);
	}

	renderErrorBox = () => {
		const {error} = this.state;

		return (
			<Animatable.View animation="rubberBand" style={[styles.flexRow, {padding: 8, marginTop: -40, alignSelf: "center", width: 250, height: 40, backgroundColor: "#FB4646", borderRadius: 11}]}>
				<Image
					tintColor="white"
					style={{marginTop: 2, marginHorizontal: 5, height: 20, width: 20}}
					source={require("__proj/src/resources/images/info.png")}
					resizeMode={"contain"}
				/>
				<Text style={{fontSize: 16, color: "white", fontWeight: "bold", fontFamily: "Roboto"}}>Incorrect Verification Code!</Text>
			</Animatable.View>
		);

	}
	
	onBack = () => {
		switch(this.state.steps){
			case "step1":
			case "step2":
				this.setState({steps: "step1", height: 350});
				break;
			case "step3":
				this.setState({steps: "step1", height: 350});
				break;
			case "step4":
				this.setState({steps: "step1", height: 350});
				break;
		}
	}
	
	startCountdown = () => {
		clearInterval(this.interval);
		this.setState({steps: "step4", seconds: 60});
		this.countDown();
	}

	renderContent = () => {
		const {seconds} = this.state;
		const {login: {login2FACodeInput, isResendCode, isLoggingIn, OTPFailed}} = this.props;
		
		return(
			<View style={{flex: 1, height: "100%"}}>
				<View style={{height: "70%"}}>
					<Text style={styles.txtOtp}>Input OTP sent to your mobile number (or email)</Text>
					{OTPFailed ? this.renderErrorBox() : null}
					<View style={[styles.inputFieldStyle, {width: 310, height: "23%"}]}>
						<TextInput
							style={[styles.textInputStyle, {fontSize: 14}]}
							onFocus={() => this.setState({otpFocus: true})}
							onBlur={() => this.setState({otpFocus: false})}
							round
							keyboardType="phone-pad"
							isFocus={this.state.otpFocus}
							onChangeText={this.onChangeInput}
							value={login2FACodeInput}
							returnKeyType='next'
							placeholder="Enter OTP Code" />
					</View>
					{/* <CheckBox
						containerStyle={styles.containerStyle}
						textStyle={styles.textStyle}
						size={20}
						fontFamily="Roboto-Light"
						checkedColor={Color.colorPrimary}
						title='Authorize this device'
						checked={this.state.isCheck}
						onPress={() => this.setState({isCheck: !this.state.isCheck})} /> */}
					{this.state.disabled == true? 
						<Button
							disabled
							loading={isLoggingIn || isResendCode} 
							style={[styles.btnlogin, {width: 312, height: "23%", opacity: 0.6}]} 
							label="Submit"
							labelStyle={styles.btnLabelStyle} />
						:<Button
							onPress={this._login} 
							loading={isLoggingIn || isResendCode} 
							style={[styles.btnlogin, {width: 312, height: "23%",}]} 
							label="Submit"
							labelStyle={styles.btnLabelStyle} />
					}
					<Button 
						onPress={() => this.onBack()}
						style={[styles.btnlogin, {width: 312, height: "23%", elevation: 5, marginTop: 15, backgroundColor: "white"}]}
						label="Back"
						labelStyle={[styles.btnLabelStyle, {color: Color.colorPrimary}]} />
				</View>
				<View style={{marginTop: 30, height: "30%"}}>
					{seconds > 0 ?
						<Text style={styles.txtGetHelpContainer2}>
							Resend code in {
								(seconds > 1) ?
									<Text style={{color: "#FFC914"}}>{seconds} </Text>  :
								`${seconds}`
							}
							second(s)
						</Text> :
						<Text style={styles.txtGetHelpContainer2}>
							<Text
								suppressHighlighting
								onPress={this._handleSendEmailCode}
								style={styles.txtHelp}>Resend Code.</Text>
						</Text>
					}
				</View>
			</View>
		);
	}

	renderOTPScreen = () => {
		const {height} = this.state;
		const h = {height: height};

		return(
			<Animatable.View animation="fadeInUp" style={styles.viewContainer}>	
				<TouchableOpacity onPress={this.back}
					style={{alignSelf: "flex-start", marginLeft: 20, marginTop: 10, marginBottom: -15, backgroundColor: "#FFC914", padding: 5, elevation: 10, borderRadius: 20 }} >
					<Icon type='ionicons' name='arrow-back' size={20} color='white' />
				</TouchableOpacity>
				<Text style={styles.otpHeader}>OTP</Text>
				<View style={[styles.otpBody, {height: 400}]}>
					<View style={styles.imageContainer2}>
						<Image
							style={{width: 110, height: 145}}
							source={require("__proj/src/resources/images/otp_message.png")} 
							resizeMode={"contain"} />
					</View>
					<View style={styles.viewflex2}>
						{this.renderContent()}
					</View>
				</View>
			</Animatable.View>
		);
	}

	renderUnrecognized = () =>{
		const { login: { isLoggingIn }} = this.props;
		const welcomeMsg = "THIS PAGE IS NOT ACCESSIBLE TO UNRECOGNIZED DEVICES. AUTHORIZE THIS DEVICE?";
		const logo = require("__proj/src/resources/images/mascot/surprised_mascot.png");

		return(
			<View style={styles.welcomeBG}>
				<View style={[styles.welcomeBody, {height: 500}]}>
					<Button onPress={this.back} style={styles.welcomeCloseBtn}>
						<Icon name="times" size={25} color="white"/>
					</Button>
					<Image
						style={styles.welcomeIMG}
						source={logo}
						resizeMode={"contain"}
					/>
					<View style={{marginTop: 20}}>
						<Text style={[styles.welcomeMsg, {fontSize: 18, paddingHorizontal: 30}]}>{welcomeMsg}</Text>
					</View>
					
					<Button
						loading={isLoggingIn}
						// onPress={this.click}
						style={styles.welcomeBtnStyle}
						label="Yes"
						labelStyle={styles.welcomeBtnLabel} />
					<Button
						loading={isLoggingIn}
						// onPress={this.renderOTPForm}
						style={[styles.welcomeBtnStyle, {backgroundColor: "#FFFFFF"}]}
						label="No"
						labelStyle={[styles.welcomeBtnLabel, {color: "#FFC914"}]} />
				</View>
			</View>
		);
	}

	render() {
		const {unrecognizedDevice} = this.state;

		return (
			<KeyboardDismiss>
				{unrecognizedDevice === true? this.renderUnrecognized() : this.renderOTPScreen()}
			</KeyboardDismiss>
		);
	}
}

OTPForm.propTypes = {
	actions: PropTypes.object,
	session: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
	isLoggingIn: PropTypes.bool,
};

export default OTPForm;
