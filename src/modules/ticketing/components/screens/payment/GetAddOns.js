import React from "react";
import {View, Text, StyleSheet, FlatList} from "react-native";
import PropTypes from "prop-types";
import numeral from "numeral";
import _ from "lodash";
import {Icon} from "react-native-elements";
import Resource from "__src/resources";
const {Color} = Resource;

class GetAddOns extends React.PureComponent{

  renderAddOns = (item, index) => {

  	if (item.SeatDesignator){
  		return (
  			<View key={`${index}`} style={[styles.viewLayover]}>
  				<Text style={styles.txtPax}> * {item.SeatDesignator}</Text>
  				<Text style={styles.txtAmount}>{item.ServiceCharge.CurrencyCode} {numeral(item.ServiceCharge.TotalAmount).format("0,000.00")}</Text>
  			</View>
  		);
  	}
  	const label = item.Code === "NO_BAGGAGE" ? "No checked baggage" : `${item.Weight}${item.Unit}`;
		
  	return (
  		<View key={`${index}`} style={[styles.viewLayover]}>
  			<Text style={styles.txtPax}> * {label}</Text>
  			<Text style={styles.txtAmount}>{item.CurrencyCode} {numeral(item.Amount).format("0,000.00")}</Text>
  		</View>
  	);
  }

  renderItem =({item}) => {
  	return (
  		<View key={item.name}>
  			<Text style={styles.txtPax}>{item.name}</Text>

  			{ !_.isEmpty(item.data) && _.map(item.data,
  				(bag, index) => this.renderAddOns(bag, index)) }
  		</View>
  	);
  }
	
  getBaggage = () => {
  	const {setBaggage, selected} = this.props;
  	const arrays = [];
  	let isNotEmpty = true;
		
  	if (selected && !_.isEmpty(setBaggage)){
  		_.map(selected.FlightSegments, (segment) => {
  			const dep = segment.DepartureStation;
  			const ret = segment.ArrivalStation;
  			isNotEmpty = _.isEmpty(setBaggage[`${dep}${ret}`]);
  			arrays.push({name: `${dep}${ret}`, data: setBaggage[`${dep}${ret}`]});
  		});
  	}
    
  	if (arrays.length > 0 && !isNotEmpty){
  		return (
  			<View>
  				<Text style={styles.txtCategory}>BAGGAGE</Text>
  				<FlatList
  					data={arrays}
  					keyExtractor={(item) => item.name}
  					renderItem={this.renderItem}
  				/>
  			</View>
  		);
  	}
    
  	return null;
  }
	
	getSeat = () => {
  	const {setSeat, selected} = this.props;
		const arrays = [];
		let TotalSeat = 0;

  	if (selected && !_.isEmpty(setSeat)){
  		_.map(selected.FlightSegments, (segment) => {
  			const dep = segment.DepartureStation;
				const ret = segment.ArrivalStation;
				TotalSeat += _.sumBy(setSeat[`${dep}${ret}`], (item) => {
					return item.ServiceCharge.TotalAmount;
				});
  			arrays.push({name: `${dep}${ret}`, data: setSeat[`${dep}${ret}`]});
  		});
  	}
    
  	if (arrays.length > 0 && TotalSeat > 0){
  		return (
  			<View>
  				<Text style={styles.txtCategory}>SEAT</Text>
  				<FlatList
  					data={arrays}
  					keyExtractor={(item) => item.name}
  					renderItem={this.renderItem}
  				/>
  			</View>
  		);
  	}
    
  	return null;
	}
  
	render(){
		const {setSeat, setBaggage} = this.props;

		if (_.isEmpty(setSeat) && _.isEmpty(setBaggage)){
			return null;
		}

		const isEmpty = _.isEmpty(this.getBaggage()) && _.isEmpty(this.getSeat());

  	return (
  		<View>
  			{!isEmpty && <View style={[styles.view3]}>
  				<Text style={styles.txtFare}>ADD ONS </Text>
  			</View>}
  			{this.getBaggage()}
  			{this.getSeat()}
  		</View>
  	);
	}
}

GetAddOns.propTypes = {
	setBaggage: PropTypes.object,
	selected: PropTypes.object,
	setSeat: PropTypes.object,
};

const styles = StyleSheet.create({
	view3: {flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7},
	viewLayover: {flexDirection: "row", alignItems: "center", justifyContent: "space-between"},
	txtPax: {fontFamily: "Roboto", fontSize: 11, color: Color.Header},
	txtCategory: {fontFamily: "Roboto", fontSize: 11, fontWeight: "bold", color: Color.Header, marginTop: 5},
	txtFare: {fontFamily: "Roboto", fontWeight: "bold", fontSize: 11, color: Color.LightBlue5},
	txtAmount: {fontFamily: "Roboto-Medium", fontSize: 11, color: Color.LightBlue5},
});

export default GetAddOns;
