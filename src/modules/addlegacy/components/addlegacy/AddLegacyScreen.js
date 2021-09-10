import React, { PureComponent } from "react";
import { View, SafeAreaView } from "react-native";
import styles from "../../styles.css";
import Button from "__src/components/Button";
import StepIndicator from "__src/resources/customize/StepIndicator";
import PropTypes from "prop-types";
import RegcodeVerification from "./RegcodeVerification";
import RegcodeAccount from "./RegcodeAccount";
import ConfirmationCode from "./ConfirmationCode";
import Success from "./Success";
import Resource from "__src/resources";
const { Color} = Resource;
const customStyless = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 30,
	separatorStrokeWidth: 1,
	currentStepStrokeWidth: 1,
	stepStrokeCurrentColor: Color.Standard,
	stepStrokeWidth: 1,
	stepStrokeFinishedColor: "#eeb91a",
	stepStrokeUnFinishedColor: Color.Standard,
	separatorFinishedColor: "#eeb91a",
	separatorUnFinishedColor: "#aaaaaa",
	stepIndicatorFinishedColor: "#eeb91a",
	stepIndicatorUnFinishedColor: "#ffffff",
	stepIndicatorCurrentColor: Color.Standard,
	stepIndicatorLabelFontSize: 13,
	currentStepIndicatorLabelFontSize: 14,
	stepIndicatorLabelCurrentColor: Color.white,
	stepIndicatorLabelFinishedColor: "#ffffff",
	stepIndicatorLabelUnFinishedColor: "#aaaaaa",
	labelColor: "#1f354f",
	labelSize: 11,
	currentStepLabelColor: "red",
};

class AddLegacyScreen extends PureComponent {

	componentDidMount(){
		const {actions} = this.props;

		actions.closeModal();
	}

	_renderContent = () => {
		const { addlegacy: {addLegacyAccountScreen}} = this.props;

		switch (addLegacyAccountScreen) {
		case "regcodeVerification":
			return this._renderRegcodeVerification();
		case "regcodeAccount":
			return this._renderRegcodeAccount();
		case "confirmationCode":
			return this._renderConfirmationCode();
		case "Success":
			return this._renderSuccess();
		}
	}

	_renderRegcodeVerification = () => (
		<RegcodeVerification ref={(e) => this.RegcodeVerification = e} {...this.props}/>
	)

	_renderRegcodeAccount = () => (
		<RegcodeAccount ref={(e) => this.RegcodeAccount = e} {...this.props}/>
	)

	_renderConfirmationCode = () => (
		<ConfirmationCode ref={(e) => this.ConfirmationCode = e} {...this.props}/>
	)
	_renderSuccess = () => (
		<Success ref={(e) => this.Success = e} {...this.props}/>
	)

	position = () => {
		const { addlegacy: { addLegacyAccountScreen } } = this.props;

		switch (addLegacyAccountScreen) {
		case "regcodeVerification":
			return 0;
		case "regcodeAccount":
			return 1;
		case "confirmationCode":
			return 2;
		case "Success":
			return 3;
		default:
			return 0;
		}
	}

	onSubmit = () => {
		const { addlegacy: {addLegacyAccountScreen}} = this.props;

		switch (addLegacyAccountScreen) {
		case "regcodeVerification":
			this.RegcodeVerification.onSubmit();
			break;
		case "regcodeAccount":
			this.RegcodeAccount.onSubmit();
			break;
		case "confirmationCode":
			this.ConfirmationCode.onSubmit();
			break;
		}
	}

	onBack = () => {
		const { addlegacy: {addLegacyAccountScreen}, actions, navigation} = this.props;

		switch (addLegacyAccountScreen) {
		case "regcodeVerification":
			navigation.goBack();
			// actions.setAddLegacyAccountScreen("Success");
			break;
		case "regcodeAccount":
			actions.setAddLegacyAccountScreen("regcodeVerification");
			break;
		case "confirmationCode":
			actions.setAddLegacyAccountScreen("regcodeAccount");
			break;
		}
	}

	render() {
		const { addlegacy: { isSearchingRegcode, isVerifyingCode,
			isGettingRegcodeCredentials, addLegacyAccountScreen } } = this.props;
		const label = addLegacyAccountScreen === "regcodeVerification" ? "Proceed" : "Verify";

		return (
			<View style={[styles.flex1, {backgroundColor: Color.bg}]}>
				<View style={styles.card}>
					<StepIndicator
						stepCount={3}
						customStyles={customStyless}
						currentPosition={this.position()} />
				</View>
				{this._renderContent()}
				{addLegacyAccountScreen === "Success" ? null :
					<View>
						<Button onPress={this.onSubmit}
							loading={isSearchingRegcode || isVerifyingCode ||
								isGettingRegcodeCredentials}
							style={styles.btnCreate} label={label}/>
						<Button
							onPress={this.onBack}
							style={styles.btnCancel}
							label="Back"
							labelStyle={{color: Color.colorPrimaryDark}}/>
					</View>
				}
				<SafeAreaView />
			</View>
		);
	}
}

AddLegacyScreen.propTypes = {
	addlegacy: PropTypes.object,
	actions: PropTypes.object,
	navigation: PropTypes.object,
};

export default AddLegacyScreen;
