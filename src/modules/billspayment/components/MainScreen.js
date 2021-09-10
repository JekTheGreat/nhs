/* eslint-disable */
import React, { Component, PureComponent } from "react";
import { View, Text, Dimensions, SafeAreaView, Platform, StatusBar, StyleSheet } from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import Resource from "__src/resources";
import _ from "lodash";
import ScrollableTabView, { DefaultTabBar } from "react-native-scrollable-tab-view";
import BillsPaymentHomeScreen from "./BillsPaymentHomeScreen";
import TransactionLogs from "./TransactionLogs";
import CustomTab from './Customtab';
import { Tab, Tabs, Spinner } from "native-base";
import styles from "../../billspayment/styles.css";
import { Colors } from "react-native-paper";
var { height, width } = Dimensions.get('window');

const { Res, Color } = Resource;
const tabLabels = ["Pay Bills", "Transaction Logs"];

class MainSreen extends PureComponent {

	componentDidUpdate(prevProps) {
		const { actions, billspayment: { getTransactions }, login: { session } } = this.props;
		if (!_.isEmpty(getTransactions) && !_.isEqual(getTransactions.total, prevProps.billspayment.getTransactions.total)) {
			actions.fetchTransactions(session);
		}
	}

	componentDidMount() {
		const { actions, billspayment: { setInputDetails }, login: { session } } = this.props;
		if (!_.isEmpty(setInputDetails.chooseBillers.biller)) {
			delete setInputDetails.chooseBillers.biller;
		}
		actions.setBillsPaymentScreen({});
		actions.fetchTransactions(session);
	}
	renderTab = (item) => {
		switch (item) {
			case "Pay Bills":
				return <BillsPaymentHomeScreen key={item} tabLabel={item} ref={(e) => this.Paybills = e} {...this.props} />;
			case "Transaction Logs":
				return <TransactionLogs key={item} tabLabel={item} ref={(e) => this.TransactionLogs = e} {...this.props} />;
		}
	}

	renderUserHostScreen = () => {
		return (
			<ScrollableTabView
				ref={(tabView) => { this.tabView = tabView }}
				initialPage={0}
				locked
				renderTabBar={(props) => <CustomTab {...this.props} props2={props} ref={(e) => this.CustomTab = e} />}
				tabBarPosition="top"
				style={{ backgroundColor: "white" }}
				tabBarInactiveTextColor={Color.Standard}
				tabBarActiveTextColor={Color.LightBlue}>
				<BillsPaymentHomeScreen tabLabel="Pay Bills" ref={(e) => this.Paybills = e} {...this.props} />
				<TransactionLogs tabLabel="Transaction Logs" ref={(e) => this.TransactionLogs = e} {...this.props} />
			</ScrollableTabView>
		)


		// return <Tabs
		// 	tabBarUnderlineStyle={styles2.tabBarUnderlineStyle}
		// 	style={styles2.TabsStyle}
		// 	locked
		// 	tabBarActiveTextColor={Color.LightBlue}
		// 	tabBarInactiveTextColor={Color.Standard2}>
		// 	{tabLabels.map((item, idx) => {
		// 		return (
		// 			<Tab key={`idx ${idx}`}
		// 				heading={`${item}`}
		// 				tabStyle={styles2.tabStyle}
		// 				textStyle={styles2.textStyle}
		// 				activeTextStyle={{ fontSize: 13, color: Color.LightBlue }}
		// 				activeTabStyle={{ backgroundColor: Color.white }}>
		// 				{this.renderTab(item)}
		// 			</Tab>
		// 		);
		// 	})}
		// </Tabs>;
	}

	render() {
		const { billspayment: { transactionInProgress } } = this.props;
		return (
			<View style={{ flex: 1 }}>
				{this.renderUserHostScreen()}
				{transactionInProgress ?
					<View style={{
						position: "absolute",
						justifyContent: 'center',
						backgroundColor: 'rgba(0,0,0,0.3)', width: width, height: height
					}}>
						<Spinner
							color={"black"}
							size="small"
							animating={transactionInProgress} />
					</View> : null}
				<SafeAreaView style={styles.flex} />
			</View>
		);
	}
}

const styles2 = StyleSheet.create({
	tabBarUnderlineStyle: { height: 1, backgroundColor: Color.LightBlue },
	tabStyle: { backgroundColor: Color.white },
	TabsStyle: { backgroundColor: Color.white, alignItems: "center", justifyContent: "center" },
	textStyle: { color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 11 },
});

MainSreen.propTypes = {
	billspayment: PropTypes.object,
};

export default MainSreen;
