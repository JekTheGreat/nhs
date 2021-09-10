import { StyleSheet, Platform } from "react-native";
import { getStatusBarHeight } from "__src/resources/customize/StatusBarHeight";
import Color from "__src/resources/styles/color";

export default StyleSheet.create({
	// container: { flexShrink: 1, width: "100%", height: "100%", backgroundColor: "red" },
	container: {
		flexShrink: 1, height: "100%",
		alignSelf: "center", width: "95%", elevation: 9, backgroundColor: "white",
		borderRadius: 20, marginVertical: 20, paddingVertical: 20,
		shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 1,
	},
	body: { flex: 1, marginTop: getStatusBarHeight(true), backgroundColor: "#FFFFFF" },
	footer: {
		height: 50,
		marginTop: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	margin30: { marginTop: 30 },
	margin20: { marginTop: 20 },
	margin25: { marginTop: 25 },
	headerContainer: { paddingHorizontal: 30, height: "10%", alignItems: "flex-start", justifyContent: "center" },
	bodyContainer: { backgroundColor: "#FFF", paddingHorizontal: 20 },
	labelText: { fontSize: 25, fontFamily: "Roboto-Light", color: Color.Standard2 },
	labelText2: { fontSize: 14, fontFamily: "Roboto-Light", color: Color.Standard2, marginTop: 5 },
	containerStyle: { marginLeft: 0, marginRight: 0 },
	viewBtnContainer: { backgroundColor: "red", height: "20%", alignItems: "flex-end", justifyContent: "flex-end" },
	errorContainer: { flex: 1, backgroundColor: "#ffcccc", alignSelf: "stretch", alignItems: "center", justifyContent: "center", marginTop: 10 },
	errorText: { color: "#ff1a1a", fontSize: 14 },
	DropdownAlertTitleStyle: { textAlign: "center", fontSize: 16, color: "#FFF", fontWeight: "bold" },
	DropdownAlertImageStyle: { width: 0, height: 0 },
	btnRoundArrow: { position: "absolute", bottom: 10, right: 10 },
	btnSubmit: {
		position: "absolute", bottom: 10, right: 10,
		width: 80, height: 80, backgroundColor: Color.colorPrimary,
		borderRadius: 100, alignItems: "center", justifyContent: "center",
	},
	btnProceed: { marginHorizontal: 20, borderBottomWidth: 6, marginBottom: 20 },
	buttonsContainer: { position: "absolute", alignSelf: "center", alignItems: "center", bottom: 10, width: "90%" },
	btnSub: { marginBottom: 10, width: "95%", borderRadius: 15 },
	btnSubOTP: { width: "100%", backgroundColor: Color.colorPrimaryMP, borderRadius: 15, marginVertical: 10 },
	btnCancel: {
		marginTop: 5, marginBottom: 10, width: "95%", borderColor: Color.colorPrimaryDark,
		borderRadius: 15, borderWidth: 0.5, backgroundColor: Color.white,
	},
	txtTermPolicy: { color: Color.colorPrimaryMP, textDecorationLine: "underline" },
	txtTermsPolicyContainer: { width: "90%", textAlign: "center", fontWeight: "bold", fontFamily: "Roboto", fontSize: 12, },
	containerTermsPolicy: { flexDirection: "row", marginTop: 20, },
	passwordStyle: { borderWidth: .5, backgroundColor: "#F6F6F6", borderRadius: 5, paddingLeft: 10, width: "100%", alignSelf: "center" },
	inputStyle5: { borderWidth: .5, borderRadius: 5, backgroundColor: "#F6F6F6", width: "100%", alignSelf: "center" },
	captchaStyle: { borderWidth: .5, backgroundColor: "white", alignSelf: "center" },
	inputStyleOTP: { borderWidth: .5, borderRadius: 5, backgroundColor: "#F6F6F6", alignSelf: "center" },


	cbError: { marginVertical: 5, textAlign: "center", fontFamily: "Roboto-Light", fontSize: 12, color: "red" },
	dropdownstyle: {
		width: 200, height: 250, borderColor: "#D9D8D8",
		marginTop: 3, borderWidth: 1, borderRadius: 5,
	},
	dropdownRow: { flexDirection: "row", height: 40, alignItems: "center", backgroundColor: "white" },
	dropdownRowText: { marginLeft: 5, fontSize: 13, fontFamily: "Roboto-Light", color: Color.DarkBG },
	dropdownRowText2: { fontWeight: "bold" },

	searchSection: { flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start" },
	searchSection2: { paddingLeft: 10, paddingRight: 5, flexDirection: "row", justifyContent: "flex-start", alignItems: "center" },


	renderSearch: {
		height: 40, borderBottomColor: Color.Standard,
		borderBottomWidth: 0.5, marginTop: 5,
	},
	input: {
		flex: 1, fontSize: 14, fontFamily: "Roboto-Light", paddingTop: 8, paddingRight: 8, paddingBottom: 8,
		paddingLeft: 0, backgroundColor: "#fff", marginLeft: 5,
	},
	underline: { height: StyleSheet.hairlineWidth, backgroundColor: Color.gray05 },


	rememberMeContainer: { justifyContent: "flex-start", marginTop: 7 },
	rememberMeText: { color: "#737373", fontWeight: "normal", fontSize: 14 },
	checkboxContainer: { backgroundColor: "transparent", borderWidth: 0, padding: 2, marginLeft: 0, width: 150, marginTop: 20 },

	margin15: { marginTop: 15 },
	viewSpinner: { flexDirection: "row", marginTop: 15, alignItems: "center", padding: 1, backgroundColor: Color.torquoise },
	txtLabel: { color: Color.gray05, fontWeight: "normal", fontFamily: "Roboto-Light", fontSize: 17 },
	viewFlex: { flex: 1 },


	contactView: { flexDirection: "row", marginTop: 15, alignItems: "center", padding: 1 },


	// Validation Screen
	ModalContainer: { flexShrink: 1, justifyContent: "center", width: "100%", height: "100%", paddingHorizontal: 25, paddingVertical: "10%", backgroundColor: "rgba(0, 0, 0, 0.5)" },
	ModalBackground: { backgroundColor: "#fff", padding: 10 },
	notes: {
		fontStyle: "italic", paddingVertical: 10,
		color: Color.red, fontFamily: "Roboto-Light", fontSize: 15,
	},
	touchContainer: {
		width: "100%",
		height: 45,
		marginTop: 15,
		alignItems: "center",
		backgroundColor: Color.colorPrimary,
		justifyContent: "center",
	},
	touchLabel: { color: "white", fontSize: 14, fontFamily: "Roboto-Light", fontWeight: "bold" },
	txtValidate: { padding: 15, fontSize: 16, fontFamily: "Roboto-Light" },

	flex1: { flex: 1 },
	viewValidate: { marginTop: 20, flexDirection: "row", alignItems: "center", justifyContent: "center" },
	viewLoad: { width: 80, height: 30, padding: 15 },

	// additional
	txtGo: { color: Color.white, fontFamily: "Roboto-Light", fontSize: 16, fontWeight: "bold" },
	secuWrapper: { flexDirection: "row", marginTop: 20 },
	txtSecurity: { flex: 1, marginLeft: 0, color: Color.gray05, fontWeight: "normal", fontFamily: "Roboto-Light", fontSize: 14 },
	width20: { width: "20%" },
	width80: { width: "80%", marginLeft: 10 },


	views_bi3: { flexDirection: "row", alignItems: "center", width: "100%", height: 40, borderBottomColor: Color.Standard, borderBottomWidth: 0.6 },
	labelStyle: { color: Color.Standard, fontSize: 14, fontFamily: "Roboto-Light" },
	textfields: { flex: 1, fontSize: 14, fontFamily: "Roboto-Light" },
	icon: { padding: 5, borderRadius: 5 },
	errStyle: { color: Color.red, fontSize: 13, fontFamily: "Roboto-Light", marginTop: 4 },
	errStyleContainer: { flexDirection: "row", marginTop: 5 },

	// Summary
	termsWrapper: { flexDirection: "row", marginTop: 25 },
	txtTerms: { fontFamily: "Roboto-Light", color: Color.Standard, fontSize: 14, textAlign: "center" },

	// Mobile
	view1: { flex: 1, flexDirection: "column", marginTop: 30 },
	view2: {
		paddingHorizontal: 10, paddingVertical: 2, borderRadius: 5,
		backgroundColor: Color.Standard, marginRight: 10,
	},
	txt1: { fontSize: 14, fontFamily: "Roboto", color: Color.white },

	/* ./components/Codeform.js */
	btnStyle: {
		height: 45, marginBottom: 20, alignItems: "center",
		backgroundColor: Color.colorPrimary, borderRadius: 5, borderBottomWidth: 6,
		borderBottomColor: Color.colorPrimaryDark, justifyContent: "center",
	},
	textTitle: { fontSize: 25, fontFamily: "Roboto-Light", color: Color.Standard2, textAlign: "center" },
	textContent1: { textAlign: "center", fontSize: 13, marginTop: 5, fontFamily: "Roboto-Light", color: Color.Standard },
	textMobile: { textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, marginTop: 5 },
	textContent3: { textAlign: "center", fontSize: 13, color: Color.Standard, fontFamily: "Roboto-Light", marginTop: 10 },
	textContent4: { textAlign: "center", color: Color.Standard, fontFamily: "Roboto-Light", fontSize: 14, marginTop: 20, flexGrow: 1 },
	flex1pad30: { flex: 1, paddingHorizontal: 30 },
	flex1padt20: { flex: 1, paddingTop: 20 },
	marginBottom20: { marginBottom: 20 },
	marginBottom30: { marginBottom: 30 },
	imgicon: { width: 130, height: 130 },
	marginTop20: { marginTop: 20 },
	marginTop30: { marginTop: 30 },
	inputStyles: { textAlign: "center", fontSize: 20 },
	top: { height: "30%", alignItems: "center", justifyContent: "center" },
	bottom: { height: "70%", paddingHorizontal: 20 },


	/* components/AccountVerification */
	card: {
		flexShrink: 1, marginTop: 0,
		paddingVertical: 25, paddingHorizontal: 80,
	},
	txtheader: {
		color: Color.Standard2, fontWeight: "bold", fontFamily: "Roboto-Light",
		fontSize: 18, textAlign: "center",
	},

	/* components/KYC */
	dropdownStyle: { height: 120, paddingHorizontal: 10 },
	dropdownStyle2: { height: 200, paddingHorizontal: 10 },
	renderBase: { flexDirection: "row", width: "100%", height: 40, alignItems: "center", borderBottomColor: "#404040", borderBottomWidth: 0.6 },
	renderRow: { flexDirection: "row", height: 40, alignItems: "center", justifyContent: "space-between", backgroundColor: "white" },
	renderRowTxt: { margin: 4, fontSize: 12, color: Color.Standard, fontFamily: "Roboto", textAlignVertical: "center" },
	input2: { flex: 1, fontFamily: "Roboto-Light", fontSize: 14 },
	txtlabel: { fontFamily: "Roboto-Light", fontSize: 16, color: Color.Standard2, fontWeight: "bold" },
	style3: { height: 60, alignItems: null },
	rowmarginTop15: { flex: 1, flexDirection: "row", marginTop: 15 },
	cbcontainerStyle: { marginLeft: 0, padding: 0, backgroundColor: "transparent", borderColor: "transparent", marginTop: 20 },
	cbcontainerStyle2: { marginLeft: 0, padding: 0, backgroundColor: "transparent", borderColor: "transparent" },
	textStyle: { fontFamily: "Roboto-Light", fontStyle: "italic", fontSize: 14, color: Color.Standard2 },
	txtNote: { fontFamily: "Roboto-Light", fontStyle: "italic", fontSize: 14, color: Color.Standard2, marginTop: 15 },

	// UploadID
	customStyle: { backgroundColor: "#191D21", opacity: 0.3, zIndex: 1, position: "absolute", top: 0, bottom: 0, left: 0, right: 0 },

	// ProofAddress
	flexrow: { flexDirection: "row" },
	wrapper1: { flexShrink: 1, backgroundColor: Color.Header, borderRadius: 5 },
	imgFile: { width: 300, height: 200, alignSelf: "center" },
	btnInfo: { position: "absolute", top: 0, right: 0 },
	padmar0: { padding: 0, margin: 0 },
	btnCamera: {
		position: "absolute", justifyContent: "center", alignItems: "center", flexDirection: "row", width: "100%",
		height: 50, bottom: 0, backgroundColor: Color.red01,
		borderBottomEndRadius: 5, borderBottomStartRadius: 5, opacity: 0.9,
	},
	txtCamera: {
		textAlign: "center", fontFamily: "Roboto-Light", color: Color.white, fontSize: 16,
		marginLeft: 7,
	},
	txtOR: { textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 10, marginTop: 10 },
	btnClickToUpload: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
	imgUpload: { width: 23, height: 23, alignSelf: "center" },
	txtUpload: {
		textAlign: "center", fontFamily: "Roboto-Light", color: Color.LightBlue, fontSize: 13,
		marginLeft: 7, textDecorationLine: "underline",
	},
	btnFileUpload: { flexDirection: "row", padding: 5, borderRadius: 3, backgroundColor: Color.LightBlue, flexShrink: 1 },
	txtUploadFile: { fontFamily: "Roboto-Light", color: Color.white, fontSize: 13, marginLeft: 7 },

	/* components/VerifyEmail && VerifyMobile */
	btnStyle4: { width: 100, height: 45, alignSelf: "flex-end", borderBottomWidth: 5, marginBottom: 20, marginTop: 20 },
	btnStyle2: { width: "100%", height: 45, alignSelf: "flex-end", borderBottomWidth: 5 },
	btnStyle3: { width: "100%", height: 45, alignSelf: "flex-end", backgroundColor: "transparent", borderBottomWidth: 0, borderColor: "transparent" },
	btnLabelStyle: { color: Color.colorPrimaryDark },
	flexStart: { alignSelf: "flex-start" },
	flexShrink1: { flexShrink: 1 },
	flex1bg: { flex: 1, backgroundColor: Color.white },
	flex1mar30: { flex: 1, marginTop: 30 },
	flex1marginTop15: { flex: 1, marginTop: 15 },
	flex1mar30pad30: { flex: 1, paddingHorizontal: 30, marginTop: 30 },
	flex1pad30pad30: { flex: 1, paddingHorizontal: 30, paddingTop: 30 },
	txtmobile: { fontFamily: "Roboto-Light", fontWeight: "bold", color: Color.Standard2, fontSize: 16, marginBottom: 15 },
	txtdidntgetcode: { fontSize: 13, marginTop: 15, color: Color.Standard2, fontFamily: "Roboto-Light", textAlign: "right" },
	txtresend: { fontWeight: "bold", color: Color.colorPrimary },
	txtcodesend: { fontFamily: "Roboto-Light", fontSize: 13, color: Color.Standard2, marginBottom: 5 },
	marb10: { marginBottom: 10 },
	marb20: { marginBottom: 20 },
	marb30: { marginBottom: 30 },
	borderWidth0: { borderBottomWidth: 0 },
	inputStyles2: { fontSize: 18, color: Color.Standard2 },
	imgsuccess: { width: 125, height: 125, alignSelf: "center", marginVertical: 10 },
	txtalright: { textAlign: "center", fontFamily: "Roboto-Light", color: Color.colorPrimary, fontSize: 25 },
	txtsuccess: { textAlign: "center", fontFamily: "Roboto-Light", color: Color.Standard2, fontSize: 15 },

	// KYC

	marginTop15: { marginTop: 15 },
	marginTop45: { marginTop: 45 },
	marginTop60: { marginTop: 60 },
	marginVer65: { marginTop: 45, marginBottom: 30 },
});
