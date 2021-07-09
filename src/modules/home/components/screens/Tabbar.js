/* eslint-disable */
import * as React from "react";
import { SafeAreaView, StyleSheet, Dimensions, View, Animated } from "react-native";
import * as shape from "d3-shape";
import Svg, { Path } from "react-native-svg";
import StaticTabbar, { height } from "./StaticTabbar";
import Resources from "__src/resources";
import REAnimated from "react-native-reanimated";
const { Color } = Resources;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const { width } = Dimensions.get("window");
const tabWidth = width / 3;
const backgroundColor = "white";

const getPath = () => {
	const left = shape.line().x((d) => d.x).y((d) => d.y)([
		{ x: 0, y: 0 },
		{ x: width, y: 0 },
	]);
	const tab = shape.line().x((d) => d.x).y((d) => d.y).curve(shape.curveBasis)([
		{ x: width, y: 0 },
		{ x: width - 50, y: 0 },
		{ x: width + 10, y: 0 },
		{ x: width + 15, y: height / 1.37 },

		{ x: width + tabWidth - 15, y: height / 1.37 },
		{ x: width + tabWidth - 10, y: 0 },
		{ x: width + tabWidth + 20, y: 0 },
		{ x: width + tabWidth, y: 0 },
	]);
	const right = shape.line().x((d) => d.x).y((d) => d.y)([
		{ x: width, y: 0 },
		{ x: width * 2, y: 0 },
		{ x: width * 2, y: height },
		{ x: 0, y: height },
		{ x: 0, y: 0 },
	]);

	return `${left} ${tab} ${right}`;
};
const d = getPath();

const {
	Value,
} = REAnimated;

export default class Tabbar extends React.PureComponent {

	value = new Animated.Value(0);
	translationY = new Value(0);



	render() {
		const { value } = this;
		const translateX = value.interpolate({
			inputRange: [0, width],
			outputRange: [-width, 0],
			extrapolate: "clamp",
		});

		return (
			<View style={[styles.style]} >
				<View {...{ height, width, backgroundColor: Color.transparent }}>
					<AnimatedSvg width={width * 2} {...{ height }} style={{ transform: [{ translateX }] }}>
						<Path fill={backgroundColor} {...{ d }} />
					</AnimatedSvg>
					<View style={[StyleSheet.absoluteFill]}>
						<StaticTabbar {...this.props} value={value} />
					</View>
				</View>
				<SafeAreaView style={styles.container} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { backgroundColor: Color.white },
	style: {
		backgroundColor: Color.transparent,
		position: 'absolute', left: 0, right: 0, bottom: 0
	},
	playerSheet: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "cyan",
	},
});
