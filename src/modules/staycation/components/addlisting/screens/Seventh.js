/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, FlatList} from "react-native";
import styles from "../../../styles.css";
import {CheckBox} from "react-native-elements";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import _ from "lodash";
import { closeModal } from "../../../../addlegacy/actions";
const {Color} = Resources;

class SeventhScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
		isChecked:{},
		};
	}

	componentDidMount() {
		const {actions} = this.props;
	  actions.fetchAmenities();
  }

	handleChange = (item) => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		let params = _.merge({}, newInput.seventh);
		let isChecked = {...params};
		let value = !isChecked[item.id];

		if (value) {
			isChecked[item.id] = true;
		}else {
			delete isChecked[item.id];
		}
		console.log("ITEM", isChecked, newInput);
		newInput.seventh = isChecked;
		actions.setInputDetails(newInput);
		this.setState({isChecked, error: {}});
	}

	onNext = () => {
		const {actions} = this.props;
	  	actions.setStaycationScreen("eighth");
	}

	_renderCB = (params) => (item, index) => {
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
			onPress={()=> this.handleChange(item)}
			/>
		 </View>
			);
	}

	_renderItem=(type)=>({item, index}) => {
		const {staycation: {setInputDetails}} = this.props;
		const params = setInputDetails.seventh;
		if(type==="common" && index===2){
			return (
				<View key={`${index}`}>
					{item.amenities.map(this._renderCB(params))}
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
  				<Text style={styles.labelText}>What spaces can guests use?</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2, marginTop: 10}}> 
					Include common areas, but don't add spaces that aren't on your property.
  				</Text>
					<FlatList
						data={getAmenities}
						extraData={{...setInputDetails.seventh}}
						keyExtractor={(item, index) => `idx${index}`}
						renderItem={this._renderItem("common")}
					/>
				</View>
  		</ScrollView>
  	);
	}
}

SeventhScreen.propTypes = {
	staycation: PropTypes.object,
};

export default SeventhScreen;
