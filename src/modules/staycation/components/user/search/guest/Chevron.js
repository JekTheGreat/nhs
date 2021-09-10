import React from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Icon from "react-native-vector-icons/MaterialIcons";
import Animated from "react-native-reanimated";
import { bInterpolate } from "react-native-redash";
import Resource from "__src/resources";
const {Color} = Resource;
const size = 24;


const Chevron = ({ transition }) => {
	const rotateZ = bInterpolate(transition, Math.PI, 0);
	
	return (
		<Animated.View
			style={[styles.container, { transform: [{ rotateZ }] }]} >
			<Icon name="arrow-drop-down" color={Color.text1} size={size} />
		</Animated.View>
	);
};

Chevron.propTypes = {
	transition: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {
		height: size,
		width: size,
		borderRadius: size / 2,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Chevron;
