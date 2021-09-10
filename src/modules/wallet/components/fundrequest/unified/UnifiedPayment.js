import React, {PureComponent} from "react";
import {View, Text, ScrollView} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import _ from "lodash";
import Detail from "__src/components/Detail";
import Loading from "__src/components/Loading";
import styles from "../../../styles.css";
import numeral from "numeral";
const {Color} = Resource;

export default class UnifiedPayment extends PureComponent {

	renderInfo = () => {
		const {wallet: {isRequestingFund, fundRequestResult:
			{referenceNumber, currency, amount}}} = this.props;
		
		if (isRequestingFund){
  		return <Loading size="small"/>;
		}
		
		return (
			<ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
				<Text style={styles.title}>Please complete your payment within 24 hours</Text>
				<View >
					<Text style={styles.txtInstruction}>
						1. Proceed to any Unified Products and Services branch.
					</Text>
					
					<Text style={styles.txtInstruction}>
						2. Provide payment details:
					</Text>
					<Detail Wrapper2={{marginTop: 2}} horizontal label={"Reference number: "} valueStyle2={styles.valuePayment} value={referenceNumber} />
					<Detail Wrapper2={{marginTop: 2}} horizontal label={"Amount due: "} valueStyle2={styles.valuePayment} value={`${currency} ${numeral(amount).format("0,000.00")}`} />

					<Text style={styles.txtInstruction}>
						3. Complete your payment and you will receive your fund instantly.
					</Text>
				</View>
			</ScrollView>
		);
	}
	render(){
  	const {wallet: { fundRequestResult: {referenceNumber, currency,
  		status, amount, detailed_transactions}}} = this.props;
  	const received = _.isEmpty(detailed_transactions) ? "" : detailed_transactions[0].amount;

  	return (
  		<View style={styles.bankWrapper1}>
  			<View style={styles.bankWrapper2}>
					{this.renderInfo()}
  			</View>

  			<View style={styles.bankWrapper3}>
  				<ScrollView showsVerticalScrollIndicator={false}>
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Status:"} valueStyle2={styles.valueStatus} value={status === "PROCESSING" ? "Verifying your payment" : "Waiting for payment"} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Reference number:"} value={referenceNumber} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"Receiving currency:"} value={currency} />
  					<Detail horizontal labelStyle2={{color: Color.Standard2}} label={"You will receive:"} value={`${currency} ${received}`} />
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

UnifiedPayment.propTypes = {
	actions: PropTypes.object,
	wallet: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
};
