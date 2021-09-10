/* eslint-disable max-len */
/* eslint-disable react/prefer-es6-class */
import React from "react";
import { StyleSheet, Text, View, Animated, Image, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import Resource from "__src/resources";
const {Color, Res} = Resource;

class CustomTab extends React.PureComponent{

	getData = (page) => {
		const {ticketing: {setTicketingInput} } = this.props;
		const originCity = setTicketingInput.origin.location.split(",");
		const desCity = setTicketingInput.destination.location.split(",");
		const departLocation = originCity[originCity.length - 1].trim();
		const returnLocation = desCity[desCity.length - 1].trim();
		const departIata = setTicketingInput.origin.iata;
		const returnIata = setTicketingInput.destination.iata;

		if (page > 0){
			return {departIata: returnIata, returnIata: departIata,
				departLocation: returnLocation, returnLocation: departLocation};
		}

		return {departIata, returnIata, departLocation, returnLocation};
	}

	getDataWithConnecting = (page) => {
		const {ticketing: {setTicketingInput} } = this.props;
		const originCity = setTicketingInput.origin.location.split(",");
		const desCity = setTicketingInput.destination.location.split(",");
		const departLocation = originCity[originCity.length - 1].trim();
		const returnLocation = desCity[desCity.length - 1].trim();
		const departIata = setTicketingInput.origin.iata;
		const returnIata = setTicketingInput.destination.iata;

		if (page > 0){
			return {departIata: returnIata, returnIata: departIata,
				departLocation: returnLocation, returnLocation: departLocation};
		}

		return {departIata, returnIata, departLocation, returnLocation};
	}
	
	renderTab(name, page, isTabActive, onPressHandler) {
		const {ticketing: {setTicketingInput} } = this.props;
		const opacity = isTabActive ? {opacity: 1} : {opacity: 0.7};
    
		if (_.isEmpty(setTicketingInput.origin)){
			return null;
		}

		const {departIata, returnIata, departLocation, returnLocation} = this.getData(page);
		const page0  = page === 0 ? {borderTopLeftRadius: 20} : null;

		return (
			<TouchableWithoutFeedback
				key={name}
				accessible
				accessibilityLabel={name}
				accessibilityTraits='button'
				onPress={() => onPressHandler(page, name)} >
				<View style={[styles.tab, this.props.tabStyle, page0]}>
					<View style={[styles.view1, opacity]}>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{departIata}</Text>
							<Text style={styles.txtCountry}>{departLocation}</Text>
						</View>
						<Image style={styles.imageDepart} source={Res.get("depart_white")} resizeMode="contain"/>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{returnIata}</Text>
							<Text style={styles.txtCountry}>{returnLocation}</Text>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	render() {
		const containerWidth = this.props.containerWidth;
		const numberOfTabs = this.props.tabs.length;
		const tabUnderlineStyle = {
			position: "absolute",
			width: containerWidth / numberOfTabs,
			height: 4,
			backgroundColor: Color.colorPrimary,
			bottom: 0,
		};

		const translateX = this.props.scrollValue.interpolate({
			inputRange: [0, 1],
			outputRange: [0,  containerWidth / numberOfTabs],
		});
		
		return (
			<View style={[styles.tabs, {backgroundColor: this.props.backgroundColor }, this.props.style ]}>
				{this.props.tabs.map((name, page) => {
					const isTabActive = this.props.activeTab === page;
					
					return this.renderTab(name, page, isTabActive, this.props.goToPage);
				})}
				<Animated.View
					style={[
						tabUnderlineStyle,
						{
							transform: [
								{ translateX },
							],
						},
						this.props.underlineStyle,
					]}
				/>
			</View>
		);
	}
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
		backgroundColor: Color.Header,
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
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "center"},
	viewCenter: {alignItems: "center"},
	txtIata: {fontFamily: "Montserrat-Medium", fontSize: 12, color: Color.white},
	txtCountry: {fontFamily: "Montserrat-Medium", fontSize: 7, color: Color.white},
	imageDepart: {width: 15, height: 15, marginHorizontal: 5},
});

export default CustomTab;
