/* eslint-disable */
import React, { Component } from "react";
import { View, Text, Image, TouchableWithoutFeedback, Animated } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "../styles/SliderEntry.style";
import FastImage from "react-native-fast-image";
import Resources from "__src/resources";
const {Color} = Resources;

export default class SliderEntry extends Component {
	static propTypes = {
		data: PropTypes.object.isRequired,
		even: PropTypes.bool,
		parallax: PropTypes.bool,
		parallaxProps: PropTypes.object,
	};

	constructor(props){
		super(props);

		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);
	}

	componentWillMount(){
		this.animatePress = new Animated.Value(1);
	}

	get image () {
    	const { data: { illustration }, parallax, parallaxProps, even } = this.props;

    	return (
    		<FastImage
    			source={{ uri: illustration }}
    			style={[styles.image, {backgroundColor: Color.Standard}]}
    			resizeMode="cover"
    		/>
    	);
	}
		
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

	render () {
		const { data: { title } } = this.props;
		const animatedStyle = {
			transform: [{ scale: this.animatePress}],
		};

    	return (
			<TouchableWithoutFeedback
				onPressIn={this.handlePressIn}
				onPressOut={this.handlePressOut}>
    		<Animated.View style={[styles.slideInnerContainer, animatedStyle]}>
    			<View style={[styles.imageContainer]}>
    				{ this.image }
    			</View>
    			<View style={[styles.textContainer]}>
    				<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: "black"}}>HOMES + EXPERIENCES</Text>
    				<Text numberOfLines={2} style={{fontFamily: "Roboto", fontSize: 16, fontWeight: "bold", color: "black"}}>Secrets of Old New York</Text>
    				<Text numberOfLines={3} style={{fontFamily: "Roboto-Light", fontSize: 13}}>Beyond the trendy shops and bars, there is old school NYC-filled with landmarks and totems that connect the modern city to the place</Text>
    			</View>
    		</Animated.View>
			</TouchableWithoutFeedback>
    	);
	}
}
