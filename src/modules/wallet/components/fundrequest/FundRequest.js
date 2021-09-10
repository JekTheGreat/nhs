
/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, BackHandler,
	TouchableNativeFeedback, Platform, Alert, StatusBar, Image, Dimensions} from "react-native";
import Resource from "__src/resources";
import {Card} from "native-base";
import PropTypes from "prop-types";
import BankDepositInput from "./bankdeposit/BankDepositInput";
import BankDepositPayment from "./bankdeposit/BankDepositPayment";
import BankDepositConfirm from "./bankdeposit/BankDepositConfirm";
import {HeaderBackButton} from "react-navigation-stack";
import UnifiedInput from "./unified/UnifiedInput";
import UnifiedPayment from "./unified/UnifiedPayment";
import _ from "lodash";

const {width} = Dimensions.get("window");
const {Res, Color} = Resource;
const data = [
	{
		description: "Bank Deposit",
		subdescription:  <Text>Within<Text style={{color: Color.Standard2}}> 24 hours </Text>after payment </Text>,
	  icon: "bank",
	}, {
		description: "Unified Outlet",
		subdescription: <Text><Text style={{color: Color.Standard2}}>Instant </Text>after payment</Text>,
	  icon: "ups",
	},
];

// {
// 	description: "Drgagonpay",
// 	subdescription:  <Text><Text style={{color: Color.Standard2}}>Instant </Text>after payment</Text>,
// 	icon: "dragonpay",
// }, {
// 	description: "Debit / Credit Card",
// 	subdescription: <Text><Text style={{color: Color.Standard2}}>Instant </Text>after payment</Text>,
// 	icon: "credit_debit",
// },

