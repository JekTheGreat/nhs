import React, {PureComponent} from "react";
import {View, Text, StyleSheet} from "react-native";
import TxtInput from "./TxtInput";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import Resource from "__src/resources";
const {Color} = Resource;

class DropDownItem extends PureComponent {

	renderBase() {
		const {value, placeholder, isInput, label,
			err, onChangeText} = this.props;
		const newVal = value || placeholder;
		const color = value ? Color.Standard2 : Color.Standard;

		if (isInput){
			return (
				<TxtInput
					{...{value}}
					{...{label}}
					{...{placeholder}}
					{...{err}}
					{...{onChangeText}}/>
			);
		}

		return (
			<View style={styles.renderBaseWrapper}>
				<Text style={[styles.input, {color}]}>
					{newVal}
				</Text>
				<Icon name='arrow-drop-down' color="black" size={27} />
			</View>
		);
	}
  
	renderRow() {
		const {rowData, highlighted} = this.props;

		return (
			<View style={[styles.renderRow, highlighted && {backgroundColor: Color.highlight}]}>
				<Text style={[styles.renderRowTxt,
					highlighted && styles.highlighted ]}>
					{rowData}
				</Text>
			</View>
		);
	}

	render(){
		const {row, base} = this.props;

		if (row){
			return this.renderRow();
		}

		if (base){
			return this.renderBase();
		}

		return null;
	}
}

DropDownItem.propTypes = {
	DropDownItem: PropTypes.object, row: PropTypes.bool,
	base: PropTypes.bool, highlighted: PropTypes.bool,
	isInput: PropTypes.bool, value: PropTypes.string,
	placeholder: PropTypes.string,
	rowData: PropTypes.string, label: PropTypes.string,
	err: PropTypes.string, onChangeText: PropTypes.func,
};

const styles = StyleSheet.create({
	renderBaseWrapper: {flexDirection: "row", width: "100%", height: 40, alignItems: "center",  borderBottomColor: "#404040", borderBottomWidth: 0.6},
	input: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingVertical: 0},
	renderRow: {paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white"},
	renderRowTxt: {margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center"},
	highlighted: {fontWeight: "bold"},
});

export default DropDownItem;
