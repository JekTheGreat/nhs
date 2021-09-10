/* eslint-disable max-len */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, SafeAreaView, StyleSheet, BackHandler, Text, Alert} from "react-native";
import Resource from "__src/resources";
import {Tab, Tabs} from "native-base";
import PropTypes from "prop-types";
import SearchTab from "./SearchTab";
import _ from "lodash";
import {HeaderBackButton} from "react-navigation-stack";
import TicketLogTab from "./TicketLogTab";
import MarkUpTab from "./MarkUpTab";
const {Color} = Resource;

class TicketingScreen extends PureComponent {
	interval = null;
	state = {
		seconds: -1,
	}

	static navigationOptions = ({ navigation }) => {
		const time = new Date(null);
		time.setSeconds(navigation.getParam("counter") || 0);

		return {
			headerTitle: "Ticketing",
			headerLeft: () => (<HeaderBackButton tintColor="white"
				onPress={navigation.getParam("onBack")} label=" "/>),
			headerRight: () => (navigation.getParam("isShow") && <Text style={styles.txtTimer}>{time.getMinutes()}:{time.getSeconds()}</Text>),
		};
	};


	componentDidMount(){
		const {navigation} = this.props;

		navigation.setParams({ onBack: this.onBack });
		this._willBlurSubscription = navigation.addListener("willBlur", () =>
			BackHandler.removeEventListener("hardwareBackPress", this.onBack)
		);
	}

	componentDidUpdate(prevProps, prevState){
		const {ticketing: {setScreen}, actions} = this.props;
		const {seconds} = this.state;

		if (!_.isEqual(prevProps.ticketing.setScreen, setScreen) && this.interval === null){
			if (_.isEmpty(setScreen) || setScreen === "Success"){
				clearInterval(this.interval);
				this.interval = null;
			} else {
				this.countDown();
			}
		}

		if (!_.isEqual(prevProps.ticketing.setScreen, setScreen) && _.isEmpty(setScreen)){
			clearInterval(this.interval);
			this.interval = null;
		}

		if (!_.isEqual(prevState.seconds, seconds) && seconds === -1) {
			Alert.alert("Booking Expired.", "Booking Session has been expired. Please search again");
			// clearInterval(this.interval);
			// this.interval = null;
			// actions.setScreen("");
		}
	}

	countDown = () => {
		const {navigation} = this.props;
		const countDownDate = new Date().getTime() + 600100;
		let seconds = 0;

		this.interval = setInterval(() => {
			const now = new Date().getTime();
			const distance = countDownDate - now;

			seconds = Math.floor((distance % (1000 * 600)) / 1000);

			if (seconds < 0) {
				clearInterval(this.interval);
				this.interval = null;
				this.setState({seconds});
				navigation.setParams({ counter: seconds, isShow: false });
			} else {
				this.setState({seconds});
				navigation.setParams({ counter: seconds, isShow: true});
			}
		}, 1000);
	}

	componentWillUnmount() {
		// this._didFocusSubscription && this._didFocusSubscription.remove();
		this._willBlurSubscription && this._willBlurSubscription.remove();
		clearInterval(this.interval);
	}

	onBack = () => {
		const {ticketing: {setScreen, setTicketingInput}, actions, navigation} = this.props;

		switch (setScreen){
		case "OnwardScreen":
			actions.setScreen("");
			break;
		case "ReturnScreen":
			actions.setScreen("OnwardScreen");
			break;
		case "PassengerScreen":
			const screen = setTicketingInput.flightTripType === "OneWay" ? "OnwardScreen" : "ReturnScreen";

			actions.setScreen(screen);
			break;
		case "ContactScreen":
			actions.setScreen("PassengerScreen");
			break;
		case "AddOnScreen":
			actions.setScreen("ContactScreen");
			break;
		case "PaymentScreen":
			actions.setScreen("AddOnScreen");
			break;
		default:
			navigation.goBack();
			break;
		}

		return true;
	}

	render(){
		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<Tabs
						tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
						style={styles.TabsStyle}
						tabBarActiveTextColor={Color.colorPrimary}
						tabBarInactiveTextColor={Color.Standard2}>
						<Tab
							heading={"Search"}
							tabStyle={styles.tabStyle}
							textStyle={styles.textStyle}
							activeTextStyle={styles.activeTextStyle}
							activeTabStyle={{backgroundColor: Color.white}}>
							<SearchTab {...this.props}/>
						</Tab>
						<Tab
							heading={"Ticket Logs"}
							tabStyle={styles.tabStyle}
							textStyle={styles.textStyle}
							activeTextStyle={styles.activeTextStyle}
							activeTabStyle={{backgroundColor: Color.white}}>
							<TicketLogTab {...this.props}/>
						</Tab>
						<Tab
							heading={"Markup"}
							tabStyle={styles.tabStyle}
							textStyle={styles.textStyle}
							activeTextStyle={styles.activeTextStyle}
							activeTabStyle={{backgroundColor: Color.white}}>
							<MarkUpTab {...this.props}/>
						</Tab>
					</Tabs>
  			</View>
  		</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {flex: 1, backgroundColor: Color.bg},
	tabBarUnderlineStyle: {height: 1, backgroundColor: Color.colorPrimary},
	tabStyle: {backgroundColor: Color.white},
	TabsStyle: {backgroundColor: Color.white, alignItems: "center", justifyContent: "center"},
	textStyle: {color: Color.Standard2, fontFamily: "Roboto", fontSize: 11},
	activeTextStyle: {color: Color.colorPrimary, fontFamily: "Roboto", fontSize: 12},
	txtTimer: {fontFamily: "Roboto-Light", color: Color.Standard, fontSize: 15, marginRight: 6},
});

TicketingScreen.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
};

export default TicketingScreen;
