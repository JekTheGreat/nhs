/* eslint-disable */
import React, {Component} from "react";
import {View, StyleSheet, ScrollView, Animated, Image} from "react-native";
import {getStatusBarHeight} from "__src/resources/customize/StatusBarHeight";
import FrontProfile from "./FrontProfile";
import Amenities from "./Amenities";
import MapLocation from "./MapLocation";
// import ButtonAvail from "./ButtonAvail";
// import Reviews from "./Reviews";
import Resource from "__src/resources";
import Listings from "../homepage/Listings";
import ViewPager from "__src/resources/customize/ViewPager";
import SelectedHotel from "__src/resources/data/selectedHotel.json";
import FastImage from "react-native-fast-image";
import ListData from "__src/resources/data/list";
const {listings, listings2, listings3, service} = ListData;
const {Color} = Resource;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const NAVBAR_HEIGHT = 50;


const url = {
	uri: "https://images.unsplash.com/photo-1424819827928-55f0c8497861?fit=crop&w=600&h=600",
};

export default class SelectedHotelView extends Component{
	constructor(props){
		super(props);
		const scrollAnim = new Animated.Value(0);
		const offsetAnim = new Animated.Value(0);

		this.state = {
			position: 0,
			search: "",
			scrollAnim,
			offsetAnim,
			clampedScroll: Animated.diffClamp(
				Animated.add(
					scrollAnim.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1],
						extrapolateLeft: "clamp",
					}),
					offsetAnim
				),
				0,
				NAVBAR_HEIGHT
			),
			favouriteListings: [],
		};
		this.handleAddToFav = this.handleAddToFav.bind(this);
        
	}

	_clampedScrollValue = 0;
	_offsetValue = 0;
	_scrollValue = 0;

	componentDidMount() {
		this.state.scrollAnim.addListener(({value}) => {
			const diff = value - this._scrollValue;

			this._scrollValue = value;
			this._clampedScrollValue = Math.min(Math.max(this._clampedScrollValue + diff, 0),
				NAVBAR_HEIGHT);
		});
		this.state.offsetAnim.addListener(({value}) => {
			this._offsetValue = value;
		});
	}

	componentWillUnmount() {
		this.state.scrollAnim.removeAllListeners();
		this.state.offsetAnim.removeAllListeners();
	}
	
	_onScrollEndDrag = () => {
		this._scrollEndTimer = setTimeout(this._onMomentumScrollEnd, 250);
	};
	
	_onMomentumScrollBegin = () => {
		clearTimeout(this._scrollEndTimer);
	};
	
	_onMomentumScrollEnd = () => {
		const toValue = this._scrollValue > NAVBAR_HEIGHT &&
		this._clampedScrollValue > (NAVBAR_HEIGHT) / 2 ?
			this._offsetValue + NAVBAR_HEIGHT : this._offsetValue - NAVBAR_HEIGHT;

		Animated.timing(this.state.offsetAnim, {
			toValue,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};
    
	handleAddToFav(listing) {
		let { favouriteListings } = this.state;
	
		const index = favouriteListings.indexOf(listing.id);

		if (index > -1) {
		  favouriteListings = favouriteListings.filter((item) => item !== listing.id);
		  this.setState({ favouriteListings });
		} else {
		//   navigate('CreateList', { listing, onCreateListClose: this.onCreateListClose });
		}
	  }

	renderListings() {
		return listings.map((listing, index) => (
		  <View key={`listing-${index}`}>
				<Listings
					key={`listing-item-${index}`}
					title={listing.title}
					boldTitle={listing.boldTitle}
					listings={listing.listings}
					showAddToFav={listing.showAddToFav}
					handleAddToFav={this.handleAddToFav}
					favouriteListings={this.state.favouriteListings} />
		  </View>
		));
	}

	_renderImages(item, index){
	
		return (
			<View key={`idx${index}`} style={styles.ipWrapper}>
				<FastImage
					source={{uri: item.path }}
					style={styles.image}
					resizeMethod="auto"
					onError={({nativeEvent: {error}}) => console.log(`error ${index}`, error)}
				/>
			</View>
		);
	}

	_getPosition() {
		return this.state.position;
	}

	render(){
		const {clampedScroll} = this.state;
		const position = this._getPosition();

		return (
			<View style={styles.contianer}>
				<View style={styles.body}>
					<AnimatedScrollView
						showsVerticalScrollIndicator={false}
						scrollEventThrottle={1}
						onMomentumScrollBegin={this._onMomentumScrollBegin}
						onMomentumScrollEnd={this._onMomentumScrollEnd}
						onScrollEndDrag={this._onScrollEndDrag}
						onScroll={
							Animated.event([{nativeEvent: {
								contentOffset: {y: this.state.scrollAnim}}}],
							{useNativeDriver: true})}>

						<View style={styles.viewpager}>
							<ViewPager
								initialPage={0}
								onPageScroll={(e) => this.setState({position: e.position })}
								style={styles.viewpager} >
								{SelectedHotel.images.map(this._renderImages.bind(this))}
    				
    					</ViewPager>
							<View style={styles.buttons}>
								{SelectedHotel.images.map((image, index) => (
									<View
										key={`idx${index}`}
										underlayColor="#ccc"
										style={[
											styles.button,
											position === index && styles.buttonSelected,
										]} />
								))}
							</View>
						</View>
						
						{/* <Image
							style={styles.image}
							source={url} /> */}
						<FrontProfile />
						<Amenities />
						<MapLocation />
						{/* <Reviews /> */}
						{this.renderListings()}
					</AnimatedScrollView>
					{/* <ButtonAvail animationRange={clampedScroll} /> */}
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	contianer: {
		flexShrink: 1, width: "100%",
		height: "100%", backgroundColor: Color.bg,
	},
	body: {
		flex: 1, marginTop: getStatusBarHeight(true),
		backgroundColor: Color.white,
	},
	image: {
		height: 200, width: "100%",
		alignItems: "center", justifyContent: "center",
	},
	ipImage: {height: 200, width: "100%" },
	ipWrapper: {flexDirection: "column", flex: 1},
	viewpager: {flex: 1, backgroundColor: "#f2f2f2"},
	buttons: {
		height: 15,
		marginTop: -25,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "wrap",
		flexDirection: "row",
		zIndex: 4,
	},
	button: {
		margin: 3,
		width: 8,
		height: 8,
		borderRadius: 8 / 2,
		backgroundColor: "#ccc",
		opacity: 0.9,
	},
	buttonSelected: {
		opacity: 1,
		backgroundColor: "#fff",
		width: 10,
		height: 10,
		borderRadius: 10 / 2,
	},
});
