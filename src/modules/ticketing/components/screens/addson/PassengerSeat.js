/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, Image, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import PropTypes from "prop-types";
import _ from "lodash";
import Chevron from "../passenger/Chevron";
import PassengerSeatRow from "./PassengerSeatRow";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const { not, interpolate } = Animated;
const LIST_ITEM_HEIGHT = 42;

const PassengerSeat = (props) => {
	const {labelName, index, onSelectSeat, type, setSeat, SeatsData} = props;
	const [open, setOpen] = useState(false);
	const transition = useTransition(
		open,
		not(bin(open)),
		bin(open),
		400,
		Easing.inOut(Easing.ease)
	);
	const height = bInterpolate(
		transition, 0, LIST_ITEM_HEIGHT * SeatsData.length
	);
	const bottomRadius = interpolate(transition, {
		inputRange: [0, 16 / 400],
		outputRange: [12, 0],
	});

	const renderItem = ({item}) => (
		<PassengerSeatRow key={`${item.RowNumber}`} rowItem={item} setSeat={setSeat}
			onPress={(item) => onSelectSeat({...item, type})} />
	);
  
	const seat = _.isEmpty(setSeat) ? "" : ` - ${setSeat.SeatDesignator}`;
  	
	return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
      	<Animated.View style={[ styles.container, {
      		borderBottomLeftRadius: bottomRadius,
      		borderBottomRightRadius: bottomRadius,
      	}]} >
      		<Image style={styles.imageStyle} source={Res.get(labelName)} resizeMode="contain"/>
      		<Text style={styles.textAdult}>{labelName} {index + 1} {seat}</Text>
      		<Chevron {...{ transition }} />
      	</Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, { height }]}>
      	<View style={styles.view2}>
      		<View style={styles.view3}>
      			<View style={[styles.viewColor, {backgroundColor: Color.red}]} />
      			<Text style={[styles.textColor, {color: Color.red}]}>Hot Seat</Text>
      		</View>

      		<View style={styles.view3}>
      			<View style={[styles.viewColor, {backgroundColor: Color.LightBlue5}]} />
      			<Text style={[styles.textColor, {color: Color.LightBlue5}]}>Standard Seat</Text>
      		</View>
      	</View>

      	<View style={[styles.view2, styles.marT10]}>
      		<View style={styles.view3}>
      			<View style={[styles.viewColor, {backgroundColor: Color.gray05}]} />
      			<Text style={[styles.textColor, {color: Color.gray05}]}>Unavailable</Text>
      		</View>

      		<View style={styles.view3}>
      			<View style={[styles.viewColor, {backgroundColor: Color.colorPrimaryDark}]} />
      			<Text style={[styles.textColor, {color: Color.colorPrimary}]}>Your Seat</Text>
      		</View>
      	</View>

      	{SeatsData.map((item, subindex) => {
      		return renderItem({item, subindex});
      	})}
      </Animated.View>
    </>
	);
};

PassengerSeat.propTypes = {
	labelName: PropTypes.string,
	type: PropTypes.string,
	index: PropTypes.number,
	onSelectSeat: PropTypes.func,
	setBaggage: PropTypes.object,
	SeatsData: PropTypes.array,
};

PassengerSeat.defaultProps = {
	setBaggage: {},
};

export default PassengerSeat;

const styles = StyleSheet.create({
	container: { marginTop: 16, backgroundColor: "white",
		padding: 16, borderTopLeftRadius: 12, borderTopRightRadius: 12,
		borderBottomLeftRadius: 12, borderBottomRightRadius: 12,
		flexDirection: "row", alignItems: "center",
	},
	textAdult: {flex: 1, fontFamily: "Roboto-Medium", fontSize: 13, color: Color.Header},
	items: { overflow: "hidden", backgroundColor: "white", borderBottomLeftRadius: 12, borderBottomRightRadius: 12 },
	imageStyle: {width: 30, height: 25, marginRight: 5},
	marT10: {marginTop: 10},
	view2: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, backgroundColor: "white"},
	view3: {flexDirection: "row", alignItems: "center", width: "50%"},
	textStandard: {fontFamily: "Roboto", fontSize: 11, color: Color.LightBlue5, marginLeft: 7},
	viewColor: {width: 20, height: 20, borderRadius: 20 / 2},
	textColor: {fontFamily: "Roboto", fontSize: 11, marginLeft: 7},
});
