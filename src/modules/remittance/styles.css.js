import { StyleSheet, Dimensions} from "react-native";
import Resource from "__src/resources";
const {Color} = Resource;
const { width: viewportWidth } = Dimensions.get("window");

function wp (percentage) {
	const value = (percentage * viewportWidth) / 85;
	
	return Math.round(value);
}

const slideWidth = wp(75);
const itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + (itemHorizontalMargin * 2);

export default StyleSheet.create({
	flex1: {flex: 1},
	flexShrink1: {flexShrink: 1},
	flex1marT15: {flex: 1, marginTop: 15},
	flex1marT20: {flex: 1, marginTop: 20},
	flex1marV20: {flex: 1, marginVertical: 20},
	flex1allCenter: {flexShrink: 1, alignItems: "center", justifyContent: "center"},
	flex1padH20: {flex: 1, paddingHorizontal: 20},
	flex1marT30padH20: {flex: 1, paddingHorizontal: 20, marginTop: 10},
	marT5: {marginTop: 5},
	marT10: {marginTop: 10},
	marT15: {marginTop: 15},
	marT20: {marginTop: 20},
	marT30: {marginTop: 30},
	marB5: {marginBottom: 5},
	marB10: {marginBottom: 10},
	marB20: {marginBottom: 20},
	marB30: {marginBottom: 30},
	padH20: {paddingHorizontal: 20},
	padB10: {paddingBottom: 10},
	padB15: {paddingBottom: 15},
	padB20: {paddingBottom: 20},
	padT30: {paddingTop: 30},
	input: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14, marginLeft: 5, paddingVertical: 0},
	input2: {fontFamily: "Roboto-Light", fontSize: 14, marginLeft: 3},
	input3: {fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard},
	input4: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingVertical: 0},
	txt1: {fontFamily: "Roboto", color: Color.Standard2, fontWeight: "bold", fontSize: 20},
	txt2: {fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 14},
	txt3: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 13},
	txt5: {fontFamily: "Roboto", fontSize: 18, color: Color.Standard, marginLeft: 10},
	txt6: {fontFamily: "Roboto", fontSize: 13, color: Color.Standard2},
	txt7: {flexShrink: 1, paddingVertical: 0, fontFamily: "Roboto-Light", fontSize: 12, color: Color.Standard},
	txt8: {flexShrink: 1, paddingVertical: 0, fontFamily: "Roboto", color: Color.LightBlue, fontSize: 21},
	textAlign: {textAlign: "center"},
	renderSearch: {height: 40, borderBottomColor: Color.Standard,
		borderBottomWidth: 0.5, marginTop: 5},

	// RemittanceScreen
	card: {flexShrink: 1, marginTop: 0,
		paddingVertical: 25, paddingHorizontal: 80},
	txtheader: {color: Color.Standard2, fontFamily: "Roboto",
		fontSize: 22, textAlign: "center"},

	btnStyle: {height: 45, borderBottomWidth: 5, marginBottom: 5},
	dropDownStyle: {height: 250},
	labelStyle: {color: Color.Standard2, fontSize: 14, fontFamily: "Roboto-Light"},
	// Sender
	btnSearch: {width: 50, height: 50, alignSelf: "center"},
	btnCancel: {backgroundColor: Color.transparent, color: Color.colorPrimaryDark,
		borderBottomWidth: 0},
	viewFBWrapper: {flexDirection: "row", alignItems: "center", justifyContent: "center", marginVertical: 10},
	viewLine: {flex: 1, height: 0.7, backgroundColor: Color.Standard},
	txtSocial: {fontSize: 13, marginHorizontal: 10, fontFamily: "Roboto-Light", color: Color.Standard2 },
	view2: {flexDirection: "row", justifyContent: "space-between", marginTop: 15},
	borderWidth0: {borderBottomWidth: 0},
	viewButton: {width: "100%", bottom: 0, alignSelf: "center"},
	flex1marL5: {flex: 1, marginLeft: 5},
	flex1marR5: {flex: 1, marginRight: 5},
	viewSearch: {flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 20},
	flex1marH10: {flex: 1, marginHorizontal: 10},

	txtOR: {fontFamily: "Roboto-Light", color: Color.Standard, fontSize: 14},
	txtFillup: { color: Color.red, fontSize: 13, fontStyle: "italic"},
	btnFillup: {width: 150, paddingHorizontal: 15, paddingVertical: 5, backgroundColor: "red",
		flexDirection: "row", alignItems: "center", justifyContent: "center", borderRadius: 3, alignSelf: "flex-end"},
	slider: {
		marginTop: 15,
		overflow: "visible",
	},
	sliderContentContainer: {
		paddingVertical: 10,
	},
	exampleContainer: {
		paddingVertical: 10,
	},

	// Search found

	SearchFoundItem: {flexShrink: 1, paddingVertical: 10, paddingHorizontal: 20, flexDirection: "row",
		justifyContent: "center", alignItems: "center", backgroundColor: Color.white},
	txtRemark: {flex: 1, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light"},
	txtName: {fontSize: 14, color: Color.Standard2, fontFamily: "Roboto-Light"},
	SearchFoundView1: {flexDirection: "column", flex: 1},
	SearchFoundView2: {flexDirection: "column", flexShrink: 1, marginLeft: 10},
	txtTrack: {fontSize: 10, color: Color.LightBlue, textAlign: "right", fontFamily: "Roboto-Light"},
	txtTime: {fontSize: 10, color: Color.Standard2, textAlign: "right", fontFamily: "Roboto-Light"},
	txtSearchFoundLabel: {fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 16},
	txtSearch: {fontFamily: "Roboto", color: Color.Standard2, fontSize: 22},

	SearchView: {paddingHorizontal: 15, marginTop: 17},
	view3: {flexDirection: "row", flexWrap: "wrap", marginTop: 5},
	txtLabel: {fontWeight: "bold", fontFamily: "Roboto-Light", fontSize: 16, color: Color.Standard2},
	txtLabel2: {fontWeight: "500", fontFamily: "Roboto-Light", fontSize: 15, color: Color.Standard2},
	txtLabel3: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.Standard2},
	view7: {padding: 5, margin: 3, flexDirection: "column"},
	txt4: {fontFamily: "Roboto-Light", alignSelf: "flex-end", fontSize: 14, color: Color.Standard},
	txt9: {fontFamily: "Roboto-Light", alignSelf: "center", fontSize: 14, color: Color.Standard},

	// Summary
	viewDivider: {height: 0.5, backgroundColor: Color.Standard, marginTop: 10},
	amount: {color: Color.black, fontWeight: "bold"},
	value: {color: Color.black, fontWeight: "bold"},
	fontSize17: {fontSize: 17},
	summaryBtnWrapper: {width: "100%", bottom: 0, alignSelf: "center"},

	// SearchDetails
	headerContainer: {backgroundColor: Color.Header, elevation: 0,
		shadowOpacity: 0, borderBottomColor: Color.DarkBG},
	iconStyle: {color: "#FFF", fontFamily: "Roboto"},
	style3: {height: 60, alignItems: null},
	errStyle: {color: Color.red, fontSize: 13, fontFamily: "Roboto-Light", marginTop: 4},
	btnUpdate: {alignSelf: "flex-end", marginBottom: 15},
	imgUpdate: {width: 60, height: 25},

	// Fill up steps
	dropdownstyle: {width: 200,
		height: 250,
		borderColor: "#D9D8D8",
		marginTop: 3,
		borderWidth: 1,
		borderRadius: 5},

	// Render error
	inpuView1: {justifyContent: "center", backgroundColor: Color.lightred, padding: 10, borderRadius: 3, flexDirection: "row"},
	iconContainerStyle: {position: "absolute", left: 5, top: 0, bottom: 0},

	// Selection payout
	txtPOD: {fontFamily: "Roboto", color: Color.white, fontSize: 14, marginLeft: 5},
	txtError: {fontFamily: "Roboto", color: Color.red, fontSize: 14},
	txtConvertAmt: {textAlign: "right", fontFamily: "Roboto", fontSize: 15, color: Color.Standard2, marginTop: 15},
	viewTarget: {flexDirection: "row", width: "100%", height: 40, alignItems: "center",
		paddingRight: 5,  borderBottomColor: "#404040", borderBottomWidth: 0.6},
	txtCode: {fontSize: 10, color: Color.Standard, marginTop: 5},
	txtInput: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingVertical: 0},
	
	// POD Summary
	podTxt1: {fontFamily: "Roboto-Light", fontSize: 14, marginTop: 20, color: Color.Standard},
	podView1: {height: 150, borderWidth: 1, borderColor: Color.Standard, borderRadius: 5, borderStyle: "dashed", alignItems: "center", justifyContent: "center", marginTop: 5, padding: 20},
	podImage1: {width: 60, height: 60, alignSelf: "center"},
	podTxt2: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.LightBlue},
	podTxt3: {fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2},
	txtAlignLeft: {textAlign: "left"},

	// UPLoadID
	loadImage: {height: 150, borderWidth: 1, borderColor: Color.Standard, borderRadius: 5,
		borderStyle: "dashed", alignItems: "center", justifyContent: "center", marginTop: 10},
	uploadTxt1: {width: 120, height: 120},
	uploadView1: {width: "100%", height: "100%", alignItems: "center", justifyContent: "center"},
	btnClose: {position: "absolute", top: 0, right: 0, zIndex: 1},
	mar20: {margin: 20},

	img1: {width: 125, height: 125, alignSelf: "center", marginTop: 20, marginBottom: 30},
	txt3_1: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontWeight: "800", fontSize: 20},

	// SUCCESS
	renderSuccessWrapper: {flex: 1, padding: 30, flexDirection: "column", justifyContent: "space-between"},
	renderSuccessWrapper2: {justifyContent: "center", alignItems: "center", marginBottom: 20},
	txtok: {color: Color.colorPrimary, fontSize: 18, alignSelf: "center", paddingHorizontal: 30, paddingVertical: 10},
	bottom: {flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: 10},
	imgqrdownload: {width: 30, height: 30},
	txtBlue: {textAlign: "center", fontSize: 10, fontFamily: "Roboto-Light", color: Color.LightBlue, marginTop: 7},
	txtMessage: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 14},
	txtDownload: {fontFamily: "Roboto-Light", fontSize: 14, color: Color.LightBlue, marginLeft: 10},

	// OTPForm
	viewContainer: {flex: 1, backgroundColor: Color.bg},
	imageContainer2: { flex: 1, alignItems: "center", justifyContent: "center"},
	viewflex2: {flex: 2, paddingHorizontal: 20},
	txtOtp: {fontFamily: "Roboto-Light", fontWeight: "bold", color: Color.colorPrimary, fontSize: 16, marginBottom: 15},
	txtOtpnote: {fontFamily: "Roboto-Light",  fontSize: 13, color: Color.Standard2, marginBottom: 5},
	containerStyle: {marginLeft: 0, padding: 0, marginTop: 10, backgroundColor: "transparent", borderColor: "transparent"},
	textStyle: {fontFamily: "Roboto-Light", fontWeight: null, fontSize: 14, color: Color.Standard2},
	otpBottom: {flexDirection: "row", justifyContent: "flex-end", marginTop: 20},
	btnback: {width: 120, borderColor: Color.colorPrimaryDark, borderWidth: 0.5,
		backgroundColor: Color.white, marginRight: 10},
	txtHelp: {fontWeight: "bold", color: Color.colorPrimary},
	txtGetHelpContainer2: {fontSize: 14, marginVertical: 20, color: Color.Standard2, fontFamily: "Roboto-Light", textAlign: "center" },
	imageLogo: {width: 145, height: 145, marginBottom: 10},
	width120: {width: 120},
	bold: {fontWeight: "bold"},

	renderBaseWrapper: {flexDirection: "row", width: "100%", height: 40, alignItems: "center",  borderBottomColor: "#404040", borderBottomWidth: 0.6},
	input: {flex: 1, fontFamily: "Roboto-Light", fontSize: 14, paddingVertical: 0},
	renderRow: {paddingHorizontal: 10, flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white"},
	renderRowTxt: {margin: 4, fontSize: 12, color: Color.Standard2, fontFamily: "Roboto-Light", textAlignVertical: "center"},
	highlighted: {fontWeight: "bold"},
});
