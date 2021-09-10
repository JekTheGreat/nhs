/* eslint-disable max-len */
import React from "react";
import {ScrollView, View, Text, Image, StyleSheet, Alert} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import numeral from "numeral";
import Flights from "./Flights";
import ButtomScreen from "./ButtomScreen";
import FilterScreen from "./FilterScreen";
import InfoScreen from "./InfoScreen";
import Resource from "__src/resources";
const {Color, Res} = Resource;

class ChooseFlight extends React.PureComponent{
	state = {
		isFilterVisible: false, isInfoVisible: false,
		filter: "Any",
	}

	onSubmit = () => {
		const {actions, ticketing: {selectReturn, selectDeparture}, login: {session}} = this.props;
		const params = {
			flights: {onward: selectDeparture.ReferenceNumber, arrival: selectReturn.ReferenceNumber},
			trackingNumber: selectReturn.TrackingNumber,
		};
		if (_.isEmpty(selectReturn)){
			Alert.alert("Notice", "Please select return flight.");
			
			return;
		}
		
		actions.getSelectFares(params, session.token, "PassengerScreen");
	}

	onInfoPress = () => {
		const {ticketing: {selectReturn}} = this.props;

		if (_.isEmpty(selectReturn)){
			Alert.alert("Notice", "Please select return flight.");
			
			return;
		}
		this.setState({isInfoVisible: true});
	}

	render(){
		const {ticketing: {setTicketingInput, selectReturn, selectDeparture}} = this.props;
		const {isFilterVisible, isInfoVisible} = this.state;

		if (_.isEmpty(setTicketingInput.origin)){
			return null;
		}
		const originCity = setTicketingInput.destination.location.split(",");
		const desCity = setTicketingInput.origin.location.split(",");
		const DepartAmount  = _.has(selectDeparture, "AirItineraryPricingInfo.TotalFare") ?
		 selectDeparture.AirItineraryPricingInfo.TotalFare.Amount : 0;
		const Return  = _.has(selectReturn, "AirItineraryPricingInfo.TotalFare") ?
			selectReturn.AirItineraryPricingInfo.TotalFare : {};
		const TotalAmount = _.add(DepartAmount, Return.Amount);
		
		return (
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle}>
					<Text style={styles.txtDepartureHeader}>RETURN</Text>
					<View style={styles.view1}>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{setTicketingInput.destination.iata}</Text>
							<Text style={styles.txtCountry}>{originCity[originCity.length - 1].trim()}</Text>
						</View>
						<Image style={styles.imageDepart} source={Res.get("Departure")} resizeMode="contain"/>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{setTicketingInput.origin.iata}</Text>
							<Text style={styles.txtCountry}>{desCity[desCity.length - 1].trim()}</Text>
						</View>
					</View>
					<Text style={styles.txtDepartureHeader2}>SELECT A FLIGHT</Text>
					<Flights {...this.props} filter={this.state.filter}/>
				</ScrollView>
				<ButtomScreen disabled={_.isEmpty(selectReturn)} amount={`${Return.CurrencyCode || ""} ${numeral(TotalAmount).format("0,000.00")}`}
					onFilterPress={() => this.setState({isFilterVisible: true})} buttonLabel="Continue"
					onInfoPress={this.onInfoPress} onSubmit={this.onSubmit} filter={this.state.filter}/>
				<FilterScreen visible={isFilterVisible} onItemClick={(e) => this.setState({filter: e})}
					onClose={() => this.setState({isFilterVisible: false})} />
				<InfoScreen visible={isInfoVisible} onItemClick={(e) => console.log(e)}
					onClose={() => this.setState({isInfoVisible: false})} {...this.props}/>
			</View>
		);
	}
}

ChooseFlight.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1},
	scrollStyle: {flex: 1, backgroundColor: Color.bg2, paddingHorizontal: 10},
	txtDepartureHeader: {fontFamily: "Montserrat-Medium", fontSize: 25, color: Color.colorPrimary, textAlign: "center", marginTop: 20},
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 20},
	viewCenter: {alignItems: "center"},
	txtIata: {fontFamily: "Montserrat-Medium", fontSize: 20, color: Color.Header},
	txtCountry: {fontFamily: "Montserrat-Medium", fontSize: 12, color: Color.Header},
	imageDepart: {width: 20, height: 20, marginHorizontal: 30},
	txtDepartureHeader2: {fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header, textAlign: "center"},
});

export default ChooseFlight;
