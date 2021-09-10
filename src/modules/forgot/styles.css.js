import {StyleSheet} from "react-native";
import Resources from "__src/resources";
const {Color} = Resources;

export default StyleSheet.create({
	/* ./components/content.js */
	container: {flexShrink: 1, width: "100%", height: "100%", backgroundColor: Color.black},
	body: { flex: 1, backgroundColor: Color.white},
	footer: { height: 50, backgroundColor: Color.colorPrimary, borderTopWidth: 0.5},

	/* ./components/Codeform.js */
	btnStyle: {height: 45, marginBottom: 20, alignItems: "center",
		backgroundColor: Color.colorPrimary, borderRadius: 5, borderBottomWidth: 6,
		borderBottomColor: Color.colorPrimaryDark, justifyContent: "center" },
	textTitle: {fontSize: 25, fontFamily: "Roboto-Light", color: Color.Standard2, textAlign: "center"},
	textContent1: {textAlign: "center", fontSize: 13, marginTop: 5, fontFamily: "Roboto-Light", color: Color.Standard},
	textMobile: {textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, marginTop: 5},
	textContent3: {textAlign: "center", fontSize: 13, color: Color.Standard, fontFamily: "Roboto-Light", marginTop: 10},
	textContent4: {textAlign: "center", color: Color.Standard, fontFamily: "Roboto-Light", fontSize: 14, marginTop: 20, flexGrow: 1 },
	flex1: {flex: 1},
	flex1pad30: {flex: 1, paddingHorizontal: 30},
	flex1padt20: {flex: 1, paddingTop: 20 },
	marginBottom20: {marginBottom: 20},
	marginBottom30: {marginBottom: 30},
	imgicon: {width: 130, height: 130 },
	marginTop20: {marginTop: 20},
	marginTop30: {marginTop: 30},
	inputStyles: {textAlign: "center", fontSize: 20},
	top: {height: "30%", alignItems: "center", justifyContent: "center"},
	bottom: {height: "70%", paddingHorizontal: 20},

	/* ./components/EmailForm.js */
	txtnote: {fontSize: 25, fontFamily: "Roboto-Light", color: Color.Standard2},
	marginVer30: {marginVertical: 30},
	containerStyle: {padding: 0, marginVertical: 5, borderColor: "transparent", backgroundColor: "transparent"},
	textStyle: {fontWeight: "normal", color: Color.Standard2, fontFamily: "Roboto-Light"},
	btnEmailform: {position: "absolute", bottom: 30, right: 30, width: 80, height: 80, borderRadius: 100, backgroundColor: Color.colorPrimary},
	imgNext: {width: 60, height: 60},

	/* ./components/ForgotUsername.js */
	forgotunWrap1: {flexShrink: 1, width: "100%", height: "100%", backgroundColor: Color.white},
	txtrecover: { fontSize: 25, fontFamily: "Roboto-Light", color: Color.Standard2},
	txtsuccess: {textAlign: "center", color: Color.Standard2, fontSize: 25, fontWeight: "500", fontFamily: "Roboto-Light"},
	txtnote2: {color: Color.Standard2,  marginTop: 5},
	txthassent: {fontFamily: "Roboto-Light", textAlign: "center",  fontSize: 15, color: Color.Standard2},
	txtdata: {fontFamily: "Roboto-Light", textAlign: "center",  fontSize: 15, color: Color.Standard2, fontWeight: "500"},
	btnStyle2: {height: 45, alignItems: "center", borderBottomWidth: 0,
		backgroundColor: "transparent", justifyContent: "center", borderColor: "transparent", borderWidth: 0 },
	labelStyle: {color: Color.colorPrimary, fontSize: 16, padding: 10, fontFamily: "Roboto-Light", fontWeight: "bold"},
	btnNext: {position: "absolute", bottom: 20, right: 20},
	title: {textAlign: "center", fontSize: 25, fontFamily: "Roboto-Light", color: Color.Standard2},
	imgSuccess: {width: 130, height: 130, alignSelf: "center", marginVertical: 15 },


	// new styles
	viewContainer: {flexShrink: 1, height: "100%", width: "100%", backgroundColor: "#F8F9FB", alignItems: "center"},
	backArrow: {elevation: 5, marginLeft: 10, marginTop: 10, alignSelf: "flex-start", padding: 10, height: 36, width: 36, backgroundColor: "#FFC914", borderRadius: 38, borderBottomWidth: 0},
	otpHeader: {marginTop: 0, marginBottom: 10, alignSelf: "center", fontWeight: "700", fontSize: 20, fontFamily: "Roboto"},
	body2: {
		elevation: 5, width: "90%", backgroundColor: "#FFFFFF", marginTop: 20, marginHorizontal: "5%", borderRadius: 36,
		shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 1,
	},
	imageContainer2: {alignItems: "center", marginTop: 15, height: "35%"},
	inputContainer: {height: "65%"},
	txtOtp: {paddingHorizontal: 10, textAlign: "center", fontFamily: "Roboto", fontWeight: "bold", color: Color.Standard2, fontSize: 18, marginTop: 10, marginBottom: 10},
	otpBottom: {marginTop: 15, alignItems: "center"},
	btnlogin: {width: 329, height: 45, borderBottomWidth: 2, borderBottomColor: "#FFC914", borderRadius: 100, backgroundColor: "#FFC914", elevation: 5, borderWidth: 1, borderColor: "#FFC914"},
	btnLabelStyle: {fontSize: 16, fontFamily: "Roboto", fontWeight: "bold"},
	prefixField: {padding: 10, width: 100, height: 45, borderRadius: 36, borderWidth: 1, borderColor: "#FFC914", borderStyle: "solid"},
	mobileField: {width: 200, height: 45, paddingLeft: 15, borderRadius: 36, borderWidth: 1, borderColor: "#FFC914", borderStyle: "solid"},
	inputFieldStyle: {width: 329, height: 45, borderRadius: 8, backgroundColor: "#F6F6F6", borderWidth: 1, borderColor: "#E8E8E8", borderStyle: "solid", justifyContent: "center"},
	textInputStyle: {marginLeft: 15, fontSize: 15, fontFamily: "Roboto", color: "#000000", fontWeight: "bold"},
	txtGetHelpContainer2: {fontSize: 14, fontWeight: "bold", marginVertical: 15, color: Color.Standard2, fontFamily: "Roboto-Light", textAlign: "center" },
	txtHelp: {fontWeight: "bold", color: Color.colorPrimary, textDecorationLine: "underline"},

	// Change Password Screen
	showPass: {height: "100%", width: "70%"},
	hidePass: {marginTop: 4, height: "100%", width: "70%"},
	passwordFieldStyle: {width: "95%", borderRadius: 8, backgroundColor: "#F6F6F6", borderWidth: 1, borderColor: "#E8E8E8", borderStyle: "solid", flexDirection: "row", justifyContent: "space-between", marginTop: 10},
	btnSubmit: {alignSelf: "center", width: "90%", height: 45, borderBottomWidth: 2, borderBottomColor: "#FFC914", borderRadius: 100, backgroundColor: "#FFC914", elevation: 5, borderWidth: 1, borderColor: "#FFC914"},
	
	// Change Password Success Modal
	welcomeBG: {flex: 1, paddingHorizontal: 10, justifyContent: "center", backgroundColor: "rgba(0, 0, 0, 0.5)"},
	welcomeBody: {flexShrink: 1, margin: -25, borderRadius: 36, padding: 20, alignSelf: "center", backgroundColor: "#FFFFFF"},
	welcomeMsg: {color: "#FFC914", fontSize: 23, fontWeight: "bold", fontFamily: "Roboto", textAlign: "center"},
	welcomeCloseBtn: {alignSelf: "flex-end", backgroundColor: "#FB4646", borderWidth: 0, width: 49, height: 49, borderRadius: 30},
	welcomeBtnStyle: {elevation: 5, alignSelf: "center", marginTop: 15, borderRadius: 100, borderBottomWidth: 0, backgroundColor: "#FFC914", height: 45, width: 259},
	welcomeBtnLabel: {color: "white", fontSize: 16, fontWeight: "bold"},
	welcomeIMG: {alignSelf: "center", marginTop: 25, height: 220, width: 220},

});
