import React, { useRef, useState } from "react";
import {View, StatusBar, Image, Text, Dimensions, StyleSheet, ScrollView} from "react-native";
import profile from "../../../../profile.json";
import Aminities from "./Aminities";
import Animated from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";
import Rating from "./Rating";
import Footer from "./Footer";
import ExtraDescription from "./ExtraDescription";
import ReviewScreen from "../reviews/index";
import Icon from "react-native-vector-icons/Feather";
import Resource from "__src/resources";
import { SafeAreaView } from "react-native-safe-area-context";
import {useValues, onScroll} from "__redash";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
	onGestureEvent,
	snapPoint,
	timing,
} from "react-native-redash";
const {Color, Res} = Resource;
const IMAGE_HEIGHT = 200;
const homes = profile.homes;
const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const {Value, event,
	Extrapolate,
	and,
	block,
	call,
	cond,
	eq,
	interpolate,
	set,
	useCode} = Animated;
	
const ProfileScreen = (props) => {
	const { goBack, getParam, navigate } = useNavigation();
	const listing = getParam("listing");
	const Guest = homes.numberOfGuests > 0 && `${homes.numberOfGuests} Guest`;
	const Bedroom = homes.numberOfBeds > 0 && `, ${homes.numberOfBeds} Bedroom`;
	const Bathroom = homes.numberOfBathroom > 0 && `, ${homes.numberOfBathroom} Bathroom`;
	const accom = `${Guest}${Bedroom}${Bathroom}`;
	const scrollView = useRef(null);
	const [y] = useValues([0], []);

	const [
		translationX,
		translationY,
		velocityY,
		translateX,
		translateY,
		snapBack,
		state,
	] = useValues([0, 0, 0, 0, 0, 0, State.UNDETERMINED], []);
	const snapTo = snapPoint(translationY, velocityY, [0, SCREEN_HEIGHT]);
	const scale = interpolate(translateY, {
		inputRange: [0, SCREEN_HEIGHT / 2],
		outputRange: [1, 0.75],
		extrapolate: Extrapolate.CLAMP,
	});
	const gestureHandler = useMemoOne(
		() => onGestureEvent({ translationX, translationY, velocityY, state }),
		[state, translationX, translationY, velocityY]
	);
	useCode(
		() =>
			block([
				cond(
					and(eq(state, State.END), eq(snapTo, SCREEN_HEIGHT), eq(snapBack, 0)),
					set(snapBack, 1)
				),
				cond(
					snapBack,
					call([], () => goBack()),
					cond(
						eq(state, State.END),
						[
							set(
								translateX,
								timing({ from: translationX, to: 0, duration: 1000 })
							),
							set(
								translateY,
								timing({ from: translationY, to: 0, duration: 1000 })
							),
						],
						[set(translateX, translationX), set(translateY, translationY)]
					)
				),
			]),
		// we disable the deps because we don't want the identity change on
		// snapPoint to trigger a side effect
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
	
	return (
		<View style={styles.container}>
			<StatusBar barStyle="light-content"/>
			<ScrollView >
				<Animated.View
					style={{ flex: 1, backgroundColor: "white",
						transform: [{ translateX }, { translateY }, { scale }] }}>
					<View>
						<SharedElement id={`idx ${listing.id}`}>
							<Image
								style={styles.image}
								resizeMode="cover"
								source={{uri: listing.images[0].url}} />
						</SharedElement>
						<SafeAreaView style={styles.thumbnailOverlay}>
							<Icon
								name="x"
								backgroundColor="transparent"
								underlayColor="transparent"
								onPress={() => goBack()} />
						</SafeAreaView>
					</View>
					<View style={{flex: 1, paddingHorizontal: 20, paddingTop: 15, borderTopLeftRadius: 15, borderTopRightRadius: 15, backgroundColor: "white"}}>
  					<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 14, color: Color.colorPrimaryLight2}}>{homes.homeType.name}</Text>
  					<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 25, color: Color.text2, marginTop: 7}}>{homes.name}</Text>
  					<View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginTop: 7}}>
  						<Image style={{width: 18, height: 18}} source={Res.get("ic_location")} resizeMode="contain"/>
  						<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginLeft: 5}}>{homes.address} {homes.location.toUpperCase()}, {homes.state.toUpperCase()}</Text>
  					</View>

						<Rating homes={homes} />

  					<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 15}}>House Description</Text>
  					<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 10}}>{homes.homeType.description}</Text>

  					<Text style={{fontFamily: "Roboto", fontWeight: "bold", fontSize: 16, color: Color.text2, marginTop: 15}}>Accommodations</Text>
  					<Text style={{fontFamily: "Roboto-Light", fontSize: 14, color: Color.text2, marginTop: 10}}>{accom}</Text>
            
  					<Aminities />

						<ExtraDescription title={"Policies"} description={homes.homeType.description} />
						<ExtraDescription title={"Cancellation"} description={homes.homeType.description} />
						<ReviewScreen />
  				</View>
				</Animated.View>
			</ScrollView>
			<Footer onPress={() => navigate("ChooseDate")} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width: SCREEN_WIDTH,
		height: 300,
	},
	thumbnailOverlay: {
		...StyleSheet.absoluteFillObject,
		padding: 16,
	},
});

ProfileScreen.sharedElements = (navigation) => {
	const listing = navigation.getParam("listing");
	
	return [listing.id];
};

export default ProfileScreen;
