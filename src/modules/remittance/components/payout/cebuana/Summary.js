/* eslint-disable max-len */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, SafeAreaView, ScrollView} from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import Detail from "__src/components/Detail";
import styles from "../../../styles.css";
import moment from "moment";
import cryptojs from "crypto-js";
import _ from "lodash";
import numeral from "numeral";
import * as Animatable from "react-native-animatable";
const AnimatedScrollview = Animatable.createAnimatableComponent(ScrollView);
import TransPass from "__src/components/TransPass";
import Resources from "__src/resources";
const {Color} = Resources;

class SenderScreen extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			error: {},
			isTranspassVisible: false,
			pin: "",
		};
	}

	componentDidUpdate(prevProps) {
		const {actions, remittance: {payoutPin}} = this.props;

		if(prevProps.remittance.payoutPin !== payoutPin && payoutPin){
			if(payoutPin.S === 1){
				// actions.setPayoutChildScreen("uploadid");
			}
		}
	}

	_handleCancel = () => {
		const {actions} = this.props;

		actions.setPayoutScreen("payoutid");
	}

	onClose = () => {
		this.setState({isTranspassVisible: !this.state.isTranspassVisible});
	}

	onProceed = () => {
		const {actions, login: {currentAccount}} = this.props;
		const params = {}, error = {};

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

			actions.PayoutPin(params);
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
		const {remittance: {inputPayoutDetails, getPayoutDetail}} = this.props;
		const fullnameS = `${getPayoutDetail.D.sender.BeneficiaryFirstName} ${getPayoutDetail.D.beneficiary.SenderMiddleName} ${getPayoutDetail.D.beneficiary.SenderLastName}`;
		const fullnameB = `${getPayoutDetail.D.beneficiary.BeneficiaryFirstName} ${getPayoutDetail.D.beneficiary.BeneficiaryMiddleName} ${getPayoutDetail.D.beneficiary.BeneficiaryLastName}`;
		const dateS = moment(new Date(getPayoutDetail.D.sender.SenderBirthDate)).format("MMM DD, YYYY");
		const dateB = moment(new Date(getPayoutDetail.D.beneficiary.BeneficiaryBirthDate)).format("MMM DD, YYYY");
		const total = getPayoutDetail.D.rates.PrincipalAmount;

		return (
			<View style={styles.flex1marT30padH20}>
				<AnimatedScrollview animation="fadeInRight"
					showsVerticalScrollIndicator={false} style={styles.flex1}>
					<Text style={[styles.txt2, styles.marT5]}>
						Please review all your sending details below
					</Text>
          
					<Text style={[styles.txt1, styles.marT20, styles.fontSize17]}>SENDER</Text>
					<Detail horizontal label={"Full Name:"} value={fullnameS} />
					<Detail horizontal label={"Date of Birth:"} value={dateS} />
					<View  style={styles.viewDivider}/>

					<Text style={[styles.txt1, styles.marT15, styles.fontSize17]}>BENEFICIARY</Text>
					<Detail horizontal label={"Full Name:"} value={fullnameB} />
					<Detail horizontal label={"Date of Birth:"} value={dateB} />
					<View  style={styles.viewDivider}/>

					<Detail horizontal label={"Transaction:"} value={inputPayoutDetails.provName} />
					<Detail horizontal label={"Amount:"} value={`PHP ${numeral(total).format("0,000.00")}`} />
					<View  style={styles.viewDivider}/>
      
					<Detail horizontal labelStyle2={styles.amount}
						label={"Transferred Amount"}
						value={`PHP ${numeral(total).format("0,000.00")}`}
						valueStyle2={[styles.value, styles.marB30]}  />

				</AnimatedScrollview>

				<View style={styles.summaryBtnWrapper}>
					<Button
						onPress={this.onClose}
						style={styles.btnStyle}
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
