/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, TouchableOpacity, FlatList} from "react-native";
import styles from "../../../styles.css";
import {CheckBox, Icon} from "react-native-elements";
import Dropdown from "__src/components/Dropdown";
import TxtInput from "__src/components/TxtInput";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import _ from "lodash";
import BedroomJSON from "./Bedroom.json";
import BedspaceJSON from "./Bedspaces.json";
import BeddingJSON from "./Bedding.json";
const {Color} = Resources;

class SecondScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			error: {},
			guest: 1,
			beds: 1,
			active: false,
			spaceArray: [],
		};
	}
	onNext = () => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const error= {};
		const second = _.has(setInputDetails, "second") ? setInputDetails.second : {};

		if(_.isEmpty(second.bedroomType)){
			error.bedroomType = "Please select Bedroom!";
		}

		this.setState({error});
		if(_.isEmpty(error)){
			actions.setStaycationScreen("third");
		}
	}

	renderBase(type) {
		const {staycation: {setInputDetails}} = this.props;
		const {error} = this.state;
		if (type === "guest"){
			return (
			<View style={[setInputDetails.second.bedroomType || (!error.bedroomType)? {borderColor: Color.Standard,} : {borderColor: Color.red},
			{flexDirection: "row", width: "100%", height: 40, alignItems: "center",
				borderWidth: 0.6, borderRadius: 3, paddingHorizontal: 5, marginTop: 7}]}>
				<Text style={[styles.input, setInputDetails.second.bedroomType ? {color:Color.black} : 
				error.bedroomType? {color: Color.red} : {color:Color.Standard}]}>
				{setInputDetails.second.bedroomType? setInputDetails.second.bedroomType : error.bedroomType? error.bedroomType : "Please add one"}
				</Text>
				<Icon type='material' name='expand-more' color={setInputDetails.second.bedroomType || (!error.bedroomType)? "black": Color.red} size={27} />
				{
					error.bedroomType? <Icon type ='material' name='cancel' color={Color.red} size={16} />: 
					_.isUndefined(setInputDetails.second.bedroomType) && (!error.bedroomType)? null:
					<Icon type='material' name='check-circle' color={Color.green} size={16} />
				}
			</View>
			);
			}
		
		if (type === "space"){	
			return (
			<View style={[{borderColor: Color.Standard,}, {flexDirection: "row", width: "100%", height: 40, alignItems: "center",
				borderWidth: 0.6, borderRadius: 3, paddingHorizontal: 5, marginTop: 7}]}>
				<Text style={[styles.input, setInputDetails.second.space ? {color:Color.black} : {color:Color.Standard}]}>
				{setInputDetails.second.space || "Add another bed"}
				</Text>
				<Icon type='material' name='expand-more' color="black" size={27} />
			</View>
			);
		}
		
		if (type === "bedding"){	
			return (
			<View style={[{ borderColor: Color.Standard,}, {flexDirection: "row", width: "100%", height: 40, alignItems: "center",
				borderWidth: 0.6, borderRadius: 3, paddingHorizontal: 5, marginTop: 7}]}>
				<Text style={[styles.input, setInputDetails.second.bedding ? {color:Color.black} : {color:Color.Standard}]}>
				{setInputDetails.second.bedding || "Add another bed"}
				</Text>
				<Icon type='material' name='expand-more' color="black" size={27} />
			</View>
			);
		}
	}
  
	renderRow(rowData, rowID, highlighted, type) {
  	return (
		<View style={[styles.renderRow, highlighted && {backgroundColor: Color.highlight}]}>
			<Text style={[styles.renderRowTxt, highlighted && styles.highlighted ]}>
			{`${rowData.desc}`}
			</Text>
		</View>
  		);
	}

	buttonGuest = (type) => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		const params = _.merge({}, newInput.second);
		let count = params.guest || 1;

		switch (type){
			case "neg":
				if (count > 1){
					params.guest = count - 1;
				}
				break;
			case "pos":
				if (count < 16){
					params.guest = count + 1;
				}
				break;
		}
		newInput.second = params;
		actions.setInputDetails(newInput);
	}

	buttonBeds = (type) => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		const params = _.merge({}, newInput.second);
		switch (type){
			case "neg":
				if (params.beds > 1){
					params.beds = params.beds - 1;
				}
				break;
			case "pos":
				if (params.beds < 50){
					params.beds = params.beds + 1;
				}
				break;
		}
		newInput.second = params;
		actions.setInputDetails(newInput);
	}

	onChange= (type) => (e) => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		const params = _.merge({}, newInput.second);
		const {error, spaceArray} = this.state;
		switch(type){
			case "guest":
				error.bedroomType = ""
				params.countguest = e.countguest;
				params.bedroomType = e.desc;
				break;
			case "space":
				error.space = ""
				params.countspaces = e.countspaces;
				params.space = e.desc;
				const obj = {"desc": params.space};
				this.setState({spaceArray: [...spaceArray, obj]})
				break;
			case "bedding":
				error.bedding = ""
				params.countbeddings = e.countbeddings;
				params.bedding = e.desc;
				break;
		}
			newInput.second = params;
			actions.setInputDetails(newInput);
			this.setState({error});
	}

	getStudio = () => {
		let arrays = [{countguest:0, desc: "Studio"}];
		for(let x = 0; x<50; x++){
				arrays.push({countguest: x+1, desc: `${x+1} Bedroom/s`})
		}
		return arrays;
	}

	getBeds = () => {
		const {staycation: {setInputDetails}}= this.props;
		let arrays = [];
		if(setInputDetails.second.countguest){
			for(let x = 0; x < _.toInteger(setInputDetails.second.countguest); x++){
				arrays.push({countguest: x+1, desc: `${x+1} Bedroom`})
			}
			return arrays;
		}
		return arrays;
	}

	_renderItem = ({item, index}) => {
		const {staycation:{setInputDetails}}= this.props;
		const {guest, beds, active} = this.state;
		const bedsText = active? "Done":"Add Beds"
		const bedsBrColor= active? Color.LightBlue : Color.Standard;
		const bedsTxtColor = active? Color.LightBlue : Color.Standard;
		console.log("ASDFASDF: ", item);
		return (
		<View key={`${index}`} style={styles.marT30}>
			<View style={[{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}]}>
			<Text style={{fontFamily: "Roboto-Light", fontSize: 15, color: Color.Standard2}}>
				{`Bedroom ${item.countguest}\nBed/s (type)`}
				</Text>
				<TouchableOpacity onPress={() => this.addBeds()} activeOpacity={0.7} style={{width: 100, height: 30, borderRadius: 3, borderWidth: 0.7, backgroundColor: "white", shadowRadius: 0.7, shadowOpacity: 0.4,
					borderColor: bedsBrColor, alignItems: "center", justifyContent: "center", elevation: 1, shadowOffset: {width: 1, height: 1}}}>
					<Text style={{color: bedsTxtColor, fontSize: 14, fontFamily: "Roboto-Light"}}>{bedsText}</Text>
				</TouchableOpacity>
		</View>

		<View>
				<Dropdown
					animated={false}
					showsVerticalScrollIndicator={true}
					renderBase={this.renderBase.bind(this, "bedding")}
					dropdownStyle={styles.dropDownStyle}
					options={BeddingJSON}
					renderButtonText={this.onChange("bedding")}
					renderRow={this.renderRow.bind(this)}
					renderSeparator={null} />
			</View>   
		</View>      
		);
	}

	addBeds = () => {
		const setActivity = !this.state.active;
		this.setState({active:setActivity});
	}

	getUnique = (arr, comp) => {
		const unique = arr
		.map(e => e[comp])
		.map((e, i , final) => final.indexOf(e) === i && i)
		.filter(e => arr[e])
		.map(e => arr[e]);
		return unique;
	}

	render(){
		const {staycation: {setInputDetails}}= this.props;
		const second = _.has(setInputDetails, "second") ? setInputDetails.second : {};
		const disable= !setInputDetails.second.countguest&&setInputDetails.second.countguest!==0? true: false;
		const { beds, active, spaceArray } = this.state;
		const bedsText = active? "Done":"Add Beds";
		const bedsBrColor= active? Color.LightBlue : Color.Standard;
		const bedsTxtColor = active? Color.LightBlue : Color.Standard;
		const posColor = second.guest === 16 ?  Color.Standard :  Color.LightBlue;
		const negColor = second.guest === 1 ?  Color.Standard :  Color.LightBlue;
		const posBed = second.beds === 50 ?  Color.Standard :  Color.LightBlue;
		const negBed = second.beds === 1 ?  Color.Standard :  Color.LightBlue;
		const uniqueSpaces =  this.getUnique(spaceArray, "desc");
		
		const mapped = _.map(uniqueSpaces, (item) => {
			return item.desc;
		})
		console.log("STATE: ", this.state)
		console.log("uniqueSpaces: ", uniqueSpaces.desc, " -------- ", mapped);
  	return (
			
  		<ScrollView style={[styles.padH20, styles.fullFlex]}>
  			<View style={styles.marT30}>
  				<Text style={styles.labelText}>How many guests can your place accomodate?</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2, marginTop: 10}}>
          	Check that you have enough beds to accomodate all your guests comfortably
  				</Text>

					<View style={[styles.marT20, {flexDirection: "row", justifyContent: "space-between"}]}>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 17, color: Color.Standard2, fontWeight: "bold"}}>
          		Guests
  					</Text>
  					<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
							<TouchableOpacity onPress={() => this.buttonGuest("neg")} activeOpacity={0.7}
								style={[{width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: negColor, alignItems: "center", justifyContent: "center"}]}>
								<Text style={{color: Color.LightBlue, fontSize: 16}}>-</Text>
							</TouchableOpacity>
							<Text style={{color: Color.Standard2, fontSize: 17, width: 50, textAlign: "center"}}>{second.guest || 1}</Text>
							<TouchableOpacity onPress={() => this.buttonGuest("pos")} activeOpacity={0.7}
								style={[{width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: posColor, alignItems: "center", justifyContent: "center"}]}>
								<Text style={{color: Color.LightBlue, fontSize: 16}}>+</Text>
							</TouchableOpacity>
						</View>
  				</View>

					<View style={[styles.marT10, {flexDirection: "row", justifyContent: "space-between"}]}>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 17, color: Color.Standard2, fontWeight: "bold"}}>
          		Beds
  					</Text>
  					<View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
							<TouchableOpacity onPress={() => this.buttonBeds("neg")} activeOpacity={0.7} style={{width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: negBed, alignItems: "center", justifyContent: "center"}}>
								<Text style={{color: Color.LightBlue, fontSize: 16}}>-</Text>
							</TouchableOpacity>
							<Text style={{color: Color.Standard2, fontSize: 17, width: 50, textAlign: "center"}}>{second.beds || 1}</Text>
							<TouchableOpacity onPress={() => this.buttonBeds("pos")} activeOpacity={0.7} style={{width: 30, height: 30, borderRadius: 15, borderWidth: 1, borderColor: posBed, alignItems: "center", justifyContent: "center"}}>
								<Text style={{color: Color.LightBlue, fontSize: 16}}>+</Text>
							</TouchableOpacity>
						</View>
  				</View>

					<View style={styles.marT30}>
  					<Text style={[styles.labelStyle, {marginBottom:10}]}>How many bedrooms can guests use?</Text>
  					<Dropdown
  						animated={false}
  						showsVerticalScrollIndicator={true}
  						renderBase={this.renderBase.bind(this, "guest")}
  						dropdownStyle={styles.dropDownStyle}
  						// options={BedroomJSON}
  						options={this.getStudio()}
  						renderButtonText={this.onChange("guest")}
  						renderRow={this.renderRow.bind(this)}
  						renderSeparator={null} />
  				</View>
  			</View>


				<View style={[styles.marT30, {flexDirection: "row", justifyContent: "space-between", alignItems: "center"}]}>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.Standard2, fontWeight: "bold"}}>
						Common Spaces
					</Text>
					<TouchableOpacity onPress={() => this.addBeds()} activeOpacity={0.7} style={{width: 100, height: 30, borderRadius: 3, borderWidth: 0.7, backgroundColor: "white", shadowRadius: 0.7, shadowOpacity: 0.4,
						borderColor: bedsBrColor, alignItems: "center", justifyContent: "center", elevation: 1, shadowOffset: {width: 1, height: 1}}}>
						<Text style={{color: bedsTxtColor, fontSize: 14, fontFamily: "Roboto-Light"}}>{bedsText}</Text>
					</TouchableOpacity>
  			</View>
				<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.Standard2,}}>
						Bed/s (type)
					</Text>
				<Text style={{marginTop:10, fontFamily: "Roboto-Light", fontSize: 15, color: Color.Standard2}}>
							{setInputDetails.second.space? setInputDetails.second.space : ""}
				</Text>
				<View>
  					<Dropdown
  						animated={false}
  						showsVerticalScrollIndicator={true}
  						renderBase={this.renderBase.bind(this, "space")}
  						dropdownStyle={styles.dropDownStyle}
							options={_.filter(BedspaceJSON, (item) => {
											if(_.isEmpty(spaceArray) || _.isUndefined(spaceArray)){
												return item.desc !== setInputDetails.second.space;
											}
											else{
												console.log("MAPPED: ", mapped.toString());
													return item.desc !== mapped;
											}
											})}
							disabled={disable}
							renderButtonText={this.onChange("space")}
  						renderRow={this.renderRow.bind(this)}
  						renderSeparator={null} />
  				</View>

					<FlatList
						data={this.getBeds()}
						extraData={this.state}
						keyExtractor={(item, index) => `idx${index}`}
						renderItem={this._renderItem}
					/>

  		</ScrollView>
  	);
	}
}

SecondScreen.propTypes = {
	staycation: PropTypes.object,
};

export default SecondScreen;
