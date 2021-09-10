/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity,StatusBar, ScrollView} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Loading from "__src/components/Loading";
import Color from "__src/resources/styles/color";
import PropTypes from "prop-types";
import styles from "../styles.css";
import _ from "lodash";
import passwordValidator from "password-validator";

const schema = new passwordValidator();

schema
	.has().uppercase()
	.has().lowercase()
	.has().digits()
	.has().symbols()
	.has().not().spaces();
const errorMessage = "This field is required."

export default class ResetForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			error:{},
		};
	}
    
	_proceedResetSuccess = () => {
		const { actions, forgot } = this.props;
		const { passwordInputs, userInfo, getSaveCode } = forgot;
		const error = {};

		if (_.isEmpty(passwordInputs.retypePassword)){
			error.retypePassword = "Retype password is required";
		}

		if (_.isEmpty(passwordInputs.password)) {
			error.password = "Password is required";
		} else if (!schema.validate(passwordInputs.password)) {
			error.password =
			"Password must have at least 1 uppercase, 1 lowercase, 1 number and 1 special character";
		} else if (!_.isEmpty(passwordInputs.password) &&
			!_.isEqual(passwordInputs.password, passwordInputs.retypePassword)) {
			error.password = "Password does not match";
			error.retypePassword = "";
		}

		if (_.isEmpty(error)) {
			actions.setUserPassword(userInfo.id, passwordInputs, getSaveCode);
		} else {
			this.setState({error});
		}
	}

	_handleChangeInput = (type) => (value) => {
		const { actions, forgot } = this.props;
		const { error } = this.state;
		const newInput = _.merge({}, forgot.passwordInputs);

		switch (type) {
		case 1:
			if (_.isEmpty(value)) {
				error.password = "Password is required";
			} else {
				delete error.password;
			}

			newInput.password = value;
			break;
		case 2:
			if (_.isEmpty(value)) {
				error.retypePassword = "Re-type Password is required";
			} else {
				delete error.retypePassword;
			}

			if (_.isEqual(value, newInput.password)) {
				delete error.password;
			} else {
				error.password = "Password does not match";
			}

			newInput.retypePassword = value;
			break;
		default:
			break;
		}

		actions.setPasswordInputs(newInput);
	}

	render() {
		const {error} = this.state;
		const { forgot: {resetInProgress, passwordInputs} } = this.props;

		return (
			<View style={{flex: 1, paddingHorizontal: 30}}>
					<View style={{flex: 1, marginTop: 30}}>
						<Text style={{fontSize: 25, fontFamily: "roboto", color: Color.Standard2}}>Create new password</Text>
						<Text numberOfLines={5} style={{color: Color.Standard2,  marginTop: 5}}>
							In the fields below, enter your new password.
						</Text>
					
					<TxtInput
						onChangeText={this._handleChangeInput(1)}
						value={passwordInputs.password}
						onFocus={() => this.setState({unFocus: true})}
						isFocus={this.state.unFocus}
						autoCapitalize="none"
						returnKeyType='next'
						err={error.password}
						label='NEW PASSWORD'
						style={{marginTop: 30}}
						onSubmitEditing={this._submit} />

					<TxtInput
						onChangeText={this._handleChangeInput(2)}
						value={passwordInputs.retypePassword}
						onFocus={() => this.setState({unFocus: true})}
						isFocus={this.state.unFocus}
						autoCapitalize="none"
						returnKeyType='next'
						err={error.retypePassword}
						label='RE-TYPE NEW PASSWORD'
						style={{marginTop: 30}}
						onSubmitEditing={this._submit} />
					</View>
				{resetInProgress ?
					<View style={{height: 45, marginBottom: 30, alignItems: "center",
						backgroundColor: Color.colorPrimary, borderRadius: 5, borderBottomWidth: 6, borderBottomColor: Color.colorPrimaryDark, justifyContent: "center" }}>
						<Loading size="small" color={Color.white} />
					</View> :
					<TouchableOpacity style={{height: 45, marginBottom: 30, alignItems: "center",
						backgroundColor: Color.colorPrimary, borderRadius: 5, borderBottomWidth: 6, borderBottomColor: Color.colorPrimaryDark, justifyContent: "center" }}
					onPress={this._proceedResetSuccess}>
						<Text style={{color: "white", fontSize: 16, fontFamily: "Roboto", fontWeight: "600"}}>Submit</Text>
					</TouchableOpacity>}
			</View>
		);
	}
}
ResetForm.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
};
