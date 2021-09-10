/* eslint-disable*/
/* eslint-disable react/prefer-es6-class */
import React from "react";
import { StyleSheet, Text, View, Animated, Image, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import { Colors } from "react-native-paper";
import Resource from "__src/resources";
const { Color, Res } = Resource;

class CustomTab extends React.PureComponent {

	componentDidUpdate(prevProps) {
		const { actions, onlinestore: { setInputDetails, getCartList } } = this.props;
		if (!_.isEqual(prevProps.tabs[prevProps.activeTab], this.props.tabs[this.props.activeTab])) {
			const newInput = _.merge({}, setInputDetails);
			let param = _.merge({}, newInput.route);
			param = this.props.tabs[this.props.activeTab];
			newInput.route = param;
			actions.setInputDetails(newInput);
		}
	}

	renderTab(name, page, isTabActive, onPressHandler) {
		// const {ticketing: {setTicketingInput} } = this.props;
		// const opacity = isTabActive ? {opacity: 1} : {opacity: 0.7};

		// if (_.isEmpty(setTicketingInput.origin)){
		// 	return null;
		// }
		const { onlinestore: { setInputDetails } } = this.props;
		const obj = {
			homeLabel: "Online Store",
			homeIcon: "online_store_home",
			homeIconActive: "online_store_home_tint",
			cartLabel: "My Cart",
			cartIcon: "online_store_cart",
			cartIconActive: "online_store_cart_tint",
			accountLabel: "Account",
			accountIcon: "menu_profile",
			accountIconActive: "menu_profile_tint",
		}

		let iconName;
		if (name === "Online Store") {
			iconName = isTabActive ? obj.homeIconActive : obj.homeIcon;
		} else if (name === "My Cart") {
			iconName = isTabActive ? obj.cartIconActive : obj.cartIcon;
		} else if (name === "Account") {
			iconName = isTabActive ? obj.accountIconActive : obj.accountIcon;
		} else if (name === "Switch name 1") {
			iconName = isTabActive ? obj.accountIconActive : obj.accountIcon;
		} else if (name === "Switch name 1") {
			iconName = isTabActive ? obj.accountIconActive : obj.accountIcon;
		} else if (name === "Switch name 1") {
			iconName = isTabActive ? obj.accountIconActive : obj.accountIcon;
		}

		// const {departIata, returnIata, departLocation, returnLocation} = this.getData(page);
		// const page0  = page === 0 ? {borderTopLeftRadius: 20} : null;

		return (
			<TouchableWithoutFeedback
				key={name}
				accessible
				accessibilityLabel={name}
				accessibilityTraits='button'
				onPress={() => onPressHandler(page, name)} >
				<View style={[styles.tab, this.props.tabStyle]}>
					{/* <View style={[styles.view1, opacity]}>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{departIata}</Text>
							<Text style={styles.txtCountry}>{departLocation}</Text>
						</View>
						<Image style={styles.imageDepart} source={Res.get("depart_white")} resizeMode="contain"/>
						<View style={styles.viewCenter}>
							<Text style={styles.txtIata}>{returnIata}</Text>
							<Text style={styles.txtCountry}>{returnLocation}</Text>
						</View>
					</View> */}

					<View style={{ alignItems: "center" }}>
						{_.isEqual(name, "My Cart") && (!_.isUndefined(setInputDetails.countCart)) && (!_.isEqual(setInputDetails.countCart, 0)) &&
							<View style={{
								position: "absolute", width: 15, height: 15, borderRadius: 20, backgroundColor: Colors.red600,
								right: -13, top: -5, justifyContent: "center", alignItems: "center",
							}}>
								<Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 10 }}>{setInputDetails.countCart}</Text>
							</View>}
						<Image style={{ width: 28, height: 28, padding: 2 }} source={Res.get(iconName)} resizeMode="contain" />
						<Text style={{ fontFamily: "Roboto-Light", fontSize: 10, color: "#5F7382", marginTop: 5 }}>{name}</Text>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}

	render() {
		return (
			<View style={[styles.tabs, { backgroundColor: this.props.backgroundColor }, this.props.style]}>
				{this.props.tabs.map((name, page) => {
					const isTabActive = this.props.activeTab === page;
					return this.renderTab(name, page, isTabActive, this.props.goToPage);
				})}
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
		backgroundColor: Color.white,
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
	view1: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
	viewCenter: { alignItems: "center" },
	txtIata: { fontFamily: "Montserrat-Medium", fontSize: 12, color: Color.white },
	txtCountry: { fontFamily: "Montserrat-Medium", fontSize: 7, color: Color.white },
	imageDepart: { width: 15, height: 15, marginHorizontal: 5 },
});

export default CustomTab;
