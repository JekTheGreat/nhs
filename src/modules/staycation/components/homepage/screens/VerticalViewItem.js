import React, {PureComponent} from "react";
import {View, Text, TouchableWithoutFeedback, Animated, StyleSheet} from "react-native";
import  Stars  from "__src/components/Stars";
import PropTypes from "prop-types";
import FastImage from "react-native-fast-image";
import  Resources from "__src/resources";
const {Color} = Resources;

class VerticalViewItem extends PureComponent{
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
		const {item} = this.props;
  	const animatedStyle = {
  		transform: [{ scale: this.animatePress}],
  	};
    
  	return (
  		<TouchableWithoutFeedback
  			onPressIn={this.handlePressIn}
  			onPressOut={this.handlePressOut}>
  			<Animated.View style={[styles.imageHotelRight, animatedStyle]}>
					<FastImage source={{uri: item.illustration}}
						style={styles.fastImage} resizeMode="cover" />
  				<View style={styles.viewDetails}>
  					<Text style={styles.txt1}>
          PRIVATE ROOM * CASABLANCA
  					</Text>
  					<Text numberOfLines={3} style={styles.txt2}>
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

VerticalViewItem.propTypes = {
	item: PropTypes.object,
};


const styles = StyleSheet.create({
	imageHotelRight: {
		flex: 1, minHeight: 200, width: "100%",
		flexDirection: "row",
	},
	fastImage: {width: "40%", height: 170, borderRadius: 3},
	viewDetails: {backgroundColor: "white", width: "60%", marginLeft: 7},
	txt1: {fontSize: 9, color: Color.Standard2, fontFamily: "Roboto-Light"},
	txt2: {fontSize: 12, fontWeight: "bold", color: Color.Standard2, fontFamily: "Roboto-Light"},
});

export default VerticalViewItem;
