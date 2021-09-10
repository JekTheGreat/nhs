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

	componentDidMount(){
		const { actions, remittance: {getPayoutDetail}} = this.props;

		actions.convertAmountInput(getPayoutDetail.D.amount);
		this._SelectedValueFrom();
		this._SelectedValueToRecieve();
	}

	componentDidUpdate() {
		const { actions, wallet } = this.props;
		const { selectConvertValueFrom, selectConvertToRecieve, convertAmountInput,
			convertedValuetoRecieved } = wallet;
		const codeReceive = selectConvertToRecieve.currency ? selectConvertToRecieve.currency.code : "";
		const codeFrom = selectConvertValueFrom.currency ? selectConvertValueFrom.currency.code : "";

		if (!_.isEmpty(selectConvertValueFrom) && !_.isEmpty(selectConvertToRecieve) &&
			(this.state.ratefrom || this.state.rateto)){
			actions.currencyRate(codeFrom, codeReceive);
			this.setState({rateto: false, ratefrom: false});
		}
		if (_.isNaN(convertAmountInput) || _.isEqual(convertAmountInput, 0)) {
			if (convertedValuetoRecieved !== 0) {
				actions.resetAmountInput();
			}
		}
		if (!_.isEqual(convertAmountInput, 0) && !_.isNaN(convertAmountInput) &&
			!_.isEmpty(selectConvertValueFrom) && !_.isEmpty(selectConvertToRecieve)){
			actions.convertedValuetoRecieved(codeFrom,
				codeReceive, convertAmountInput);
		}
	}

	_SelectedValueFrom = () => {
		const { actions} = this.props;
		const currency = {name: "Philippine Peso", code: "PHP", symbol: "₱", symbolNative: "₱"};

		this.setState({ratefrom: true });
		actions.selectedConvertValueFrom({currency});
	}

	_SelectedValueToRecieve = () => {
		const { actions, wallet: { addedWallet, walletSelected } } = this.props;
		const currency = _.isEmpty(walletSelected) ? "PHP" : walletSelected.currency.code;
		const selectedWallet = _.filter(addedWallet, (data) => {
			return data.currency.code === currency;
		});

		this.setState({rateto: true});
		actions.selectedConvertToRecieved(selectedWallet[0]);
	}

	_handleCancel = () => {
		const {actions, remittance: {getPayoutDetail}} = this.props;
		const screen = getPayoutDetail.D.amount >= 5000 ? "secondaryid" : "payoutid";

		actions.setPayoutChildScreen(screen);
	}

	onClose = () => {
		this.setState({isTranspassVisible: !this.state.isTranspassVisible});
	}

	onProceed = () => {
		const {actions, login: {currentAccount, additionalDetails}, remittance: {getPayoutDetail, inputPayoutDetails}, 
			wallet: {walletSelected}} = this.props;
		const params = {}, params2 = {}, error = {};

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

			params2.accountId = currentAccount.id;
			params2.amount = getPayoutDetail.D.amount;
			params2.baseCurrency = "PHP";
			params2.company = "UPS";
			params2.currency = walletSelected.currency.code;
			params2.id1 = inputPayoutDetails.id1;
			params2.id2 = inputPayoutDetails.id2 || "";
			params2.providerId = inputPayoutDetails.provId;
			params2.referenceNumber = inputPayoutDetails.reference;
			params2.userId = additionalDetails.id
			params2.walletId = walletSelected.id;
		
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
		const {remittance: {inputPayoutDetails, getPayoutDetail, isTransactionLoad}, 
			wallet: {walletSelected, convertedValuetoRecieved}} = this.props;
		const fullnameS = `${getPayoutDetail.D.sender.fullname}`;
		const fullnameB = `${getPayoutDetail.D.beneficiary.fullname}`;
		const dateS = moment(new Date(getPayoutDetail.D.sender.DoB)).format("MMM DD, YYYY");
		const dateB = moment(new Date(getPayoutDetail.D.beneficiary.DoB)).format("MMM DD, YYYY");
		const total = getPayoutDetail.D.amount;
		const addS = `${getPayoutDetail.D.beneficiary.address}, ${getPayoutDetail.D.beneficiary.municipality}, ${getPayoutDetail.D.beneficiary.country}`
		const addB = `${getPayoutDetail.D.beneficiary.address}, ${getPayoutDetail.D.beneficiary.municipality}, ${getPayoutDetail.D.beneficiary.country}`

		// const fullnameS = "test";
		// const fullnameB =  "test";
		// const dateS =  "test";
		// const dateB =  "test";
		// const total = "123123";

		return (
			<View style={styles.flex1marT30padH20}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.flex1}>
					<Text style={[styles.txt2, styles.marT5]}>
					Please review all your sending details below
					</Text>
          
					<Text style={[styles.txt1, styles.marT20, styles.fontSize17]}>SENDER</Text>
					<Detail horizontal label={"Full Name:"} value={fullnameS} />
					<Detail horizontal label={"Date of Birth:"} value={dateS} />
					<Detail horizontal label={"Mobile Number:"} value={getPayoutDetail.D.sender.phoneNumber} />
					<Detail horizontal label={"Email:"} value={getPayoutDetail.D.sender.email} />
					<Detail horizontal label={"Address:"} value={addS} />
					<View  style={styles.viewDivider}/>

					<Text style={[styles.txt1, styles.marT15, styles.fontSize17]}>BENEFICIARY</Text>
					<Detail horizontal label={"Full Name:"} value={fullnameB} />
					<Detail horizontal label={"Date of Birth:"} value={dateB} />
					<Detail horizontal label={"Mobile Number:"} value={getPayoutDetail.D.beneficiary.phoneNumber} />
					<Detail horizontal label={"Email:"} value={getPayoutDetail.D.beneficiary.email} />
					<Detail horizontal label={"Address:"} value={addB} />
					<View  style={styles.viewDivider}/>

					<Detail horizontal label={"Transaction:"} value={inputPayoutDetails.provName} />
					<Detail horizontal label={"Amount:"} value={`PHP ${numeral(getPayoutDetail.D.amount).format("0,000.00")}`} />
					<Detail horizontal label={"Converted Amount:"} value={`${walletSelected.currency.code} ${numeral(convertedValuetoRecieved).format("0,000.000000")}`} />
					<View  style={styles.viewDivider}/>
      
					<Detail horizontal labelStyle2={styles.amount}
						label={"Total Amount"}
						value={`PHP ${numeral(total).format("0,000.00")}`}
						valueStyle2={[styles.value, styles.marB30]}  />

				</ScrollView>

				<View style={styles.summaryBtnWrapper}>
					<Button
						onPress={this.onClose}
						style={styles.btnStyle}
						loading={isTransactionLoad}
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
