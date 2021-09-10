/* eslint-disable */
import { StyleSheet, Dimensions } from "react-native";
import Resources from "__src/resources";
import { getStatusBarHeight } from "__src/resources/customize/StatusBarHeight";
import { Colors } from "react-native-paper";
const { Color } = Resources;
var { height, width } = Dimensions.get('window');

export default StyleSheet.create({
	scrollViewContainer: {
		backgroundColor: Color.bg
	},
	homeView: {
		flexDirection: "row", justifyContent: "space-between",
		borderBottomRightRadius: 5, borderBottomLeftRadius: 5, padding: 15
	},
	homelatestProducts: {
		fontSize: 16, fontFamily: "Roboto", fontWeight: "bold"
	},
	homeSeeMore: {
		paddingRight: 10, color: "#EEB91A", fontFamily: "Roboto-Light", fontWeight: "bold"
	},
	homeRenderProductTouchableOpacity: {
		marginTop: 5, backgroundColor: Colors.white, margin: 15, borderRadius: 10, shadowOffset: { width: 1, height: 1, },
		shadowColor: Colors.grey300, shadowOpacity: 1,
	},
	homeRenderProductMainView: {
		flexDirection: "row", justifyContent: "center", alignItems: "center", padding: 5
	},
	homeRenderProductImage: {
		height: 80, width: 100, borderRadius: 3, resizeMode: "contain"
	},
	homeRenderProductSubView1: {
		paddingHorizontal: 10, paddingVertical: 5, position: "absolute", top: 5, left: 15,
		borderRadius: 5,
	},
	homeRenderProductTextQuality: {
		fontFamily: 'Roboto-Light', fontSize: 9, color: "white", fontWeight: "bold",
	},
	homeRenderProductSubView2: {
		flexDirection: "row", width: width - 150, justifyContent: "space-between", alignItems: "center",
	},
	homeRenderProductTextName: {
		paddingLeft: 10, fontFamily: 'Roboto-Light', fontSize: 12,
	},
	homeRenderProductTextPrice: {
		paddingRight: 5, fontFamily: 'Roboto-Light', fontWeight: "bold", fontSize: 14
	},
	homeRenderProductSubView3: {
		paddingLeft: 15,
	},
	modalCategoriesMainView: {
		flex: 1, justifyContent: "flex-end", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)'
	},
	modalCategoriesSubView: {
		width: width, height: height / 2.3, backgroundColor: "white"
	},
	modalCategoriesTextCategoryLabel: {
		paddingLeft: 20, marginTop: 30, fontSize: 16, fontWeight: "bold"
	},
	modalCategoriesSubView2: {
		flexDirection: "row", justifyContent: "space-between",
		borderBottomRightRadius: 5, borderBottomLeftRadius: 5, padding: 10,
	},
	previewProductsMainView: {
		backgroundColor: "white", height: 280,
	},
	previewProductsImage: {
		marginTop: 30, alignSelf: "center", height: 150, width: 250, backgroundColor: "transparent",
	},
	previewProductsFlatlist: {
		flexGrow: 1, justifyContent: 'center'
	},
	previewProductsFlatlistView: {
		paddingLeft: 10, marginTop: 15,
	},
	previewProductsFlatlistTouchableOpacity: {
		margin: 5, padding: 5, backgroundColor: Colors.grey200,
		justifyContent: "space-between", alignItems: "center", alignContent: "center"
	},
	previewProductsFlatlistImage: {
		height: 50, width: 50, resizeMode: "contain"
	},
	previewProductsMainView2: {
		paddingLeft: 15, paddingRight: 15, backgroundColor: "white", marginLeft: 10, marginRight: 10, marginTop: 20,
		borderRadius: 8, borderWidth: 1, borderColor: Colors.grey300
	},
	previewProductsTextPrice: {
		color: "#007AFF", fontWeight: "bold", fontSize: 20, fontFamily: "Roboto"
	},
	previewProductsSubView: {
		flex: 1, marginTop: 20, flexDirection: "row", justifyContent: "flex-start", alignItems: "center"
	},
	previewProductsSubView2: {
		marginTop: 10, flexDirection: "row", justifyContent: "flex-start", alignItems: "flex-start"
	},
	previewProductsTextAddress: {
		fontSize: 12, color: "#1E344E", fontFamily: "Roboto-Light"
	},
	previewProductsSubView3: {
		marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"
	},
	previewProductsSubView3SubView: {
		flexDirection: "row", justifyContent: "flex-start"
	},
	previewProductsTextReviews: {
		fontSize: 12, color: "#1E344E", fontFamily: "Roboto-Light"
	},
	previewProductsSubView4: {
		marginTop: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start"
	},
	previewProductsSubView4SubView: {
		flex: 1, justifyContent: "flex-start",
	},
	previewProductsTextBrand: {
		fontSize: 12, color: "#1E344E", fontFamily: "Roboto-Light"
	},
	previewProductsSubView4SubView2: {
		justifyContent: "flex-end"
	},
	previewProductsTextShippingType: {
		fontSize: 12, color: "#1E344E", fontFamily: "Roboto-Light"
	},
	previewProductsBorder: {
		marginTop: 15, height: 1, backgroundColor: Colors.grey300
	}
});
