/* eslint-disable */
import React, {Component} from "react";
import { StyleSheet, TextInput, View, TouchableOpacity, Image, Text, Animated } from "react-native";
import Resources from "__src/resources";
import {PropTypes} from "prop-types";
const {Color, Res} = Resources;
const NAVBAR_HEIGHT = 43;

export default class SearchHeader extends Component{
	constructor(props){
		super(props);
		this.state = {
			search: "",
		};
	}

	HeaderBackground(){
		const {animationRange, state} = this.props;

		const navbarTranslate = animationRange.interpolate({
			inputRange: [0, NAVBAR_HEIGHT],
			outputRange: [0, -(NAVBAR_HEIGHT )],
			extrapolate: "clamp",
		});
		const navbarOpacity = animationRange.interpolate({
			inputRange: [0, NAVBAR_HEIGHT],
			outputRange: [1, -0],
			extrapolate: "clamp",
		});

		return (
			<Animated.View style={styles.headerBackground} >
				<View style={styles.viewSearch}>
					<Image source={Res.get("searchicon")} style={styles.imageSearch} />
					<TextInput
						placeholder="Search"
						style={styles.textfields}
						underlineColorAndroid="transparent"
						value={state}
						onChangeText={(e) => this.setState({search: e})}
						returnKeyType="go"
					/>
				</View>
				<Animated.View style={[styles.viewBtnAction,
					{transform: [{translateY: navbarTranslate}]}, {opacity: navbarOpacity}]}>
					<TouchableOpacity >
						<View style={[styles.btnCheckinWrapper, {}]}>
							<Text style={styles.txtCheckIn}>Check In</Text>
							<Image source={Res.get("calendaricongold")} style={styles.imageBtn} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity >
						<View style={[styles.btnCheckinWrapperWmargin,
							{}]}>
							<Text style={styles.txtCheckIn}>Check Out</Text>
							<Image source={Res.get("calendaricongold")} style={styles.imageBtn} />
						</View>
					</TouchableOpacity>
					<TouchableOpacity >
						<View style={[styles.btnCheckinWrapper, {}]}>
							<Text style={styles.txtCheckIn}>Guests</Text>
							<Image source={Res.get("guesticongold")} style={styles.imageBtn} />
						</View>
					</TouchableOpacity>
				</Animated.View>
		
			</Animated.View>
		);
	}


	render(){
		return (
			<View style={styles.container}>
				{this.HeaderBackground()}
			</View>
		);
	}

}

SearchHeader.propTypes = {
	animationRange: PropTypes.object,
	state: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		flex: 0,
		height: 115,
		width: "100%",
		backgroundColor: "transparent",
		justifyContent: "center",
		alignItems: "center",
	},
	headerBackground: {
		position: "absolute",
		flex: 0,
		flexDirection: "column",
		height: 115,
		width: "100%",
		backgroundColor: "transparent",
	},
	searchWrapper: {flex: 1, backgroundColor: Color.Standard,
		zIndex: 2,  justifyContent: "center", paddingTop: 10},
	imageSearch: {width: 20, height: 20},
	imageBtn: {width: 12, height: 12},
	viewSearch: {
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
		zIndex: 2,
		elevation: 2,
		marginHorizontal: 20,
		paddingHorizontal: 10,
		borderRadius: 3,
		backgroundColor: "white",
		height: 45,
		borderColor: "#999999",
		borderWidth: 0.7,
	},
	viewBtnAction: {
		flexShrink: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		height: 45,
		backgroundColor: Color.transparent,
	},
	textfields: {
		flex: 1,
		paddingHorizontal: 10,
		fontSize: 12,
		color: "#262626",
		fontFamily: "Roboto",
	},
	btnCheckinWrapper: {
		flexDirection: "row",
		backgroundColor: Color.Standard,
		alignItems: "center",
		width: 80,
		justifyContent: "center",
		paddingVertical: 10,
		borderRadius: 3,
		paddingHorizontal: 5,
	},
	btnCheckinWrapperWmargin: {
		flexDirection: "row",
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 10,
		paddingHorizontal: 5,
		width: 80,
		borderRadius: 3,
		marginHorizontal: 10,
	},
	txtCheckIn: {
		flex: 1, fontSize: 11, color: "white",
		fontFamily: "Roboto",
	},
});
