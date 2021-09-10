
import React from "react";
import {Text, StyleSheet, TouchableWithoutFeedback, Animated} from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
const {Color} = Resource;


class TouchableComponent extends React.PureComponent{
	constructor(props){
		super(props);

		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);
		this.animatePress = new Animated.Value(1);
	}

	handlePressIn(){
		Animated.spring(this.animatePress, {
			toValue: 0.99,
		}).start();
	}
		
	handlePressOut(){
		Animated.spring(this.animatePress, {
			toValue: 1,
		}).start();
	}
  
	render() {
		const {value, style, label, onPress} = this.props;
		const animatedStyle = {
			transform: [{ scale: this.animatePress}],
		};

		const styleValue = value && styles.styleValue;

		return (
			<TouchableWithoutFeedback
				onPress={onPress}
				onPressIn={this.handlePressIn}
				onPressOut={this.handlePressOut}>
				<Animated.View style={[styles.container, style, animatedStyle]}>
					<Text style={[styles.label, styleValue]}>{value || label}</Text>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
};

TouchableComponent.propTypes = {
	value: PropTypes.string,
	label: PropTypes.string,
	style: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {height: 40, width: "100%", borderWidth: 0.7, borderColor: Color.border1, borderRadius: 6, justifyContent: "center"},
	label: {fontFamily: "Roboto-Light", fontSize: 12, marginLeft: 15, color: Color.AFAAAA},
	styleValue: {fontFamily: "Roboto", color: Color.Header},
});

export default TouchableComponent;
