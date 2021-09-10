import React from "react";
import {View, StyleSheet, Text, TouchableWithoutFeedback, ImageBackground} from "react-native";
import Resource from "__src/resources";
import _ from "lodash";
import PropTypes from "prop-types";
const {Color, Res} = Resource;
const hotseat = ["21", "22", "25", "31", "33", "36"];
const normalseat = ["23", "24", "26", "27", "34", "35", "37", "38"];

class PassengerSeatRow extends React.PureComponent{

  getSeat = (item) => {
  	if (item.Assignable){
  		if (_.includes(hotseat, item.SeatGroup)){
  			return "chair_hot";
  		} else if (_.includes(normalseat, item.SeatGroup)){
  			return "chair_standard";
  		}
  	}
    
  	return "chair_unavailable";
  }

  onItemClick = (item) => {
  	if (item.Assignable){
  		this.props.onPress(item);
  	}
  }
	
	condition = (item, index) => {
		const {rowItem} = this.props;
		const findResult = _.find(item.PropertyList.EquipmentProperty, {TypeCode: "AISLE"});
		const result = rowItem.Seats[index + 1];

		if (_.isEmpty(result)){
			return false;
		}
		const findNext = _.find(rowItem.Seats[index + 1].PropertyList.EquipmentProperty, {TypeCode: "AISLE"});

		return !_.isEmpty(findResult) && !_.isEmpty(findNext);
	}

  renderImage = (item, index) => {
  	const {setSeat} = this.props;
  	const sourceImage = setSeat.SeatDesignator === item.SeatDesignator ? "chair_seat" : this.getSeat(item);
		
  	const marginRight = this.condition(item, index) ? 25 : 0;
  	const left = marginRight + 8.5;
  	
  	return (
  		<TouchableWithoutFeedback key={`${index}`} onPress={() => this.onItemClick(item)}>
  			<ImageBackground style={[styles.imageSeat, {marginRight}]} source={Res.get(sourceImage)} resizeMode="contain">
  				{this.condition(item, index) &&
					<Text style={[styles.txtRow, {left}]}>{item.RowNumber}</Text>}
  			</ImageBackground>
  		</TouchableWithoutFeedback>
  	);
  }

  render(){
  	const {rowItem} = this.props;
		
  	return (
  		<TouchableWithoutFeedback>
  			<View style={styles.container}>
  				{rowItem.Seats.map((item, index) => {
  					return this.renderImage(item, index);
  				})}
  			</View>
  		</TouchableWithoutFeedback>
			
  	);
  }
};

PassengerSeatRow.propTypes = {
	rowItem: PropTypes.object,
	setSeat: PropTypes.object,
	onPress: PropTypes.func,
};

const styles = StyleSheet.create({
	container: {flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 15 },
	imageSeat: {width: 25, height: 25, alignItems: "center", justifyContent: "center", marginHorizontal: 3},
	txtRow: {position: "absolute"},
});


export default PassengerSeatRow;
