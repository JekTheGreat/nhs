/* eslint-disable */
import React, {Component} from "react";
import {View, Text, ScrollView, SafeAreaView,
	ImageBackground, Animated} from "react-native";
import Content from "__src/resources/data/contentData";
// import Slideshow from "../../../../resources/customize/Slideshow";
import SliderEntry from "./screens/SliderEntry";
import styles from "../../styles.css";
import styles2, { colors } from "./styles/index.style";
import FourSquare from "./screens/FourSquare";
import VerticalView from "./screens/VerticalView";
import AnimHeader from "./SearchHeader";
import Listings from "./Listings";
import Guidline from "./Guideline";
import Hotel from "./Hotels";
import LinearGradient from "react-native-linear-gradient";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Horizontal1 from "./screens/Horizontal1";
import ListData from "__src/resources/data/list";
import color from "../../../../resources/styles/color";
import { sliderWidth, itemWidth } from "./styles/SliderEntry.style";

const {listings, listings2, listings3, service} = ListData;
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const url = {
	uri: "https://images.unsplash.com/photo-1424819827928-55f0c8497861?fit=crop&w=600&h=600",
};


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

const images = [
	"http://photos.hotelbeds.com/giata/bigger/08/085249/085249a_hb_r_001.jpg",
	"https://images.unsplash.com/photo-1424819827928-55f0c8497861?fit=crop&w=600&h=600",
	"https://images.unsplash.com/photo-1424819827928-55f0c8497861?fit=crop&w=600&h=600",
];
const NAVBAR_HEIGHT = 43;
const STATUS_BAR_HEIGHT = 0;

