import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
const {interpolate, Extrapolate} = Animated;
const { height: wHeight, width: wWidth } = Dimensions.get("window");
export const HEADER_IMAGE_HEIGHT = (wHeight + 50) / 3;

export default ({y}) => {
	const height = interpolate(y, {
		inputRange: [-100, 0],
		outputRange: [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
		extrapolateRight: Extrapolate.CLAMP,
	});
	const top = interpolate(y, {
		inputRange: [0, 100],
		outputRange: [0, -100],
		extrapolateLeft: Extrapolate.CLAMP,
	});
	
	return (
		<Animated.Image
			source={{uri: "https://i.imgur.com/SsJmZ9jl.jpg"}}
			style={[styles.image, { top, height }]}
		/>
	);
};

const styles = StyleSheet.create({
	image: {
		position: "absolute",
		top: 0,
		left: 0,
		width: wWidth,
		resizeMode: "cover",
	},
});

