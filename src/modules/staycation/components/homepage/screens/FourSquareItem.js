/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Dimensions, TouchableWithoutFeedback, Animated, StyleSheet} from "react-native";
import PropTypes from "prop-types";
import  Stars  from "__src/components/Stars";
import FastImage from "react-native-fast-image";
import  Resources from "__src/resources";
const {Color} = Resources;
const SCREEN_WIDTH = Dimensions.get("window").width;

class FourSquareItem extends PureComponent{
	constructor(props){
		super(props);

		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);
	}

	componentWillMount(){
		this.animatePress = new Animated.Value(1);
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

	render(){
		const {item, leftRight} = this.props;
  	const marginStyle = leftRight ? {marginRight: 5} : {marginLeft: 5};
  	const animatedStyle = {
  		transform: [{ scale: this.animatePress}],
  	};
    
  	return (
  		<TouchableWithoutFeedback
  			onPressIn={this.handlePressIn}
  			onPressOut={this.handlePressOut}>
				<Animated.View style={[styles.imageHotelRight,
					{width: (SCREEN_WIDTH - 50) / 2}, marginStyle, animatedStyle]}>
  				<FastImage source={{uri: item.illustration}} style={styles.fastImage} resizeMode="cover" />
  				<View style={styles.viewDetails}>
  					<Text style={styles.txt1}>
          PRIVATE ROOM * CASABLANCA
  					</Text>
  					<Text numberOfLines={3}
  						style={{fontSize: 12, fontWeight: "bold", color: Color.Standard2, fontFamily: "Roboto-Light"}}>
          Explore Old Barcelona from a Loft-Style Student
          Hello makati bukaret
  					</Text>
  					<Text style={styles.txt1}>
          P2,981 per night * Free Cancellation
  					</Text>
  					<Stars
  						txtVote
  						votes={5}
  						size={10}
  						color={Color.colorPrimary} />
  				</View>
  			</Animated.View>
  		</TouchableWithoutFeedback>

  	);
	}
}

FourSquareItem.propTypes = {
	item: PropTypes.object,
	leftRight: PropTypes.bool,
};

const styles = StyleSheet.create({
	imageHotelRight: {
		minHeight: 200,
	},
	txt1: {fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"},
	fastImage: {height: 100, width: null, borderRadius: 3},
	viewDetails: {backgroundColor: "white", marginTop: 3},
});

export default FourSquareItem;
