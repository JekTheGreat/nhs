import React from "react";
import {View, StyleSheet, Text, TouchableWithoutFeedback, Image} from "react-native";
import Resource from "__src/resources";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";
const {Color, Res} = Resource;

class BaggageChoices extends React.PureComponent{
	render(){
		const {title, subtitle, active, onPress, source} = this.props;
		const styleActive = active ? {borderColor: Color.LightBlue5} : {borderColor: Color.text1};
		const fontColor = active ? {color: Color.LightBlue5} : {color: Color.Header};
		const sourceImage = active ? `${source}_active` : source;

		return (
			<TouchableWithoutFeedback
				onPress={onPress}
				onPressIn={this.handlePressIn}
				onPressOut={this.handlePressOut}>

				<View style={[styles.container, styleActive]}>
					<Image style={styles.imageStyle} source={Res.get(sourceImage)} resizeMode="stretch"/>
					<Text style={[styles.text1, fontColor]}>{title}</Text>
					<Text style={[styles.text2, fontColor]}>{subtitle}</Text>
					{active && <View style={[styles.triangleCorner]}>
						<View style={styles.checkIcon}>
							<Icon name="check" size={15} color="white" />
						</View>
					</View>}
				</View>
			</TouchableWithoutFeedback>
		);
	}
};

BaggageChoices.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	source: PropTypes.string,
	active: PropTypes.bool,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {height: 75, width: "45%", borderWidth: 0.7, borderColor: Color.text1, borderRadius: 7, alignItems: "center", justifyContent: "center", marginBottom: 20},
	triangleCorner: { width: 30, height: 30, alignItems: "center", justifyContent: "center",
		backgroundColor: "transparent", position: "absolute", bottom: 0, right: 0,
		borderStyle: "solid", borderRightWidth: 30, borderTopWidth: 30, borderRightColor: Color.LightBlue5,
		borderTopColor: Color.transparent, borderBottomRightRadius: 5,
	},
	imageStyle: {width: 30, height: 30},
	text1: {fontFamily: "Roboto", fontSize: 10, color: Color.Header, marginTop: 5},
	text2: {fontFamily: "Roboto", fontSize: 10, color: Color.Header},
	checkIcon: {position: "absolute", bottom: 2, right: -29},
});


export default BaggageChoices;
