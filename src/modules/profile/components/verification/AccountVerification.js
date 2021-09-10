
/* eslint-disable */
import React, { PureComponent } from "react";
import { Text, View, Image, SafeAreaView, BackHandler, Alert } from "react-native";
import StepIndicator from "__src/resources/customize/StepIndicator";
import TransactionPin from "./TransactionPin";
import VerifyEmail from "./VerifyEmail";
import VerifyMobile from "./VerifyMobile";
import Kyc from "./KYC";
import UploadID from "./UploadID";
import Button from "__src/components/Button";
import ProofAddress from "./ProofAddress";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import Resource from "__src/resources";
import { StackActions, NavigationActions } from "react-navigation";
import { HeaderBackButton } from "react-navigation-stack";
import _ from "lodash";
const { Res } = Resource;

const customStyless = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 25,
	separatorStrokeWidth: 1,
	currentStepStrokeWidth: 0,
	stepStrokeCurrentColor: "#eeb91a",
	stepStrokeWidth: 0,
	stepStrokeFinishedColor: "#eeb91a",
	stepStrokeUnFinishedColor: "#aaaaaa",
	separatorFinishedColor: "#eeb91a",
	separatorUnFinishedColor: "#aaaaaa",
	stepIndicatorFinishedColor: "#eeb91a",
	stepIndicatorUnFinishedColor: "#aaaaaa",
	stepIndicatorCurrentColor: "#eeb91a",
	stepIndicatorLabelFontSize: 13,
	currentStepIndicatorLabelFontSize: 14,
	stepIndicatorLabelCurrentColor: "#eeb91a",
	stepIndicatorLabelFinishedColor: "#ffffff",
	stepIndicatorLabelUnFinishedColor: "#aaaaaa",
	labelColor: "#1f354f",
	labelSize: 11,
	currentStepLabelColor: "red",
};

