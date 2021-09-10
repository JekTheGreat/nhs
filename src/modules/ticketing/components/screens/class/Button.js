import React from "react";
import {View, StyleSheet, Text, Platform, TouchableWithoutFeedback} from "react-native";
import Resource from "__src/resources";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";
const {Color} = Resource;

class Button extends React.PureComponent{
	render(){
		const {label, active, onPress} = this.props;
		const styleActive = active ?
			{backgroundColor: Color.colorPrimaryDark, shadowColor: Color.colorPrimaryDark} :
			{backgroundColor: Color.LightBlue5, shadowColor: Color.LightBlue5};
  
		return (
			<TouchableWithoutFeedback
				onPress={onPress}
				onPressIn={this.handlePressIn}
				onPressOut={this.handlePressOut}>
				<View style={[styles.container, styles.shadowStyle, styleActive]}>
					<Text style={styles.label}>{label}</Text>
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

Button.propTypes = {
	label: PropTypes.string,
	active: PropTypes.bool,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {height: 40, backgroundColor: Color.colorPrimaryDark, borderRadius: 5, alignItems: "center", justifyContent: "center"},
	triangleCorner: { width: 30, height: 30, alignItems: "center", justifyContent: "center",
		backgroundColor: "transparent", position: "absolute", bottom: 0, right: 0,
		borderStyle: "solid", borderRightWidth: 30, borderTopWidth: 30, borderRightColor: Color.LightBlue5,
		borderTopColor: Color.transparent, borderBottomRightRadius: 5,
	},
	checkIcon: {position: "absolute", bottom: 2, right: -29},
	label: {fontFamily: "Roboto", fontSize: 15, color: Color.white},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.colorPrimaryDark,
				shadowOpacity: .5, shadowRadius: 5, zIndex: 4},
			android: {elevation: 5},
		}),
	},
});


export default Button;
