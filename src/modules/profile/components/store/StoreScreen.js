/* eslint-disable */
import React from "react";
import {View, SafeAreaView, StyleSheet, FlatList, 
	Text, Dimensions, TouchableOpacity, Image} from "react-native";
import MapView, {Marker} from "react-native-maps";
import {ListItem} from "react-native-elements";
import _ from "lodash";
import Resources from "__src/resources";
import {Card} from "native-base";
import LinearGradient from "react-native-linear-gradient";
import { getDistance, getSpeed, convertSpeed} from 'geolib';
import numeral from "numeral"
import convert from "convert-units";
import MapViewDirections from 'react-native-maps-directions';
import Polyline from '@mapbox/polyline';
const {Res, Color} = Resources;
const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 14.725643;
const LONGITUDE = 121.065455;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;
let geoOptions = { enableHighAccuracy: true, timeout: 15000 };

function createMarker(modifier = 1) {
  return {
		name: `Dealer Store ${modifier}`,
    latitude: LATITUDE - SPACE * modifier,
    longitude: LONGITUDE - SPACE * modifier,
  };
}
const DEFAULT_PADDING = { top: 30, right: 30, bottom: 150, left: 30 };
const CUSTOM_PADDING = { top: 20, right: 20, bottom: (height / 2) + 300, left: 20 };
const MARKERS = [
	{
		name: "Daranak Falls",
		latitude: "14.5431", 
		longitude: "121.3111"
	},
  createMarker(),
  createMarker(2),
  createMarker(3),
	createMarker(4),
  createMarker(5),
  createMarker(6),
  createMarker(7),
  createMarker(8),
  createMarker(9),
	{
		name: `Dealer Store 10`,
    latitude: 36.78825,
    longitude: -121.4324,
	}, {
		name: `Dealer Store 11`,
    latitude: 38.78825,
    longitude: -124.4324,
	}
];

export default class StoreScreen extends React.PureComponent{
	static navigationOptions = {
		headerShown: false,
	}
	state = {
		currentPosition: {}
	}

	componentDidMount(){
    navigator.geolocation.watchPosition(this.geoSuccess, this.geoFailure, geoOptions);
	}

	geoSuccess = position => {
    const meters = getDistance(position.coords, {
      latitude: 51.525,
      longitude: 7.4575,
    }, position.coords.accuracy);
    console.log("geoSuccess", position, meters);
    // time: position.timestamp
    this.setState({currentPosition: {...position.coords }});
  };

  geoFailure = err => {
    this.setState({ error: err.message});
  };

	_renderItem2 = ({item, index}) => {
		const bg = index % 2 ? {backgroundColor: "gray"} : null;
		return (
			<ListItem
				containerStyle={{padding: 10}}
				title={item.name}
				subtitle={`Lat: ${item.latitude} - Long: ${item.longitude}`}
				leftAvatar={{ rounded: true, source: Res.get("PHP") }}
			/>
		)
	}

