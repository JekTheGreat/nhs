import React, { useRef, useState } from "react";
import {View, ImageBackground, Image, Text, Dimensions, StyleSheet} from "react-native";
import profile from "../../../profile.json";
import Aminities from "./profile/Aminities";
import Animated from "react-native-reanimated";
import { useValues} from "__redash";
import Header from "../screens/Header";
import Resource from "__src/resources";
const {Color, Res} = Resource;
const IMAGE_HEIGHT = 200;
const homes = profile.homes;
const SCREEN_WIDTH = Dimensions.get("window").width;
	
const ProfileScreen = () => {
  	const Guest = homes.numberOfGuests > 0 && `${homes.numberOfGuests} Guest`;
  	const Bedroom = homes.numberOfBeds > 0 && `, ${homes.numberOfBeds} Bedroom`;
  	const Bathroom = homes.numberOfBathroom > 0 && `, ${homes.numberOfBathroom} Bathroom`;
  	const accom = `${Guest}${Bedroom}${Bathroom}`;
    
  	const scrollView = useRef(null);
  	const [y] = useValues([0], []);

  	return (
  		<View style={{flex: 1}}>
  			<Header {...{ y, scrollView }} data={homes}/>
  			<Animated.ScrollView  style={StyleSheet.absoluteFill}
  				scrollEventThrottle={1}
  				showsVerticalScrollIndicator={false}
  				onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.nScroll}}}],
  					{useNativeDriver: true})}>
        
  				<View style={{flex: 1, paddingHorizontal: 20, paddingTop: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: "white"}}>
  					<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 14, color: Color.colorPrimaryLight2}} onPress={() => this.props.navigation.goBack()}>{homes.homeType.name}</Text>
  					<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 25, color: Color.text2, marginTop: 7}}>{homes.name}</Text>
					<View style={{height: 200}}/>
  					<View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 7}}>
  						<Image style={{width: 18, height: 18}} source={Res.get("ic_location")} resizeMode="contain"/>
  						<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginLeft: 5}}>{homes.address} {homes.location.toUpperCase()}, {homes.state.toUpperCase()}</Text>
  					</View>

  					<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 15}}>House Description</Text>
  					<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 10}}>{homes.homeType.description}</Text>

  					<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 15}}>Accommodations</Text>
  					<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 10}}>{accom}</Text>
            
  					<Aminities />

  					<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 18}}>Policies</Text>
  					<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 10}}>{homes.homeType.description}</Text>
  				</View>
        
  		  </Animated.ScrollView>
  		</View>
  		
	);
};

export default ProfileScreen;
