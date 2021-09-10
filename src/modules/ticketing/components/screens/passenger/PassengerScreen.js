/* eslint-disable react/no-did-mount-set-state */
/* eslint-disable max-len */
import React from "react";
import {ScrollView, View, Text, StyleSheet, InteractionManager} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import numeral from "numeral";
import moment from "moment";
import Loading from "__src/components/Loading";
import ButtomScreen from "./ButtomScreen";
import PassengerDetails from "./PassengerDetails";
import InfoScreen from "../chooseflight/InfoScreen";
import worldCountries from "world-countries";
import Resource from "__src/resources";
const {Color} = Resource;
const transform = _.chain(worldCountries).transform((result, value) => {
	result.push({label: value.name.common, value: value.name.common, item: value});
}, []).orderBy(["name.common"], ["asc"]).value();

class PassengerScreen extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			isInfoVisible: false,
			dropDownItem: [],
			passengerError: [],
			indexOpen: null,
			didFinishInitialAnimation: true,
		};
	}
	
	componentDidMount(){
		const {ticketing: {setTicketingInput}} = this.props;
		const dropDownItem = [];

		for (let i = 0; i < setTicketingInput.adults; i++){
			dropDownItem.push({label: `ADULT ${i + 1}`, value: `ADULT ${i + 1}`, item: i});
		}

		setTimeout(() => {
			InteractionManager.runAfterInteractions(() => {
				this.setState({
					didFinishInitialAnimation: false,
					dropDownItem,
				});
			});
		}, 10);
	}

	onSubmit = () => {
		const {actions, ticketing: {setPassengers, selectDeparture}} = this.props;
		const isInternational = selectDeparture.FlightType === "INT";
		const passengerError = [];

		_.map(setPassengers, (item) => {
			const error = {};
			if (_.isEmpty(item.firstName)){
				error.firstName = " ";
			} else if (_.isEmpty(item.lastName)){
				error.lastName = " ";
			} else if (_.isEmpty(item.birthdate)){
				error.birthdate = " ";
			} else if (_.isEmpty(item.gender)){
				error.gender = " ";
			} else if (_.isEmpty(item.nationalityName)){
				error.nationality = " ";
			} else if (_.isEmpty(item.travelwith) && item.type === "INF"){
				error.travelwith = " ";
			} else if (_.isEmpty(item.document) && isInternational){
				error.document = " ";
			} else if (_.isEmpty(item.expirationDate) && isInternational){
				error.expirationDate = " ";
			} else if (_.isEmpty(item.country) && isInternational){
				error.country = " ";
			}

			if (!_.isEmpty(error)){
				passengerError.push(error);
			}
		});

		console.log("passengerError", passengerError);

		this.setState({passengerError});

		if (_.isEmpty(passengerError)){
			actions.setScreen("ContactScreen");
		}
	}

	onItemChangeText = (type, value, id) => {
		const {actions, ticketing: {setPassengers}} = this.props;
		const newInput = _.merge({}, setPassengers[id]);

		if (type === "nationality"){
			newInput[type] = value.cca2;
			newInput.nationalityName = value.name.common;
		} else if (type === "travelwith"){
			newInput[type] = value.value;
			newInput.travelId = value.id;
		} else if (type === "country"){
			newInput[type] = value.cca2;
			newInput.countryName = value.name.common;
		} else {
			newInput[type] = value;
		}

		const params = {id, ...newInput};

		actions.setPassengers(params);
		this.setState({passengerError: []});
	}

	getMinMaxDates = (labelName) => {
		const {ticketing: {setTicketingInput}} = this.props;
		const departure = new Date(setTicketingInput.departure);

		switch (labelName){
		case "ADULT":
			return {minDate: null, maxDate: moment(departure).subtract(12, "year").format("YYYY-MM-DD")};
		case "CHILD":
			const childMinimumDate = moment(departure).subtract(12, "year").valueOf();
			const minDate = moment(childMinimumDate).add(1, "days").format("YYYY-MM-DD");
			const maxDate = moment(departure).subtract(2, "year").format("YYYY-MM-DD");
				
			return {minDate, maxDate};
		case "INFANT":
			const infantMinimumDate = moment(departure).subtract(24, "months").valueOf();
			const minDate2 = moment(infantMinimumDate).add(1, "days").format("YYYY-MM-DD");
			const maxDate2 = moment(departure).subtract(9, "days").format("YYYY-MM-DD");
				
			return {minDate: minDate2, maxDate: maxDate2};
		}
	};

	getAdult = () => {
		const {ticketing: {setTicketingInput, setPassengers, selectDeparture}} = this.props;
		const {passengerError} = this.state;
		const adult = [];
		const countAdult = setTicketingInput.adults;
		const countChild = setTicketingInput.children;

		if (this.state.didFinishInitialAnimation){
			return <Loading />;
		}

		for (let i = 0; i < countAdult; i++){
			adult.push(<PassengerDetails key={`${i}`} indexOpen={this.state.indexOpen} id={i} index={i} labelName={"ADULT"}
				setPassenger={setPassengers[i] || {}} onChangeText={this.onItemChangeText} countries={transform}
				isInternational={selectDeparture.FlightType === "INT"} disabled={setTicketingInput.bookformyself}
				getMinMaxDates={this.getMinMaxDates("ADULT")} error={passengerError[i] || {}} />);
		}

		for (let i = 0; i < countChild; i++){
			adult.push(<PassengerDetails key={`${countAdult + i}`} id={countAdult + i} index={i} labelName={"CHILD"}
				setPassenger={setPassengers[countAdult + i] || {}} onChangeText={this.onItemChangeText} countries={transform}
				isInternational={selectDeparture.FlightType === "INT"} disabled={setTicketingInput.bookformyself}
				getMinMaxDates={this.getMinMaxDates("CHILD")} error={passengerError[countAdult + i] || {}}/>);
		}

		for (let i = 0; i < setTicketingInput.infants; i++){
			adult.push(<PassengerDetails key={`${countAdult + countChild + i}`} id={countAdult + countChild + i} index={i} labelName={"INFANT"}
				setPassenger={setPassengers[countAdult + countChild + i] || {}} onChangeText={this.onItemChangeText} disabled={setTicketingInput.bookformyself}
				dropDownItem={this.state.dropDownItem} countries={transform} isInternational={selectDeparture.FlightType === "INT"}
				getMinMaxDates={this.getMinMaxDates("INFANT")} error={passengerError[countAdult + countChild + i] || {}}/>);
		}

		return adult;
	}

	getTotalAmount = () => {
		const {ticketing: {selectDeparture, selectReturn}} = this.props;

		const TotalDep  = _.has(selectDeparture, "AirItineraryPricingInfo.TotalFare") ?
			selectDeparture.AirItineraryPricingInfo.TotalFare : 0;
		const TotalRet  = _.has(selectReturn, "AirItineraryPricingInfo.TotalFare") ?
			selectReturn.AirItineraryPricingInfo.TotalFare.Amount : 0;

		return {currency: TotalDep.CurrencyCode, amount: TotalDep.Amount + TotalRet};
	}

	render(){
		const {ticketing: {setTicketingInput}} = this.props;
		const {isInfoVisible} = this.state;

		if (_.isEmpty(setTicketingInput.origin)){
			return null;
		}

		const {currency, amount} = this.getTotalAmount();

		return (
			<View style={styles.container}>
				<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle}>
					<Text style={styles.txtDepartureHeader}>PASSENGER DETAILS</Text>
					<Text style={[styles.txtDepartureHeader2, styles.marT10]}>FILL UP THE FORM</Text>

					{this.getAdult()}

					<View style={styles.height30}/>
					
				</ScrollView>
				<ButtomScreen currency={currency} amount={numeral(amount).format("0,000.00")} buttonLabel="Continue"
					onFilterPress={() => this.setState({isFilterVisible: true})}
					onInfoPress={() => this.setState({isInfoVisible: true})} onSubmit={this.onSubmit}
					 {...this.props}/>

				<InfoScreen visible={isInfoVisible} onItemClick={(e) => console.log(e)}
					onClose={() => this.setState({isInfoVisible: false})} {...this.props}/>
			</View>
		);
	}
}

PassengerScreen.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	delivery: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1},
	scrollStyle: {flex: 1, backgroundColor: Color.bg2, paddingHorizontal: 10},
	txtDepartureHeader: {fontFamily: "Montserrat-Medium", fontSize: 25, color: Color.colorPrimary, textAlign: "center", marginTop: 20},
	txtDepartureHeader2: {fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header, textAlign: "center"},
	marT10: {marginTop: 10},
	height30: {height: 30},
});

export default PassengerScreen;
