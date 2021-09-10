import React, {PureComponent} from "react";
import {View, Text, Image, Alert} from "react-native";
import TxtInput from "__src/components/TxtInput";
import Button from "__src/components/Button";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import _ from "lodash";
const {Res} = Resource;

export default class CodeForm extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			showPass: true,
			error: {},
			seconds: 60,
		};
		this.countDown();
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
	componentDidUpdate(prevProps){
		const {account: {ChangeTransPinFailed}} = this.props;

		if (!_.isEqual(prevProps.account.ChangeTransPinFailed, ChangeTransPinFailed) &&
		!_.isEmpty(ChangeTransPinFailed)){
			Alert.alert("Update Error", ChangeTransPinFailed);
		}
	}

  _onChange = (value) => {
  	const { account, actions } = this.props;
  	const newInput = _.merge({}, account.changeTransPinInput);
  	delete account.ChangeTransPinFailed;
  	newInput.code = value;
  	actions.setTransactionPinInput(newInput);
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
	
	_handleSendEmailCode = () => {
		const { actions, account } = this.props;
		const { changeTransPindSaveRadio, changeTransPinUserInfo } = account;
		this.setState({ seconds: 60 });
		this.countDown();
		actions.changeTransPinSendCode(changeTransPindSaveRadio, changeTransPinUserInfo.id);
	}
	
	_reset = () => {
		const { actions } = this.props;
		actions.resetChangeTransPin();
		actions.setChangeTransPinScreen("changeTransPinForm");
	}

	_back = () => {
		const { actions } = this.props;

		actions.setChangeTransPinScreen("sendCodeTransPinForm");
	}

	_changePassword = () => {
  	const { actions, account, login } = this.props;
  	const { changeTransPinInput } = account;
  	const { session } = login;
		const error = {};
		if (_.isEqual(changeTransPinInput.code, "")) {
			error.code = "Verification code is required.";
			this.setState({error});
		} else {
			actions.changeTransPin(changeTransPinInput, session.token);
		}
	}
	
	renderDone =() => (
		<View style={styles.flex1marT30padH30}>
  		<View style={styles.flex1}>
				<Text style={styles.subsuccess}>Change Transaction Pin</Text>
				<Text style={styles.success}>Successfully!</Text>
  			<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
  		</View>
			<View style={styles.marginBottom30}>
				<Button
					onPress={this._reset}
					style={styles.btnStyle3}
					labelStyle={styles.fontRenderDone}
					label="Ok"/>
			</View>
  	</View>
	);

	render() {
  	const {error, seconds} = this.state;
  	const { account } = this.props;
  	const { isSuccessChangeTransPin,
  		changeTransPindSaveRadio, changeTransPinInput, sendingPhoneCode,
  		changingTransPass} = account;

		if (isSuccessChangeTransPin){
			return this.renderDone();
		}
		console.log("err; ", error);
		
		return (
  		<View style={styles.flex1marT30padH30}>
				<View style={styles.flex1}>
					<Text style={styles.title}>Confirmation Code</Text>
  				<Text style={styles.subtitle}>{`Code was sent to your registered ${changeTransPindSaveRadio.type}`}.</Text>
  				<TxtInput
  					onChangeText={this._onChange}
  					value={changeTransPinInput.code}
  					onFocus={() => this.setState({fnewE: true})}
  					onBlur={() => this.setState({fnewE: false})}
  					isFocus={this.state.fnewE}
  					autoCapitalize="none"
  					placeholder="Enter the 4-digit Number"
  					returnKeyType='next'
  					err={error.code ? error.code : ""}
  					label='Enter your code'
  					style={styles.marginTop30}/>
  			</View>
  			<View style={styles.marginBottom30}>
					{seconds > 0 ?
						<Text style={styles.txtGetHelpContainer2}>
					You may resend code in {
								(seconds > 1) ?
									`${seconds} seconds` : `${seconds} second`}
						</Text> :
  					<Text style={[styles.txtGetHelpContainer, {}]}>
								Didn't get the code?
  					<Text  suppressHighlighting
  						onPress={this._handleSendEmailCode}
  						style={styles.txtHelp}> Resend Code.</Text>
  				</Text>
					}
  				<Button
  					onPress={this._changePassword}
  					style={styles.btnStyle2}
  					loading={sendingPhoneCode || changingTransPass}
  					label="Submit"/>
  				<Button
  					onPress={this._back}
  					style={styles.btnStyle3}
  					labelStyle={styles.btnLabelStyle}
  					label="Back"/>
  			</View>
  		</View>
  	);
	}
}
CodeForm.propTypes = {
	actions: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
	account: PropTypes.object,
	login: PropTypes.object,
};
