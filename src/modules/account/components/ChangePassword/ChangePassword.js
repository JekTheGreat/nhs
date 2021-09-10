// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, SafeAreaView, Alert} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import _ from "lodash";
import CodeForm from "./CodeForm";
import SendCodeForm from "./SendCodeForm";
import passwordValidator from "password-validator";

const schema = new passwordValidator();
schema
	.has().uppercase()
	.has().lowercase()
	.has().digits()
	.has().symbols()
	.has().not().spaces();
	
export default class ChangePassword extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			error: {},
		};
	}

	componentDidUpdate(prevProps){
		const {actions, account: {ChangePassFailed, changePasswordScreen}} = this.props;

		if (!_.isEqual(prevProps.account.ChangePassFailed, ChangePassFailed) &&
		!_.isEmpty(ChangePassFailed) && !_.isEqual(ChangePassFailed, "Verification code does not exist")){
			Alert.alert("Update Error", ChangePassFailed);
		}
		if (_.isEqual(ChangePassFailed, "Verification code does not exist") && _.isEqual(changePasswordScreen, "changePasswordForm")){
			actions.setChangePasswordScreen("sendCodeForm");
		}
	}

	componentDidMount(){
		const {actions} = this.props;
		actions.resetChangePass();
		actions.setChangePasswordScreen("changePasswordForm");
	}

	_onChange = (type) => (value) => {
		const { account, actions } = this.props;
		const { error } = this.state;
		const newInput = _.merge({}, account.changePasswordInput);
		switch (type){
		case "oldPassword":
			if (_.isEmpty(value)) {
				error.oldPassword = "Current password is required";
			} else {
				delete error.oldPassword;
			}
			newInput.oldPassword = value;
			break;
		case "newPassword":
			if (_.isEmpty(value)) {
				error.newPassword = "New password is required";
			} else {
				delete error.newPassword;
			}

			newInput.newPassword = value;
			break;
		case "confirmNewPassword":
			if (_.isEmpty(value)) {
				error.confirmNewPassword = "Confirm password is required";
			} else {
				delete error.confirmNewPassword;
			}

			if (_.isEqual(value, newInput.newPassword)) {
				delete error.newPassword;
			} else {
				error.newPassword = "Password does not match";
			}

			newInput.confirmNewPassword = value;
			break;
		default:
			break;
		}

		this.setState({
			error,
		});

		actions.setPasswordInput(newInput);
	};

	_saveChanges = () => {
		const { actions, account, login } = this.props;
		const { changePasswordInput } = account;
		const error = {};

		if (_.isEmpty(changePasswordInput.oldPassword)){
			error.oldPassword = "Current password is required";
		} else if (_.isEmpty(changePasswordInput.newPassword)){
			error.newPassword = "New password is required";
		} else if (_.isEmpty(changePasswordInput.confirmNewPassword)){
			error.confirmNewPassword = "Confirm password is required";
		} else if (!_.isEqual(changePasswordInput.newPassword,
			changePasswordInput.confirmNewPassword)) {
			error.newPassword = "Password does not match";
		} else if (!schema.validate(changePasswordInput.newPassword)) {
			error.newPassword =
			"Password must have at least 1 uppercase, 1 lowercase, 1 number and 1 special char";
			error.confirmNewPassword = " ";
		}

		this.setState({ error});

		if (_.isEmpty(error)){
			const params = {};
			params.oldPassword = changePasswordInput.oldPassword;
			params.newPassword = changePasswordInput.newPassword;
			params.confirmNewPassword = changePasswordInput.confirmNewPassword;
			params.code = "123123";
			actions.changePassword(params, login.session.token);
			// actions.getUserEmailAndMobile(changePasswordInput, login.session.userId);
		}
	}

	_renderChangePassForm() {
		const {error, showPass} = this.state;
		const { navigation, account } = this.props;
		const { changePasswordInput, incorrectChangePassPassword,
			gettingUserEmailAndMobile} = account;
		const oldError = "Incorrect Password";

		return (
			<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Change Password</Text>
					<Text style={styles.subtitle}>
					It's good idea to user a strong password that you're not using elsewhere.
					</Text>

					<TxtInput
						onChangeText={this._onChange("oldPassword")}
						value={changePasswordInput.oldPassword}
						onFocus={() => this.setState({fold: true})}
						onBlur={() => this.setState({fold: false})}
						isFocus={this.state.fold}
						autoCapitalize="none"
						returnKeyType='next'
						err={incorrectChangePassPassword ? oldError : "" || error.oldPassword}
						label='Enter Currenct Password'
						style={styles.marginTo20} />

					<TxtInput
						onChangeText={this._onChange("newPassword")}
						value={changePasswordInput.newPassword}
						onFocus={() => this.setState({fnew: true})}
						onBlur={() => this.setState({fnew: false})}
						isFocus={this.state.fnew}
						autoCapitalize="none"
						returnKeyType='next'
						err={error.newPassword}
						label='Enter New Password'
						style={styles.marginTo20}
						compName="Password"
						secureTextEntry={showPass}
						onPass={() => this.setState({showPass: !this.state.showPass})} />

					<TxtInput
						onChangeText={this._onChange("confirmNewPassword")}
						value={changePasswordInput.confirmNewPassword}
						onFocus={() => this.setState({frenew: true})}
						onBlur={() => this.setState({frenew: false})}
						isFocus={this.state.frenew}
						autoCapitalize="none"
						returnKeyType='next'
						err={error.confirmNewPassword}
						label='Re-type New Password'
						style={styles.marginTo20}
						secureTextEntry={showPass} />
				</View>

				<View style={styles.marginBottom10}>
					<Button
						onPress={this._saveChanges}
						style={styles.btnStyle2}
						loading={gettingUserEmailAndMobile}
						label="Save"/>
					<Button
						onPress={() => navigation.goBack()}
						style={styles.btnStyle3}
						labelStyle={styles.btnLabelStyle}
						label="Cancel"/>
  			</View>
			</View>
		);
	}

	_renderChildren = () => {
		const { account } = this.props;
		const { changePasswordScreen } = account;

		switch (changePasswordScreen) {
		case "sendCodeForm":
			return <SendCodeForm {...this.props} />;
		case "codeForm":
			return <CodeForm {...this.props} />;
		case "changePasswordForm":
		default:
			return this._renderChangePassForm();
		}
	}

	render(){
		return (
			<View style={styles.flex1}>
				{this._renderChildren()}
				<SafeAreaView />
			</View>
		);
	}
}
ChangePassword.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
