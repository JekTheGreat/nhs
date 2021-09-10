import React, {PureComponent} from "react";
import {View, ScrollView, Alert} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import _ from "lodash";
import Detail from "__src/components/Detail";
import styles from "../../../styles.css";
import StatusView from "./StatusView";
const {Color} = Resource;

export default class BankDepositPayment extends PureComponent {
  _proceedToChooseMethod = () => {
  	Alert.alert("Notice", "Are you sure you want to cancel your request?",
  		[
  			{
  				text: "CANCEL",
  				onPress: () => console.log("Cancel Pressed"),
  				style: "cancel",
  			},
  			{text: "OK", onPress: () => this.cancel()},
  		],
  		{cancelable: false});
  }
	
	cancel = () => {
		const {navigation, actions,
			wallet: { requestScreenHeader, fundRequestResult: {id} } } = this.props;

  	requestScreenHeader.amount = false;
  	requestScreenHeader.payment = false;
		navigation.setParams({ title: "Fund Request" });
  	actions.cancelFundRequest(id);
  	actions.setRequestScreen("chooseMethod");
  	actions.setRequestScreenHeader(requestScreenHeader);
  	actions.resetRequest();
	}

  _proceedToRequestPayment = () => {
  	const { actions } = this.props;

  	actions.setRequestScreen("bankDepositConfirm");
  }
  
  render(){
  	const {wallet: {fundRequestResult: { transactionNumber, amount,
  		currency, detailed_transactions, status}}} = this.props;
  	const amountInput = _.isEmpty(detailed_transactions) ? "" : detailed_transactions[0].amount;
		
  	return (
  		<View style={styles.bankWrapper1}>
  			<View style={styles.bankWrapper2}>
  				<StatusView {...this.props}
  					onCancel={this._proceedToChooseMethod}
  					onPaid={this._proceedToRequestPayment}/>
  			</View>
  			<View style={styles.bankWrapper3}>
  				<ScrollView showsVerticalScrollIndicator={false}>
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Status:"} valueStyle2={styles.valueStatus} value={status === "PROCESSING" ? "Verifying your payment" : "Waiting for payment"} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Reference number:"} value={transactionNumber} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Receiving currency:"} value={currency} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"You will receive:"} value={`${currency} ${amountInput}`} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Service fee:"} value={"PHP 25"} />
  					<View  style={styles.viewDivider}/>
  					<Detail horizontal labelStyle2={styles.amount}
  						label={"Amount Due"}
  						value={`${currency} ${amount}`}
  						valueStyle2={styles.value}  />
  				</ScrollView>
  			</View>
  		</View>
  	);
  }
}

BankDepositPayment.propTypes = {
	actions: PropTypes.object,
	wallet: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
};
