/* eslint-disable max-len */
import React from "react";
import {ScrollView, View, Text, StyleSheet, Alert} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import numeral from "numeral";
import ButtomScreen from "../passenger/ButtomScreen";
import InfoScreen from "../chooseflight/InfoScreen";
import AddOnItem from "./AddOnItem";
import BaggageScreen from "./BaggageScreen";
import SeatScreen from "./SeatScreen";
import Resource from "__src/resources";
const {Color} = Resource;

class AddOnScreen extends React.PureComponent{
	state = {
		isInfoVisible: false,
		isBaggageVisible: false,
		isSeatVisible: false,
	}

	componentDidMount(){
		const {ticketing: {selectDeparture, selectReturn}, actions} = this.props;
		
  	if (!_.isEmpty(selectDeparture.FlightSegments)){
			_.map(selectDeparture.FlightSegments, (item) => {
				const dep = item.DepartureStation;
				const ret = item.ArrivalStation;
				const newData = {};
				newData[`${dep}${ret}`] = [];
	
				actions.setPassengerDefaultAddOns(newData);
				if (selectDeparture.BaggageType === "PerSegment"){
					actions.setPassengerDefaultBaggage(newData);
				}
			});
		}
		
		if (!_.isEmpty(selectDeparture.FlightSegments) && selectDeparture.BaggageType === "PerWay"){
			const length = selectDeparture.FlightSegments.length;
			const dep = selectDeparture.FlightSegments[0].DepartureStation;
			const ret = selectDeparture.FlightSegments[length - 1].ArrivalStation;
			const newData = {};
			newData[`${dep}${ret}`] = [];
	
			actions.setPassengerDefaultBaggage(newData);
		}
		
		if (!_.isEmpty(selectReturn.FlightSegments)){
			_.map(selectReturn.FlightSegments, (item) => {
				const dep = item.DepartureStation;
				const ret = item.ArrivalStation;
				const newData = {};
				newData[`${dep}${ret}`] = [];
	
				actions.setPassengerDefaultAddOns(newData);
				if (selectReturn.BaggageType === "PerSegment"){
					actions.setPassengerDefaultBaggage(newData);
				}
			});
		}
		
		if (!_.isEmpty(selectReturn.FlightSegments) && selectReturn.BaggageType === "PerWay"){
			const length = selectReturn.FlightSegments.length;
			const dep = selectReturn.FlightSegments[0].DepartureStation;
			const ret = selectReturn.FlightSegments[length - 1].ArrivalStation;
			const newData = {};
			newData[`${dep}${ret}`] = [];
	
			actions.setPassengerDefaultBaggage(newData);
		}
	}

	onSubmit = () => {
		const {actions} = this.props;

		actions.setScreen("PaymentScreen");
	}

	onSeatPress = () => {
		this.setState({isSeatVisible: true});
	}

	getTotalAmount = () => {
		const {ticketing: {selectDeparture, selectReturn}} = this.props;
		const TotalDep  = _.has(selectDeparture, "AirItineraryPricingInfo.TotalFare") ?
			selectDeparture.AirItineraryPricingInfo.TotalFare : 0;
		const TotalRet  = _.has(selectReturn, "AirItineraryPricingInfo.TotalFare") ?
			selectReturn.AirItineraryPricingInfo.TotalFare.Amount : 0;

		return {currency: TotalDep.CurrencyCode, amount: TotalDep.Amount + TotalRet};
	}

	getTotalSeat = () => {
		const {ticketing: {setSeat}} = this.props;
		let TotalSeat = 0;

		Object.keys(setSeat).map((seat) => {
			TotalSeat += _.sumBy(setSeat[seat], (item) => {
				return item.ServiceCharge.TotalAmount;
			});

			return null;
		});

		return TotalSeat;
	}


	getTotalBaggage = () => {
		const {ticketing: {setBaggage}} = this.props;
		let TotalBaggage = 0;

		Object.keys(setBaggage).map((bag) => {
			TotalBaggage += _.sumBy(setBaggage[bag], "Amount");

			return null;
		});

		return TotalBaggage;
	}

	onNoData = () => {
		Alert.alert("Notice", "This service is under construction.");
	}

	render(){
		const {ticketing: {setTicketingInput, setBaggage, setSeat}} = this.props;
		const {isBaggageVisible, isInfoVisible, isSeatVisible} = this.state;

		if (_.isEmpty(setTicketingInput.origin)){
			return null;
		}
		const {currency, amount} = this.getTotalAmount();
		const TotalBaggage = this.getTotalBaggage();
		const TotalSeat = this.getTotalSeat();

		return (
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle}>
					<Text style={styles.txtDepartureHeader}>ADD-ONS</Text>
					<Text style={[styles.txtDepartureHeader2, styles.marT20, styles.marB10]}>ADD THESE PRODUCTS TO YOUR BOOKING</Text>

					<AddOnItem onPress={() => this.setState({isBaggageVisible: true})} isActive={TotalBaggage > 0}
						setBaggage={setBaggage}
						title="Baggage Allowance" res="bag" subtitle="Choose your baggage allowance to steer clear of airport excess baggage fees!"/>
					
					<AddOnItem onPress={this.onSeatPress} setSeat={setSeat} isActive={TotalSeat > 0}
						title="Seat Selector" res="seat"
						subtitle="Window or aisle seat? Want to sit with your group or get extra leg room? Select a seat now!"/>
						
					<AddOnItem onPress={this.onNoData} title="Select a Meal" res="meal" subtitle="Don't go hungry on your flight! Inflight meals are only available for pre-order!"/>
					<AddOnItem onPress={this.onNoData} title="Travel Insurance" res="travel" subtitle="Go on a worry-free adventure when you're covered with Travelsure!"/>

					<View style={styles.height30}/>
				</ScrollView>
				<ButtomScreen currency={currency} amount={numeral(amount + TotalBaggage + TotalSeat).format("0,000.00")}
					buttonLabel="Continue" onFilterPress={() => this.setState({isFilterVisible: true})}
					onInfoPress={() => this.setState({isInfoVisible: true})} onSubmit={this.onSubmit} />
				<InfoScreen visible={isInfoVisible} onItemClick={(e) => console.log(e)}
					onClose={() => this.setState({isInfoVisible: false})} {...this.props}/>
				<BaggageScreen isVisible={isBaggageVisible} onClose={() => this.setState({isBaggageVisible: false})} {...this.props}/>
				<SeatScreen isVisible={isSeatVisible} onClose={() => this.setState({isSeatVisible: false})} {...this.props}/>
			</View>
		);
	}
}

AddOnScreen.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1},
	scrollStyle: {flex: 1, backgroundColor: Color.bg2, paddingHorizontal: 20},
	txtDepartureHeader: {fontFamily: "Montserrat-Medium", fontSize: 25, color: Color.colorPrimary, textAlign: "center", marginTop: 20},
	txtDepartureHeader2: {fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header, textAlign: "center"},
	marT20: {marginTop: 20},
	marB10: {marginBottom: 10},
	height30: {height: 30},
});

export default AddOnScreen;
