import React, {PureComponent} from "react";
import {View, TextInput, Text, Image, TouchableOpacity} from "react-native";
import Button from "__src/components/Button";
import {Icon} from "react-native-elements";
import Color from "__src/resources/styles/color";
import PropTypes from "prop-types";
import styles from "../styles.css";
import _ from "lodash";
import * as Animatable from "react-native-animatable";

export default class UsernameForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error: {},
		};
	}

	componentWillMount(){
		const {actions} = this.props;

		actions.saveUsername("");
	}

	componentDidUpdate (prevProps){ 
		const {forgot: {isUserInfoError}} = this.props;
		const error = {};

		if(!_.isEqual(prevProps.forgot.isUserInfoError, isUserInfoError) && !_.isEmpty(isUserInfoError)){
			error.message = isUserInfoError;
			this.setState({error});
		}
	}

	_handleUsername = (value) => {
		const { actions } = this.props;
		const { error } = this.state;

		if (_.isEmpty(value)) {
			error.username = "Username is required";
		} else {
			delete error.message;
		}

		actions.saveUsername(value);
	}
    
	_proceedEmailFrom = () => {
		const { actions, forgot } = this.props;
		const { getSaveUsername } = forgot;
		const params = {};
		const error = {};

		if (_.isEmpty(getSaveUsername)) {
			error.message = "Email is required.";
		}

		if (_.isEmpty(error)) {
			params.email = getSaveUsername;
			actions.getUserEmailAndMobile(params);
		} else {
			this.setState({error});
		}
	}

	renderErrorBox = () => {
		const {error} = this.state;

		return (
			<Animatable.View animation="rubberBand" style={[{flexShrink: 1, flexDirection: "row", padding: 8, marginTop: -40, alignSelf: "center", height: 40, backgroundColor: "#FB4646", borderRadius: 11}]}>
				<Image
					tintColor="white"
					style={{marginTop: 2, marginHorizontal: 5, height: 20, width: 20}}
					source={require("__proj/src/resources/images/info.png")}
					resizeMode={"contain"}
				/>
				<Text style={{fontSize: 16, color: "white", fontWeight: "bold", fontFamily: "Roboto"}}>{error.message}</Text>
			</Animatable.View>
		);

	}

	render() {
		const {navigation, forgot: {getSaveUsername, isUserInfoError, isFetchingUserInfo}} = this.props;

		return (
			<View style={{alignItems: "center"}}>
				{!_.isEmpty(this.state.error.message) || isUserInfoError? this.renderErrorBox() : null}
				<Text style={styles.txtOtp}>Enter your Email Address</Text>
				<View style={[styles.inputFieldStyle, {marginTop: 10, width: "90%"}]}>
					<TextInput
						style={[styles.textInputStyle, {fontSize: 14}]}
						onFocus={() => this.setState({unFocus: true})}
						onBlur={() => this.setState({unFocus: false})}
						round
						onChangeText={this._handleUsername}
						value={getSaveUsername}
						isFocus={this.state.unFocus}
						autoCapitalize="none"
						returnKeyType='next'
						placeholder='Enter your Email Address'
						placeholderTextColor="gray" />
				</View>
				<View style={[styles.otpBottom, {width: "100%"}]}>
	 				<Button
					 	loading={isFetchingUserInfo}
						onPress={this._proceedEmailFrom}
	 					style={[styles.btnlogin, {width: "90%"}]} 
	 					label="Submit"
	 					labelStyle={styles.btnLabelStyle} />
					<Button
						onPress={() => {navigation.navigate("Login", {})}}
	 					style={[styles.btnlogin, {marginTop: 10, backgroundColor: "#FFFFFF", width: "90%"}]} 
	 					label="Back"
	 					labelStyle={[styles.btnLabelStyle, {color: "#FFC914"}]} />
				</View>
			</View>
		);
	}
}
UsernameForm.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	forgot: PropTypes.object,
};
