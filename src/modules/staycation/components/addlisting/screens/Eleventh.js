/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView,} from "react-native";
import styles from "../../../styles.css";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
const {Color} = Resources;

class EleventhScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
      value:'',
      error:{}
      
		};
	}
	onNext = () => {
		const {actions, staycation: {setInputDetails}}= this.props;
		const place = _.has(setInputDetails, "eleventh.place") ? setInputDetails.eleventh.place : {};
		const error = {};

		if(_.isEmpty(place)){
			error.place = "Name your place is required!";
    }
    else if(place.length<10){
			error.place = "Name must be at least 10 characters";
		}
    this.setState({error});

		if(_.isEmpty(error)){
	  	actions.setStaycationScreen("twelveth");
		}
	}

  remaningText =() => {
		const {staycation: {setInputDetails}}= this.props;
		const place = _.has(setInputDetails, "eleventh.place") ? setInputDetails.eleventh.place : {};
		if (place.length!==0){
			return (
				<View style={{flex:5, flexDirection: "row", height:75 ,marginTop: 10, borderWidth:.7, borderColor: Color.LightBlue, backgroundColor:"aliceblue"}}>
					<View style={{flex:1, justifyContent: "center",}}>
						<Icon name='exclamation' type='evilicon' color={Color.LightBlue} size={30} />
					</View>

					<View style={{flex:4, flexDirection:"column"}}>
						<Text style={{marginTop: 15, fontFamily: "Roboto-Light",  fontWeight:"bold", fontSize: 13}}> 
								Oops!	{50-place.length} characters remaining
						</Text>
						<Text style={{marginTop:5, fontFamily: "Roboto-Light", fontSize: 13}}> 
								We need a title for your place.
						</Text>
					</View>
				</View>
			);
		}
	}
	
	_onChangeText = (value) => {
		const {actions, staycation:{setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		const params = _.merge({}, newInput.eleventh);
		params.place = value;
		newInput.eleventh=params;
		actions.setInputDetails(newInput);
	}

	render(){
		const {staycation: {setInputDetails}}= this.props;
		const place = _.has(setInputDetails, "eleventh.place") ? setInputDetails.eleventh.place : {};
    const {error} = this.state;
  	return (
  		<ScrollView style={styles.padH20}>
  			<View style={styles.marT30}>
  				<Text style={styles.labelText}>Name your place</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2, marginTop: 10}}> 
					Attract guests with a listing title that highlights what makes your place special.
  				</Text>
          <TxtInput
            style={{backgroundColor: Color.white, marginTop:10}}
            style3={{borderColor: Color.Standard}}
            round
            maxLength={50}
            multiline
            err={error.place ? this.state.error.place : this.state.error.place}
            compName={error.place ? "Error " : ""}
						value={place}
						onChangeText={this._onChangeText}
						placeholder="Name your place"
						
          />
					{_.isEmpty(place)? null: this.remaningText()}

        </View>
  		</ScrollView>
  	);
	}
}

EleventhScreen.propTypes = {
	staycation: PropTypes.object,
};

export default EleventhScreen;
