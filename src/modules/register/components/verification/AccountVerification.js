
/* eslint-disable */
import React from "react";
import { Text, View, Image, SafeAreaView, BackHandler, Alert } from "react-native";
import StepIndicator from "__src/resources/customize/StepIndicator";
import {StackActions, NavigationActions} from "react-navigation";
import {HeaderBackButton} from "react-navigation-stack";
import VerifyEmail from "./VerifyEmail";
import VerifyMobile from "./VerifyMobile";
import Kyc from "./KYC";
import _ from "lodash";
import UploadID from "./UploadID";
import Button from "__src/components/Button";
import ProofAddress from "./ProofAddress";
import PropTypes from "prop-types";
import styles from "../../styles.css";
import Resource from "__src/resources";

const {Res} = Resource;

const customStyless = {
	stepIndicatorSize: 25,
	currentStepIndicatorSize: 30,
	separatorStrokeWidth: 1,
	currentStepStrokeWidth: 3,
	stepStrokeCurrentColor: "#eeb91a",
	stepStrokeWidth: 3,
	stepStrokeFinishedColor: "#eeb91a",
	stepStrokeUnFinishedColor: "#aaaaaa",
	separatorFinishedColor: "#eeb91a",
	separatorUnFinishedColor: "#aaaaaa",
	stepIndicatorFinishedColor: "#eeb91a",
	stepIndicatorUnFinishedColor: "#ffffff",
	stepIndicatorCurrentColor: "#ffffff",
	stepIndicatorLabelFontSize: 13,
	currentStepIndicatorLabelFontSize: 14,
	stepIndicatorLabelCurrentColor: "#eeb91a",
	stepIndicatorLabelFinishedColor: "#ffffff",
	stepIndicatorLabelUnFinishedColor: "#aaaaaa",
	labelColor: "#1f354f",
	labelSize: 11,
	currentStepLabelColor: "red",
};

class AccountVerification extends React.PureComponent {
	constructor(props){
		super(props);
		this.state = {
			currentPosition: 0,
		};

		this._didFocusSubscription = props.navigation.addListener("didFocus", () =>
			BackHandler.addEventListener("hardwareBackPress", this.onBackButtonPressAndroid)
		);
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: (<HeaderBackButton tintColor="white"
				onPress={navigation.getParam("logout")}/>),
		};
	};

	componentDidMount(){
		const {navigation} = this.props;

		navigation.setParams({ logout: this.onBackButtonPressAndroid });
	}

	componentWillUnmount() {
		this._didFocusSubscription && this._didFocusSubscription.remove();
		this._willBlurSubscription && this._willBlurSubscription.remove();
	}

	onBackButtonPressAndroid = () => {
		Alert.alert(
			"Notice",
			"Do you want to skip?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{text: "OK", onPress: () => this.logout()},
			],
			{cancelable: false},
		);
		
		return true;
	};

	logout = () => {
		const {login: {additionalDetails}, navigation, register: {isRegistered}} = this.props;

		if(_.has(additionalDetails,"individual")){
			if (additionalDetails.individual.birthPlace && additionalDetails.individual.streetAddress) {
				navigation.dispatch({type: "login/types/LOGIN_SUCCESS", data: isRegistered})
				navigation.navigate("Home");
				return;
			}
		}
	

		const resetAction = StackActions.reset({
		  index: 0,
		  key: null,
		  actions: [NavigationActions.navigate({routeName: "Login"})],
		});

		navigation.dispatch(resetAction);
	}
	
	_renderContent = () => {
		const { register: { currentStep } } = this.props;

		switch (currentStep) {
		case "emailVerification":
			return <VerifyEmail {...this.props}/>;
		case "kycForm":
			return <Kyc {...this.props}/>;
		case "mobileVerification":
			return <VerifyMobile {...this.props}/>;
		case "idAndSelfie":
			return <UploadID {...this.props}/>;
		case "proofOfAddressUpload":
			return <ProofAddress {...this.props}/>;
		case "verified":
			return this._renderVerified();
		default:
			break;
		}
	}
	
	back = () => {
		const {navigation} = this.props;

		navigation.goBack();
	}

	_renderVerified = () => (
  	<View style={styles.flex1mar30pad30}>
  		<View style={styles.flex1}>
  			<Image style={styles.imgsuccess} source={Res.get("check_icon")} resizeMode={"contain"} />
  			<Text style={styles.txtsuccess}>Account Verification Process is Completed.</Text>
  		</View>
			<View style={styles.marb20}>
				<Button
					onPress={this.back}
					style={styles.btnStyle2}
					label="Back"/>
			</View>
  	</View>
	);
	
	position = () => {
		const { register: { currentStep } } = this.props;

		switch (currentStep) {
		case "emailVerification":
			return 0;
		case "kycForm":
			return 1;
		case "mobileVerification":
			return 2;
		case "idAndSelfie":
			return 3;
		case "proofOfAddressUpload":
			return 4;
		case "verified":
			return 5;
		default:
			return 0;
		}
	}

	_renderHeaderContent = () => {
		const { register: { currentStep } } = this.props;

		switch (currentStep) {
		case "emailVerification":
			return "Step 1: Email Verification";
		case "kycForm":
			return "Step 2: Know Your Customer";
		case "mobileVerification":
			return "Step 3: Mobile Verification";
		case "idAndSelfie":
			return "Step 4: Upload ID and Selfie with ID";
		case "idAndSelfie2":
			return "Step 4: Upload Selfie with ID";
		case "proofOfAddressUpload":
			return "Step 5: Proof of Address Upload";
		}
	}
	
	render() {
		return (
			<View style={styles.flex1}>
				<View style={styles.card}>
					<StepIndicator
						customStyles={customStyless}
						currentPosition={this.position()} />
				</View>

				<Text style={styles.txtheader}>{this._renderHeaderContent()}</Text>

				<View style={styles.flex1}>
					{this._renderContent()}
				</View>
				<SafeAreaView style={styles.marb20}/>
			</View>
		);
	}
}

AccountVerification.propTypes = {
	actions: PropTypes.object,
	login: PropTypes.object,
	register: PropTypes.object,
	navigation: PropTypes.object,
};

export default AccountVerification;
