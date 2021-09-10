import React from "react";
import {View, Image, Text, StyleSheet, TouchableWithoutFeedback} from "react-native";
import {Icon} from "react-native-elements";
import _ from "lodash";
import numeral from "numeral";
import PropTypes from "prop-types";
import Resource from "__src/resources";
const {Color, Res} = Resource;

class AddOnItem extends React.PureComponent{
	items = (bag, Currency, Total) => {
		return (
			<View key={bag}>
				<Text style={styles.txtLabel}>{bag}</Text>
				<Text style={styles.txtAmount}>{Currency} {numeral(Total).format("0,000.00")}</Text>
			</View>
		);
	}

	renderActive = () => {
		const {setSeat, setBaggage} = this.props;

		if (setBaggage){
			return (
				<View style={styles.viewActive}>
					{Object.keys(setBaggage).map((bag, index) => {
						if (index < 2 && !_.isEmpty(setBaggage[bag])){
							const Total = _.sumBy(setBaggage[bag], "Amount");
							const Currency = setBaggage[bag][0].CurrencyCode;

							return this.items(bag, Currency, Total);
						}
						
						return null;
					})}
				</View>
			);
		}

		if (setSeat){
			return (
				<View style={styles.viewActive}>
					{Object.keys(setSeat).map((bag, index) => {
						if (index < 2 && !_.isEmpty(setSeat[bag])){
							const Total = _.sumBy(setSeat[bag], (item) => {
								return item.ServiceCharge.TotalAmount;
							});
							let Currency = "";
							_.map(setSeat[bag], (item) => {
								Currency = item.ServiceCharge.CurrencyCode;
							});

							return this.items(bag, Currency, Total);
						}
						
						return null;
					})}
				</View>
			);
		}

		return null;
	}

	render() {
		const {title, subtitle, res, onPress, isActive} = this.props;
		const borderStyle = isActive ?
			{borderColor: Color.LightBlue5, borderWidth: 0.7} : null;
	
		return (
			<TouchableWithoutFeedback onPress={onPress}>
				<View style={[styles.container, borderStyle]}>
					{isActive && <Image style={styles.imageCart} source={Res.get("cart_blue")} resizeMode="contain"/>}
					<Image style={styles.imageRes} source={Res.get(res)}/>
					<View style={styles.view1}>
						<Text style={styles.title}>{title}</Text>
						<Text style={styles.subtitle}>{subtitle}</Text>
						{isActive && this.renderActive()}
					</View>
					<View style={styles.round}>
						<Icon name="chevron-right" type="feather" size={16} color="white"/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		);
	}
};

AddOnItem.propTypes = {
	title: PropTypes.string,
	subtitle: PropTypes.string,
	res: PropTypes.string,
	isActive: PropTypes.bool,
	setBaggage: PropTypes.object,
	setSeat: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {flexDirection: "row", minHeight: 106, backgroundColor: "white", alignItems: "center", borderRadius: 10, paddingHorizontal: 10, marginTop: 20},
	imageRes: {width: 80, height: 90},
	view1: {flex: 1, justifyContent: "center", marginLeft: 5},
	title: {fontFamily: "Roboto-Medium", fontSize: 18, color: Color.Header},
	subtitle: {fontFamily: "Roboto", fontSize: 10, color: Color.Header, marginTop: 5},
	round: {width: 20, height: 20, borderRadius: 20 / 2, backgroundColor: Color.LightBlue5, alignItems: "center", justifyContent: "center"},
	viewActive: {flexDirection: "row", padding: 3, margin: 3, borderRadius: 20, backgroundColor: Color.LightBlue5, alignItems: "center", justifyContent: "space-evenly"},
	txtLabel: {fontFamily: "Roboto", fontSize: 11, color: Color.white},
	txtAmount: {fontSize: 10, color: Color.white, fontWeight: "bold"},
	imageCart: {width: 60, height: 60, position: "absolute", top: -22, left: -5},
});

export default AddOnItem;
