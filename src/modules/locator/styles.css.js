import { StyleSheet, Dimensions} from "react-native";
import Resource from "__src/resources";
const {Color} = Resource;
const { height, width } = Dimensions.get("window");

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
});
