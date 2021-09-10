/* eslint-disable max-len */
import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, Image } from "react-native";
import PropTypes from "prop-types";
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import Chevron from "./Chevron";
import _ from "lodash";
import moment from "moment";
import PassengerItem from "./PassengerItem";
import DatePicker from "__src/components/datepicker";
import RNPickerSelect from "__src/components/rnpicker/index";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const { not, interpolate } = Animated;
const LIST_ITEM_HEIGHT = 56;
const gender = [
	{ label: "M", value: "M"},
	{ label: "F", value: "F"},
];

const PassengerDetails = (props) => {
	const {onChangeText, labelName, index, id, setPassenger, dropDownItem,
		countries, isInternational, disabled, getMinMaxDates, error} = props;
	const [open, setOpen] = useState(false);
	const transition = useTransition(
		open,
		not(bin(open)),
		bin(open),
		400,
		Easing.inOut(Easing.ease)
	);
	const addHeight = labelName === "INFANT" ? LIST_ITEM_HEIGHT : 0;
	const addHeightInt = isInternational ? LIST_ITEM_HEIGHT * 5 : 0;
	const height = bInterpolate(
		transition, 0, (LIST_ITEM_HEIGHT * 9) + addHeight + addHeightInt
	);
	const bottomRadius = interpolate(transition, {
		inputRange: [0, 16 / 400],
		outputRange: [12, 0],
	});
	const fullname = _.isEmpty(setPassenger.firstName) || _.isEmpty(setPassenger.lastName) || _.isEmpty(setPassenger.birthdate) ||
	_.isEmpty(setPassenger.gender) || _.isEmpty(setPassenger.nationalityName) || (labelName === "INFANT" && _.isEmpty(setPassenger.travelwith)) ? "" :
		`- ${setPassenger.firstName} ${setPassenger.middleName} ${setPassenger.lastName}`;
	const errorStyle = _.isEmpty(error) ? null : {color: "red"};

	return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
      	<Animated.View style={[ styles.container, {
      		borderBottomLeftRadius: bottomRadius,
      		borderBottomRightRadius: bottomRadius,
      	}]} >
      		<Image style={styles.imageStyle} source={Res.get(labelName)} resizeMode="contain"/>
      		<Text style={[styles.textAdult, errorStyle]}>{labelName} {index + 1} {fullname}</Text>
      		<Chevron {...{ transition }} />
      	</Animated.View>
				
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
      	<PassengerItem label="First Name" placeholder="First Name"
      		onChangeText={(e) => onChangeText("firstName", e, id)}
      		error={error.firstName}
      		value={setPassenger.firstName} disabled={disabled}/>
      	<PassengerItem label="Middle Name (Optional)" placeholder="Middle Name"
      		onChangeText={(e) => onChangeText("middleName", e, id)}
      		value={setPassenger.middleName} disabled={disabled}/>
      	<PassengerItem label="Last Name" placeholder="Last Name"
      		error={error.lastName}
      		onChangeText={(e) => onChangeText("lastName", e, id)}
      		value={setPassenger.lastName} disabled={disabled}/>
      	<PassengerItem label="Suffix (Optional)" placeholder="Suffix"
      		onChangeText={(e) => onChangeText("suffix", e, id)}
      		value={setPassenger.suffix} disabled={disabled}/>
      	<DatePicker
      		mode="date"
      		date={setPassenger.birthdate}
      		format="YYYY-MM-DD"
      		minDate={getMinMaxDates.minDate}
      		maxDate={getMinMaxDates.maxDate}
      		disabled={disabled}
      		onDateChange={(e) => onChangeText("birthdate", e, id)}
      		renderBase={(date) => {
      			return (
      				<PassengerItem label="Birthdate" placeholder="yyyy-mm-dd"
      					error={error.birthdate}
      					imageResource="calendar2" value={date}/>
      			);
      		}}/>
      	<RNPickerSelect
      		onValueChange={(e) => onChangeText("gender", e, id)}
      		placeholder={{}}
      		value={setPassenger.gender}
      		disabled={disabled}
      		useNativeAndroidPickerStyle={false}
      		items={gender} >
      		<PassengerItem label="Gender" placeholder="Gender"
      			error={error.gender}
      			value={setPassenger.gender}/>
      	</RNPickerSelect>

      	<RNPickerSelect
      		onValueChange={(e, i, item) => onChangeText("nationality", item, id)}
      		useNativeAndroidPickerStyle={false}
      		placeholder={{}}
      		disabled={disabled}
      		items={countries} >
      		<PassengerItem label="Nationality" placeholder="Nationality"
      			error={error.nationality}
      			isLast={labelName !== "INFANT" && !isInternational} value={setPassenger.nationalityName}/>
      	</RNPickerSelect>
      	
      	{labelName === "INFANT" &&
					<RNPickerSelect
						onValueChange={(e, i, item) => onChangeText("travelwith", {value: e, id: item}, id)}
						placeholder={{}}
						items={dropDownItem} >
						<PassengerItem label="Travelling with" placeholder="Travelling with"
							error={error.travelwith}
							isLast={!isInternational} value={setPassenger.travelwith}/>
					</RNPickerSelect>}

      	{isInternational &&
					<>
						<RNPickerSelect
							onValueChange={(e) => onChangeText("document", e, id)}
							placeholder={{}}
							items={[{label: "Passport", value: "Passport"}]} >
							<PassengerItem label="Document Type" placeholder="Document Type"
      					error={error.document}
								value={setPassenger.document}/>
						</RNPickerSelect>
						<DatePicker
							mode="date"
							date={setPassenger.expirationDate}
							minDate={moment().format("YYYY-MM-DD")}
							format="YYYY-MM-DD"
							onDateChange={(e) => onChangeText("expirationDate", e, id)}
							renderBase={(date) => {
								return (
									<PassengerItem label="Birthdate" placeholder="yyyy-mm-dd"
										error={error.expirationDate}
										imageResource="calendar2" value={date}/>
								);
							}}/>
						<PassengerItem label="Number" placeholder="Number"
							onChangeText={(e) => onChangeText("number", e, id)}
							value={setPassenger.number} keyboardType="number-pad"/>
							<RNPickerSelect
								onValueChange={(e, i, item) => onChangeText("country", item, id)}
								useNativeAndroidPickerStyle={false}
								placeholder={{}}
								items={countries} >
								<PassengerItem label="Country" placeholder="Country"
									error={error.country}
									isLast={labelName !== "INFANT"} value={setPassenger.countryName}/>
							</RNPickerSelect>
					</>}
      </Animated.View>
    </>
	);
};

PassengerDetails.propTypes = {
	onChangeText: PropTypes.func,
	labelName: PropTypes.string,
	index: PropTypes.number,
	id: PropTypes.number,
	setPassenger: PropTypes.object,
	dropDownItem: PropTypes.array,
	countries: PropTypes.array,
	isInternational: PropTypes.bool,
	disabled: PropTypes.bool,
	getMinMaxDates: PropTypes.object,
	error: PropTypes.object,
};

PassengerDetails.defaultProps = {
	onChangeText: () => console.log(),
};

const styles = StyleSheet.create({
	container: { marginTop: 16, backgroundColor: "white",
		padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12,
		borderBottomLeftRadius: 12, borderBottomRightRadius: 12,
		flexDirection: "row", alignItems: "center",
	},
	textAdult: {flex: 1, fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header},
	items: { overflow: "hidden"},
	imageStyle: {width: 30, height: 25, marginRight: 5},
});

export default PassengerDetails;
