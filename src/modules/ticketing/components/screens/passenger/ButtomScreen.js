import React from "react";
import {View, Text, Image, StyleSheet, TouchableWithoutFeedback} from "react-native";
import PropTypes from "prop-types";
import Button from "__src/components/Button";
import Resource from "__src/resources";

const {Color, Res} = Resource;

class ButtomScreen extends React.PureComponent{
	render(){
		const {onInfoPress, onSubmit, buttonLabel, hasInfo = true, amount,
			 currency, totalLabel, loading} = this.props;

		return (
			<View style={styles.container}>
				<View style={styles.view1}>
					<View style={styles.view2}>
						<Text style={styles.txtSort}>{totalLabel || "Total Fare:"}  </Text>
						<Text style={styles.txtPrice}>
							{currency} {amount}</Text>
						<Image style={styles.imageCart} source={Res.get("cart_white")} resizeMode="contain"/>
					</View>
					{hasInfo && <TouchableWithoutFeedback onPress={onInfoPress}>
						<View style={styles.view2}>
							<Image style={styles.imageInfo} source={Res.get("info_yellow")} resizeMode="contain"/>
						</View>
					</TouchableWithoutFeedback>}
				</View>

				<Button
					style={styles.btnSearch}
					label={buttonLabel}
					loading={loading}
					onPress={onSubmit}
					labelStyle={styles.labelStyle}/>
			</View>
		);
	}
}

ButtomScreen.propTypes = {
	onInfoPress: PropTypes.func,
	onSubmit: PropTypes.func,
	buttonLabel: PropTypes.string,
	totalLabel: PropTypes.string,
	amount: PropTypes.string,
	currency: PropTypes.string,
	hasInfo: PropTypes.bool,
	loading: PropTypes.bool,
};

ButtomScreen.defaultProps = {
	hasInfo: true,
};

const styles = StyleSheet.create({
	container: {flexShrink: 1, paddingHorizontal: 15, paddingBottom: 15,
		paddingTop: 10, backgroundColor: Color.Header},
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
	view2: {flexDirection: "row", alignItems: "center", justifyContent: "center"},
	txtSort: {fontFamily: "Roboto", fontSize: 10, color: Color.white},
	txtPrice: {fontFamily: "Roboto", fontSize: 12, color: Color.white},
	imageCart: {width: 10, height: 10, paddingHorizontal: 15},
	imageInfo: {width: 15, height: 15},
	btnSearch: {height: 35, width: 223, marginTop: 15, alignSelf: "center"},
	labelStyle: {fontSize: 12, fontFamily: "Roboto"},
});

export default ButtomScreen;
