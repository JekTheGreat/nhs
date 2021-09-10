/* eslint-disable */
import React, {PureComponent} from "react";
import {View, ScrollView, Modal, Text, TextInput} from "react-native";
import PropTypes from "prop-types";
import Button from "__src/components/Button";
import Dropdown from "__src/components/Dropdown";
import TxtInput from "__src/components/TxtInput";
import {Icon} from "react-native-elements";
import Loading from "__src/components/Loading";
import _ from "lodash";
import styles from "../styles.css";
import worldCountries from "world-countries";
import Resources from "__src/resources";
const {Color} = Resources;

class FBRegistration extends PureComponent{
	constructor(props) {
		super(props);
		this.state = {
			error: {},
		};
	}

	// eslint-disable-next-line max-statements
	componentDidUpdate(prevProps) {
		const {login: {LoggedInWithFb2Failed}} = this.props;

		if(prevProps.login.LoggedInWithFb2Failed !== LoggedInWithFb2Failed && LoggedInWithFb2Failed){
			const error = {};
			error.email = "Email is already used.";
			this.setState({error})
		}
	}

	_renderRow( rowData, rowID, highlighted) {
		return (
			<View style={[styles.dropdownRow,
				highlighted && {backgroundColor: Color.LightBlue}]}>
				<Text style={[styles.dropdownRowText,
					highlighted && styles.dropdownRowText2]}>
					{`${rowData.name.common}`}
				</Text>
			</View>
		);
	}

	_renderBase() {
		const {register: {registerNewInput}} = this.props;

		return (
			<View style={{backgroundColor: Color.white}} >
				<View accessible style={[styles.views_bi3]}>
					<Text
						style={styles.textfields}
						underlineColorAndroid="transparent">{registerNewInput.country}</Text>
					<Icon style={styles.icon} type='font-awesome' name='caret-down' size={25} color={Color.DarkBG} />
				</View>
			</View>
		);
	}
  
	_renderComponent(compName){
		switch (compName) {
		case "Loading":
			return (
				<View style={styles.load}>
					<Loading size="small" />
				</View>);
		case "Validated":
			return (
				<Icon
					name='check'
					type='evilicon'
					color='#2C932C'
					size={27}
				/>
			);
		case "Error":
			return (
				<Icon
					name='close-o'
					type='evilicon'
					color="red"
					size={27}
				/>
			);
	
		default:
			return null;
		}
	}
  
  _handleInputSuffix = (type) => {
  	const { register: { isCheckingImportantDetails } } = this.props;

  	if (isCheckingImportantDetails[type]) {
  		return isCheckingImportantDetails[type];
  	}

  	return null;
	}
	


  _onChangeText =(type) => (val) => {
  	const {register: {registerNewInput}, actions} = this.props;
  	const newInput = _.merge({}, registerNewInput);
  	const error1 = {};

  	switch (type){
  	case "username":
  		// if (_.isEmpty(val)) {
  		// 	error1[type] = "Username is required";
  		// }

  		newInput[type] = val;
  		break;
  	case "mobile":
  		// if (_.isEmpty(val)) {
  		// 	error1[type] = "Mobile number is required";
  		// }

  		newInput.mobileNumber = val;
  		break;
  	case "country":
  		const country = _.find(worldCountries, (data) => {
  			if (data.ccn3 === val.ccn3){
  				return data;
  			}
  		});

  		newInput[type] = val.name.common;
  		actions.setCountryDial(country.callingCode);
  		break;
  	}
  	this.setState({ error: error1 });
  	actions.setRegisterInput(newInput);
  }

  onBlur = (type) => {
  	const {actions, register: {registerNewInput, registerCountryDial}} = this.props;
  	const error1 = {};
  	let value = registerNewInput.mobileNumber;
    
  	switch (type){
  	case "username":
  		if (registerNewInput.username === ""){
  			error1[type] = "Username is required.";
  		} else if (registerNewInput.username.length < 8) {
  			error1[type] = "Username must be at least 8 characters long";
  		}
  		break;
  	case "mobile":
  		if (registerNewInput.mobileNumber === ""){
  			error1[type] = "Mobile number is required.";
  		} else if (value.startsWith("0")) {
  			value = "+".concat(registerCountryDial, value.slice(1, value.length));
  		} else {
  			value = "+".concat(registerCountryDial, value);
  		}
  		break;
  	}

  		this.setState({ error: error1 });
  }

