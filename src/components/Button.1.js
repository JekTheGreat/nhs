import React, {Component} from "react";
import {View, TouchableWithoutFeedback, Animated, Text, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import Loading from "__src/components/Loading";
import Resources from "__src/resources";

const {Color} = Resources;

export default class Button extends Component{
	constructor(props){
		super(props);

		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);
	}
	animatePress = new Animated.Value(1);

	handlePressIn(){
    	Animated.spring(this.animatePress, {
    		toValue: 0.96,
    	}).start();
	}
		
	handlePressOut(){
    	Animated.spring(this.animatePress, {
    		toValue: 1,
    	}).start();
	}

	render(){
		const {style, onPress, loading, style2,
			color, label, labelStyle, children} = this.props;
		const animatedStyle = {
			transform: [{ scale: this.animatePress}],
		};

		if (loading){
			return (
				<View style={[styles.container, style]}>
					<Loading size="small" color={color || "white"}/>
				</View>
			);
		}
    
		return (
			<TouchableWithoutFeedback
				onPress={onPress}
  			onPressIn={this.handlePressIn}
  			onPressOut={this.handlePressOut}>
				<Animated.View style={[styles.container2, style2, animatedStyle]}>
					<View style={[styles.container, style]}>
						{children || <Text style={[styles.text, labelStyle]}>{label}</Text>}
					</View>
				</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}

Button.propTypes = {
	style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	style2: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	labelStyle: PropTypes.object,
	onPress: PropTypes.func,
	loading: PropTypes.bool,
	color: PropTypes.string,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
	children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

const styles = StyleSheet.create({
	container: {height: 40, alignItems: "center", width: "100%",
		backgroundColor: Color.colorPrimary, borderRadius: 5, borderBottomWidth: 4,
		borderBottomColor: Color.colorPrimaryDark, justifyContent: "center" },
	container2: {height: 40, alignItems: "center",
		backgroundColor: Color.colorPrimary, borderRadius: 5, justifyContent: "center" },
	text: {color: Color.white, fontSize: 15, fontFamily: "Roboto"},
});
