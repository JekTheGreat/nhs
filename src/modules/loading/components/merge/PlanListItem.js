// /* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, TouchableWithoutFeedback, Animated} from "react-native";
import PropTypes from "prop-types";
import {Card} from "native-base";
import styles from "../../styles.css";
import  Resources from "__src/resources";
const AnimatedCard = Animated.createAnimatedComponent(Card);
const {Color} = Resources;

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
  

  renderData = () => {
  	const {selected, onPress, item} = this.props;
  	const color = selected ? {color: Color.white} : "";
  	const border = selected ? {borderColor: Color.white} : "";
  	const animatedStyle = {
  		transform: [{ scale: this.animatePress}],
  	};
    
  	return (
  		<TouchableWithoutFeedback
  			onPress={onPress}
  			onPressIn={this.handlePressIn}
  			onPressOut={this.handlePressOut}>
  				<AnimatedCard style={[styles.cardView1, styles.justSpace, selected, animatedStyle]}>
  					<View style={styles.width70}>
  						<Text style={[styles.txt6, color]}>
  							{item.name}
  						</Text>
  						<Text numberOfLines={3} style={[styles.txt7, color]}>
  							{item.description}
  						</Text>
  					</View>
  					<View style={[styles.planView1, border]}>
  						<Text style={[styles.txt8, color]}>{item.amount}</Text>
  						<Text style={[styles.txt7, color]}>{item.currency}</Text>
  					</View>
  				</AnimatedCard>
  		</TouchableWithoutFeedback>
  	);
  }

  renderLoad = () => {
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
  			<AnimatedCard  style={[styles.cardView1, selected, animatedStyle]}>
  				<Text style={[styles.txt1, color]}>{item.amount}
  					<Text style={[styles.contxt6, {color: Color.Standard}, color]}> PHP</Text>
  				</Text>
  			</AnimatedCard>
  		</TouchableWithoutFeedback>
  	);
  }

  render(){
  	const {isRegular} = this.props;

  	if (isRegular){
  		return this.renderLoad();
  	}

  	return this.renderData();
  }
}

PlanListItem.propTypes = {
	item: PropTypes.object,
	selected: PropTypes.object,
	isRegular: PropTypes.bool,
	onPress: PropTypes.func,
};

export default PlanListItem;
