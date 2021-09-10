/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import React from "react";
import {ScrollView, View, Text, StyleSheet, Alert} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import numeral from "numeral";
import CreditCardScreen from "./CreditCardScreen";
import WalletScreen from "./WalletScreen";
import PartnerScreen from "./PartnerScreen";
import ButtomScreen from "../passenger/ButtomScreen";
import PaymentTabOption from "./PaymentTabOption";
import ScrollableTabView from "react-native-scrollable-tab-view";
import InfoScreen from "./InfoScreen";
import SuccessScreen from "./Success";
import * as globals from "__src/globals";
import Resource from "__src/resources";
const {Color} = Resource;

class PaymentScreen extends React.PureComponent{
	state = {
		isInfoVisible: false,
		isBaggageVisible: false,
		isSeatVisible: false, isVisible: false,
		currency: "PHP", transpass: "", transpassErr: "",
	}

	componentDidUpdate(prevProps){
		const {ticketing: {BookFailed}} = this.props;

		if (!_.isEqual(prevProps.ticketing.BookFailed, BookFailed) && !_.isEmpty(BookFailed)){
			Alert.alert(BookFailed.message, BookFailed.subMessage);
		}
	}

	onTransPass = () => {
		this.setState({isVisible: true});
	}

	onSubmit = () => {
		const {actions, ticketing: {setContactPerson, setPassengers, setSeat,
			selectDeparture, selectReturn, setBaggage}} = this.props;
		const newPassenger = [];

		if (_.isEmpty(this.state.transpass)){
			this.setState({transpassErr: "This field is required."});

			return;
		}

		actions.setBookLoad();
		_.map(setPassengers, (item) => {
			const document = {type: item.document || "",
				expirationDate: item.expirationDate || "",
				number: item.number || "",
				country: item.country || ""};
			const ancillaries = {baggages: {onward: {}, return: {}}, seatMap: {}};

			Object.keys(setSeat).map((seat) => {
				const seatResult = _.filter(setSeat[seat], {id: item.id});

				if (seatResult.length > 0){
					ancillaries.seatMap[seat] = {
						SeatDesignator: seatResult[0].SeatDesignator,
						TotalAmount: seatResult[0].ServiceCharge.TotalAmount,
						Amount: seatResult[0].ServiceCharge.Amount,
						Tax: seatResult[0].ServiceCharge.Tax,
						Provider: seatResult[0].Provider,
						Journey: seatResult[0].flightType === "onward" ? "DEPART" : "RETURN",
					};
				}
			});

			if (!_.isEmpty(selectDeparture)){
				ancillaries.baggages.onward.type = selectDeparture.BaggageType;
				Object.keys(setBaggage).map((bag) => {
					const bagResult = _.filter(setBaggage[bag], {id: item.id});
	
					if (bagResult.length > 0){
						if (bagResult[0].flightType === "onward"){
							ancillaries.baggages.onward[bag] = {
								Key: bagResult[0].Key,
								Code: bagResult[0].Code,
								Amount: bagResult[0].Amount,
								Provider: bagResult[0].Provider,
							};
						}
					}
				});
			}

			if (!_.isEmpty(selectReturn)){
				ancillaries.baggages.return.type = selectReturn.BaggageType;
				Object.keys(setBaggage).map((bag) => {
					const bagResult = _.filter(setBaggage[bag], {id: item.id});
	
					if (bagResult.length > 0){
						if (bagResult[0].flightType === "return"){
							ancillaries.baggages.return[bag] = {
								Key: bagResult[0].Key,
								Code: bagResult[0].Code,
								Amount: bagResult[0].Amount,
								Provider: bagResult[0].Provider,
							};
						}
					}
				});
			}

			const passenger = {
				id: item.id,
				type: item.type,
				firstName: item.firstName,
				middleName: item.middleName,
				lastName: item.lastName,
				suffix: item.suffix,
				birthdate: item.birthdate,
				gender: item.gender,
				nationality: item.nationality,
			};

			newPassenger.push({...passenger, document, ancillaries});
		});

		const params = {
			trackingNumber: selectDeparture.TrackingNumber,
			flights: {onward: selectDeparture.ReferenceNumber, arrival: selectReturn.ReferenceNumber},
			originDestinations: [],
			currency: this.state.currency,
			contactPerson: setContactPerson,
			payment: "WALLET",
			passengers: newPassenger,
			transactionPassword: this.state.transpass,
		};

		actions.bookNow(params);
	}

