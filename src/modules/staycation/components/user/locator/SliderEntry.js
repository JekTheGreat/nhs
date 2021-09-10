/* eslint-disable */
import React, { PureComponent } from "react";
import { View, Text, Image, TouchableWithoutFeedback, Animated } from "react-native";
import PropTypes from "prop-types";
import { ParallaxImage } from "react-native-snap-carousel";
import styles from "./styles.css";
import FastImage from "react-native-fast-image";
import Resources from "__src/resources";
const {Color} = Resources;

export default class SliderEntry extends PureComponent {
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
		this.animatePress = new Animated.Value(1);

	}

	get image () {
    	const { data: { images }} = this.props;

    	return (
    		<FastImage
    			source={{ uri: images[0].url }}
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
		const { data: { name, amount } } = this.props;
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
    			<View style={{position: "absolute", bottom: 10, left: 12}}>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.white}}>Entire Place</Text>
						<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.white}}>{name}</Text>
						<Text style={{fontFamily: "Roboto", fontSize: 14, color: Color.colorPrimaryLight2}}>P{amount}
  					<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.white}}> / per night</Text>
  				</Text>
  			</View>
    		</Animated.View>
			</TouchableWithoutFeedback>
		);
	}
}
