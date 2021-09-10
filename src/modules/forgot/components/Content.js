import React, { PureComponent } from "react";
import { View, StatusBar, SafeAreaView, Text, Image, TextInput, Dimensions, TouchableOpacity, 
	Modal, Alert} from "react-native";
import KeyboardDismiss from "__src/components/KeyboardDismiss";
import Button from "__src/components/Button";
import Resource from "__proj/src/resources";
import styles from "../styles.css";
import _ from "lodash";
import ResetForm from "./ResetForm";
import UsernameForm from "./UsernameForm";
import EmailForm from "./EmailForm";
import CodeForm from "./CodeForm";
import ResetSuccess from "./ResetSuccess";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/FontAwesome";
import Dropdown from "__src/components/Dropdown";
import DropDownItem from "__src/components/DropDownItem";
import * as Animatable from "react-native-animatable";
import Geolocation from '@react-native-community/geolocation';
import passwordValidator from "password-validator";
import { inputDetailsFP } from "../actions";

const schema = new passwordValidator();
schema
	.has().uppercase()
	.has().lowercase()
	.has().digits()
	.has().symbols()
	.has().not().spaces();

const { Color } = Resource;
const { width, height } = Dimensions.get('window');

class Content extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			seconds: 60,
			error: {},
			steps: "step1",
			height: 310,
			disabled: true,
			successModalShow: false,
			isLoggingIn: false,
			isResendCode: false,
			viewp1: true,
			viewp2: true,
			latitude: 0,
			longitude: 0,
			marginTop: -40,
		};
	}

	componentDidMount() {
		const { actions } = this.props;

		actions.resetData();
		actions.setForgotPasswordScreen("");
		
		Geolocation.getCurrentPosition(
			(position) => {
				this.setState({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
			},
			(error) => {
				console.log("error", error.code, error.message);
			},
			{ 
				enableHighAccuracy: true, 
				timeout: 10000, 
				maximumAge: 10000 
			} 
		);
	}

	componentDidUpdate (prevProps) {
		const {forgot: {setPasswordSuccess, sendCodeFailed, OTPVerificationFailed, setPasswordFailed}} = this.props;
		const error = {};

		if(!_.isEqual(prevProps.forgot.setPasswordSuccess, setPasswordSuccess) && setPasswordSuccess){
			this.setState({successModalShow: true});
		}

		if(!_.isEqual(prevProps.forgot.sendCodeFailed, sendCodeFailed) && !_.isEmpty(sendCodeFailed)){
			error.message = sendCodeFailed;
			this.setState({error});
		}

		if(!_.isEqual(prevProps.forgot.OTPVerificationFailed, OTPVerificationFailed) && !_.isEmpty(OTPVerificationFailed)){
			error.message = OTPVerificationFailed;
			this.setState({error});
		}

		// if(!_.isEqual(prevProps.forgot.setPasswordFailed, setPasswordFailed) && !_.isEmpty(setPasswordFailed)){
		// 	error.message = setPasswordFailed;
		// 	this.setState({error});
		// }
	}

	_handleSendEmailCode = () => {
		const {actions, forgot: {inputDetailsFP, getSaveUsername }} = this.props;
		const params = {};
		
		clearInterval(this.interval);
		this.setState({ seconds: 60 });
		this.countDown();

		params.type = inputDetailsFP.type;
		params.email = getSaveUsername;

		actions.sendCode(params);
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

	_handleChangeInput = (type) => (value) => {
		const { actions, forgot: {inputDetailsFP} } = this.props;
		const newInput = _.merge({}, inputDetailsFP);
		const error = {};

		this.setState({error});

		switch (type) {
			case "otp":
				if (_.isEmpty(value)) {
					this.setState({disabled: true});
				} else {
					delete error.otp;
					this.setState({disabled: false});
					newInput.code = value;
				}
				break;
			case "password1":
				newInput.newPassword = value;
				break;
			case "password2":
				newInput.confirmNewPassword = value;
				break;

		}

		actions.inputDetailsFP(newInput);
	}

	sendCode = (type) => {
		const {actions, forgot: {inputDetailsFP, getSaveUsername}} = this.props;
		const newInput = _.merge({}, inputDetailsFP);
		const params = {};

		clearInterval(this.interval);
		this.setState({ seconds: 60 });
		this.countDown();

		switch(type){
			case "mobile":
				params.type = "SMS";
				break;
			case "email":
				params.type = "MAIL";
				break;
		}

		newInput.type = params.type;
		params.email = getSaveUsername;

		actions.inputDetailsFP(newInput);
		actions.sendCode(params);
	}
 
	verifyOTP = () => {
		const { actions, forgot: {inputDetailsFP, sendCode} } = this.props;
		const params = {};
		
		if(_.isEmpty(inputDetailsFP)){
			this.setState({error: true});
		}else{
			params.code = inputDetailsFP.code;

			actions.verifyOTP(params, sendCode.token);
		}
	}

	
	handleSetPassword = () => {
		const {actions, forgot: {inputDetailsFP, sendCode}} = this.props;
		const params = {
			lat: this.state.latitude,
			long: this.state.longitude,
		};
		const error = {};

		if(_.isEmpty(inputDetailsFP.newPassword)){
			this.setState({marginTop: -40});
			error.message = "New password field cannot be empty.";
		}else if(!schema.validate(inputDetailsFP.newPassword)){
			this.setState({marginTop: -100});
			error.message = "Password must have at least 1";
			error.message2 = "uppercase, 1 lowercase, 1 ";
			error.message3 = "number and 1 special";
			error.message4 = "character.";
		}else if(_.isEmpty(inputDetailsFP.confirmNewPassword)){
			this.setState({marginTop: -40});
			error.message = "You must re-enter your password.";
		}else if(!_.isEqual(inputDetailsFP.newPassword, inputDetailsFP.confirmNewPassword)){
			this.setState({marginTop: -40});
			error.message = "Your passwords do not match."
		}

		if(_.isEmpty(error)){
			params.newPassword = inputDetailsFP.newPassword;
			params.confirmNewPassword = inputDetailsFP.confirmNewPassword;

			actions.setNewPassword(params, sendCode.token);
		}else{
			this.setState({error});
		}
	}
	
	renderErrorBox = () => {
		const {error, marginTop} = this.state;
		const mTop = {marginTop: marginTop};

		return (
			<Animatable.View animation="rubberBand" style={[mTop, {flexShrink: 1, flexDirection: "row", padding: 8, alignSelf: "center", backgroundColor: "#FB4646", borderRadius: 11}]}>
				<Image
					tintColor="white"
					style={{marginTop: 2, marginHorizontal: 5, height: 20, width: 20}}
					source={require("__proj/src/resources/images/info.png")}
					resizeMode={"contain"}
				/>
				{!_.isEmpty(error.message2)?
					<View style={{flexDirection: "column", height: 85}}>
						<Text style={{fontSize: 16, color: "white", fontWeight: "bold", fontFamily: "Roboto"}}>{error.message}</Text>
						<Text style={{fontSize: 16, color: "white", fontWeight: "bold", fontFamily: "Roboto"}}>{error.message2}</Text>
						<Text style={{fontSize: 16, color: "white", fontWeight: "bold", fontFamily: "Roboto"}}>{error.message3}</Text>
						<Text style={{fontSize: 16, color: "white", fontWeight: "bold", fontFamily: "Roboto"}}>{error.message4}</Text>
					</View>
				:
					<Text style={{fontSize: 16, color: "white", fontWeight: "bold", fontFamily: "Roboto"}}>{error.message}</Text>
				}
				
			</Animatable.View>
		);

	}
  
	_renderChildren = () => {
		const { forgot: {sendCode, userInfo, OTPVerified} } = this.props;
		const { steps } = this.state;

		if(!_.isEmpty(OTPVerified)){
			this.setState({height: 370});
			return this.render5();
		}else if(!_.isEmpty(sendCode)){
			this.setState({height: 410});
			return this.render4();
		}else if(!_.isEmpty(userInfo)){
			this.setState({height: 310});
			return this.render1();
		}else{
			this.setState({height: 380});
			return this._renderUsernameForm();
		}
	}

	startCountdown = () => {
		clearInterval(this.interval);
		this.setState({seconds: 60});
		this.countDown();
	}

	renderBase = () => {
		// const color = inputDetails.label ? null : Color.Standard;
		const {forgot: {inputDetailsFP}} = this.props;
		const fontColor = _.isEmpty(inputDetailsFP.prefix)? {color: "gray"} : {color: "black"};
		
		return (
			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
				<Text style={[fontColor, {marginLeft: 10, textAlign: "center", fontSize: 16}]}>
					{inputDetailsFP.prefix || "Prefix"}
				</Text>
				<Icon style={{paddingTop: 4}} name='chevron-down' color="black" size={15} />
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

	onBack = () => {
		const {actions} = this.props;

		actions.resetData();
	}

	render1 = () => {
		const { forgot: {userInfo, sendingCode, inputDetailsFP} } = this.props;

		return(
			<View>
				{!_.isEmpty(this.state.error) ? this.renderErrorBox() : null}
				<Text style={styles.txtOtp}>Where do you want to send the OTP?</Text>
				<View style={styles.otpBottom}>
					{userInfo.hasMobile == true?
						<Button
							loading={inputDetailsFP.type == "SMS"? sendingCode : null}
							onPress={() => this.sendCode("mobile")}
							style={[styles.btnlogin, {width: "90%"}]} 
							label="Mobile"
							labelStyle={styles.btnLabelStyle} />
					:
						<Button
							disabled
							style={[styles.btnlogin, {width: 312, opacity: 0.5}]} 
							label="Mobile"
							labelStyle={styles.btnLabelStyle} />
					}
					<Button
						color="#FFC914"
						loading={inputDetailsFP.type == "MAIL"? sendingCode : null}
						onPress={() => this.sendCode("email")}
						style={[styles.btnlogin, {width: "90%", elevation: 5, marginTop: 15, backgroundColor: "white"}]}
						label="Email"
						labelStyle={[styles.btnLabelStyle, {color: Color.colorPrimary}]} />
				</View>
				
			</View>
		);
	}

	// render2 = () => {
	// 	const {forgot: {inputDetailsFP}} = this.props;
	// 	const prefixes = [{country: "PH", prefix: "639"}];

	// 	return(
	// 		<View>
	// 			{!_.isEmpty(this.state.error)? this.renderErrorBox() : null}
	// 			<Text style={styles.txtOtp}>Enter your Mobile Number</Text>
	// 			<View style={{flexDirection: "row", justifyContent: "space-between"}}>
	// 				<View style={styles.prefixField}>
	// 					<Dropdown
	// 						animated={false}
	// 						showsVerticalScrollIndicator={false}
	// 						renderBase={this.renderBase}
	// 						dropdownStyle={styles.dropdownStyle2}
	// 						options={prefixes}
	// 						renderButtonText={this._handleChangeInput("prefix")}
	// 						renderRow={this.renderRow}
	// 						renderSeparator={null} />
	// 				</View>
	// 				<View style={[styles.mobileField]}>
	// 					<TextInput
	// 						value={inputDetailsFP.mobile}
	// 						style={[{fontSize: 18}]}
	// 						onFocus={() => this.setState({otpFocus: true})}
	// 						onBlur={() => this.setState({otpFocus: false})}
	// 						round
	// 						keyboardType="number-pad"
	// 						isFocus={this.state.otpFocus}
	// 						onChangeText={this._handleChangeInput("mobile")}
	// 						returnKeyType='next'
	// 						placeholder="ex: 9089053422" />
	// 				</View>
	// 			</View>
	// 			<View style={styles.otpBottom}>
	// 				<Button
	// 					onPress={this.sendCodeMobile}
	// 					style={[styles.btnlogin, {width: 312}]} 
	// 					label="Send Code"
	// 					labelStyle={styles.btnLabelStyle} />
	// 				<Button
	// 					onPress={() => this.onBack()} 
	// 					style={[styles.btnlogin, {width: 312, elevation: 5, marginTop: 15, backgroundColor: "white"}]}
	// 					label="Back"
	// 					labelStyle={[styles.btnLabelStyle, {color: Color.colorPrimary}]} />
	// 			</View>
	// 		</View>
	// 	);
	// }

	// render3 = () => {

	// 	return(
	// 		<View>
	// 			<Text style={styles.txtOtp}>Enter your Email Address</Text>
	// 			<View style={[styles.inputFieldStyle, {width: 310}]}>
	// 				<TextInput
	// 					value={inputDetailsFP.email}
	// 					style={[styles.textInputStyle, {fontSize: 14}]}
	// 					onFocus={() => this.setState({otpFocus: true})}
	// 					onBlur={() => this.setState({otpFocus: false})}
	// 					round
	// 					keyboardType="default"
	// 					isFocus={this.state.otpFocus}
	// 					onChangeText={this.onChangeInput}
	// 					returnKeyType='next'
	// 					placeholder="Enter Email Address" />
	// 			</View>
	// 			<View style={styles.otpBottom}>
	// 				<Button
	// 					onPress={this.sendCodeEmail}
	// 					style={[styles.btnlogin, {width: 312}]} 
	// 					label="Send Code"
	// 					labelStyle={styles.btnLabelStyle} />
	// 				<Button
	// 					onPress={() => this.onBack()} 
	// 					style={[styles.btnlogin, {width: 312, elevation: 5, marginTop: 15, backgroundColor: "white"}]}
	// 					label="Back"
	// 					labelStyle={[styles.btnLabelStyle, {color: Color.colorPrimary}]} />
	// 			</View>
	// 		</View>
	// 	);
	// }

	render4 = () => {
		const {forgot: {isVerifiyingOTP}} = this.props;
		const {seconds, getSaveOTP} = this.state;

		return(
			<View style={{marginTop: -30, alignItems: "center", width: "100%"}}>
				{!_.isEmpty(this.state.error) ? this.renderErrorBox() : null}
				<Text style={styles.txtOtp}>Input OTP sent to your mobile number (or email)</Text>
				<View style={[styles.inputFieldStyle, {width: "90%"}]}>
					<TextInput
						style={[styles.textInputStyle, {fontSize: 14}]}
						onFocus={() => this.setState({otpFocus: true})}
						onBlur={() => this.setState({otpFocus: false})}
						round
						keyboardType="phone-pad"
						isFocus={this.state.otpFocus}
						onChangeText={this._handleChangeInput("otp")}
						value={getSaveOTP}
						returnKeyType='next'
						placeholder="Enter OTP Code"
						placeholderTextColor="gray" />
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
			
				<View style={[styles.otpBottom, {alignItems: "center", width: "100%"}]}>
					{this.state.disabled == true? 
					<Button
						disabled
						style={[styles.btnlogin, {width: "90%", opacity: 0.6}]} 
						label="Submit"
						labelStyle={styles.btnLabelStyle} />
					:<Button
						onPress={this.verifyOTP} 
						loading={isVerifiyingOTP} 
						style={[styles.btnlogin, {width: "90%"}]} 
						label="Submit"
						labelStyle={styles.btnLabelStyle} />
					}
					<Button 
						onPress={this.onBack}
						style={[styles.btnlogin, {width: "90%", elevation: 5, marginTop: 15, backgroundColor: "white"}]}
						label="Back"
						labelStyle={[styles.btnLabelStyle, {color: Color.colorPrimary}]} />
				</View>
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
		);
	}

	toggle1 = () =>  {
		if(this.state.viewp1 == true){
			this.setState({viewp1: false});
		}else{
			this.setState({viewp1: true});
		}
	}

	toggle2 = () =>  {
		if(this.state.viewp2 == true){
			this.setState({viewp2: false});
		}else{
			this.setState({viewp2: true});
		}
	}


	render5 = () => {
		const {forgot: {isSetNewPassword, inputDetailsFP}} = this.props;

		return(
			<View>
				{!_.isEmpty(this.state.error) ? this.renderErrorBox() : null}
				<Text style={styles.txtOtp}>Your Password must be changed.</Text>
				<View style={[styles.passwordFieldStyle, {alignSelf: "center", width: "90%", height: "18%"}]}>
					<View style={[{justifyContent: "center", width: "90%"}]}>
						<TextInput
							style={[styles.textInputStyle, {padding: 0}]}
							onRef={(e) => (this.password = e)}
							onFocus={() => this.setState({ passwordFocus: true })}
							onBlur={() => this.setState({ passwordFocus: false })}
							round
							isFocus={this.state.passwordFocus}
							onChangeText={this._handleChangeInput("password1")}
							value={inputDetailsFP.newPassword}
							returnKeyType="next"
							placeholder="New Password"
							placeholderTextColor="gray"
							secureTextEntry={this.state.viewp1}
							// onSubmitEditing={this._onSubmit}
							viewPass={() => this.setState({ viewp1: !this.state.viewp1 })}
						/>
					</View>
					<View style={{justifyContent: "center", width: "10%"}}>
						<TouchableOpacity onPress={this.toggle1}>
							{this.state.viewp1 == true?
							<Image
								style={[styles.hidePass]}
								source={require("__proj/src/resources/images/hide_password.png")}
								resizeMode={"contain"}
							/> : 
							<Image
								style={[styles.showPass]}
								source={require("__proj/src/resources/images/show_password.png")}
								resizeMode={"contain"}
							/>
							}
						</TouchableOpacity>
					</View>
				</View>

				<View style={[styles.passwordFieldStyle, {alignSelf: "center", width: "90%", height: "18%"}]}>
					<View style={[{justifyContent: "center", width: "90%"}]}>
						<TextInput
							style={[styles.textInputStyle, {padding: 0}]}
							onRef={(e) => (this.password = e)}
							onFocus={() => this.setState({ passwordFocus: true })}
							onBlur={() => this.setState({ passwordFocus: false })}
							round
							isFocus={this.state.passwordFocus}
							onChangeText={this._handleChangeInput("password2")}
							value={inputDetailsFP.confirmNewPassword}
							returnKeyType="next"
							placeholder="Re-Enter Password"
							placeholderTextColor="gray"
							secureTextEntry={this.state.viewp2}
							// onSubmitEditing={this._onSubmit}
							viewPass={() => this.setState({ viewp2: !this.state.viewp2 })}
						/>
					</View>
					<View style={{justifyContent: "center", width: "10%"}}>
						<TouchableOpacity onPress={this.toggle2}>
							{this.state.viewp2 == true?
							<Image
								style={[styles.hidePass]}
								source={require("__proj/src/resources/images/hide_password.png")}
								resizeMode={"contain"}
							/> : 
							<Image
								style={[styles.showPass]}
								source={require("__proj/src/resources/images/show_password.png")}
								resizeMode={"contain"}
							/>
							}
						</TouchableOpacity>
					</View>
				</View>

				<View style={{marginVertical: 15, width: "100%"}}>
					<Button
						loading={isSetNewPassword}
						onPress={this.handleSetPassword}
						style={styles.btnSubmit}
						label="Change Password"
						labelStyle={styles.btnLabelStyle}
					/>
				</View>
			</View>
		);
	}

	SuccessModal = () => {

		return(
			<Modal animationType="fade" visible={this.state.successModalShow} transparent>
                <View style={styles.welcomeBG}>
                    <View style={[styles.welcomeBody]}>
                        <Image
                            style={styles.welcomeIMG}
                            source={require("__proj/src/resources/images/mascot/happy_mascot.png")}
                            resizeMode={"contain"}
                        />
						<View style={{marginTop: 20}}>
							<Text style={[styles.welcomeMsg, {fontSize: 17, paddingHorizontal: 30}]}>HURRAY!</Text>
							<Text style={[styles.welcomeMsg, {fontSize: 17}]}>
								YOUR PASSWORD HAS BEEN CHANGED!
							</Text>
						</View> 
						<Button
							onPress={this.handleOK}
							style={[styles.welcomeBtnStyle, {borderBottomWidth: 1, borderWidth: 1, borderBottomColor: "#FFC914", borderColor: "#FFC914"}]}
							label="OK"
							labelStyle={[styles.welcomeBtnLabel]} />
                    </View>
                </View>
            </Modal>
		);
	}

	handleOK = () => {
		const {navigation} = this.props;

		this.setState({successModalShow: false});

		navigation.navigate("Login", {});
	}

	_renderUsernameForm = () => (
		<UsernameForm {...this.props} />
	);
	
	backArrow = () => {
		const { navigation, actions } = this.props;

		actions.resetData();
		navigation.navigate('Login');
	}

	render() {
		const {forgot: {setPasswordSuccess}} = this.props;
		const {height} = this.state;
		const h = {height: height};

		return (
			<KeyboardDismiss>
				<View style={styles.viewContainer}>
					{/* <Button onPress={this.backArrow} style={styles.backArrow}>
						<Icon style={{color: "white"}} name="arrow-left" size={15}/>
					</Button>
					<Text style={styles.otpHeader}>FORGOT PASSWORD</Text> */}
					<View style={[h, styles.body2]}>
						<View style={styles.imageContainer2}>
							<Image
								style={{width: 110, height: 100}}
								source={require("__proj/src/resources/images/forgot_password.png")} 
								resizeMode={"contain"}/>
						</View>
						<View style={[styles.inputContainer]}>
							{this.SuccessModal()}
							{this._renderChildren()}
						</View>
					</View>
				</View>
			</KeyboardDismiss>
		);
	}
}

Content.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	forgot: PropTypes.object,
};

export default Content;
