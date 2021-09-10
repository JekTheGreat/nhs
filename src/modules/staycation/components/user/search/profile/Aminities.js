import React from "react";
import {View, Text, FlatList, Dimensions} from "react-native";
import profile from "../../../../profile.json";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const SCREEN_WIDTH = Dimensions.get("window").width;

class Aminities extends React.PureComponent{

  renderSubItem = (item, i) => {
  	return (
  		<View key={`idx${i}`} style={{ flexDirection: "row", width: (SCREEN_WIDTH - 40) / 2, marginTop: 7, alignItems: "center"}}>
  			<View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: Color.colorPrimaryLight2}}/>
  			<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginLeft: 6}}>{item.name}</Text>
  		</View>
  	);
  }

  renderItem = ({item}) => {
  	return (
  		<View key={item.name} style={{marginTop: 10}}>
  			<Text style={{fontFamily: "Roboto", fontSize: 14, color: Color.text2}}>{item.name}</Text>
  			<View style={{flexDirection: "row", flexWrap: "wrap"}}>
  				{item.content.map((subItem, i) => {
  					if (i < 4) {
  						return this.renderSubItem(subItem, i);
  					}
              
  					return null;
  				})}
  				</View>
  		</View>
  	);
  }

  render(){
  	return (
      <>
        <Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 15}}>Amenities</Text>
        <FlatList
        	data={profile.homes.amenities}
        	keyExtractor={(item) => item.name}
        	renderItem={this.renderItem}
        />
        <Text style={{fontFamily: "Roboto", fontSize: 14, color: Color.colorPrimaryLight2, marginTop: 10}} suppressHighlighting>Show all Amenities and Facilities</Text>
      </>
  	);
  }
}

export default Aminities;
