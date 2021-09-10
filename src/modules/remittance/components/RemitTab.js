/* eslint-disable max-len */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, StyleSheet, StatusBar, Image,
	Text, ScrollView, Linking} from "react-native";
import {Tab, Tabs} from "native-base";
import Send from "./send/Main";
import PayoutScreen from "./payout/PayoutScreen";
import RemittanceSuccess from "./Success";
import ReportScreen from "./reports/ReportScreen";
import _ from "lodash";
import Detail from "__src/components/Detail";
import moment from "moment";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const arrays = ["Send", "Payout", "Report"];

export default class RemitTab extends PureComponent{

  renderTab = (item) => {
  	switch (item){
  	case "Send":
  		return <Send {...this.props}/>;
  	case "Payout":
  		return <PayoutScreen {...this.props}/>;
  	case "Report":
  		return <ReportScreen {...this.props}/>;
  	}
  }
	
	ok = () => {
		const {actions } = this.props;

		actions.resetRemittance();
	}

	getNameSender = () => {
		const {remittance: {inputDetails}} = this.props;
		if (_.has(inputDetails, "Sender.FirstName")){
			return `${inputDetails.Sender.FirstName} ${inputDetails.Sender.LastName}`;
		} else if (_.has(inputDetails, "Sender.firstName")){
			return `${inputDetails.Sender.firstName} ${inputDetails.Sender.middleName} ${inputDetails.Sender.lastName}`;
		}
		
		return "";
	}

	getNameBeneficiary = () => {
		const {remittance: {inputDetails}} = this.props;
		if (_.has(inputDetails, "Beneficiary.FirstName")){
			return `${inputDetails.Beneficiary.FirstName} ${inputDetails.Beneficiary.LastName}`;
		} else if (_.has(inputDetails, "Beneficiary.firstName")){
			return `${inputDetails.Beneficiary.firstName} ${inputDetails.Beneficiary.middleName} ${inputDetails.Beneficiary.lastName}`;
		}
		
		return "";
	}

	getDate = () => {
		const {remittance: {inputDetails}} = this.props;
		if (_.has(inputDetails, "Beneficiary.BirthDate")){
			return moment(new Date(inputDetails.Beneficiary.BirthDate)).format("MMM DD, YYYY");
		} else if (_.has(inputDetails, "Beneficiary.DoB")){
			return moment(new Date(inputDetails.Beneficiary.DoB)).format("MMM DD, YYYY");
		}
		
		return "";
	}
	
	renderSuccess = () => {
		const {remittance: {inputDetails, TransactionSuccess }} = this.props;

		return (
			<RemittanceSuccess onPressOk={this.ok}
				onPressDownload={this.podURL} {...this.props} >
				<ScrollView style={styles.flex1}>

					<Image style={styles.img1} source={Res.get("check_icon")} resizeMode={"contain"} />
					<Text style={styles.txt3_1}>Transaction Success!</Text>
					<Detail horizontal label={"Tracking Number:"} value={TransactionSuccess.D.transactionNumber} />
					<Detail horizontal label={"Transaction:"} value={inputDetails.provName} />
					<Detail horizontal label={"Sender:"} value={this.getNameSender()} />
					<Detail horizontal label={"Beneficiary:"} value={this.getNameBeneficiary()} />
					<View  style={styles.viewDivider}/>
					<Detail horizontal label={"Reference Number:"} value={TransactionSuccess.D.referenceNumber} />
					<Detail horizontal label={"Transferred Amount:"} value={TransactionSuccess.D.amount} />
			
				</ScrollView>
			</RemittanceSuccess>
		);
	}

	podURL = () => {
		const {remittance: {TransactionSuccess}} = this.props;

		Linking.openURL(TransactionSuccess.D.url)
			.catch((err) => console.error("An error occurred", err));
	}

	renderSuccessPayout = () => {
		const {remittance: {inputPayoutDetails, TransactionSuccess, getPayoutDetail }} = this.props;
		const fullnameB = `${getPayoutDetail.D.beneficiary.fullname}`;
		const dateB = moment(new Date(getPayoutDetail.D.beneficiary.DoB)).format("MMM DD, YYYY");

		return (
			<RemittanceSuccess onPressOk={this.ok} onPressDownload={this.podURL} {...this.props} >
				<ScrollView style={styles.flex1}>
					<Image style={styles.img1} source={Res.get("check_icon")} resizeMode={"contain"} />
					<Text style={styles.txt3_1}>Transaction Success!</Text>
					<Text style={styles.txt3_1}>Please upload the signed POD (Proof of Disbursement) </Text>
					<Detail horizontal label={"POD Tracking Number:"} value={TransactionSuccess.D.transactionNumber} />
					<Detail horizontal label={"Transaction:"} value={inputPayoutDetails.provName} />
					<Detail horizontal label={"Beneficiary:"} value={fullnameB} />
					<Detail horizontal label={"Date of Birth:"} value={dateB} />
				
					<View  style={styles.viewDivider}/>
					<Detail horizontal label={"Transferred Amount:"} value={getPayoutDetail.D.rates.PrincipalAmount} />
					<Detail horizontal label={"Reference Number:"} value={inputPayoutDetails.reference} />
				</ScrollView>
			</RemittanceSuccess>
		);
		
	}

	render(){
		const {remittance: {TransactionSuccess}} = this.props;
		
		if (!_.isEmpty(TransactionSuccess) && (TransactionSuccess.type === "success" || TransactionSuccess.type === "payout")){
			return TransactionSuccess.type === "payout" ? this.renderSuccessPayout() : this.renderSuccess();
		}

  	return (
  		<View style={styles.container}>
  			<StatusBar barStyle="light-content" backgroundColor={Color.Header} />
  			<Tabs
  				tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
					style={styles.TabsStyle}
					tabBarActiveTextColor={Color.colorPrimary}
					tabBarInactiveTextColor={Color.Standard2}>
  				{arrays.map((item, idx) => {
  					return (
  						<Tab key={`idx ${idx}`}
  							heading={`${item}`}
  							tabStyle={styles.tabStyle}
  							textStyle={styles.textStyle}
  							activeTabStyle={{backgroundColor: Color.white}}
  							activeTextStyle={{color: Color.colorPrimary}}>
  							{this.renderTab(item)}
  						</Tab>
  					);
  				})}
  			</Tabs>
  		</View>
  	);
	}
}

RemitTab.propTypes = {
	remittance: PropTypes.object,
	actions: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: Color.bg},
	tabBarUnderlineStyle: {height: 1, backgroundColor: Color.colorPrimary},
	tabStyle: {backgroundColor: Color.white},
	TabsStyle: {backgroundColor: Color.white, alignItems: "center", justifyContent: "center"},
	textStyle: {color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 12},
	viewDivider: {height: 0.5, backgroundColor: Color.Standard, marginTop: 10, borderStyle: "dashed", borderWidth: 0.6 },
	img1: {width: 125, height: 125, alignSelf: "center", marginTop: 20, marginBottom: 30},
	txt3_1: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 20},
});
