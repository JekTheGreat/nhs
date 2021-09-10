/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity,StatusBar, ScrollView} from "react-native";
import TxtInput from "__src/components/TxtInput";
import {Icon} from "react-native-elements";
import Color from "__src/resources/styles/color";
import PropTypes from "prop-types";
import styles from "../styles.css";
import _ from "lodash";
import passwordValidator from "password-validator";

const errorMessage = "This field is required."


const schema = new passwordValidator();

schema
	.has().uppercase()
	.has().lowercase()
	.has().digits()
	.has().symbols()
	.has().not().spaces();

export default class Username extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error:{},
			isSecure: true,
			isSecureC: true,
		};
	}

	_onBack() {
		const {goBack} = this.props.navigation;

		goBack();
	}
	
	_onChangeText =(type) => (val) => {
		const{register, actions} = this.props;
		const newInput = _.merge({}, register.registerNewInput);
		const error1 = {};

		switch(type){
			case 1:
				if (_.isEmpty(val)) {
					error1.passErr = errorMessage;
				}
				this.setState({password: val});
				newInput.password = val;
				break;
			case 2:
				if (_.isEmpty(val)) {
					error1.cpassErr = errorMessage;
				}

				if (!_.isEqual(val, newInput.password)) {
					error1.passErr = "Password does not match";
				}

				newInput.confirmPassword = val;
				break;
		}
		this.setState({ error: error1 });
		actions.setRegisterInput(newInput);
	}

	_submit = () =>{
		const {register: {registerNewInput}} = this.props;
		const error1 = {};

		if(registerNewInput.password === ""){
			error1.passErr = errorMessage;
		}else if (!schema.validate(registerNewInput.password)) {
			error1.passErr = "Password must have at least 1 uppercase, 1 lowercase, 1 number and 1 special character";
		}else if(registerNewInput.confirmPassword === ""){
			error1.cpassErr = errorMessage;
		}else if(!_.isEqual(registerNewInput.confirmPassword, registerNewInput.password)){
			error1.cpassErr = "Password does not match.";
		}

		this.setState({ error: error1 });

		if (_.isEmpty(error1)) {
			this.props.navigation.navigate("Email");
		}
	}

	render() {
		const {error, isSecure, isSecureC} = this.state;
		const { register: {registerNewInput} } = this.props;

		return (
			<View style={styles.container}>
			<StatusBar barStyle="light-content" backgroundColor={Color.Header} />
				<ScrollView keyboardShouldPersistTaps='handled' style={styles.bodyContainer}>
					<View style={styles.margin30}>
						<Text style={styles.labelText}>Create Password?</Text>
						<Text numberOfLines={5} style={{color: Color.Standard,  marginTop: 5}}>
							Your password must include at least symbol and be 8 or more characters long.
						</Text>
					</View>

					<TxtInput
						onChangeText={this._onChangeText(1)}
						value={registerNewInput.password}
						refname={this.password}
						onFocus={() => this.setState({passFocus: true})}
						onBlur={() => this.setState({passFocus: false})}
						isFocus={this.state.passFocus}
						onRef={(e) => this.loginpass = e }
						returnKeyType='next'
						autoCapitalize="none"
						secureTextEntry={isSecure}
						err={error.passErr}
						label='PASSWORD'
						compName="Password"
						onPass={() => this.setState({isSecure: !isSecure})}
						style={{marginTop: 30}}/>

					<TxtInput
						onChangeText={this._onChangeText(2)}
						value={registerNewInput.confirmPassword}
						onFocus={() => this.setState({rePassFocus: true})}
						onBlur={() => this.setState({rePassFocus: false})}
						isFocus={this.state.rePassFocus}
						refname={this.confirmPassword}
						autoCapitalize="none"
						secureTextEntry={isSecureC}	
						onRef={(e) => this.cpass = e }
						returnKeyType='next'
						err={error.cpassErr}
						label='CONFIRM PASSWORD'
						compName="Password"
						onSubmitEditing={this._submit}
						onPass={() => this.setState({isSecureC: !isSecureC})}
						style={{marginTop: 15}}/>

				</ScrollView>
				<TouchableOpacity style={styles.btnRoundArrow} onPress={this._submit} >
					<Icon reverse name='angle-right' type='font-awesome' color={Color.colorPrimary} size={30} />
				</TouchableOpacity>
			</View>
		);
	}
}
Username.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
};
