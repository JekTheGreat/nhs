/* eslint-disable */
import React from "react";
import {
	View, SafeAreaView, PermissionsAndroid, Animated, Easing, Platform,
	Text, Dimensions, TouchableOpacity
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import _ from "lodash";
import Resources from "__src/resources";
import styles from "../styles.css";
import * as Animatable from 'react-native-animatable';
import CoordinateList from './screen/CoordinateList';
const { Color } = Resources;
const { height } = Dimensions.get('window');

const LATITUDE = 14.725643;
const LONGITUDE = 121.065455;
const SPACE = 0.01;
const geoOptions = { enableHighAccuracy: true, timeout: 15000 };
const AnimatedTouch = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedCoordinateList = Animatable.createAnimatableComponent(CoordinateList);

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
		latitude: 14.5431,
		longitude: 121.3111
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

const LIST_HEIGHT = height / 2;

export default class StoreScreen extends React.PureComponent {
	constructor(props) {
		super(props);
		this.mapRef = React.createRef();

		this.state = {
			currentPosition: {},
			animate: new Animated.Value(LIST_HEIGHT),
			animateXY: new Animated.ValueXY({ x: 20, y: 0 }),
			radius: new Animated.Value(0),
			listAnimate: null
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
		const { navigation } = this.props;

		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			console.log('You can use the location');
		} else {
			navigation.goBack();
		}
	}

	componentDidMount() {
		if (Platform.OS === "android") {
			this.permission();
		}

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.geoSuccess,
				this.geoFailure, geoOptions);
			navigator.geolocation.watchPosition(this.geoSuccess,
				this.geoFailure, geoOptions);
		}
	}

	componentDidUpdate(prevProps) {
		const { locator: { setCoordinate } } = this.props;

		if (prevProps.locator.setCoordinate !== setCoordinate && _.isEmpty(setCoordinate)) {
			this.mapRef.fitToCoordinates([setCoordinate[0], setCoordinate[setCoordinate.length - 1]], {
				edgePadding: CUSTOM_PADDING,
				animated: true,
			});
		}
	}

	geoSuccess = position => {
		console.log("geoSuccess", position);
		const currentPos = {
			name: `My Location`,
			latitude: 36.78935,
			longitude: -121.4354,
		}

		this.setState({ currentPosition: { ...currentPos, latitudeDelta: 0.01, longitudeDelta: 0.01 } });
	};

	geoFailure = err => {
		console.log("geoFailure", err);
		this.setState({ error: err.message });
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
			Animated.timing(this.state.animateXY, {
				toValue: { x: 0, y: LIST_HEIGHT },
				duration: 6000,
			}),
			Animated.timing(this.state.animate, {
				toValue: 10,
				duration: 6000,
			}),
			Animated.timing(this.state.radius, {
				toValue: 40,
				duration: 6000,
			}),

		]).start()
	};

	toggleVideo1 = () => {
		Animated.sequence([
			Animated.timing(this.state.animate, {
				toValue: 10,
				duration: 6000,
			}),
			Animated.timing(this.state.radius, {
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
		const { listAnimate } = this.state;
		let newList = listAnimate;
		if (newList === "fadeOutDown") {
			newList = "fadeInUp";
		} else {
			newList = "fadeOutDown";
		}

		this.setState({ listAnimate: newList || "fadeOutDown" })
	};

	handleCoordRef = ref => this.list_coord = ref;

	render() {
		const { currentPosition } = this.state;
		const { locator: { setCoordinate, setEnableFollowUser } } = this.props;
		const translateY = this.animation.interpolate({
			inputRange: [0, 150],
			outputRange: [-LIST_HEIGHT, LIST_HEIGHT],
		});

		return (
			<SafeAreaView style={[styles.flex1, { backgroundColor: "black" }]}>
				<View style={[styles.flex1, { backgroundColor: Color.bg }]}>
					{this.renderBackButton()}
					{this.renderBackRight()}
					<MapView
						ref={e => this.mapRef = e}
						style={styles.mapStyle}
						// provider={PROVIDER_GOOGLE}
						showsUserLocation={true}
						userLocationAnnotationTitle={"Jerick"}
						followsUserLocation={false}
						showsMyLocationButton={false}
						showsIndoorLevelPicker={true}
						initialRegion={_.isEmpty(currentPosition) ? null : currentPosition}	>
						{MARKERS.map((marker, i) => (
							<Marker title={marker.name} key={i} identifier={`id${i}`} coordinate={marker} />
						))}
						{_.isEmpty(setCoordinate) ? null :
							<MapView.Polyline
								coordinates={setCoordinate}
								strokeWidth={15}
								strokeColor="hotpink" />}
						{/* <MapViewDirections
								origin={{
									latitude: 38.78825,
									longitude: -124.4324,
								}}
								destination={{
									latitude: 14.5431, 
									longitude: 121.3111
								}}
								apikey={"AIzaSyBlwy0fBLUKAN6AD9hw9jwWTbJoKA942ts"}
								strokeWidth={3}
								strokeColor="hotpink"
							/> */}

					</MapView>
					<AnimatedCoordinateList
						animation={this.state.listAnimate}
						duration={500}
						style={{
							// transform: [{ translateY }] 
							// height: this.state.animate
							// top: this.state.animateXY.x,
							// right: this.state.animateXY.y,
							// opacity: this.animateInterpolate
						}}
						MarkerList={MARKERS}
						mapRef={this.mapRef}
						{...this.props}
						currentPosition={currentPosition} />
				</View>
			</SafeAreaView>
		);
	}
}