	getTotalAmount = () => {
		const {ticketing: {selectDeparture, selectReturn}} = this.props;
		const TotalDep  = _.has(selectDeparture, "AirItineraryPricingInfo.TotalFare") ?
			selectDeparture.AirItineraryPricingInfo.TotalFare : 0;
		const TotalRet  = _.has(selectReturn, "AirItineraryPricingInfo.TotalFare") ?
			selectReturn.AirItineraryPricingInfo.TotalFare.Amount : 0;

		return {currency: TotalDep.CurrencyCode, amount: TotalDep.Amount + TotalRet};
	}

	getTotalBaggage = (selected) => {
		const {ticketing: {setBaggage}} = this.props;
		let TotalBaggage = 0;

		if (selected){
			_.map(selected.FlightSegments, (segment) => {
				const dep = segment.DepartureStation;
				const ret = segment.ArrivalStation;

				TotalBaggage += _.sumBy(setBaggage[`${dep}${ret}`], "Amount");
			});
		}
		
		return TotalBaggage;
	}

	getTotalSeat = (selected) => {
		const {ticketing: {setSeat}} = this.props;
		let TotalSeat = 0;

		if (selected){
			_.map(selected.FlightSegments, (segment) => {
				const dep = segment.DepartureStation;
				const ret = segment.ArrivalStation;

				TotalSeat += _.sumBy(setSeat[`${dep}${ret}`], (seat) => {
					return seat.ServiceCharge.TotalAmount;
				});
			});
		}

		return TotalSeat;
	}

	render(){
		const {ticketing: {isBookingNow, selectDeparture, selectReturn, BookSuccess}, actions} = this.props;
		const {isVisible, transpass, transpassErr} = this.state;

		// return <SuccessScreen />;

		const {currency, amount} = this.getTotalAmount();
  	const TotalDeptBaggage = this.getTotalBaggage(selectDeparture);
		const TotalDeptSeat = this.getTotalSeat(selectDeparture);
		const TotalReturnBaggage = this.getTotalBaggage(selectReturn);
		const TotalReturnSeat = this.getTotalSeat(selectReturn);
		const Total = amount + TotalDeptBaggage + TotalDeptSeat + TotalReturnBaggage + TotalReturnSeat;

		return (
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle}>
					<Text style={styles.txtDepartureHeader}>BOOKING DETAILS</Text>
					<InfoScreen onItemClick={(e) => console.log(e)}{...this.props}/>
					<Text style={styles.txtDepartureHeader}>PAYMENT</Text>
				
					<ScrollableTabView tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
						style={styles.marT20}
						renderTabBar={() => <PaymentTabOption {...this.props}/>}
						tabBarTextStyle={styles.textStyle}
						tabBarInactiveTextColor={Color.Standard}
						tabBarActiveTextColor={Color.white}>
						<WalletScreen tabLabel="E-Wallet" {...this.props} subtotal={Total}
						 onValueChange={(e) => this.setState({currency: e})}
						 currency={this.state.currency}/>
						<CreditCardScreen tabLabel="Debit/Credit Card" {...this.props}/>
						<PartnerScreen tabLabel="Payment Partners" {...this.props}/>
					</ScrollableTabView>
					<View style={styles.height30}/>
				</ScrollView>
				<ButtomScreen currency={currency} amount={numeral(Total).format("0,000.00")}
					onFilterPress={() => this.setState({isFilterVisible: true})}
					hasInfo={false} buttonLabel="Purchase" loading={isBookingNow} onSubmit={this.onTransPass} />
				<SuccessScreen visible={isVisible} loading={isBookingNow}
					onClose={() => this.setState({isVisible: false})} {...{BookSuccess}}
					onPressSubmit={this.onSubmit} err={transpassErr} {...{actions}}
					transpass={transpass} onChangeText={(e) => this.setState({transpass: e, transpassErr: ""})}/>
			</View>
		);
	}
}

PaymentScreen.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1},
	scrollStyle: {flex: 1, backgroundColor: Color.bg2, paddingHorizontal: 4},
	txtDepartureHeader: {fontFamily: "Montserrat-Medium", fontSize: 25, color: Color.colorPrimary, textAlign: "center", marginTop: 20},
	height30: {height: 30},
	marT20: {marginTop: 20},
});

export default PaymentScreen;
