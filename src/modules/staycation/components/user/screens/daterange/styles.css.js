/* eslint-disable import/default */
import { StyleSheet } from "react-native";
import normalize from "./normalizeText";

export default StyleSheet.create({
	calendar: {
		backgroundColor: "rgb(255, 255, 255)",
		marginHorizontal: normalize(5),
	},
	headActionContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		paddingRight: 10,
	},
	headCoverContainer: {
		// paddingTop: 20,
		// paddingBottom: 20,
		height: normalize(50),
		width: "100%",
		justifyContent: "center",
		backgroundColor: "white",
		paddingHorizontal: 20,
	},
	dateContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headTitleText: {
		fontSize: normalize(20),
		color: "white",
		fontWeight: "bold",
	},
	headerDateSingle: {
		fontSize: 40,
		color: "white",
		fontWeight: "bold",
	},
	arrow: {
		paddingHorizontal: 15,
		fontSize: 18,
		fontWeight: "bold",
	},
	viewButton: {
		paddingBottom: "5%",
		width: "100%",
		height: "10%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},

	// ComposePicker.js
	placeholderText: {
		color: "#c9c9c9",
		fontSize: normalize(18),
	},
	contentInput: {
		alignItems: "center",
		justifyContent: "center",
	},
	contentText: {
		fontSize: normalize(18),
	},
	stylish: {
		height: 48,
		borderColor: "#bdbdbd",
		borderWidth: 2,
		borderRadius: 32,
	},
	marT27: {marginTop: 27},
});
