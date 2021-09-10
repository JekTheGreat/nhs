/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView} from "react-native";
import styles from "../../../styles.css";
import {Icon} from "react-native-elements";
import {RadioButton, RadioGroup} from "react-native-flexi-radio-button";
import Dropdown from "__src/components/Dropdown";
import PropTypes from "prop-types";
import _ from "lodash";
import Resources from "__src/resources";
const {Color} = Resources;

class FirstScreen extends Component{
	constructor(props){
		super(props);
		this.state={
			error:{},
		};
	}

	onNext = () => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const error= {};
		const first = _.has(setInputDetails, "first") ? setInputDetails.first : {};

		if(_.isEmpty(first.properties)){
			error.prop = "Please select your property";
		}
		if(_.isEmpty(first.propertyType)){
			error.propType = "Please select your property type";
		}

		this.setState({error});
		if(_.isEmpty(error)){
	  	actions.setStaycationScreen("second");
		}
	}

	renderBase(type) {
		const {staycation: {setInputDetails}} = this.props;
		const {error} = this.state;
		const propColor = _.has(setInputDetails, "first.properties") ? {color:Color.black} : {color:Color.Standard};
		const propTypeColor = _.has(setInputDetails, "first.propertyType") ? {color:Color.black} : {color:Color.Standard};
		if(type === "properties"){
			return (
				<View style={error.prop?{flexDirection: "row", width: "100%", height: 40, alignItems: "center",  borderColor: Color.red,
				borderWidth: 0.6, borderRadius: 3, paddingHorizontal: 5, marginTop: 7}:styles.renderBase}>
					<Text style={[styles.input, error.prop? {color:Color.red}:propColor]}>
						{_.has(setInputDetails, "first.properties") ? setInputDetails.first.properties : "Please select property"}
					</Text>
					<Icon type='material' name='expand-more' color={error.prop? Color.red : "black"} size={27} />
					{
					error.prop? <Icon type ='material' name='cancel' color={Color.red} size={16} />: 
					_.isUndefined(setInputDetails.first.properties)? null:
					<Icon type='material' name='check-circle' color={Color.green} size={16} />
					}
				</View>
			);
		}
		return (
  		<View style={error.propType?{flexDirection: "row", width: "100%", height: 40, alignItems: "center",  borderColor: Color.red,
			borderWidth: 0.6, borderRadius: 3, paddingHorizontal: 5, marginTop: 7}:styles.renderBase}>
  			<Text style={[styles.input, error.propType? {color:Color.red}:propTypeColor]}>
					{_.has(setInputDetails, "first.propertyType") && (!error.propType) ? 
					setInputDetails.first.propertyType : "Please select property type"}
  			</Text>
  			<Icon type='material' name='expand-more' color={error.propType? Color.red : "black"} size={27} />
				{
					error.propType? <Icon type ='material' name='cancel' color={Color.red} size={16} />: 
					_.isUndefined(setInputDetails.first.propertyType) || (setInputDetails.first.propertyType==="")? null:
					<Icon type='material' name='check-circle' color={Color.green} size={16} />
				}
  		</View>
		);
	}
  
	renderRow(rowData, rowID, highlighted) {
		const {error} = this.state;
  	return (
  		<View style={[styles.renderRow, highlighted && {backgroundColor: Color.highlight}]}>
  			<Text style={[styles.renderRowTxt,
  				highlighted && styles.highlighted ]}>
  				{`${rowData.name}`}
  			</Text>
  		</View>
  	);
	}

	onChange = (type) => (value) => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		const params = _.merge({}, newInput.first);
		const {error}= this.state;

		switch(type){
			case "properties":
				error.prop="";
				params.propertyType = "";
				params.properties = value.name;
				actions.fetchPropertyTypes(value.id);
				break;

			case "propertyType":
				error.propType="";
				params.propertyType = value.name;
				
				break;
		}
		newInput.first = params;
		actions.setInputDetails(newInput);
		this.setState({error});
	}

	onSelect = (type) => (index) => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const saveRadios= _.merge({}, setInputDetails);
		const param = _.merge({}, saveRadios.first);
		switch(type){
			case "radio1":
				param.radio1 = index;
				break;
			case "radio2":
				param.radio2 = index;
				break;
			case "radio3":
				param.radio3 = index;
				break;
		}
		saveRadios.first = param;
		actions.setInputDetails(saveRadios);
	}

	render(){
		const {staycation: {getProperties, getPropertyTypes, setInputDetails}} = this.props;
		const radio1= _.has(setInputDetails, "first.radio1") ? setInputDetails.first.radio1 : 0;
		const radio2= _.has(setInputDetails, "first.radio2") ? setInputDetails.first.radio2 : 0;
		const radio3= _.has(setInputDetails, "first.radio3") ? setInputDetails.first.radio3 : 0;

  	return (
  		<ScrollView style={styles.padH20}>
  			<View style={styles.marT20}>
  				<Text style={styles.labelText}>What kind of place are you listing?</Text>
					<Text style={[styles.labelStyle]}>First, let's narrow things down</Text>
  				<View style={styles.marT20}>
  					<Text style={[styles.labelStyle]}>Choose a property</Text>
  					<Dropdown
  						animated={true}
  						showsVerticalScrollIndicator={true}
  						renderBase={this.renderBase.bind(this, "properties")}
  						dropdownStyle={styles.dropDownStyle}
							options={getProperties}	
  						renderButtonText={this.onChange("properties")}
							renderRow={this.renderRow.bind(this)}
  						renderSeparator={null} />
  				</View>

					<View style={styles.marT20}>
  					<Text style={[styles.labelStyle]}>Choose a property type</Text>
  					<Dropdown
  						animated={true}
  						showsVerticalScrollIndicator={true}
  						renderBase={this.renderBase.bind(this, "propertyType")}
  						dropdownStyle={styles.dropDownStyle}
  						options={getPropertyTypes}
  						renderButtonText={this.onChange("propertyType")}
  						renderRow={this.renderRow.bind(this)}
  						renderSeparator={null} />
  				</View>
  			</View>

  			<View style={styles.marT10}>
  				<Text style={styles.labelText2}>What will guests have?</Text>

					<RadioGroup
						style={[styles.containerStyle, {marginTop:10,}]}
						size={20}
						thickness={2}
						color={Color.Standard}
						activeColor={Color.LightBlue}
						selectedIndex={radio1}
						onSelect={this.onSelect("radio1")}>

							<RadioButton value='index1' style={styles.containerStyle}>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 15, fontWeight: "bold", textAlign:"left", alignSelf:"stretch", color: Color.Standard2,}}>
									Entire Place</Text>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2}}>
									Guests have the whole place to themselves. This usually includes a bedroom, a bathroom, and a kitchen.</Text>
							</RadioButton>
							
							<RadioButton value='index2' style={[styles.containerStyle, {marginTop:10}]}>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 15, fontWeight: "bold", textAlign:"left", alignSelf:"stretch", color: Color.Standard2}}>
									Private room</Text>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2}}>
									Guests have their own private room for sleeping. Other areas could be shared.</Text>
							</RadioButton>
							
							<RadioButton value='index3' style={[styles.containerStyle, {marginTop:10}]}>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 15, fontWeight: "bold", textAlign:"left", alignSelf:"stretch", color: Color.Standard2, textAlign:"left"}}>
									Shared room</Text>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2}}>
									Guests sleep in a bedroom or a common area that could be shared with others.</Text>
							</RadioButton>
					</RadioGroup>
  			</View>


  			<View style={styles.marT10}>
  				<Text style={styles.labelText2}>Is this set up as a dedicated guest space?</Text>

					<RadioGroup
						style={[styles.containerStyle, {marginTop:10,}]}
						size={20}
						thickness={2}
						color={Color.Standard}
						selectedIndex={radio2}
						activeColor={Color.LightBlue}
						onSelect={this.onSelect("radio2")}>

							<RadioButton style={styles.containerStyle}>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 13, fontWeight:"bold", textAlign:"left", alignSelf:"stretch", color: Color.Standard2,}}>
									Yes, it's primarily set up for guests</Text>
							</RadioButton>
							
							<RadioButton style={[styles.containerStyle, {marginTop:10}]}>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 13, fontWeight:"bold", textAlign:"left", alignSelf:"stretch", color: Color.Standard2}}>
									No, I keep my personal belongings here</Text>
							</RadioButton>

					</RadioGroup>
  			</View>

  			<View style={styles.marT10}>
  				<Text style={styles.labelText2}>
          Are you listing on Staycation as part of a company?</Text>

					<RadioGroup
						style={[styles.containerStyle, {marginTop:10,}]}
						size={20}
						thickness={2}
						color={Color.Standard}
						selectedIndex={radio3}
						activeColor={Color.LightBlue}
						onSelect={this.onSelect("radio3")}>

							<RadioButton style={styles.containerStyle}>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 13, fontWeight:"bold", textAlign:"left", alignSelf:"stretch", color: Color.Standard2,}}>
									Yes, I work for or run a hospitality business</Text>
							</RadioButton>
							
							<RadioButton style={[styles.containerStyle, {marginTop:10}]}>
									<Text style={{fontFamily: "Roboto-Light", fontSize: 13, fontWeight:"bold", textAlign:"left", alignSelf:"stretch", color: Color.Standard2}}>
									No, that doesn't sound like me</Text>
							</RadioButton>
					</RadioGroup>
					
  			</View>
  			<View style={styles.marT20}>

  			<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard}}>
          This helps you get the right features for how you host.
          It won't show up to guests or impact how you show up in search
  				</Text>
  			</View>
  		</ScrollView>
  	);
	}
}

FirstScreen.propTypes = {
	staycation: PropTypes.object,
};

export default FirstScreen;
