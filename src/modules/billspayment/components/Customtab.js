/* eslint-disable react-native/no-inline-styles */
/* eslint-disable max-len */
import React from "react";
import { StyleSheet, Text, View, Animated, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const { Color } = Resource;

const renderTab = (name, page, isTabActive, onPressHandler, newProps) => {
	const { activeTextColor, inactiveTextColor, textStyle } = newProps;
	const textColor = isTabActive ? activeTextColor : inactiveTextColor;
	const fontWeight = isTabActive ? "bold" : "normal";

	return (
		<TouchableWithoutFeedback
			style={{ flex: 1 }}
			key={name}
			accessible
			accessibilityLabel={name}
			accessibilityTraits='button'
			onPress={() => onPressHandler(page)}
		>
			<View style={[styles.tab, newProps.tabStyle]}>
				<Text style={[textStyle, { color: textColor, fontWeight }]}>
					{name}
				</Text>
			</View>
		</TouchableWithoutFeedback>
	);
};

const CustomTab = (props) => {
	const { activeTab, goToPage } = props;
	const containerWidth = props.containerWidth;
	const numberOfTabs = props.tabs.length;
	const tabUnderlineStyle = {
		position: 'absolute',
		width: containerWidth / numberOfTabs,
		height: 1,
		backgroundColor: Color.LightBlue,
		bottom: 0,
	};

	const translateX = props.scrollValue.interpolate({
		inputRange: [0, 1],
		outputRange: [0, containerWidth / numberOfTabs],
	});

	return (
		<>
			<View style={[styles.tabs, { backgroundColor: props.backgroundColor }, props.style]}>
				{props.tabs.map((name, page) => {
					const isTabActive = activeTab === page;

					return renderTab(name, page, isTabActive, goToPage, { ...props });
				})}
				<Animated.View
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
		backgroundColor: "white",
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
});

export default CustomTab;
