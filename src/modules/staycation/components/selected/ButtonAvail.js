import React, {Component} from "react";
import {View, StyleSheet, Text, TouchableOpacity, Animated} from "react-native";
import  Comp  from "__src/components";
import Resource from "__src/resources";
import PropTypes from "prop-types";
import { isIphoneX } from "./IphoneX";

const BOTTOM_SIZE = isIphoneX() ? 20 : 0;
const {Color} = Resource;
const NAVBAR_HEIGHT = 43;

export default class ButtonAvail extends Component{
	render(){
		const {animationRange} = this.props;

		const navbarTranslate = animationRange.interpolate({
			inputRange: [0, NAVBAR_HEIGHT],
			outputRange: [0, (NAVBAR_HEIGHT )],
			extrapolate: "clamp",
		});
		const navbarOpacity = animationRange.interpolate({
			inputRange: [0, NAVBAR_HEIGHT],
			outputRange: [1, -0],
			extrapolate: "clamp",
		});

		
		return (
			<Animated.View style={[styles.container,
				{transform: [{translateY: navbarTranslate}]},
				{opacity: navbarOpacity}]}>
				<View style={styles.body}>
					<View style={styles.Wrapper01}>
						<Text style={styles.price}>PHP 1,2791 per night</Text>
						<Comp.Stars
							votes={108}
							txtVote
							size={15}
							color={Color.colorPrimary} />
					</View>
					<TouchableOpacity style={styles.Wrapper02}>
						<Text style={styles.check}>Check Availability</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		);
	}
}

ButtonAvail.propTypes = {
	animationRange: PropTypes.object,
};

const styles = StyleSheet.create({
	container: {
		borderTopWidth: 0.5, borderColor: Color.gray01,
		width: "100%", height: 50 + BOTTOM_SIZE, position: "absolute",
		bottom: 0, backgroundColor: "#FFFFFF",
		alignItems: "center", justifyContent: "center",
		paddingHorizontal: 20, paddingVertical: 10, paddingBottom: BOTTOM_SIZE,
	},
	body: {flexDirection: "row"},
	Wrapper01: {flex: 1, flexDirection: "column", alignItems: "flex-start"},
	Wrapper02: {
		flex: 1, borderRadius: 3,
		backgroundColor: Color.colorPrimary,  alignItems: "center", justifyContent: "center",
	},
	price: {
		fontWeight: "700", fontSize: 15,
		fontFamily: "Roboto", color: Color.txt,
	},
	check: {
		fontWeight: "700", fontSize: 15, textAlign: "center",
		fontFamily: "Roboto", color: "#FFFFFF",
	},
});
