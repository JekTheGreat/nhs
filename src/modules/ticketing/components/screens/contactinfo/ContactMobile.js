/* eslint-disable max-len */
import React from "react";
import {ScrollView, View, Text, Image, StyleSheet, TextInput} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import {Icon} from "react-native-elements";
import RNPickerSelect from "__src/components/rnpicker/index";
import worldCountries from "world-countries";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const countries = _.chain(worldCountries).transform((result, value) => {
	result.push({label: `+(${_.toString(value.callingCode)})${value.name.common}`, value: _.toString(value.callingCode), item: value});
}, []).orderBy(["name.common"], ["asc"]).value();

class ContactMobile extends React.PureComponent{
  
	render(){
		const {ticketing: {setContactPerson, setTicketingInput}, onChangeText, error} = this.props;
		const disabled = setTicketingInput.bookformyself;
		const errorStyle = error.mobileNumber ? {borderColor: "red"} : null;
		
  	return (
  		<View style={styles.container}>
  			<ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle2}>
  				<Text style={styles.txtMobileHeader}>MOBILE CONTACT INFORMATION</Text>
  				<Text style={[styles.txtMobileHeader2, styles.marT15]}>Please enter your mobile number to</Text>
  				<Text style={[styles.txtMobileHeader2]}>complete the form</Text>
  				<Image style={[styles.imageBanner, styles.marT30]} source={Res.get("mobile_banner")} resizeMode="stretch"/>
					
  				<View style={styles.view1}>
						<RNPickerSelect
          		onValueChange={onChangeText("country")}
          		placeholder={{}}
          		disabled={disabled}
          		items={countries} >
							<View style={styles.view2}>
								<Image style={styles.imageCurrency} source={Res.get(setContactPerson.flag)}/>
								<Text style={styles.txtNumber}>+{setContactPerson.callingCode}</Text>
								<Icon name="chevron-down" type="feather" color={Color.LightBlue5} size={20}/>
							</View>
						</RNPickerSelect>
  				
  					<View pointerEvents="box-none" style={[styles.view3, errorStyle]}>
							<TextInput style={styles.input} placeholder="Mobile Number"
								 value={setContactPerson.mobileNumber} editable={!disabled}
								keyboardType="number-pad" returnKeyType="done" onChangeText={onChangeText("mobileNumber")} />
  					</View>
  				</View>

  				<View style={styles.height30}/>
  			</ScrollView>
  		</View>
  	);
	}
}

ContactMobile.propTypes = {
	ticketing: PropTypes.object,
	actions: PropTypes.object,
	login: PropTypes.object,
	error: PropTypes.object,
	onChangeText: PropTypes.func,
};

export const styles = StyleSheet.create({
	container: {flex: 1},
	scrollStyle2: {flex: 1, backgroundColor: Color.white, paddingHorizontal: 20},
	txtMobileHeader: {fontFamily: "Montserrat-Medium", fontSize: 30, color: Color.colorPrimary, textAlign: "center", marginTop: 20},
	txtMobileHeader2: {fontFamily: "Roboto", fontSize: 15, color: Color.Header, textAlign: "center"},
	marT15: {marginTop: 15},
	marT30: {marginTop: 30},
	height30: {height: 30},
	imageBanner: {width: "100%", height: 150},
	input: {flex: 1, borderRadius: 30, marginLeft: 15, fontFamily: "Roboto", fontSize: 20, paddingVertical: 0, backgroundColor: Color.transparent},
	view1: {flexDirection: "row", marginTop: 50, alignItems: "center", justifyContent: "space-between"},
	view2: {flexDirection: "row", flexGrow: 1, height: 50, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: Color.text1, borderRadius: 25, paddingHorizontal: 10},
	imageCurrency: {width: 26, height: 26},
	txtNumber: {flexGrow: 2, fontFamily: "Roboto", fontSize: 17, color: Color.Header, marginLeft: 7},
	view3: {flexDirection: "row", width: "60%", height: 50, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: Color.text1, borderRadius: 25},
});

export default ContactMobile;
