import {StyleSheet} from "react-native";
import Color from "__src/resources/styles/color";
const style = StyleSheet.create({
	dateTouch: {
		width: 142,
	},
	dateTouchBody: {
		flexDirection: "row",
		height: 40,
		alignItems: "center",
		justifyContent: "center",
	},
	dateIcon: {
		width: 32,
		height: 32,
		marginLeft: 5,
		marginRight: 5,
	},
	dateText: {
		color: "#333",
	},
	placeholderText: {
		color: "#c9c9c9",
	},
	datePickerMask: {
		flex: 1,
		alignItems: "flex-end",
		flexDirection: "row",
		backgroundColor: "#00000077",
	},
	datePickerCon: {
		backgroundColor: "#fff",
		height: 0,
		overflow: "hidden",
	},
	btnText: {
		position: "absolute",
		top: 0,
		height: 42,
		paddingHorizontal: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
	btnTextText: {
		fontSize: 16,
		color: Color.black,
	},
	btnTextCancel: {
		fontSize: 16,
		color: Color.black,
	},
	btnCancel: {
		left: 0,
	},
	btnConfirm: {
		right: 0,
	},
	datePicker: {
		marginTop: 42,
		borderTopColor: "#ccc",
		borderTopWidth: 1,
	},
	disabled: {
		backgroundColor: "#eee",
	},
	dateInput: {
		flexDirection: "row",
	},
	underline: {height: StyleSheet.hairlineWidth, backgroundColor: "#808080"},
	labelStyle: {marginLeft: 0, color: Color.gray05, fontSize: 14, fontWeight: "normal", fontFamily: "roboto"},
	input: {flex: 1, fontSize: 15, paddingTop: 6, paddingRight: 6, paddingBottom: 6, paddingLeft: 0, backgroundColor: "#fff"},
});

export default style;
