import React from "react";
import { Dimensions, StyleSheet} from "react-native";
import Svg, {Circle} from "react-native-svg";
import Animated, {Easing} from "react-native-reanimated";
import { loop } from "react-native-redash";
import { useMemoOne } from "use-memo-one";
import Resource from "__src/resources";
const {Color} = Resource;

const { interpolate, multiply, Clock, useCode, set, Value, block,
	cond, startClock, not, clockRunning, and } = Animated;
const { width } = Dimensions.get("window");
const size = (width / 2) + 20;
const strokeWidth = 15;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const { PI } = Math;
const r = (size - strokeWidth) / 2;
const cx = size / 2;
const cy = size / 2;

const CircularProgress =  () => {
	const circumference = r * 2 * PI;
  
	const { animation, clock } = useMemoOne(
		() => ({
			animation: new Value(0),
			clock: new Clock(),
		}),
		[]
	);
  
	useCode(
		block([
			cond(and(not(clockRunning(clock)), true), startClock(clock)),
			set(
				animation,
				loop({
					clock,
					duration: 4000,
					easing: Easing.inOut(Easing.ease),
					boomerang: true,
					autoStart: false,
				})
			),
		]),
		[]
	);

	const α = interpolate(animation, {
		inputRange: [0, 1],
		outputRange: [0, PI * 2],
	});
	const strokeDashoffset = multiply(α, r);
  
	console.log("circumference", circumference);
	
	return (
		<Svg width={size} height={size} style={styles.container}>
			<Circle
				stroke="transparent"
				fill="none"
				{...{
					strokeWidth, cx, cy, r,
				}}
			/>
			<AnimatedCircle
				stroke={Color.LightBlue5}
				fill="none"
				strokeDasharray={`${circumference} ${circumference}`}
				{...{
					strokeDashoffset, strokeWidth, cx, cy, r,
				}}
			/>
		</Svg>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center", justifyContent: "center",
		transform: [{ rotateZ: "270deg" }],
	},
});

export default CircularProgress;
