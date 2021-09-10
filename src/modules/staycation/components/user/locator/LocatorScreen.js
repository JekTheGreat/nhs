/* eslint-disable */
import React from "react";
import {View, SafeAreaView, PermissionsAndroid, Animated, Easing, Platform,
	Text, Dimensions, TouchableOpacity} from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE} from "react-native-maps";
import _ from "lodash";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Resources from "__src/resources";
import SliderEntry from "./SliderEntry";
import datas from "../../../data.json";
import styles from "./styles.css";
const {Color} = Resources;
const { height } = Dimensions.get('window');
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

const LATITUDE = 14.580541;
const LONGITUDE = 120.993566;
const SPACE = 0.001;
const geoOptions = { enableHighAccuracy: true, timeout: 15000 };
const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);

function wp (percentage) {
	const value = (percentage * viewportWidth) / 85;
	
	return Math.round(value);
}

const slideHeight = viewportHeight * 0.30;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

function createMarker(modifier = 1) {
  return {
		name: `Dealer Store ${modifier}`,
    latitude: LATITUDE - SPACE * modifier,
    longitude: LONGITUDE - SPACE * modifier,
  };
}
const CUSTOM_PADDING = { top: 100, right: 100, bottom: 100, left: 100 };
const MARKERS = [
	{
		name: "Daranak Falls",
		latitude: 14.580541, 
		longitude: 120.993566
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

const ENTRIES1 = [
	{
		title: "Favourites landscapes 1",
		subtitle: "Lorem ipsum dolor sit amet",
		illustration: "https://i.imgur.com/SsJmZ9jl.jpg",
	},
	{
		title: "Favourites landscapes 2",
		subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
		illustration: "https://i.imgur.com/5tj6S7Ol.jpg",
	},
	{
		title: "Favourites landscapes 3",
		subtitle: "Lorem ipsum dolor sit amet et nuncat",
		illustration: "https://i.imgur.com/pmSqIFZl.jpg",
	},
	{
		title: "Favourites landscapes 4",
		subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
		illustration: "https://i.imgur.com/cA8zoGel.jpg",
	},
	{
		title: "Favourites landscapes 5",
		subtitle: "Lorem ipsum dolor sit amet",
		illustration: "https://i.imgur.com/pewusMzl.jpg",
	},
	{
		title: "Favourites landscapes 6",
		subtitle: "Lorem ipsum dolor sit amet et nuncat",
		illustration: "https://i.imgur.com/l49aYS3l.jpg",
	},
];

const LIST_HEIGHT = height / 2;

export default class StoreScreen extends React.PureComponent{
	constructor(props){
		super(props);
		this.mapRef = React.createRef();

		this.state = {
			currentPosition: {},
			animate: new Animated.Value(LIST_HEIGHT),
			animateXY: new Animated.ValueXY({x: 20, y: 0}),
			radius: new Animated.Value(0),
			listAnimate: null,
			slider1ActiveSlide: 0
		}
		this.animation = new Animated.Value(0);

		this.animateInterpolate = this.state.animateXY.y.interpolate({
			inputRange: [0, LIST_HEIGHT],
			outputRange: [1, .2]
		})
	}
	
	static navigationOptions = {
		headerShow: false,
	}

	permission = async () => {
		const {navigation} = this.props;

		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
			if (granted === PermissionsAndroid.RESULTS.GRANTED) {
				console.log('You can use the location');
			} else {
				navigation.goBack();
			}
	}

	componentDidMount(){
		if(Platform.OS === "android"){
			this.permission();
		}

		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition(this.geoSuccess, 
				this.geoFailure, geoOptions);
			navigator.geolocation.watchPosition(this.geoSuccess, 
				this.geoFailure, geoOptions);
		}
	}

	// componentDidUpdate(prevProps){
	// 	const {locator: {setCoordinate}} = this.props;

	// 	if(prevProps.locator.setCoordinate !== setCoordinate && _.isEmpty(setCoordinate)){
	// 		this.mapRef.fitToCoordinates([setCoordinate[0], setCoordinate[setCoordinate.length - 1]], {
	// 			edgePadding: CUSTOM_PADDING,
	// 			animated: true,
	// 		});
	// 	}
	// }

	geoSuccess = position => {
		console.log("geoSuccess", position);
		const currentPos = {
			name: `My Location`,
			latitude: 36.78935,
			longitude: -121.4354,
		}

    this.setState({currentPosition: {...currentPos, latitudeDelta: 0.01, longitudeDelta: 0.01 }});
  };

  geoFailure = err => {
		console.log("geoFailure", err);
    this.setState({ error: err.message});
  };

	renderBackButton() {
		return (
			<TouchableOpacity
				style={styles.back}
				onPress={() => this.toggleVideo()}>
				<Text style={styles.backButton}>&larr;</Text>
			</TouchableOpacity>
		);
	}

	toggleVideo2 = () => {
    Animated.sequence([
			Animated.timing(this.state.animateXY,{
				toValue: {x: 0, y: LIST_HEIGHT},
				duration: 6000,
			}),
			Animated.timing(this.state.animate,{
				toValue: 10,
				duration: 6000,
			}),
			Animated.timing(this.state.radius,{
				toValue: 40,
				duration: 6000,
			}),

		]).start()
	};
	
	toggleVideo1 = () => {
    Animated.sequence([
			Animated.timing(this.state.animate,{
				toValue: 10,
				duration: 6000,
			}),
			Animated.timing(this.state.radius,{
				toValue: 40,
				duration: 6000,
			}),

		]).start()
  };

	renderBackRight() {
		const translateY = this.animation.interpolate({
      inputRange: [0, 0],
      outputRange: [0, 100],
		});
		
		return (
			<AnimatedTouch
				style={[styles.right, { 
					top: this.state.animateXY.x,
					right: this.state.animateXY.y,
					opacity: this.animateInterpolate
				}]}
				onPress={() => this.props.navigation.goBack()}>
				<Text style={styles.backButton}>&rarr;</Text>
			</AnimatedTouch>
		);
	}

	toggleVideo = () => {
		const {listAnimate} = this.state;
		let newList = listAnimate;
		if(newList === "fadeOutDown"){
			newList = "fadeInUp";
		}else{
			newList = "fadeOutDown";
		}

		this.setState({listAnimate: newList || "fadeOutDown"})
  };

	handleCoordRef = ref => this.list_coord = ref;

	_renderItemWithParallax ({item, index}, parallaxProps) {
		return (
			<SliderEntry
				data={item}
				even={(index + 1) % 2 === 0}
				parallaxProps={parallaxProps}
			/>
		);
	}

	render(){
		const {currentPosition} = this.state;
		const translateY = this.animation.interpolate({
      inputRange: [0, 150],
      outputRange: [-LIST_HEIGHT, LIST_HEIGHT],
		});

		return (
			<SafeAreaView style={[styles.flex1, {backgroundColor: "black"}]}>
				<View style={[styles.flex1, {backgroundColor: Color.bg}]}>
					<MapView
						ref={e => this.mapRef = e}
            style={styles.mapStyle}
            liteMode
            mapType="mutedStandard"
            showsUserLocation={true }
            showsCompass={false}
            userLocationAnnotationTitle="Hi"
						userLocationAnnotationTitle={"Arjay"}
            followsUserLocation
            maxZoomLevel={19}
            zoomEnabled={false}
            zoomTapEnabled={false}
            zoomControlEnabled={false}
						showsMyLocationButton={false}
						initialRegion={_.isEmpty(currentPosition) ? null : currentPosition}	>
					{datas.map((marker, i) => {
						const color = this.state.slider1ActiveSlide === i ? Color.colorPrimary : Color.text4;

						return (
							<Marker title={marker.name} key={i} identifier={`id${i}`} coordinate={marker} pinColor="red" tracksInfoWindowChanges >
								<View style={{width: 20, height: 20, borderRadius: 10, backgroundColor: "white", borderWidth: 4, borderColor: color}}/>
							</Marker>
						)
					})}
					</MapView>

				<View style={{position: "absolute", bottom: 10}}>

				<Carousel
						ref={(c) => this._slider1Ref = c}
						data={datas}
						renderItem={this._renderItemWithParallax}
						sliderWidth={sliderWidth}
						itemWidth={itemWidth}
						hasParallaxImages
						firstItem={0}
						inactiveSlideScale={0.94}
						inactiveSlideOpacity={0.7}
						// inactiveSlideShift={20}
						containerCustomStyle={styles.slider}
						contentContainerCustomStyle={styles.sliderContentContainer}
						// loop
						// loopClonesPerSide={1}
						// autoplay
						// autoplayDelay={500}
						// autoplayInterval={3000}
						onSnapToItem={(index) => {this.setState({ slider1ActiveSlide: index }) 
						console.log("currentIndex", index)} }
					/>

</View>
					
					
				</View>
			</SafeAreaView>
		);
	}
}

