import React from "react";
import {View, FlatList, Text, Image, Dimensions, StyleSheet} from "react-native";
import {Icon} from "react-native-elements";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_WIDTH = (SCREEN_WIDTH - 20) / 3 ;
const datas = [
	{
		name: "Air asia",
		price: "1567",
		time1: "03:55 PM",
		time2: "05:35 PM",
		category: "Non Stop",
		duration: "1h 50m",
	}, {
		name: "Cebupac",
		price: "2555",
		time1: "03:55 PM",
		time2: "05:35 PM",
		category: "Non Stop",
		duration: "1h 50m",
	}, {
		name: "Pal",
		price: "3325",
		time1: "03:55 PM",
		time2: "05:35 PM",
		category: "Non Stop",
		duration: "1h 50m",
	}, {
		name: "Pal",
		price: "3325",
		time1: "03:55 PM",
		time2: "05:35 PM",
		category: "Non Stop",
		duration: "1h 50m",
	},
];
class FlightsHorizontal extends React.PureComponent{
  renderItem = ({item, index}) => {
  	return (
  		<View key={`${index}`} style={{backgroundColor: Color.white, borderWidth: 1, height: 70, width: ITEM_WIDTH, borderColor: Color.AFAAAA, marginTop: 20, borderRadius: 3}}>
  			<View style={{height: "50%", flexDirection: "row", alignItems: "center", justifyContent: "center", borderBottomWidth: 1, borderBottomColor: Color.AFAAAA, marginHorizontal: 10}}>
  				<Text style={{fontFamily: "Roboto-Medium", fontSize: 10, color: Color.LightBlue5}}>6 October, Sunday</Text>
  			</View>
  			<View style={{height: "50%", flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
  				<Text style={{fontFamily: "Roboto-Medium", fontSize: 15, color: Color.Header}}>{item.price}.00</Text>
  				<Text style={{fontFamily: "Roboto", fontSize: 10, color: Color.Header, marginLeft: 5}}>PHP</Text>

  			</View>
  		</View>
  	);
  }
  render(){
  	return (

  		<Carousel
  			ref={(c) => this._slider1Ref = c}
  			data={datas}
  			renderItem={this.renderItem}
  			sliderWidth={SCREEN_WIDTH}
  			itemWidth={ITEM_WIDTH}
  			hasParallaxImages
  			firstItem={0}
  			inactiveSlideScale={0.97}
  			inactiveSlideOpacity={0.8}
  			// inactiveSlideShift={20}
  			containerCustomStyle={styles.slider}
  			contentContainerCustomStyle={styles.sliderContentContainer}
  			// loop
  			loopClonesPerSide={2}
  			// autoplay
  			// autoplayDelay={500}
  			// autoplayInterval={3000}
  			onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
  		/>
  		// <FlatList
  		// 	data={datas}
  		// 	horizontal
  		// 	keyExtractor={(item, idx) => `${idx}`}
  		// 	renderItem={this.renderItem}/>
  	);
  }
}

const styles = StyleSheet.create({
	slider: {
		marginTop: 0,
		overflow: "visible",
	},
	sliderContentContainer: {
		paddingVertical: 0,
	},
});

export default FlightsHorizontal;