export default class HomePage extends Component{
	static navigationOptions = {
		headerShow: false,
	}
	constructor(props){
		super(props);

		const scrollAnim = new Animated.Value(0);
		const offsetAnim = new Animated.Value(0);

		this.state = {
			slider1ActiveSlide: 0,
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
				NAVBAR_HEIGHT - STATUS_BAR_HEIGHT
			),
			favouriteListings: [],
		};
		this.handleAddToFav = this.handleAddToFav.bind(this);
		this.renderListings = this.renderListings.bind(this);
		this.onCreateListClose = this.onCreateListClose.bind(this);
	}

	_clampedScrollValue = 0;
	_offsetValue = 0;
	_scrollValue = 0;

	componentDidMount() {
		this.state.scrollAnim.addListener(({value}) => {
			const diff = value - this._scrollValue;

			this._scrollValue = value;
			this._clampedScrollValue = Math.min(Math.max(this._clampedScrollValue + diff, 0),
				NAVBAR_HEIGHT - STATUS_BAR_HEIGHT);
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
		this._clampedScrollValue > (NAVBAR_HEIGHT - STATUS_BAR_HEIGHT) / 2 ?
			this._offsetValue + NAVBAR_HEIGHT : this._offsetValue - NAVBAR_HEIGHT;

		Animated.timing(this.state.offsetAnim, {
			toValue,
			duration: 50,
			useNativeDriver: true,
		}).start();
	};

	handleAddToFav(listing) {
		const { navigate } = this.props.navigation;
		let { favouriteListings } = this.state;
	
		const index = favouriteListings.indexOf(listing.id);
		if (index > -1) {
		  favouriteListings = favouriteListings.filter((item) => item !== listing.id);
		  this.setState({ favouriteListings });
		} else {
		//   navigate('CreateList', { listing, onCreateListClose: this.onCreateListClose });
		}
	}
	
	onCreateListClose(listingId, listCreated) {
		let { favouriteListings } = this.state;
		if (listCreated) {
		  favouriteListings.push(listingId);
		} else {
		  favouriteListings = favouriteListings.filter((item) => item !== listingId);
		}
		this.setState({ favouriteListings });
	}

	renderListings() {
		return listings.map((listing, index) => (
		  <View key={`listing-${index}`}>
				<Listings
			  key={`listing-item-${index}`}
			  title={"TESTING"}
			  boldTitle={listing.boldTitle}
			  listings={listing.listings}
			  showAddToFav={listing.showAddToFav}
			  handleAddToFav={this.handleAddToFav}
			  favouriteListings={this.state.favouriteListings} />
		  </View>
		));
	}

	_renderItemWithParallax ({item, index}, parallaxProps) {
		return (
			<SliderEntry
				data={item}
				even={(index + 1) % 2 === 0}
				parallaxProps={parallaxProps}
			/>
		);
	}

	mainExample (number, title) {
		const { slider1ActiveSlide } = this.state;

		return (
			<View style={styles2.exampleContainer}>
				<View style={{paddingHorizontal: 20}}>
					<Text style={{fontFamily: "Roboto", fontSize: 18, color: "black", fontWeight: "bold"}}>Homes for your kind of trip</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 15}}>Find a top rated home with amenities</Text>
				</View>
				
				<Carousel
					ref={(c) => this._slider1Ref = c}
					data={ENTRIES1}
					renderItem={this._renderItemWithParallax}
					sliderWidth={sliderWidth}
					itemWidth={itemWidth}
					hasParallaxImages
					firstItem={0}
					inactiveSlideScale={0.94}
					inactiveSlideOpacity={0.7}
					// inactiveSlideShift={20}
					containerCustomStyle={styles2.slider}
					contentContainerCustomStyle={styles2.sliderContentContainer}
					// loop
					loopClonesPerSide={2}
					// autoplay
					// autoplayDelay={500}
					// autoplayInterval={3000}
					onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
				/>
			</View>
		);
	}

	Explore() {
		return (
			<View style={styles2.exampleContainer}>
				<View style={{paddingHorizontal: 20}}>
					<Text style={{fontFamily: "Roboto", fontSize: 18, color: "black", fontWeight: "bold"}}>Explore New York City</Text>
					<Text style={{fontFamily: "Roboto-Light", fontSize: 15}}>Book experiences with locals to see a new side of NYC</Text>
				</View>
				
				<Carousel
					ref={(c) => this._slider1Ref = c}
					data={ENTRIES1}
					renderItem={this._renderItemWithParallax}
					sliderWidth={sliderWidth}
					itemWidth={itemWidth}
					hasParallaxImages
					firstItem={0}
					inactiveSlideScale={0.94}
					inactiveSlideOpacity={0.7}
					// inactiveSlideShift={20}
					containerCustomStyle={styles2.slider}
					contentContainerCustomStyle={styles2.sliderContentContainer}
					// loop
					loopClonesPerSide={2}
					// autoplay
					// autoplayDelay={500}
					// autoplayInterval={3000}
					onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
				/>
			</View>
		);
	}

	render(){
		const {clampedScroll} = this.state;
		const example1 = this.mainExample(1, "Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots");

		return (
			<View style={styles.container}>
				<View style={styles.body}>
				
					<AnimatedScrollView
  						contentContainerStyle={{paddingTop: 115}}
						scrollEventThrottle={1}
						onMomentumScrollBegin={this._onMomentumScrollBegin}
						onMomentumScrollEnd={this._onMomentumScrollEnd}
						onScrollEndDrag={this._onScrollEndDrag}
						onScroll={
							Animated.event([{nativeEvent: {
								contentOffset: {y: this.state.scrollAnim}}}],
							{useNativeDriver: true})}>
						{/* {this.renderListings()} */}
						<ImageBackground
							source={url}
							style={styles.image}>
							<Text style={styles.txtImageTitle}>
						Find hotels on GPRS HOTEL BOOKING
							</Text>
							<Text style={styles.txtImageSubTitle}>
						Lorem ipsum dotoreit ad duo fugtanque
						fabulas lucitas pri veniam delectus eivis.
							</Text>
						</ImageBackground>
						<View style={styles.viewReviewContainer}>
							<View style={{paddingHorizontal: 20}}>
								<FourSquare />
							</View>
							<View style={{paddingHorizontal: 20}}>
								<VerticalView />
							</View>	
							{example1}
							{this.Explore()}

							{/* <View style={{ backgroundColor: color.transparent, paddingLeft: 20}}>
								<Horizontal1 padding={40}/>
							</View>

							<View style={{ backgroundColor: color.transparent}}>
								<Horizontal1 paddingLeft={20} padding={40}/>
							</View> */}
						

							<View style={styles.viewMargin}>
							
								<Text style={styles.txtReviewTitle}>WHAT OUR CLIENTS SAY</Text>
								{/* <Slideshow
									height={200}
									images={images}
									overlay
									scrollEnabled
									dataSource={[
										{
											title: "Title 1",
											caption: "Content.txt",
											url: "http://photos.hotelbeds.com/giata/bigger/08/085249/085249a_hb_r_001.jpg",
										}, {
											title: "Title 2",
											caption: "Content.txt",
											url: "https://images.unsplash.com/photo-1424819827928-55f0c8497861?fit=crop&w=600&h=600",
										}, {
											title: "Title 3",
											caption: "Content.txt",
											url: "https://www.nfm.com/GetPhoto.ashx?ProductID=47354824&Size=M&ImageID=1747358",
										},
									]}/> */}
							</View>
							{/* <Guidline /> */}
						
						</View>
					</AnimatedScrollView>
					<AnimHeader animationRange={clampedScroll} state={this.state.search}/>
				</View>
			</View>
		);
	}
}
