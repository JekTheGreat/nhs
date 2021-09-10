/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, Image, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import PropTypes from "prop-types";
import _ from "lodash";
import numeral from "numeral";
import Chevron from "../passenger/Chevron";
import BaggageChoices from "./BaggageChoices";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const { not, interpolate } = Animated;
const LIST_ITEM_HEIGHT = 100;
const count = (type) => {
	switch (type){
	case 0:
	case 1:
	case 2:
		return 1;
	case 3:
	case 4:
		return 2;
	case 5:
	case 6:
		return 3;
	case 7:
	case 8:
		return 4;
	case 9:
	case 10:
		return 5;
	}
};

const weight = (type) => {
	switch (type){
	case 20:
	case 21:
	case 22:
	case 23:
	case 24:
		return 20;
	case 25:
	case 26:
	case 27:
	case 28:
	case 29:
		return 25;
	case 30:
	case 31:
	case 32:
	case 33:
	case 34:
		return 30;
	case 35:
	case 36:
	case 37:
	case 38:
	case 39:
		return 35;
	case 40:
	case 41:
	case 42:
	case 43:
	case 44:
	case 45:
	default:
		return 40;
	}
};

const PassengerBaggage = (props) => {
	const {labelName, index, onSelectBaggage, type, setBaggage, BaggageList} = props;
	const [open, setOpen] = useState(false);
	const transition = useTransition(
		open,
		not(bin(open)),
		bin(open),
		400,
		Easing.inOut(Easing.ease)
	);
	const height = bInterpolate(
		transition, 0, LIST_ITEM_HEIGHT * count(BaggageList.length || 0)
	);
	const bottomRadius = interpolate(transition, {
		inputRange: [0, 16 / 400],
		outputRange: [12, 0],
	});
	const nobag = {Code: "NO_BAGGAGE", Amount: 0, Weight: 0};

	const renderItem = ({item, subindex}) => (
		<BaggageChoices key={`${subindex}`} active={setBaggage.Code === `${item.Code}`}
			onPress={() => onSelectBaggage({...item, type})} title={item.Code === "NO_BAGGAGE" ? "No checked" : `${item.Weight}${item.Unit}`}
			subtitle={item.Code === "NO_BAGGAGE" ? "baggage" : `${item.CurrencyCode} ${numeral(item.Amount).format("0,000.00")}`}
			source={`${item.Unit.toLowerCase()}${weight(item.Weight)}`} />
	);
	const bag = _.isEmpty(setBaggage) ? "" : ` - ${setBaggage.Weight}${setBaggage.Unit}`;
  	
	return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
      	<Animated.View style={[ styles.container, {
      		borderBottomLeftRadius: bottomRadius,
      		borderBottomRightRadius: bottomRadius,
      	}]} >
      		<Image style={styles.imageStyle} source={Res.get(labelName)} resizeMode="contain"/>
      		<Text style={styles.textAdult}>{labelName} {index + 1}{bag}</Text>
      		<Chevron {...{ transition }} />
      	</Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>

      	<View style={styles.view1}>
      		{_.isEmpty(BaggageList) &&
					<BaggageChoices active title={"No checked"}
						onPress={() => onSelectBaggage({...nobag, type})}
						subtitle={"baggage"} source={"nobag"} />}
      	{BaggageList && BaggageList.map((item, subindex) => {
      			return renderItem({item, subindex});
      	})}
      	</View>
      </Animated.View>
    </>
	);
};

PassengerBaggage.propTypes = {
	labelName: PropTypes.string,
	type: PropTypes.string,
	index: PropTypes.number,
	onSelectBaggage: PropTypes.func,
	setBaggage: PropTypes.object,
};

PassengerBaggage.defaultProps = {
	setBaggage: {},
};

export default PassengerBaggage;

const styles = StyleSheet.create({
	container: { marginTop: 16, backgroundColor: "white",
		padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12,
		borderBottomLeftRadius: 12, borderBottomRightRadius: 12,
		flexDirection: "row", alignItems: "center",
	},
	textAdult: {flex: 1, fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header},
	items: { overflow: "hidden"},
	imageStyle: {width: 30, height: 25, marginRight: 5},
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderBottomLeftRadius: 12, borderBottomRightRadius: 12,
		backgroundColor: "white", paddingBottom: 10, paddingHorizontal: 20, flexWrap: "wrap" },
});
