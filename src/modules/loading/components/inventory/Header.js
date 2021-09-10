/* eslint-disable no-unused-vars */
/* eslint-disable no-inline-comments */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Platform} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const {Color} = Resource;


const Header = (props) => {
	const {loading: { searchInputInventory, setPlancodeTabScreen},
		onSearch, onChangeText1, onRecent, options, category} = props;
  
	return (
		<>
			<View style = {styles.container}>
				<View style={[styles.view4]}>
					<TextInput style={styles.input6}
						placeholder= {`Search ${category}`}
						value={searchInputInventory}
						editable
						keyboardType="default" returnKeyType="done"
						onChangeText={onChangeText1} />
					<TouchableOpacity activeOpacity={0.8} onPress={onSearch}>
						<Text style={styles.txtEdit}>{"Search"}</Text>
					</TouchableOpacity>
				</View>
				{/* <TouchableOpacity activeOpacity={0.8} style = {{height: 32, marginLeft: 8,
					marginTop: 3, backgroundColor: Color.colorPrimary, borderRadius: 15,
					alignItems: "center", justifyContent: "center"}} onPress ={onRecent}>
					<Text style={styles.txtEditWhite}>
					{setPlancodeTabScreen == "Recent" ? "Hide" : "Recent"}</Text>
				</TouchableOpacity> */}
			</View>
			{/* <View style = {{marginTop: -12, marginBottom: 10}}>
				<Text style ={styles.txtNote1}>
					* The search will be done on the category selected *</Text>
			</View> */}
			{/* <View style = {{flexDirection: "row", marginTop: -12}}>
				<Text style={styles.txtCategory}>{"Category: "}</Text>
				<TouchableOpacity style = {styles.pickerContainer}>
					<RNPickerSelect
						onValueChange={onChangeCategory}
						items={options}
						placeholder = {{
							label: "Select a category...",
						}}
						useNativeAndroidPickerStyle = {false}
					/>
				</TouchableOpacity>
			</View> */}
			<Text style={styles.txtNote}>SELECT AN OPTION FROM BELOW</Text>
		</>
	);
};

Header.propTypes = {
	loading: PropTypes.object,
	onChangeText: PropTypes.func,
	onPressCountry: PropTypes.func,
	onContactShow: PropTypes.func,
	onSearch: PropTypes.func,
	disabled: PropTypes.bool,
	onChangeText1: PropTypes.func,
	onRecent: PropTypes.func,
	options: PropTypes.array,
	onChangeCategory: PropTypes.func,
	category: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {flexDirection: "row", margin: 20, alignItems: "center", justifyContent: "space-between"},
	imageCurrency: {width: 26, height: 26},
	txtNumber: {flexShrink: 1, fontFamily: "Roboto", fontSize: 16, color: Color.Header, marginLeft: 7},
	input6: {flex: 1, borderRadius: 30, fontFamily: "Roboto", fontSize: 16,
		paddingVertical: 0, backgroundColor: Color.transparent},
	view2: {flexDirection: "row", flexShrink: 1, height: 37, minWidth: 30, alignItems: "center", backgroundColor: "white",
		justifyContent: "center", borderWidth: 0.5, borderColor: Color.text1, borderRadius: 25, paddingHorizontal: 8},
	view3: {flexDirection: "row", flex: 1, height: 37, alignItems: "center", justifyContent: "center", marginLeft: 8,
		borderWidth: 0.5, borderColor: Color.text1, borderRadius: 25, backgroundColor: "white", paddingHorizontal: 12},
	view4: {flexDirection: "row", flexShrink: 1, height: 37, width: "85%", alignItems: "center", backgroundColor: "white",
		justifyContent: "center", borderWidth: 0.5, borderColor: Color.text1, borderRadius: 25, paddingHorizontal: 5, marginLeft: 20},
	txtTelco: {fontFamily: "Roboto", fontSize: 13, marginHorizontal: 5, color: Color.text2},
	separator: {height: 37, width: 1, backgroundColor: Color.text1},
	padL10: {paddingLeft: 10},
	txtEdit: {fontFamily: "Roboto", fontSize: 14, marginLeft: 7, color: Color.colorPrimary},
	txtCategory: {fontFamily: "Roboto", fontSize: 12, marginLeft: 55, color: Color.Header, marginRight: 5},
	txtEditWhite: {fontFamily: "Roboto", fontSize: 12, color: Color.white, padding: 8},
	txtNote: {fontFamily: "Roboto", fontSize: 13, color: Color.Header, textAlign: "center", marginBottom: 10, marginTop: Platform.OS == "ios" ? 15 : 2},
	shadowRemove: {backgroundColor: "white", borderColor: Color.border1},
	shadowStyle: {
		...Platform.select({
			ios: {shadowOffset: {width: 0, height: 5}, shadowColor: Color.text1,
				shadowOpacity: 0.5, shadowRadius: 5, zIndex: 4},
			android: {elevation: 5},
		}),
	},
	pickerContainer: {marginTop: Platform.OS == "android" ? -15 : 0, width: "40%"},
	// txtNote1: {fontFamily: "Roboto", fontSize: 12, marginLeft: 35, color: Color.lightred },
});

export default Header;
