import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated from "react-native-reanimated";
import PropTypes from "prop-types";

const { Extrapolate, interpolate } = Animated;
const { height: wHeight, width: wWidth } = Dimensions.get("window");

export const HEADER_IMAGE_HEIGHT = wHeight / 3.2;
const styles = StyleSheet.create({
	image: {
		position: "absolute",
		top: 0,
		left: 0,
		width: wWidth,
		resizeMode: "cover",
	},
});

const HeaderImage = ({ y }) => {
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
			source={{uri: "https://www.gstatic.com/webp/gallery/4.jpg"}}
			style={[styles.image, { top, height }]}
		/>
	);
};

HeaderImage.propTypes = {
	y: PropTypes.object,
};

export default HeaderImage;
