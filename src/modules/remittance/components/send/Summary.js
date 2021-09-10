/* eslint-disable max-len */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, SafeAreaView, ScrollView, Alert} from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import Detail from "__src/components/Detail";
import OTPForm from "./screens/OTPForm";
import styles from "../../styles.css";
import moment from "moment";
import _ from "lodash";
import numeral from "numeral";
import * as Animatable from 'react-native-animatable';
import Resources from "__src/resources";
const {Color} = Resources;
const AnimatedScrollview = Animatable.createAnimatableComponent(ScrollView);

class SummaryScreen extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			pin: "", isOTPVisible: false,
			error:{}, isTranspassVisible: false
		}
	}

	componentDidMount(){
		this.sendServiceFee();
	}

	componentDidUpdate(prevProps){
		const {remittance: { OTPSend, checkVerificationFailed}} = this.props;

		if (!_.isEqual(prevProps.remittance.OTPSend, OTPSend) &&
				OTPSend){
			this.setState({isOTPVisible: true});
		}

		if (!_.isEqual(prevProps.remittance.checkVerificationFailed, checkVerificationFailed) && !_.isEmpty(checkVerificationFailed)){
			Alert.alert("Notice", checkVerificationFailed);
		}
	}

	sendServiceFee = () => {
		const { actions, remittance: {inputDetails}, 
			login: {currentAccount, session} } = this.props;
		const data = {
			accountId: currentAccount.id,
			baseCurrency: "PHP",
			currency: "PHP",
			other: "x",
			provider: inputDetails.provId,
			amount: inputDetails.amount,
		};

		actions.RemittanceFee(data, session.token);
	}

	getScreen = (num) => {
		const {remittance: { setSelectedScreen, selectProvider } } = this.props;
		const index = _.findIndex(selectProvider, {value: setSelectedScreen});

		return selectProvider[index + num].value;
	}

	_handleCancel = () => {
		const {actions} = this.props;

		actions.setSelectedScreen(this.getScreen(-1));
	}

	checkVerification = () => {
		const {actions, remittance: {inputDetails},
			login: {session, additionalDetails}} = this.props;
		const params = {
			id1: inputDetails.id1.toString(),
			id2: inputDetails.id2.toString(),
			amount: inputDetails.amount,
			company: "UPS",
			email: additionalDetails.metadata.email,
			provider: inputDetails.provId,
			userId: additionalDetails.id,
		}

		actions.checkVerification(params, session.token)
	}

	render(){
		const {remittance: {inputDetails, ServiceFee, isCheckVerification}} = this.props;

		if(this.state.isOTPVisible){
			return <OTPForm {...this.props} 
				goBack={() => this.setState({isOTPVisible: false})}/>
		}

		const fullnameS = `${inputDetails.Sender.firstName} ${inputDetails.Sender.firstName} ${inputDetails.Sender.lastName}`;
		const fullnameB = `${inputDetails.Beneficiary.firstName} ${inputDetails.Beneficiary.middleName} ${inputDetails.Beneficiary.lastName}`;
		const dateS = moment(new Date(inputDetails.Sender.DoB)).format("MMM DD, YYYY");
		const dateB = moment(new Date(inputDetails.Beneficiary.DoB)).format("MMM DD, YYYY");
		const total = _.add(_.toInteger(inputDetails.amount ), ServiceFee.charge);
		const addS = `${inputDetails.Sender.address}, ${inputDetails.Sender.municipality}, ${inputDetails.Sender.province}`
		const addB = `${inputDetails.Beneficiary.address}, ${inputDetails.Beneficiary.municipality}, ${inputDetails.Beneficiary.province}`

		return (
			<View style={styles.flex1marT30padH20}>
				<AnimatedScrollview animation="fadeInRight"
					showsVerticalScrollIndicator={false} style={styles.flex1}>
					<Text style={[styles.txt2, styles.marT5]}>
					Please review all your details below
					</Text>
          
					<Text style={[styles.txt1, styles.marT20, styles.fontSize17]}>SENDER</Text>
					<Detail horizontal label={"Full Name:"} value={fullnameS} />
					<Detail horizontal label={"Date of Birth:"} value={dateS} />
					<Detail horizontal label={"Mobile Number:"} value={`+${inputDetails.Sender.prefix}${inputDetails.Sender.phoneNumber}`} />
					<Detail horizontal label={"Email:"} value={inputDetails.Sender.email} />
					<Detail horizontal label={"Address:"} value={addS} />
					<View  style={styles.viewDivider}/>

					<Text style={[styles.txt1, styles.marT15, styles.fontSize17]}>BENEFICIARY</Text>
					<Detail horizontal label={"Full Name:"} value={fullnameB} />
					<Detail horizontal label={"Date of Birth:"} value={dateB} />
					<Detail horizontal label={"Mobile Number:"} value={`+${inputDetails.Beneficiary.prefix}${inputDetails.Beneficiary.phoneNumber}`} />
					<Detail horizontal label={"Email:"} value={inputDetails.Beneficiary.email} />
					<Detail horizontal label={"Address:"} value={addB} />
					<View  style={styles.viewDivider}/>

					<Text style={[styles.txt1, styles.marT15, styles.fontSize17]}>TRANSACTION</Text>
					<Detail horizontal label={"Partner:"} value={inputDetails.provName} />
					<Detail horizontal label={"Currency:"} value={inputDetails.code} />
					<Detail horizontal label={"Transaction Amount:"} value={`${inputDetails.code} ${numeral(inputDetails.amount).format("0,000.00")}`} />
					<Detail horizontal label={"Transaction Fee:"} value={`${inputDetails.code} ${numeral(ServiceFee.charge).format("0,000.00")}`} />
					<View  style={styles.viewDivider}/>
      
					<Detail horizontal labelStyle2={[styles.amount]}
						label={"Total Send in Amount"}
						value={`${inputDetails.code} ${numeral(total).format("0,000.00")}`}
						valueStyle2={styles.value}  />
					<Detail horizontal labelStyle2={[styles.amount]}
						label={"Net Income"}
						value={`${inputDetails.code} ${numeral(ServiceFee.netSendIncome).format("0,000.00")}`}
						valueStyle2={styles.value}  />
					<Detail horizontal labelStyle2={[styles.amount, styles.marB20]}
						label={"Total Debit Amount"}
						value={`${inputDetails.code} ${numeral(ServiceFee.totalAmount).format("0,000.00")}`}
						valueStyle2={styles.value}  />
				</AnimatedScrollview>

				<View style={styles.summaryBtnWrapper}>
					<Button
						onPress={this.checkVerification}
						loading={isCheckVerification}
						style={styles.btnStyle}
						label="Proceed"/>

					<Button
						onPress={this._handleCancel}
						style={styles.btnCancel}
						label="Back"
						labelStyle={{color: Color.colorPrimaryDark}}/>
					<SafeAreaView />
				</View>
			</View>
		);
	}
}

SummaryScreen.propTypes = {
	actions: PropTypes.object,
	remittance: PropTypes.object,
	login: PropTypes.object,
};

export default SummaryScreen;
