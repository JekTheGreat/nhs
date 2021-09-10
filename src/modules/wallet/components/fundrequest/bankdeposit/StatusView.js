import React from "react";
import { ScrollView, View, Text } from "react-native";
import Detail from "__src/components/Detail";
import Button from "__src/components/Button";
import styles from "../../../styles.css";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
import Resource from "__src/resources";
const {Color} = Resource;

class StatusView extends React.PureComponent{

  getBankaccount = (type) => {
  	switch (type){
  	case "BDO":
  		return "00397-0103-244";
  	case "UCPD":
  		return "2018-9000-1971";
  	case "SECURITY BANK":
  		return "0000-000206-926";
  	}
  }

  renderVerifying = () => {

  	return (
  		<View style={styles.marT10}>
  			<Text style={styles.title}>Verifying your payment</Text>
  			<Text style={[styles.subtitle3, styles.marT10]}>This transaction has
        been marked as paid. We will credit your account as
        soon as we have confirmed your payment.</Text>
  		</View>
  	);
  }
  
  render(){
  	const {wallet: {isRequestingFund, fundRequestResult: {serviceType, status}},
  		onCancel, onPaid} = this.props;
		
  	if (isRequestingFund){
  		return <Loading size="small"/>;
  	}
		
  	if (status && status === "PROCESSING"){
  		return this.renderVerifying();
  	}

  	return (
  		<ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
  			<Text style={styles.title}>Complete your payment</Text>
  			<Text style={styles.subtitle2}>Please complete your payment within 24 hours</Text>
  			<View >
  				<Text style={styles.txtInstruction}>
          1. Complete payment at any {serviceType} branch to the following account number
  				</Text>
  				<Detail Wrapper2={{marginTop: 2}} horizontal label={"Bank Account Name: "} valueStyle2={styles.valuePayment} value={"GPRS-Unified Products and Services, Inc."} />
  				<Detail Wrapper2={{marginTop: 2}} horizontal label={"Bank Account Number: "} valueStyle2={styles.valuePayment} value={this.getBankaccount(serviceType)} />
  				<Detail Wrapper2={{marginTop: 2}} horizontal label={"Branch: "} valueStyle2={styles.valuePayment} value={"South Triangle, Quezon Ave"} />

  				<Text style={styles.txtInstruction}>
          2. After completing payment, click
  					<Text style={styles.fontWBold}> Mark As Paid </Text>button.
  				</Text>
  				<View style={styles.otpBottom}>
  					<Button onPress={onCancel}
  						style={styles.btnback}
  						labelStyle={{color: Color.colorPrimary}} label="Cancel Payment"/>
  					<Button onPress={onPaid}  style={styles.width1202} label="Mark As Paid"/>
  				</View>
  			</View>
  		</ScrollView>
  	);
  }
}

StatusView.propTypes = {
	wallet: PropTypes.object,
	onCancel: PropTypes.func,
	onPaid: PropTypes.func,
};

export default StatusView;
