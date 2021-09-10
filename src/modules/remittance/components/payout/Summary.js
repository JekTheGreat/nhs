/* eslint-disable max-len */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, SafeAreaView, ScrollView, Alert} from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import Detail from "__src/components/Detail";
import styles from "../../styles.css";
import moment from "moment";
import cryptojs from "crypto-js";
import _ from "lodash";
import numeral from "numeral";
import TransPass from "__src/components/TransPass";
import Resources from "__src/resources";
import OTPForm from "./screens/OTPForm";

const {Color} = Resources;

class SenderScreen extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			error: {},
			isTranspassVisible: false,
			isOTPVisible: false,
			pin: "",
		};
	}

	componentDidMount(){
		const {actions, login :{session, currentAccount}, remittance: {getPayoutDetail, inputPayoutDetails}} = this.props;
		const params = {};
		params.accountId = currentAccount.id;
		params.amount = getPayoutDetail.D.amount;
		params.baseCurrency = getPayoutDetail.D.baseCurrency;
		params.currency = getPayoutDetail.D.currency;
		params.other = "x";
		params.provider = inputPayoutDetails.provId;
		actions.RemittanceFee(params, session.token);
	}

	componentDidUpdate(prevProps) {
		const {actions, remittance: {payoutPin, checkVerificationFailed, OTPSend}} = this.props;

		if(prevProps.remittance.payoutPin !== payoutPin && payoutPin){
			if(payoutPin.S === 1){
				actions.setPayoutChildScreen("uploadid");
			}
		}

		if (!_.isEqual(prevProps.remittance.checkVerificationFailed, checkVerificationFailed) && !_.isEmpty(checkVerificationFailed)){
			Alert.alert("Notice", checkVerificationFailed);
		}

		if (!_.isEqual(prevProps.remittance.OTPSend, OTPSend) &&
				OTPSend){
			this.setState({isOTPVisible: true});
		}
	}
	
	getScreen = (num) => {
		const {remittance: { setPayoutScreen, selectPayoutProvider } } = this.props;
		const index = _.findIndex(selectPayoutProvider, {value: setPayoutScreen});

		return selectPayoutProvider[index + num].value;
	}

	_handleCancel = () => {
		const {actions} = this.props;

		actions.setPayoutScreen(this.getScreen(-1));
	}

	onClose = () => {
		this.setState({isTranspassVisible: !this.state.isTranspassVisible});
	}

	checkVerification = () => {
		const {actions, remittance: {inputPayoutDetails, getPayoutDetail},
			login: {session, additionalDetails}} = this.props;
		const params = {
			id1: inputPayoutDetails.id1.toString(),
			id2: inputPayoutDetails.id2.toString(),
			amount: getPayoutDetail.D.amount,
			company: "UPS",
			email: additionalDetails.metadata.email,
			provider: inputPayoutDetails.provId,
			userId: additionalDetails.id,
		}

		actions.checkVerification(params, session.token);
	}

	onProceed = () => {
		const {actions, login: {currentAccount, additionalDetails}, wallet: {walletSelected},
			remittance: {getPayoutDetail, inputPayoutDetails}} = this.props;
		const params = {}, params2 = {},error = {};

		if (_.isEmpty(this.state.pin)){
			error.pin = "This field is required.";
			this.setState({error});
		} else {
			this.setState({error});
			const utf8newPass = cryptojs.enc.Utf8.parse(this.state.pin);
			const encryptednewPass = cryptojs.enc.Base64.stringify(utf8newPass);

			params.pin = encryptednewPass;
			params.accountId = currentAccount.id;
			params.company = "UPS";

		
			actions.PayoutPin(params, params2);
		}
	}

	renderTranspass = () => {
		const {isTranspassVisible, pin, error} = this.state;
		const {remittance: {isPayoutPinLoad, payoutPinFailed}} = this.props;
		
		return (<TransPass visible={isTranspassVisible}
			onCancel={this.onClose}
			onRequestClose={this.onClose}
			value={pin}
			isLoad={isPayoutPinLoad ? "Loading" : null}
			error={error.pin || payoutPinFailed}
			onProceed={this.onProceed}
			onChangeText={(e) => this.setState({pin: e})}/>);
	}

	render(){
		const {remittance: {inputPayoutDetails, getPayoutDetail, ServiceFee, isCheckVerification, isOTPSend}} = this.props;

		if(this.state.isOTPVisible){
			return <OTPForm {...this.props} 
				goBack={() => this.setState({isOTPVisible: false})}/>
		}

		const fullnameS = `${getPayoutDetail.D.sender.fullname}`;
		const fullnameB = `${getPayoutDetail.D.beneficiary.fullname}`;
		const dateS = moment(new Date(getPayoutDetail.D.sender.DoB)).format("MMM DD, YYYY");
		const dateB = moment(new Date(getPayoutDetail.D.beneficiary.DoB)).format("MMM DD, YYYY");
		const addS = `${getPayoutDetail.D.beneficiary.address}, ${getPayoutDetail.D.beneficiary.municipality} `;
		const addB = `${getPayoutDetail.D.beneficiary.address}, ${getPayoutDetail.D.beneficiary.municipality} `;
		const totalSendIn = parseFloat(getPayoutDetail.D.amount) + parseFloat(ServiceFee.charge);
		const totalAmount = parseFloat(totalSendIn) + parseFloat(ServiceFee.netPayoutIncome);
		// const fullnameS = "test";
		// const fullnameB =  "test";
		// const dateS =  "test";
		// const dateB =  "test";
		// const total = "123123";

		return (
			<View style={styles.flex1marT30padH20}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
					<Text style={[styles.txt2, styles.marT5]}>
					Please check your details and click “Proceed” button to confirm transaction.
					</Text>
          
					<Text style={[styles.txt1, styles.marT20, styles.fontSize17]}>SENDER</Text>
					<Detail horizontal label={"Full Name:"} value={fullnameS} />
					{/* <Detail horizontal label={"Date of Birth:"} value={dateS} />
					<Detail horizontal label={"Mobile Number:"} value={getPayoutDetail.D.sender.phoneNumber} />
					<Detail horizontal label={"Email:"} value={getPayoutDetail.D.sender.email} /> */}
					<Detail horizontal label={"Address:"} value={addS} />
					<View  style={styles.viewDivider}/>

					<Text style={[styles.txt1, styles.marT15, styles.fontSize17]}>BENEFICIARY</Text>
					<Detail horizontal label={"Full Name:"} value={fullnameB} />
					{/* <Detail horizontal label={"Date of Birth:"} value={dateB} /> */}
					<Detail horizontal label={"Email:"} value={getPayoutDetail.D.beneficiary.email} />
					<Detail horizontal label={"Mobile Number:"} value={`+${getPayoutDetail.D.beneficiary.prefix}${getPayoutDetail.D.beneficiary.phoneNumber}`} />
					<Detail horizontal label={"Address:"} value={addB} />
					<View  style={styles.viewDivider}/>

					<Text style={[styles.txt1, styles.marT15, styles.fontSize17]}>TRANSACTION</Text>
					<Detail horizontal label={"Partner:"} value={inputPayoutDetails.provName} />
					<Detail horizontal label={"Currency:"} value={getPayoutDetail.D.currency} />
					<View  style={styles.viewDivider}/>

					<Detail horizontal labelStyle2={styles.amount} label={"Total Send in Amount:"} value={`${getPayoutDetail.D.currency} ${numeral(totalSendIn).format("0,00.00")}`} 
						valueStyle2={styles.value} />
					<Detail horizontal labelStyle2={styles.amount} label={"Net Income:"} value={`${getPayoutDetail.D.currency} ${numeral(ServiceFee.netPayoutIncome).format("0,00.00")}`} 
						valueStyle2={styles.value}	/>
					<Detail horizontal labelStyle2={styles.amount}
						label={"Total Credit Amount:"}
						value={`PHP ${numeral(totalAmount).format("0,00.00")}`}
						valueStyle2={[styles.value, styles.marB30]}  />

				</ScrollView>

				<View style={styles.summaryBtnWrapper}>
					<Button
						onPress={this.checkVerification}
						style={styles.btnStyle}
						loading={isCheckVerification || isOTPSend}
						label="Proceed"/>

					<Button
						onPress={this._handleCancel}
						style={styles.btnCancel}
						label="Back"
						labelStyle={{color: Color.colorPrimaryDark}}/>
				</View>
				{this.renderTranspass()}
				<SafeAreaView />
			</View>
		);
	}
}

SenderScreen.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	login: PropTypes.object,
};

export default SenderScreen;
