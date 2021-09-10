import React from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const LIST_ITEM_HEIGHT = 70;

class PassengerItem extends React.PureComponent{
	render(){
		const {placeholder, value, onChangeText, label, isLast,
			imageResource, keyboardType, disabled, error} = this.props;
		const bottomRadius = isLast ? 15 : 0;
		const placeholderColor = !value && {color: Color.placeholder};
		const errorStyle = error ? {borderColor: "red"} : null;
		const errorTextStyle = error ? {color: "red"} : null;

		return (
			<View style={[styles.container, {
				borderBottomLeftRadius: bottomRadius,
				borderBottomRightRadius: bottomRadius,
			}]} >
				<View style={[styles.view1, errorStyle]}>
					<Text style={[styles.txtLabel, errorTextStyle]}>{label}</Text>
					<Image style={styles.imageStyle} source={Res.get(imageResource || "account")} resizeMode="contain"/>
					{onChangeText ? <TextInput editable={!disabled}
						style={styles.input} placeholder={placeholder}
						value={value} onChangeText={onChangeText} keyboardType={keyboardType} returnKeyType="done" /> :
						<Text style={[styles.input, placeholderColor]}>
							{value || placeholder}</Text>}
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
		paddingVertical: 8, paddingHorizontal: 16, height: LIST_ITEM_HEIGHT,
	},
	view1: {flexDirection: "row", flex: 1, height: 45, alignItems: "center", borderWidth: 1, borderColor: Color.text1, borderRadius: 20},
	input: {flex: 1, borderRadius: 30, fontFamily: "Roboto", fontSize: 14, paddingVertical: 0, backgroundColor: Color.transparent},
	txtLabel: {position: "absolute", top: -10, left: 30, backgroundColor: "white",
		fontFamily: "Roboto", fontSize: 13, color: Color.Header, paddingHorizontal: 3},
	imageStyle: {width: 17, height: 17, marginLeft: 15, marginRight: 6},
});

export default PassengerItem;
