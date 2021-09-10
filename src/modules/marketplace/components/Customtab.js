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
		const { actions, marketplace: { setInputDetails } } = this.props;
		if (!_.isEqual(prevProps.tabs[prevProps.activeTab], this.props.tabs[this.props.activeTab])) {
			const newInput = _.merge({}, setInputDetails);
			let param = _.merge({}, newInput.route);
			param = this.props.tabs[this.props.activeTab];
			newInput.route = param;
			actions.setInputDetails(newInput);
		}
	}


	renderTab(name, page, isTabActive, onPressHandler) {
		const { actions, marketplace: { getNotifications } } = this.props;
		const obj = {
			homeLabel: "MarketPlace",
			homeIcon: "online_store_home",
			homeIconActive: "online_store_home_tint",
			dashboardLabel: "Dashboard",
			dashboardIcon: "online_store_dashboard",
			dashboardIconActive: "online_store_dashboard_tint",
			chatsLabel: "Chats",
			chatsIcon: "online_store_chats",
			chatsIconActive: "online_store_chats_tint",
			notificationsLabel: "Notifications",
			notificationsIcon: "online_store_notifications",
			notificationsIconActive: "online_store_notifications_tint",
			accountLabel: "Account",
			accountIcon: "menu_profile",
			accountIconActive: "menu_profile_tint",
		}

		let iconName;
		if (name === "MarketPlace") {
			iconName = isTabActive ? obj.homeIconActive : obj.homeIcon;
		} else if (name === "Chats") {
			iconName = isTabActive ? obj.chatsIconActive : obj.chatsIcon;
		} else if (name === "Notifications") {
			iconName = isTabActive ? obj.notificationsIconActive : obj.notificationsIcon;
		} else if (name === "Account") {
			iconName = isTabActive ? obj.accountIconActive : obj.accountIcon;
		} else if (name === "Dashboard") {
			iconName = isTabActive ? obj.dashboardIconActive : obj.dashboardIcon;
		}
		return (
			<TouchableWithoutFeedback
				key={name}
				accessible
				accessibilityLabel={name}
				accessibilityTraits='button'
				onPress={() => onPressHandler(page, name)} >
				<View style={[styles.tab, this.props.tabStyle]}>
					<View style={{ alignItems: "center" }}>
						<Image style={{ width: 18, height: 18, padding: 2 }} source={Res.get(iconName)} resizeMode="contain" />
						{_.isEqual(name, "Notifications") && _.has(getNotifications, "new") && (!_.isEqual(getNotifications.new, 0)) &&
							<View style={{
								position: "absolute", width: 15, height: 15, borderRadius: 20, backgroundColor: Colors.red600,
								right: 13, top: -5, justifyContent: "center", alignItems: "center",
							}}>
								<Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 8 }}>{getNotifications.new}</Text>
							</View>}
						<Text style={[isTabActive ? { color: Color.colorPrimaryMP, fontWeight: "bold" } : { color: "#5F7382" }, { fontFamily: "Roboto-Light", fontSize: 10, marginTop: 5 }]}>{name}</Text>
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
		height: 45,
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
