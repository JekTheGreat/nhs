import React from "react";
import {FlatList, View, StyleSheet, TouchableOpacity,
	Image, Text, Dimensions} from "react-native";
import styles from "../../styles.css";
import LinearGradient from "react-native-linear-gradient";
import {Card} from "native-base";
import _ from "lodash";
import { getDistance } from "geolib";
import numeral from "numeral";
import Resources from "__src/resources";
import { PropTypes } from "prop-types";
const { height } = Dimensions.get("window");
const {Res, Color} = Resources;

// const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
// const CUSTOM_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };

class CoordinateList extends React.PureComponent {

  getDistanceInMeter = (item) => {
  	const {currentPosition} = this.props;
  	const coords = {latitude: item.latitude, longitude: item.longitude};
  	const distance = getDistance(coords, currentPosition, 0.1);
  	const speed = 0;

  	return {speed, distance};
  }

  renderItem = ({item, index}) => {
  	const color = index % 2 ? {backgroundColor: Color.LightBlue2} : null;
  	const {distance, speed} = this.getDistanceInMeter(item);

  	const kilometer = distance / 1000;
  	
  	return (
  		<TouchableOpacity onPress={() => this.findCoordinate(item)}>
  			<Card  activeOpacity={0.5}
  				key={`idx ${index}`} style={[styles.renderItemStyle, color]}>
  				<Image style={styles.imageLogo} source={Res.get("circle_wallet")} resizeMode={"contain"} />
  				<View style={styles.view1}>
  					<Text style={styles.txtRemark}>{item.name}</Text>
  					<Text style={styles.txtStatus}>
  						{`Lat: ${item.latitude} - Long: ${item.longitude}`}</Text>
  					<Text style={styles.txtStatus}>
  						{`Distance: ${numeral(kilometer).format("0,000.00")} km • ${speed} min`}</Text>
  				</View>
  			</Card>
  		</TouchableOpacity>
  	);
  }

  findCoordinate(item) {
  	const {mapRef, actions, currentPosition} = this.props;
  	if (typeof mapRef === "undefined"){
  		console.log("mapRef", mapRef);
  		
  		return null;
  	}

  	const origin = "14.649914,121.046924";
  	const destination = `${item.latitude},${item.longitude}`;
    
  	actions.setCoordinate(origin, destination);

  	// mapRef.fitToCoordinates([item], {
  	// 	edgePadding: CUSTOM_PADDING,
  	// 	animated: true,
  	// });
  }

  _onViewableItemsChanged = ({ viewableItems }) => {
  	const {mapRef} = this.props;
  	console.log("mapRef", typeof mapRef);
  	if (typeof mapRef === "undefined" && !_.isEmpty(viewableItems)){
  		
  		return null;
  	}
  	// const newMarkers = _.chain(viewableItems).map("item").value();
		
  	// mapRef.fitToCoordinates(newMarkers, {
  	// 	edgePadding: DEFAULT_PADDING,
  	// 	animated: true,
  	// });
  };
  
  render(){
  	const {MarkerList, style} = this.props;
    
  	return (
  		<View style={[styles.flatlistStyle, style]}>
  			<View pointerEvents="none" style={[styles.gradient, {height}]} >
  				<LinearGradient
  					style={StyleSheet.absoluteFill}
  					start={{x: 0.5, y: 0.5}} end={{x: 0.5, y: 1.0}}
  					locations={[0, 0.3, 0.6]}
  					colors={["transparent", "rgba(255, 255, 255, 0.4)", "white"]} />
  			</View>

  			<FlatList
  				style={[styles.flex1, styles.flStyle]}
  				data={MarkerList}
  				extraData={this.state}
  				keyExtractor={(item, idx) => `${idx}`}
  				renderItem={this.renderItem}
  				onViewableItemsChanged={this._onViewableItemsChanged}
  				viewabilityConfig={{ itemVisiblePercentThreshold: 50 }} />
  		</View>
  	);
  }
}

CoordinateList.propTypes = {
	actions: PropTypes.object,
	MarkerList: PropTypes.array,
	currentPosition: PropTypes.object,
	style: PropTypes.object,
	mapRef: PropTypes.oneOfType([
		PropTypes.object,
		PropTypes.node,
	]),
};

CoordinateList.defaultProps = {
	MarkerList: undefined,
};

export default CoordinateList;
