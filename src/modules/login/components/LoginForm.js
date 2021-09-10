/* eslint-disable react-native/no-inline-styles */
import Resource from "__proj/src/resources";
import TxtInput from "__src/components/TxtInput";
import Loading from "__src/components/Loading";
import PrivacyPolicy from "./modal/PrivacyPolicy";
import TermsAndConditions from "./modal/TermsAndConditions";
import React, { PureComponent } from "react";
import { Text, View, Alert, TouchableOpacity, Keyboard, Image, TextInput } from "react-native";
import PropTypes from "prop-types";
import Button from "__src/components/Button";
import styles from "../styles.css";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { Icon } from "react-native-elements";
import _ from "lodash";
import API from "../api/location";
import FBRegistration from "./FBRegistration";
import KeyboardDismiss from "__src/components/KeyboardDismiss";
import * as Animatable from "react-native-animatable";

const { Res } = Resource;

class LoginForm extends PureComponent {
	static navigationOptions = {
		headerShow: false,
	};

	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			viewp: true,
			forgot: false,
			showFbLoginModal: false,
			isFBreg: false,
			message: "",
			error: {},
			user: {},
			isVisibleP: false,
			isVisibleT: false,
		};
	}

	componentDidMount() {
		const { actions } = this.props;

		actions.setLoginDetails({});
	}

	componentDidUpdate(prevProps) {
		const {
			login: { failLogInWithFb, isLoggedIn, isFailed },
		} = this.props;
		const error = {};

		if (
			failLogInWithFb &&
			failLogInWithFb !== prevProps.login.failLogInWithFb
		) {
			this.setState({ showFbLoginModal: true });
		}

		if (prevProps.login.isLoggedIn !== isLoggedIn && isLoggedIn) {
			this.setState({
				showFbLoginModal: false,
			});
		}

		if(prevProps.login.isFailed !== isFailed && isFailed){
			error.message = "Invalid username/password";
			this.setState({error});
		}
	}

	_openTerms = () => {
		this.setState({isVisibleT: true});
	}

	_openPolicy = () => {
		this.setState({isVisibleP: true});
	}

	social = () => {
		const {
			actions,
			login: { isLoggingInWithFb },
		} = this.props;

		if (isLoggingInWithFb) {
			return;
		}
		LoginManager.logInWithPermissions(["email"]).then(
			(result) => {
				if (result.isCancelled) {
					console.log("Login cancel: ");
				} else {
					console.log("Login success: ", result);
					AccessToken.getCurrentAccessToken()
						.then(async (data) => {
							const response = await API.FacebookLogin(
								data.userID,
								data.accessToken
							);

							actions.checkFb({ ...response, ...data }, "mobile");
						})
						.catch((err) => {
							console.log("FBAccessToken: ", err);
							Alert.alert("Social", `Something went wrong! (001) ${err}`);
						});
				}
			},
			(err) => {
				console.log("LoginManager: ", err);
				Alert.alert("Social", `Something went wrong! (002) ${err}`);
			}
		);
	};

	async _getpos() {
		return await new Promise((res, rej) => {
			window.navigator.geolocation.getCurrentPosition(res, rej);
		});
	}

	_handleChangeInput = (type) => (value) => {
		const error = {};
		const { actions, login } = this.props;
		const newInput = _.merge({}, login.inputLoginDetails);

		switch (type) {
			case 1:
				newInput.username = value.trim();
				break;
			case 2:
				newInput.password = value.trim();
				break;
		}

		this.setState({ error });
		actions.setLoginDetails(newInput);
	};

	_onSubmit = () => {
		const { actions, login, navigation } = this.props;
		const error = {};

		this.setState({ error });
		Keyboard.dismiss();

		if (_.isEmpty(login.inputLoginDetails.username)) {
			error.message = "Email cannot be empty.";
		} else if (_.isEmpty(login.inputLoginDetails.password)) {
			error.message = "Password is empty.";
		}

		if (_.isEmpty(error)) {
			actions.login(login.inputLoginDetails, login.session.token, navigation);
		} else {
			this.setState({ error });
		}
	};

	toggle = () =>  {
		if(this.state.viewp == true){
			this.setState({viewp: false});
		}else{
			this.setState({viewp: true});
		}
	}

	renderError = () => {
		const {error} = this.state;

		return(
			<View style={[styles.flexRow, {width: "100%", alignSelf: "flex-start", marginHorizontal: 10, marginTop: 5, marginBottom: -13}]}>
				<Image
					style={{marginTop: 3, marginRight: 5, height: 14, width: 14, tintColor: "#F93131"}}
					source={require("__proj/src/resources/images/info.png")}
					resizeMode={"contain"}
				/>
				<Text style={{color: "#F93131", fontWeight: "bold", fontFamily: "Roboto", fontSize: 14}}>{error.message}</Text>
			</View>
		);
	}

	renderErrorBox = () => {
		const {error} = this.state;

		return (
			<Animatable.View animation="rubberBand" style={[styles.flexRow, {padding: 8, marginTop: -40, alignSelf: "center", width: 200, height: 40, backgroundColor: "#FB4646", borderRadius: 11}]}>
				<Image
					tintColor="white"
					style={{marginTop: 2, marginHorizontal: 5, height: 20, width: 20}}
					source={require("__proj/src/resources/images/info.png")}
					resizeMode={"contain"}
				/>
				<Text style={{fontSize: 16, color: "white", fontWeight: "bold", fontFamily: "Roboto"}}>{error.messageBox}</Text>
			</Animatable.View>
		);

	}

	_handleClickFbLoginModal = () => {
		this.setState({isVisibleT: true});

		if(this.state.isVisibleT == false){
			this.setState({showFbLoginModal: true});
		}
	}

	_handleCancelFbLoginModal = () => {
		const { actions } = this.props;

		actions.resetLogin();

		this.setState({
			showFbLoginModal: false,
		});
	};

	render() {
		const {
			login: { isLoggingIn, isLoggingInWithFb, inputLoginDetails },
			navigation,
		} = this.props;
		const { error } = this.state;

		return (
			<KeyboardDismiss>
				<Animatable.View animation="fadeIn" style={styles.flex1}>
					<View style={styles.height90}>
						<View style={styles.top}>
							<TouchableOpacity onPress={() => navigation.goBack()}
								style={{alignSelf: "flex-start", marginLeft: 20, marginBottom: -25, backgroundColor: "#FFC914", padding: 5, elevation: 10, borderRadius: 20 }} >
								<Icon type='ionicons' name='arrow-back' size={20} color='white' />
							</TouchableOpacity>
							<View style={styles.flexRow}>
								<Text style={styles.txtLanguage}>English (United States)</Text>
								<Icon
									name="chevron-down"
									type="evilicon"
									size={19}
								/>
							</View>
							<View style={{height: "95%", width: "100%", alignItems: "center", justifyContent: "center"}}>
								<Image
									style={[styles.imageLogo]}
									source={require("__proj/src/resources/images/logo/u_legit_logo.png")}
									resizeMode={"contain"}
								/>
							</View>
						</View>

						{_.isEmpty(error.messageBox)? null : this.renderErrorBox()}
						
						<View style={styles.middle}>
							<View style={{height: "100%", alignItems: "center"}}>
								<View style={styles.inputFieldStyle}>
									<TextInput
										style={styles.textInputStyle}
										onRef={(e) => (this.username = e)}
										onFocus={() => this.setState({ usernameFocus: true })}
										onBlur={() => this.setState({ usernameFocus: false })}
										round
										placeholder="Email"
										placeholderTextColor="gray"
										isFocus={this.state.usernameFocus}
										onChangeText={this._handleChangeInput(1)}
										value={inputLoginDetails.username}
										returnKeyType="next"
									/>
								</View>
								<View style={[styles.passwordFieldStyle, { height: "10%"}]}>
									<View style={[{justifyContent: "center", width: "90%"}]}>
										<TextInput
											style={[styles.textInputStyle]}
											onRef={(e) => (this.password = e)}
											onFocus={() => this.setState({ passwordFocus: true })}
											onBlur={() => this.setState({ passwordFocus: false })}
											round
											isFocus={this.state.passwordFocus}
											onChangeText={this._handleChangeInput(2)}
											value={inputLoginDetails.password}
											returnKeyType="next"
											placeholder="Password"
											placeholderTextColor="gray"
											secureTextEntry={this.state.viewp}
											onSubmitEditing={this._onSubmit}
											viewPass={() => this.setState({ viewp: !this.state.viewp })}
										/>
									</View>
									<View style={{justifyContent: "center", width: "10%"}}>
										<TouchableOpacity onPress={() => this.toggle()}>
											{this.state.viewp == true?
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
									{/* <View style={{justifyContent: "center"}}>
										<Image
											style={{marginLeft: 6, height: 13, width: 13}}
											source={require("__proj/src/resources/images/info.png")}
											resizeMode={"contain"}
										/>
									</View> */}
								</View>
								
								{_.isEmpty(error.message)? null : this.renderError()}

								<View style={{marginTop: 15, width: "100%", alignItems: "center"}}>
									<Text style={styles.txtTermsContainer}>By continuing, you agree to our 
										<Text onPress={this._openTerms} style={styles.termStyle}> Terms and Conditions</Text> and 
										<Text onPress={this._openPolicy} style={styles.termStyle}> Privacy Policy.</Text>
									</Text>
								</View>

								<Button
									onPress={this._onSubmit}
									loading={isLoggingIn}
									style={styles.btnlogin}
									label="Log In"
									labelStyle={styles.btnLabelStyle}
								/>
								<Text style={[styles.txtGetHelpContainer, {}]}>
									<Text
										suppressHighlighting
										onPress={() =>
											navigation.navigate("ForgotPassword", {})
										}>
										Forgot your password?
									</Text>
								</Text>
								
								<View style={[styles.flexRow, {width: "80%", justifyContent: "space-between"}]}>
									<View style={{marginVertical: 8, height: 1, width: "40%", backgroundColor: "#000000"}} />
									<View style={{}}>
										<Text style={{fontSize: 12}}>or</Text>
									</View>
									<View style={{marginVertical: 8, height: 1, width: "40%", backgroundColor: "#000000"}} />
								</View>

								<TouchableOpacity onPress={this.social}
									style={{alignItems: "center", width: "95%", height: "8%", marginTop: 9}}>
									<View style={[styles.otherLoginView, {backgroundColor: "#3B5999"}]}>
										<Image
											style={styles.otherLoginLogo}
											source={require("__proj/src/resources/images/facebook.png")}
											resizeMode={"contain"}
										/>
										<Text style={styles.otherLoginStyle}>FACEBOOK</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{alignItems: "center", width: "95%", height: "8%", marginTop: 9}}>
									<View style={[styles.otherLoginView, {backgroundColor: "#F44336"}]}>
										<Image
											style={[styles.otherLoginLogo, {width: 25}]}
											source={require("__proj/src/resources/images/google.png")}
											resizeMode={"contain"}
										/>
										<Text style={styles.otherLoginStyle}>GOOGLE</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{alignItems: "center", width: "95%", height: "8%", marginTop: 9}}>
									<View style={[styles.otherLoginView, {backgroundColor: "#000000"}]}>
										<Image
											style={[styles.otherLoginLogo, {width: 18}]}
											source={require("__proj/src/resources/images/apple.png")}
											resizeMode={"contain"}
										/>
										<Text style={styles.otherLoginStyle}>APPLE</Text>
									</View>
								</TouchableOpacity>

							</View>
						</View>
					</View>
					<View style={styles.bottom}>
						<Text style={styles.txtHelpContainer}>
							New User? 
							{" "}
							<Text
								suppressHighlighting
								onPress={() => this.props.navigation.navigate("RegisterScreen")}
								style={styles.txtHelp}
							>
								
								Create an account.
							</Text>
						</Text>
					</View>
					<FBRegistration
						visible={this.state.showFbLoginModal}
						onRequestClose={this._handleCancelFbLoginModal}
						onCancel={this._handleCancelFbLoginModal}
						{...this.props}
					/>
					<PrivacyPolicy 
						isVisibleP={this.state.isVisibleP}
						onClose={()=> {this.setState({isVisibleP: false})}}
						{...this.props}
					/>
					<TermsAndConditions
						isVisibleT={this.state.isVisibleT}
						onClose={()=> {this.setState({isVisibleT: false})}}
						{...this.props}
					/>
				</Animatable.View>
			</KeyboardDismiss>
		);
	}
}

LoginForm.propTypes = {
	actions: PropTypes.object,
	session: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
};

export default LoginForm;
