import React, { RefObject } from "react";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import Animated from "react-native-reanimated";
import Icon from "react-native-vector-icons/Feather";
import { useSafeArea } from "react-native-safe-area-context";
import Resource from "__src/resources";
import {withTransition} from "react-native-redash";
import { useNavigation } from "react-navigation-hooks";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import {useValues, withTimingTransition} from "__redash";
const {Color, Res} = Resource;
const ICON_SIZE = 24;
const PADDING = 20;
export const MIN_HEADER_HEIGHT = 45;
export const MARGIN_HEADER_TOP = 20;
const { interpolate, Extrapolate, useCode, greaterThan, set, block } = Animated;

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
	},
	header: {
		flexDirection: "row",
		height: MIN_HEADER_HEIGHT,
		alignItems: "center",
		paddingHorizontal: PADDING,
	},
	title: {
		fontFamily: "Roboto",
		fontSize: 25,
		fontWeight: "bold",
		color: Color.text2,
		marginLeft: PADDING,
		flex: 1,
	},
	subContainer: {...StyleSheet.absoluteFillObject, backgroundColor: "white"},
});

export default ({ y, scrollView, data }) => {
	const { goBack } = useNavigation();
	const insets = useSafeArea();
	const { top: paddingTop } = insets;
	const [toggle] = useValues([0], [1]);
	const transition = withTimingTransition(toggle);
	const translateX2 = interpolate(y, {
		inputRange: [-HEADER_IMAGE_HEIGHT, 100, HEADER_IMAGE_HEIGHT + 100],
		outputRange: [-ICON_SIZE - PADDING, -ICON_SIZE - PADDING, 0],
		extrapolate: Extrapolate.CLAMP,
	});
  
	const translateX = interpolate(y, {
		inputRange: [0, HEADER_IMAGE_HEIGHT],
		outputRange: [-(ICON_SIZE + PADDING), 0],
		extrapolate: Extrapolate.CLAMP,
	});
	const translateY2 = interpolate(y, {
		inputRange: [0, 0, HEADER_IMAGE_HEIGHT ],
		outputRange: [
			HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - paddingTop,
			HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
			0],
		extrapolateRight: Extrapolate.CLAMP,
	});
  
	const translateY = interpolate(y, {
		inputRange: [0, HEADER_IMAGE_HEIGHT ],
		outputRange: [HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT - paddingTop, 0],
		extrapolateRight: Extrapolate.CLAMP,
	});
	const opacity = transition;
	const marginTop = interpolate(y, {
		inputRange: [0, HEADER_IMAGE_HEIGHT],
		outputRange: [-paddingTop - MARGIN_HEADER_TOP, 0],
		extrapolateRight: Extrapolate.CLAMP,
	});
  
	useCode(() => block([set(toggle, greaterThan(y, HEADER_IMAGE_HEIGHT))]), [
		toggle,
		y,
	]);
  
	// const color = interpolate(y, {
	// 	inputRange: [0, HEADER_IMAGE_HEIGHT + paddingTop],
	// 	outputRange: ["#FFFFF", "#000000"],
	// 	extrapolate: Extrapolate.CLAMP,
	// });
  
	console.log("transition", transition);
	
	return (
		<Animated.View style={[styles.container, {paddingTop}]}>
			<Animated.View style={[styles.subContainer, {opacity}]} />
			<View style={styles.header}>
				<TouchableWithoutFeedback onPress={() => goBack()}>
					<View>
						<Icon name="arrow-left" size={ICON_SIZE} color="white" />
						<Animated.View
							style={{ ...StyleSheet.absoluteFillObject, opacity: 1 }} >
							<Icon name="arrow-left" size={ICON_SIZE} color="black" />
						</Animated.View>
					</View>
				</TouchableWithoutFeedback>

				<Animated.Text
					style={[
						styles.title, {},
						{ transform: [{ translateX }, { translateY }] },
					]}>
					{data.name}
				</Animated.Text>
				<Icon name="heart" size={ICON_SIZE} color="white" />
			</View>
		</Animated.View>
	);
};
