import React, {useEffect, useState} from "react";
import {View, Image, Text, TouchableWithoutFeedback} from "react-native";
import { useNavigation } from "react-navigation-hooks";
import { SharedElement } from "react-navigation-shared-element";
import Resources from "__src/resources";
const {Color, Res} = Resources;

const SearchItem = (props) => {
	const {listing} = props;
	const [opacity, setOpacity] = useState(1);
	const { navigate, isFocused } = useNavigation();
	const hasFocus = isFocused();

	console.log(hasFocus);
	useEffect(() => {
		if (hasFocus) {
			setOpacity(1);
		}
	}, [hasFocus]);
  
	return (
		<TouchableWithoutFeedback onPress={() => {
			setOpacity(0);
			navigate("ProfileScreen", {listing});
		}}>
			<SharedElement id={`idx ${listing.id}`}>
				<View style={{height: 200,  marginTop: 15, borderRadius: 6}}>
					<Image style={{flex: 1, width: null, height: null, borderRadius: 6}} source={{uri: listing.images[0].url}} resizeMode="stretch"/>
					<View style={[{position: "absolute", bottom: 14, left: 10}, {opacity}]}>
						<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.white}}>Entire Place</Text>
						<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 20, color: Color.white}}>Seashell House - Casa Carol</Text>
						<Text style={{fontFamily: "Roboto", fontSize: 16, color: Color.colorPrimaryLight2}}>P1,075.00
							<Text style={{fontFamily: "Roboto-Light", fontSize: 16, color: Color.white}}> / per night</Text>
						</Text>
					</View>
				</View>
			</SharedElement>
		</TouchableWithoutFeedback>
	);
};

export default SearchItem;