class AccountVerification extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			currentPosition: 0,
			title: "Current",
		};

		this._didFocusSubscription = props.navigation.addListener("didFocus", () =>
			BackHandler.addEventListener("hardwareBackPress", this.logout)
		);
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (<HeaderBackButton tintColor="white"
				onPress={navigation.getParam("logout")} />)
		}
	};
	
	componentDidMount() {
		const { actions, login: { additionalDetails, session, getKYCVerification }, profile: { currentStep, IDetails }, navigation } = this.props;

		navigation.setParams({ logout: this.logout });
		this._willBlurSubscription = navigation.addListener("willBlur", () =>
			BackHandler.removeEventListener("hardwareBackPress", this.logout)
		);
		actions.changeCurrentStep("mobileVerification");
		actions.getKYCVerification(session.token);
		actions.getAdditionalDetails(session);
		actions.resetSendingMobile();

		if (!_.has(additionalDetails, "metadata")) {
			return;
		}

		let step = "kycForm";
		
		if (!additionalDetails.metadata.email) {
			step = "emailVerification";
		} else if (!additionalDetails.individual.streetAddress) {
			step = "kycForm";
		} else if (!additionalDetails.individual.mobile) {
			step = "mobileVerification";
		} else if (getKYCVerification.kyc1.status !== "accepted") {
			step = "idAndSelfie";
			actions.resetIdPhoto();
			actions.resetSelfiePhoto();
		} else if (getKYCVerification.kyc2.status !== "accepted") {
			step = "proofOfAddressUpload";
			actions.resetAddressPhoto();
			actions.resetAuthPhoto();
		} else if (getKYCVerification.kyc1.status === "accepted" &&
			getKYCVerification.kyc2.status === "accepted") {
			step = "verified";
		}

		actions.changeCurrentStep(step);
	}

	componentDidUpdate(prevProps) {
		const { actions, profile: { doneVerifyingEmail, doneVerifyingMobile, doneSubmittingKyc, currentUser },
			login: { session, additionalDetails, getKYCVerification } } = this.props;

		if (doneSubmittingKyc !== prevProps.profile.doneSubmittingKyc && doneSubmittingKyc) {
			actions.getAdditionalDetails(session);
			actions.walletAdded(session.token, null);

		}
		if (doneVerifyingEmail !== prevProps.profile.doneVerifyingEmail && doneVerifyingEmail) {
			actions.getAdditionalDetails(session);
		}

		if (doneVerifyingMobile !== prevProps.profile.doneVerifyingMobile && doneVerifyingMobile) {
			actions.getAdditionalDetails(session);
		}

		if (!_.has(additionalDetails, "metadata")) {
			return;
		}

		if (!_.isEqual(prevProps.login.additionalDetails, additionalDetails) &&
			!_.isEmpty(additionalDetails)) {
			let step = "kycForm";

			if (!additionalDetails.metadata.email) {
				step = "emailVerification";
			} else if (!additionalDetails.individual.streetAddress) {
				step = "kycForm";
			} else if (!additionalDetails.individual.mobile) {
				step = "mobileVerification";
			} else if (getKYCVerification.kyc1.status !== "accepted") {
				step = "idAndSelfie";
				actions.resetIdPhoto();
				actions.resetSelfiePhoto();
			} else if (getKYCVerification.kyc2.status !== "accepted") {
				step = "proofOfAddressUpload";
				actions.resetAddressPhoto();
				actions.resetAuthPhoto();
			} else if (getKYCVerification.kyc1.status === "accepted" &&
				getKYCVerification.kyc2.status === "accepted") {
				step = "verified";
			}

			actions.changeCurrentStep(step);
		}
	}

	componentWillUnmount() {
		this._didFocusSubscription && this._didFocusSubscription.remove();
		this._willBlurSubscription && this._willBlurSubscription.remove();
	}

	logout = () => {
		const { login: { additionalDetails, session }, navigation, actions } = this.props;

		if (additionalDetails.individual.birthPlace && additionalDetails.individual.streetAddress
			&& additionalDetails.individual.mobile) {
			actions.getAdditionalDetails(session);
			navigation.goBack();
			return;
		}

		Alert.alert("Notice", "Want to sign out?",
			[{
				text: "Cancel",
				onPress: () => console.log("Cancel Pressed"),
				style: "cancel",
			}, { text: "OK", onPress: () => this.onLogout() },
			], { cancelable: false });
	}

	onLogout = () => {
		const { actions, navigation } = this.props;

		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: "Login" })],
		});

		actions.logout();
		navigation.dispatch(resetAction);
	}

	_renderContent = () => {
		const { profile: { currentStep } } = this.props;

		switch (currentStep) {
			case "transactionPin":
				return <TransactionPin {...this.props} />;
			case "emailVerification":
				return <VerifyEmail {...this.props} />;
			case "mobileVerification":
				return <VerifyMobile {...this.props} />;
			case "kycForm":
				return <Kyc {...this.props} />;
			case "idAndSelfie":
				return <UploadID {...this.props} />;
			case "proofOfAddressUpload":
				return <ProofAddress {...this.props} />;
			case "verified":
				return this._renderVerified();
			default:
				break;
		}
	}
	back = () => {
		const { navigation } = this.props;

		navigation.goBack();
	}

	_renderVerified = () => (
		<View style={styles.flex1mar30pad30}>
			<View style={styles.flex1}>
				<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
				<Text style={styles.txtsuccess}>Account verification process is completed.</Text>
			</View>
			<View style={styles.marb20}>
				<Button
					onPress={this.back}
					style={styles.btnStyle2}
					label="Back" />
			</View>
		</View>
	);

	_renderCheckIcon = ({stepStatus}) => {
		if(stepStatus === "finished")
			return 	<Image
						style={{height: 13, width: 13}}
						source={require("__proj/src/resources/images/check_icon_white.png")}
						resizeMode={"contain"}
					/>
	}

	position = () => {
		const { profile: { currentStep } } = this.props;

		switch (currentStep) {
			case "transactionPin":
				return 0;
			case "emailVerification":
				return 1;
			case "kycForm":
				return 2;
			case "mobileVerification":
				return 3;
			case "idAndSelfie":
				return 4;
			case "proofOfAddressUpload":
				return 5;
			case "verified":
				return 6;
			default:
				return 0;
		}
	}

	_renderHeaderContent = () => {
		const { profile: { currentStep }, navigation } = this.props;

		switch (currentStep) {
			case "transactionPin":
				return "TRANSACTION PIN";
			case "emailVerification":
				return "Email Verification";
			case "kycForm":
				return " Know Your Customer";
			case "mobileVerification":
				return "Mobile Verification";
			case "idAndSelfie":
				return "Upload ID and Selfie with ID";
			case "idAndSelfie2":
				return "Upload Selfie with ID";
			case "proofOfAddressUpload":
				return "Proof of Address Upload";
		}
	}


	render() {
		return (
			<View style={{flex: 1, backgroundColor: "#F8F9FB"}}>
				<View style={{height: 70}}>
					<Text style={styles.txtheader}>{this._renderHeaderContent()}</Text>
				</View>
				<View style={styles.viewContainer}>
					<View style={[styles.card, {height: "10%"}]}>
						<StepIndicator
							stepCount={7}
							customStyles={customStyless}
							currentPosition={this.position()} 
							renderStepIndicator={this._renderCheckIcon}
						/>
					</View>
					{this._renderContent()}
				</View>
				<SafeAreaView style={styles.marb20} />
			</View>
		);
	}
}

AccountVerification.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	profile: PropTypes.object,
	navigation: PropTypes.object,
};

export default AccountVerification;
