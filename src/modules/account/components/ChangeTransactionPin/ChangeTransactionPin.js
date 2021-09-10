// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, SafeAreaView} from "react-native";
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
	.has().digits()
	.has().min(6)
	.has().max(6);
export default class ChangeTransactionPin extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			error: {},
		};
	}

	componentWillMount(){
		const {actions} = this.props;
		actions.resetChangePass();
		actions.setChangeTransPinScreen("changeTransPinForm");
	}

	_onChange = (type) => (value) => {
		const { account, actions } = this.props;
		const { error } = this.state;
		const newInput = _.merge({}, account.changeTransPinInput);

		switch (type){
		case "confirmPin":
			if (_.isEmpty(value)) {
				error.confirmPin = "Current password is required";
			} else {
				delete error.confirmPin;
			}
			newInput.confirmPin = value;
			break;
		case "pin":
			if (_.isEmpty(value)) {
				error.pin = "New password is required";
			} else {
				delete error.pin;
			}
			newInput.pin = value;
			break;
		default:
			break;
		}

		this.setState({
			error,
		});

		actions.setTransactionPinInput(newInput);
	};

	_saveChanges = () => {
		const { actions, account } = this.props;
		const { changeTransPinInput } = account;
		const error = {};

		if (_.isEmpty(changeTransPinInput.confirmPin)){
			error.confirmPin = "Current Transaction Pin is required";
		} else if (!schema.validate(changeTransPinInput.confirmPin)) {
			error.confirmPin = "Transaction Pin should only contain 6 numbers";
		}

		if (_.isEmpty(changeTransPinInput.pin)){
			error.pin = "New Transaction Pin is required";
		} else if (!schema.validate(changeTransPinInput.pin)) {
			error.pin = "Transaction Pin should only contain 6 numbers";
		} else if (!_.isEqual(changeTransPinInput.confirmPin,
			changeTransPinInput.pin)) {
			error.pin = "Transaction Pin does not match";
		}

		if (_.isEmpty(error)){
			// actions.getUserEmailAndMobile("", changeTransPinInput);
			actions.setChangeTransPinScreen("sendCodeTransPinForm");
		} else {
			this.setState({
				error,
			});
		}
	}

	_renderChangeTransPinForm() {
		const {error, showPass} = this.state;
		const { navigation, account } = this.props;
		const { changeTransPinInput, incorrectChangeTransPin,
			gettingUserEmailAndMobile} = account;
		const oldError = "Incorrect Transaction Pin";
		
		return (
			<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Change Transaction Pin</Text>
					<Text style={styles.subtitle}>
					It's good idea to user a strong password that you're not using elsewhere.
					</Text>
					<TxtInput
						onChangeText={this._onChange("confirmPin")}
						value={changeTransPinInput.confirmPin}
						onFocus={() => this.setState({fold: true})}
						onBlur={() => this.setState({fold: false})}
						isFocus={this.state.fold}
						autoCapitalize="none"
						returnKeyType='next'
						err={incorrectChangeTransPin ? oldError : "" || error.confirmPin}
						label='Enter Currenct Transaction Pin'
						style={styles.marginTo20} />
					<TxtInput
						onChangeText={this._onChange("pin")}
						value={changeTransPinInput.pin}
						onFocus={() => this.setState({fnew: true})}
						onBlur={() => this.setState({fnew: false})}
						isFocus={this.state.fnew}
						autoCapitalize="none"
						returnKeyType='next'
						err={error.pin}
						label='Enter New Transaction Pin'
						style={styles.marginTo20}
						compName="Password"
						secureTextEntry={showPass}
						onPass={() => this.setState({showPass: !this.state.showPass})} />
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
		const { changeTransPinScreen } = account;

		switch (changeTransPinScreen) {
		case "sendCodeTransPinForm":
			return this._renderSendCodeForm();
		case "codeTransPinForm":
			return this._renderCodeForm();
		case "changeTransPinForm":
		default:
			return this._renderChangeTransPinForm();
		}
	}

	_renderSendCodeForm = () => (
		<SendCodeForm {...this.props} />
	);

	_renderCodeForm = () => (
		<CodeForm {...this.props} />
	);

	render(){
		return (
			<View style={styles.flex1}>
				{this._renderChildren()}
				<SafeAreaView />
			</View>
		);
	}
}
ChangeTransactionPin.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
