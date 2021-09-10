import React from "react";
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import PropTypes from "prop-types";
import {Icon} from "react-native-elements";
import Button from "__src/components/Button";
import Resource from "__src/resources";

const {Color, Res} = Resource;

class ButtomScreen extends React.PureComponent{
	render(){
		const {onFilterPress, onInfoPress, onSubmit, filter, amount,
			loading, buttonLabel, disabled} = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.view1}>
					<View style={styles.view2}>
						<Text style={styles.txtSort}>Sort by:</Text>
						<TouchableWithoutFeedback onPress={onFilterPress}>
							<View style={styles.viewFilter}>
								<Text style={styles.txtFilter}>{filter} </Text>
								<Icon name="chevron-down" type="evilicon" size={16} color={Color.colorPrimary} />
							</View>
						</TouchableWithoutFeedback>
					</View>
					<TouchableWithoutFeedback onPress={onInfoPress}>
						<View style={styles.view2}>
							<Text style={styles.txtPrice}>{amount}</Text>
							<Image style={styles.imageCart} source={Res.get("cart_white")} resizeMode="contain"/>
							<Image style={styles.imageInfo} source={Res.get("info_yellow")} resizeMode="contain"/>
						</View>
					</TouchableWithoutFeedback>
				</View>

				<Button
					style={styles.btnSearch}
					label={buttonLabel}
					loading={loading}
					disabled={disabled}
					onPress={onSubmit}
					labelStyle={styles.labelStyle}/>
			</View>
		);
	}
}

ButtomScreen.propTypes = {
	onFilterPress: PropTypes.func,
	onInfoPress: PropTypes.func,
	onSubmit: PropTypes.func,
	filter: PropTypes.string,
	amount: PropTypes.string,
	ticketing: PropTypes.object,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	buttonLabel: PropTypes.string,
};

const styles = StyleSheet.create({
	container: {flexShrink: 1, paddingHorizontal: 15, paddingBottom: 15,
		paddingTop: 10, backgroundColor: Color.Header},
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
	view2: {flexDirection: "row", alignItems: "center"},
	txtSort: {fontFamily: "Roboto", fontSize: 11, color: Color.white},
	viewFilter: {flexDirection: "row", alignItems: "center", justifyContent: "center",
		borderWidth: 0.6, borderColor: "white", borderRadius: 5, padding: 3, marginLeft: 5},
	txtFilter: {fontFamily: "Roboto", fontSize: 11, color: Color.white},
	txtPrice: {fontFamily: "Roboto", fontSize: 11, color: Color.white},
	imageCart: {width: 11, height: 11, paddingHorizontal: 15},
	imageInfo: {width: 13, height: 13},
	btnSearch: {height: 35, width: 223, marginTop: 15, alignSelf: "center"},
	labelStyle: {fontSize: 12, fontFamily: "Roboto"},
});

export default ButtomScreen;
