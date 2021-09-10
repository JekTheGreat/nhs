import React from "react";
import {View, Text, StyleSheet} from "react-native";
import Button from "__src/components/Button";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const {Color} = Resource;

const Footer = ({onPress}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.txtPrice}>
				<Text style={styles.txtPrice2}>P1,075.00</Text> / per night
			</Text>

			<Button style={styles.buttonStyle} onPress={onPress} label="Availability" />
		</View>
	);
};

Footer.propTypes = {
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {flexDirection: "row", alignItems: "center", justifyContent: "space-between",
		backgroundColor: "white", paddingHorizontal: 20, paddingVertical: 10,
		borderTopWidth: 0.7, borderTopColor: Color.text5},
	buttonStyle: {width: 130, borderBottomWidth: 0, backgroundColor: Color.colorPrimaryLight2},
	txtPrice: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2},
	txtPrice2: {fontFamily: "Roboto", fontWeight: "bold", color: Color.colorPrimaryLight2, fontSize: 16},
});

export default Footer;
