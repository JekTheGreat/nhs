/* eslint-disable max-len */
import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View, Platform } from "react-native";
import PropTypes from "prop-types";
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import Chevron from "./Chevron";
import _ from "lodash";
import moment from "moment";
import GuestItem from "./GuestItem";
import DatePicker from "__src/components/datepicker";
import RNPickerSelect from "__src/components/rnpicker/index";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const { not, interpolate } = Animated;
const LIST_ITEM_HEIGHT = 50;
const gender = [
	{ label: "M", value: "M"},
	{ label: "F", value: "F"},
];

const Guest = (props) => {
	const {onChangeText, labelName, index, id, setGuest, error} = props;
	const [open, setOpen] = useState(false);
	const transition = useTransition(
		open,
		not(bin(open)),
		bin(open),
		400,
		Easing.inOut(Easing.ease)
	);
	const height = bInterpolate(
		transition, 0, LIST_ITEM_HEIGHT * 4
	);
	const marginTop = bInterpolate(
		transition, 0, 10
	);

	const fullname = _.isEmpty(setGuest.firstName) || _.isEmpty(setGuest.lastName) || _.isEmpty(setGuest.birthdate) ||
	_.isEmpty(setGuest.gender) || _.isEmpty(setGuest.nationalityName) || (labelName === "INFANT" && _.isEmpty(setGuest.travelwith)) ? "" :
		`- ${setGuest.firstName} ${setGuest.middleName} ${setGuest.lastName}`;
	const errorStyle = _.isEmpty(error) ? null : {color: "red"};

	return (
		<View style={[styles.container2, styles.shadowStyle]}>
			<TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
      	<Animated.View style={[styles.viewGuest]} >
      		<Text style={[styles.textAdult, errorStyle]}>{labelName} {index + 1} {fullname}</Text>
      		<Chevron {...{ transition }} />
      	</Animated.View>
				
			</TouchableWithoutFeedback>
			<Animated.View style={[styles.items, { height, marginTop }]}>
      	<GuestItem label="First Name" placeholder="First Name"
      		onChangeText={(e) => onChangeText("firstName", e, id)}
      		error={error.firstName}
      		value={setGuest.firstName}/>
      
      	<GuestItem label="Last Name" placeholder="Last Name"
      		error={error.lastName}
      		onChangeText={(e) => onChangeText("lastName", e, id)}
      		value={setGuest.lastName}/>
      	<GuestItem label="Email" placeholder="Email"
      		onChangeText={(e) => onChangeText("email", e, id)}
      		value={setGuest.email}/>

      	<GuestItem label="Mobile Number" placeholder="Mobile Number"
      		onChangeText={(e) => onChangeText("mnumber", e, id)}
      		value={setGuest.mnumber}/>
      	
			</Animated.View>
		</View>
	);
};

Guest.propTypes = {
	onChangeText: PropTypes.func,
	labelName: PropTypes.string,
	index: PropTypes.number,
	id: PropTypes.number,
	setGuest: PropTypes.object,
	dropDownItem: PropTypes.array,
	countries: PropTypes.array,
	disabled: PropTypes.bool,
	getMinMaxDates: PropTypes.object,
	error: PropTypes.object,
};

Guest.defaultProps = {
	onChangeText: () => console.log(),
};

const styles = StyleSheet.create({
	container2: { marginTop: 16, backgroundColor: "white",
		padding: 12, borderTopLeftRadius: 6, borderTopRightRadius: 6,
		borderBottomLeftRadius: 6, borderBottomRightRadius: 6,
	},
	viewGuest: { backgroundColor: "white", flexDirection: "row", alignItems: "center"},
	textAdult: {flex: 1, fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header},
	items: { overflow: "hidden"},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 2}, shadowColor: Color.text3,
				shadowOpacity: 1, shadowRadius: 1, zIndex: 4, borderWidth: 0.3, borderColor: Color.text3},
			android: {elevation: 5},
		}),
	},
});

export default Guest;
