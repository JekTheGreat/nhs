/* eslint-disable import/default */
// /* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import SvgUri from "react-native-svg-uri";
import bills_payment from "__src/resources/images/services/bills-payment.svg";
import book_flight from "__src/resources/images/services/book-flight.svg";
import buy_load from "__src/resources/images/services/buy-load.svg";
import ecash from "__src/resources/images/services/ecash.svg";
import insurance from "__src/resources/images/services/insurance.svg";
import manage_outlet from "__src/resources/images/services/manage-outlet.svg";
import network from "__src/resources/images/services/network.svg";
import regcode from "__src/resources/images/services/regcode.svg";
import remittance from "__src/resources/images/services/remittance.svg";
import more from "__src/resources/images/services/more.svg";

import convert from "__src/resources/images/services/convert.svg";
import send from "__src/resources/images/services/send.svg";
import topup from "__src/resources/images/services/topup.svg";
import white_more from "__src/resources/images/services/white_more.svg";

import Resources from "__src/resources";
const { Color } = Resources;

class ServiceItem extends PureComponent {
	constructor(props) {
		super(props);

		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);
		this.animatePress = new Animated.Value(1);
	}

	handlePressIn() {
		Animated.spring(this.animatePress, {
			toValue: 0.96,
		}).start();
	}

	handlePressOut() {
		Animated.spring(this.animatePress, {
			toValue: 1,
		}).start();
	}

	_flag(item) {
		const { white } = this.props;

		switch (item) {
			case "Book Flights":
				return book_flight;
			case "Remittance":
				return remittance;
			case "Pay Bills":
				return bills_payment;
			case "Buy Load":
				return buy_load;
			case "ECash":
				return ecash;
			case "Insurance":
				return insurance;
			case "Network":
				return network;
			case "Market Place":
				return manage_outlet;
			case "Regcode":
				return regcode;
			case "More":
				return white ? white_more : more;

			case "Send":
				return send;
			case "Convert":
				return convert;
			case "Top Up":
				return topup;
		}
	}

	renderWhite = () => {
		const { item, onPress } = this.props;
		const animatedStyle = {
			transform: [{ scale: this.animatePress }],
		};

		return (

			<TouchableWithoutFeedback
				onPressIn={this.handlePressIn}
				onPressOut={this.handlePressOut}
				onPress={onPress}>

				<Animated.View style={[styles.viewCenter, animatedStyle]}>
					<SvgUri
						width="30"
						height="30"
						svgXmlData={this._flag(item)}
					/>
					<Text style={[styles.textDescription, { color: Color.white }]}>
						{item}</Text>
				</Animated.View>

			</TouchableWithoutFeedback>
		);
	}


	renderYellow() {
		const { item, onPress, bg, size } = this.props;
		const animatedStyle = {
			transform: [{ scale: this.animatePress }],
		};

		if (item.empty === true) {
			return <View style={[styles.item, styles.itemInvisible]} />;
		}

		return (
			<TouchableWithoutFeedback
				onPressIn={this.handlePressIn}
				onPressOut={this.handlePressOut}
				onPress={onPress}>

				<Animated.View style={[styles.item, animatedStyle]}>
					<View style={[styles.whitebg, bg]}>
						<SvgUri
							width={size || "30"}
							height={size || "30"}
							svgXmlData={this._flag(item)}
						/>
					</View>
					<Text adjustsFontSizeToFit style={styles.textDescription}>{item}</Text>
				</Animated.View>

			</TouchableWithoutFeedback>
		);
	}

	render() {
		const { white } = this.props;

		if (white) {
			return this.renderWhite();
		}

		return this.renderYellow();
	}


}

ServiceItem.propTypes = {
	item: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	white: PropTypes.bool,
	onPress: PropTypes.func,
	bg: PropTypes.object,
	size: PropTypes.string,
};

const styles = StyleSheet.create({
	whitebg: { flexShrink: 1, backgroundColor: "white", borderRadius: 15, padding: 15 },

	item: { flex: 1, marginTop: 20, margin: 1, alignItems: "center", justifyContent: "center" },
	itemInvisible: { backgroundColor: "transparent" },
	textDescription: { fontSize: 11, marginTop: 5, fontFamily: "Roboto-Light", color: Color.Standard2, textAlign: "center", paddingVertical: 3 },

	viewCenter: { flexDirection: "column", alignItems: "center" },

});

export default ServiceItem;
