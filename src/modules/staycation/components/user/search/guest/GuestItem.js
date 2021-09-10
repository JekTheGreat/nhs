import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const LIST_ITEM_HEIGHT = 50;

class PassengerItem extends React.PureComponent{
	render(){
		const {placeholder, value, onChangeText, label, isLast,
			imageResource, keyboardType, disabled, error} = this.props;
		const bottomRadius = isLast ? 15 : 0;
		const errorStyle = error ? {borderColor: "red"} : null;

		return (
			<View style={[styles.container, {
				borderBottomLeftRadius: bottomRadius,
				borderBottomRightRadius: bottomRadius,
			}]} >
				<View style={[styles.view1, errorStyle]}>
					<TextInput
						style={styles.input} placeholder={placeholder}
						value={value} onChangeText={onChangeText} keyboardType={keyboardType} returnKeyType="done" />
				</View>
			</View>
		);
	}
}

PassengerItem.propTypes = {
	placeholder: PropTypes.string,
	value: PropTypes.string,
	label: PropTypes.string,
	imageResource: PropTypes.string,
	keyboardType: PropTypes.string,
	error: PropTypes.string,
	onChangeText: PropTypes.func,
	isLast: PropTypes.bool,
	disabled: PropTypes.bool,
};

const styles = StyleSheet.create({
	container: { backgroundColor: "white", flexDirection: "row", justifyContent: "space-between", alignItems: "center",
		marginVertical: 0, paddingHorizontal: 0, height: LIST_ITEM_HEIGHT,
	},
	view1: {flexDirection: "row", flex: 1, height: 38, alignItems: "center", borderWidth: 0.7, borderColor: Color.text1, borderRadius: 5},
	input: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingVertical: 0, marginLeft: 8},
	txtLabel: {position: "absolute", top: -10, left: 30, backgroundColor: "white",
		fontFamily: "Roboto", fontSize: 13, color: Color.Header, paddingHorizontal: 3},
	imageStyle: {width: 17, height: 17, marginLeft: 15, marginRight: 6},
});

export default PassengerItem;
