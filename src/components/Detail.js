import React, {PureComponent} from "react";
import {View, Text, StyleSheet} from "react-native";
import Color from "__src/resources/styles/color";
import PropTypes from "prop-types";


export default class Detail extends PureComponent {
	render() {
		const {label, style, value, vertical, Wrapper2,
			labelStyle2, valueStyle2, onPressValue, numberOfLines} = this.props;
		const addstyle = vertical ? {flexDirection: "column"} : null;
		const addValueStyle = vertical ? styles.valueStyle2 : null;

		return (
			<View style={[styles.flex1, style]}>
				<View style={[styles.Wrapper1, Wrapper2, addstyle]}>
					<Text {...this.props} style={[styles.labelStyle, labelStyle2]}>
						{label}
					</Text>
					<Text selectable numberOfLines={numberOfLines || 1} onPress={onPressValue}
						style={[styles.valueStyle, valueStyle2, addValueStyle]}>{value}</Text>
				</View>
			</View>
		);
	}
}
Detail.propTypes = {
	label: PropTypes.string, numberOfLines: PropTypes.number,
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	style: PropTypes.object,
	labelStyle2: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	valueStyle2: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	Wrapper2: PropTypes.object,
	vertical: PropTypes.bool,
	onPressValue: PropTypes.func,
};
const styles = StyleSheet.create({
	flex1: {flexShrink: 1},
	Wrapper1: {width: "100%", flexDirection: "row", marginTop: 10},
	labelStyle: {color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 14},
	valueStyle: {flex: 1, color: Color.Standard2,
		fontFamily: "Roboto",  textAlign: "right", fontSize: 14},
	valueStyle2: {textAlign: "left", paddingLeft: 5},
});
