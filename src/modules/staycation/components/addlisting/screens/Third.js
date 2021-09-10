/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity} from "react-native";
import styles from "../../../styles.css";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import _ from "lodash";
const {Color} = Resources;

class ThirdScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
		};
	}

	onNext = () => {
		const {actions} = this.props;
	  	actions.setStaycationScreen("fourth");
	}

	buttonBathrooms = (type) => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		const params = _.merge({}, newInput.third);
		const counter = params.bathroom || 1;
		switch (type){
		case "neg":
			if (counter > 1){
				params.bathroom= counter - .5;
			}
			break;
		case "pos":
			if (counter < 50){
				params.bathroom= counter + .5;
			}
			break;
		}
		console.log("TEST", params.bathroom);
		newInput.third = params;
		actions.setInputDetails(newInput);
	}

	render(){
		const {staycation: {setInputDetails}}= this.props;
		const third = _.has(setInputDetails, "third") ? setInputDetails.third : {};
		const posBed = third.bathroom === 50 ?  Color.Standard :  Color.LightBlue;
		const negBed = third.bathroom === 1 ?  Color.Standard :  Color.LightBlue;

  	return (
  		<ScrollView style={[styles.padH20, styles.fullFlex]}>
				<View style={[styles.marT30]}>
					<Text style={[styles.labelText]}>How many bathrooms?</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.red, marginTop: 10}}>
					{`Ex: `}
						<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.red, marginTop: 10, fontWeight:"bold"}}>
							{`1 Bathroom`}  
						</Text>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.red, marginTop: 10}}>
						  {`= Consist of shower/bathub & Toilet\n`}
						</Text>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.red, marginTop: 10, fontWeight:"bold"}}>
							{`.5 Bathroom`}  
						</Text>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.red, marginTop: 10}}>
						  {`= Consist of either shower/bathub only or Toilet only.`}
						</Text>	
  				</Text>
					<View style={[styles.marT20, {flexDirection: "row", justifyContent: "space-between"}]}>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 17, color: Color.Standard2, fontWeight: "bold"}}>
						Bathrooms
  					</Text>
  					<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
							<TouchableOpacity onPress={() => this.buttonBathrooms("neg")} activeOpacity={0.7} style={{width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: negBed, alignItems: "center", justifyContent: "center"}}>
								<Text style={{color: Color.LightBlue, fontSize: 16}}>-</Text>
							</TouchableOpacity>
							<Text style={{color: Color.Standard2, fontSize: 17, width: 50, textAlign: "center"}}>{third.bathroom || 1}</Text>
							<TouchableOpacity onPress={() => this.buttonBathrooms("pos")} activeOpacity={0.7} style={{width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: posBed, alignItems: "center", justifyContent: "center"}}>
								<Text style={{color: Color.LightBlue, fontSize: 16}}>+</Text>
							</TouchableOpacity>
						</View>
  				</View>
				</View>
  		</ScrollView>
  	);
	}
}

ThirdScreen.propTypes = {
	staycation: PropTypes.object,
};

export default ThirdScreen;
