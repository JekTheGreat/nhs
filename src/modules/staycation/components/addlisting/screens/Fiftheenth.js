
/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, StyleSheet, } from "react-native";
import styles from "../../../styles.css";
import {Icon} from "react-native-elements";
import PropTypes from "prop-types";
import Resources from "__src/resources";
import MapView, {PROVIDER_GOOGLE} from "react-native-maps";
import _ from "lodash";
import { TouchableOpacity } from "react-native-gesture-handler";
const {Color} = Resources;

class FiftheenthScreen extends Component{
	constructor(props){
		super(props);
		this.state = {
      active:false
		};
  }

	onNext = () => {
    const {actions, staycation: {setInputDetails}} = this.props;
    const geometry = _.has(setInputDetails, "fourtheenth.geometry") ? setInputDetails.fourtheenth.geometry : {};
    const newInput = _.merge({}, setInputDetails);
    newInput.geo=geometry;
    actions.setInputDetails(newInput);
    actions.setStaycationScreen("aa");
  }
  
  
  toggleSwitch = () => {
		const {actions, staycation: {setInputDetails}} = this.props;
		const saveSwitch= _.merge({}, setInputDetails);
    const param = _.merge({}, saveSwitch.fifth);
      param.isActive = false;
      saveSwitch.fifth = param;
      actions.setInputDetails(saveSwitch);
  }

  toggleButton = () => {
    this.setState({active:!this.state.active});
  }
 
	render(){
    const {actions, staycation: {setInputDetails}} = this.props;
    const geometry = _.has(setInputDetails, "fourtheenth.geometry") ? setInputDetails.fourtheenth.geometry : {};
    const isActive= _.has(setInputDetails, "fifth.isActive") ? !setInputDetails.fifth.isActive:false;

  return (
    <ScrollView style={styles.padH20}>
      <View style={styles.marT30}>
        <Text style={styles.labelText}>Is the pin in the right place?</Text>
        <Text style={{fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard2, marginTop: 10}}> 
          If needed, you can click "back button" to adjust its location. Only confirmed guests will see this, so they know how to get to your place.
        </Text>
          <Text style={[styles.labelText2, {marginTop: 20,}]}>
          Google Maps
          </Text>
            <View style={{flex: 1, flexDirection:"row", marginTop:10}}>
              <View style={{marginRight:5}}>
                  <Icon name='pin' type='entypo' size={17}/>
              </View>
              <View style={{flex: 1,}}>
                  <Text style={{fontSize: 14, color: Color.red}}>
                  {setInputDetails.desc}
                  </Text>
              </View>
          </View>

        <View style={{marginTop:5}}>


          <MapView
          mapType={this.state.active? 'standard':'satellite'}
          style={{height:300, flex:1, flexDirection: "row", justifyContent: "space-between"}}
        // provider={PROVIDER_GOOGLE}
          initialRegion ={{
          latitude:geometry.lat,
          longitude:geometry.lng,
          latitudeDelta:0.006866,
          longitudeDelta:0.004757}}>

          <View style={{height: 30, width: 150, backgroundColor:Color.lightgray, alignItems: "flex-start",}}>
          {/* <TouchableOpacity style={{ height: 30, width: 75, backgroundColor: isActive? Color.LightBlue: Color.green, left: isActive? 0:75, alignItems:"center", justifyContent:"center"}}
          onPress={this.toggleSwitch}> */}
            <TouchableOpacity style={{height: 30, width: 75, backgroundColor: this.state.active? Color.LightBlue: Color.green, left: this.state.active? 0:75, alignItems:"center", justifyContent:"center"}}
          onPress={this.toggleButton}>
            {/* <Text style={{marginTop:3, alignItems:"center", color:Color.white}}>{isActive? 'Map':'Satellite'}</Text> */}
            <Text style={{marginTop:3, alignItems:"center", color:Color.white}}>{this.state.active? 'Map':'Satellite'}</Text>
          </TouchableOpacity>
          </View>

          <View style={{margin:5, height: 30, width: 30, backgroundColor:Color.white, alignItems: "flex-end",}}>
            <TouchableOpacity style={{ height: 30, width: 75, alignItems:"center", justifyContent:"center"}}
            onPress={this.state.active}>
              {()=> 
              <Icon name='arrow-expand' color="black" size={20}/>}
          </TouchableOpacity>
          </View>

            <MapView.Marker
            coordinate={{
            latitude:geometry.lat,
            longitude:geometry.lng,
            }}>
              <View style={styles2.radius}>
              <View style={styles2.marker} />
              </View>
              </MapView.Marker>
            </MapView>
        </View>
        </View>
    </ScrollView>
    );
  }
}

const styles2 = StyleSheet.create({
	radius: {
		height: 40,
		width:40,
		borderRadius: 75,
		overflow: "hidden",
		backgroundColor: 'rgba(0, 112, 255, 0.1)',
		borderWidth: 1,
		borderColor:'rgba(0, 112, 255, 0.3)',
		alignItems: "center",
		justifyContent: "center",
	},
	marker:{
		height:20,
		width: 20,
		borderWidth:3,
		borderColor:'white',
		borderRadius:10,
		overflow:"hidden",
		backgroundColor: '#007AFF',
	},
});

FiftheenthScreen.propTypes = {
	staycation: PropTypes.object,
};

export default FiftheenthScreen;
