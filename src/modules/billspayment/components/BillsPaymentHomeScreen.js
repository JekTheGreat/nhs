/* eslint-disable */
import React, { Component } from "react";
import { View, Text, Dimensions, SafeAreaView, Platform, StatusBar } from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import ChooseBillerScreen from "./screen/ChooseBiller";
import FilloutFormScreen from "./screen/FilloutForm";
import SummaryScreen from "./screen/Summary";
import FinalScreen from "./screen/FinalScreen";
import Resource from "__src/resources";
import _ from "lodash";
import { Spinner } from "native-base";
import styles from "../../billspayment/styles.css";
import StepIndicator from "__src/resources/customize/StepIndicator";
import { Colors } from "react-native-paper";
var { height, width } = Dimensions.get('window');

const { Res, Color } = Resource;
const labels = ["Choose Biller", "Fill out information", "Summary"];
const customStyles = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 30,
	separatorStrokeWidth: 1,
	currentStepStrokeWidth: 1,
	stepStrokeCurrentColor: Color.LightBlue,
	stepStrokeWidth: 1,
	stepStrokeFinishedColor: Color.LightBlue,
	stepStrokeUnFinishedColor: Colors.grey400,
	separatorFinishedColor: Color.LightBlue,
	separatorUnFinishedColor: Color.Standard,
	stepIndicatorFinishedColor: "white",
	stepIndicatorUnFinishedColor: "#ffffff",
	stepIndicatorCurrentColor: Color.LightBlue,
	stepIndicatorLabelFontSize: 13,
	currentStepIndicatorLabelFontSize: 14,
	stepIndicatorLabelCurrentColor: Color.white,
	stepIndicatorLabelFinishedColor: Color.LightBlue,
	stepIndicatorLabelUnFinishedColor: Colors.grey400,
	labelColor: Colors.grey400,
	labelSize: 11,
	currentStepLabelColor: "black",
};

class BillsPaymentHomeScreen extends Component {


	componentDidMount() {
		const { actions, billspayment: { getBillers } } = this.props;
		actions.fetchBillers();
		actions.fetchCategories();
	}

	renderScreen = () => {
		const { billspayment: { setBillsPaymentScreen } } = this.props;
		switch (setBillsPaymentScreen) {
			case "final":
				return <FinalScreen ref={(e) => this.FinalScreen = e} {...this.props} />;
			case "summary":
				return <SummaryScreen ref={(e) => this.Summary = e} {...this.props} />;
			case "filloutform":
				return <FilloutFormScreen ref={(e) => this.FilloutForm = e} {...this.props} />;
			case "choosebiller":
			default:
				return <ChooseBillerScreen ref={(e) => this.ChooseBiller = e} {...this.props} />;
		}
	}

	onNext = () => {
		const { billspayment: { setBillsPaymentScreen } } = this.props;
		switch (setBillsPaymentScreen) {
			case "final":
				this.FinalScreen.onNext();
				break;
			case "summary":
				this.Summary.onNext();
				break;
			case "filloutform":
				this.FilloutForm.onNext();
				break;
			default:
				this.ChooseBiller.onNext();
				break;
		}
	}

	onBack = () => {
		const { actions, billspayment: { setBillsPaymentScreen, setInputDetails, uploadImage, transactionFailed } } = this.props;
		switch (setBillsPaymentScreen) {
			case "final":
				actions.setBillsPaymentScreen("summary");
				break;
			case "summary":
				delete setInputDetails.filloutform;
				delete setInputDetails.getDP;
				delete setInputDetails.imageFileName;
				delete this.props.billspayment.uploadImage;
				delete this.props.billspayment.validateFields;
				actions.setBillsPaymentScreen("filloutform");
				break;
			case "filloutform":
				if (_.has(transactionFailed, "message")) {
					delete transactionFailed.message;
				}
				delete setInputDetails.imageFileName;
				delete this.props.billspayment.uploadImage;
				delete this.props.billspayment.validateFields;
				delete setInputDetails.filloutform;
				delete setInputDetails.chooseBillers.biller;
				actions.setBillsPaymentScreen("choosebiller");
				break;
			case "choosebiller":
				actions.setBillsPaymentScreen("choosebiller");
				break;
		}
	}

	position = () => {
		const { billspayment: { setBillsPaymentScreen } } = this.props;
		switch (setBillsPaymentScreen) {
			case "filloutform":
				return 1;
			case "summary":
				return 2;
			case "choosebiller":
			default:
				return 0;
		}
	}

	render() {
		const { billspayment: { setBillsPaymentScreen, transactionInProgress } } = this.props;
		return (
			<View style={{ flex: 1, marginTop: 10 }}>
				<StatusBar backgroundColor={Color.Header} barStyle="light-content" />
				{setBillsPaymentScreen === "final" ? null :
					<View >
						<StepIndicator
							stepCount={3}
							labels={labels}
							customStyles={customStyles}
							currentPosition={this.position()}
						/>
					</View>}

				{this.renderScreen()}
				<View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 15, flexShrink: 1, bottom: 0, alignSelf: "center" }}>
					{_.isEmpty(setBillsPaymentScreen) || setBillsPaymentScreen === "choosebiller" || setBillsPaymentScreen === "final" ? null :
						<Button onPress={this.onBack}
							style={{ marginTop: 10, width: 120, borderColor: Color.colorPrimaryDark, borderWidth: 0.5, backgroundColor: Color.white, marginRight: 10 }}
							labelStyle={{ color: Color.colorPrimary }} label="Back" />}
					<Button onPress={this.onNext} style={_.isEmpty(setBillsPaymentScreen) || setBillsPaymentScreen === "final" || setBillsPaymentScreen === "choosebiller" ? { marginTop: 10, width: 250 } : { marginTop: 10, width: 120 }}
						label={setBillsPaymentScreen === "final" ? "Done" : "Next"} />
				</View>
				<SafeAreaView style={styles.flex} />
			</View>
		);
	}
}

BillsPaymentHomeScreen.propTypes = {
	billspayment: PropTypes.object,
};

export default BillsPaymentHomeScreen;

