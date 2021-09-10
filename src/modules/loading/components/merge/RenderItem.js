// /* eslint-disable */
import React, {PureComponent} from "react";
import {Text, TouchableWithoutFeedback, Animated} from "react-native";
import PropTypes from "prop-types";
import {Card} from "native-base";
import styles from "../../styles.css";
import  Resources from "__src/resources";
const AnimatedCard = Animated.createAnimatedComponent(Card);
const {Color} = Resources;

class RenderItem extends PureComponent{
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
	
	Plancode = () => {
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
  					<Text style={[styles.contxt6,
  						{color: Color.Standard}, color]}> ({item.currency})</Text>
  				</Text>
  			</AnimatedCard>
  		</TouchableWithoutFeedback>
  	);
	}
	
	SubCategory = () => {
  	const {selected, onPress, item} = this.props;
  	const color = selected ? {color: Color.white} : "";
  	const animatedStyle = {
  		transform: [{ scale: this.animatePress}],
		};
		const currency = item.currency ? ` (${item.currency})` : "";
		
  	return (
  		<TouchableWithoutFeedback
  			onPress={onPress}
  			onPressIn={this.handlePressIn}
  			onPressOut={this.handlePressOut}>
  			<AnimatedCard  style={[styles.cardView1, selected, animatedStyle]}>
  				<Text style={[styles.txt1, color]}>{item.name}
  					<Text style={[styles.contxt6,
  						{color: Color.Standard}, color]}>{currency}</Text>
  				</Text>
  			</AnimatedCard>
  		</TouchableWithoutFeedback>
  	);
	}

	renderInternational = () => {
  	const {selected, onPress, item, IsDingSG} = this.props;
  	const color = selected ? {color: Color.white} : "";
  	const animatedStyle = {
  		transform: [{ scale: this.animatePress}],
		};
		
		if (IsDingSG) {
			return (
				<TouchableWithoutFeedback
					onPress={onPress}
					onPressIn={this.handlePressIn}
					onPressOut={this.handlePressOut}>
					<AnimatedCard  style={[styles.cardView1, selected, animatedStyle]}>
						<Text style={[styles.txt1, color]}>
							{`${item.displayText} (${item.maximum} ${item.receiveCurrency})`}
						</Text>
					</AnimatedCard>
				</TouchableWithoutFeedback>
			);
		}
  	
		return (
  		<TouchableWithoutFeedback
  			onPress={onPress}
  			onPressIn={this.handlePressIn}
  			onPressOut={this.handlePressOut}>
  			<AnimatedCard  style={[styles.cardView1, selected, animatedStyle]}>
					<Text style={[styles.txt1, color]}>
						{item.displayText}
  				</Text>
  			</AnimatedCard>
  		</TouchableWithoutFeedback>
  	);
	}

	render(){
		const {isPlancode, isInternational} = this.props;
		
		if (isInternational){
  		return this.renderInternational();
		}

  	if (isPlancode){
  		return this.Plancode();
		}

  	return this.SubCategory();
	}
}

RenderItem.propTypes = {
	item: PropTypes.object,
	selected: PropTypes.object,
	isPlancode: PropTypes.bool,
	isInternational: PropTypes.bool,
	onPress: PropTypes.func,
	isUAE: PropTypes.bool,
	IsDingSG: PropTypes.bool,
};

export default RenderItem;
