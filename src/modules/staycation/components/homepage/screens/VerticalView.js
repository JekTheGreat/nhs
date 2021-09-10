/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Text, Dimensions, TouchableWithoutFeedback, Animated, StyleSheet, Image} from "react-native";
import VerticalViewItem from "./VerticalViewItem";
import  Resources from "__src/resources";
const {Res, Color} = Resources;
const SCREEN_WIDTH = Dimensions.get("window").width;
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
];

class VerticalView extends PureComponent{
  renderItem = (item, idx) => {
  	const leftRight = idx % 2 === 0 ? {marginRight: 5} : {marginLeft: 5};
    
  	return (
  		<VerticalViewItem key={`idx${idx}`} leftRight={leftRight} item={item}/>
  	);
  }

  render(){
  	return (
  		<View style={{flex: 1}}>
  			<Text style={styles.txtReviewTitle}>History tours worldwide</Text>
  			<View style={{flexDirection: "column"}}>
  			{ENTRIES1.map(this.renderItem)}
  		  </View>
  		</View>
  	);
  }
}

const styles = StyleSheet.create({
	txtReviewTitle: {
		marginVertical: 10, fontSize: 20,
		fontWeight: "bold", fontFamily: "Roboto-Light", color: "black",
	},
});

export default VerticalView;
