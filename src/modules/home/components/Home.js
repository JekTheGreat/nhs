/* eslint-disable */
import React from "react";
import { StatusBar, View, Alert, SafeAreaView, BackHandler, Dimensions, Platform } from "react-native";
import styles from "../styles.css";
import Loading from "__src/components/Loading";
import _ from "lodash";
import EditService from "./screens/EditService";
import ServiceContent from "./screens/ServiceContent";
import Animated from "react-native-reanimated";
import PropTypes from "prop-types";
import { State } from "react-native-gesture-handler";
import Resource from "__src/resources";
import { NavigationActions, StackActions } from 'react-navigation';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';

const { height } = Dimensions.get("window");
const SNAP_BOTTOM = height;

const { Color } = Resource;

export default class Home extends React.PureComponent {
	constructor(props) {
		super(props);

		this._didFocusSubscription = props.navigation.addListener("didFocus", () =>
			BackHandler.addEventListener("hardwareBackPress", this.onBackButtonPressAndroid)
		);

		this.goUp = new Animated.Value(0);
		this.goDown = new Animated.Value(0);
		this.offset = new Animated.Value(SNAP_BOTTOM);
		this.translationY = new Animated.Value(0);
		this.velocityY = new Animated.Value(0);
		this.state = new Animated.Value(State.UNDETERMINED);
	}

	componentDidMount() {
		const { home: { setCounter }, actions } = this.props;

		this._willBlurSubscription = this.props.navigation.addListener("willBlur", () =>
			BackHandler.removeEventListener("hardwareBackPress", this.onBackButtonPressAndroid)
		);
	}

	componentDidUpdate(prevProps) {
		const { login: { isUnauthorized } } = this.props;

		if (!_.isEqual(prevProps.login.isUnauthorized, isUnauthorized) && isUnauthorized) {
			Alert.alert("Session Expired!", "Your session is expired! Please re-login your account.",
				[{ text: "Ok", onPress: () => this.logout() }], { cancelable: false });
		}
	}

	componentWillUnmount() {
		this._didFocusSubscription && this._didFocusSubscription.remove();
		this._willBlurSubscription && this._willBlurSubscription.remove();
		this.goUp.setValue(0);
		this.offset.setValue(SNAP_BOTTOM);
	}

	onBackButtonPressAndroid = () => {
		Alert.alert(
			"Notice",
			"Want to sign out?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{ text: "OK", onPress: () => this.logout() },
			],
			{ cancelable: false },
		);

		return true;
	};

	logout = () => {
		const { actions, navigation, login } = this.props;

		const resetAction = StackActions.reset({
			index: 0,
			key: null,
			actions: [NavigationActions.navigate({ routeName: "Login" })],
		});

		actions.logout();
		navigation.dispatch(resetAction);
	}

	requestPermission = async (type) => {
		const { navigation } = this.props;
		if (type === "Android") {
			const res2 = await request(PERMISSIONS.ANDROID.READ_CONTACTS);
			if (res2 === RESULTS.GRANTED) {
				navigation.navigate("Loading", { title: "Buy Load" });
			} else {
				navigation.navigate("Loading", { title: "Buy Load" });
			}
		} else {
			const res2 = await request(PERMISSIONS.IOS.CONTACTS);
			if (res2 === RESULTS.GRANTED) {
				navigation.navigate("Loading", { title: "Buy Load" });
			} else {
				navigation.navigate("Loading", { title: "Buy Load" });
			}
		}
	}

	checkPermission = async () => {
		const { navigation } = this.props;
		if (_.isEmpty(this.state.contacts)) {
			if (Platform.OS === "android") {
				if (Platform.Version < 23) {
					console.log(Platform.Version);
					navigation.navigate("Loading", { title: "Buy Load" });
				} else {
					const res = await check(PERMISSIONS.ANDROID.READ_CONTACTS);
					if (res === RESULTS.GRANTED) {
						navigation.navigate("Loading", { title: "Buy Load" });
					} else if (res === RESULTS.BLOCKED) {
						navigation.navigate("Loading", { title: "Buy Load" });
					} else {
						this.requestPermission("Android");
					}
				}
			} else {
				const res = await check(PERMISSIONS.IOS.CONTACTS);
				if (res === RESULTS.GRANTED) {
					navigation.navigate("Loading", { title: "Buy Load" });
				} else if (res === RESULTS.BLOCKED) {
					navigation.navigate("Loading", { title: "Buy Load" });
				} else {
					this.requestPermission("IOS");
				}
			}
		}
	}

	click = (type) => {
		const { navigation, wallet: { walletSelected } } = this.props;

		switch (type) {
			case "Send Ecash":
				if (_.isEmpty(walletSelected)) {
					Alert.alert("Notice", "No wallet detected.");

					return;
				}
				// navigation.navigate("SendEcash", {title: type});
				navigation.navigate("EcashtoEcash", { title: "ECash to ECash" });
				break;
			case "Fund Request":
				navigation.navigate("FundRequest", { title: type });
				break;
			// case "Convert":
			// 	navigation.navigate("Conversion", {title: type});
			// 	break;
			case "Buy Load":
				this.checkPermission();
				break;
			// case "Book Flights":
			// 	navigation.navigate("Ticketing", {title: type});
			// 	break;
			case "Market Place":
				navigation.navigate("MarketPlaceMain");
				break;
			// case "Remittance":
			// 	navigation.navigate("Remittance", {title: type});
			// 	break;
			case "Pay Bills":
				navigation.navigate("BillsPaymentHome", { title: "Bills Payment" });
				break;
			case "QRCode":
				navigation.navigate("QRCode", { title: "QR CODE" });
				break;
			case "More":
			// navigation.navigate("OnlineStoreMain", {title: "Online Store"});
			// break;
			default:
				Alert.alert("Notice", "This service is under construction.");
				break;
		}
	}

	render() {
		const { goUp, goDown, offset, translationY, velocityY, state } = this;
		const { login: { isLoadDetails } } = this.props;

		if (isLoadDetails) {
			return <Loading size="small" color="black" />;
		}

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<StatusBar backgroundColor={Color.StatusBar} barStyle="light-content" />
					<ServiceContent onPress={this.click} {...this.props} />

					<EditService {...this.props}
						{...{ goUp, offset, goDown, translationY, velocityY, state }} />
				</View>
			</SafeAreaView>
		);
	}
}

Home.propTypes = {
	navigation: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
	wallet: PropTypes.object,
};
