import { StyleSheet} from "react-native";
// import {getStatusBarHeight} from "__src/resources/customize/StatusBarHeight";
import Resource from "__src/resources";
const {Color} = Resource;

export default StyleSheet.create({

	mainContainer: {flex: 1, paddingHorizontal: 20,  backgroundColor: Color.bg},
	flex1: {flex: 1},
	flexShrink1: {flexShrink: 1},
	flex1marT15: {flex: 1, marginTop: 15},
	flex1marT20: {flex: 1, marginTop: 20},
	flex1marV20: {flex: 1, marginVertical: 20},
	flex1allCenter: {flexShrink: 1, alignItems: "center", justifyContent: "center"},
	flex1padH20: {flex: 1, paddingHorizontal: 20},
	flex1marT30padH20: {flex: 1, paddingHorizontal: 20, marginTop: 20},
	marT10: {marginTop: 10},
	marT15: {marginTop: 15},
	marT20: {marginTop: 20},
	marT25: {marginTop: 25},
	marT30: {marginTop: 30},
	marB10: {marginBottom: 10},
	marB20: {marginBottom: 20},
	borderWidth0: {borderBottomWidth: 0},
	input: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14, marginLeft: 5},
	input2: {fontFamily: "Roboto-Light", fontSize: 14, marginLeft: 3},
	input3: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.Standard2},
	input4: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingVertical: 0},
	txt1: {fontFamily: "Roboto-Light", textAlign: "center", color: Color.LightBlue, fontWeight: "bold", fontSize: 20},
	txt2: {fontFamily: "Roboto", color: Color.Standard2, fontSize: 21},
	txt3: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 13},
	txt3_1: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 20},
	txt4: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 14},
	txt5: {fontFamily: "Roboto", fontSize: 18, color: Color.Standard, marginLeft: 10},
	txt6: {fontFamily: "Roboto", fontSize: 13, color: Color.Standard2},
	txt7: {flexShrink: 1, paddingVertical: 0, fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard},
	txt8: {flexShrink: 1, paddingVertical: 0, fontFamily: "Roboto", color: Color.LightBlue, fontSize: 21},
	cardView1: {padding: 20, alignItems: "center", justifyContent: "center",
		marginLeft: 0, marginRight: 0, marginTop: 10, marginBottom: 0},
	cardView2: {padding: 10, flexDirection: "row", alignItems: "center", justifyContent: "center",
		marginLeft: 0, marginRight: 0, marginTop: 0, marginBottom: 0},
	cardView3: {position: "absolute", bottom: -40, zIndex: 2, marginLeft: 0, marginRight: 0},
	iconContainerStyle: {position: "absolute", left: 5, top: 8},
	img1: {width: 125, height: 125, alignSelf: "center", marginVertical: 30},
	img2: {width: 65, height: 50},
	img3: {width: 65, height: 50},

	renderSuccessWrapper: {flex: 1, padding: 30, flexDirection: "column", justifyContent: "space-between"},
	renderSuccessWrapper2: {justifyContent: "center", alignItems: "center", marginBottom: 20},
	txtok: {color: Color.colorPrimary, fontSize: 18, alignSelf: "center", paddingHorizontal: 30, paddingVertical: 10},
	zIndex1: {zIndex: 1},
 
	// LOCALSCREEN
	btnCreate: {marginHorizontal: 30, borderBottomWidth: 6, marginBottom: 5},
	btnCancel: {backgroundColor: Color.transparent, color: Color.colorPrimaryDark,
		 marginHorizontal: 30, borderBottomWidth: 0, marginBottom: 5},
	paddingTop5: {paddingTop: 5},

	// INPUT
	inpuView1: {justifyContent: "center", backgroundColor: Color.lightred, padding: 7, marginTop: 10, flexDirection: "row"},
	txtAlign: {textAlign: "right"},
	inputCard1: {paddingVertical: 30, paddingHorizontal: 15,
		marginLeft: 0, marginRight: 0, marginTop: 10},
	alignSelf: {alignSelf: "flex-end"},
	planView1: {width: 55, borderRadius: 55 / 2, height: 55, borderColor: Color.LightBlue, borderWidth: 1, flexDirection: "column",
		alignItems: "center", justifyContent: "center"},
	width70: {width: "75%"},
	justSpace: {flexDirection: "row", justifyContent: "space-between"},

	// PAYMENT
	payView1: {justifyContent: "center", backgroundColor: "#bde5f8", padding: 7, marginTop: 10, flexDirection: "row"},
	payIcon: {position: "absolute", left: 5, top: 6},
	payCard1: {padding: 20, alignItems: "center", justifyContent: "center",
		marginLeft: 0, marginRight: 0},
	payView2: {borderBottomColor: Color.Standard, borderBottomWidth: 1, paddingBottom: 5},


	card: {flexShrink: 1, marginTop: 0,
		paddingVertical: 25, paddingHorizontal: 100},

	// Confirmation Code
	top: {height: "30%", alignItems: "center", justifyContent: "center"},
	bottom: {height: "70%", paddingHorizontal: 20},
	textTitle: {fontSize: 25, fontFamily: "Roboto-Light", color: Color.Standard2, textAlign: "center"},
	textContent1: {textAlign: "center", fontSize: 13, marginTop: 5, fontFamily: "Roboto-Light", color: Color.Standard},
	textContent3: {textAlign: "center", fontSize: 13, color: Color.Standard2, fontFamily: "Roboto-Light", marginTop: 10},
	textContent4: {textAlign: "center", color: Color.LightBlue, fontFamily: "Roboto-Light", fontSize: 14, marginTop: 20},
	textContent5: {color: Color.colorPrimary, fontWeight: "bold"},
	imgicon: {width: 120, height: 120 },
	inputStyles: {textAlign: "center", fontSize: 20},

	// history/details
	labelStyle2: {color: Color.black, fontWeight: "bold"},
	txtsuccess: {textAlign: "center", fontFamily: "Roboto", fontWeight: "700", color: Color.Standard2, fontSize: 20, marginTop: 15},
});
