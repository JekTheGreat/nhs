/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, FlatList, TouchableOpacity, Alert} from "react-native";
import styles from "../../../styles.css";
import {CheckBox, Icon, SearchBar} from "react-native-elements";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import TxtInput from "__src/components/TxtInput";
import _ from "lodash";
import Dropdown from "__src/components/Dropdown";
import {TextInput} from "react-native-gesture-handler";
// import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
const {Color} = Resources;

class ThirteenthScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
		};
  }
  
	onNext = () => {
		const {actions} = this.props;
	  	actions.setStaycationScreen("fourtheenth");
  }
  
  renderBase() {

  	return (
  		<View style={styles.renderBase}>
  			<Text style={[styles.input, {color: Color.Standard}]}>
  				{"Please select day"}
  			</Text>
  			<Icon name='arrow-drop-down' color="black" size={27} />
  		</View>
  	);
	}
  
	renderRow(rowData, rowID, highlighted) {
  	return (
  		<View style={[styles.renderRow, highlighted && {backgroundColor: Color.highlight}]}>
  			<Text style={[styles.renderRowTxt,
  				highlighted && styles.highlighted ]}>
  				{`${rowData.code} (${rowData.name})`}
  			</Text>
  		</View>
  	);
	}
	render(){ 
  	return (
  		<ScrollView style={styles.padH20}>
  			<View style={styles.marT30}>
  				<Text style={styles.labelText}>How much notice do you need before a guest arrives?</Text>

            <View style={{flex: 1, flexDirection:"row", marginTop:20}}>
              <View style={{flex: 1, marginRight:5}}>
              <Dropdown
  						animated={false}
  						showsVerticalScrollIndicator={false}
  						renderBase={this.renderBase.bind(this)}
  						dropdownStyle={styles.dropDownStyle}
  						options={null}
  						// renderButtonText={(e) => this._SelectedValue(e)}
  						renderRow={this.renderRow.bind(this)}
  						renderSeparator={null} />
              </View>

              <View style={{flex: 1, marginLeft:5}}>
                    
              </View>
            </View>

            <Text style={{marginTop:20, fontFamily: "Roboto-Light", fontSize: 15, textAlign:"left", alignSelf:"stretch", color: Color.Standard}}>
              Guests can book before:
            </Text>
            <Text style={{fontFamily: "Roboto-Light", fontSize: 15, textAlign:"left", alignSelf:"stretch", color: Color.Standard}}>
              Tip: At least 2 days' notice can help you plan for a guest's arrival, but you might miss out on last-minute trips.
            </Text>

            <Text style={[styles.labelText2, {marginTop:30}]}>When can guests check in?</Text>

            <View style={{flex: 1, flexDirection:"row", marginTop:10}}>
              <View style={{flex: 1, marginRight:5}}>
              <Text style={{fontFamily: "Roboto-Light", fontSize: 15, textAlign:"left", alignSelf:"stretch"}}>
              From:
            </Text>
              </View>

              <View style={{flex: 1, marginLeft:5}}>
              <Text style={{fontFamily: "Roboto-Light", fontSize: 15, textAlign:"left", alignSelf:"stretch"}}>
              To:
            </Text>
              </View>
            </View>

            <View style={{flex: 1, flexDirection:"row"}}>
              <View style={{flex: 1, marginRight:5}}>
              <Dropdown
  						animated={false}
  						showsVerticalScrollIndicator={false}
  						renderBase={this.renderBase.bind(this)}
  						dropdownStyle={styles.dropDownStyle}
  						options={null}
  						// renderButtonText={(e) => this._SelectedValue(e)}
  						renderRow={this.renderRow.bind(this)}
  						renderSeparator={null} />
              </View>

              <View style={{flex: 1, marginLeft:5}}>
              <Dropdown
  						animated={false}
  						showsVerticalScrollIndicator={false}
  						renderBase={this.renderBase.bind(this)}
  						dropdownStyle={styles.dropDownStyle}
  						options={null}
  						// renderButtonText={(e) => this._SelectedValue(e)}
  						renderRow={this.renderRow.bind(this)}
  						renderSeparator={null} />
              </View>
            </View>
          
           </View>
				{/* <View style={{height: 60}}/> */}
  		</ScrollView>
  	);
	}
}

ThirteenthScreen.propTypes = {
	staycation: PropTypes.object,
};

export default ThirteenthScreen;
