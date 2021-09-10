import Resource from "__proj/src/resources";
import TxtInput from "__src/components/TxtInput";
import React, { PureComponent } from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";
import styles from "../../../styles.css";
import Button from "__src/components/Button";
import KeyboardDismiss from "__src/components/KeyboardDismiss";
import TransPass from "__src/components/TransPass";
import _ from "lodash";
import cryptojs from "crypto-js";
const {Color} = Resource;

class OTPForm extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			error: {},
			seconds: 60,
			isTranspassVisible: false,
			code: "",
			pin: "",
		};

		this.countDown();
	}

	componentDidUpdate(prevProps){
		const {remittance: {OTPVerify, TransactionSuccess, TransFailed}} = this.props;

		if (!_.isEqual(prevProps.remittance.OTPVerify, OTPVerify) && !_.isEmpty(OTPVerify)){
			this.setState({isTranspassVisible: true});
		}

		if (!_.isEqual(prevProps.remittance.TransactionSuccess, TransactionSuccess) &&
			!_.isEmpty(TransactionSuccess)){
			this.setState({isTranspassVisible: false});
		}

		if (!_.isEqual(prevProps.remittance.TransFailed, TransFailed) && !_.isEmpty(TransFailed)){
			const error = {};
			error.pin = TransFailed;

			this.setState({error});
		}
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	back = () => {
		const { actions } = this.props;

		actions.setSelectedScreen("summary");
	}

	onResend = () => {
		const { actions, remittance: { inputDetails },
			login: {additionalDetails} } = this.props;
		this.setState({ seconds: 60 });
		this.countDown();
		const params = {};
		params.company = "UPS";
		params.email = additionalDetails.metadata.email;
		params.provider = inputDetails.provId;
		params.userId = additionalDetails.id;

		actions.OTPResend(params);
	}

	proceed = () => {
		const { login: {additionalDetails},
			remittance: { inputDetails, OTPSend }, actions } = this.props;
		const { code } = this.state;
		const error = {};

		if (_.isEmpty(code)){
			error.verification = "Verification Code is required";
		}

		this.setState({error});

		if (_.isEmpty(error)){
			const params = {};
			params.company = "UPS";
			params.email = additionalDetails.metadata.email;
			params.provider = inputDetails.provId;
			params.userId = additionalDetails.id;
			params.otpNumber = code;
			params.referenceNumber = OTPSend;

			actions.OTPVerify(params);
		}
	}

	getServiceFee = () => {
		const {remittance: {inputDetails, ServiceFee}} = this.props;

		return ServiceFee[inputDetails.region];
	}

	onProceed = () => {
		const {actions, remittance: {inputDetails, ServiceFee}, wallet: {currentWalletId},
			login: {currentAccount, additionalDetails, session}} = this.props;
		const params = {}, error = {};

		if (_.isEmpty(this.state.pin)){
			error.pin = "This field is required.";
			this.setState({error});
		} else {
			this.setState({error});

			params.accountId = currentAccount.id;
			params.amount = inputDetails.amount;
			params.baseCurrency = "PHP";
			params.beneficiary = inputDetails.Beneficiary;
			params.channel = "Mobile";
			params.currency = "PHP";
			params.id1 = inputDetails.id1;
			params.pin = this.state.pin;
			params.provider = inputDetails.provId;
			params.sender = inputDetails.Sender;
			params.serviceFee = ServiceFee.charge;
			params.userId = additionalDetails.id;
			params.walletId = currentWalletId;
			params.api = inputDetails.api;

			actions.RemittanceTransactSend(params, session.token);
		}
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

	onClose = () => {
		this.setState({isTranspassVisible: !this.state.isTranspassVisible});
	}

	renderTranspass = () => {
		const {isTranspassVisible, pin, error} = this.state;
		const {remittance: {isTransactionLoad}} = this.props;
		
		return (<TransPass visible={isTranspassVisible}
			onCancel={this.onClose}
			onRequestClose={this.onClose}
			value={pin}
			isLoad={isTransactionLoad ? "Loading" : null}
			error={error.pin}
			onProceed={this.onProceed}
			onChangeText={(e) => this.setState({pin: e})}/>);
	}

	render() {
		const {remittance, goBack} = this.props;
		const {error, seconds} = this.state;
		const { isOTPSend, isOTPVerify, OTPFailed, OTPVerifyFailed, OTPSend } = remittance;

		return (
			<KeyboardDismiss>
				<View style={styles.viewContainer}>
					<View style={[styles.viewflex2, styles.marT30]}>
						<Text style={styles.txtOtp}>Enter One Time Password</Text>
						<Text style={[styles.txtOtpnote, styles.marT10]}>
							Reference Number: <Text style={styles.bold}>{OTPSend}</Text></Text>
						<Text style={[styles.txtOtpnote]}>
							Check your registered email for the verification code.</Text>
						<TxtInput
							onFocus={() => this.setState({otpFocus: true})}
							onBlur={() => this.setState({otpFocus: false})}
							round
							isFocus={this.state.otpFocus}
							style={styles.marT20}
							onChangeText={(code) => this.setState({code})}
							value={this.state.code}
							returnKeyType='next'
							err={OTPFailed || OTPVerifyFailed || error.verification} />

						{seconds > 0 ?
							<Text style={styles.txtGetHelpContainer2}>
								You may resend code in {
									(seconds > 1) ?
										`${seconds} seconds` :
										`${seconds} second`
								}
							</Text> :
							<Text style={styles.txtGetHelpContainer2}>
						Didn't get the code?
								<Text  suppressHighlighting
									onPress={this.onResend}
									style={styles.txtHelp}> Resend Verification Code.</Text>
							</Text>
						}
					
						<View style={styles.otpBottom}>
							<Button onPress={goBack}
								style={styles.btnback}
								labelStyle={{color: Color.colorPrimary}} label="Cancel"/>
							<Button onPress={this.proceed}
								loading={isOTPSend || isOTPVerify}
								style={styles.width120} label="Proceed"/>
						</View>
					</View>
					{this.renderTranspass()}
				</View>
			</KeyboardDismiss>
		);
	}
}

OTPForm.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
};

export default OTPForm;
