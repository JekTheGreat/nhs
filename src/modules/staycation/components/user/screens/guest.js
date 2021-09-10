import React from "react";
import {View, Text, Image, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const {Res, Color} = Resource;

class Guest extends React.PureComponent{
	render(){
		const {label, counter} = this.props;

		return (
			<View style={styles.container}>
				<Text style={styles.labelStyle}>{label}</Text>
				<View style={styles.buttonWrapper}>
					<Image style={styles.imageStyle} source={Res.get("minus")}/>
					<Text style={styles.txtNumber}>{counter}</Text>
					<Image style={styles.imageStyle} source={Res.get("plus")}/>
				</View>
			</View>
		);
	}
}

Guest.propTypes = {
	label: PropTypes.string,
	counter: PropTypes.number,
};

const styles = StyleSheet.create({
	container: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 20},
	labelStyle: {fontFamily: "Roboto-Light", fontSize: 18, color: Color.text2},
	buttonWrapper: {flexDirection: "row", alignItems: "center", justifyContent: "center"},
	imageStyle: {width: 30, height: 30},
	txtNumber: {fontFamily: "Roboto-Light", color: Color.text2, fontSize: 18, width: 50, textAlign: "center"},
});

export default Guest;