export default class FundRequest extends PureComponent {
	constructor(props){
		super(props);

		this._didFocusSubscription = props.navigation.addListener("didFocus", () =>
			BackHandler.addEventListener("hardwareBackPress", this.onBack)
		);
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerLeft: () => (<HeaderBackButton tintColor="white"
				onPress={navigation.getParam("goback")}/>)
		}
	};

	componentDidMount(){
		const { navigation, wallet: {setHeaderTitle}, login: {currentAccount} } = this.props;

		this._willBlurSubscription = this.props.navigation.addListener("willBlur", () =>
			BackHandler.removeEventListener("hardwareBackPress", this.onBack)
		);
		navigation.setParams({ goback: this.onBack });

		if(setHeaderTitle){
			navigation.setParams({ title: setHeaderTitle });
		}
		if (_.isEmpty(currentAccount.id)){
			actions.getUserAccount(session.token);
		}
	}

	componentWillUnmount() {
		this._didFocusSubscription && this._didFocusSubscription.remove();
		this._willBlurSubscription && this._willBlurSubscription.remove();
	}


	onBack = () => {
		const {actions, navigation} = this.props;

		actions.setRequestScreenHeader({amount: false, payment: false});
		actions.resetRequest();
		navigation.goBack();
	}
  
	_onClick = (item) => {
		const {navigation, actions, wallet: { requestScreenHeader } } = this.props;
		const nodeId = item.description;
		requestScreenHeader.amount = true;
		actions.setHeaderTitle(nodeId);
		actions.setRequestScreenHeader(requestScreenHeader);

		if (nodeId === "Bank Deposit") {
			navigation.setParams({ title: nodeId });
			actions.setRequestScreen("bankDepositInput");
		} else if (nodeId === "Unified Outlet") {
			navigation.setParams({ title: nodeId });
			actions.setRequestScreen("unifiedInput");
		} else {
			Alert.alert("Notice", "This service is yet unavailable.");
		}
	}
  
  _proceedToMethod = () => {
  	const {navigation,actions, wallet: { requestScreenHeader } } = this.props;

  	requestScreenHeader.amount = false;
  	requestScreenHeader.payment = false;
		navigation.setParams({ title: "Fund Request" });
  	actions.setHeaderTitle("Fund Request");
  	actions.setRequestScreen("chooseMethod");
		actions.setRequestScreenHeader(requestScreenHeader);
  }

  _proceedToAmount = () => {
  	const { actions, wallet: { requestScreenHeader, setHeaderTitle } } = this.props;

  	if (!requestScreenHeader.amount){
  		return;
  	}

  	requestScreenHeader.amount = true;
  	requestScreenHeader.payment = false;
		actions.setRequestScreenHeader(requestScreenHeader);
		
		if (setHeaderTitle === "Bank Deposit") {
			actions.setRequestScreen("bankDepositInput");
		} else if (setHeaderTitle === "Unified Outlet") {
			actions.setRequestScreen("unifiedInput");
		} 
  }
  
  renderSteps = () => {
  	const { wallet: { requestScreenHeader } } = this.props;
  	let step2 = Res.get("process2_nonactive");
  	let step3 = Res.get("process3_nonactive");

  	if (requestScreenHeader.amount) {
  		step2 = Res.get("process2_active");
  	}

  	if (requestScreenHeader.payment) {
  		step3 = Res.get("process3_active");
  	}
  
  	return (
  		<View style={styles.stepWrapper}>
				<Image style={styles.stepImg} source={Res.get("process1_active")} resizeMode="contain"/>
				<Image style={styles.stepImg} source={step2} resizeMode="contain"/>
  			<Image style={styles.stepImg} source={step3} resizeMode="contain"/>
  		</View>
  	);
  }

  renderChildren = () => {
  	const { wallet: { requestScreen } } = this.props;

  	switch ( requestScreen ) {
  	case "gprs":
  		return this._renderGPRSUnified();
  	case "gprsPayment":
  		return this._renderGPRSPayment();
  	case "bankDepositInput":
  		return <BankDepositInput { ...this.props } />;
  	case "bankDepositPayment":
  		return <BankDepositPayment { ...this.props } />;
  	case "bankDepositConfirm":
			return <BankDepositConfirm { ...this.props } />;

		case "unifiedInput":
  		return <UnifiedInput {...this.props}/>;
		case "unifiedPayment":
  		return <UnifiedPayment {...this.props}/>;
  	case "chooseMethod":
  	default:
  		return this._renderChooseMethod();
  	}
  }
	
  _renderChooseMethod =() => {
  	return (
  		<FlatList
				showsVerticalScrollIndicator={false}
				style={styles.flatlist}
				data={data}
				renderItem={this._renderList.bind(this)}
				keyExtractor={(item, index) => `idx ${index}`} />
  	);
	}
	
	_renderList({item, index}) {
  	const Button = Platform.OS === "ios" ? TouchableOpacity : TouchableNativeFeedback;

  	return (
  		<Button activeOpacity={0.6} key={`idx ${index}`} onPress={() => this._onClick(item)}>
  			<Card elevation={3} style={styles.elevateContainer}>
  				<Image style={styles.imageLogo} source={Res.get(item.icon)} resizeMode={"contain"} />
  				<View style={styles.viewBalanceContainer}>
  					<Text adjustsFontSizeToFit style={styles.textdescription}>
  						{item.description}
  					</Text>
  					<Text style={styles.textUpdate}>
  						{item.subdescription}
  					</Text>
  				</View>
  			</Card>
  		</Button>
  	);
	}

	render() {
  	return (
  		<View style={styles.container}>
  			<StatusBar barStyle="light-content" backgroundColor={Color.Header} />
  			{this.renderSteps()}
				{this.renderChildren()}
				<SafeAreaView style={{backgroundColor: Color.gray06}} />
  		</View>
  	);
	}
}
FundRequest.propTypes = {
	navigation: PropTypes.object,
	wallet: PropTypes.object,
	actions: PropTypes.object,
};
const styles = StyleSheet.create({
	container: {flexShrink: 1, width: "100%", height: "100%", backgroundColor: Color.bg},
	elevateContainer: {borderRadius: 5, backgroundColor: "#FFF", height: 100, marginTop: 10, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-between"},
	imageLogo: {alignSelf: "center", width: 80, height: 80},
	viewBalanceContainer: {flexDirection: "column"},
	textdescription: {fontSize: 15, color: Color.DarkBG, fontWeight: "bold", textAlign: "right"},
	textUpdate: {fontSize: 11, marginTop: 5, color: Color.LightDark, textAlign: "right"},
	flatlist: {paddingHorizontal: 20},
	stepWrapper: {flexDirection: "row", paddingHorizontal: 20, paddingVertical: 10, alignItems: "center", justifyContent: "center"},
	stepImg: {width: (width - 40) / 3, height: 40 },
});
