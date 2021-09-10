/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import ServiceItem from "./ServiceItem";
import styles from "../../styles.css";
import { Icon } from "react-native-elements";
import numeral from "numeral";
import getSymbol from "currency-symbol-map";
import AdsContent from "./AdsContent";
import Resource from "__src/resources";
import PropTypes from "prop-types";
const { Res } = Resource;
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

class ServiceContent extends React.PureComponent {
	renderItem = ({ item, index }) => (
		<ServiceItem
			key={`idx${index}`}
			item={item}
			onPress={() => this.props.onPress(item)} />
	);

	render() {
		const { onPress, home: { favoriteService }, wallet: { walletSelected } } = this.props;

		return (
			<View style={styles.container}>
				<ScrollView style={[styles.body]} nestedScrollEnabled>
					<View style={styles.viewWallet}>
						<View style={styles.viewWallet2}>
							<View style={styles.viewRow}>
								<Icon size={20} name="account-balance-wallet" color="white" />
								<Text style={styles.txtWallet1}>Your wallet</Text>
							</View>
							<View style={styles.viewRow}>
								<Text style={styles.txtWallet2}>{getSymbol(walletSelected.code)} {numeral(walletSelected.balance).format("0,000.0000")}</Text>
								<Image source={Res.get(walletSelected.code)}
									style={styles.imgCurrency} />
							</View>
						</View>
						<View style={styles.viewService}>
							<ServiceItem
								white
								item={"Send"}
								onPress={() => onPress("Send Ecash")}
							/>

							<ServiceItem
								white
								item={"Convert"}
								onPress={() => onPress("Convert")}
							/>

							<ServiceItem
								white
								item={"Top Up"}
								onPress={() => onPress("Fund Request")}
							/>

							<ServiceItem
								white
								item={"More"}
								onPress={() => onPress("More2")}
							/>
						</View>
					</View>

					<View>
						<FlatList
							nestedScrollEnabled
							data={formatData(favoriteService, numColumns)}
							renderItem={this.renderItem}
							numColumns={numColumns}
							keyExtractor={(item, index) => `idx ${index}`} />
					</View>

					<View style={[styles.marT20, { alignItems: "center" }]}>
					</View>
					<AdsContent />
					<View style={{ height: 60 }} />
				</ScrollView>
			</View>
		);
	}
};

ServiceContent.propTypes = {
	onPress: PropTypes.func,
	home: PropTypes.object,
	wallet: PropTypes.object,
};

export default ServiceContent;
