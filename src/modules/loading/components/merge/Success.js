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

class Success extends PureComponent {
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

	renderLocal() {
		const{loading: {selectedPlancode, setInputMerge, loadSuccess, selectedSubCategory, loadComputation, IntSubCategories}} = this.props;
		const plancodeLoc = selectedPlancode.categoryId  === "LOAD" ? `Regular ${selectedPlancode.amount}` : `${selectedPlancode.name}`;
		const amountInt = _.has(selectedSubCategory, "amount") ? `${selectedSubCategory.amount} ${selectedSubCategory.receiveCurrency}` :  `( ${selectedSubCategory.maximum} ${selectedSubCategory.receiveCurrency} )`;
		const isUAE = setInputMerge.prefix === "971" &&
		IntSubCategories.provider.toUpperCase() === "ONE PREPAY" ?
		`${_.truncate(selectedSubCategory.displayText, {length: 26, separator: " "})} ${selectedSubCategory.amount}` :
		amountInt;
		const plancodeInt = _.has(selectedSubCategory, "amount") ? isUAE : `${selectedSubCategory.displayText}`;
		const plancode = setInputMerge.prefix == "63" ? plancodeLoc : plancodeInt;
		const loadType = setInputMerge.prefix == "63" ? `( ${selectedPlancode.amount} ${selectedPlancode.currency} )` : amountInt;
		const loadComp = setInputMerge.prefix == "63" ? `( ${loadComputation.data.metaData.loadAmount} )` : `( ${loadComputation.data.metaData.amountWMarkUp} )`;
		const amount = _.isEmpty(loadComputation) ? loadType : loadComp;
		return (
			<View style={styles.renderSuccessWrapper}>
				<ScrollView style={[styles.flex1, {height: "80%"}]}>
					<Image style={styles.img1} source={Res.get("check_icon")} resizeMode={"contain"} />
					<Text style={[styles.txt3_1,{fontWeight: "bold"}]}>Thank you!</Text>
						<Text style={[styles.txt4, styles.marT15]}>
							<Text style={{fontWeight: "bold"}}>{`${plancode} `}</Text>
							will be loaded to {"\n"}
							<Text style={{fontWeight: "bold"}}> {`+${setInputMerge.prefix}${setInputMerge.mobile} `} </Text>
							within 10 minutes.
						</Text>
						<Text style={[styles.txt4, styles.marT15]}>
							An SMS notification will be sent{"\n"} upon receiving the load 
						</Text>

						<Text style={[styles.txt4, styles.marT15]}>
							Transaction No:{"\n"}
							<Text style={{color: Color.green, fontWeight: "bold"}}>{loadSuccess.transactionId}</Text>
						</Text>
				</ScrollView>
				<View style={[styles.renderSuccessWrapper2, {height: "20%"}]}>
					<TouchableOpacity onPress={this.ok}>
						<Text style={styles.txtok}>Done</Text>
					</TouchableOpacity>
				</View>
			</View>
  	);
	}
	
	renderInternational() {
		const{loading: {setInputMerge, loadSuccessInt}} = this.props;

		return (
			<View style={styles.renderSuccessWrapper}>
				<ScrollView style={[styles.flex1, {height: "80%"}]}>
					<Image style={styles.img1} source={Res.get("check_icon")} resizeMode={"contain"} />
					<Text style={styles.txt3_1}>Transaction Success!</Text>
						<Text style={[styles.txt4, styles.marT20]}>
							<Text style={{fontWeight: "bold"}}> {numeral(loadSuccessInt.amount).format("0,000.00")} PHP </Text>
							will be credited to
							<Text style={{fontWeight: "bold"}}> +{setInputMerge.prefix}{setInputMerge.mobile} </Text>
						</Text>

						<Text style={[styles.txt4, styles.marT20]}>
						Thank you for purchasing your load.{"\n"}
						Please check your email for other information.
						</Text>

						<Text style={[styles.txt4, styles.marT20]}>
							Tracking Number:{"\n"}
							<Text style={{color: Color.green, fontWeight: "bold"}}>{loadSuccessInt.transactionId}</Text>
						</Text>
				</ScrollView>
				<View style={[styles.renderSuccessWrapper2, {height: "20%"}]}>
					<TouchableOpacity onPress={this.ok}>
						<Text style={styles.txtok}>Ok</Text>
					</TouchableOpacity>
				</View>
			</View>
  	);
	}

	render(){
		const {isLocal} = this.props;

		return isLocal ? this.renderLocal() : this.renderInternational();
	}
}

Success.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
	profile: PropTypes.object,
};

export default Success;
