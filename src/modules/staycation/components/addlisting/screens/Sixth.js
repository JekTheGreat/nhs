/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, FlatList} from "react-native";
import styles from "../../../styles.css";
import {CheckBox} from "react-native-elements";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import _ from "lodash";
const {Color} = Resources;

class SixthScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
			selectedItem: {}
		};
	}
	componentDidMount() {
		const {actions} = this.props;
	  actions.fetchAmenities();
  }

	onNext = () => {
		const {actions} = this.props;
	  	actions.setStaycationScreen("seventh");
	}

	_renderText= (type, index) => {
			if (type ===1) {
						if (index===0) {
							return(
								<Text style={{marginBottom:5, fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2}}>
									Towels, bed sheets, soap, toilet paper, and pillows
								</Text>
							);
						}
			}
			else if (type===2) {
					if (index===0) {
						return(
							<Text style={{fontFamily: "Roboto-Light", marginBottom:5, fontSize: 12, color: Color.Standard2}}>
								{`Check your local laws, which may require a working smoke\ndetector in every room`}
							</Text>
						);
					}
					if (index===1) {
						return(
							<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2}}>
										{`Check your local laws, which may require a working carbon\nmonoxide detector in every room`}
							</Text>
						);
					}
					if (index===4) {
						return(
							<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2}}>
										Private room can be locked for safety and privacy
							</Text>
						);
					}
			}
	}

	onSelection = (item) => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		let params = _.merge({}, newInput.sixth);
		let selectedItem = {...params};
		let value = !selectedItem[item.id];

		if (value) {
			selectedItem[item.id] = true;
		}else {
			delete selectedItem[item.id];
		}
		console.log("ITEM", selectedItem, newInput);
		newInput.sixth = selectedItem;
		actions.setInputDetails(newInput);
		this.setState({selectedItem, error: {}});
	}

	_renderCB = (type, params) => (item, index) => {
		if (type===1){
			const selected = params[item.id] ? true : false;
			return (
				<View key={`${index}`} >
				<CheckBox
					style={{marginTop:20}}
					containerStyle={styles.containerStyle}
					textStyle={styles.textStyle}
					title={item.name}
					checkedColor={Color.LightBlue}
					checked={selected}
					onPress={() => this.onSelection(item)}
					/>
					{this._renderText(1,index)}
			</View>
				);
			}
		else if (type===2){
			const selected = params[item.id] ? true : false;
			return (
				<View key={`${index}`}>
				<CheckBox
					style={{marginTop:20}}
					containerStyle={styles.containerStyle}
					textStyle={styles.textStyle}
					title={item.name}
					checkedColor={Color.LightBlue}
					checked={selected}
					onPress={() => this.onSelection(item)}
				/>
				{this._renderText(2,index)}
			 </View>
			);
		}
	}

	_renderItem=(type)=>({item, index}) => {
		const {staycation: {setInputDetails}} = this.props;
		const params = setInputDetails.sixth;
		if(type==="basic" && index===0){
			console.log("TESSSST", item, index);
			return (
				<View key={`${index}`}>
					{item.amenities.map(this._renderCB(1, params))}
				</View>
			);
		}
		else if (type==="safety" && index===1){
			return (
				<View key={`${index}`}>
					{item.amenities.map(this._renderCB(2, params))}
				</View>
			);
		}
	}

	render(){
		const {staycation: {getAmenities, setInputDetails}} = this.props;
		console.log("STATE", this.state);
		console.log("getAmenities", getAmenities);
  	return (
  		<ScrollView style={styles.padH20}>
  			<View style={styles.marT30}>
  				<Text style={styles.labelText}>What amenities do you offer?</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color:Color.Standard2, marginTop: 10}}> 
							These are just the amenities guests usually expect, but you can add even more after you publish.
  				</Text>
					<Text style={[styles.labelText2, {marginTop:20}]}>Basic Amenities</Text>
						<FlatList
							data={getAmenities}
							extraData={{ ...setInputDetails.sixth}}
							keyExtractor={(item, index) => `idx${index}`}
							renderItem={this._renderItem("basic")}
						/>
						<Text style={[styles.labelText2, {marginTop:20}]}>Safety Amenities</Text>
						<FlatList
							data={getAmenities}
							extraData={{ ...setInputDetails.sixth}}
							keyExtractor={(item, index) => `idx${index}`}
							renderItem={this._renderItem("safety")}
						/>
            </View>
  		</ScrollView>
  	);
	}
}

SixthScreen.propTypes = {
	staycation: PropTypes.object,
};

export default SixthScreen;
