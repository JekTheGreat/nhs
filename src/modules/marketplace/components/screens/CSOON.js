/* eslint-disable */
import React from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { getStatusBarHeight } from "__src/resources/customize/StatusBarHeight";
import Resource from "__src/resources";
const { Color } = Resource;

class CSOON extends React.Component {

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.bg} />
				<View style={styles.body}>
					<Text style={{ color: Color.Standard2, fontFamily: "Roboto", fontWeight: "bold", fontSize: 22 }}>Coming Soon</Text>
					<Text style={{ color: Color.Standard, fontFamily: "Roboto", fontSize: 13 }}>This service is under construction.</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: { flexShrink: 1, width: "100%", height: "100%", backgroundColor: Color.StatusBar },
	bg: { position: "absolute", flex: 1, backgroundColor: Color.white, marginTop: getStatusBarHeight(true) },
	body: { flex: 1, backgroundColor: Color.bg, marginTop: getStatusBarHeight(true), justifyContent: "center", alignItems: "center" },
});

export default CSOON;
