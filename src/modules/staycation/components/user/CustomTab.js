/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-len */
/* eslint-disable react/prefer-es6-class */
import React from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Animated as DEFAnimated, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import { bInterpolate, bin, useTransition } from "react-native-redash";
import { withTransition } from "__redash";
import Animated, { Easing } from "react-native-reanimated";
const { not } = Animated;

import _ from "lodash";
import Resource from "__src/resources";
const {Color, Res} = Resource;

const	renderTab = (name, page, isTabActive, onPressHandler, newProps) => {
	const { activeTextColor, inactiveTextColor, textStyle } = newProps;
	const textColor = isTabActive ?  activeTextColor : inactiveTextColor;
	const fontWeight = isTabActive ? "bold" : "normal";

	return (
		<TouchableWithoutFeedback
			style={{flex: 1 }}
			key={name}
			accessible
			accessibilityLabel={name}
			accessibilityTraits='button'
			onPress={() => onPressHandler(page)}
		>
			<View style={[styles.tab, newProps.tabStyle ]}>
				<Text style={[textStyle, {color: textColor, fontWeight } ]}>
					{name}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const CustomTab = (props) => {
	const {activeTab, scrollValue} = props;
	const containerWidth = props.containerWidth;
	const numberOfTabs = props.tabs.length;
	const tabUnderlineStyle = {
		position: "absolute",
		width: containerWidth / numberOfTabs,
		height: 1,
		backgroundColor: Color.colorPrimary,
		bottom: 0,
	};

	const transition = useTransition(
		activeTab === 1,
		not(bin(activeTab === 1)),
		bin(activeTab === 1),
		400,
		Easing.inOut(Easing.ease)
	);

	const active = new Animated.Value(0);
	const translateX = scrollValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0,  containerWidth / numberOfTabs],
		extrapolate: "clamp",
	});

	const height = bInterpolate(
		transition, 0, 110
	);
		
	return (
		<>
		<Animated.View style={{overflow: "hidden", height}}>
			<View style={styles.viewFilter}>
				<View style={styles.viewSearch}>
					<Icon name="search" type="evilicon" size={30} color={Color.Header}/>
					<TextInput style={styles.inputSearch} onChangeText={{}} placeholder={"Tracking Number"}
						onSubmitEditing={{}}/>
					<Icon onPress={{}} name="tune" size={26} color={Color.colorPrimaryDark}/>
				</View>

				<View style={styles.view2}>
					<TouchableOpacity onPress={{}} style={styles.datesWrapper}>
						<Text style={styles.txt1}>Check In Date From</Text>
						<Text style={styles.txt2}>15 Nov 2019</Text>
					</TouchableOpacity>
					<View style={styles.viewSeparator} />

					<TouchableOpacity onPress={{}} style={styles.datesWrapper}>
						<Text style={styles.txt1}>Check In Date To</Text>
						<Text style={styles.txt2}>15 Nov 2019</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Animated.View>
		
		<View style={[styles.tabs, {backgroundColor: props.backgroundColor }, props.style ]}>
			{props.tabs.map((name, page) => {
				const isTabActive = activeTab === page;
				
				return renderTab(name, page, isTabActive, () => {
					active.setValue(page);
					props.goToPage(page);
				}, {...props});
			})}
			<DEFAnimated.View
				style={[
					tabUnderlineStyle,
					{
						transform: [
							{ translateX },
						],
					},
					props.underlineStyle,
				]}
			/>
		</View>
		</>
	);
};

CustomTab.propTypes = {
	goToPage: PropTypes.func,
	activeTab: PropTypes.number,
	containerWidth: PropTypes.number,
	tabs: PropTypes.array,
	backgroundColor: PropTypes.string,
	activeTextColor: PropTypes.string,
	inactiveTextColor: PropTypes.string,
	textStyle: Text.propTypes.style,
	tabStyle: PropTypes.object,
	renderTab: PropTypes.func,
	underlineStyle: PropTypes.object,
	style: PropTypes.object,
	scrollValue: PropTypes.object,
	ticketing: PropTypes.object,
};

CustomTab.defaultProps = {
	activeTextColor: "navy",
	inactiveTextColor: "black",
	backgroundColor: null,
};

const styles = StyleSheet.create({
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	tabs: {
		minHeight: 40,
		flexDirection: "row",
		justifyContent: "space-around",
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderColor: Color.text3,
	},

	viewFilter: {marginVertical: 10, paddingHorizontal: 20},
	viewSearch: {flexDirection: "row", height: 37, borderWidth: 1, borderColor: Color.text5, borderRadius: 5, paddingHorizontal: 6, alignItems: "center", justifyContent: "center"},
	inputSearch: {flex: 1, marginLeft: 3, paddingVertical: 0},
	view2: {flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15},
	txt1: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2},
	txt2: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 5},
	viewSeparator: {height: 40, width: 2, backgroundColor: Color.text5},
	datesWrapper: {flex: 1, alignItems: "center", justifyContent: "center"},

});

export default CustomTab;
