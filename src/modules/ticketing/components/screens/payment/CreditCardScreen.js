/* eslint-disable import/default */
import React from "react";
import {View, StyleSheet, Image, TextInput, Text } from "react-native";
import PropTypes from "prop-types";
import _ from "lodash";
import CreditCard from "./RNCard";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const InputScreen = (props) => {
	const {label, placeholder, value, onChangeText, hasImage} = props;
  
	return (
		<View style={styles.inputView}>
			<Text style={styles.txtLabel}>{label}</Text>
			{hasImage && <Image style={styles.inputImage} source={Res.get("PHP")}/>}
			<TextInput {...props} style={styles.inputStyle} placeholder={placeholder}
				value={value} onChangeText={onChangeText}/>
		</View>);
};

class CreditCardScreen extends React.PureComponent{
	constructor(props){
		super(props);
		this.state = {
			focused: "",
			setInput: {
				number: "",
				name: "",
				expiry: "",
				cvc: "",
			},
		};
	}
 
  onChangeText = (type) => (value) => {
  	const {setInput} = this.state;
  	const newInput = _.merge({}, setInput);
  	const error = {};
  	if (_.isEmpty(value)){
  		error[type] = "This is required.";
  	}
  	newInput[type] = value;

  	this.setState({error, setInput: newInput, focused: type});
  }

  render(){
  	const {setInput} = this.state;
    
  	return (
  		<View style={styles.marH25}>
  			<CreditCard
  				style={styles.cardStyle}
  				imageFront={Res.get("cardfront")}
  				imageBack={Res.get("cardback")}
  				shiny={false}
  				bar={false}
  				focused={this.state.focused}
  				number={setInput.number}
  				name={setInput.name}
  				expiry={setInput.expiry}
  				type={setInput.type}
  				cvc={setInput.cvc}/>
        
  			<InputScreen label="Your card number" placeholder="0000-0000-0000-0000"
  				keyboardType="number-pad"
  				returnKeyType="done"
  				maxLength={16}
  				onChangeText={this.onChangeText("number")}/>
  			<View style={styles.view1}>
  				<View style={styles.width25}>
  					<InputScreen label="Expiry Date" placeholder="DD/YY"
  						maxLength={4}
  						keyboardType="number-pad"
  						returnKeyType="done"
  						onChangeText={this.onChangeText("expiry")}/>
  				</View>

  				<View style={styles.width25}>
  					<InputScreen label="CVC" placeholder="000"
  						keyboardType="number-pad"
  						returnKeyType="done"
  						maxLength={3}
  						onChangeText={this.onChangeText("cvc")}/>
  				</View>
  			</View>
  			<InputScreen label="Card holder name" placeholder="Card holder name"
  				returnKeyType="done"
  				onChangeText={this.onChangeText("name")}/>
  		</View>
  	);
  }
}

CreditCardScreen.propTypes = {
	label: PropTypes.string,
	ticketing: PropTypes.object,
};
InputScreen.propTypes = {
	label: PropTypes.string,
	placeholder: PropTypes.string,
	value: PropTypes.string,
	onChangeText: PropTypes.func,
	hasImage: PropTypes.bool,
};

const styles = StyleSheet.create({
	cardStyle: {marginVertical: 10, marginHorizontal: 10, marginBottom: 0, elevation: 3, alignSelf: "flex-start"},
	txtLabel: {position: "absolute", top: -10, left: 7, fontFamily: "Roboto", fontSize: 13, color: Color.Header, paddingHorizontal: 3},
	inputView: {flexDirection: "row", height: 45, backgroundColor: "white", borderRadius: 7, marginTop: 20, alignItems: "center", paddingHorizontal: 10},
	inputImage: {width: 25, height: 25},
	inputStyle: { flex: 1, fontFamily: "Roboto", fontSize: 14, color: Color.Header, paddingVertical: 0, marginLeft: 7},
	width25: {width: "45%"},
	view1: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
	marH25: {marginHorizontal: 25, marginTop: 25},
});

export default CreditCardScreen;
