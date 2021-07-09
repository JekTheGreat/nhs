import { StyleSheet } from "react-native";
import Resource from "__src/resources";
const {Color} = Resource;

export default StyleSheet.create({
	container: { flex: 1, backgroundColor: Color.StatusBar },
	bg: {position: "absolute", flex: 1, backgroundColor: Color.white},
	body: {flex: 1, backgroundColor: Color.bg, marginTop: 5},
	flex1: {flex: 1},
	flexGrow1: {flexGrow: 1},
	marT10: {marginTop: 10},
	marT20: {marginTop: 20},
	padH10: {paddingHorizontal: 10},
	img1: {width: "100%", height: 400},
	img2: {width: "100%", height: 25},
	view1: {marginTop: 20, marginBottom: 20},
	txt1: {textAlign: "center", fontSize: 15, color: Color.Standard2, marginBottom: 5},
	views_bi3: {flexDirection: "row", width: "100%", alignItems: "center", height: 40, paddingRight: 8,
		backgroundColor: "white", borderColor: Color.colorPrimary, borderWidth: 0.6, borderRadius: 4, paddingLeft: 15,
	},
	image: {width: 18, height: 18, margin: 10},
	textfields: {flex: 1,  fontSize: 14, fontFamily: "Roboto-Light", paddingVertical: 0, marginVertical: 0 },

	// HomeScreen
	viewCenter: {flexDirection: "column", alignItems: "center"},
	viewService: {flexDirection: "row", justifyContent: "space-between",
		backgroundColor: "#333333", borderBottomRightRadius: 5, borderBottomLeftRadius: 5, padding: 15},
	size60: {width: 60, height: 60},
	viewAdsWrapper: {backgroundColor: "white", height: 190, marginTop: 20,  alignItems: "stretch", paddingVertical: 20},
	imgbg: {paddingVertical: 15, marginHorizontal: 15},
	cover: { flex: 1, width: null, 	height: null},
	viewSearch: {flexDirection: "row", paddingHorizontal: 15, marginTop: 5, alignItems: "center", justifyContent: "center"},
	viewWallet: {borderRadius: 5, backgroundColor: Color.Header, marginHorizontal: 15, marginTop: 10, flexDirection: "column"},
	viewWallet2: {flexDirection: "row", justifyContent: "space-between", padding: 10},
	viewRow: {flexDirection: "row", alignItems: "center"},
	imgCurrency: {width: 20, height: 20, borderRadius: 20 / 2,
		borderWidth: 0.6, borderColor: Color.white},
	txtWallet1: {fontFamily: "Roboto", fontSize: 15, color: "white", marginLeft: 5},
	txtWallet2: {fontFamily: "Roboto", fontSize: 15, color: "white", marginRight: 5},
	size20: {width: 20, height: 20},
	textDescription: {fontSize: 11, marginTop: 3, fontFamily: "Roboto-Light", color: Color.Standard2, textAlign: "center", paddingVertical: 3},
	qrImg: {width: 30, height: 30, alignSelf: "center", marginLeft: 10},

	playerSheet: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "cyan",
	},
});
