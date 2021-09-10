/* eslint-disable */
import React, {PureComponent} from "react";
import {View, Image} from "react-native";
import ViewPager from "__src/resources/customize/ViewPager";
import FastImage from "react-native-fast-image";
// import  Comp  from "__src/components";
import PropTypes from "prop-types";
import styles from "./styles.css";
import _ from "lodash";
import Resources from "__src/resources";
const {Res} = Resources;


export default class ImagePages extends PureComponent{
	constructor(props){
		super(props);
		const images = props.listing.images;

		this.state = {
			position: 0,
			loaded: false,
			blur: 0,
			viewableItems: [{id: 0, index: 0, item: images[0], isViewable: true}],
		};
		console.log("images", [{...images[0], isViewable: true}]);
	}

	_renderImages(item, index){
	
		return (
			<View key={index} style={{}}>
				<View elevation={5}  style={styles.ipWrapper}>
					<FastImage
						source={{uri: item.path }}
						style={styles.ipImage}
						resizeMethod="auto"
						onError={({nativeEvent: {error}}) => console.log(`error ${index}`, error)}
					/>
				</View>
			</View>
		);
	}
    
    _onLoad = () => {
    	this.setState(() => ({ loaded: true, blur: 50 }));
    }

    _getPosition() {
    	return this.state.position;
    }
    
    render(){
    	const {
    		listing, showAddToFav, handleAddToFav, favouriteListings,
    	} = this.props;
    	const position = this._getPosition();
			
    	// return 	(<Image
    	// 	source={imageObject}
    	// 	style={styles.image}
    	// 	onError={({nativeEvent: {error}}) => console.log("error", error)}
    	// 	resizeMode="cover" />);
        
    	return (
    		<View>
    			{showAddToFav ?
    				(
    					<View style={styles.addToFavoriteBtn}>
    						{/* <Comp.HeartButton
    							color="#ffffff"
    							size={17}
    							selectedColor="#fc4c54"
    							selected={favouriteListings.indexOf(listing.id) > -1}
    							count={listing.images.length}
    							onPress={() => handleAddToFav(listing)} /> */}
    					</View>
    				) :
    				null}
    			<ViewPager
    				initialPage={0}
						onPageScroll={(e) => {
							console.log("E",e);
							this.setState({position: e.position})
						}}
    				style={styles.viewpager} >
    				{listing.images.map(this._renderImages.bind(this))}
    				
    			</ViewPager>
					{/* <Pagination2
              dotsLength={listing.images.length}
							activeDotIndex={position}
							ontainerStyle={{ zIndex: 3 }}
              dotStyle={{
                  width: 10,
                  height: 10,
									borderRadius: 5,
									padding: 0,
									margin: 0,
									marginHorizontal: 0,
                  backgroundColor: 'red'
              }}
              inactiveDotStyle={{
								width: 8,
								height: 8,
								padding: 0,
								margin: 0,
								borderRadius: 4,
								backgroundColor: 'blue'
              }}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
            /> */}
					
    		
    			<View style={styles.buttons}>

					
					
    				{/* <Dots length={listing.images.length} active={position}
    					visible={5} size={15}/> */}
						{listing.images.map((image, index) => {
							// let opacity = index.interpolate({
							// 	inputRange: [index - 1, index, index + 1], // each dot will need to have an opacity of 1 when position is equal to their index (i)
							// 	outputRange: [0.3, 1, 0.3], // when position is not i, the opacity of the dot will animate to 0.3
							// 	// inputRange: [i - 0.50000000001, i - 0.5, i, i + 0.5, i + 0.50000000001], // only when position is ever so slightly more than +/- 0.5 of a dot's index
							// 	// outputRange: [0.3, 1, 1, 1, 0.3], // is when the opacity changes from 1 to 0.3
							// 	extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
							// });

							return index > 6 ? null :
								<View
  							key={`idx${index}`}
  							underlayColor="#ccc"
  							style={[
  								styles.button,
  								position === index && styles.buttonSelected,
  							]} />
						})}
						
    					
  						
						
						
    				{/* <Pagination
    					// DotThemeLight
    					horizontal
    					dotOnPress={(o) => console.log(" clicked: ", o)}
    					hideEmptyDots
    					pagingEnabled
    					startDotIconFamily="Ionicons"
    					startDotIconName="ios-arrow-back"
    					endDotIconFamily="Ionicons"
    					endDotIconName="ios-arrow-forward"
    					dotIconName="ios-close"
    					dotIconFamily="Ionicons"
    					dotIconNameNotActive="logo-twitter"
    					dotIconNameActive="logo-twitter"
    					dotEmptyHide
    					dotIconColorActive="white"
    					dotIconColorNotActive="rgba(255,255,255,0.5)"
    					// DotIconColorEmpty={"blue"}
    					dotIconSizeActive={25}
    					paginationVisibleItems={this.state.viewableItems}// Needs to track what the user sees
    					paginationItems={listing.images}// Pass the same list as data
    					paginationItemPadSize={10}
    				/> */}
  				</View>
    		</View>
    	);
    }
}

ImagePages.propTypes = {
	listing: PropTypes.object,
	showAddToFav: PropTypes.bool,
	handleAddToFav: PropTypes.func,
	favouriteListings: PropTypes.array,
};
