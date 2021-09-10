/* eslint-disable */
import React, {PureComponent} from "react";
import {View, FlatList, Dimensions, Image} from "react-native";
import Resources from "__src/resources";
const {Res, Color} = Resources;
const SCREEN_WIDTH = Dimensions.get("window").width;

const data = [
	{
		icon: Res.get("home_image_1"),
	},
	{
		icon: Res.get("home_image_2"),
	},
	{
		icon: Res.get("home_image_3"),
	},
];
const wp = (percentage) => {
	const value = (percentage * SCREEN_WIDTH) / 100;
  
	return Math.round(value);
};
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);
const itemWidth = slideWidth + (itemHorizontalMargin * 2);


class Horizontal1 extends PureComponent{
  state = {
    
  }
  scrollToRight = () => {
  	const { increaseIndex, weather: { currentIndex } } = this.props;
  	increaseIndex(moveValue);
  	this.flatListRef.scrollToIndex({ animated: true, index: currentIndex + moveValue });
  };

  scrollToLeft = () => {
  	const { decreaseIndex, weather: { currentIndex } } = this.props;
  	decreaseIndex(moveValue);
  	const scrollIndex = (currentIndex - moveValue > 0) ? currentIndex - moveValue : 0;
  	this.flatListRef.scrollToIndex({ animated: true, index: scrollIndex });
  };

  handleScroll = (event) => {
  	// const { setIndex } = this.props;
  	const viewSize = event.nativeEvent.contentOffset.x;
    
  	const scrollIndex = Math.ceil(event.nativeEvent.contentOffset.x / SCREEN_WIDTH );
  	console.log("scrollIndex", scrollIndex);
  	console.log("SCREEN_WIDTH", SCREEN_WIDTH);
  	console.log("viewSize", viewSize);
  	// setIndex(scrollIndex);
  };
  
  renderItem = ({item, index}) => {
  	const {padding} = this.props;
    
  	return (
  		<View key={`idx${index}`} style={{minHeight: 200, flexDirection: "column", width: itemWidth, paddingHorizontal: itemHorizontalMargin  }}>
  			<Image source={item.icon} style={{height: 150, width: null, borderRadius: 3}} resizeMode="cover"/>
  			<View>
          
  			</View>
  		</View>
  	);

  }

  render(){
  	return (
  		<FlatList
  			ref={(ref) => {
  				this.flatListRef = ref;
  			}}
  			style={{backgroundColor: "white", zIndex: 4, paddingLeft: this.props.paddingLeft }}
  			data={data}
  			horizontal
  			onMomentumScrollEnd={this.handleScroll}
  			pagingEnabled
  			renderItem={this.renderItem}
  			keyExtractor={(item, idx) => `idx${idx}`}
  			ItemSeparatorComponent={() => <View style={{height: 10}}/>}
  			scrollsToTop={false}
  			scrollEventThrottle={100}
  			removeClippedSubviews={false}
  			automaticallyAdjustContentInsets={false}
  			directionalLockEnabled
  			showsHorizontalScrollIndicator={false}
  			showsVerticalScrollIndicator={false}
  		/>
  	);
  }
}

export default Horizontal1;
