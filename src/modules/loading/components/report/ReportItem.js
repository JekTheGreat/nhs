import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import PropTypes from "prop-types";
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import Chevron from "./Chevron";
import moment from "moment";
import Detail from "__src/components/Detail";
import Resource from "__src/resources";
import _ from "lodash";
const { Color } = Resource;
const { not } = Animated;

const ReportItem = (props) => {
	const {item} = props;
	const [open, setOpen] = useState(false);
	const transition = useTransition(
		open,
		not(bin(open)),
		bin(open),
		350,
		Easing.inOut(Easing.ease),
	);
	const height = bInterpolate(
		transition, 0, 160,
	);
	const prefix = item.contact.slice(0, 2);
	const metaData = JSON.parse(item.metadata);
	const created = moment(item.createdAt).format("YYYY-MM-DD hh:mm:ss A");
	let loadAmount = "";
	if (_.has(metaData, "amountWMarkupToDisplay")) {
		if (metaData.amountWMarkupToDisplay.includes("N/A") ||
			metaData.amountWMarkupToDisplay.includes("NaN") ) {
			if (item.categoryId.replace(/\s/g, "") === "OnePrepay"){
				loadAmount = metaData.loadAmount;
			} else if (_.has(metaData, "dingLogs")) {
				loadAmount = metaData.dingLogs.convertedAmountToPHP;
			} else {
				loadAmount = metaData.convertedAmount;
			}
		} else {
			loadAmount = item.categoryId.replace(/\s/g, "") === "OnePrepay" ?
				metaData.loadAmount : metaData.amountWMarkupToDisplay;
		}
	} else {
		loadAmount = metaData.loadAmount;
	}
	const color = (status) => {
		switch (status) {
		case "PENDING":
			return Color.darkOrange;
		case "FAILED":
			return Color.red;
		case "COMPLETED":
			return Color.green;
		}
	};
  
	return (
		<>
			<TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
      	<Animated.View style={[ styles.container]} >
      		<View style={styles.flex1}>
      			<Text selectable style={styles.trackingNumber}>{item.trackingNumber}</Text>
      			<Text selectable style={styles.bookingReferenceNumber}>{item.contact}</Text>
						<Text style={styles.flightType}>{item.categoryId.replace(/\s/g, "") === "OnePrepay" ?
							metaData.productName : item.mobileNetworkId}</Text>
      		</View>
      		<Chevron {...{ transition }} />
      	</Animated.View>
				
			</TouchableWithoutFeedback>
			<Animated.View style={[{ height }]}>
      	<Detail label={"Transaction No."} value={item.trackingNumber}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	<Detail label={"Date and Time"} value={created}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	<Detail label={"Plancode"} value={metaData.productName}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	<Detail label={"Load Amount"} value={`${loadAmount}`}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	{
      		prefix === "63" ? null :
				  <Detail label={"Converted Amount"} value={_.has(metaData, "dingLogs") &&
				  !metaData.dingLogs.convertedAmountToPHP.includes("N/A") ?
				  `${metaData.dingLogs.convertedAmountToPHP}` : `${metaData.convertedAmount}`}
      				labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	}
      	<Detail label={"Wallet Currency"} value={`${item.currency}`}
      		labelStyle2={styles.labelStyle} valueStyle2={styles.labelStyle}/>
      	<Detail label={"Status"} value={item.status}
					labelStyle2={styles.labelStyle}
					valueStyle2={[styles.labelStyle, {color: color(item.status)}]}/>
			</Animated.View>
		</>
	);
};

ReportItem.propTypes = {
	item: PropTypes.object,
};

ReportItem.defaultProps = {
	onChangeText: () => console.log(),
};

const styles = StyleSheet.create({
	container: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 25},
	textAdult: {flex: 1, fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header},
	items: { overflow: "hidden"},
	imageStyle: {width: 30, height: 40, marginRight: 5},
	labelStyle: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2},
	trackingNumber: {fontFamily: "Roboto-Light", fontWeight: "bold", fontSize: 14, color: Color.colorPrimaryDark},
	bookingReferenceNumber: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 7},
	flightType: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 7},
	flex1: {flex: 1},
});
export default ReportItem;
