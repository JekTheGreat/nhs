/* eslint-disable react/prop-types */
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
		const { actions, remittance: { inputPayoutDetails },
			login: {additionalDetails} } = this.props;
		this.setState({ seconds: 60 });
		this.countDown();
		const params = {};
		params.company = "UPS";
		params.email = additionalDetails.metadata.email;
		params.provider = inputPayoutDetails.provId;
		params.userId = additionalDetails.id;

		actions.OTPResend(params);
	}

	proceed = () => {
		const { login: {additionalDetails},
			remittance: { inputPayoutDetails, OTPSend }, actions } = this.props;
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
			params.provider = inputPayoutDetails.provId;
			params.userId = additionalDetails.id;
			params.otpNumber = code;
			params.referenceNumber = OTPSend;

			actions.OTPVerify(params);
		}
	}

	getServiceFee = () => {
		const {remittance: {inputPayoutDetails, ServiceFee}} = this.props;

		return ServiceFee[inputPayoutDetails.region];
	}

	onProceed = () => {
		const {actions, login: {currentAccount, additionalDetails}, wallet: {currentWalletId},
			remittance: {getPayoutDetail, inputPayoutDetails}} = this.props;
		const params = {}, params2 = {}, error = {};

		if (_.isEmpty(this.state.pin)){
			error.pin = "This field is required.";
			this.setState({error});
		} else {
			this.setState({error});

			params.pin = this.state.pin;
			params.accountId = currentAccount.id;
			params.company = "UPS";

			params2.accountId = currentAccount.id;
			params2.amount = getPayoutDetail.D.amount;
			params2.baseCurrency = "PHP";
			params2.channel = "Mobile";
			params2.currency = "PHP";
			params2.id1 = inputPayoutDetails.id1;
			params.id2 = inputPayoutDetails.id2;
			params2.pin = this.state.pin;
			params2.provider = inputPayoutDetails.provId;
			params2.referenceNumber = inputPayoutDetails.reference;
			params2.userId = additionalDetails.id;
			params2.walletId = currentWalletId;
		
			actions.PayoutPin(params, params2);
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
		const {remittance: {isTransactionLoad, payoutPinFailed,
			isPayoutPinLoad, TransFailed}} = this.props;
		
		return (<TransPass visible={isTranspassVisible}
			onCancel={this.onClose}
			onRequestClose={this.onClose}
			value={pin}
			isLoad={isTransactionLoad || isPayoutPinLoad ? "Loading" : null}
			error={error.pin || payoutPinFailed || TransFailed}
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
							secureTextEntry
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
