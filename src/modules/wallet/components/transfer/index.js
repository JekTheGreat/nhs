import React, { PureComponent } from "react";
import {
	View, Text, FlatList, StyleSheet, Animated,
	TouchableWithoutFeedback, Alert, Image
} from "react-native";
import Resource from "__src/resources";
import { Card } from "native-base";
import PropTypes from "prop-types";

const AnimatedCard = Animated.createAnimatedComponent(Card);

const { Res, Color } = Resource;

const data = [
	{
		nodeId: "1",
		description: "ECash to ECash",
		icon: "ups",
	},
];

export default class RemittanceSend extends PureComponent {
	constructor(props) {
		super(props);

		this.handlePressIn = this.handlePressIn.bind(this);
		this.handlePressOut = this.handlePressOut.bind(this);
	}

	componentWillMount() {
		this.animatePress = new Animated.Value(1);
	}

	handlePressIn() {
		Animated.spring(this.animatePress, {
			toValue: 0.96,
		}).start();
	}

	handlePressOut() {
		Animated.spring(this.animatePress, {
			toValue: 1,
		}).start();
	}

	_onClick(item) {
		const { navigate } = this.props.navigation;
		const nodeId = item.nodeId;

		if (nodeId === "1") {
			navigate("EcashtoEcash", { title: "ECash to ECash" });
		} else if (nodeId === "2") {
			navigate("ConvertLoad", { title: "Convert to Load Fund" });
		} else if (nodeId === "3") {
			navigate("EcashPadala", { title: "Ecash Padala" });
		} else if (nodeId === "4") {
			navigate("Smartmoney", { title: "Smartmoney" });
		} else if (nodeId === "25") {
			navigate("EcashToEcash", { title: item.description });
		} else if (nodeId === "8") {
			navigate("ForexRate", { title: "Forex Rates" });
		} else {
			Alert.alert("Notice", "This service is yet unavailable.");
		}
	}
	_renderList({ item, index }) {
		const animatedStyle = {
			transform: [{ scale: this.animatePress }],
		};

		return (
			<TouchableWithoutFeedback
				key={`idx ${index}`} onPress={() => this._onClick(item)}
				onPressIn={this.handlePressIn}
				onPressOut={this.handlePressOut}>
				<AnimatedCard style={[styles.elevateContainer, animatedStyle]}>
					<Image style={styles.imageLogo} source={Res.get(item.icon)} resizeMode={"contain"} resizeMethod={"resize"} />
					<View style={styles.viewBalanceContainer}>
						<Text adjustsFontSizeToFit style={styles.textdescription}>
							{item.description}
						</Text>
						<Text style={styles.textUpdate}>
							Fee: <Text style={{ color: Color.DarkBG }}>Varies per cash </Text>
						</Text>
					</View>
				</AnimatedCard>
			</TouchableWithoutFeedback>
		);
	}

	_keyExtractor = (item) => item.nodeId;

	render() {
		return (
			<View style={styles.container}>
				<FlatList
					style={styles.flatlist}
					data={data}
					renderItem={this._renderList.bind(this)}
					keyExtractor={(item, index) => `idx ${index}`} />
			</View>
		);
	}
}
RemittanceSend.propTypes = {
	children: PropTypes.array,
	navigation: PropTypes.object,
};
const styles = StyleSheet.create({
	container: { flexShrink: 1, width: "100%", height: "100%", backgroundColor: Color.bg },
	elevateContainer: { borderRadius: 5, backgroundColor: "#FFF", height: 100, marginTop: 10, flexDirection: "row", alignItems: "center", paddingHorizontal: 10, justifyContent: "space-between" },
	imageLogo: { alignSelf: "center", width: 70, height: 70, paddingHorizontal: 10 },
	viewBalanceContainer: { flexDirection: "column" },
	textdescription: { fontSize: 15, color: Color.DarkBG, fontWeight: "bold", textAlign: "right" },
	textUpdate: { fontSize: 11, marginTop: 5, color: Color.LightDark, textAlign: "right" },
	flatlist: { paddingHorizontal: 20 },
});
