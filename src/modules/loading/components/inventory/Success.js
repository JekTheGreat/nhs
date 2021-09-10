/* eslint-disable no-nested-ternary */
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TouchableOpacity, Image, ScrollView} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import _ from "lodash";
import styles from "../../styles.css";
import numeral from "numeral";

const {Res, Color} = Resource;
const truncateSixDecimal = {};
truncateSixDecimal.floor = function(number, precision) {
	const factor = Math.pow(10, precision);
	const tempNumber = number * factor;
	const roundedTempNumber = Math.floor(tempNumber);

	return roundedTempNumber / factor;
};
export default class InventorySuccess extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			error: {},
			inputTransferReason: "",
			isConfirm: false,
			selectAccountWallet: {},
		};
	}

	ok = () => {
		const{actions, login: {session}, wallet: {walletSelected} } = this.props;

		actions.resetLoading();
		actions.setIntScreen("Input");
		actions.walletAdded(session.token, walletSelected);
	}

	renderInfo = (label, value) => {
		return (
			<>
				<View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
					<Text style={styles.txt4}>{label}</Text>
					<Text selectable style={[styles.txt4,{fontWeight: "bold"}]}>{value}</Text>
				</View>
				{/* <View style={{height: 1, backgroundColor: Color.text4, marginTop: 4}}/> */}
			</>
		)
	}

	renderLoadingCategory = () => {
		const {loading: {selectedInventory}} = this.props;

		switch (selectedInventory.categoryId) {
		case "CARDS":
			return "Call Cards";
		case "GAMING":
			return "Gaming Cards";
		case "SATELLITE":
			return "Satellite Cards";
		case "OTHERS":
			return "Other";
		default:
			return "N/A";
		}
	}
	
	render() {
		const{loading: {setInputInventory, loadInventorySuccess, selectedInventory, loadComputation}} = this.props;
		const DisplayDiscount = selectedInventory.amount * selectedInventory.discount;
		const amount = selectedInventory.isInternational == 0 || false ? loadComputation.data.metaData.loadAmount : `${loadComputation.data.metaData.amountWMarkUp} ${selectedInventory.currency}`;
		const input = selectedInventory.isInternational == 0 || false ? "mobile number" : "email";
		const inputInfo = selectedInventory.isInternational == 0 || false ? `+${setInputInventory.prefix}${setInputInventory.mobile}` : `${setInputInventory.email}`;
		return (
			<View style={styles.renderSuccessWrapper}>
				<ScrollView showsVerticalScrollIndicator={false} style={[styles.flex1, {height: "84%"}]}>
					<Image style={styles.img1} source={Res.get("check_icon")} resizeMode={"contain"} />
					<Text style={[styles.txt3_1, {fontWeight: "bold", color: Color.LightBlue5}]}>TRANSACTION COMPLETED!</Text>
					<Text style={[styles.txt4,{fontWeight: "bold", marginVertical: 10}]}>THANK YOU FOR TRANSACTING WITH US</Text>
					<Text style={[styles.txt4, styles.marT15]}>
						Thank you for using
						<Text style={{fontWeight: "bold"}}> Unified Loading </Text>
						service! E-pins will be sent to your customer’s {input}.
					</Text>
					<Text style={[styles.txt4, styles.marT15,{fontWeight: "bold"}]}>
						{inputInfo}
					</Text>
					<Text style={[styles.txt4, styles.marT15]}>
						Transaction No:{"\n"}
						<Text style={{color: Color.green, fontWeight: "bold"}}>{loadInventorySuccess.transactionId}</Text>
					</Text>
					{/* {this.renderInfo("TRANSACTION CODE", loadInventorySuccess.transactionId)}
					{this.renderInfo("CONTACT DETAILS", selectedInventory.isInternational == 0 || false ? `+${setInputInventory.prefix}${setInputInventory.mobile}` : _.truncate(setInputInventory.email, {length: 25, separator: " "}))}
					{this.renderInfo("CATEGORY", this.renderLoadingCategory())}
					{this.renderInfo("NAME/LOAD TYPE", selectedInventory.name)}
					{this.renderInfo("AMOUNT", _.isEmpty(loadComputation) ? "N/A" : amount)}
					{this.renderInfo("DISCOUNT", _.isEmpty(loadComputation) ? "N/A" : truncateSixDecimal.floor(loadComputation.data.metaData.discount, 6)+" "+loadInventorySuccess.currency)}
					{this.renderInfo("AMOUNT DUE", loadInventorySuccess.debit+" "+loadInventorySuccess.currency)} */}
				</ScrollView>
				<View style={[styles.renderSuccessWrapper2, {height: "16%"}]}>
					<TouchableOpacity onPress={this.ok}>
						<Text style={styles.txtok}>Done</Text>
					</TouchableOpacity>
				</View>
			</View>
  	);
	}
}

InventorySuccess.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
	profile: PropTypes.object,
};
