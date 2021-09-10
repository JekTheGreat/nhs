/* eslint-disable react-native/no-inline-styles */
import React, {PureComponent} from "react";
import {View, Text, TouchableWithoutFeedback, Animated, Image} from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import {Card} from "native-base";
import styles from "../../styles.css";
import  Resources from "__src/resources";
const AnimatedCard = Animated.createAnimatedComponent(Card);
const {Color, Res} = Resources;

class PlanListItem extends PureComponent{
	constructor(props){
		super(props);

		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);
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

	getImage = () => {
		const {item} = this.props;
  
		  if (item.denomination){
			  const denom = item.denomination.toString().toLowerCase();
  
			  if (_.includes(denom, "acash")){
				  return Res.get("acash");
			  } else if (_.includes(denom, "cc")) {
				  return Res.get("cc");
			  } else if (_.includes(denom, "crc")){
				  return Res.get("cignal");
			  } else if (_.includes(denom, "cubits")){
				  return Res.get("cubizone");
			  } else if (_.includes(denom, "eset")){
				  return Res.get("eset");
			  } else if (_.includes(denom, "gc")){
				  return Res.get("gc");
			  } else if (_.includes(denom, "gm")){
				  return Res.get("gm");
			  } else if (_.includes(denom, "gph")){
				  return Res.get("GLOBE");
			  } else if (_.includes(denom, "gpinoy")){
				  return Res.get("gpinoy");
			  } else if (_.includes(denom, "gsat")){
				  return Res.get("gsat");
			  } else if (_.includes(denom, "iflix")){
				  return Res.get("iflix");
			  } else if (_.includes(denom, "ilw")){
				  return Res.get("ilw");
			  } else if (_.includes(denom, "jacks")){
				  return Res.get("jacks");
			  } else if (_.includes(denom, "lvlup")){
				  return Res.get("lvlup");
			  } else if (_.includes(denom, "marino")){
				  return Res.get("marino");
			  } else if (_.includes(denom, "migme")){
				  return Res.get("migme");
			  } else if (_.includes(denom, "plp")){
				  return Res.get("plp");
			  } else if (_.includes(denom, "rcoin")){
				  return Res.get("rcoin");
			  } else if (_.includes(denom, "sky")){
				  return Res.get("sky");
			  } else if (_.includes(denom, "sb")){
				  return Res.get("SMART");
			  } else if (_.includes(denom, "tm")) {
				  return Res.get("TM");
			  } else if (_.includes(denom, "tnt")) {
				  return Res.get("TNT");
			  } else if (_.includes(denom, "softnyx")){
				  return Res.get("softnyx");
			  } else if (_.includes(denom, "viu")){
				  return Res.get("viu");
			  }
		  }
  
		  return null;
	  }
  
	
	render = () => {
  	const {selected, onPress, item} = this.props;
  	const color = selected ? {color: Color.white} : "";
  	const animatedStyle = {
  		transform: [{ scale: this.animatePress}],
  	};
    
  	return (
  		<TouchableWithoutFeedback
  			onPress={onPress}
  			onPressIn={this.handlePressIn}
  			onPressOut={this.handlePressOut}>
  				<AnimatedCard style={[styles.cardView1, styles.justSpace, selected, animatedStyle]}>
  					<View style={{flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between"}}>
						<Text style={[styles.txt6, styles.flex1, color]}>
  							{item.name}
  						</Text>
						<Image source={this.getImage()} style={{width: 60, height: 40}} resizeMode="stretch"/>
					</View>

					<View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
						<Text numberOfLines={30} style={[styles.txt7, styles.flex1, color]}>
  							{item.description}
  						</Text>
						<View style={{flexDirection: "row", alignItems: "center"}}>
							<Text style={[styles.txt8, color]}>{item.amount}</Text>
							<Text style={[styles.txt7, {marginLeft: 4}, color]}>
								{item.currency}
							</Text>
						</View>
					</View>
  				</AnimatedCard>
  		</TouchableWithoutFeedback>
  	);
	}
}

PlanListItem.propTypes = {
	item: PropTypes.object,
	selected: PropTypes.object,
	isRegular: PropTypes.bool,
	onPress: PropTypes.func,
};

export default PlanListItem;