	_renderItem = ({item, index}) => {
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
						<Text style={styles.txtStatus}>{`Lat: ${item.latitude} - Long: ${item.longitude}`}</Text>
						<Text style={styles.txtStatus}>{`Distance: ${numeral(kilometer).format("0,000.00")} km • ${speed} min`}</Text>
					</View>
				</Card>
			</TouchableOpacity>
		);
	}


  findCoordinate(item) {
    this.map.fitToCoordinates([item], {
      edgePadding: CUSTOM_PADDING,
      animated: true,
    });
  }
	
	_onViewableItemsChanged = ({ viewableItems, changed }) => {
		const newMarkers = _.chain(viewableItems).map("item").value();
		
		this.map.fitToCoordinates(newMarkers, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
    console.log("Visible items are", viewableItems);
    console.log("Changed in this iteration", newMarkers);
	};

	renderBackButton() {
		return (
			<TouchableOpacity
				style={styles.back}
				onPress={() => this.props.navigation.goBack()}>
				<Text style={styles.backButton}>&larr;</Text>
			</TouchableOpacity>
		);
	}

	getDistanceInMeter = (item) => {
		const {currentPosition} = this.state;
		const coords = {latitude: item.latitude, longitude: item.longitude};
		// const speed = getSpeed(currentPosition,coords );
		// const kmh = convertSpeed(speed, "kmh");
		const distance = getDistance(coords, currentPosition, 0.1);
		const speed = convert(distance).from('m/s').possibilities("min");

		console.log("speed", speed);

		return {speed, distance};
	}

	getRoute = () => {
		const {currentPosition} = this.state;


	}

	render(){
		return (
			<SafeAreaView style={[styles.container, {backgroundColor: "black"}]}>
				<View style={[styles.container, {backgroundColor: Color.bg}]}>
					{this.renderBackButton()}
					<MapView
						ref={ref => this.map = ref}
						style={styles.mapStyle}
						mapPadding={CUSTOM_PADDING}
						showsUserLocation={true }
						userLocationAnnotationTitle={"Arjay"}
						// followsUserLocation={true}
						showsMyLocationButton={false}
						initialRegion={{
							latitude: 14.725643,
							longitude: 121.065455,
							latitudeDelta: 0.0922,
							longitudeDelta: 0.0421,
						}}>
						{MARKERS.map((marker, i) => (
							<Marker title={marker.name} key={i} identifier={`id${i}`} coordinate={marker} />
						))}

						<MapViewDirections
								origin={this.state.currentPosition}
								destination={{
									name: "Daranak Falls",
									latitude: "14.5431", 
									longitude: "121.3111"
								}}
								apikey={"AIzaSyBlwy0fBLUKAN6AD9hw9jwWTbJoKA942ts"}
								strokeWidth={3}
								strokeColor="hotpink"
							/>
					</MapView>
					<View style={styles.flatlistStyle}>
							
					<View pointerEvents="none" style={[styles.gradient, {height}]} >
							<LinearGradient
									style={StyleSheet.absoluteFill}
									start={{x: 0.5, y: 0.5}} end={{x: 0.5, y: 1.0}}
  								locations={[0,0.3,0.6]}
									colors={["transparent", "rgba(0, 0, 0, 0.3)", "white"]} />
							</View>

						<FlatList
							style={[styles.container, {zIndex: 2, paddingHorizontal: 30}]}
							data={MARKERS}
							extraData={this.state}
							keyExtractor={(item, idx) => `${idx}`}
							renderItem={this._renderItem}
							onViewableItemsChanged={this._onViewableItemsChanged}
							viewabilityConfig={{
								itemVisiblePercentThreshold: 50
							}} />
					</View>
					
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
  container: {flex: 1},
  mapStyle: {...StyleSheet.absoluteFill, height: height - 150},
	flatlistStyle: {...StyleSheet.absoluteFill, marginTop: (height / 2)},
	
	renderItemStyle: {flexShrink: 1, padding: 15, margin: 10, flexDirection: "row", borderRadius: 7, marginHorizontal: 30,
		justifyContent: "center", alignItems: "center", backgroundColor: Color.white},
	imageLogo: {width: 45, height: 45},
	view1: {flexDirection: "column", flex: 1, justifyContent: "center", marginLeft: 10},
	view2: {flexDirection: "column", flexShrink: 1, marginLeft: 10},
	txtRemark: {fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light"},
	txtStatus: {fontSize: 10, color: Color.Standard2, fontFamily: "Roboto-Light"},
	txtTrack: {fontSize: 10, color: Color.LightBlue, textAlign: "right", fontFamily: "Roboto-Light"},
	txtTime: {fontSize: 10, color: Color.Standard2, textAlign: "right", fontFamily: "Roboto-Light"},

	cover: {
    height: (height / 2) + 70,
	},
	gradient: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
	},
	back: {
		position: "absolute",
		top: 20,
		left: 12,
		zIndex: 5,
		backgroundColor: "rgba(255,255,255,0.4)",
		padding: 12,
		borderRadius: 20,
		width: 80,
		alignItems: "center",
		justifyContent: "center",
	},
	backButton: { fontWeight: "bold", fontSize: 30 },
});
