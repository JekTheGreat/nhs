import React from "react";
import { Dimensions, Image, StyleSheet, View, ScrollView } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";
import Animated, {
	Extrapolate,
	and,
	block,
	call,
	cond,
	eq,
	interpolate,
	set,
	useCode, Value,
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
	onGestureEvent,
	snapPoint,
	timing,
} from "react-native-redash";
import {useValues} from "__redash";
import { useMemoOne } from "use-memo-one";
import Icon from "react-native-vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";

import Description from "./Description";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		width,
		height: width,
	},
	thumbnailOverlay: {
		...StyleSheet.absoluteFillObject,
		padding: 16,
	},
});
const Listing = () => {
	const { goBack, getParam } = useNavigation();
	const listing = getParam("listing");
	const [
		translationX,
		translationY,
		velocityY,
		translateX,
		translateY,
		snapBack,
		state,
	] = useValues([0, 0, 0, 0, 0, 0, State.UNDETERMINED], []);
	const snapTo = snapPoint(translationY, velocityY, [0, height]);
	// const scale = interpolate(translateY, {
	// 	inputRange: [0, height / 2],
	// 	outputRange: [1, 0.75],
	// 	extrapolate: "clamp",
	// });
	const gestureHandler2 = useMemoOne(
		() => onGestureEvent({ translationX, translationY, velocityY, state }),
		[state, translationX, translationY, velocityY]
	);

	const gestureHandler = onGestureEvent({ translationX, translationY, velocityY, state });
	
	return (
		// <View style={styles.container}>
		<PanGestureHandler {...gestureHandler}>
			<Animated.View
				style={{
					flex: 1,
					backgroundColor: "white",
					transform: [{ translateX }, { translateY }],
				}}
			>
				<View>
					<SharedElement id={listing.id}>
						<Image
							style={styles.image}
							resizeMode="cover"
							source={{uri: listing.picture}}
						/>
					</SharedElement>
					<SafeAreaView style={styles.thumbnailOverlay}>
						<Icon.Button
							name="x"
							backgroundColor="transparent"
							underlayColor="transparent"
							onPress={() => goBack()}
						/>
					</SafeAreaView>
				</View>
				<Description />
			</Animated.View>
		</PanGestureHandler>
		// </View>
	);
};

Listing.sharedElements = (navigation) => {
	const listing = navigation.getParam("listing");
	
	return [listing.id];
};
export default Listing;