  _checkInputs = () => {
  	const {register: {registerNewInput} } = this.props;
  	const error1 = {...this.state.error};
  	// eslint-disable-next-line no-useless-escape
  	const usernameRegex = new RegExp("^(?=.*[!@#\$%\^&\*])(?=.{8,})");
  	const mobileRegex = /[0-9]+/g;


  	if (_.isEmpty(registerNewInput.username)) {
  		error1.username = "Username is required";
  	} else if (registerNewInput.username.length < 8) {
  		error1.username = "Username must be at least 8 characters long";
  	} else if (registerNewInput.username.match(usernameRegex)) {
  		error1.username = "Username must not have special characters";
  	}

  	if (_.isEmpty(registerNewInput.mobileNumber)) {
  		error1.mobile = "Mobile number is required";
  	} else if (!mobileRegex.test(registerNewInput.mobileNumber)) {
  		error1.mobile = "Mobile number must only contain numbers";
  	}

  	if (_.isEmpty(error1)) {
  		this._handleSubmit();
  	} else {
  		this.setState({ error: { ...error1 } });
  	}
  }
  _handleSubmit = () => {
  	const { actions, login: { logInWithFb },
  		register: {registerNewInput, registerCountryDial}  } = this.props;
  	const type = "mobile";
  	let number = registerNewInput.mobileNumber;
    
  	if (number.startsWith("0")) {
  		number = "+".concat(registerCountryDial, number.slice(1, number.length));
  	} else {
  		number = "+".concat(registerCountryDial, number);
  	}

  	const values = {
  		username: registerNewInput.username,
  		mobile: number,
  	};

  	actions.loginWithFacebook2(logInWithFb, type, values);
	}
	
	renderError = () => {
		const {error} = this.state;

		if (!_.isEmpty(error)){
			return (
				<View style={styles.inpuView1}>
					<Icon containerStyle={styles.iconContainerStyle}
						name='close-circle' type="material-community" color={Color.red} size={15} />
					<Text style={[styles.txt3, {color: Color.red}]}>
						{error.email}</Text>
				</View>
			);
		}
		
		return null;
	}

  render(){
  	const {onRequestClose, visible,
  		register: {registerNewInput, registerCountryDial},
  		login: { isLoggingInWithFb2, logInWithFb }} = this.props;
  	const {error} = this.state;
    
  	return (
  		<Modal animationType='fade' transparent visible={visible} onRequestClose={onRequestClose}>
  			<ScrollView style={styles.modalContainer} showsVerticalScrollIndicator={false}>
  				<View style={styles.modalView1}>
  					<Text style={styles.txtFb}>Login with Facebook</Text>

						<TxtInput
							value={logInWithFb.email}
							label='EMAIL'
							isText
							style={styles.margin15}
							inputStyles={styles.inputStyles}
							style3={styles.borderWidth0}/>

  					<TxtInput
  						onChangeText={this._onChangeText("username")}
  						value={registerNewInput.username}
  						// onBlur={() => this.onBlur("username")}
  						autoCapitalize="none"
  						returnKeyType='next'
  						err={error.username}
  						label='USERNAME'
  						style={styles.margin15} />

  					<View style={styles.margin15}>
  						<Text style={styles.labelStyle}>PHONE NUMBER</Text>
  						<View accessible style={[styles.views_bi3]}>
  							<View style={styles.view2}>
  								<Text style={styles.txt1}>{`+${registerCountryDial}`}</Text>
  							</View>
  							<TextInput
  								autoCorrect={false}
  								autoCapitalize="none"
  								placeholder="917xxxx"
								placeholderTextColor={Color.Standard}
  								// onBlur={() => this.onBlur("mobile")}
  								keyboardType="phone-pad"
  								style={styles.textfields}
  								underlineColorAndroid="transparent"
  								value={registerNewInput.mobileNumber}
  								returnKeyType='done'
  								onChangeText={this._onChangeText("mobile")}/>
  						</View>
  						{error.mobile ?
  							<Text style={styles.errStyle}>{error.mobile}</Text> : null}
  					</View>

  					<View style={styles.margin15}>
  						<Text style={styles.labelStyle}>COUNTRY</Text>
  						<Dropdown
  							animated={false}
  							renderBase={this._renderBase.bind(this)}
  							dropdownStyle={styles.dropdownstyle}
  							options={worldCountries}
  							renderButtonText={this._onChangeText("country")}
  							renderRow={this._renderRow.bind(this)}
  							renderSeparator={null} />
  					</View>

					{this.renderError()}

  					<View style={[styles.otpBottom, {flexDirection: "row", justifyContent: "space-evenly"}]}>
  						<Button 
							onPress={() => this.props.onCancel()}
  							style={styles.btnback}
  							labelStyle={{color: Color.colorPrimary}} 
							label="Cancel"/>
  						<Button 
							onPress={this._checkInputs}
  							loading={isLoggingInWithFb2}
  							style={styles.width120}
  							label="Proceed"/>
  					</View>
  				</View>
  			</ScrollView>
  		</Modal>
  	);
  }
}
FBRegistration.propTypes = {
	actions: PropTypes.object,
	visible: PropTypes.bool,
	onRequestClose: PropTypes.func,
	onCancel: PropTypes.func,
	register: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
};

export default FBRegistration;
