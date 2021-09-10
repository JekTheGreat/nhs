import {StyleSheet} from "react-native";
import Resource from "__src/resources";
import {getStatusBarHeight} from "__src/resources/customize/StatusBarHeight";

const {Color} = Resource;

export default StyleSheet.create({
	container: {
		flex: 1, width: "100%",
		height: "100%", backgroundColor: Color.bg,
	},
	body: {
		flex: 1, marginTop: getStatusBarHeight(true),
		backgroundColor: Color.white,
	},
	wrapper: {display: "flex"},
	titleWrapper: {
		display: "flex", flexDirection: "row",
		alignItems: "center", justifyContent: "space-between",
		paddingHorizontal: 21,
	},
	title: {fontSize: 18, fontWeight: "500", fontFamily: "Roboto", color: Color.gray04},
	seeAllBtn: {
		marginTop: 2, flexDirection: "row",
		alignItems: "center", justifyContent: "space-between",
	},
	seeAllBtnText: {
		color: Color.gray04, marginRight: 5,
	},
	scrollView: {
		marginTop: 20, marginHorizontal: 20,
		marginBottom: 10,
	},
	card: {
		width: "100%", marginBottom: 20,
		flexDirection: "column", minHeight: 200,
	},
	image: {
		width: "100%", flex: 1,
		height: 160,
		marginBottom: 7,
	},
	address: {
		fontSize: 13, fontWeight: "300",
		color: Color.gray04,
	},
	listingType: {
		fontWeight: "700", fontSize: 10, marginTop: 5,
	},
	addToFavoriteBtn: {
		position: "absolute", right: 12,
		top: 7, zIndex: 2, backgroundColor: "transparent",
	},
	listingPrice: {
		color: Color.gray04,
		 fontSize: 12,
		fontWeight: "300",
	},
	viewpager: {flex: 1, minHeight: 200, backgroundColor: "#f2f2f2"},
	ipImage: {height: 200, width: "100%" },
	ipWrapper: {flexDirection: "column", flex: 1},
    
	buttons: {
		height: 15,
		marginTop: -25,
		marginBottom: 10,
		justifyContent: "center",
		alignItems: "center",
		flexWrap: "wrap",
		flexDirection: "row",
		zIndex: 4,
	},
	button: {
		margin: 3,
		width: 8,
		height: 8,
		borderRadius: 8 / 2,
		backgroundColor: "#ccc",
		opacity: 0.9,
	},
	buttonSelected: {
		opacity: 1,
		backgroundColor: "#fff",
		width: 10,
		height: 10,
		borderRadius: 10 / 2,
	},
});
