import React, {PureComponent} from "react";
import {View, Text, SafeAreaView} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import _ from "lodash";
import validator from "validator";
import MobileCodeEmail from "./MobileCodeEmail";
import ConfirmEmail from "./ConfirmEmail";
import ConfirmMobileEmail from "./ConfirmMobileEmail";
import CodeEmail from "./CodeEmail";

export default class ResetForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			error: {},
		};
	}
	
	componentDidMount(){
		const { actions } = this.props;

		actions.resetNewEmailData();
		actions.resetPasswordState();
		actions.setEmailScreen("emailForm");
	}

	componentWillReceiveProps(nextProps){
		const error = {};
		const userEmail = this.props.account.changeEmailInput.newEmail;
		const emailInput = this.props.login.getAccountInfos.email;

		if (userEmail !== emailInput){
			if (nextProps.account.isValidatingEmail &&  nextProps.account.isEmailNotAvailable){
				error.newEmail = "Email is already used";

				this.setState({
					error,
				});
			}
		}
	}
	
	_proceedConfirm = () => {
		const { actions, login, account } = this.props;
		const { changeEmailInput, isEmailNotAvailable,
			isValidatingEmail, checkingEmailPassword, incorrectEmailPass } = account;
		const error = {};

		if (_.isEmpty(changeEmailInput.password)){
			error.password = "Password is required";
		}

		if (_.isEmpty(changeEmailInput.newEmail)){
			error.newEmail = "New email is required";
		} else if (!validator.isEmail(changeEmailInput.newEmail)){
			error.newEmail = "Invalid Email";
		} else if (isEmailNotAvailable){
			error.newEmail = "Email is already used";
		}

		if (incorrectEmailPass){
			error.password = "Incorrect Password";
		}

		if (_.isEmpty(error)){
			if (!checkingEmailPassword && !isValidatingEmail){

				actions.checkPassword(changeEmailInput.password,
					login.session.userId, "changeEmail");

			}
		} else {
			this.setState({
				error,
			});
		}
	}

	_onChange = (type) => (value) => {
		const { account, actions } = this.props;
		const {
			isEmailAvailable,
			isEmailNotAvailable,
			incorrectEmailPass,
			correctEmailPass } = account;
		const { error } = this.state;
		const newInput = _.merge({}, account.changeEmailInput);

		switch (type){
		case "newEmail":
			if (isEmailAvailable || isEmailNotAvailable){
				actions.resetNewEmailState();
			}

			if (_.isEmpty(value)) {
				error.newEmail = "New email is required";
			} else {
				delete error.newEmail;
			}

			newInput.newEmail = value;
			break;
		case "password":
			if (incorrectEmailPass || correctEmailPass){
				actions.resetPasswordState();
			}

			if (_.isEmpty(value)) {
				error.password = "Password is required";
			} else {
				delete error.password;
			}

			newInput.password = value;
			break;
		default:
			break;
		}

		actions.setEmailInput(newInput);
	};

	verifyEmail = () => {
		const { actions, account: {changeEmailInput} } = this.props;
		const error = {};
		const userEmail = this.props.account.changeEmailInput.newEmail;
		const emailInput = this.props.login.getAccountInfos.email;
		this.setState({fnewE: false});

		if (_.isEmpty(changeEmailInput.newEmail)){
			error.newEmail = "New email is required";
		} else if (!validator.isEmail(changeEmailInput.newEmail)){
			error.newEmail = "Invalid Email";
		} else if (userEmail === emailInput){
			error.newEmail = "Enter Your New Email";
		}

		if (validator.isEmail(changeEmailInput.newEmail) && _.isEmpty(error)){
			actions.validateNewEmail(changeEmailInput.newEmail);
		}

		this.setState({
			error,
		});
	}

	_renderEmailInputs() {
		const {error, showPass} = this.state;
		const { navigation, login, account } = this.props;
		const { changeEmailInput, checkingEmailPassword, incorrectEmailPass} = account;

		return (
			<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Change Email Address</Text>

					<TxtInput
						value={login.session.user.email}
						label='Currenct Email'
						isText
						style={styles.marginTop30}
						style3={styles.borderWidth0}/>
					
					<TxtInput
						onChangeText={this._onChange("newEmail")}
						value={changeEmailInput.newEmail}
						onFocus={() => this.setState({fnewE: true})}
						onBlur={() => this.verifyEmail()}
						isFocus={this.state.fnewE}
						autoCapitalize="none"
						returnKeyType='next'
						err={error.newEmail}
						label='New Email'
						compName={null}
						style={styles.marginTop30}/>

					<TxtInput
						onChangeText={this._onChange("password")}
						value={changeEmailInput.password}
						onFocus={() => this.setState({fpass: true})}
						onBlur={() => this.setState({fpass: false})}
						isFocus={this.state.fpass}
						autoCapitalize="none"
						returnKeyType='next'
						err={incorrectEmailPass ? "Invalid password" : "" || error.password}
						label='Password'
						style={[styles.marginTop30]}
						compName="Password"
						secureTextEntry={showPass}
						onPass={() => this.setState({showPass: !this.state.showPass})} />
				</View>
				<View style={styles.marginBottom20}>
					<Button
						onPress={this._proceedConfirm}
						style={styles.btnStyle2}
						loading={checkingEmailPassword}
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
		const { account: {emailScreen} } = this.props;

		switch (emailScreen) {
		case "confirmEmail":
			return this._renderConfirmEmail();
		case "confirmMobileEmail":
			return this._renderConfirmMobileEmail();
		case "codeEmail":
			return this._renderCodeEmail();
		case "codeMobileEmail":
			return this._renderCodeMobileEmail();
		case "emailForm":
		default:
			return this._renderEmailInputs();
		}
	}

	_renderConfirmMobileEmail = () => (
		<ConfirmMobileEmail {...this.props} />
	);

	_renderCodeMobileEmail = () => (
		<MobileCodeEmail {...this.props} />
	);


	_renderConfirmEmail = () => (
		<ConfirmEmail {...this.props} />
	);

	_renderCodeEmail = () => (
		<CodeEmail {...this.props} />
	)

	render(){
		return (
			<View style={styles.flex1}>
				{this._renderChildren()}
				<SafeAreaView />
			</View>
		);
	}
}
ResetForm.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
