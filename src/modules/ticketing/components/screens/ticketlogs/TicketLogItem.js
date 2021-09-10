/* eslint-disable max-len */
import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import PropTypes from "prop-types";
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import Chevron from "./Chevron";
import numeral from "numeral";
import moment from "moment";
import Detail from "__src/components/Detail";
import _ from "lodash";
import Resource from "__src/resources";
const { Color } = Resource;
const { not } = Animated;

const TicketLogItem = (props) => {
	const {item} = props;
	const [open, setOpen] = useState(false);
	const transition = useTransition(
		open,
		not(bin(open)),
		bin(open),
		400,
		Easing.inOut(Easing.ease)
	);
	const height = bInterpolate(
		transition, 0, 100
	);
	const title = _.has(item, "customer.title") ? `${item.customer.title}.` : "";
	const firstName = _.has(item, "customer.firstName") ? item.customer.firstName : "";
	const middleName = _.has(item, "customer.middleName") ? item.customer.middleName : "";
	const lastName = _.has(item, "customer.lastName") ? item.customer.lastName : "";
	const created = moment(item.createdAt).format("YYYY-MM-DD hh:mm:ss A");
	const color = (status) => {
		switch (status) {
		case "PENDING":
			return Color.darkOrange;
		case "FAILED":
			return Color.red;
		case "CONFIRMED":
			return Color.green;
		}
	};
  	
	return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
      	<Animated.View style={[ styles.container]} >
      		<View stlye={{flex: 1}}>
      			<Text selectable style={styles.trackingNumber}>{item.trackingNumber}</Text>
      			<Text selectable style={styles.bookingReferenceNumber}>{item.bookingReferenceNumber}</Text>
      			<Text style={styles.flightType}>{item.flightType}</Text>
      		</View>
      		<Chevron {...{ transition }} />
      	</Animated.View>
				
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
      	<Detail label={"Full Name"} value={`${title} ${firstName} ${middleName} ${lastName}`}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	<Detail label={"Date and Time"} value={created}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	<Detail label={"Total Amount"} value={`${item.currency} ${numeral(item.totalAmount).format("0,000.00")}`}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	<Detail label={"Status"} value={item.status}
      		labelStyle2={styles.labelStyle} valueStyle2={[styles.labelStyle, {color: color(item.status)}]}/>
      </Animated.View>
    </>
	);
};

TicketLogItem.propTypes = {
	item: PropTypes.object,
};

TicketLogItem.defaultProps = {
	onChangeText: () => console.log(),
};

const styles = StyleSheet.create({
	container: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 25},
	textAdult: {flex: 1, fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header},
	items: { overflow: "hidden"},
	imageStyle: {width: 30, height: 25, marginRight: 5},
	labelStyle: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2},
	trackingNumber: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.colorPrimaryDark},
	bookingReferenceNumber: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 7},
	flightType: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 7},
});
export default TicketLogItem;
