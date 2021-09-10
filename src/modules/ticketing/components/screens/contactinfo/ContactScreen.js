/* eslint-disable max-len */
import React from "react";
import {View, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import numeral from "numeral";
import ButtomScreen from "../passenger/ButtomScreen";
import InfoScreen from "../chooseflight/InfoScreen";
import worldCountries from "world-countries";
import ContactForm from "./ContactForm";
import ContactMobile from "./ContactMobile";
import validator from "validator";

class ContactScreen extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			isInfoVisible: false,
			setScreen: "screen1",
			error: {},
		};
	}

	componentDidMount(){
		const {ticketing: {setTicketingInput}, login: {additionalDetails}, actions} = this.props;
		const {individual, metadata} = additionalDetails;

		if (setTicketingInput.bookformyself){
			const newCountries = _.filter(worldCountries, (item) => {
				return item.name.common.startsWith(individual.country);
			});
			const result = newCountries.length > 0 ? newCountries[0] : {};
			const common = _.has(result, "name.common") ? result.name.common : "";
			const mobile = individual.mobile;
			const params = {
				title: individual.gender === "female" ? "Ms" : "Mr",
				firstName: individual.firstName, middleName: individual.middleName,
				lastName: individual.lastName, gender: individual.gender === "male" ? "M" : "F",
				countryName: individual.country, birthdate: individual.birthDate,
				emailAddress: metadata.email, suffix: "",
				address: individual.streetAddress,
				city: individual.city,
				state: individual.province,
				zip: " ", flag: _.toString(result.currency),
				callingCode: _.toString(result.callingCode),
				country: "PH",
				mobileNumber: mobile.startsWith(result.callingCode) ?
					_.replace(mobile, result.callingCode, "") : mobile,
			};
			actions.setContactPerson(params);
		}
	}
  
	onSubmit = () => {
		const {actions, ticketing: {setContactPerson}} = this.props;
		const {setScreen} = this.state;
		const error = {};
		const msg = "This field is required.";

		switch (setScreen){
		case "screen1":
			if (_.isEmpty(setContactPerson.firstName)){
				error.firstName = msg;
			} else if (_.isEmpty(setContactPerson.lastName)){
				error.lastName = msg;
			} else if (_.isEmpty(setContactPerson.birthdate)){
				error.birthdate = msg;
			} else if (_.isEmpty(setContactPerson.emailAddress)){
				error.emailAddress = msg;
			} else if (!validator.isEmail(setContactPerson.emailAddress)){
				error.emailAddress = "Email address is not valid";
			} else if (_.isEmpty(setContactPerson.countryName)){
				error.countryName = msg;
			} else if (_.isEmpty(setContactPerson.address)){
				error.address = msg;
			} else if (_.isEmpty(setContactPerson.city)){
				error.city = msg;
			} else if (_.isEmpty(setContactPerson.state)){
				error.state = msg;
			} else if (_.isEmpty(setContactPerson.zip)){
				error.zip = msg;
			}

			this.setState({error});
			console.log("error", error);

			if (_.isEmpty(error)){
				this.setState({setScreen: "screen2"});
			}

			break;
		case "screen2":
			if (_.isEmpty(setContactPerson.mobileNumber)){
				error.mobileNumber = msg;
			}

			this.setState({error});

			if (_.isEmpty(error)){
				actions.setScreen("AddOnScreen");
			}
			break;
		}
	}
  
  onChangeText = (type) => (val, i, item) => {
  	const {actions, ticketing: {setContactPerson}} = this.props;
  	const newInput = _.merge({}, setContactPerson);
  	const error = {};

  	if (_.isEmpty(val)){
  		error[type] = "This field is required";
  	}
		
  	this.setState({error});
		
  	if (type === "country"){
  		newInput[type] = item.cca2;
  		newInput.countryName = item.name.common;
  		newInput.flag = _.toString(item.currency);
  		newInput.callingCode = _.toString(item.callingCode);
  	} else {
  		newInput[type] = val;
  	}
  	actions.setContactPerson(newInput);
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
  	const {isInfoVisible, setScreen} = this.state;
		const {currency, amount} = this.getTotalAmount();

  	return (
  		<View style={styles.container}>
				{setScreen === "screen1" ? <ContactForm onChangeText={this.onChangeText}
				 error={this.state.error} {...this.props}/> : <ContactMobile onChangeText={this.onChangeText} error={this.state.error} {...this.props}/>}
  			<ButtomScreen currency={currency} amount={numeral(amount).format("0,000.00")} buttonLabel="Continue" onFilterPress={() => this.setState({isFilterVisible: true})}
  				onInfoPress={() => this.setState({isInfoVisible: true})} onSubmit={this.onSubmit}
					 {...this.props}/>
  			<InfoScreen visible={isInfoVisible} onItemClick={(e) => console.log(e)}
  				onClose={() => this.setState({isInfoVisible: false})} {...this.props}/>
  		</View>
  	);
	}
}

ContactScreen.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {flex: 1},
});

export default ContactScreen;
