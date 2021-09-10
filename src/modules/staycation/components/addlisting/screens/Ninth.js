/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, Image, FlatList} from "react-native";
import styles from "../../../styles.css";
import PropTypes from "prop-types";
import _ from "lodash";
import Resources from "__src/resources";
import TxtInput from "__src/components/TxtInput";
const {Color} = Resources;

class NinthScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
		};
	}
	onNext = () => {
		const {actions} = this.props;
	  	actions.setStaycationScreen("tenth");
	}
	_onChangeText = (index)=> (value)=>  {
		const {actions, staycation:{setInputDetails}} = this.props;
		const newInput = _.merge({}, setInputDetails);
		const params = _.merge({}, newInput.nineth);
			params.description = value;
			newInput.nineth=params;
			actions.setInputDetails(newInput);

		console.log("INDEX: ", index, value[index]);
	}

	_renderItem = ({item, index}) => {
    const {actions, staycation: {setInputDetails}} = this.props;
		const description = _.has(setInputDetails, "nineth.description") ? setInputDetails.nineth.description : {};
		 
		console.log("NINETH: ", index, description[index]);
		return (
			<View style={{flex:1, flexDirection:"row", marginRight:5}}>
				<View key={`${index}`} style={{flex:1, marginTop:5, height:200, width:"75%"}}>
				<Image 
					source={{uri: item.sourceURL}}
					style={{flex:1, marginTop:2,}}/>
				<TxtInput
					style={{backgroundColor: Color.white, marginTop:10}}
					style3={{height:45, borderColor: Color.Standard}}
					round
					value={description}
					onChangeText={this._onChangeText(index)}
					placeholder="Add a description" />
				</View>
			</View>
		)
	}
	render(){
    const { actions, staycation: {setInputDetails}} = this.props;
		const photo = _.has(setInputDetails, "eigth.photo") ? setInputDetails.eigth.photo : {};
  	return (
  		<ScrollView style={styles.padH20}>
  			<View style={styles.marT30}>
  				<Text style={styles.labelText}>Add photo description to your listing</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard, marginTop: 10}}> 
					Photos description help guests to know the label of every pictures.
  				</Text>
					<FlatList
						ItemSeparatorComponent={this.FlatListItemSeparator}
						data={photo}
						extraData={this.state}
						numColumns={2}
						keyExtractor={(item, index) => `idx${index}`}
						renderItem={this._renderItem}
					/>
        </View>
  		</ScrollView>
  	);
	}
}

NinthScreen.propTypes = {
	staycation: PropTypes.object,
};

export default NinthScreen;
