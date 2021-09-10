import Resource from "__src/resources";
const {Color} = Resource;
import { StyleSheet, Dimensions, Platform } from "react-native";
const { height, width } = Dimensions.get("window");

const IS_IOS = Platform.OS === "ios";

function wp (percentage) {
	const value = (percentage * width) / 85;
	
	return Math.round(value);
}

const slideHeight = height * 0.30;
const slideWidth = wp(70);
const itemHorizontalMargin = wp(1);

export const sliderWidth = width;
export const itemWidth = width - 35;

const entryBorderRadius = 8;
export default StyleSheet.create({
	flex1: {flex: 1},
	mapStyle: {...StyleSheet.absoluteFill},
	
	renderItemStyle: {flexShrink: 1, padding: 15, margin: 10, flexDirection: "row", borderRadius: 7, marginHorizontal: 30,
		justifyContent: "center", alignItems: "center", backgroundColor: Color.white},
	imageLogo: {width: 45, height: 45},
	view1: {flexDirection: "column", flex: 1, justifyContent: "center", marginLeft: 10},
	view2: {flexDirection: "column", flexShrink: 1, marginLeft: 10},
	txtRemark: {fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light"},
	txtStatus: {fontSize: 10, color: Color.Standard2, fontFamily: "Roboto-Light"},
	txtTrack: {fontSize: 10, color: Color.LightBlue, textAlign: "right", fontFamily: "Roboto-Light"},
	txtTime: {fontSize: 10, color: Color.Standard2, textAlign: "right", fontFamily: "Roboto-Light"},
	cover: { height: (height / 2) + 70},
	gradient: { position: "absolute", left: 0, bottom: 0,
		right: 0, alignItems: "center"},
	back: { position: "absolute", top: 20, left: 12, zIndex: 5,
		backgroundColor: "rgba(255,255,255,0.4)", padding: 12, borderRadius: 20,
		width: 80, alignItems: "center", justifyContent: "center",
	},
	right: { position: "absolute", top: 20, right: 12, zIndex: 5,
		backgroundColor: "rgba(255,255,255,0.4)", padding: 12, borderRadius: 20,
		width: 80, alignItems: "center", justifyContent: "center",
	},
	backButton: { fontWeight: "bold", fontSize: 30 },

	// Coordinate List
	flatlistStyle: {position: "absolute", height: (height / 2), width, bottom: 0},
	flStyle: {zIndex: 2, paddingHorizontal: 30},
	slider: {
		marginTop: 15,
		overflow: "visible", // for custom animations
	},
	sliderContentContainer: {
		paddingVertical: 10, // for custom animation
	},


	slideInnerContainer: {
		width: itemWidth,
		minHeight: 160,
		paddingHorizontal: itemHorizontalMargin,
	},
	shadow: {
		position: "absolute",
		top: 0,
		left: itemHorizontalMargin,
		right: itemHorizontalMargin,
		bottom: 18,
		shadowColor: Color.black,
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 10,
		borderRadius: entryBorderRadius,
	},
	imageContainer: {
		flex: 1,
		marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
		backgroundColor: "white",
		height: 160,
	},
	imageContainerEven: {
		backgroundColor: Color.black,
	},
	image: {
		...StyleSheet.absoluteFillObject,
		borderRadius: 5,
	},
	textContainer: {
		paddingTop: 3,
		paddingHorizontal: 3,
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 5, left: 5,
	},
	textContainerEven: {
		backgroundColor: Color.black,
	},
	title: {
		color: Color.black,
		fontSize: 13,
		fontWeight: "bold",
		letterSpacing: 0.5,
	},
	titleEven: {
		color: "white",
	},
	subtitle: {
		marginTop: 6,
		color: Color.gray,
		fontSize: 12,
		fontStyle: "italic",
	},
	subtitleEven: {
		color: "rgba(255, 255, 255, 0.7)",
	},
});
