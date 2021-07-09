/* eslint-disable react-native/no-inline-styles */
import React, { PureComponent } from "react";
import { View, TouchableWithoutFeedback, Animated, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
import Resources from "__src/resources";
import { Icon } from "react-native-elements";

const { Color } = Resources;

export default class Button extends PureComponent {
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

	_renderComponent() {
		switch (this.props.icon) {

			case "Cart":
				return (
					<Icon
						type='evilicon'
						name='cart'
						color={Color.colorPrimary}
						size={25}
					/>
				);
			default:
				return null;
		}
	}

	render() {
		const { style, onPress, loading, disabled,
			color, label, labelStyle, children } = this.props;
		const animatedStyle = {
			transform: [{ scale: this.animatePress }],
		};
		const disableStyle = disabled ? {
			backgroundColor: Color.colorPrimaryMP,
		} : {
				backgroundColor: Color.colorPrimaryMP,
			};
		const onSubmit = disabled ? null : onPress;
		const opac = disabled ? .5 : 1
		if (loading) {
			return (
				<View style={[styles.container, { flexDirection: "column" }, style]}>
					<Loading size="small" color={color || "white"} />
				</View>
			);
		}

		return (
			<TouchableWithoutFeedback
				onPress={onSubmit}
				onPressIn={this.handlePressIn}
				disabled={disabled}
				onPressOut={this.handlePressOut}>
				<Animated.View opacity={opac} style={[styles.container, disableStyle, style, animatedStyle]}>
					{this._renderComponent()}
					{children || <Text style={[styles.text, labelStyle]}>{label}</Text>}
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

Button.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	labelStyle: PropTypes.object,
	onPress: PropTypes.func,
	icon: PropTypes.string,
	loading: PropTypes.bool,
	disabled: PropTypes.bool,
	color: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

const styles = StyleSheet.create({
	container: {
		height: 40, alignItems: "center", flexDirection: "row",
		backgroundColor: Color.colorPrimaryMP, borderRadius: 5, borderWidth: 1,
		borderColor: Color.colorPrimaryMP, justifyContent: "center", elevation: 4
	},
	text: { color: Color.white, fontSize: 14, fontFamily: "Roboto" },
});
