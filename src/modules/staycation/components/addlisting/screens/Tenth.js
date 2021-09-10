/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import {Icon} from "react-native-elements";
import styles from "../../../styles.css";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import _ from "lodash";
import TxtInput from "__src/components/TxtInput";
const {Color} = Resources;

class TenthScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			value:'',
			error:{}
		};
	}
	onNext = () => {
		const {actions, staycation: {setInputDetails}}= this.props;
		const describe = _.has(setInputDetails, "tenth.describe") ? setInputDetails.tenth.describe : {};
		const error = {};

		if(_.isEmpty(describe)){
			error.desc = "Describe your place to guests is required!";
		}

		this.setState({error});

		if(_.isEmpty(error)){
	  	actions.setStaycationScreen("eleventh");
		}
	}

	remaningText =() => {
		const {staycation: {setInputDetails}}= this.props;
		const describe = _.has(setInputDetails, "tenth.describe") ? setInputDetails.tenth.describe : {};
		if (describe.length!==0){
			return (
				<View style={{flex:5, flexDirection: "row", height:75 ,marginTop: 10, borderWidth:.7, borderColor: Color.LightBlue, backgroundColor:"aliceblue"}}>
					<View style={{flex:1, justifyContent: "center",}}>
						<Icon name='exclamation' type='evilicon' color={Color.LightBlue} size={30} />
					</View>

					<View style={{flex:4, flexDirection:"column"}}>
						<Text style={{marginTop: 10, fontFamily: "Roboto-Light", fontWeight:"bold", fontSize: 13}}> 
								Oops!	{500-describe.length} characters remaining
						</Text>
						<Text style={{marginTop:5, fontFamily: "Roboto-Light", fontSize: 13}}> 
						Type a few descriptive details so guests can imagine staying there.
						</Text>
					</View>
				</View>
			);
		}
	}

	_onChangeText = (type) => (value) => {
		const {actions, staycation:{setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		const params = _.merge({}, newInput.tenth);

		switch(type){
			case "describe":
				params.describe = value;
				break;
			case "space":
				params.space = value;
				break;
			case "availability":
				params.availability = value;
				break;
			case "neighbor":
				params.neighbor = value;
				break;
			case "around":
				params.around = value;
				break;
		}
		newInput.tenth=params;
		actions.setInputDetails(newInput);
	}

	render(){
		const {staycation: {setInputDetails}}= this.props;
		const describe = _.has(setInputDetails, "tenth.describe") ? setInputDetails.tenth.describe : {};
		const space = _.has(setInputDetails, "tenth.space") ? setInputDetails.tenth.space : {};
		const availability = _.has(setInputDetails, "tenth.availability") ? setInputDetails.tenth.availability : {};
		const neighbor = _.has(setInputDetails, "tenth.neighbor") ? setInputDetails.tenth.neighbor : {};
		const around = _.has(setInputDetails, "tenth.around") ? setInputDetails.tenth.around : {};
		const {error} = this.state;
		console.log("DESCRIBE", describe);
  	return (
  		<ScrollView style={styles.padH20}>
  			<View style={styles.marT30}>
  				<Text style={styles.labelText}>Describe your place to guests</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2, marginTop: 10}}> 
					Write a quick summary of your place. You can highlight what's special about your space, the neighborhood, and how you'll interact with guests.
  				</Text>
          <TxtInput
            style={{backgroundColor: Color.white, marginTop:10}}
            style3={{borderColor: Color.Standard}}
            round
            maxLength={500}
						multiline
						err={this.state.error.desc}
						compName={error.desc ? "Error" : ""}
						value={describe}
						onChangeText={this._onChangeText("describe")}
						placeholder="Describe your place to guests"
          />
						{_.isEmpty(describe)? null: this.remaningText()}

          <Text style={[styles.labelText, {marginTop:20}]}>Want to add more info? (optional)</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2, marginTop: 10}}> 
					Use the additional fields below to share more details.
  				</Text>
          <Text style={[styles.labelText2, {marginTop: 10}]}>Your space</Text>
          <Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2}}> 
					Let guests know how available you'll be during their stay for questions or to socialize. How you host is entirely up to you!
  				</Text>
          <TxtInput
            style={{backgroundColor: Color.white, marginTop:10}}
            style3={{borderColor: Color.Standard}}
            round
            multiline
						value={space}
						onChangeText={this._onChangeText("space")}
						placeholder="Your place"
						
          />
					<Text style={[styles.labelText2, {marginTop: 10}]}>Your availability</Text>
          <Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2}}> 
					{`Let guests know how available you'll be during their stay for questions or to socialize.\nHow you host is entirely up to you!`}
  				</Text>
          <TxtInput
            style={{backgroundColor: Color.white, marginTop:10}}
            style3={{borderColor: Color.Standard}}
            round
            multiline
						value={availability}
						onChangeText={this._onChangeText("availability")}
            placeholder="Your availability"
          />
					<Text style={[styles.labelText2, {marginTop: 10}]}>Your neighborhood</Text>
          <Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2}}> 
					Share what what makes your neighborhood special, like a favorite coffee shop, park, or a unique landmark.
  				</Text>
          <TxtInput
            style={{backgroundColor: Color.white, marginTop:10}}
            style3={{borderColor: Color.Standard}}
            round
            multiline
						value={neighbor}
						onChangeText={this._onChangeText("neighbor")}
            placeholder="Your neighborhood"
          /><Text style={[styles.labelText2, {marginTop: 10}]}>Getting around</Text>
          <Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2}}> 
					Add info about getting around your city or neighborhood, like nearby public transportation, driving tips, or good walking routes.
  				</Text>
          <TxtInput
            style={{backgroundColor: Color.white, marginTop:10}}
            style3={{borderColor: Color.Standard}}
            round
            multiline
						value={around}
						onChangeText={this._onChangeText("around")}
            placeholder="Getting around"
          />
        </View>
				{/* <View style={{height: 60}}/> */}
  		</ScrollView>
  	);
	}
}

TenthScreen.propTypes = {
	staycation: PropTypes.object,
};

export default TenthScreen;
