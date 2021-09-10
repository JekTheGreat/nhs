/* eslint-disable max-len */
/* eslint-disable */
import * as React from "react";
import {
	Image, View, StyleSheet, Text,
	TouchableWithoutFeedback, Animated, Dimensions,
} from "react-native";
import _ from 'lodash';
import PropTypes from "prop-types";
import { Colors } from "react-native-paper";
import Resources from "__src/resources";
const { Res } = Resources;
export const height = 55;
const { width } = Dimensions.get("window");

export default class StaticTabbar extends React.PureComponent {

	componentDidUpdate(prevProps) {
		// const { actions, navigationState: { index, routes }, onlinestore: { setInputDetails } } = this.props;
		// if (!_.isEqual(prevProps.navigationState.index, index)) {
		// 	this.forceUpdate();
		// 	const newInput = _.merge({}, setInputDetails);
		// 	newInput.route = routes[index].key;
		// 	actions.setInputDetails(newInput);
		// }
	}

	values = [];

	constructor(props) {
		super(props);
		const { routes: tabs } = props.navigation.state;
		this.values = tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0));
	}


	onPress = (route) => {
		const { value, navigation } = this.props;
		const { routes: tabs } = navigation.state;
		const tabWidth = width / tabs.length;
		Animated.sequence([
			Animated.parallel(
				this.values.map((v) => Animated.timing(v, {
					toValue: 0,
					duration: 100,
					useNativeDriver: true,
				})),
			),
			Animated.parallel([
				Animated.timing(value, {
					toValue: tabWidth * route,
					duration: 200,
					useNativeDriver: true,
				}),
				Animated.timing(this.values[route], {
					toValue: 1,
					duration: 200,
					useNativeDriver: true,
				}),
			]),
		]).start();
	}

	_renderImage1 = ({ route: { routeName } }) => {
		// const { onlinestore: { setOnlineStoreScreen, setInputDetails, getCartList } } = this.props;
		const { screenProps } = this.props;

		let iconName;
		let iconLabel;
		if (routeName === "Market Place") {
			iconName = "online_store_home";
			iconLabel = "Market Place"
		} else if (routeName === "Chats") {
			iconName = "online_store_cart";
			iconLabel = "Chats"
		} else if (routeName === "Notifications") {
			iconName = "online_store_home";
			iconLabel = "Notifications"
		} else if (routeName === "Account") {
			iconName = "menu_profile";
			iconLabel = "Account"
		}

		return <View style={{ justifyContent: "center", alignItems: "center" }}>
			{/* {
				_.isEqual(iconName, "online_store_cart") && (!_.isUndefined(screenProps)) ?
					<View style={{
						position: "absolute", width: 15, height: 15, borderRadius: 20, backgroundColor: Colors.red600,
						right: -13, top: -5, justifyContent: "center", alignItems: "center",
					}}>
						<Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 10 }}>{screenProps}</Text>
					</View>
					: null
			} */}
			<Image style={styles.imageStyle} source={Res.get(iconName)} resizeMode="contain" />
			<Text style={{ fontFamily: "Roboto-Light", fontSize: 10, color: "#5F7382", marginTop: 5 }}>{`${iconLabel}`}</Text>
		</View>;
	}

	_renderImage2 = ({ route: { routeName } }) => {
		// const { onlinestore: { setOnlineStoreScreen, setInputDetails, getCartList } } = this.props;
		const { screenProps } = this.props;
		let iconName;
		let iconLabel;
		if (routeName === "Market Place") {
			iconName = "online_store_home_tint";
			iconLabel = "Market Place"
		} else if (routeName === "Chats") {
			iconName = "online_store_cart_tint";
			iconLabel = "Chats"
		} else if (routeName === "Notifications") {
			iconName = "online_store_home_tint";
			iconLabel = "Notifications"
		} else if (routeName === "Account") {
			iconName = "menu_profile_tint";
			iconLabel = "Account"
		}

		return <View style={{ alignItems: "center" }}>
			{/* {
				_.isEqual(iconName, "online_store_cart_tint") && (!_.isUndefined(screenProps)) ?
					<View style={{
						position: "absolute", width: 15, height: 15, borderRadius: 20, backgroundColor: Colors.red600,
						right: -13, top: -5, justifyContent: "center", alignItems: "center",
					}}>
						<Text style={{ backgroundColor: 'transparent', color: 'white', fontSize: 10 }}>{screenProps}</Text>
					</View>
					: null
			} */}
			<Image style={styles.imageStyle} source={Res.get(iconName)} resizeMode="contain" />
			<Text style={{ fontFamily: "Roboto-Light", fontSize: 10, color: "#EEB91A", marginTop: 5, fontWeight: "bold" }}>{`${iconLabel}`}</Text>
		</View>;
	}

	render() {
		const { onTabPress, navigation, } = this.props;
		const { routes: tabs, index: activeRouteIndex } = navigation.state;
		const { value } = this.props;
		return (
			<View style={styles.container}>
				{
					tabs.map((route, key) => {
						const focused = key === activeRouteIndex;
						const scene = { route, focused };
						const tabWidth = width / tabs.length;
						const cursor = tabWidth * key;
						const opacity = value.interpolate({
							inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
							outputRange: [1, 0, 1],
							extrapolate: "clamp",
						});
						const translateY = this.values[key].interpolate({
							inputRange: [0, 1],
							outputRange: [height + 50, 0],
							extrapolate: "clamp",
						});
						const opacity1 = this.values[key].interpolate({
							inputRange: [0, 1],
							outputRange: [0, 1],
							extrapolate: "clamp",
						});

						return (
							<React.Fragment key={`key${key}`}>
								{
									focused ? <TouchableWithoutFeedback
										onPress={() => {
											onTabPress({ route });
										}}>
										<Animated.View
											style={[styles.tab]}>
											<View style={styles.activeIcon}>
												{this._renderImage2(scene)}
											</View>
										</Animated.View>
									</TouchableWithoutFeedback> :
										<TouchableWithoutFeedback
											onPress={() => {
												onTabPress({ route });
												if (!focused) {
													this.onPress(key);
												}
											}}>
											<Animated.View style={[styles.tab, { opacity }]}>
												{this._renderImage1(scene)}
											</Animated.View>
										</TouchableWithoutFeedback>
								}
							</React.Fragment>
						);
					})
				}
			</View>
		);
	}
}

StaticTabbar.propTypes = {
	navigation: PropTypes.object,
	onTabPress: PropTypes.func,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.Animated]),
};

StaticTabbar.defaultProps = {
	onTabPress: null,
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	tab: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		height,
	},
	activeIcon: {
		backgroundColor: "white",
		width: 65,
		height: 55,
		justifyContent: "center",
		alignItems: "center",
	},
	activeView: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		top: -15
	},
	imageStyle: { width: 30, height: 25, },
});