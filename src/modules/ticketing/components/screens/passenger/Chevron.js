/* eslint-disable react/display-name */
import React from "react";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import Animated from "react-native-reanimated";
import { bInterpolate } from "react-native-redash";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const size = 20;

export default ({ transition }) => {
	const rotateZ = bInterpolate(transition, Math.PI, 0);
	
	return (
		<Animated.View
			style={[styles.container, { transform: [{ rotateZ }] }]} >
			<Icon name="chevron-down" color="white" size={20} />
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	container: {
		height: size,
		width: size,
		backgroundColor: Color.LightBlue5,
		borderRadius: size / 2,
		justifyContent: "center",
		alignItems: "center",
	},
});
