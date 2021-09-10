/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Animated from "react-native-reanimated";
import { bInterpolate } from "react-native-redash";
import Resource from "__src/resources";
const {Color} = Resource;
const size = 20;

export default ({ transition }) => {
	const rotateZ = bInterpolate(transition, Math.PI, 0);
	
	return (
		<Animated.View
			style={[styles.container, { transform: [{ rotateZ }] }]} >
			<Icon name="chevron-down" color={Color.text2} size={25} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: size,
		width: size,
		backgroundColor: Color.transparent,
		borderRadius: size / 2,
		justifyContent: "center",
		alignItems: "center",
	},
});
