/* eslint-disable max-len */
// /* eslint-disable */
import * as React from "react";
import {
	Image, View, StyleSheet,
	TouchableWithoutFeedback, Animated, Dimensions,
} from "react-native";
// eslint-disable-next-line import/default
// import SvgUri from "react-native-svg-uri";
import PropTypes from "prop-types";
import Home from "__src/resources/svg/Home";
import Hospital from "__src/resources/svg/Hospital";
import Fitness from "__src/resources/svg/Fitness";
import Articles from "__src/resources/svg/Articles";
import Inbox from "__src/resources/svg/Inbox";
import Notification from "__src/resources/svg/Notification";
import Resources from "__src/resources";
const { Res } = Resources;
export const height = 55;
const { width } = Dimensions.get("window");

console.log("THSPOIHG", this.props);

export default class StaticTabbar extends React.PureComponent {

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
					duration: 100,
					useNativeDriver: true,
				}),
				Animated.timing(this.values[route], {
					toValue: 1,
					duration: 100,
					useNativeDriver: true,
				}),
			]),
		]).start();
	}

	_renderIcon = ({ route: { routeName } }) => {
		switch (routeName) {
			case "Home":
				return <Hospital size={28} />;
			case "Step Tracker":
				return <Fitness size={28} />;
			case "Articles":
				return <Articles size={28} />;
		}
	}

	_renderIconActive = ({ route: { routeName } }) => {
		switch (routeName) {
			case "Home":
				return <Hospital size={28} isActive />;
			case "Step Tracker":
				return <Fitness size={28} isActive />;
			case "Articles":
				return <Articles size={28} isActive />;
		}
	}

	render() {
		const {
			onTabPress,
			navigation,
		} = this.props;
		const { routes: tabs, index: activeRouteIndex } = navigation.state;
		const { value } = this.props;
		console.log("Tabbar", this.props)

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
								<TouchableWithoutFeedback
									onPress={() => {
										onTabPress({ route });
										if (!focused) {
											this.onPress(key);
										}
									}}>
									<Animated.View style={[styles.tab, { opacity }]}>
										{this._renderIcon(scene)}
									</Animated.View>
								</TouchableWithoutFeedback>
								<TouchableWithoutFeedback
									onPress={() => {
										onTabPress({ route });
									}}>
									<Animated.View
										style={[styles.activeView, {
											left: tabWidth * key,
											width: tabWidth, height, opacity: opacity1,
											transform: [{ translateY }],
										}]}>
										<View style={styles.activeIcon}>
											{this._renderIconActive(scene)}
										</View>
									</Animated.View>
								</TouchableWithoutFeedback>
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
		width: 44,
		height: 44,
		borderRadius: 44 / 2,
		justifyContent: "center",
		alignItems: "center",
	},
	activeView: {
		position: "absolute",
		justifyContent: "center",
		alignItems: "center",
		top: -15
	},
	imageStyle: { width: 28, height: 28, padding: 2 },
});
