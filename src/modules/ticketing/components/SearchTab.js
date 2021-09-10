/* eslint-disable max-len */
// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Alert, ScrollView, SafeAreaView,
	StatusBar, Image, Text} from "react-native";
import Resource from "__src/resources";
import _ from "lodash";
import {uid} from "../api/Uniqid";
import {HeaderBackButton} from "react-navigation-stack";
import styles from "../styles.css";
import Button from "__src/components/Button";
import ChooseFlightOnward from "./screens/chooseflight/ChooseFlightOnward";
import ChooseFlightReturn from "./screens/chooseflight/ChooseFlightReturn";
import PassengerScreen from "./screens/passenger/PassengerScreen";
import ContactScreen from "./screens/contactinfo/ContactScreen";
import ClassScreen from "./screens/class/ClassScreen";
import SearchScreen from "./screens/search/SearchScreen";
import AddOnScreen from "./screens/addson/AddOnScreen";
import PaymentScreen from "./screens/payment/PaymentScreen";
import InputFields from "./screens/InputFields";
import CircularScreen from "./screens/search/CircularScreen";
import PropTypes from "prop-types";
const {Color, Res} = Resource;

export default class SearchTab extends PureComponent {
	constructor(props){
		super(props);
		this.state = {
			showSearch: false,
			showClass: false,
			FromTo: null,
		};
	}

	static navigationOptions = ({ navigation }) => {
		return {
			headerTitle: "Ticketing",
			headerLeft: (<HeaderBackButton tintColor="white"
				onPress={navigation.getParam("onBack")}/>),
		};
	};

	componentDidMount(){
		const {navigation} = this.props;

		navigation.setParams({ onBack: this.onBack });
	}

	componentDidUpdate(prevProps){
		const {ticketing: {SearchFlightFailed}} = this.props;

		if (!_.isEqual(prevProps.ticketing.SearchFlightFailed, SearchFlightFailed) && !_.isEmpty(SearchFlightFailed)){
			setTimeout(() => {
				Alert.alert("Notice", SearchFlightFailed);
			}, 10);
		}
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
	}

	onShowSearch = (value) => {
		this.setState({showSearch: true, FromTo: value});
	}
	
	onShowClass = () => {
		this.setState({showClass: true});
	}

	onSubmit = () => {
		const {ticketing: {setTicketingInput}, actions, login: {session, additionalDetails}} = this.props;
		const utcDate = `ETN${uid(12).toUpperCase()}`;
		const originDestination = [{
			origin: setTicketingInput.origin.iata,
			destination: setTicketingInput.destination.iata,
			departureDate: setTicketingInput.departure,
		}];

		if (setTicketingInput.flightTripType === "Return"){
			originDestination.push({
				origin: setTicketingInput.destination.iata,
				destination: setTicketingInput.origin.iata,
				departureDate: setTicketingInput.return,
			});
		}
		const params = {
			adults: setTicketingInput.adults,
			children: setTicketingInput.children,
			infants: setTicketingInput.infants,
			seniors: setTicketingInput.seniors,
			bookingClass: setTicketingInput.bookingClass,
			airlines: ["ALL"],
			flightTripType: setTicketingInput.flightTripType,
			flightType: setTicketingInput.flightType,
			trackingNumber: utcDate,
			originDestination,
			bookformyself: setTicketingInput.bookformyself,
		};

		actions.searchFlight(params, session.token, additionalDetails.individual);
	}

	onCheckPress = () => {
		const {ticketing: {setTicketingInput}, actions} = this.props;
		const newInput = _.merge({}, setTicketingInput);

		newInput.bookformyself = !setTicketingInput.bookformyself;
		newInput.adults = 1;
		newInput.children = 0;
		newInput.infants = 0;
		newInput.seniors = 0;
		actions.setTicketingInput(newInput);
	}

	renderSearch(){
		const {showSearch, showClass, FromTo} = this.state;

  	return (
			<View style={styles.container}>
				<StatusBar backgroundColor={Color.StatusBar} barStyle="light-content" />
				<ScrollView showsVerticalScrollIndicator={false}
					style={[styles.flex1, styles.padH20]}>
					<View style={[styles.flex1]}>
						<Image style={styles.imageBaggage} source={Res.get("baggage")} resizeMode="stretch"/>
						<Text style={styles.txtHeader}>BOOK DOMESTIC AND INTERNATIONAL FLIGHTS</Text>
						<Text style={styles.txtSubHeader}>FLY AT LOWEST AIRFARE WITH LOW-COST FLIGHTS HURRY AND BOOK YOUR TICKET NOW!</Text>
					</View>
					<InputFields onDeparturePress={this.onShowSearch} onReturnPress={this.onShowSearch}
						onClassPress={this.onShowClass} {...this.props} onCheckPress={this.onCheckPress} fullname={this.state.fullname}/>

					<Button
						style={styles.btnSearch}
						label="Search Flights"
						onPress={this.onSubmit}
						labelStyle={styles.labelStyle}/>
					<SearchScreen FromTo={FromTo} visible={showSearch} onClose={() => this.setState({showSearch: false})} {...this.props}/>
					<ClassScreen visible={showClass} onClose={() => this.setState({showClass: false})} {...this.props}/>
				</ScrollView>
			</View>
  	);
	}

	renderScreen(){
		const {ticketing: {setScreen}} = this.props;

		switch (setScreen){
		case "OnwardScreen":
			return <ChooseFlightOnward {...this.props} />;
		case "ReturnScreen":
			return <ChooseFlightReturn {...this.props} />;
		case "PassengerScreen":
			return <PassengerScreen {...this.props} />;
		case "ContactScreen":
			return <ContactScreen {...this.props} />;
		case "AddOnScreen":
			return <AddOnScreen {...this.props} />;
		case "PaymentScreen":
			return <PaymentScreen {...this.props} />;
		default:
			return this.renderSearch();
		}
	}

	render(){
		const {ticketing: {isSearchingFlights, setTicketingInput}} = this.props;

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.container}>
					<StatusBar backgroundColor={Color.StatusBar} barStyle="light-content" />
					{this.renderScreen()}
				</View>
				<CircularScreen visible={isSearchingFlights} setInput={setTicketingInput} />
			</SafeAreaView>
		);
	}
}

SearchTab.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
	navigation: PropTypes.object,
};
