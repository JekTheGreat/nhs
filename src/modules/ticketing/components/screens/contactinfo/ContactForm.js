import React from "react";
import {View, ScrollView, Text, StyleSheet } from "react-native";
import moment from "moment";
import _ from "lodash";
import PropTypes from "prop-types";
import PassengerItem from "../passenger/PassengerItem";
import RNPickerSelect from "__src/components/rnpicker/index";
import DatePicker from "__src/components/datepicker";
import worldCountries from "world-countries";
import Resource from "__src/resources";
const {Color} = Resource;
const countries = _.chain(worldCountries).transform((result, value) => {
	result.push({label: value.name.common, value: value.name.common, item: value});
}, []).orderBy(["name.common"], ["asc"]).value();

class ContactForm extends React.PureComponent{
	render(){
		const {ticketing: {setContactPerson, setTicketingInput}, onChangeText, error} = this.props;
  	const disabled = setTicketingInput.bookformyself;
    
  	return (
  		<View style={styles.container}>
  			<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle}>
  				<Text style={styles.txtDepartureHeader}>CONTACT INFORMATION</Text>
  				<Text style={[styles.txtDepartureHeader2, styles.marT15]}>FILL UP THE FORM</Text>
					<View style={[ styles.container2]} >
          	<Text style={styles.textAdult}>CONTACT PERSON</Text>
					</View>
					<View style={[styles.items]}>
						<RNPickerSelect
          		onValueChange={onChangeText("title")}
          		useNativeAndroidPickerStyle={false}
          		placeholder={{}}
          		disabled={disabled}
          		items={[{label: "Mr", value: "Mr"}, {label: "Ms", value: "Ms"}]} >
          		<PassengerItem label="Title" error={error.title}
          			placeholder="Select Country" value={setContactPerson.title}/>
          	</RNPickerSelect>
          	<PassengerItem label="First Name" placeholder="First Name" disabled={disabled} error={error.firstName}
          		onChangeText={onChangeText("firstName")} value={setContactPerson.firstName}/>
          	<PassengerItem label="Middle Name (Optional)" placeholder="Middle Name" disabled={disabled}
          		onChangeText={onChangeText("middleName")} value={setContactPerson.middleName}/>
          	<PassengerItem label="Last Name" placeholder="Last Name" disabled={disabled} error={error.lastName}
          		onChangeText={onChangeText("lastName")} value={setContactPerson.lastName}/>
          	<PassengerItem label="Suffix (Optional)" placeholder="Suffix" disabled={disabled}
          		onChangeText={onChangeText("suffix")} value={setContactPerson.suffix}/>

          	<DatePicker
          		mode="date"
          		date={setContactPerson.birthdate}
          		format="YYYY-MM-DD"
          		disabled={disabled}
          		maxDate={moment().format("YYYY-MM-DD")}
          		onDateChange={onChangeText("birthdate")}
          		renderBase={(date) => (<PassengerItem label="Birthdate" placeholder="yyyy-mm-dd"
          			imageResource="calendar2" value={date} error={error.birthdate}/>)}/>
          
          	<PassengerItem imageResource="email" label="Email" placeholder="Email" keyboardType="email-address"
          		onChangeText={onChangeText("emailAddress")} disabled={disabled}
							 value={setContactPerson.emailAddress} error={error.emailAddress}/>

          	<RNPickerSelect
          		onValueChange={onChangeText("country")}
          		useNativeAndroidPickerStyle={false}
          		placeholder={{}}
          		disabled={disabled}
          		items={countries} >
          		<PassengerItem imageResource="location" label="Select Country" error={error.countryName}
          			placeholder="Select Country" value={setContactPerson.countryName}/>
          	</RNPickerSelect>

          	<PassengerItem imageResource="location" label="Address" placeholder="Address" disabled={disabled}
          		onChangeText={onChangeText("address")} value={setContactPerson.address} error={error.address}/>
          	<PassengerItem imageResource="location" label="City" placeholder="City" disabled={disabled}
          		onChangeText={onChangeText("city")} value={setContactPerson.city} error={error.city}/>
          	<PassengerItem imageResource="location" label="State" placeholder="State" disabled={disabled}
          		onChangeText={onChangeText("state")} value={setContactPerson.state} error={error.state}/>
          	<PassengerItem imageResource="location" label="Zip Code" placeholder="Zip Code"
          		keyboardType="number-pad" isLast disabled={disabled} error={error.zip}
          		onChangeText={onChangeText("zip")} value={setContactPerson.zip}/>
					</View>
					<View style={styles.height30}/>
  			</ScrollView>
  		</View>
  	);
	}
}

ContactForm.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	error: PropTypes.object,
	login: PropTypes.object,
	onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {flex: 1},
	scrollStyle: {flex: 1, backgroundColor: Color.bg2, paddingHorizontal: 10},
	txtDepartureHeader: {fontFamily: "Montserrat-Medium", fontSize: 25, color: Color.colorPrimary, textAlign: "center", marginTop: 20},
	txtDepartureHeader2: {fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header, textAlign: "center"},
	marT15: {marginTop: 15},
	height30: {height: 30},
	container2: { marginTop: 16, backgroundColor: "white",
		padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12,
		flexDirection: "row", alignItems: "center",
	},
	textAdult: {fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header},
	items: { overflow: "hidden"},
});

export default ContactForm;
