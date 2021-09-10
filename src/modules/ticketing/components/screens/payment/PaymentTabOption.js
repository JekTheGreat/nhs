/* eslint-disable max-len */
/* eslint-disable react/prefer-es6-class */
import React from "react";
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
const {Color, Res} = Resource;

class PaymentTabOption extends React.PureComponent{
	
	getImage = (name) => {
		switch (name){
		case "Payment Partners":
			return "money";
		case "Debit/Credit Card":
			return "credit_card";
		case "E-Wallet":
			return "wallet";
		}
	}

	renderTab(name, page, isTabActive, onPressHandler) {
		const suffix = isTabActive ? "_active" : "";
  
		const activeStyle = {
			zIndex: 2,
			transform: [{ scale: 1}],
		};

		return (
			<TouchableWithoutFeedback
				key={name}
				accessible
				accessibilityLabel={name}
				accessibilityTraits='button'
				onPress={() => onPressHandler(page)} >
					
				<View style={[styles.tab, this.props.tabStyle, isTabActive && activeStyle, isTabActive && styles.shadowStyle]}>
					<View style={[styles.view1]}>
						<Image style={styles.imageDepart} source={Res.get(`${this.getImage(name)}${suffix}`)} resizeMode="contain"/>
						<Text style={styles.textLabel}>{name}</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	render() {
		return (
			<View style={[styles.tabs, {backgroundColor: this.props.backgroundColor }, this.props.style ]}>
				{this.props.tabs.map((name, page) => {
					const isTabActive = this.props.activeTab === page;
					
					return this.renderTab(name, page, isTabActive, this.props.goToPage);
				})}
			</View>
		);
	}
};

PaymentTabOption.propTypes = {
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

PaymentTabOption.defaultProps = {
	activeTextColor: "navy",
	inactiveTextColor: "black",
	backgroundColor: null,
};

const styles = StyleSheet.create({
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Color.white,
		borderWidth: 0.5, borderColor: Color.text1,
	},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.LightBlue5, borderTopWidth: 8, borderRadius: 2,
				shadowOpacity: .5, shadowRadius: 5, zIndex: 4, borderColor: Color.LightBlue5},
			android: {elevation: 8, shadowColor: Color.LightBlue5, borderColor: Color.LightBlue5,
				borderWidth: 1, borderTopWidth: 8, borderRadius: 2},
		}),
	},
	tabs: {
		height: 60,
		flexDirection: "row",
		justifyContent: "space-around",
		borderWidth: 1,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
		borderColor: Color.white,
	},
	view1: {alignItems: "center", justifyContent: "center"},
	textLabel: {fontFamily: "Roboto-Medium", fontSize: 11, color: Color.Header, marginTop: 3},
	imageDepart: {width: 25, height: 25},
});

export default PaymentTabOption;
