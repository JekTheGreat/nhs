/* eslint-disable */
import {StyleSheet} from "react-native";
import Resources from "__src/resources";
import {getStatusBarHeight} from "__src/resources/customize/StatusBarHeight";
const {Color} = Resources;

export default StyleSheet.create({
	container: {
		flexShrink: 1, width: "100%",
		height: "100%", backgroundColor: Color.bg,
	},
	body: {
		flex: 1, marginTop: getStatusBarHeight(true),
		backgroundColor: Color.white,
	},
	image: {
		flexGrow: 1, height: 200, width: null,
		alignItems: "center", justifyContent: "center",
	  },
	txtImageTitle: {
		textAlign: "center", color: "black",
		fontSize: 20, fontWeight: "bold",
		fontFamily: "Roboto-Light",
	},
	txtImageSubTitle: {textAlign: "center", fontSize: 13, color: "black", fontFamily: "Roboto"},
	viewReviewContainer: {flex: 1, marginTop: 10},
	viewMargin: {marginHorizontal: 20},
	txtReviewTitle: {
		marginVertical: 10, fontSize: 20,
		fontWeight: "bold", fontFamily: "Roboto-Light",
		color: "black",
	},

	flex1: {flex: 1},
	fullFlex: {width: "100%", height: "100%"},
	flexGrow: {flexGrow: 1},
	flexShrink1: {flexShrink: 1},
	marT10: {marginTop: 10},
	marT30: {marginTop: 30},
	marT20: {marginTop: 20},
	marT25: {marginTop: 25},
	padH15: {paddingHorizontal: 15},
	padH20: {paddingHorizontal: 20},
	marB20: {marginBottom: 20},
	padB20: {paddingBottom: 20},

	// FirstScreen
	labelText: {fontSize: 20, fontFamily: "Roboto", fontWeight: "bold", color: Color.Standard2},
	labelText2: {fontSize: 15, fontFamily: "Roboto", fontWeight: "bold", color: Color.Standard2},
	containerStyle: {padding: 0, borderColor: "transparent", backgroundColor: "transparent", marginLeft: 0, marginBottom: 0},
	textStyle: { color: Color.Standard2, fontFamily: "Roboto-Light", fontSize: 13, fontWeight: null},
	flex1marT20: {flex: 1, marginTop: 20},
	labelStyle: {color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light"},
	dropDownStyle: {height: 175},

	renderBase: { marginTop:15, flexDirection: "row", width: "100%", height: 40, alignItems: "center",  borderColor: Color.Standard,
		borderWidth: 0.6, borderRadius: 3, paddingHorizontal: 5, marginTop: 7},
	renderRow: {paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white"},
	renderRowTxt: {margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center"},
	input: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14,},
	customStyle: {backgroundColor: Color.Header, opacity: 0.3, zIndex: 1, position: "absolute", top: 0, bottom: 0, left: 0, right: 0},
	errStyle: {color: Color.red, fontSize: 13, fontWeight: "normal", fontFamily: "Roboto-Light", marginTop: 4},

	// AddListingScreen
	otpBottom: {flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 15, flexShrink: 1},
	btnback: {width: 120, borderColor: Color.colorPrimaryDark, borderWidth: 0.5,
		backgroundColor: Color.white, marginRight: 10},
	width120: {width: 120},

	container2: {
    flex: 1
  },
  marker:{
    width: 30,
    height: 30,
    zIndex: 2445,
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
  },
  markerWrapper: {
    position: 'absolute',
    flex:1,
    top: 0 ,
    zIndex: 2445,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

});
