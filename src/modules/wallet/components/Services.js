import React, { PureComponent } from "react";
import { Text, View, Image, StyleSheet, Alert, FlatList, TouchableOpacity } from "react-native";
import Resource from "__src/resources";
import PropTypes from "prop-types";
const { Color, Res } = Resource;
const data = [
	{
		description: "Send Ecash",
	}, {
		description: "Fund Request",
	}, {
		description: "Convert",
	}, {
		description: "Your Points",
	}, {
		description: "General Report",
	}, {
		description: "Add New Wallet",
	},
];
const formatData = (data, numColumns) => {
	const numberOfFullRows = Math.floor(data.length / numColumns);

	let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);

	while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
		data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
		numberOfElementsLastRow++;
	}

	return data;
};
const numColumns = 4;

export default class Services extends PureComponent {

	_flag(item) {
		switch (item) {
		case "Send Ecash":
			return Res.get("button_send_ecash");
		case "Fund Request":
			return Res.get("button_fundrequest");
		case "Convert":
			return Res.get("button_convert");
		case "Your Points":
			return Res.get("button_points");
		case "General Report":
			return Res.get("button_history");
		case "Add New Wallet":
			return Res.get("button_wallet");
		}
	}

	click = (type) => {
		const {navigation} = this.props;

		switch (type){
		case "Send Ecash":
			// navigation.navigate("SendEcash", {title: type});
			navigation.navigate("EcashtoEcash", {title: "ECash to ECash"});
			break;
		case "Fund Request":
			navigation.navigate("FundRequest", {title: type});
			break;
		// case "Convert":
		// 	navigation.navigate("Conversion", {title: type});
		// 	break;
		case "General Report":
			navigation.navigate("History", {title: type});
			break;
		case "Add New Wallet":
			navigation.navigate("Addwallet", {title: "Add Wallet"});
			break;
		default:
			Alert.alert("Notice", "This service is under construction.");
			break;
		}
	}

	_renderItem = ({ item, idx }) => {
		const desc = item.description;

		if (item.empty === true) {
			return <View key={`idx${idx}`} style={[styles.item, styles.itemInvisible]} />;
		}

		return (
			<TouchableOpacity style={styles.item} key={`idx${idx}`}
				onPress={() => this.click(desc)} >
				<Image style={styles.imageServices} source={this._flag(item.description)} resizeMode={"contain"} />
				<Text adjustsFontSizeToFit style={styles.textDescription}>{desc}</Text>
			</TouchableOpacity>
		);
	};

	onRefresh = () => {
		const { actions, login: { session }, wallet: { walletSelected } } = this.props;

		actions.walletAdded(session.token, walletSelected);
	}

	render() {
		const { wallet: { isWalletLoad } } = this.props;

		return (
			<FlatList
				style={styles.list}
				refreshing={isWalletLoad}
				onRefresh={this.onRefresh}
				data={formatData(data, numColumns)}
				renderItem={this._renderItem}
				numColumns={numColumns}
				keyExtractor={(item, index) => `idx ${index}`}
			/>
		);
	}
}

Services.propTypes = {
	actions: PropTypes.object,
	navigation: PropTypes.object,
	wallet: PropTypes.object,
	login: PropTypes.object,
};

const styles = StyleSheet.create({
	item: { flex: 1, marginTop: 20, margin: 1, alignItems: "center", justifyContent: "center" },
	itemInvisible: { backgroundColor: "transparent" },
	list: { flex: 1, marginTop: 10 },
	textDescription: { fontSize: 11, marginTop: 3, fontFamily: "Roboto-Light", color: Color.Standard2, textAlign: "center", paddingVertical: 3 },
	imageServices: { flex: 5, width: 30, height: 30 },
});
